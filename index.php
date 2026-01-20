<?php
// Page configuration
$page_title = "AI Wealth Lab | Tu Imperio de Ingresos Pasivos con IA";
$page_description = "Aprende a generar ingresos pasivos utilizando las herramientas de IA más potentes del mercado. Estrategias probadas para automatizar tu libertad financiera.";
$current_page = "inicio";

// Include header
include 'includes/header.php';
?>

<!-- Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
        <img src="assets/images/hero-bg.png" alt="RedactaIA Platform" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-primary-900/70"></div>
    </div>

    <!-- Animated particles/grid effect -->
    <div class="absolute inset-0 z-0 opacity-30">
        <div class="absolute inset-0"
            style="background-image: radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.3) 1px, transparent 0); background-size: 40px 40px;">
        </div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <!-- Pre-title -->
        <div
            class="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <i class="fas fa-coins text-yellow-400 mr-2"></i>
            <span class="text-white/90 text-sm font-medium">Libertad Financiera con Inteligencia Artificial</span>
        </div>

        <!-- Main Title -->
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
            Construye tu imperio de<br>
            <span class="gradient-text">ingresos pasivos</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-xl md:text-2xl text-white/80 mb-4 font-light">
            Automatiza tu libertad financiera con estrategias de IA de élite.
        </p>

        <!-- Tags -->
        <div class="flex flex-wrap justify-center gap-3 mb-10">
            <span class="px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium backdrop-blur-sm">
                <span class="px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium backdrop-blur-sm">
                    <i class="fab fa-youtube mr-2 text-red-500"></i>Faceless Channels
                </span>
                <span class="px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium backdrop-blur-sm">
                    <i class="fas fa-newspaper mr-2 text-blue-400"></i>AI Newsletters
                </span>
                <span class="px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium backdrop-blur-sm">
                    <i class="fas fa-code mr-2 text-emerald-400"></i>Micro-SaaS Assets
                </span>
                <span class="px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium backdrop-blur-sm">
                    <i class="fas fa-paint-brush mr-2 text-pink-400"></i>Digital Products
                </span>
                <span class="px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium backdrop-blur-sm">
                    <i class="fas fa-robot mr-2 text-amber-400"></i>AI Automations
                </span>
        </div>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <a href="#"
                class="btn-gradient inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-semibold text-lg">
                <i class="fas fa-crown mr-3"></i>
                Comenzar ahora
            </a>
            <a href="#como-funciona"
                class="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-lg backdrop-blur-sm border border-white/30 transition-all">
                <i class="fas fa-play-circle mr-3"></i>
                Ver cómo funciona
            </a>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#social-proof" class="flex flex-col items-center text-white/60 hover:text-white transition-colors">
                <span class="text-sm mb-2">Descubre más</span>
                <i class="fas fa-chevron-down"></i>
            </a>
        </div>
    </div>
</section>

<!-- Social Proof Section -->
<section id="social-proof" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Title -->
        <p class="text-center text-slate-500 mb-12 text-lg">
            <i class="fas fa-users mr-2 text-primary-500"></i>
            Usado por miles de creadores y negocios en todo el mundo
        </p>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Stat 1 -->
            <div class="text-center p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-violet-50 card-hover">
                <div class="text-5xl font-heading font-bold gradient-text mb-3">+$1M</div>
                <p class="text-slate-600 font-medium">Generado por alumnos</p>
            </div>

            <!-- Stat 2 -->
            <div class="text-center p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-violet-50 card-hover">
                <div class="text-5xl font-heading font-bold gradient-text mb-3">+5.000</div>
                <p class="text-slate-600 font-medium">Estudiantes activos</p>
            </div>

            <!-- Stat 3 -->
            <div class="text-center p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-violet-50 card-hover">
                <div class="text-5xl font-heading font-bold gradient-text mb-3">99%</div>
                <p class="text-slate-600 font-medium">Tasa de éxito en nichos</p>
            </div>
        </div>
    </div>
</section>

