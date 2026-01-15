<?php
$page_title = "Contacto | RedactaIA";
$page_description = "Contáctanos para cualquier pregunta sobre RedactaIA.";
$current_page = "contacto";
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
            <i class="fas fa-envelope mr-2"></i>Estamos aquí para ayudarte
        </span>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            <span class="text-violet-400">Contáctanos</span>
        </h1>
        <p class="text-xl text-white/80 max-w-2xl mx-auto">
            ¿Tienes preguntas? Nuestro equipo está listo para ayudarte.
        </p>
    </div>
</section>

<!-- Contact Section -->
<section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <!-- Contact Info -->
            <div>
                <h2 class="text-3xl font-heading font-bold text-slate-900 mb-6">
                    Hablemos sobre <span class="gradient-text">tu proyecto</span>
                </h2>
                <p class="text-slate-600 text-lg mb-10">
                    Estamos aquí para responder tus preguntas, escuchar tus sugerencias o ayudarte a sacar el máximo
                    provecho de RedactaIA.
                </p>

                <!-- Contact Cards -->
                <div class="space-y-6">
                    <div
                        class="flex items-start p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-violet-50 border border-slate-200">
                        <div
                            class="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 text-white mr-4 flex-shrink-0">
                            <i class="fas fa-envelope text-lg"></i>
                        </div>
                        <div>
                            <h3 class="font-heading font-semibold text-slate-900 mb-1">Email</h3>
                            <a href="mailto:hola@redactaia.com"
                                class="text-primary-600 hover:text-primary-700">hola@redactaia.com</a>
                        </div>
                    </div>

                    <div
                        class="flex items-start p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-violet-50 border border-slate-200">
                        <div
                            class="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 text-white mr-4 flex-shrink-0">
                            <i class="fas fa-headset text-lg"></i>
                        </div>
                        <div>
                            <h3 class="font-heading font-semibold text-slate-900 mb-1">Soporte</h3>
                            <p class="text-slate-600">Disponible 24/7 para usuarios Pro y Business</p>
                        </div>
                    </div>

                    <div
                        class="flex items-start p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-violet-50 border border-slate-200">
                        <div
                            class="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mr-4 flex-shrink-0">
                            <i class="fas fa-clock text-lg"></i>
                        </div>
                        <div>
                            <h3 class="font-heading font-semibold text-slate-900 mb-1">Tiempo de respuesta</h3>
                            <p class="text-slate-600">Respondemos en menos de 24 horas</p>
                        </div>
                    </div>
                </div>

                <!-- Social Links -->
                <div class="mt-10">
                    <p class="text-slate-600 mb-4">Síguenos en redes sociales</p>
                    <div class="flex space-x-4">
                        <a href="#"
                            class="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 hover:bg-primary-100 text-slate-600 hover:text-primary-600 transition-all">
                            <i class="fab fa-twitter text-lg"></i>
                        </a>
                        <a href="#"
                            class="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 hover:bg-primary-100 text-slate-600 hover:text-primary-600 transition-all">
                            <i class="fab fa-linkedin-in text-lg"></i>
                        </a>
                        <a href="#"
                            class="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 hover:bg-primary-100 text-slate-600 hover:text-primary-600 transition-all">
                            <i class="fab fa-instagram text-lg"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Contact Form -->
            <div class="bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-200">
                <h3 class="text-2xl font-heading font-bold text-slate-900 mb-6">Envíanos un mensaje</h3>
                <form action="#" method="POST" class="space-y-6">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label for="nombre" class="block text-sm font-medium text-slate-700 mb-2">Nombre</label>
                            <input type="text" id="nombre" name="nombre" required
                                class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                placeholder="Tu nombre">
                        </div>
                        <div>
                            <label for="email" class="block text-sm font-medium text-slate-700 mb-2">Email</label>
                            <input type="email" id="email" name="email" required
                                class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                placeholder="tu@email.com">
                        </div>
                    </div>

                    <div>
                        <label for="asunto" class="block text-sm font-medium text-slate-700 mb-2">Asunto</label>
                        <select id="asunto" name="asunto"
                            class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white">
                            <option value="">Selecciona un asunto</option>
                            <option value="soporte">Soporte técnico</option>
                            <option value="ventas">Ventas y planes</option>
                            <option value="partnership">Partnership</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>

                    <div>
                        <label for="mensaje" class="block text-sm font-medium text-slate-700 mb-2">Mensaje</label>
                        <textarea id="mensaje" name="mensaje" rows="5" required
                            class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                            placeholder="¿En qué podemos ayudarte?"></textarea>
                    </div>

                    <button type="submit" class="btn-gradient w-full py-4 rounded-xl text-white font-semibold text-lg">
                        <i class="fas fa-paper-plane mr-2"></i>
                        Enviar mensaje
                    </button>
                </form>
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
            ¿Listo para empezar?
        </h2>
        <p class="text-xl text-white/80 mb-10">
            Crea tu cuenta gratis y empieza a escribir textos que convierten
        </p>
        <a href="#"
            class="btn-gradient inline-flex items-center justify-center px-10 py-5 rounded-full text-white font-semibold text-lg">
            <i class="fas fa-rocket mr-3"></i>
            Probar gratis
        </a>
    </div>
</section>

<?php include 'includes/footer.php'; ?>