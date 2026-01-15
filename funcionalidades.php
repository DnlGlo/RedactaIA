<?php
// Page configuration
$page_title = "Funcionalidades | RedactaIA";
$page_description = "Descubre todas las funcionalidades de RedactaIA: generador de copies, emails de venta, contenido SEO, posts para redes y más.";
$current_page = "funcionalidades";

// Include header
include 'includes/header.php';
?>

<!-- Hero Section -->
<section class="relative py-20 bg-gradient-to-br from-slate-900 via-primary-900 to-violet-900 overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 opacity-30">
        <div class="absolute inset-0"
            style="background-image: radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.3) 1px, transparent 0); background-size: 40px 40px;">
        </div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="inline-block px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold mb-6">
            <i class="fas fa-bolt mr-2"></i>Potencia tu contenido
        </span>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            Todas las <span class="text-violet-400">funcionalidades</span><br>que necesitas
        </h1>
        <p class="text-xl text-white/80 max-w-2xl mx-auto">
            Herramientas de IA diseñadas para crear contenido que convierte en cualquier formato
        </p>
    </div>
</section>

<!-- Marketing Tools Section -->
<section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
                <span
                    class="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
                    <i class="fas fa-chart-line mr-2"></i>Marketing
                </span>
                <h2 class="text-3xl md:text-4xl font-heading font-bold text-slate-900">
                    Herramientas para <span class="gradient-text">marketing</span>
                </h2>
            </div>
            <p class="text-slate-600 max-w-md mt-4 md:mt-0">
                Crea campañas que capturan la atención y generan resultados
            </p>
        </div>

        <!-- Marketing Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div
                class="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-primary-50 border border-slate-200 hover:shadow-xl transition-all duration-300 card-hover">
                <div
                    class="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 text-white mb-6 group-hover:scale-110 transition-transform">
                    <i class="fab fa-facebook text-xl"></i>
                </div>
                <h3 class="text-xl font-heading font-bold text-slate-900 mb-3">Facebook Ads</h3>
                <p class="text-slate-600 mb-4">Anuncios optimizados para Facebook e Instagram que capturan la atención
                    en el scroll.</p>
                <ul class="space-y-2 text-sm text-slate-600">
                    <li><i class="fas fa-check text-primary-500 mr-2"></i>Headlines persuasivos</li>
                    <li><i class="fas fa-check text-primary-500 mr-2"></i>Copy primario y descripción</li>
                    <li><i class="fas fa-check text-primary-500 mr-2"></i>CTAs efectivos</li>
                </ul>
            </div>

            <!-- Feature 2 -->
            <div
                class="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-primary-50 border border-slate-200 hover:shadow-xl transition-all duration-300 card-hover">
                <div
                    class="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-6 group-hover:scale-110 transition-transform">
                    <i class="fab fa-google text-xl"></i>
                </div>
                <h3 class="text-xl font-heading font-bold text-slate-900 mb-3">Google Ads</h3>
                <p class="text-slate-600 mb-4">Anuncios de búsqueda y display que atraen clics cualificados.</p>
                <ul class="space-y-2 text-sm text-slate-600">
                    <li><i class="fas fa-check text-primary-500 mr-2"></i>Títulos con palabras clave</li>
                    <li><i class="fas fa-check text-primary-500 mr-2"></i>Descripciones persuasivas</li>
                    <li><i class="fas fa-check text-primary-500 mr-2"></i>Extensiones de anuncio</li>
                </ul>
            </div>

            <!-- Feature 3 -->
            <div
                class="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-primary-50 border border-slate-200 hover:shadow-xl transition-all duration-300 card-hover">
                <div
                    class="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 text-white mb-6 group-hover:scale-110 transition-transform">
                    <i class="fas fa-file-alt text-xl"></i>
                </div>
                <h3 class="text-xl font-heading font-bold text-slate-900 mb-3">Landing Pages</h3>
                <p class="text-slate-600 mb-4">Textos para páginas de aterrizaje que maximizan conversiones.</p>
                <ul class="space-y-2 text-sm text-slate-600">
                    <li><i class="fas fa-check text-primary-500 mr-2"></i>Headlines magnéticos</li>
                    <li><i class="fas fa-check text-primary-500 mr-2"></i>Beneficios claros</li>
                    <li><i class="fas fa-check text-primary-500 mr-2"></i>Testimonios y CTAs</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- Sales Tools Section -->