<!-- How it Works Section -->
<section id="como-funciona" class="py-24 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
            <span
                class="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
                <i class="fas fa-magic mr-2"></i>Proceso simple
            </span>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-4">
                ¿Cómo funciona <span class="gradient-text">AI Wealth Lab</span>?
            </h2>
            <p class="text-xl text-slate-600 max-w-2xl mx-auto">
                Tres pilares para construir tu libertad financiera con IA
            </p>
        </div>

        <!-- Steps Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Step 1 -->
            <div class="relative bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 card-hover">
                <div class="absolute -top-4 left-8">
                    <span
                        class="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-violet-500 text-white font-bold text-xl shadow-lg">
                        1
                    </span>
                </div>
                <div class="pt-8">
                    <div
                        class="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary-100 text-primary-600 mb-6">
                        <i class="fas fa-list-check text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-heading font-bold text-slate-900 mb-3">
                        Selecciona tu Nicho de Oro
                    </h3>
                    <p class="text-slate-600">
                        Identifica los mercados más rentables donde la IA tiene mayor ventaja competitiva hoy.
                    </p>
                </div>
            </div>

            <!-- Step 2 -->
            <div class="relative bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 card-hover">
                <div class="absolute -top-4 left-8">
                    <span
                        class="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-violet-500 text-white font-bold text-xl shadow-lg">
                        2
                    </span>
                </div>
                <div class="pt-8">
                    <div
                        class="w-16 h-16 flex items-center justify-center rounded-2xl bg-violet-100 text-violet-600 mb-6">
                        <i class="fas fa-wand-magic-sparkles text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-heading font-bold text-slate-900 mb-3">
                        Automatización con IA
                    </h3>
                    <p class="text-slate-600">
                        Configuramos sistemas que trabajan 24/7 generando contenido, ventas y tráfico sin tu
                        intervención.
                    </p>
                </div>
            </div>

            <!-- Step 3 -->
            <div class="relative bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 card-hover">
                <div class="absolute -top-4 left-8">
                    <span
                        class="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-violet-500 text-white font-bold text-xl shadow-lg">
                        3
                    </span>
                </div>
                <div class="pt-8">
                    <div class="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-100 text-blue-600 mb-6">
                        <i class="fas fa-rocket text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-heading font-bold text-slate-900 mb-3">
                        Escala tus Ingresos
                    </h3>
                    <p class="text-slate-600">
                        Replica el sistema en múltiples nichos para multiplicar tus fuentes de ingresos pasivos
                        mensualmente.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Features Section -->
<section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
            <span class="inline-block px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4">
                <i class="fas fa-bolt mr-2"></i>Funcionalidades
            </span>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-4">
                Todo lo que necesitas para <span class="gradient-text">vender más</span>
            </h2>
            <p class="text-xl text-slate-600 max-w-2xl mx-auto">
                Herramientas potentes de IA para crear contenido que convierte
            </p>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div
                class="group p-8 rounded-2xl border border-slate-200 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300 card-hover">
                <div
                    class="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 text-white mb-6 group-hover:scale-110 transition-transform">
                    <i class="fas fa-bullhorn text-xl"></i>
                </div>
                <h3 class="text-xl font-heading font-bold text-slate-900 mb-3">
                    Copies publicitarios
                </h3>
                <p class="text-slate-600">
                    Crea anuncios irresistibles para Facebook, Google, Instagram y más plataformas.
                </p>
            </div>

            <!-- Feature 2 -->
            <div
                class="group p-8 rounded-2xl border border-slate-200 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300 card-hover">
                <div
                    class="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 text-white mb-6 group-hover:scale-110 transition-transform">
                    <i class="fas fa-envelope-open-text text-xl"></i>
                </div>
                <h3 class="text-xl font-heading font-bold text-slate-900 mb-3">
                    Emails de venta
                </h3>
                <p class="text-slate-600">
                    Secuencias de email que convierten suscriptores en clientes fieles.
                </p>
            </div>

            <!-- Feature 3 -->
            <div
                class="group p-8 rounded-2xl border border-slate-200 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300 card-hover">
                <div
                    class="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-6 group-hover:scale-110 transition-transform">
                    <i class="fas fa-search text-xl"></i>
                </div>
                <h3 class="text-xl font-heading font-bold text-slate-900 mb-3">
                    Contenido SEO
                </h3>
                <p class="text-slate-600">
                    Artículos y textos optimizados para posicionar en Google.
                </p>
            </div>

            <!-- Feature 4 -->
            <div
                class="group p-8 rounded-2xl border border-slate-200 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300 card-hover">
                <div
                    class="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 text-white mb-6 group-hover:scale-110 transition-transform">
                    <i class="fas fa-hashtag text-xl"></i>
                </div>
                <h3 class="text-xl font-heading font-bold text-slate-900 mb-3">
                    Posts para redes
                </h3>
                <p class="text-slate-600">
                    Contenido viral para Instagram, LinkedIn, Twitter y TikTok.
                </p>
            </div>

            <!-- Feature 5 -->
            <div
                class="group p-8 rounded-2xl border border-slate-200 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300 card-hover">
                <div
                    class="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white mb-6 group-hover:scale-110 transition-transform">
                    <i class="fas fa-file-lines text-xl"></i>
                </div>
                <h3 class="text-xl font-heading font-bold text-slate-900 mb-3">
                    Páginas de venta
                </h3>
                <p class="text-slate-600">
                    Landing pages persuasivas que convierten visitantes en compradores.
                </p>
            </div>

            <!-- Feature 6 -->
            <div
                class="group p-8 rounded-2xl border border-slate-200 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300 card-hover">
                <div
                    class="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white mb-6 group-hover:scale-110 transition-transform">
                    <i class="fas fa-box-open text-xl"></i>
                </div>
                <h3 class="text-xl font-heading font-bold text-slate-900 mb-3">
                    Descripciones de productos
                </h3>
                <p class="text-slate-600">
                    Fichas de producto que destacan beneficios y aumentan ventas.
                </p>
            </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-12">
            <a href="funcionalidades.php"
                class="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-lg group">
                Ver todas las funcionalidades
                <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </a>
        </div>
    </div>
