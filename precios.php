<?php
$page_title = "Precios | RedactaIA";
$page_description = "Planes y precios de RedactaIA. Elige el plan perfecto para ti.";
$current_page = "precios";
include 'includes/header.php';
?>

<!-- Hero Section -->
<section class="relative py-20 bg-gradient-to-br from-slate-900 via-primary-900 to-violet-900 overflow-hidden">
    <div class="absolute inset-0 opacity-30">
        <div class="absolute inset-0"
            style="background-image: radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.3) 1px, transparent 0); background-size: 40px 40px;">
        </div>
    </div>
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="inline-block px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold mb-6">
            <i class="fas fa-tag mr-2"></i>Precios transparentes
        </span>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            Elige tu <span class="text-violet-400">plan perfecto</span>
        </h1>
        <p class="text-xl text-white/80 max-w-2xl mx-auto">
            Planes flexibles que crecen contigo. Empieza gratis y escala cuando lo necesites.
        </p>
    </div>
</section>

<!-- Pricing Section -->
<section class="py-24 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Billing Toggle -->
        <div class="flex justify-center mb-16">
            <div class="inline-flex items-center p-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
                <button id="monthly-toggle"
                    class="px-6 py-2.5 rounded-full text-sm font-semibold transition-all bg-primary-600 text-white"
                    onclick="toggleBilling('monthly')">Mensual</button>
                <button id="annual-toggle"
                    class="px-6 py-2.5 rounded-full text-sm font-semibold transition-all text-slate-600 hover:text-primary-600"
                    onclick="toggleBilling('annual')">Anual <span class="text-emerald-500 ml-1">-20%</span></button>
            </div>
        </div>

        <!-- Pricing Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <!-- Free Plan -->
            <div class="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-200 card-hover">
                <div class="text-center mb-8">
                    <h3 class="text-xl font-heading font-bold text-slate-900 mb-2">Gratis</h3>
                    <p class="text-slate-500 text-sm mb-6">Para empezar a explorar</p>
                    <div class="flex items-baseline justify-center">
                        <span class="text-5xl font-heading font-bold text-slate-900">$0</span>
                        <span class="text-slate-500 ml-2">/mes</span>
                    </div>
                </div>
                <ul class="space-y-4 mb-8">
                    <li class="flex items-start"><i class="fas fa-check text-emerald-500 mt-1 mr-3"></i><span
                            class="text-slate-600">10 textos por mes</span></li>
                    <li class="flex items-start"><i class="fas fa-check text-emerald-500 mt-1 mr-3"></i><span
                            class="text-slate-600">5 plantillas básicas</span></li>
                    <li class="flex items-start"><i class="fas fa-check text-emerald-500 mt-1 mr-3"></i><span
                            class="text-slate-600">1 idioma (español)</span></li>
                    <li class="flex items-start"><i class="fas fa-check text-emerald-500 mt-1 mr-3"></i><span
                            class="text-slate-600">Soporte por email</span></li>
                </ul>
                <a href="#"
                    class="block w-full py-4 rounded-full border-2 border-slate-300 text-slate-700 font-semibold text-center hover:border-primary-500 hover:text-primary-600 transition-all">Empezar
                    gratis</a>
            </div>

            <!-- Pro Plan (Featured) -->
            <div
                class="relative bg-gradient-to-br from-primary-600 to-violet-600 rounded-3xl p-8 shadow-xl shadow-primary-500/25 transform md:scale-105 z-10">
                <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span
                        class="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-400 text-amber-900 text-sm font-bold shadow-lg"><i
                            class="fas fa-star mr-2"></i>Más popular</span>
                </div>
                <div class="text-center mb-8 pt-4">
                    <h3 class="text-xl font-heading font-bold text-white mb-2">Pro</h3>
                    <p class="text-white/70 text-sm mb-6">Para profesionales</p>
                    <div class="flex items-baseline justify-center">
                        <span class="text-5xl font-heading font-bold text-white price-monthly">$29</span>
                        <span class="text-5xl font-heading font-bold text-white price-annual hidden">$23</span>
                        <span class="text-white/70 ml-2">/mes</span>
                    </div>
                </div>
                <ul class="space-y-4 mb-8 text-white">
                    <li class="flex items-start"><i class="fas fa-check text-emerald-300 mt-1 mr-3"></i><span>Textos
                            ilimitados</span></li>
                    <li class="flex items-start"><i class="fas fa-check text-emerald-300 mt-1 mr-3"></i><span>+50
                            plantillas</span></li>
                    <li class="flex items-start"><i class="fas fa-check text-emerald-300 mt-1 mr-3"></i><span>25+
                            idiomas</span></li>
                    <li class="flex items-start"><i class="fas fa-check text-emerald-300 mt-1 mr-3"></i><span>Soporte
                            prioritario</span></li>
                </ul>
                <a href="#"
                    class="block w-full py-4 rounded-full bg-white text-primary-600 font-semibold text-center hover:bg-slate-100 transition-all shadow-lg"><i
                        class="fas fa-rocket mr-2"></i>Empezar ahora</a>
            </div>

            <!-- Business Plan -->
            <div class="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-200 card-hover">
                <div class="text-center mb-8">
                    <h3 class="text-xl font-heading font-bold text-slate-900 mb-2">Business</h3>
                    <p class="text-slate-500 text-sm mb-6">Para equipos</p>
                    <div class="flex items-baseline justify-center">
                        <span class="text-5xl font-heading font-bold text-slate-900 price-monthly">$99</span>
                        <span class="text-5xl font-heading font-bold text-slate-900 price-annual hidden">$79</span>
                        <span class="text-slate-500 ml-2">/mes</span>
                    </div>
                </div>
                <ul class="space-y-4 mb-8">
                    <li class="flex items-start"><i class="fas fa-check text-emerald-500 mt-1 mr-3"></i><span
                            class="text-slate-600">Todo lo de Pro</span></li>
                    <li class="flex items-start"><i class="fas fa-check text-emerald-500 mt-1 mr-3"></i><span
                            class="text-slate-600">Hasta 10 usuarios</span></li>
                    <li class="flex items-start"><i class="fas fa-check text-emerald-500 mt-1 mr-3"></i><span
                            class="text-slate-600">API access</span></li>
                    <li class="flex items-start"><i class="fas fa-check text-emerald-500 mt-1 mr-3"></i><span
                            class="text-slate-600">Soporte 24/7</span></li>
                </ul>
                <a href="#"
                    class="block w-full py-4 rounded-full border-2 border-slate-300 text-slate-700 font-semibold text-center hover:border-primary-500 hover:text-primary-600 transition-all">Contactar
                    ventas</a>
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
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">¿Listo para escribir <span
                class="text-violet-300">mejor</span>?</h2>
        <p class="text-xl text-white/80 mb-10">Empieza gratis hoy y descubre el poder de la IA</p>
        <a href="#"
            class="btn-gradient inline-flex items-center justify-center px-10 py-5 rounded-full text-white font-semibold text-lg"><i
                class="fas fa-rocket mr-3"></i>Crear cuenta gratis</a>
    </div>
</section>

<script>
    function toggleBilling(type) {
        const monthlyBtn = document.getElementById('monthly-toggle');
        const annualBtn = document.getElementById('annual-toggle');
        const monthlyPrices = document.querySelectorAll('.price-monthly');
        const annualPrices = document.querySelectorAll('.price-annual');

        if (type === 'monthly') {
            monthlyBtn.classList.add('bg-primary-600', 'text-white');
            monthlyBtn.classList.remove('text-slate-600');
            annualBtn.classList.remove('bg-primary-600', 'text-white');
            annualBtn.classList.add('text-slate-600');
            monthlyPrices.forEach(p => p.classList.remove('hidden'));
            annualPrices.forEach(p => p.classList.add('hidden'));
        } else {
            annualBtn.classList.add('bg-primary-600', 'text-white');
            annualBtn.classList.remove('text-slate-600');
            monthlyBtn.classList.remove('bg-primary-600', 'text-white');
            monthlyBtn.classList.add('text-slate-600');
            monthlyPrices.forEach(p => p.classList.add('hidden'));
            annualPrices.forEach(p => p.classList.remove('hidden'));
        }
    }
</script>

<?php include 'includes/footer.php'; ?>