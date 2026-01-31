import React, { useState, useEffect } from 'react';
import {
    Pen,
    Zap,
    ShieldCheck,
    MessageSquare,
    Moon,
    Sun,
    Check,
    ArrowRight,
    Layout,
    Mail,
    Share2,
    ChevronDown,
    Sparkles,
    Languages,
    Type,
    Palette,
    Send,
    LogOut,
    Lock,
    Unlock,
    Download,
    Copy,
    ArrowDown,
    Globe,
    FileText,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { supabase } from './supabaseClient';
import { Analytics } from '@vercel/analytics/react';

const adminEmail = 'redactaia9@gmail.com'; // Cambia esto por tu email real de admin

const premiumUsers = [
    'redactaia9@gmail.com',
    'cliente-ejemplo@gmail.com'
];

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedText, setGeneratedText] = useState('');
    const [activeLegalModal, setActiveLegalModal] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showAdminPanel, setShowAdminPanel] = useState(false);
    const [adminData, setAdminData] = useState({
        users: [],
        subscriptions: [],
        messages: []
    });
    const [generatorConfig, setGeneratorConfig] = useState({
        topic: '',
        language: 'Español',
        type: 'Redacción',
        style: 'Formal'
    });
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'

    // Theme logic
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // Google Login Real Implementation
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            // En una app real, usarías el token para obtener el perfil:
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            });
            const profile = await res.json();

            const userData = {
                name: profile.name,
                email: profile.email,
                picture: profile.picture
            };

            setIsLoggedIn(true);
            setUser(userData);

            // Guardar en Supabase
            await supabase.from('profiles').upsert({
                id: profile.sub, // ID único de Google
                email: profile.email,
                name: profile.name,
                picture: profile.picture,
                last_login: new Date().toISOString()
            });
        },
        onError: () => console.log('Login Failed'),
    });

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setShowAdminPanel(false);
    };

    const fetchAdminData = async () => {
        const { data: users } = await supabase.from('profiles').select('*').order('last_login', { ascending: false });
        const { data: subs } = await supabase.from('subscriptions').select('*').order('created_at', { ascending: false });
        const { data: msgs } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
        setAdminData({ users: users || [], subscriptions: subs || [], messages: msgs || [] });
    };

    useEffect(() => {
        if (showAdminPanel) {
            fetchAdminData();
        }
    }, [showAdminPanel]);

    const handleGenerate = async () => {
        if (!generatorConfig.topic) return;

        // ESTRATEGIA: Permitir vista previa gratuita, pero login para guardar o generar completo
        if (!isLoggedIn) {
            setIsGenerating(true);
            setGeneratedText('Vista previa generada parcialmente. Inicia sesión para ver el resultado completo y guardar tu progreso...');
            
            try {
                const apiKey = import.meta.env.VITE_GROQ_KEY;
                if (!apiKey) {
                    throw new Error("La clave de Groq no está configurada.");
                }

                const previewPrompt = `Actúa como un profesional experto en redacción.
                Idioma: ${generatorConfig.language}
                Tipo de texto: ${generatorConfig.type}
                Estilo: ${generatorConfig.style}
                Tema: ${generatorConfig.topic}

                GENERA UNA VISTA PREVIA BREVE (2-3 párrafos) del texto completo.
                El contenido debe estar en ${generatorConfig.language.toUpperCase()}.`;

                const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: "llama-3.3-70b-versatile",
                        messages: [
                            { role: "system", content: "Eres un redactor profesional experto." },
                            { role: "user", content: previewPrompt }
                        ],
                        temperature: 0.7
                    })
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.error?.message || "Error en la API de Groq");

                const text = data.choices[0].message.content;
                setGeneratedText(`🔒 VISTA PREVIA GRATUITA\n\n${text}\n\n---\n📝 Para obtener el texto completo con más detalle y guardar tus creaciones, inicia sesión gratis con Google.`);
                
            } catch (error) {
                console.error(error);
                setGeneratedText(`Error en la vista previa. Por favor, inicia sesión para continuar.`);
            } finally {
                setIsGenerating(false);
            }
            
            setShowLoginModal(true);
            return;
        }

        // Check Free Tier Limit (5 generations)
        if (!isPremium) {
            // Count generations this month
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);

            const { count, error } = await supabase
                .from('generations')
                .select('*', { count: 'exact', head: true })
                .eq('user_email', user.email)
                .gte('created_at', startOfMonth.toISOString());

            if (count >= 5) {
                alert("🛑 Límite Gratuito Alcanzado\n\nHas usado tus 5 generaciones gratis de este mes. Pásate a Premium para seguir creando sin límites.");
                return;
            }
        }

        setIsGenerating(true);
        setGeneratedText('Generando contenido ultra rápido con Groq...');

        try {
            const apiKey = import.meta.env.VITE_GROQ_KEY;

            if (!apiKey) {
                throw new Error("La clave de Groq no está configurada.");
            }

            const prompt = `Actúa como un profesional experto en redacción.
            Idioma: ${generatorConfig.language}
            Tipo de texto: ${generatorConfig.type}
            Estilo: ${generatorConfig.style}
            Tema: ${generatorConfig.topic}

            ATENCIÓN: EL CONTENIDO DEBE GENERARSE OBLIGATORIAMENTE EN EL IDIOMA: ${generatorConfig.language.toUpperCase()}.
            
            REGLAS CRÍTICAS DE FORMATO (MUY IMPORTANTE):
            1. PROHIBIDO usar símbolos de asteriscos (*), almohadillas (#), guiones bajos (_) o cualquier carácter de formato Markdown.
            2. El texto debe ser 100% LIMPIO, solo letras, números y puntuación normal. 
            3. NO pongas títulos con #. Si necesitas un título, escríbelo en mayúsculas sin ningún símbolo.
            4. Estructura el contenido con párrafos claros y saltos de línea normales.
            5. El resultado debe estar listo para copiar y pegar directamente sin necesidad de limpieza.`;

            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        { role: "system", content: "Eres un redactor profesional experto." },
                        { role: "user", content: prompt }
                    ],
                    temperature: 0.7
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error?.message || "Error en la API de Groq");

            const text = data.choices[0].message.content;
            setGeneratedText(text);

            // Log generation
            if (isLoggedIn) {
                await supabase.from('generations').insert({
                    user_email: user.email,
                    content_type: generatorConfig.type
                });
            }
        } catch (error) {
            console.error(error);
            setGeneratedText(`ERROR: ${error.message}\n\nIntenta recargar la página o verifica tu clave de Groq.`);
        } finally {
            setIsGenerating(false);
        }
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navLinks = [
        { name: 'Características', id: 'features' },
        { name: 'Generador', id: 'generator' },
        { name: 'Precios', id: 'pricing' },
        { name: 'Testimonios', id: 'testimonials' },
        { name: 'Contacto', id: 'contact' },
    ];

    const languages = ['Español', 'English', 'Français', 'Deutsch', 'Italiano', 'Português', 'Nederlands', 'Русский', '中文', '日本語', 'العربية'];
    const textTypes = ['Redacción', 'Informe', 'Guion', 'Email', 'Redes Sociales', 'Blog Post', 'Newsletter', 'Resumen Ejecutivo', 'Carta Formal', 'Poema', 'Diálogo'];
    const styles = ['Formal', 'Informal', 'Humorístico', 'Profesional', 'Optimista', 'Persuasivo', 'Técnico', 'Narrativo', 'Descriptivo', 'Inspiracional'];

    // Free Tier Restrictions
    const freeLanguages = ['Español', 'English'];
    const freeStyles = ['Formal', 'Informal', 'Humorístico', 'Profesional'];

    const isPremium = user && premiumUsers.includes(user.email);

    // Auto-revert logic if user selects premium option while free
    useEffect(() => {
        if (!isPremium && !freeLanguages.includes(generatorConfig.language)) {
            setGeneratorConfig(prev => ({ ...prev, language: 'Español' }));
        }
        if (!isPremium && !freeStyles.includes(generatorConfig.style)) {
            setGeneratorConfig(prev => ({ ...prev, style: 'Formal' }));
        }
    }, [isPremium, generatorConfig.language, generatorConfig.style]);

    const paypalOptions = {
        "client-id": "test", // User should replace this with their actual client-id
        currency: "EUR",
        intent: "capture",
    };

    return (
        <PayPalScriptProvider options={paypalOptions}>
            <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans selection:bg-primary-500/30">

                {/* Navigation */}
                <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
                                <div className="bg-gradient-to-br from-primary-600/10 to-indigo-600/10 p-0.5 rounded-2xl overflow-hidden shadow-lg shadow-primary-500/20">
                                    <img src="/logo-pro.png" alt="logo" className="w-9 h-9 object-cover" />
                                </div>
                                <span className="text-2xl font-black tracking-tighter">
                                    Redacta<span className="text-primary-600">IA</span>
                                </span>
                            </div>

                            <div className="hidden md:flex items-center space-x-1">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => scrollToSection(link.id)}
                                        className="px-5 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                                    >
                                        {link.name}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={toggleDarkMode}
                                    className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:scale-110 active:scale-95 transition-all shadow-sm"
                                >
                                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                                {isLoggedIn ? (
                                    <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-800 p-1 pr-3 rounded-full border border-slate-200 dark:border-slate-700">
                                        <div className="text-right hidden sm:block pl-2">
                                            <p className="text-[10px] font-black opacity-50 uppercase tracking-tighter truncate max-w-[80px]">{user.name}</p>
                                            {premiumUsers.includes(user.email) && (
                                                <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-1.5 py-0.5 rounded-md">Premium</p>
                                            )}
                                        </div>
                                        <img src={user.picture} className={`w-8 h-8 rounded-full ${premiumUsers.includes(user.email) ? 'ring-2 ring-amber-500' : 'ring-2 ring-indigo-500/20'}`} alt="avatar" />
                                        {user.email === adminEmail && (
                                            <button
                                                onClick={() => setShowAdminPanel(true)}
                                                className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all shadow-sm"
                                                title="Panel de Administración"
                                            >
                                                <Layout className="w-4 h-4" />
                                            </button>
                                        )}
                                        <button onClick={handleLogout} className="p-2 hover:text-red-500 transition-colors">
                                            <LogOut className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleGoogleLogin()}
                                        className="hidden sm:block bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-6 py-2.5 rounded-full font-bold text-sm shadow-xl shadow-slate-900/10 dark:shadow-white/5 hover:scale-105 active:scale-95 transition-all"
                                    >
                                        Empezar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero / Reception */}
                <section id="hero" className="relative pt-40 pb-32 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary-400/10 via-transparent to-transparent blur-3xl -z-10"></div>
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-black uppercase tracking-widest mb-8">
                                <Sparkles size={14} className="text-amber-500" />
                                <span>Impulsado por Llama 3.3 (Ultra Rápido)</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                                Genera textos <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">profesionales</span> con IA en <br />
                                segundos
                            </h1>
                            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                                La herramienta de inteligencia artificial más potente para crear informes, guiones y contenidos profesionales en segundos.
                            </p>

                            <div className="flex flex-col items-center gap-6">
                                <button
                                    onClick={() => scrollToSection('generator')}
                                    className="group bg-primary-600 hover:bg-primary-700 text-white px-10 py-5 rounded-3xl text-xl font-black shadow-2xl shadow-primary-600/30 flex items-center space-x-3 transition-all active:scale-95"
                                >
                                    <span>Ir al Generador</span>
                                    <ArrowDown className="group-hover:translate-y-1 transition-transform" />
                                </button>

                                <div className="flex items-center -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <img key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-950 bg-slate-200" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="avatar" />
                                    ))}
                                    <div className="pl-4 text-sm font-bold text-slate-400">+2.000 usuarios confían en nosotros</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* 3 Benefit Boxes */}
                    <div className="max-w-6xl mx-auto px-4 mt-32">
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: 'Velocidad Increíble', desc: 'Genera textos complejos en menos de 5 segundos.', icon: <Zap className="text-amber-500" /> },
                                { title: 'Calidad Premium', desc: 'Resultados con coherencia humana y estilo profesional.', icon: <ShieldCheck className="text-emerald-500" /> },
                                { title: 'Multilingüe', desc: 'Disponible en más de 11 idiomas con precisión total.', icon: <Languages className="text-blue-500" /> }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-slate-50 dark:bg-slate-900/40 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-primary-500/50 transition-all"
                                >
                                    <div className="bg-white dark:bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-32 bg-slate-50 dark:bg-slate-900/20">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-black mb-6">Potencia tu Creatividad</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">Todo lo necesario para que tu comunicación destaque sobre el resto.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: "Personalización Total", desc: "Elige entre 10+ estilos y tonos para cada texto.", icon: <Palette /> },
                                { title: "Exportación Fácil", desc: "Copia o descarga tus textos en un solo clic.", icon: <Download /> },
                                { title: "Seguridad de Datos", desc: "Tus redacciones son privadas y están encriptadas.", icon: <Lock /> },
                                { title: "Velocidad Ultra", desc: "Genera textos complejos en menos de 5 segundos.", icon: <Zap /> },
                            ].map((feature, i) => (
                                <div key={i} className="bg-white dark:bg-slate-800/40 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:-translate-y-1 transition-all">
                                    <div className="text-primary-600 mb-6">{feature.icon}</div>
                                    <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Generator Section */}
                <section id="generator" className="py-32 px-4 relative">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="p-8 md:p-12">
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
                                            <Zap className="text-primary-600" />
                                            Generador de IA
                                        </h2>
                                        <p className="text-slate-500 font-medium">Configura y crea tu texto perfecto.</p>
                                    </div>
                                    {isLoggedIn && (
                                        <div className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                                            <Unlock size={14} />
                                            Sesión Activa
                                        </div>
                                    )}
                                </div>

                                <div className="relative">
                                    {/* Lock Overlay */}
                                    {/* Modal de "Muerde el Anzuelo" (Login forzado al generar) */}
                                    <AnimatePresence>
                                        {showLoginModal && (
                                            <motion.div
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
                                                onClick={() => setShowLoginModal(false)}
                                            >
                                                <motion.div
                                                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                                                    className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[3rem] p-10 text-center relative shadow-2xl border border-slate-200 dark:border-slate-800"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <button onClick={() => setShowLoginModal(false)} className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-all"><X size={16} /></button>

                                                    <div className="w-20 h-20 bg-primary-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-primary-600">
                                                        <Zap size={40} />
                                                    </div>

                                                    <h3 className="text-3xl font-black mb-4 tracking-tighter italic">¡Ya tienes una vista previa!</h3>
                                                    <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium leading-relaxed">
                                                        Hemos generado una vista previa de tu contenido. Para obtener el texto completo, guardar tus creaciones y seguir generando sin límites, inicia sesión gratis.
                                                    </p>
                                                    <div className="bg-primary-50 dark:bg-primary-950/20 rounded-2xl p-4 mb-6 border border-primary-200 dark:border-primary-800">
                                                        <p className="text-sm font-bold text-primary-600 dark:text-primary-400">✅ 5 generaciones gratis al mes</p>
                                                        <p className="text-sm font-bold text-primary-600 dark:text-primary-400">✅ Guarda tus textos favoritos</p>
                                                        <p className="text-sm font-bold text-primary-600 dark:text-primary-400">✅ Acceso a historial</p>
                                                    </div>

                                                    <button
                                                        onClick={() => {
                                                            setShowLoginModal(false);
                                                            handleGoogleLogin();
                                                        }}
                                                        className="w-full flex items-center justify-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary-500/20"
                                                    >
                                                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                                        </svg>
                                                        ENTRAR CON GOOGLE
                                                    </button>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Diseño Horizontal del Generador */}
                                    <div className="grid lg:grid-cols-5 gap-8">
                                        {/* Columna de Configuración (Izquierda) */}
                                        <div className="lg:col-span-2 space-y-6">
                                            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="block text-xs font-black mb-3 text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                            <MessageSquare size={14} className="text-primary-500" /> Tema o Prompt
                                                        </label>
                                                        <textarea
                                                            className="w-full p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 outline-none h-40 focus:border-primary-500 transition-all font-bold"
                                                            placeholder="¿Sobre qué quieres que escriba hoy?"
                                                            value={generatorConfig.topic}
                                                            onChange={(e) => setGeneratorConfig({ ...generatorConfig, topic: e.target.value })}
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-black mb-2 text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                                                <Globe size={12} /> Idioma
                                                            </label>
                                                            <select
                                                                className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 outline-none font-bold text-sm"
                                                                value={generatorConfig.language}
                                                                onChange={(e) => {
                                                                    if (!isPremium && !freeLanguages.includes(e.target.value)) {
                                                                        alert("🔒 Esta opción es solo para usuarios Premium. ¡Suscríbete para desbloquear todos los idiomas!");
                                                                        return;
                                                                    }
                                                                    setGeneratorConfig({ ...generatorConfig, language: e.target.value });
                                                                }}
                                                            >
                                                                {languages.map(l => (
                                                                    <option
                                                                        key={l}
                                                                        value={l}
                                                                        disabled={!isPremium && !freeLanguages.includes(l)}
                                                                    >
                                                                        {l} {!isPremium && !freeLanguages.includes(l) ? '🔒' : ''}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-black mb-2 text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                                                <FileText size={12} /> Tipo
                                                            </label>
                                                            <select
                                                                className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 outline-none font-bold text-sm"
                                                                value={generatorConfig.type}
                                                                onChange={(e) => setGeneratorConfig({ ...generatorConfig, type: e.target.value })}
                                                            >
                                                                {textTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-black mb-2 text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                                            <Palette size={12} /> Estilo
                                                        </label>
                                                        <select
                                                            className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 outline-none font-bold text-sm"
                                                            value={generatorConfig.style}
                                                            onChange={(e) => {
                                                                if (!isPremium && !freeStyles.includes(e.target.value)) {
                                                                    alert("🔒 Esta opción es solo para usuarios Premium. ¡Suscríbete para desbloquear todos los estilos!");
                                                                    return;
                                                                }
                                                                setGeneratorConfig({ ...generatorConfig, style: e.target.value });
                                                            }}
                                                        >
                                                            {styles.map(s => (
                                                                <option
                                                                    key={s}
                                                                    value={s}
                                                                    disabled={!isPremium && !freeStyles.includes(s)}
                                                                >
                                                                    {s} {!isPremium && !freeStyles.includes(s) ? '🔒' : ''}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <button
                                                        onClick={handleGenerate}
                                                        disabled={isGenerating || !generatorConfig.topic}
                                                        className="w-full py-4 bg-gradient-to-r from-primary-600 to-indigo-600 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg shadow-primary-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 mt-4"
                                                    >
                                                        {isGenerating ? (
                                                            <><div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div> <span>Generando...</span></>
                                                        ) : (
                                                            <><Send size={18} /> <span>¡Generar ahora!</span></>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Área de Resultado Expandida (Derecha) - Diseño Horizontal */}
                                        <div id="result-area" className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-[2rem] p-1 border border-slate-100 dark:border-slate-800 shadow-2xl flex flex-col">
                                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[1.8rem] p-8 h-full flex flex-col border border-transparent">
                                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-700">
                                                    <span className="text-primary-600 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></div>
                                                        Resultado de RedactaIA
                                                    </span>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(generatedText);
                                                                alert('Copiado al portapapeles');
                                                            }}
                                                            className="group p-3 rounded-xl bg-white dark:bg-slate-700 hover:bg-primary-600 hover:text-white transition-all border border-slate-200 dark:border-slate-600 shadow-sm flex items-center gap-2 text-xs font-bold"
                                                        >
                                                            <Copy size={14} /> <span>COPIAR</span>
                                                        </button>
                                                        <button onClick={() => alert('Función próximamente')} className="p-3 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all border border-slate-200 dark:border-slate-600 shadow-sm">
                                                            <Download size={14} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex-grow font-medium leading-[1.8] text-slate-700 dark:text-slate-300 overflow-y-auto max-h-[600px] whitespace-pre-wrap pr-4 custom-scrollbar text-lg italic">
                                                    {generatedText ? (
                                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>{generatedText}</motion.div>
                                                    ) : (
                                                        <div className="h-full flex flex-col items-center justify-center text-slate-400 italic text-center space-y-6 py-20">
                                                            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center animate-bounce">
                                                                <MessageSquare size={32} className="opacity-40" />
                                                            </div>
                                                            <p className="max-w-[250px] font-bold text-sm uppercase tracking-widest">Esperando tu gran idea...</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* Pricing Section */}
                <section id="pricing" className="py-32 bg-white dark:bg-slate-950">
                    <div className="max-w-7xl mx-auto px-4">
                                <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-black mb-6">Planes para Cada Necesidad</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium mb-8">Desde estudiantes hasta profesionales. Elige tu plan y empieza a crear contenido increíble hoy.</p>

                            {/* Billing Toggle */}
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Mensual</span>
                                <button
                                    onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly')}
                                    className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${billingCycle === 'annual' ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                                >
                                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${billingCycle === 'annual' ? 'translate-x-6' : ''}`}></div>
                                </button>
                                <span className={`text-sm font-bold ${billingCycle === 'annual' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Anual <span className="text-emerald-500 text-xs">(Ahorra 20%)</span></span>
                            </div>

                            <div className="flex items-center justify-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest bg-amber-500/10 py-2 px-4 rounded-full inline-block mx-auto">
                                <ShieldCheck size={14} /> Garantía de devolución de 7 días
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Básico */}
                            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-[3rem] flex flex-col">
                                <h3 className="text-2xl font-black mb-2">Básico</h3>
                                <p className="text-slate-500 mb-8 font-medium">Perfecto para proyectos ocasionales y estudiantes.</p>
                                <div className="flex items-baseline mb-8">
                                    <span className="text-5xl font-black">{billingCycle === 'monthly' ? '9,99€' : '99€'}</span>
                                    <span className="text-slate-400 ml-2 font-bold">/{billingCycle === 'monthly' ? 'mes' : 'año'}</span>
                                </div>
                                <ul className="space-y-4 mb-10 flex-grow">
                                    {['50 Generaciones Mensuales', '5 Idiomas Disponibles', '6 Estilos Disponibles', 'Exportación Básica', 'Soporte por Email'].map(i => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                                            <div className="p-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-400"><Check size={14} /></div>
                                            <span>{i}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full py-4 rounded-3xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black hover:scale-105 active:scale-95 transition-all shadow-xl">
                                    Empezar Ahora
                                </button>
                            </div>

                            {/* Premium */}
                            <div className="relative bg-white dark:bg-slate-900 border-4 border-primary-600 p-10 rounded-[3rem] shadow-2xl shadow-primary-500/20 transform scale-105 z-10 flex flex-col">
                                <div className="absolute top-0 right-10 -translate-y-1/2 bg-primary-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                                    El más popular
                                </div>
                                <h3 className="text-2xl font-black mb-2">Premium</h3>
                                <p className="text-slate-500 mb-8 font-medium">Para creadores que necesitan potencia ilimitada.</p>
                                <div className="flex items-baseline mb-8">
                                    <span className="text-5xl font-black">{billingCycle === 'monthly' ? '19,99€' : '199€'}</span>
                                    <span className="text-slate-400 ml-2 font-bold">/{billingCycle === 'monthly' ? 'mes' : 'año'}</span>
                                </div>
                                <ul className="space-y-4 mb-10 flex-grow">
                                    {['Generaciones ilimitadas', 'Todos los idiomas (11+)', 'Todos los estilos (10+)', 'Exportación HD', 'Soporte prioritario'].map(i => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-bold">
                                            <div className="p-1 rounded-full bg-primary-600 text-white"><Check size={14} /></div>
                                            <span>{i}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-auto">
                                    <PayPalButtons
                                        style={{ layout: "vertical", shape: "pill", label: "subscribe" }}
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [{
                                                    amount: {
                                                        value: billingCycle === 'monthly' ? "19.99" : "199.00",
                                                        currency_code: "EUR"
                                                    },
                                                    description: `RedactaIA Premium (${billingCycle === 'monthly' ? 'Mensual' : 'Anual'})`
                                                }]
                                            });
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order.capture().then(async (details) => {
                                                // Guardar suscripción en DB
                                                await supabase.from('subscriptions').insert({
                                                    user_email: user?.email || details.payer.email_address,
                                                    plan: 'Premium',
                                                    status: 'active',
                                                    paypal_order_id: details.id
                                                });
                                                alert("¡Gracias " + details.payer.name.given_name + "! Pago recibido. En menos de 2 horas activaremos tus ventajas Premium.");
                                            });
                                        }}
                                    />
                                    <p className="text-[10px] text-center mt-4 opacity-50 font-bold">Activación manual en menos de 2h laborables.</p>
                                </div>
                            </div>

                            {/* Enterprise */}
                            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-[3rem] flex flex-col">
                                <h3 className="text-2xl font-black mb-2">Empresa</h3>
                                <p className="text-slate-500 mb-8 font-medium">Soluciones a medida para equipos corporativos.</p>
                                <div className="flex items-baseline mb-8">
                                    <span className="text-5xl font-black">{billingCycle === 'monthly' ? '59,99€' : '599€'}</span>
                                    <span className="text-slate-400 ml-2 font-bold">/{billingCycle === 'monthly' ? 'mes' : 'año'}</span>
                                </div>
                                <ul className="space-y-4 mb-10 flex-grow">
                                    {['Cuentas múltiples (5)', 'Acceso vía API', 'Consultoría de prompts', 'Seguridad nivel bancario'].map(i => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                                            <div className="p-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-400"><Check size={14} /></div>
                                            <span>{i}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-auto">
                                    <PayPalButtons
                                        style={{ layout: "vertical", shape: "pill", color: "black" }}
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [{
                                                    amount: {
                                                        value: billingCycle === 'monthly' ? "59.99" : "599.00",
                                                        currency_code: "EUR"
                                                    },
                                                    description: `RedactaIA Empresa (${billingCycle === 'monthly' ? 'Mensual' : 'Anual'})`
                                                }]
                                            });
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order.capture().then(async (details) => {
                                                // Guardar suscripción en DB
                                                await supabase.from('subscriptions').insert({
                                                    user_email: user?.email || details.payer.email_address,
                                                    plan: 'Enterprise',
                                                    status: 'active',
                                                    paypal_order_id: details.id
                                                });
                                                alert("¡Gracias! Pago de Plan Empresa recibido. En menos de 2 horas nos pondremos en contacto.");
                                            });
                                        }}
                                    />
                                    <p className="text-[10px] text-center mt-4 opacity-50 font-bold">Activación manual en menos de 2h laborables.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="py-32 bg-gradient-to-br from-primary-50 to-indigo-50 dark:from-slate-900/40 dark:to-indigo-950/20">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-black mb-6">Lo que dicen nuestros usuarios</h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">Más de 2.000 profesionales ya confían en RedactaIA para sus proyectos más importantes.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {[
                                {
                                    name: "María García",
                                    role: "Content Manager",
                                    company: "Marketing Digital Agency",
                                    text: "RedactaIA ha reducido nuestro tiempo de creación de contenido en un 70%. Ahora podemos producir 10 veces más contenido de alta calidad.",
                                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria"
                                },
                                {
                                    name: "Carlos Rodríguez",
                                    role: "Estudiante Universitario",
                                    company: "Universidad Complutense",
                                    text: "Como estudiante, me ayuda a organizar mis ideas y crear ensayos bien estructurados. ¡Mis notas han mejorado mucho!",
                                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos"
                                },
                                {
                                    name: "Ana Martínez",
                                    role: "Freelance Writer",
                                    company: "Independiente",
                                    text: "Puedo aceptar más proyectos gracias a RedactaIA. La calidad del contenido es excelente y mis clientes están encantados.",
                                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana"
                                }
                            ].map((testimonial, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-700/50 shadow-lg"
                                >
                                    <div className="flex items-center mb-6">
                                        <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role} • {testimonial.company}</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">"{testimonial.text}"</p>
                                    <div className="flex mt-4">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-amber-400 text-xl">★</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Stats Section */}
                        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-200 dark:border-slate-800">
                            <div className="grid md:grid-cols-4 gap-8 text-center">
                                {[
                                    { number: "2,000+", label: "Usuarios Activos" },
                                    { number: "50K+", label: "Textos Generados" },
                                    { number: "11", label: "Idiomas" },
                                    { number: "99%", label: "Satisfacción" }
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-4xl font-black text-primary-600 mb-2">{stat.number}</div>
                                        <div className="text-slate-600 dark:text-slate-400 font-medium">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-32 px-4 relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/10 blur-[120px] rounded-full -z-10"></div>
                    <div className="max-w-4xl mx-auto bg-slate-900 dark:bg-slate-800 rounded-[3rem] p-12 text-white text-center shadow-2xl">
                        <h2 className="text-4xl font-black mb-6">¿Alguna duda o problema?</h2>
                        <p className="text-slate-400 mb-12 max-w-lg mx-auto font-medium">Nuestro equipo está listo para ayudarte a llevar tu redacción al siguiente nivel.</p>

                        <form
                            className="grid md:grid-cols-2 gap-6 text-left"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const nombre = e.target[0].value;
                                const email = e.target[1].value;
                                const mensaje = e.target[2].value;

                                const { error } = await supabase.from('contact_messages').insert({
                                    name: nombre,
                                    email: email,
                                    message: mensaje
                                });

                                if (error) {
                                    alert("Error al enviar el mensaje. Inténtalo de nuevo.");
                                } else {
                                    alert("¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.");
                                    e.target.reset();
                                }
                            }}
                        >
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Nombre</label>
                                <input required className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-primary-500" placeholder="Tu nombre" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email</label>
                                <input required type="email" className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-primary-500" placeholder="correo@ejemplo.com" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Mensaje</label>
                                <textarea required className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-primary-500 h-32 resize-none" placeholder="¿En qué podemos ayudarte?"></textarea>
                            </div>
                            <button type="submit" className="md:col-span-2 py-5 bg-primary-600 rounded-2xl font-black hover:bg-primary-500 transition-all shadow-xl shadow-primary-600/20">
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>
                </section>

                {/* Modal Legal */}
                <AnimatePresence>
                    {activeLegalModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl"
                            onClick={() => setActiveLegalModal(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[80vh] rounded-[3rem] p-10 relative overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setActiveLegalModal(null)}
                                    className="absolute top-6 right-6 p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                >
                                    <X size={20} />
                                </button>

                                {activeLegalModal === 'privacy' && (
                                    <div className="space-y-6">
                                        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                                            <ShieldCheck size={32} />
                                        </div>
                                        <h2 className="text-3xl font-black tracking-tighter">Política de Privacidad</h2>
                                        <div className="space-y-4 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                            <p>En <span className="font-bold text-slate-900 dark:text-white">RedactaIA</span>, tu privacidad es nuestra prioridad absoluta. Aquí te explicamos cómo tratamos tus datos:</p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li><span className="font-bold text-slate-900 dark:text-white">Datos de Registro:</span> Solo guardamos tu nombre y email cuando inicias sesión con Google para personalizar tu experiencia.</li>
                                                <li><span className="font-bold text-slate-900 dark:text-white">Tus Generaciones:</span> Los textos que creas no se comparten con terceros ni se utilizan para entrenar otros modelos públicos.</li>
                                                <li><span className="font-bold text-slate-900 dark:text-white">Seguridad:</span> Utilizamos encriptación de grado bancario para proteger toda la comunicación entre tu navegador y Groq.</li>
                                                <li><span className="font-bold text-slate-900 dark:text-white">Publicidad:</span> NO vendemos tus datos a anunciantes ni a ninguna otra empresa.</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {activeLegalModal === 'terms' && (
                                    <div className="space-y-6">
                                        <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center text-primary-500 mb-6">
                                            <FileText size={32} />
                                        </div>
                                        <h2 className="text-3xl font-black tracking-tighter">Términos del Servicio</h2>
                                        <div className="space-y-4 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                            <p>Al utilizar RedactaIA, aceptas las siguientes condiciones:</p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li><span className="font-bold text-slate-900 dark:text-white">Uso Responsable:</span> Te comprometes a no usar la IA para generar contenido de odio, ilegal o fraudulento.</li>
                                                <li><span className="font-bold text-slate-900 dark:text-white">Propiedad:</span> El texto generado es tuyo. Puedes usarlo para fines comerciales o personales sin restricciones.</li>
                                                <li><span className="font-bold text-slate-900 dark:text-white">Suscripciones:</span> Los pagos se procesan vía PayPal. Puedes cancelar tu suscripción en cualquier momento desde tu panel.</li>
                                                <li><span className="font-bold text-slate-900 dark:text-white">Limitación:</span> Aunque usamos lo último en IA (Llama 3.3), revisa siempre el contenido para asegurar su exactitud profesional.</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {activeLegalModal === 'cookies' && (
                                    <div className="space-y-6">
                                        <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6">
                                            <Moon size={32} />
                                        </div>
                                        <h2 className="text-3xl font-black tracking-tighter">Política de Cookies</h2>
                                        <div className="space-y-4 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                            <p>Usamos solo las cookies necesarias para que tu experiencia sea perfecta:</p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li><span className="font-bold text-slate-900 dark:text-white">Sesión:</span> Para mantenerte conectado mientras trabajas en tus textos.</li>
                                                <li><span className="font-bold text-slate-900 dark:text-white">Preferencias:</span> Para recordar si prefieres el modo claro o el modo oscuro.</li>
                                                <li><span className="font-bold text-slate-900 dark:text-white">Analítica:</span> Usamos medidas anónimas para saber qué funciones gustan más y seguir mejorando.</li>
                                                <li><span className="font-bold text-slate-900 dark:text-white">No rastreo:</span> No usamos cookies de rastreo publicitario de terceros.</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Admin Panel Modal */}
                <AnimatePresence>
                    {showAdminPanel && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl"
                        >
                            <motion.div
                                initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
                                className="bg-white dark:bg-slate-900 w-full max-w-6xl h-[90vh] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800"
                            >
                                {/* Header Admin */}
                                <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary-600 p-3 rounded-2xl text-white shadow-lg shadow-primary-500/30">
                                            <Layout size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black tracking-tighter">Panel de Control</h2>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Administración de RedactaIA</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowAdminPanel(false)}
                                        className="p-3 rounded-full hover:bg-red-500 hover:text-white transition-all bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Content Tabs */}
                                <div className="flex-grow overflow-y-auto p-8">
                                    <div className="grid lg:grid-cols-3 gap-8">
                                        {/* Column: Users */}
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-black flex items-center gap-2">
                                                    <Globe className="text-primary-600" size={18} /> Usuarios
                                                </h3>
                                                <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-[10px] font-black">{adminData.users.length}</span>
                                            </div>
                                            <div className="space-y-3">
                                                {adminData.users.map(u => (
                                                    <div key={u.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                                                        <img src={u.picture} className="w-10 h-10 rounded-full border-2 border-primary-500/20" alt="" />
                                                        <div className="min-w-0">
                                                            <p className="font-bold text-sm truncate">{u.name}</p>
                                                            <p className="text-[10px] text-slate-500 truncate">{u.email}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Column: Subscriptions */}
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-black flex items-center gap-2">
                                                    <Zap className="text-amber-500" size={18} /> Ventas / Planes
                                                </h3>
                                                <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-[10px] font-black">{adminData.subscriptions.length}</span>
                                            </div>
                                            <div className="space-y-3">
                                                {adminData.subscriptions.map((s, idx) => (
                                                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary-600">{s.plan}</span>
                                                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md ${s.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{s.status}</span>
                                                        </div>
                                                        <p className="font-bold text-[11px] truncate">{s.user_email}</p>
                                                        <p className="text-[9px] text-slate-400 mt-1">{new Date(s.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Column: Messages */}
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-black flex items-center gap-2">
                                                    <Mail className="text-indigo-500" size={18} /> Mensajes de Contacto
                                                </h3>
                                                <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-[10px] font-black">{adminData.messages.length}</span>
                                            </div>
                                            <div className="space-y-3">
                                                {adminData.messages.map((m, idx) => (
                                                    <div key={idx} className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <div>
                                                                <p className="font-black text-xs">{m.name}</p>
                                                                <a href={`mailto:${m.email}`} className="text-[10px] text-primary-600 font-bold hover:underline">{m.email}</a>
                                                            </div>
                                                            <span className="text-[8px] text-slate-400 font-bold">{new Date(m.created_at).toLocaleDateString()}</span>
                                                        </div>
                                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic line-clamp-3">"{m.message}"</p>
                                                        <button
                                                            onClick={() => {
                                                                window.location.href = `mailto:${m.email}?subject=RE: RedactaIA Contacto&body=Hola ${m.name},`;
                                                            }}
                                                            className="mt-4 w-full py-2 bg-slate-100 dark:bg-slate-700 rounded-xl text-[10px] font-black hover:bg-primary-600 hover:text-white transition-all"
                                                        >
                                                            RESPONDER POR GMAIL
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer */}
                <footer className="py-20 border-t border-slate-200 dark:border-slate-800">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid md:grid-cols-4 gap-12 mb-16">
                            <div className="col-span-2">
                                <div className="flex items-center space-x-3 mb-8">
                                    <div className="bg-primary-600/10 p-1 rounded-xl">
                                        <img src="/logo-pro.png" alt="logo" className="w-8 h-8 object-cover rounded-lg" />
                                    </div>
                                    <span className="text-2xl font-black tracking-tighter">RedactaIA</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 max-w-sm font-medium leading-relaxed">
                                    Revolucionando la escritura creativa con inteligencia artificial de última generación. Únete a la nueva era del contenido.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-black mb-8 uppercase tracking-widest text-xs opacity-50">Legal</h4>
                                <ul className="space-y-4 text-sm font-bold text-slate-500">
                                    <li><button onClick={() => setActiveLegalModal('privacy')} className="hover:text-primary-600">Privacidad</button></li>
                                    <li><button onClick={() => setActiveLegalModal('terms')} className="hover:text-primary-600">Términos</button></li>
                                    <li><button onClick={() => setActiveLegalModal('cookies')} className="hover:text-primary-600">Cookies</button></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-black mb-8 uppercase tracking-widest text-xs opacity-50">Redes</h4>
                                <ul className="space-y-4 text-sm font-bold text-slate-500">
                                    <li><a href="https://www.tiktok.com/@redactaia" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 flex items-center gap-2">TikTok <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">@redactaia</span></a></li>
                                    <li><a href="#" className="hover:text-primary-600">Twitter</a></li>
                                    <li><a href="#" className="hover:text-primary-600">LinkedIn</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="text-center text-slate-400 text-xs font-bold border-t border-slate-100 dark:border-slate-900 pt-10">
                            © 2026 RedactaIA. Todos los derechos reservados. Diseñado para brillar.
                        </div>
                    </div>
                </footer>
                <Analytics />
            </div>
        </PayPalScriptProvider>
    );
};

export default App;