</section>

<!-- Use Cases Section -->
<section class="py-24 bg-slate-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
            <span class="inline-block px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold mb-4">
                <i class="fas fa-briefcase mr-2"></i>Casos de uso
            </span>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                Perfecto para <span class="text-violet-400">tu negocio</span>
            </h2>
            <p class="text-xl text-slate-400 max-w-2xl mx-auto">
                RedactaIA se adapta a cualquier industria y necesidad
            </p>
        </div>

        <!-- Use Cases Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <!-- Use Case 1 -->
            <div
                class="group text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/50 transition-all duration-300">
                <div
                    class="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-violet-500/20 text-primary-400 mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <i class="fas fa-chart-line text-2xl"></i>
                </div>
                <h3 class="font-heading font-semibold text-white">Marketing</h3>
            </div>

            <!-- Use Case 2 -->
            <div
                class="group text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/50 transition-all duration-300">
                <div
                    class="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-violet-500/20 text-violet-400 mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <i class="fas fa-handshake text-2xl"></i>
                </div>
                <h3 class="font-heading font-semibold text-white">Ventas</h3>
            </div>

            <!-- Use Case 3 -->
            <div
                class="group text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/50 transition-all duration-300">
                <div
                    class="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-violet-500/20 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <i class="fas fa-store text-2xl"></i>
                </div>
                <h3 class="font-heading font-semibold text-white">Ecommerce</h3>
            </div>

            <!-- Use Case 4 -->
            <div
                class="group text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/50 transition-all duration-300">
                <div
                    class="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-violet-500/20 text-pink-400 mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <i class="fas fa-pen-nib text-2xl"></i>
                </div>
                <h3 class="font-heading font-semibold text-white">Creadores</h3>
            </div>

            <!-- Use Case 5 -->
            <div
                class="group text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/50 transition-all duration-300 col-span-2 md:col-span-1">
                <div
                    class="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-violet-500/20 text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <i class="fas fa-building text-2xl"></i>
                </div>
                <h3 class="font-heading font-semibold text-white">Agencias</h3>
            </div>
        </div>
    </div>
</section>

<!-- CTA Banner Section -->
<section class="relative py-24 overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
        <img src="assets/images/cta-bg.png" alt="Background" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-violet-900/90"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
            Empieza a escribir <span class="text-violet-300">mejor</span> hoy
        </h2>
        <p class="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Únete a miles de profesionales que ya usan RedactaIA para crear contenido que convierte
        </p>
        <a href="#"
            class="btn-gradient inline-flex items-center justify-center px-10 py-5 rounded-full text-white font-semibold text-lg">
            <i class="fas fa-rocket mr-3"></i>
            Crear cuenta gratis
        </a>
        <p class="text-white/60 text-sm mt-6">
            <i class="fas fa-check-circle mr-2 text-emerald-400"></i>
            Sin tarjeta de crédito • Acceso inmediato
        </p>
    </div>
