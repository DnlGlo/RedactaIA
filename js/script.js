import { CONFIG } from './config.js';

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';

    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Google Login Mock
window.googleLogin = function () {
    alert(`Simulando Login con Google (${CONFIG.AUTH.GOOGLE_CLIENT_ID})...\n\nEn un entorno real, esto redirigiría a Google OAuth.`);
    localStorage.setItem('isLoggedIn', 'true');
    document.getElementById('gen-error').style.display = 'none';
}

// Content Generator Mock
window.generateContent = function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const errorMsg = document.getElementById('gen-error');
    const resultDiv = document.getElementById('gen-result');
    const topic = document.getElementById('gen-topic').value;

    if (!isLoggedIn) {
        errorMsg.style.display = 'block';
        return;
    }

    if (!topic) {
        alert('Por favor, introduce un tema.');
        return;
    }

    errorMsg.style.display = 'none';
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Generando contenido mágico...</p>';

    setTimeout(() => {
        resultDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h4 style="color: var(--primary)">Resultado Generado (${CONFIG.AI.MODEL_TEXT})</h4>
                <button class="btn btn-outline" style="padding: 0.3rem 0.6rem; font-size: 0.8rem" onclick="copyToClipboard()">Copiar</button>
            </div>
            <p><strong>Tema:</strong> ${topic}</p>
            <p style="margin-top: 1rem;">Este es un texto de ejemplo generado por la inteligencia artificial de RedactaIA. En el backend real, una llamada a la API de OpenAI o Anthropic devolvería el contenido optimizado aquí.</p>
        `;
    }, 1500);
}

window.copyToClipboard = function () {
    alert('Contenido copiado al portapapeles (Simulado)');
}

// Checkout Implementation with PayPal
window.checkout = function (plan) {
    const prices = {
        'free': 0,
        'popular': 19,
        'enterprise': 49
    };

    const planNames = {
        'free': 'Plan Gratis',
        'popular': 'Plan Popular',
        'enterprise': 'Plan Empresa'
    };

    if (plan === 'free') {
        alert('Plan gratuito activado con éxito.');
        return;
    }

    // Load PayPal SDK if not already loaded
    if (!window.paypal) {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${CONFIG.PAYPAL.CLIENT_ID}&currency=${CONFIG.PAYPAL.CURRENCY}&intent=${CONFIG.PAYPAL.INTENT}`;
        script.addEventListener('load', () => {
            initPayPalButton(plan, prices[plan], planNames[plan]);
        });
        document.body.appendChild(script);
    } else {
        initPayPalButton(plan, prices[plan], planNames[plan]);
    }
}

function initPayPalButton(plan, price, planName) {
    // Create a modal or a container for the PayPal button
    const modal = document.createElement('div');
    modal.id = 'paypal-modal';
    modal.style = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 10000; padding: 20px;";

    const container = document.createElement('div');
    container.style = "background: white; padding: 2rem; border-radius: 12px; width: 100%; max-width: 500px; text-align: center;";
    container.innerHTML = `
        <h2 style="margin-bottom: 1rem; color: #111;">Pagar ${planName}</h2>
        <p style="margin-bottom: 2rem; color: #666;">Total: ${price} ${CONFIG.PAYPAL.CURRENCY}</p>
        <div id="paypal-button-container"></div>
        <button class="btn btn-outline" style="margin-top: 1rem; width: 100%" onclick="document.getElementById('paypal-modal').remove()">Cancelar</button>
    `;

    modal.appendChild(container);
    document.body.appendChild(modal);

    paypal.Buttons({
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: CONFIG.PAYPAL.CURRENCY,
                        value: price.toString()
                    },
                    description: `Suscripción ${planName}`
                }]
            });
        },
        onApprove: (data, actions) => {
            return actions.order.capture().then(details => {
                alert(`Pago completado con éxito por ${details.payer.name.given_name}.`);
                modal.remove();
                // Here you would typically notify your backend
            });
        },
        onError: (err) => {
            console.error('PayPal Error:', err);
            alert('Hubo un error con el pago de PayPal. Por favor, inténtalo de nuevo.');
        }
    }).render('#paypal-button-container');
}
