import React, { useState, useEffect } from 'react';
import {
    PenNib,
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
    Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    // Sync with system preference & storage
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

    const navLinks = [
        { name: 'Funcionalidades', id: 'features' },
        { name: 'Precios', id: 'pricing' },
        { name: 'Opiniones', id: 'testimonials' },
        { name: 'Contacto', id: 'contact' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center space-x-2">
                            <div className="bg-primary-600 p-2 rounded-xl">
                                <PenNib className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">
                                Redacta<span className="text-primary-600">IA</span>
                            </span>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 font-medium transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-primary-600/20 transition-all active:scale-95">
                                Empezar Gratis
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="hero" className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-semibold mb-6">
                            <Sparkles size={16} />
                            <span>Impulsado por GPT-4o & Claude 3.5</span>
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
                            Escribe contenido que <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                                vende y enamora
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            La plataforma de IA especializada en redacción profesional. Blogs, newsletters y redes sociales listos en segundos.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <button className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl shadow-primary-600/20 transition-all flex items-center justify-center space-x-2 group">
                                <span>Pruébalo Ahora</span>
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="w-full sm:w-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-10 py-4 rounded-full text-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                Ver Demostración
                            </button>
                        </div>
                    </motion.div>

                    {/* Generator Preview Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mt-20 relative max-w-5xl mx-auto"
                    >
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
                            <div className="flex items-center space-x-2 p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>
                                <span className="text-sm font-medium text-slate-500">Nuevo Artículo de Blog</span>
                            </div>
                            <div className="p-8 text-left">
                                <div className="grid md:grid-cols-3 gap-8">
                                    <div className="md:col-span-1 space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold mb-2">Tema Principal</label>
                                            <input
                                                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary-500 transition-all"
                                                placeholder="Ej: Marketing Digital 2024"
                                                readOnly
                                                value="Beneficios de la IA en PYMES"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-2">Tono</label>
                                            <div className="flex gap-2">
                                                {['Profesional', 'Creativo', 'Directo'].map(t => (
                                                    <span key={t} className={`px-3 py-1 rounded-lg text-xs font-semibold ${t === 'Profesional' ? 'bg-primary-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="w-full py-3 bg-primary-600 text-white rounded-xl font-bold flex items-center justify-center space-x-2">
                                            <Zap size={18} />
                                            <span>Generar Texto</span>
                                        </button>
                                    </div>
                                    <div className="md:col-span-2 bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                                            <span className="text-primary-600 font-bold">Respuesta de RedactaIA</span>
                                            <div className="flex space-x-2">
                                                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800"></div>
                                                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                                            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                                            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
                                            <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-xl w-full flex items-center justify-center">
                                                <motion.div
                                                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                                                    transition={{ repeat: Infinity, duration: 2 }}
                                                    className="text-slate-400 italic"
                                                >
                                                    Generando contenido mágico...
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Background Decorations */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-24 bg-white dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Todo lo que necesitas para brillar</h2>
                        <p className="text-slate-600 dark:text-slate-400">Herramientas diseñadas para maximizar tu productividad creativa.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <Layout className="text-blue-500" />, title: "Blogs SEO-Ready", desc: "Artículos optimizados estructuralmente para posicionar en Google desde el primer día." },
                            { icon: <Mail className="text-purple-500" />, title: "Newsletters", desc: "Boletines que mantienen a tu audiencia enganchada y aumentan tu tasa de apertura." },
                            { icon: <Share2 className="text-indigo-500" />, title: "Redes Sociales", desc: "Crea copys virales para LinkedIn, Instagram y Twitter en un par de clics." },
                        ].map((f, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all group">
                                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Planes simples y transparentes</h2>
                        <p className="text-slate-600 dark:text-slate-400">Escala a medida que crece tu necesidad de contenido.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 items-end">
                        {/* Free Plan */}
                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <h3 className="text-xl font-bold mb-2">Gratis</h3>
                            <div className="flex items-baseline mb-6">
                                <span className="text-4xl font-black">0€</span>
                                <span className="text-slate-500 ml-1">/mes</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {['5 Generaciones / mes', 'Modelos básicos', 'Soporte por email'].map(item => (
                                    <li key={item} className="flex items-center space-x-3 text-sm">
                                        <Check className="text-primary-600" size={16} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                Empezar Ya
                            </button>
                        </div>

                        {/* Popular Plan */}
                        <div className="p-8 rounded-3xl bg-slate-900 dark:bg-primary-900/20 border-2 border-primary-600 transform scale-105 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-primary-600 text-white text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">
                                Más Popular
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">Popular</h3>
                            <div className="flex items-baseline mb-6">
                                <span className="text-4xl font-black text-white">19€</span>
                                <span className="text-indigo-300 ml-1">/mes</span>
                            </div>
                            <ul className="space-y-4 mb-8 text-indigo-100/80">
                                {['Generaciones ilimitadas', 'Acceso a Claude 3.5 Sonnet', 'Prioridad en soporte', 'IA personalizada'].map(item => (
                                    <li key={item} className="flex items-center space-x-3 text-sm">
                                        <Check className="text-primary-400" size={18} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-4 rounded-xl bg-primary-600 text-white font-black shadow-lg shadow-primary-600/40 hover:bg-primary-500 transition-all">
                                Suscribirse Ahora
                            </button>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <h3 className="text-xl font-bold mb-2">Empresa</h3>
                            <div className="flex items-baseline mb-6">
                                <span className="text-4xl font-black">49€</span>
                                <span className="text-slate-500 ml-1">/mes</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {['Todo en Popular', 'Múltiples usuarios', 'API Access', 'Consultoría mensual'].map(item => (
                                    <li key={item} className="flex items-center space-x-3 text-sm">
                                        <Check className="text-primary-600" size={16} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                Contactar Ventas
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 text-white py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-2">
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="bg-primary-600 p-2 rounded-xl">
                                    <PenNib className="text-white w-6 h-6" />
                                </div>
                                <span className="text-2xl font-bold tracking-tight">
                                    RedactaIA
                                </span>
                            </div>
                            <p className="text-slate-400 max-w-sm leading-relaxed">
                                Transformando la manera en que los creadores y empresas escriben su futuro con inteligencia artificial de vanguardia.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">Producto</h4>
                            <ul className="space-y-4 text-slate-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Funcionalidades</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Seguridad</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">Legal</h4>
                            <ul className="space-y-4 text-slate-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                        © 2026 RedactaIA. Hecho con ❤️ para creadores digitales.
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default App;
