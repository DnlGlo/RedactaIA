<!-- Footer -->
<footer class="bg-slate-900 text-white pt-16 pb-8">
    <!-- Gradient border top -->
    <div class="gradient-border mb-12"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Footer Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <!-- Column 1: Logo & Description -->
            <div class="lg:col-span-1">
                <a href="index.php" class="inline-block mb-4">
                    <span class="text-2xl font-heading font-bold text-white">
                        Redacta<span class="text-violet-400">IA</span>
                    </span>
                </a>
                <p class="text-slate-400 text-sm leading-relaxed mb-6">
                    La plataforma de escritura con IA que te ayuda a crear textos que venden, comunican y convierten en
                    segundos.
                </p>
                <div class="flex space-x-4">
                    <a href="#"
                        class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-primary-600 text-slate-400 hover:text-white transition-all">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#"
                        class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-primary-600 text-slate-400 hover:text-white transition-all">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#"
                        class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-primary-600 text-slate-400 hover:text-white transition-all">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#"
                        class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-primary-600 text-slate-400 hover:text-white transition-all">
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
            </div>

            <!-- Column 2: Navigation -->
            <div>
                <h4 class="text-white font-heading font-semibold text-lg mb-6">Navegación</h4>
                <ul class="space-y-3">
                    <li>
                        <a href="index.php"
                            class="text-slate-400 hover:text-white transition-colors text-sm flex items-center">
                            <i class="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                            Inicio
                        </a>
                    </li>
                    <li>
                        <a href="funcionalidades.php"
                            class="text-slate-400 hover:text-white transition-colors text-sm flex items-center">
                            <i class="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                            Funcionalidades
                        </a>
                    </li>
                    <li>
                        <a href="precios.php"
                            class="text-slate-400 hover:text-white transition-colors text-sm flex items-center">
                            <i class="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                            Precios
                        </a>
                    </li>
                    <li>
                        <a href="contacto.php"
                            class="text-slate-400 hover:text-white transition-colors text-sm flex items-center">
                            <i class="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                            Contacto
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Column 3: Resources -->
            <div>
                <h4 class="text-white font-heading font-semibold text-lg mb-6">Recursos</h4>
                <ul class="space-y-3">
                    <li>
                        <a href="#" class="text-slate-400 hover:text-white transition-colors text-sm flex items-center">
                            <i class="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                            Blog
                        </a>
                    </li>
                    <li>
                        <a href="#" class="text-slate-400 hover:text-white transition-colors text-sm flex items-center">
                            <i class="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                            Tutoriales
                        </a>
                    </li>
                    <li>
                        <a href="#" class="text-slate-400 hover:text-white transition-colors text-sm flex items-center">
                            <i class="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                            Términos de uso
                        </a>
                    </li>
                    <li>
                        <a href="#" class="text-slate-400 hover:text-white transition-colors text-sm flex items-center">
                            <i class="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                            Política de privacidad
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Column 4: Contact -->
            <div>
                <h4 class="text-white font-heading font-semibold text-lg mb-6">Contacto</h4>
                <ul class="space-y-4">
                    <li class="flex items-start">
                        <i class="fas fa-envelope text-primary-400 mt-1 mr-3"></i>
                        <a href="mailto:hola@redactaia.com"
                            class="text-slate-400 hover:text-white transition-colors text-sm">
                            hola@redactaia.com
                        </a>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-headset text-primary-400 mt-1 mr-3"></i>
                        <span class="text-slate-400 text-sm">
                            Soporte 24/7
                        </span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-globe text-primary-400 mt-1 mr-3"></i>
                        <span class="text-slate-400 text-sm">
                            Disponible en español
                        </span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-slate-800 pt-8">
            <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p class="text-slate-500 text-sm">
                    ©
                    <?php echo date('Y'); ?> RedactaIA. Todos los derechos reservados.
                </p>
                <div class="flex items-center space-x-6">
                    <a href="#" class="text-slate-500 hover:text-white text-sm transition-colors">Términos</a>
                    <a href="#" class="text-slate-500 hover:text-white text-sm transition-colors">Privacidad</a>
                    <a href="#" class="text-slate-500 hover:text-white text-sm transition-colors">Cookies</a>
                </div>
            </div>
        </div>
    </div>
</footer>
</body>

</html>