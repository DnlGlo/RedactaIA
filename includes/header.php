<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo isset($page_description) ? $page_description : 'RedactaIA - Escribe textos que convierten con Inteligencia Artificial'; ?>">
    
    <title><?php echo isset($page_title) ? $page_title : 'RedactaIA'; ?></title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        'heading': ['Poppins', 'Inter', 'sans-serif'],
                        'body': ['DM Sans', 'Inter', 'sans-serif'],
                    },
                    colors: {
                        primary: {
                            50: '#eef2ff',
                            100: '#e0e7ff',
                            200: '#c7d2fe',
                            300: '#a5b4fc',
                            400: '#818cf8',
                            500: '#6366f1',
                            600: '#4f46e5',
                            700: '#4338ca',
                            800: '#3730a3',
                            900: '#312e81',
                        },
                        accent: {
                            violet: '#8b5cf6',
                            blue: '#3b82f6',
                        }
                    }
                }
            }
        }
    </script>
    
    <!-- Font Awesome 6 CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <!-- Custom Styles -->
    <style>
        /* Base styles */
        body {
            font-family: 'DM Sans', 'Inter', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Poppins', 'Inter', sans-serif;
        }
        
        /* Gradient text */
        .gradient-text {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #3b82f6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        /* Gradient button */
        .btn-gradient {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            transition: all 0.3s ease;
        }
        
        .btn-gradient:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 40px rgba(99, 102, 241, 0.4);
        }
        
        /* Glassmorphism header */
        .glass-header {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        }
        
        .dark .glass-header {
            background: rgba(15, 23, 42, 0.85);
        }
        
        /* Gradient border */
        .gradient-border {
            height: 3px;
            background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #3b82f6 100%);
        }
        
        /* Hamburger animation */
        .hamburger-line {
            transition: all 0.3s ease;
        }
        
        .hamburger-active .hamburger-line:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger-active .hamburger-line:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger-active .hamburger-line:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        /* Mobile menu animation */
        .mobile-menu {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease;
        }
        
        .mobile-menu.active {
            max-height: 400px;
        }
        
        /* Smooth scroll */
        html {
            scroll-behavior: smooth;
        }
        
        /* Card hover effect */
        .card-hover {
            transition: all 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        /* Accent span color */
        .accent {
            color: #8b5cf6;
        }
        
        /* Active nav link */
        .nav-link.active {
            color: #6366f1;
        }
        
        .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #6366f1, #8b5cf6);
            border-radius: 2px;
        }
    </style>
</head>
<body class="font-body text-slate-800 antialiased">
    <!-- Header -->
    <header class="glass-header fixed top-0 left-0 right-0 z-50 border-b border-slate-200/50">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 lg:h-20">
                <!-- Logo -->
                <a href="index.php" class="flex items-center space-x-2 group">
                    <span class="text-2xl lg:text-3xl font-heading font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                        Redacta<span class="accent">IA</span>
                    </span>
                </a>
                
                <!-- Desktop Navigation -->
                <div class="hidden lg:flex items-center space-x-8">
                    <a href="index.php" class="nav-link relative text-slate-600 hover:text-primary-600 font-medium transition-colors <?php echo (isset($current_page) && $current_page === 'inicio') ? 'active' : ''; ?>">
                        Inicio
                    </a>
                    <a href="funcionalidades.php" class="nav-link relative text-slate-600 hover:text-primary-600 font-medium transition-colors <?php echo (isset($current_page) && $current_page === 'funcionalidades') ? 'active' : ''; ?>">
                        Funcionalidades
                    </a>
                    <a href="precios.php" class="nav-link relative text-slate-600 hover:text-primary-600 font-medium transition-colors <?php echo (isset($current_page) && $current_page === 'precios') ? 'active' : ''; ?>">
                        Precios
                    </a>
                    <a href="contacto.php" class="nav-link relative text-slate-600 hover:text-primary-600 font-medium transition-colors <?php echo (isset($current_page) && $current_page === 'contacto') ? 'active' : ''; ?>">
                        Contacto
                    </a>
                </div>
                
                <!-- CTA Button Desktop -->
                <div class="hidden lg:block">
                    <a href="#" class="btn-gradient inline-flex items-center px-6 py-3 rounded-full text-white font-semibold text-sm">
                        <i class="fas fa-rocket mr-2"></i>
                        Probar gratis
                    </a>
                </div>
                
                <!-- Mobile Menu Button -->
                <button id="mobile-menu-btn" class="lg:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none" aria-label="Toggle menu">
                    <span class="hamburger-line w-6 h-0.5 bg-slate-700 rounded-full"></span>
                    <span class="hamburger-line w-6 h-0.5 bg-slate-700 rounded-full"></span>
                    <span class="hamburger-line w-6 h-0.5 bg-slate-700 rounded-full"></span>
                </button>
            </div>
            
            <!-- Mobile Navigation -->
            <div id="mobile-menu" class="mobile-menu lg:hidden">
                <div class="py-4 space-y-3 border-t border-slate-200/50">
                    <a href="index.php" class="block px-4 py-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all <?php echo (isset($current_page) && $current_page === 'inicio') ? 'text-primary-600 bg-primary-50' : ''; ?>">
                        Inicio
                    </a>
                    <a href="funcionalidades.php" class="block px-4 py-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all <?php echo (isset($current_page) && $current_page === 'funcionalidades') ? 'text-primary-600 bg-primary-50' : ''; ?>">
                        Funcionalidades
                    </a>
                    <a href="precios.php" class="block px-4 py-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all <?php echo (isset($current_page) && $current_page === 'precios') ? 'text-primary-600 bg-primary-50' : ''; ?>">
                        Precios
                    </a>
                    <a href="contacto.php" class="block px-4 py-2 text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all <?php echo (isset($current_page) && $current_page === 'contacto') ? 'text-primary-600 bg-primary-50' : ''; ?>">
                        Contacto
                    </a>
                    <div class="pt-2">
                        <a href="#" class="btn-gradient block text-center px-6 py-3 rounded-full text-white font-semibold text-sm">
                            <i class="fas fa-rocket mr-2"></i>
                            Probar gratis
                        </a>
                    </div>
                </div>
            </div>
        </nav>
        
        <!-- Gradient border bottom -->
        <div class="gradient-border"></div>
    </header>
    
    <!-- Spacer for fixed header -->
    <div class="h-16 lg:h-20"></div>
    
    <!-- Mobile menu JavaScript -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            
            mobileMenuBtn.addEventListener('click', function() {
                this.classList.toggle('hamburger-active');
                mobileMenu.classList.toggle('active');
            });
        });
    </script>