<section class="py-24 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
                <span
                    class="inline-block px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4">
                    <i class="fas fa-handshake mr-2"></i>Ventas
                </span>
                <h2 class="text-3xl md:text-4xl font-heading font-bold text-slate-900">
                    Herramientas para <span class="gradient-text">ventas</span>
                </h2>
            </div>
            <p class="text-slate-600 max-w-md mt-4 md:mt-0">
                Textos que convierten prospectos en clientes
            </p>
        </div>

        <!-- Sales Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div
                class="group p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-xl transition-all duration-300 card-hover">
                <div
                    class="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 text-white mb-6 group-hover:scale-110 transition-transform">
                    <i class="fas fa-envelope-open-text text-xl"></i>
                </div>
                <h3 class="text-xl font-heading font-bold text-slate-900 mb-3">Emails de venta</h3>
                <p class="text-slate-600 mb-4">Secuencias de email que nutren y convierten suscriptores en clientes.</p>
                <ul class="space-y-2 text-sm text-slate-600">
                    <li><i class="fas fa-check text-violet-500 mr-2"></i>Subject lines irresistibles</li>
                    <li><i class="fas fa-check text-violet-500 mr-2"></i>Copy persuasivo</li>
                    <li><i class="fas fa-check text-violet-500 mr-2"></i>Secuencias automatizadas</li>
                </ul>
            </div>

            <!-- Feature 2 -->
            <div
                class="group p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-xl transition-all duration-300 card-hover">
                <div
                    class="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white mb-6 group-hover:scale-110 transition-transform">
                    <i class="fas fa-comments-dollar text-xl"></i>
                </div>
                <h3 class="text-xl font-heading font-bold text-slate-900 mb-3">Scripts de venta</h3>
                <p class="text-slate-600 mb-4">Guiones para llamadas y presentaciones que cierran ventas.</p>
                <ul class="space-y-2 text-sm text-slate-600">
                    <li><i class="fas fa-check text-violet-500 mr-2"></i>Aperturas efectivas</li>
                    <li><i class="fas fa-check text-violet-500 mr-2"></i>Manejo de objeciones</li>
                    <li><i class="fas fa-check text-violet-500 mr-2"></i>Técnicas de cierre</li>
                </ul>
            </div>

            <!-- Feature 3 -->
            <div
                class="group p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-xl transition-all duration-300 card-hover">
                <div
                    class="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white mb-6 group-hover:scale-110 transition-transform">
                    <i class="fas fa-file-signature text-xl"></i>
                </div>
                <h3 class="text-xl font-heading font-bold text-slate-900 mb-3">Propuestas comerciales</h3>
                <p class="text-slate-600 mb-4">Propuestas profesionales que destacan tu valor único.</p>
                <ul class="space-y-2 text-sm text-slate-600">
                    <li><i class="fas fa-check text-violet-500 mr-2"></i>Estructura profesional</li>
                    <li><i class="fas fa-check text-violet-500 mr-2"></i>Beneficios claros</li>
                    <li><i class="fas fa-check text-violet-500 mr-2"></i>Call to action efectivo</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- Content Tools Section -->
