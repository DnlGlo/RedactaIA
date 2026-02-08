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

const translations = {
    es: {
        nav: { features: 'Características', generator: 'Generador', pricing: 'Precios', testimonials: 'Testimonios', contact: 'Contacto', start: 'Empezar' },
        hero: { title_start: 'Genera textos', title_highlight: 'profesionales', title_end: 'con IA en segundos', subtitle: 'La herramienta de inteligencia artificial más potente para crear informes, guiones y contenidos profesionales en segundos.', cta: 'Ir al Generador', social_proof: 'usuarios confían en nosotros', powered: 'Impulsado por Llama 3.3 (Ultra Rápido)' },
        benefits: { speed_title: 'Velocidad Increíble', speed_desc: 'Genera textos complejos en menos de 5 segundos.', quality_title: 'Calidad Premium', quality_desc: 'Resultados con coherencia humana y estilo profesional.', multi_title: 'Multilingüe', multi_desc: 'Disponible en más de 11 idiomas con precisión total.' },
        generator: { title: 'Generador de IA', subtitle: 'Configura y crea tu texto perfecto.', logged_in: 'Sesión Activa', topic_label: 'Tema o Prompt', topic_placeholder: '¿Sobre qué quieres que escriba hoy?', lang_label: 'Idioma', type_label: 'Tipo', style_label: 'Estilo', generate_btn: '¡Generar ahora!', generating_btn: 'Generando...', free_usage: 'Generaciones Gratuitas', result_label: 'Resultado de RedactaIA', copy: 'COPIAR', waiting: 'Esperando tu gran idea...' },
        pricing: {
            title: 'Planes para Cada Necesidad', subtitle: 'Desde estudiantes hasta profesionales. Elige tu plan y empieza a crear contenido increíble hoy.', monthly: 'Mensual', annual: 'Anual', save: 'Ahorra 20%', guarantee: 'Garantía de devolución de 7 días',
            basic_title: 'Básico', basic_desc: 'Perfecto para proyectos ocasionales y estudiantes.',
            premium_title: 'Premium', premium_desc: 'Para creadores que necesitan potencia ilimitada.', popular: 'El más popular',
            enterprise_title: 'Empresa', enterprise_desc: 'Soluciones a medida para equipos corporativos.', enterprise_manual: 'Activación manual en menos de 2h laborables.',
            month_unit: 'mes', year_unit: 'año', start_btn: 'Empezar Ahora',
            basic_features: ['50 Generaciones Mensuales', '5 Idiomas Disponibles', '6 Estilos Disponibles', 'Exportación Básica', 'Soporte por Email'],
            premium_features: ['Generaciones ilimitadas', 'Todos los idiomas (11+)', 'Todos los estilos (10+)', 'Exportación HD', 'Soporte prioritario'],
            enterprise_features: ['Cuentas múltiples (5)', 'Acceso vía API', 'Consultoría de prompts', 'Seguridad nivel bancario']
        },
        testimonials: { title: 'Lo que dicen nuestros usuarios', subtitle: 'Más de 2.000 profesionales ya confían en RedactaIA para sus proyectos más importantes.' },
        contact: { title: '¿Alguna duda o problema?', subtitle: 'Nuestro equipo está listo para ayudarte a llevar tu redacción al siguiente nivel.', name: 'Nombre', email: 'Email', message: 'Mensaje', btn: 'Enviar Mensaje', placeholder_name: 'Tu nombre', placeholder_email: 'correo@ejemplo.com', placeholder_msg: '¿En qué podemos ayudarte?' },
        footer: { desc: 'Revolucionando la escritura creativa con inteligencia artificial de última generación. Únete a la nueva era del contenido.', legal: 'Legal', networks: 'Redes', rights: '© 2026 RedactaIA. Todos los derechos reservados. Diseñado para brillar.' },
        limit_modal: { title: 'Límite Alcanzado', desc_1: 'Has usado tus', desc_2: '5 generaciones gratis', desc_3: 'de este mes.', premium_pitch: 'Los usuarios Premium disfrutan de generaciones ilimitadas y acceso a todos los modelos avanzados.', unlock_btn: 'Desbloquear Todo', maybe_later: 'Quizás luego', reset_note: 'Tu contador se reiniciará el mes que viene.' },
        features_section: {
            title: 'Potencia tu Creatividad',
            subtitle: 'Todo lo necesario para que tu comunicación destaque sobre el resto.',
            f1_title: 'Personalización Total', f1_desc: 'Elige entre 10+ estilos y tonos para cada texto.',
            f2_title: 'Exportación Fácil', f2_desc: 'Copia o descarga tus textos en un solo clic.',
            f3_title: 'Seguridad de Datos', f3_desc: 'Tus redacciones son privadas y están encriptadas.',
            f4_title: 'Velocidad Ultra', f4_desc: 'Genera textos complejos en menos de 5 segundos.'
        },
        stats: { users: 'Usuarios Activos', texts: 'Textos Generados', langs: 'Idiomas', satisfaction: 'Satisfacción' },
        login_modal: {
            title: '¡Ya tienes una vista previa!',
            subtitle: 'Hemos generado una vista previa de tu contenido. Para obtener el texto completo, guardar tus creaciones y seguir generando sin límites, inicia sesión gratis.',
            f1: '5 generaciones gratis al mes', f2: 'Guarda tus textos favoritos', f3: 'Acceso a historial',
            google_btn: 'ENTRAR CON GOOGLE'
        },
        alerts: {
            premium_only: '🔒 Esta opción es solo para usuarios Premium. ¡Suscríbete para desbloquear todo el potencial!',
            contact_success: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.',
            contact_error: 'Error al enviar el mensaje. Inténtalo de nuevo.'
        },
        testimonials_list: [
            { name: "María García", role: "Content Manager", company: "Agencia Digital", text: "RedactaIA ha reducido nuestro tiempo de creación de contenido en un 70%. Ahora podemos producir 10 veces más.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria" },
            { name: "Carlos Rodríguez", role: "Estudiante", company: "Universidad", text: "Como estudiante, me ayuda a organizar mis ideas y crear ensayos bien estructurados. ¡Mis notas han mejorado!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos" },
            { name: "Ana Martínez", role: "Freelance Writer", company: "Independiente", text: "Puedo aceptar más proyectos gracias a RedactaIA. La calidad es excelente y mis clientes están encantados.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana" }
        ],
        generator_status: {
            loading: 'Generando contenido ultra rápido con Groq...',
            preview: 'Vista previa generada parcialmente. Inicia sesión para ver el resultado completo...',
        },
        options: {
            languages: ['Español', 'Inglés', 'Francés', 'Alemán', 'Italiano', 'Português', 'Holandés', 'Ruso', 'Chino', 'Japonés', 'Árabe'],
            types: ['Redacción', 'Informe', 'Guion', 'Email', 'Redes Sociales', 'Blog Post', 'Newsletter', 'Resumen Ejecutivo', 'Carta Formal', 'Poema', 'Diálogo'],
            styles: ['Formal', 'Informal', 'Humorístico', 'Profesional', 'Optimista', 'Persuasivo', 'Técnico', 'Narrativo', 'Descriptivo', 'Inspiracional']
        },
        legal_content: {
            privacy: {
                title: 'Política de Privacidad',
                intro: 'En RedactaIA, tu privacidad es nuestra prioridad absoluta. Aquí te explicamos cómo tratamos tus datos:',
                items: [
                    { b: 'Datos de Registro:', t: 'Solo guardamos tu nombre y email cuando inicias sesión con Google para personalizar tu experiencia.' },
                    { b: 'Tus Generaciones:', t: 'Los textos que creas no se comparten con terceros ni se utilizan para entrenar otros modelos públicos.' },
                    { b: 'Seguridad:', t: 'Utilizamos encriptación de grado bancario para proteger toda la comunicación entre tu navegador y Groq.' },
                    { b: 'Publicidad:', t: 'NO vendemos tus datos a anunciantes ni a ninguna otra empresa.' }
                ]
            },
            terms: {
                title: 'Términos del Servicio',
                intro: 'Al utilizar RedactaIA, aceptas las siguientes condiciones:',
                items: [
                    { b: 'Uso Responsable:', t: 'Te comprometes a no usar la IA para generar contenido de odio, ilegal o fraudulento.' },
                    { b: 'Propiedad:', t: 'El texto generado es tuyo. Puedes usarlo para fines comerciales o personales sin restricciones.' },
                    { b: 'Suscripciones:', t: 'Los pagos se procesan vía PayPal. Puedes cancelar tu suscripción en cualquier momento desde tu panel.' },
                    { b: 'Limitación:', t: 'Aunque usamos lo último en IA (Llama 3.3), revisa siempre el contenido para asegurar su exactitud profesional.' }
                ]
            },
            cookies: {
                title: 'Política de Cookies',
                intro: 'Usamos cookies esenciales para que la plataforma funcione correctamente:',
                items: [
                    { b: 'Sesión:', t: 'Para mantener tu cuenta activa mientras navegas.' },
                    { b: 'Preferencias:', t: 'Para recordar si prefieres el modo oscuro o tu idioma seleccionado.' },
                    { b: 'Rendimiento:', t: 'Usamos Vercel Analytics de forma anónima para entender cómo mejorar la velocidad del sitio.' },
                    { b: 'No rastreo:', t: 'No usamos cookies de rastreo publicitario de terceros.' }
                ]
            }
        }
    },
    pt: {
        nav: { features: 'Recursos', generator: 'Gerador', pricing: 'Preços', testimonials: 'Depoimentos', contact: 'Contato', start: 'Começar' },
        hero: { title_start: 'Gere textos', title_highlight: 'profissionais', title_end: 'com IA em segundos', subtitle: 'A ferramenta de inteligência artificial mais poderosa para criar relatórios, roteiros e conteúdos profissionais em segundos.', cta: 'Ir para o Gerador', social_proof: 'usuários confiam em nós', powered: 'Impulsionado por Llama 3.3 (Ultra Rápido)' },
        benefits: { speed_title: 'Velocidade Incrível', speed_desc: 'Gere textos complexos em menos de 5 segundos.', quality_title: 'Qualidade Premium', quality_desc: 'Resultados com coerência humana e estilo profissional.', multi_title: 'Multilíngue', multi_desc: 'Disponível em mais de 11 idiomas com precisão total.' },
        generator: { title: 'Gerador de IA', subtitle: 'Configure e crie seu texto perfeito.', logged_in: 'Sessão Ativa', topic_label: 'Tema ou Prompt', topic_placeholder: 'Sobre o que você quer que eu escreva hoje?', lang_label: 'Idioma', type_label: 'Tipo', style_label: 'Estilo', generate_btn: 'Gerar agora!', generating_btn: 'Gerando...', free_usage: 'Gerações Gratuitas', result_label: 'Resultado da RedactaIA', copy: 'COPIAR', waiting: 'Esperando sua grande ideia...' },
        pricing: {
            title: 'Planos para Cada Necessidade', subtitle: 'De estudantes a profissionais. Escolha seu plano e comece a criar conteúdo incrível hoje.', monthly: 'Mensal', annual: 'Anual', save: 'Economize 20%', guarantee: 'Garantia de reembolso de 7 dias',
            basic_title: 'Básico', basic_desc: 'Perfeito para projetos ocasionais e estudantes.',
            premium_title: 'Premium', premium_desc: 'Para criadores que precisam de potência ilimitada.', popular: 'O mais popular',
            enterprise_title: 'Empresa', enterprise_desc: 'Soluções sob medida para equipes corporativas.', enterprise_manual: 'Ativação manual em menos de 2h úteis.',
            month_unit: 'mês', year_unit: 'ano', start_btn: 'Começar Agora',
            basic_features: ['50 Gerações Mensais', '5 Idiomas Disponíveis', '6 Estilos Disponíveis', 'Exportação Básica', 'Suporte por Email'],
            premium_features: ['Gerações Ilimitadas', 'Todos os idiomas (11+)', 'Todos os estilos (10+)', 'Exportação HD', 'Suporte Prioritário'],
            enterprise_features: ['Múltiplas contas (5)', 'Acesso via API', 'Consultoria de prompts', 'Segurança nível bancário']
        },
        testimonials: { title: 'O que dizem nossos usuários', subtitle: 'Mais de 2.000 profissionais já confiam na RedactaIA para seus projetos mais importantes.' },
        contact: { title: 'Alguma dúvida ou problema?', subtitle: 'Nossa equipe está pronta para ajudar você a levar sua redação para o próximo nível.', name: 'Nome', email: 'Email', message: 'Mensagem', btn: 'Enviar Mensagem', placeholder_name: 'Seu nome', placeholder_email: 'email@exemplo.com', placeholder_msg: 'Como podemos ajudar?' },
        footer: { desc: 'Revolucionando a escrita criativa com inteligência artificial de última geração. Junte-se à nova era do conteúdo.', legal: 'Legal', networks: 'Redes', rights: '© 2026 RedactaIA. Todos os direitos reservados. Projetado para brilhar.' },
        limit_modal: { title: 'Limite Alcançado', desc_1: 'Você usou suas', desc_2: '5 gerações gratuitas', desc_3: 'neste mês.', premium_pitch: 'Usuários Premium desfrutam de gerações ilimitadas e acesso a todos os modelos avançados.', unlock_btn: 'Desbloquear Tudo', maybe_later: 'Talvez depois', reset_note: 'Seu contador será reiniciado no próximo mês.' },
        features_section: {
            title: 'Aumente sua Criatividade',
            subtitle: 'Tudo o que você precisa para que sua comunicação se destaque das demais.',
            f1_title: 'Personalização Total', f1_desc: 'Escolha entre mais de 10 estilos e tons para cada texto.',
            f2_title: 'Exportação Fácil', f2_desc: 'Copie ou baixe seus textos com apenas um clique.',
            f3_title: 'Segurança de Dados', f3_desc: 'Suas redações são privadas e criptografadas.',
            f4_title: 'Velocidade Ultra', f4_desc: 'Gere textos complexos em menos de 5 segundos.'
        },
        stats: { users: 'Usuários Ativos', texts: 'Textos Gerados', langs: 'Idiomas', satisfaction: 'Satisfação' },
        login_modal: {
            title: 'Você já tem uma prévia!',
            subtitle: 'Geramos uma prévia do seu conteúdo. Para obter o texto completo, salvar suas criações e continuar gerando sem limites, faça login gratuitamente.',
            f1: '5 gerações gratuitas por mês', f2: 'Salve seus textos favoritos', f3: 'Acesso ao histórico',
            google_btn: 'ENTRAR COM GOOGLE'
        },
        alerts: {
            premium_only: '🔒 Esta opção é apenas para usuários Premium. Assine para desbloquear todo o potencial!',
            contact_success: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
            contact_error: 'Erro ao enviar a mensagem. Tente novamente.'
        },
        testimonials_list: [
            { name: "Maria Garcia", role: "Gerente de Conteúdo", company: "Agência Digital", text: "O RedactaIA reduziu nosso tempo de criação de conteúdo em 70%. Agora podemos produzir 10 vezes mais.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria" },
            { name: "Carlos Rodriguez", role: "Estudante", company: "Universidade", text: "Como estudante, ele me ajuda a organizar minhas ideias e criar redações estruturadas. Minhas notas melhoraram!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos" },
            { name: "Ana Martinez", role: "Escritora Freelancer", company: "Independente", text: "Posso aceitar mais projetos graças ao RedactaIA. A qualidade é excelente e meus clientes estão encantados.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana" }
        ],
        generator_status: {
            loading: 'Gerando conteúdo ultra rápido com Groq...',
            preview: 'Prévia gerada parcialmente. Faça login para ver o resultado completo...',
        },
        options: {
            languages: ['Espanhol', 'Inglês', 'Francês', 'Alemão', 'Italiano', 'Português', 'Holandês', 'Russo', 'Chinês', 'Japonês', 'Árabe'],
            types: ['Redação', 'Relatório', 'Roteiro', 'Email', 'Redes Sociais', 'Blog Post', 'Newsletter', 'Resumo Executivo', 'Carta Formal', 'Poema', 'Diálogo'],
            styles: ['Formal', 'Informal', 'Humorístico', 'Profissional', 'Otimista', 'Persuasivo', 'Técnico', 'Narrativo', 'Descritivo', 'Inspiracional']
        },
        legal_content: {
            privacy: {
                title: 'Política de Privacidade',
                intro: 'Na RedactaIA, sua privacidade é nossa prioridade absoluta. Aqui explicamos como tratamos seus dados:',
                items: [
                    { b: 'Dados de Registro:', t: 'Apenas guardamos seu nome e email quando você faz login com o Google para personalizar sua experiência.' },
                    { b: 'Suas Gerações:', t: 'Os textos que você cria não são compartilhados com terceiros nem usados para treinar outros modelos públicos.' },
                    { b: 'Segurança:', t: 'Usamos criptografia de nível bancário para proteger toda a comunicação entre seu navegador e o Groq.' },
                    { b: 'Publicidade:', t: 'NÃO vendemos seus dados para anunciantes ou qualquer outra empresa.' }
                ]
            },
            terms: {
                title: 'Termos de Serviço',
                intro: 'Ao usar a RedactaIA, você aceita as seguintes condições:',
                items: [
                    { b: 'Uso Responsável:', t: 'Você se compromete a não usar a IA para gerar conteúdo de ódio, ilegal ou fraudulento.' },
                    { b: 'Propriedade:', t: 'O texto gerado é seu. Você pode usá-lo para fins comerciais ou pessoais sem restrições.' },
                    { b: 'Assinaturas:', t: 'Os pagamentos são processados via PayPal. Você pode cancelar sua assinatura a qualquer momento no seu painel.' },
                    { b: 'Limitação:', t: 'Embora usemos o que há de mais moderno em IA (Llama 3.3), sempre revise o conteúdo para garantir sua precisão profissional.' }
                ]
            },
            cookies: {
                title: 'Política de Cookies',
                intro: 'Usamos cookies essenciais para que a plataforma funcione corretamente:',
                items: [
                    { b: 'Sessão:', t: 'Para manter sua conta ativa enquanto navega.' },
                    { b: 'Preferências:', t: 'Para lembrar se você prefere o modo escuro ou o idioma selecionado.' },
                    { b: 'Desempenho:', t: 'Usamos Vercel Analytics de forma anônima para entender como melhorar a velocidade do site.' },
                    { b: 'Sem rastreamento:', t: 'Não usamos cookies de rastreamento publicitário de terceiros.' }
                ]
            }
        }
    },
    en: {
        nav: { features: 'Features', generator: 'Generator', pricing: 'Pricing', testimonials: 'Testimonials', contact: 'Contact', start: 'Start' },
        hero: { title_start: 'Generate', title_highlight: 'professional', title_end: 'AI texts in seconds', subtitle: 'The most powerful AI tool to create reports, scripts, and professional content in seconds.', cta: 'Go to Generator', social_proof: 'users trust us', powered: 'Powered by Llama 3.3 (Ultra Fast)' },
        benefits: { speed_title: 'Incredible Speed', speed_desc: 'Generate complex texts in less than 5 seconds.', quality_title: 'Premium Quality', quality_desc: 'Results with human coherence and professional style.', multi_title: 'Multilingual', multi_desc: 'Available in over 11 languages with total precision.' },
        generator: { title: 'AI Generator', subtitle: 'Configure and create your perfect text.', logged_in: 'Active Session', topic_label: 'Topic or Prompt', topic_placeholder: 'What do you want me to write about today?', lang_label: 'Language', type_label: 'Type', style_label: 'Style', generate_btn: 'Generate Now!', generating_btn: 'Generating...', free_usage: 'Free Generations', result_label: 'RedactaIA Result', copy: 'COPY', waiting: 'Waiting for your big idea...' },
        pricing: {
            title: 'Plans for Every Need', subtitle: 'From students to professionals. Choose your plan and start creating amazing content today.', monthly: 'Monthly', annual: 'Annual', save: 'Save 20%', guarantee: '7-day money-back guarantee',
            basic_title: 'Basic', basic_desc: 'Perfect for occasional projects and students.',
            premium_title: 'Premium', premium_desc: 'For creators who need unlimited power.', popular: 'Most Popular',
            enterprise_title: 'Enterprise', enterprise_desc: 'Tailored solutions for corporate teams.', enterprise_manual: 'Manual activation in less than 2 business hours.',
            month_unit: 'mo', year_unit: 'yr', start_btn: 'Start Now',
            basic_features: ['50 Monthly Generations', '5 Languages Available', '6 Styles Available', 'Basic Export', 'Email Support'],
            premium_features: ['Unlimited Generations', 'All languages (11+)', 'All styles (10+)', 'HD Export', 'Priority Support'],
            enterprise_features: ['Multiple accounts (5)', 'API Access', 'Prompt Consulting', 'Bank-level Security']
        },
        testimonials: { title: 'What our users say', subtitle: 'More than 2,000 professionals already trust RedactaIA for their most important projects.' },
        contact: { title: 'Any questions or issues?', subtitle: 'Our team is ready to help you take your writing to the next level.', name: 'Name', email: 'Email', message: 'Message', btn: 'Send Message', placeholder_name: 'Your name', placeholder_email: 'email@example.com', placeholder_msg: 'How can we help you?' },
        footer: { desc: 'Revolutionizing creative writing with state-of-the-art artificial intelligence. Join the new era of content.', legal: 'Legal', networks: 'Networks', rights: '© 2026 RedactaIA. All rights reserved. Designed to shine.' },
        limit_modal: { title: 'Limit Reached', desc_1: 'You have used your', desc_2: '5 free generations', desc_3: 'this month.', premium_pitch: 'Premium users enjoy unlimited generations and access to all advanced models.', unlock_btn: 'Unlock All', maybe_later: 'Maybe later', reset_note: 'Your counter will reset next month.' },
        features_section: {
            title: 'Boost Your Creativity',
            subtitle: 'Everything you need to make your communication stand out from the rest.',
            f1_title: 'Total Customization', f1_desc: 'Choose from 10+ styles and tones for each text.',
            f2_title: 'Easy Export', f2_desc: 'Copy or download your texts in a single click.',
            f3_title: 'Data Security', f3_desc: 'Your writings are private and encrypted.',
            f4_title: 'Ultra Speed', f4_desc: 'Generate complex texts in less than 5 seconds.'
        },
        stats: { users: 'Active Users', texts: 'Texts Generated', langs: 'Languages', satisfaction: 'Satisfaction' },
        login_modal: {
            title: 'You already have a preview!',
            subtitle: 'We have generated a preview of your content. To get the full text, save your creations and continue generating without limits, log in for free.',
            f1: '5 free generations per month', f2: 'Save your favorite texts', f3: 'Access to history',
            google_btn: 'SIGN IN WITH GOOGLE'
        },
        alerts: {
            premium_only: '🔒 This option is for Premium users only. Subscribe to unlock full potential!',
            contact_success: 'Message sent successfully! We will get in touch with you soon.',
            contact_error: 'Error sending message. Please try again.'
        },
        testimonials_list: [
            { name: "Maria Garcia", role: "Content Manager", company: "Digital Agency", text: "RedactaIA has reduced our content creation time by 70%. Now we can produce 10 times more.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria" },
            { name: "Carlos Rodriguez", role: "Student", company: "University", text: "As a student, it helps me organize my ideas and create well-structured essays. My grades improved!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos" },
            { name: "Ana Martinez", role: "Freelance Writer", company: "Independent", text: "I can take on more projects thanks to RedactaIA. The quality is excellent and my clients are delighted.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana" }
        ],
        generator_status: {
            loading: 'Generating content ultra fast with Groq...',
            preview: 'Preview generated partially. Log in to see the full result...',
        },
        options: {
            languages: ['Spanish', 'English', 'French', 'German', 'Italian', 'Portuguese', 'Dutch', 'Russian', 'Chinese', 'Japanese', 'Arabic'],
            types: ['Writing', 'Report', 'Script', 'Email', 'Social Media', 'Blog Post', 'Newsletter', 'Executive Summary', 'Formal Letter', 'Poem', 'Dialogue'],
            styles: ['Formal', 'Informal', 'Humorous', 'Professional', 'Optimistic', 'Persuasive', 'Technical', 'Narrative', 'Descriptive', 'Inspirational']
        },
        legal_content: {
            privacy: {
                title: 'Privacy Policy',
                intro: 'At RedactaIA, your privacy is our top priority. Here we explain how we handle your data:',
                items: [
                    { b: 'Registration Data:', t: 'We only save your name and email when you log in with Google to personalize your experience.' },
                    { b: 'Your Generations:', t: 'The texts you create are not shared with third parties or used to train other public models.' },
                    { b: 'Security:', t: 'We use bank-grade encryption to protect all communication between your browser and Groq.' },
                    { b: 'Advertising:', t: 'We do NOT sell your data to advertisers or any other company.' }
                ]
            },
            terms: {
                title: 'Terms of Service',
                intro: 'By using RedactaIA, you accept the following conditions:',
                items: [
                    { b: 'Responsible Use:', t: 'You commit not to use AI to generate hate, illegal, or fraudulent content.' },
                    { b: 'Ownership:', t: 'The generated text is yours. You can use it for commercial or personal purposes without restrictions.' },
                    { b: 'Subscriptions:', t: 'Payments are processed via PayPal. You can cancel your subscription at any time from your dashboard.' },
                    { b: 'Limitation:', t: 'Although we use the latest in AI (Llama 3.3), always review the content to ensure its professional accuracy.' }
                ]
            },
            cookies: {
                title: 'Cookie Policy',
                intro: 'We use essential cookies for the platform to work correctly:',
                items: [
                    { b: 'Session:', t: 'To keep your account active while you browse.' },
                    { b: 'Preferences:', t: 'To remember if you prefer dark mode or your selected language.' },
                    { b: 'Performance:', t: 'We use Vercel Analytics anonymously to understand how to improve site speed.' },
                    { b: 'No tracking:', t: 'We do not use third-party advertising tracking cookies.' }
                ]
            }
        }
    }
};