</section>

<!-- FAQ Section -->
<section class="py-24 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
            <span
                class="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
                <i class="fas fa-circle-question mr-2"></i>FAQ
            </span>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-4">
                Preguntas <span class="gradient-text">frecuentes</span>
            </h2>
        </div>

        <!-- FAQ Items -->
        <div class="space-y-4">
            <!-- FAQ 1 -->
            <div class="faq-item border border-slate-200 rounded-2xl overflow-hidden">
                <button
                    class="faq-trigger w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                    onclick="toggleFaq(this)">
                    <span class="text-lg font-semibold text-slate-900 pr-4">¿RedactaIA es gratis?</span>
                    <i class="fas fa-plus text-primary-500 faq-icon transition-transform"></i>
                </button>
                <div class="faq-content hidden px-6 pb-6">
                    <p class="text-slate-600">
                        Sí, ofrecemos un plan gratuito con créditos limitados cada mes. También tenemos planes de pago
                        con más funcionalidades y créditos ilimitados para profesionales y equipos.
                    </p>
                </div>
            </div>

            <!-- FAQ 2 -->
            <div class="faq-item border border-slate-200 rounded-2xl overflow-hidden">
                <button
                    class="faq-trigger w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                    onclick="toggleFaq(this)">
                    <span class="text-lg font-semibold text-slate-900 pr-4">¿En qué idiomas escribe?</span>
                    <i class="fas fa-plus text-primary-500 faq-icon transition-transform"></i>
                </button>
                <div class="faq-content hidden px-6 pb-6">
                    <p class="text-slate-600">
                        RedactaIA está optimizado para español, pero también puede generar textos en inglés, portugués,
                        francés, alemán, italiano y más de 25 idiomas adicionales.
                    </p>
                </div>
            </div>

            <!-- FAQ 3 -->
            <div class="faq-item border border-slate-200 rounded-2xl overflow-hidden">
                <button
                    class="faq-trigger w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                    onclick="toggleFaq(this)">
                    <span class="text-lg font-semibold text-slate-900 pr-4">¿Sirve para ventas?</span>
                    <i class="fas fa-plus text-primary-500 faq-icon transition-transform"></i>
                </button>
                <div class="faq-content hidden px-6 pb-6">
                    <p class="text-slate-600">
                        ¡Absolutamente! RedactaIA está diseñado específicamente para crear textos persuasivos que
                        convierten. Nuestros usuarios reportan mejoras de hasta un 85% en sus tasas de conversión.
                    </p>
                </div>
            </div>

            <!-- FAQ 4 -->
            <div class="faq-item border border-slate-200 rounded-2xl overflow-hidden">
                <button
                    class="faq-trigger w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                    onclick="toggleFaq(this)">
                    <span class="text-lg font-semibold text-slate-900 pr-4">¿Necesito experiencia en copywriting?</span>
                    <i class="fas fa-plus text-primary-500 faq-icon transition-transform"></i>
                </button>
                <div class="faq-content hidden px-6 pb-6">
                    <p class="text-slate-600">
                        No, para nada. RedactaIA está diseñado para que cualquier persona pueda crear textos
                        profesionales sin conocimientos previos de copywriting. La IA hace el trabajo pesado por ti.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- FAQ JavaScript -->
<script>
    function toggleFaq(trigger) {
        const item = trigger.parentElement;
        const content = item.querySelector('.faq-content');
        const icon = trigger.querySelector('.faq-icon');

        // Close all other FAQs
        document.querySelectorAll('.faq-item').forEach(function (faq) {
            if (faq !== item) {
                faq.querySelector('.faq-content').classList.add('hidden');
                faq.querySelector('.faq-icon').classList.remove('rotate-45');
            }
        });

        // Toggle current FAQ
        content.classList.toggle('hidden');
        icon.classList.toggle('rotate-45');
    }
</script>

<?php
// Include footer
include 'includes/footer.php';
?>