<section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
                <span class="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
                    <i class="fas fa-pen-nib mr-2"></i>Contenido
                </span>
                <h2 class="text-3xl md:text-4xl font-heading font-bold text-slate-900">
                    Herramientas para <span class="gradient-text">contenido</span>
                </h2>
            </div>
            <p class="text-slate-600 max-w-md mt-4 md:mt-0">
                Crea contenido valioso que atrae y engancha a tu audiencia
            </p>
        </div>

        <!-- Content Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Feature 1 -->
            <div
                class="group p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-slate-200 hover:shadow-lg transition-all duration-300 card-hover">
                <div
                    class="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-4 group-hover:scale-110 transition-transform">
                    <i class="fas fa-search text-lg"></i>
                </div>
                <h3 class="text-lg font-heading font-bold text-slate-900 mb-2">Artículos SEO</h3>
                <p class="text-slate-600 text-sm">Contenido optimizado para posicionar en Google.</p>
            </div>

            <!-- Feature 2 -->
            <div
                class="group p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-slate-200 hover:shadow-lg transition-all duration-300 card-hover">
                <div
                    class="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 text-white mb-4 group-hover:scale-110 transition-transform">
                    <i class="fab fa-instagram text-lg"></i>
                </div>
                <h3 class="text-lg font-heading font-bold text-slate-900 mb-2">Posts Instagram</h3>
                <p class="text-slate-600 text-sm">Captions que generan engagement y seguidores.</p>
            </div>

            <!-- Feature 3 -->
            <div
                class="group p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-slate-200 hover:shadow-lg transition-all duration-300 card-hover">
                <div
                    class="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 text-white mb-4 group-hover:scale-110 transition-transform">
                    <i class="fab fa-linkedin text-lg"></i>
                </div>
                <h3 class="text-lg font-heading font-bold text-slate-900 mb-2">Posts LinkedIn</h3>
                <p class="text-slate-600 text-sm">Contenido profesional que construye autoridad.</p>
            </div>

            <!-- Feature 4 -->
            <div
                class="group p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 hover:shadow-lg transition-all duration-300 card-hover">
                <div
                    class="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-gray-700 text-white mb-4 group-hover:scale-110 transition-transform">
                    <i class="fab fa-x-twitter text-lg"></i>
                </div>
                <h3 class="text-lg font-heading font-bold text-slate-900 mb-2">Hilos Twitter/X</h3>
                <p class="text-slate-600 text-sm">Threads virales que expanden tu alcance.</p>
            </div>
        </div>
    </div>
</section>

<!-- Example Generated Text Section -->
<section class="py-24 bg-slate-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
            <span class="inline-block px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold mb-4">
                <i class="fas fa-sparkles mr-2"></i>Ejemplos reales
            </span>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                Textos generados por <span class="text-violet-400">RedactaIA</span>
            </h2>
            <p class="text-xl text-slate-400 max-w-2xl mx-auto">
                Mira algunos ejemplos de lo que nuestra IA puede crear para ti
            </p>
        </div>

        <!-- Examples Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Example 1 -->
            <div class="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div class="flex items-center mb-4">
                    <div
                        class="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-500/20 text-primary-400 mr-3">
                        <i class="fab fa-facebook"></i>
                    </div>
                    <span class="text-white font-semibold">Facebook Ad</span>
                </div>
                <p class="text-slate-300 leading-relaxed">
                    "🚀 ¿Cansado de perder horas escribiendo textos que no convierten?<br><br>
                    Con RedactaIA, crea copies profesionales en segundos. Anuncios, emails, posts... todo lo que
                    necesitas para vender más.<br><br>
                    ✅ Sin experiencia requerida<br>
                    ✅ Resultados instantáneos<br>
                    ✅ Prueba gratis<br><br>
                    👉 Haz clic y empieza ahora"
                </p>
            </div>

            <!-- Example 2 -->
            <div class="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div class="flex items-center mb-4">
                    <div
                        class="w-10 h-10 flex items-center justify-center rounded-lg bg-violet-500/20 text-violet-400 mr-3">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <span class="text-white font-semibold">Email de venta</span>
                </div>
                <p class="text-slate-300 leading-relaxed">
                    <strong class="text-white">Asunto: El secreto de los mejores copywriters (revelado)</strong><br><br>
                    Hola [Nombre],<br><br>
                    ¿Sabías que los copywriters profesionales cobran $500+ por un solo texto de venta?<br><br>
                    Hoy puedes tener acceso a la misma calidad de textos por una fracción del precio, generados en
                    segundos por nuestra IA...<br><br>
                    <span class="text-primary-400">[Leer más →]</span>
                </p>
            </div>
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="relative py-24 overflow-hidden">
    <div class="absolute inset-0 z-0">
        <img src="assets/images/cta-bg.png" alt="Background" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-violet-900/90"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
            Prueba todas las funcionalidades <span class="text-violet-300">gratis</span>
        </h2>
        <p class="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Crea tu cuenta y empieza a generar textos profesionales en segundos
        </p>
        <a href="#"
            class="btn-gradient inline-flex items-center justify-center px-10 py-5 rounded-full text-white font-semibold text-lg">
            <i class="fas fa-rocket mr-3"></i>
            Empezar gratis
        </a>
    </div>
</section>

<?php
// Include footer
include 'includes/footer.php';
?>