const App = () => {
    const [lang, setLang] = useState('es');
    const t = translations[lang];
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedText, setGeneratedText] = useState('');
    const [activeLegalModal, setActiveLegalModal] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showLimitModal, setShowLimitModal] = useState(false);
    const [currentGenerationCount, setCurrentGenerationCount] = useState(0);
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

    // Fetch generation usage
    const fetchUsage = async () => {
        if (!user) return;
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const { count } = await supabase
            .from('generations')
            .select('*', { count: 'exact', head: true })
            .eq('user_email', user.email)
            .gte('created_at', startOfMonth.toISOString());

        setCurrentGenerationCount(count || 0);
    };

    useEffect(() => {
        if (user) fetchUsage();
    }, [user]);

    const handleGenerate = async () => {
        if (!generatorConfig.topic) return;

        // ESTRATEGIA: Permitir vista previa gratuita, pero login para guardar o generar completo
        if (!isLoggedIn) {
            setIsGenerating(true);
            setGeneratedText(t.generator_status.preview);

            try {
                const apiKey = import.meta.env.VITE_GROQ_KEY;
                if (!apiKey) {
                    throw new Error("API Key missing");
                }

                const previewPrompt = `Professional writer role.
                Language: ${generatorConfig.language}
                Type: ${generatorConfig.type}
                Style: ${generatorConfig.style}
                Topic: ${generatorConfig.topic}

                GENERATE A BRIEF PREVIEW (2-3 paragraphs).
                Output MUST be in ${generatorConfig.language.toUpperCase()}.`;

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
                setGeneratedText(text);

            } catch (error) {
                console.error(error);
                setGeneratedText(t.alerts.contact_error);
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
                setShowLimitModal(true);
                return;
            }
        }

        setIsGenerating(true);
        setGeneratedText(t.generator_status.loading);

        try {
            const apiKey = import.meta.env.VITE_GROQ_KEY;

            if (!apiKey) {
                throw new Error("API Key missing");
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
                fetchUsage();
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
        { name: t.nav.features, id: 'features' },
        { name: t.nav.generator, id: 'generator' },
        { name: t.nav.pricing, id: 'pricing' },
        { name: t.nav.testimonials, id: 'testimonials' },
        { name: t.nav.contact, id: 'contact' },
    ];

    const languages = t.options.languages;
    const textTypes = t.options.types;
    const styles = t.options.styles;

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
                                <div className="relative">
                                    <select
                                        value={lang}
                                        onChange={(e) => setLang(e.target.value)}
                                        className="appearance-none bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm py-2.5 px-6 rounded-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option value="es">Español</option>
                                        <option value="pt">Português</option>
                                        <option value="en">English</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                                </div>
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
                                        {t.nav.start}
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
                                <span>{t.hero.powered}</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                                {t.hero.title_start} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">{t.hero.title_highlight}</span> {t.hero.title_end}
                            </h1>
                            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                                {t.hero.subtitle}
                            </p>

                            <div className="flex flex-col items-center gap-6">
                                <button
                                    onClick={() => scrollToSection('generator')}
                                    className="group bg-primary-600 hover:bg-primary-700 text-white px-10 py-5 rounded-3xl text-xl font-black shadow-2xl shadow-primary-600/30 flex items-center space-x-3 transition-all active:scale-95"
                                >
                                    <span>{t.hero.cta}</span>
                                    <ArrowDown className="group-hover:translate-y-1 transition-transform" />
                                </button>

                                <div className="flex items-center -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <img key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-950 bg-slate-200" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="avatar" />
                                    ))}
                                    <div className="pl-4 text-sm font-bold text-slate-400">+2.000 {t.hero.social_proof}</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* 3 Benefit Boxes */}
                    <div className="max-w-6xl mx-auto px-4 mt-32">
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: t.benefits.speed_title, desc: t.benefits.speed_desc, icon: <Zap className="text-amber-500" /> },
                                { title: t.benefits.quality_title, desc: t.benefits.quality_desc, icon: <ShieldCheck className="text-emerald-500" /> },
                                { title: t.benefits.multi_title, desc: t.benefits.multi_desc, icon: <Languages className="text-blue-500" /> }
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
                            <h2 className="text-4xl md:text-5xl font-black mb-6">{t.features_section.title}</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">{t.features_section.subtitle}</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: t.features_section.f1_title, desc: t.features_section.f1_desc, icon: <Palette /> },
                                { title: t.features_section.f2_title, desc: t.features_section.f2_desc, icon: <Download /> },
                                { title: t.features_section.f3_title, desc: t.features_section.f3_desc, icon: <Lock /> },
                                { title: t.features_section.f4_title, desc: t.features_section.f4_desc, icon: <Zap /> },
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
                                            {t.generator.title}
                                        </h2>
                                        <p className="text-slate-500 font-medium">{t.generator.subtitle}</p>
                                    </div>
                                    {isLoggedIn && (
                                        <div className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                                            <Unlock size={14} />
                                            {t.generator.logged_in}
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

                                                    <h3 className="text-3xl font-black mb-4 tracking-tighter italic">{t.login_modal.title}</h3>
                                                    <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium leading-relaxed">
                                                        {t.login_modal.subtitle}
                                                    </p>
                                                    <div className="bg-primary-50 dark:bg-primary-950/20 rounded-2xl p-4 mb-6 border border-primary-200 dark:border-primary-800">
                                                        <p className="text-sm font-bold text-primary-600 dark:text-primary-400">✅ {t.login_modal.f1}</p>
                                                        <p className="text-sm font-bold text-primary-600 dark:text-primary-400">✅ {t.login_modal.f2}</p>
                                                        <p className="text-sm font-bold text-primary-600 dark:text-primary-400">✅ {t.login_modal.f3}</p>
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
                                                        {t.login_modal.google_btn}
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
                                                            <MessageSquare size={14} className="text-primary-500" /> {t.generator.topic_label}
                                                        </label>
                                                        <textarea
                                                            className="w-full p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 outline-none h-40 focus:border-primary-500 transition-all font-bold"
                                                            placeholder={t.generator.topic_placeholder}
                                                            value={generatorConfig.topic}
                                                            onChange={(e) => setGeneratorConfig({ ...generatorConfig, topic: e.target.value })}
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-black mb-2 text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                                                <Globe size={12} /> {t.generator.lang_label}
                                                            </label>
                                                            <select
                                                                className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 outline-none font-bold text-sm"
                                                                value={generatorConfig.language}
                                                                onChange={(e) => {
                                                                    if (!isPremium && !freeLanguages.includes(e.target.value)) {
                                                                        alert(t.alerts.premium_only);
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
                                                                <FileText size={12} /> {t.generator.type_label}
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
                                                            <Palette size={12} /> {t.generator.style_label}
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
                                                            <><div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div> <span>{t.generator.generating_btn}</span></>
                                                        ) : (
                                                            <><Send size={18} /> <span>{t.generator.generate_btn}</span></>
                                                        )}
                                                    </button>

                                                    {/* Free Tier Usage Counter */}
                                                    {!isPremium && isLoggedIn && (
                                                        <div className="mt-4 px-2">
                                                            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                                                <span>{t.generator.free_usage}</span>
                                                                <span className={currentGenerationCount >= 5 ? 'text-red-500' : 'text-primary-500'}>
                                                                    {currentGenerationCount} / 5
                                                                </span>
                                                            </div>
                                                            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                                <motion.div
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${Math.min((currentGenerationCount / 5) * 100, 100)}%` }}
                                                                    className={`h-full ${currentGenerationCount >= 5 ? 'bg-red-500' : 'bg-primary-500'}`}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Área de Resultado Expandida (Derecha) - Diseño Horizontal */}
                                        <div id="result-area" className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-[2rem] p-1 border border-slate-100 dark:border-slate-800 shadow-2xl flex flex-col">
                                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[1.8rem] p-8 h-full flex flex-col border border-transparent">
                                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-700">
                                                    <span className="text-primary-600 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></div>
                                                        {t.generator.result_label}
                                                    </span>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(generatedText);
                                                                alert('Copiado al portapapeles');
                                                            }}
                                                            className="group p-3 rounded-xl bg-white dark:bg-slate-700 hover:bg-primary-600 hover:text-white transition-all border border-slate-200 dark:border-slate-600 shadow-sm flex items-center gap-2 text-xs font-bold"
                                                        >
                                                            <Copy size={14} /> <span>{t.generator.copy}</span>
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
                                                            <p className="max-w-[250px] font-bold text-sm uppercase tracking-widest">{t.generator.waiting}</p>
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
                            <h2 className="text-4xl md:text-5xl font-black mb-6">{t.pricing.title}</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium mb-8">{t.pricing.subtitle}</p>

                            {/* Billing Toggle */}
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{t.pricing.monthly}</span>
                                <button
                                    onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly')}
                                    className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${billingCycle === 'annual' ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                                >
                                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${billingCycle === 'annual' ? 'translate-x-6' : ''}`}></div>
                                </button>
                                <span className={`text-sm font-bold ${billingCycle === 'annual' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{t.pricing.annual} <span className="text-emerald-500 text-xs">({t.pricing.save})</span></span>
                            </div>

                            <div className="flex items-center justify-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest bg-amber-500/10 py-2 px-4 rounded-full inline-block mx-auto">
                                <ShieldCheck size={14} /> {t.pricing.guarantee}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Básico */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                whileHover={{
                                    y: -10,
                                    transition: { duration: 0.3 }
                                }}
                                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-[3rem] flex flex-col hover:shadow-2xl hover:border-primary-500/30 transition-all duration-150"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                    className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6"
                                >
                                    <Pen className="text-slate-600 dark:text-slate-400" size={24} />
                                </motion.div>
                                <h3 className="text-2xl font-black mb-2">{t.pricing.basic_title}</h3>
                                <p className="text-slate-500 mb-8 font-medium">{t.pricing.basic_desc}</p>
                                <div className="flex items-baseline mb-8">
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                        className="text-5xl font-black bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
                                    >
                                        {billingCycle === 'monthly' ? '9,99€' : '99€'}
                                    </motion.span>
                                    <span className="text-slate-400 ml-2 font-bold">/{billingCycle === 'monthly' ? t.pricing.month_unit : t.pricing.year_unit}</span>
                                </div>
                                <ul className="space-y-4 mb-10 flex-grow">
                                    {t.pricing.basic_features.map((item, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * i, duration: 0.4 }}
                                            className="flex items-center gap-3 text-sm font-semibold"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1, rotate: 360 }}
                                                transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                                                className="p-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-400"
                                            >
                                                <Check size={14} />
                                            </motion.div>
                                            <span>{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                                <motion.button
                                    whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ duration: 0.1 }}
                                    className="w-full py-4 rounded-3xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black transition-all shadow-xl"
                                >
                                    {t.pricing.start_btn}
                                </motion.button>
                            </motion.div>

                            {/* Premium */}
                            <motion.div
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.15, ease: "easeOut" }
                                }}
                                className="relative bg-white dark:bg-slate-900 border-4 border-primary-600 p-10 rounded-[3rem] shadow-2xl shadow-primary-500/20 z-10 flex flex-col"
                            >
                                <motion.div
                                    initial={{ x: 100, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="absolute top-0 right-10 -translate-y-1/2 bg-gradient-to-r from-primary-600 to-indigo-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg"
                                >
                                    <motion.span
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        {t.pricing.popular}
                                    </motion.span>
                                </motion.div>
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="w-16 h-16 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                                >
                                    <Sparkles className="text-white" size={24} />
                                </motion.div>
                                <h3 className="text-2xl font-black mb-2">{t.pricing.premium_title}</h3>
                                <p className="text-slate-500 mb-8 font-medium">{t.pricing.premium_desc}</p>
                                <div className="flex items-baseline mb-8">
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.6, duration: 0.5 }}
                                        className="text-5xl font-black bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent"
                                    >
                                        {billingCycle === 'monthly' ? '19,99€' : '199€'}
                                    </motion.span>
                                    <span className="text-slate-400 ml-2 font-bold">/{billingCycle === 'monthly' ? t.pricing.month_unit : t.pricing.year_unit}</span>
                                </div>
                                <ul className="space-y-4 mb-10 flex-grow">
                                    {t.pricing.premium_features.map((item, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * i + 0.7, duration: 0.4 }}
                                            className="flex items-center gap-3 text-sm font-bold"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1, rotate: 360 }}
                                                transition={{ delay: 0.2 + i * 0.1 + 0.7, type: "spring" }}
                                                className="p-1 rounded-full bg-gradient-to-r from-primary-600 to-indigo-600 text-white"
                                            >
                                                <Check size={14} />
                                            </motion.div>
                                            <span>{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                                <div className="mt-auto">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.2, duration: 0.5 }}
                                    >
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
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Enterprise */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                whileHover={{
                                    y: -8,
                                    transition: { duration: 0.15, ease: "easeOut" }
                                }}
                                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-[3rem] flex flex-col hover:shadow-2xl hover:border-slate-400/30 transition-all duration-150"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                                    className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6"
                                >
                                    <ShieldCheck className="text-slate-600 dark:text-slate-400" size={24} />
                                </motion.div>
                                <h3 className="text-2xl font-black mb-2">{t.pricing.enterprise_title}</h3>
                                <p className="text-slate-500 mb-8 font-medium">{t.pricing.enterprise_desc}</p>
                                <div className="flex items-baseline mb-8">
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.9, duration: 0.5 }}
                                        className="text-5xl font-black bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
                                    >
                                        {billingCycle === 'monthly' ? '59,99€' : '599€'}
                                    </motion.span>
                                    <span className="text-slate-400 ml-2 font-bold">/{billingCycle === 'monthly' ? t.pricing.month_unit : t.pricing.year_unit}</span>
                                </div>
                                <ul className="space-y-4 mb-10 flex-grow">
                                    {t.pricing.enterprise_features.map((item, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * i + 1, duration: 0.4 }}
                                            className="flex items-center gap-3 text-sm font-semibold"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1, rotate: 360 }}
                                                transition={{ delay: 0.2 + i * 0.1 + 1, type: "spring" }}
                                                className="p-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-400"
                                            >
                                                <Check size={14} />
                                            </motion.div>
                                            <span>{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                                <div className="mt-auto">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.5, duration: 0.5 }}
                                    >
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
                                                    alert(t.alerts.contact_success);
                                                });
                                            }}
                                        />
                                        <p className="text-[10px] text-center mt-4 opacity-50 font-bold">{t.pricing.enterprise_manual}</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="py-32 bg-gradient-to-br from-primary-50 to-indigo-50 dark:from-slate-900/40 dark:to-indigo-950/20">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-black mb-6">{t.testimonials.title}</h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">{t.testimonials.subtitle}</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {t.testimonials_list.map((testimonial, i) => (
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
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">{`"${testimonial.text}"`}</p>
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
                                    { number: "2,000+", label: t.stats.users },
                                    { number: "50K+", label: t.stats.texts },
                                    { number: "11", label: t.stats.langs },
                                    { number: "99%", label: t.stats.satisfaction }
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
                        <h2 className="text-4xl font-black mb-6">{t.contact.title}</h2>
                        <p className="text-slate-400 mb-12 max-w-lg mx-auto font-medium">{t.contact.subtitle}</p>

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
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">{t.contact.name}</label>
                                <input required className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-primary-500" placeholder={t.contact.placeholder_name} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">{t.contact.email}</label>
                                <input required type="email" className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-primary-500" placeholder={t.contact.placeholder_email} />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">{t.contact.message}</label>
                                <textarea required className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-primary-500 h-32 resize-none" placeholder={t.contact.placeholder_msg}></textarea>
                            </div>
                            <button type="submit" className="md:col-span-2 py-5 bg-primary-600 rounded-2xl font-black hover:bg-primary-500 transition-all shadow-xl shadow-primary-600/20">
                                {t.contact.btn}
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
                                        <h2 className="text-3xl font-black tracking-tighter">{t.legal_content.privacy.title}</h2>
                                        <div className="space-y-4 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                            <p>{t.legal_content.privacy.intro}</p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                {t.legal_content.privacy.items.map((item, i) => (
                                                    <li key={i}><span className="font-bold text-slate-900 dark:text-white">{item.b}</span> {item.t}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {activeLegalModal === 'terms' && (
                                    <div className="space-y-6">
                                        <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center text-primary-500 mb-6">
                                            <FileText size={32} />
                                        </div>
                                        <h2 className="text-3xl font-black tracking-tighter">{t.legal_content.terms.title}</h2>
                                        <div className="space-y-4 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                            <p>{t.legal_content.terms.intro}</p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                {t.legal_content.terms.items.map((item, i) => (
                                                    <li key={i}><span className="font-bold text-slate-900 dark:text-white">{item.b}</span> {item.t}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {activeLegalModal === 'cookies' && (
                                    <div className="space-y-6">
                                        <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6">
                                            <Moon size={32} />
                                        </div>
                                        <h2 className="text-3xl font-black tracking-tighter">{t.legal_content.cookies.title}</h2>
                                        <div className="space-y-4 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                            <p>{t.legal_content.cookies.intro}</p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                {t.legal_content.cookies.items.map((item, i) => (
                                                    <li key={i}><span className="font-bold text-slate-900 dark:text-white">{item.b}</span> {item.t}</li>
                                                ))}
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
                                    {t.footer.desc}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-black mb-8 uppercase tracking-widest text-xs opacity-50">{t.footer.legal}</h4>
                                <ul className="space-y-4 text-sm font-bold text-slate-500">
                                    <li><button onClick={() => setActiveLegalModal('privacy')} className="hover:text-primary-600">Privacidad</button></li>
                                    <li><button onClick={() => setActiveLegalModal('terms')} className="hover:text-primary-600">Términos</button></li>
                                    <li><button onClick={() => setActiveLegalModal('cookies')} className="hover:text-primary-600">Cookies</button></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-black mb-8 uppercase tracking-widest text-xs opacity-50">{t.footer.networks}</h4>
                                <ul className="space-y-4 text-sm font-bold text-slate-500">
                                    <li><a href="https://www.tiktok.com/@redactaia" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600">TikTok</a></li>
                                    <li><a href="mailto:contacto@redactaia.com" className="hover:text-primary-600">Gmail</a></li>
                                    <li><a href="https://www.linkedin.com/in/daniel-gallego-8778593a8" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600">LinkedIn</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="text-center text-slate-400 text-xs font-bold border-t border-slate-100 dark:border-slate-900 pt-10">
                            {t.footer.rights}
                        </div>
                    </div>
                </footer>
                <Analytics />

                {/* Limit Modal */}
                <AnimatePresence>
                    {showLimitModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
                        >
                            <motion.div
                                initial={{ scale: 0.95, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.95, y: 20 }}
                                className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative"
                            >
                                <button
                                    onClick={() => setShowLimitModal(false)}
                                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <X size={20} className="text-slate-500" />
                                </button>

                                <div className="p-8 text-center">
                                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Lock size={32} className="text-red-500" />
                                    </div>

                                    <h3 className="text-2xl font-black mb-2 text-slate-900 dark:text-white">{t.limit_modal.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed">
                                        {t.limit_modal.desc_1} <span className="text-slate-900 dark:text-white font-bold">{t.limit_modal.desc_2}</span> {t.limit_modal.desc_3}
                                        <br /><br />
                                        {t.limit_modal.premium_pitch}
                                    </p>

                                    <div className="space-y-3">
                                        <button
                                            onClick={() => {
                                                setShowLimitModal(false);
                                                scrollToSection('pricing');
                                            }}
                                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-primary-500/30 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Zap size={18} />
                                            <span>{t.limit_modal.unlock_btn}</span>
                                        </button>

                                        <button
                                            onClick={() => setShowLimitModal(false)}
                                            className="w-full py-3.5 rounded-xl text-slate-500 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                        >
                                            {t.limit_modal.maybe_later}
                                        </button>
                                    </div>

                                    <p className="mt-6 text-xs text-slate-400 font-medium">
                                        {t.limit_modal.reset_note}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div >
        </PayPalScriptProvider >
    );
};

export default App;
