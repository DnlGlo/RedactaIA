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
    ArrowDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const premiumUsers = [
    'tuemail@gmail.com', // Pon tu propio email para probar
    'cliente-ejemplo@gmail.com'
];

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedText, setGeneratedText] = useState('');
    const [generatorConfig, setGeneratorConfig] = useState({
        topic: '',
        language: 'Español',
        type: 'Redacción',
        style: 'Formal'
    });

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

    // Google Login Simulation
    const handleGoogleLogin = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsLoggedIn(true);
            setUser({ name: 'Daniel', email: 'daniel@example.com', picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel' });
            setIsGenerating(false);
        }, 1500);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    const handleGenerate = async () => {
        if (!generatorConfig.topic) return;
        setIsGenerating(true);
        setGeneratedText('');

        try {
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `Actúa como un profesional experto en redacción.
            Idioma: ${generatorConfig.language}
            Tipo de texto: ${generatorConfig.type}
            Estilo: ${generatorConfig.style}
            Tema: ${generatorConfig.topic}
            
            Genera un contenido excelente, estructurado y listo para usar.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            setGeneratedText(text);
            // Scroll to result
            document.getElementById('result-area').scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error("Error generating text:", error);
            setGeneratedText(`Error: ${error.message || "No se pudo conectar con la IA"}. Verifica la VITE_GEMINI_KEY en Vercel.`);
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
        { name: 'Contacto', id: 'contact' },
    ];

    const languages = ['Español', 'English', 'Français', 'Deutsch', 'Italiano', 'Português', 'Nederlands', 'Русский', '中文', '日本語', 'العربية'];
    const textTypes = ['Redacción', 'Informe', 'Guion', 'Email', 'Redes Sociales', 'Blog Post', 'Newsletter', 'Resumen Ejecutivo', 'Carta Formal', 'Poema', 'Diálogo'];
    const styles = ['Formal', 'Informal', 'Humorístico', 'Profesional', 'Optimista', 'Persuasivo', 'Técnico', 'Narrativo', 'Descriptivo', 'Inspiracional'];

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
                                        <button onClick={handleLogout} className="p-2 hover:text-red-500 transition-colors">
                                            <LogOut className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => scrollToSection('generator')}
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
                                <span>Impulsado por Gemini 1.5 Pro</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                                Tus ideas, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                                    transformadas.
                                </span>
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
                                { title: "Integración API", desc: "Pronto disponible para conectar con tus apps.", icon: <Zap /> },
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
                                    {!isLoggedIn && (
                                        <div className="absolute inset-0 z-10 backdrop-blur-[4px] bg-white/40 dark:bg-slate-950/40 rounded-3xl flex flex-col items-center justify-center text-center p-8">
                                            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 max-w-sm">
                                                <div className="bg-primary-50 dark:bg-primary-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary-600">
                                                    <Lock size={32} />
                                                </div>
                                                <h3 className="text-2xl font-black mb-3">Acceso Restringido</h3>
                                                <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
                                                    Debes iniciar sesión con tu cuenta de Google para utilizar el generador.
                                                </p>
                                                <button
                                                    onClick={handleGoogleLogin}
                                                    disabled={isGenerating}
                                                    className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 py-4 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
                                                >
                                                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                                    </svg>
                                                    {isGenerating ? 'Iniciando...' : 'Entrar con Google'}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-black mb-3 text-slate-400 uppercase tracking-tighter">Tema o Prompt</label>
                                                <textarea
                                                    className="w-full h-40 p-5 rounded-3xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 outline-none focus:border-primary-500 transition-all font-medium resize-none"
                                                    placeholder="Ej: Escribe un informe sobre la IA en la educación..."
                                                    value={generatorConfig.topic}
                                                    onChange={(e) => setGeneratorConfig({ ...generatorConfig, topic: e.target.value })}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-black mb-2 text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                                                        <Languages size={12} /> Idioma
                                                    </label>
                                                    <select
                                                        className="w-full p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 outline-none font-bold"
                                                        value={generatorConfig.language}
                                                        onChange={(e) => setGeneratorConfig({ ...generatorConfig, language: e.target.value })}
                                                    >
                                                        {languages.map(l => <option key={l} value={l}>{l}</option>)}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-black mb-2 text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                                                        <Type size={12} /> Tipo de Texto
                                                    </label>
                                                    <select
                                                        className="w-full p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 outline-none font-bold"
                                                        value={generatorConfig.type}
                                                        onChange={(e) => setGeneratorConfig({ ...generatorConfig, type: e.target.value })}
                                                    >
                                                        {textTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-black mb-2 text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                                                    <Palette size={12} /> Estilo
                                                </label>
                                                <select
                                                    className="w-full p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 outline-none font-bold"
                                                    value={generatorConfig.style}
                                                    onChange={(e) => setGeneratorConfig({ ...generatorConfig, style: e.target.value })}
                                                >
                                                    {styles.map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </div>

                                            <button
                                                onClick={handleGenerate}
                                                disabled={isGenerating || !generatorConfig.topic}
                                                className="w-full py-5 bg-gradient-to-r from-primary-600 to-indigo-600 text-white rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-xl shadow-primary-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                            >
                                                {isGenerating ? (
                                                    <><div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> <span>Generando...</span></>
                                                ) : (
                                                    <><Send size={20} /> <span>¡Generar ahora!</span></>
                                                )}
                                            </button>
                                        </div>

                                        <div id="result-area" className="bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] p-8 border-2 border-slate-100 dark:border-slate-800 flex flex-col min-h-[400px]">
                                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                                                <span className="text-primary-600 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></div>
                                                    Resultado de RedactaIA
                                                </span>
                                                <div className="flex gap-2">
                                                    <button onClick={() => alert('Copiado')} className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700">
                                                        <Copy size={16} />
                                                    </button>
                                                    <button onClick={() => alert('Descargado')} className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700">
                                                        <Download size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex-grow font-medium leading-relaxed overflow-y-auto max-h-[450px] whitespace-pre-wrap">
                                                {generatedText ? (
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{generatedText}</motion.div>
                                                ) : (
                                                    <div className="h-full flex flex-col items-center justify-center text-slate-400 italic text-center space-y-4">
                                                        <MessageSquare size={48} className="opacity-20" />
                                                        <p>Esperando tu creatividad... <br />Configura los campos y dale a generar.</p>
                                                    </div>
                                                )}
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
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-black mb-6">Planes para Todos</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">Elige el plan que mejor se adapte a tu volumen de contenido.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Free */}
                            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-[3rem] flex flex-col">
                                <h3 className="text-2xl font-black mb-2">Gratis</h3>
                                <p className="text-slate-500 mb-8 font-medium">Ideal para probar la herramienta de forma puntual.</p>
                                <div className="flex items-baseline mb-8">
                                    <span className="text-5xl font-black">0€</span>
                                    <span className="text-slate-400 ml-2 font-bold">/siempre</span>
                                </div>
                                <ul className="space-y-4 mb-10 flex-grow">
                                    {['10 generaciones mensuales', '5 idiomas disponibles', 'Estilo básico', 'Soporte comunitario'].map(i => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                                            <div className="p-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-400"><Check size={14} /></div>
                                            <span>{i}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full py-4 rounded-3xl border-2 border-slate-200 dark:border-slate-700 font-black hover:bg-white dark:hover:bg-slate-800 transition-all">
                                    Empezar Gratis
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
                                    <span className="text-5xl font-black">19,99€</span>
                                    <span className="text-slate-400 ml-2 font-bold">/mes</span>
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
                                                purchase_units: [{ amount: { value: "19.99", currency_code: "EUR" }, description: "RedactaIA Premium" }]
                                            });
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order.capture().then((details) => {
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
                                    <span className="text-5xl font-black">59,99€</span>
                                    <span className="text-slate-400 ml-2 font-bold">/mes</span>
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
                                                purchase_units: [{ amount: { value: "59.99", currency_code: "EUR" }, description: "RedactaIA Empresa" }]
                                            });
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order.capture().then((details) => {
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

                {/* Contact Section */}
                <section id="contact" className="py-32 px-4 relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/10 blur-[120px] rounded-full -z-10"></div>
                    <div className="max-w-4xl mx-auto bg-slate-900 dark:bg-slate-800 rounded-[3rem] p-12 text-white text-center shadow-2xl">
                        <h2 className="text-4xl font-black mb-6">¿Alguna duda o problema?</h2>
                        <p className="text-slate-400 mb-12 max-w-lg mx-auto font-medium">Nuestro equipo está listo para ayudarte a llevar tu redacción al siguiente nivel.</p>

                        <form className="grid md:grid-cols-2 gap-6 text-left" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Nombre</label>
                                <input className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-primary-500" placeholder="Tu nombre" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email</label>
                                <input className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-primary-500" placeholder="correo@ejemplo.com" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Mensaje</label>
                                <textarea className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-primary-500 h-32 resize-none" placeholder="¿En qué podemos ayudarte?"></textarea>
                            </div>
                            <button className="md:col-span-2 py-5 bg-primary-600 rounded-2xl font-black hover:bg-primary-500 transition-all shadow-xl shadow-primary-600/20">
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>
                </section>

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
                                    <li><a href="#" className="hover:text-primary-600">Privacidad</a></li>
                                    <li><a href="#" className="hover:text-primary-600">Términos</a></li>
                                    <li><a href="#" className="hover:text-primary-600">Cookies</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-black mb-8 uppercase tracking-widest text-xs opacity-50">Redes</h4>
                                <ul className="space-y-4 text-sm font-bold text-slate-500">
                                    <li><a href="#" className="hover:text-primary-600">Twitter</a></li>
                                    <li><a href="#" className="hover:text-primary-600">LinkedIn</a></li>
                                    <li><a href="#" className="hover:text-primary-600">Instagram</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="text-center text-slate-400 text-xs font-bold border-t border-slate-100 dark:border-slate-900 pt-10">
                            © 2026 RedactaIA. Todos los derechos reservados. Diseñado para brillar.
                        </div>
                    </div>
                </footer>
            </div>
        </PayPalScriptProvider>
    );
};

export default App;
