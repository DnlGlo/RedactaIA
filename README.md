# RedactaIA - Plataforma de Escritura con IA

Sitio web profesional para RedactaIA, una plataforma SaaS de escritura con Inteligencia Artificial.

## 🚀 Stack Tecnológico

- **PHP 8+** - Lenguaje backend
- **Tailwind CSS** - Framework CSS (CDN)
- **Font Awesome 6** - Iconos (CDN)
- **Google Fonts** - Tipografías (Poppins, Inter, DM Sans)

## 📁 Estructura

```
├── index.php              # Página principal
├── funcionalidades.php    # Página de funcionalidades
├── precios.php            # Página de precios
├── contacto.php           # Página de contacto
├── includes/
│   ├── header.php         # Header reutilizable
│   └── footer.php         # Footer reutilizable
├── assets/
│   └── images/            # Imágenes del sitio
├── .htaccess              # Configuración Apache
└── README.md              # Documentación
```

## 💻 Instalación Local

1. Clona el repositorio en tu servidor local (XAMPP, MAMP, etc.)
2. Navega a `http://localhost/tu-carpeta/`

## 🎨 Personalización

### Colores
Edita el objeto `tailwind.config` en `header.php`:
- `primary` - Color principal (indigo)
- `accent` - Colores de acento (violeta, azul)

### Tipografías
Las fuentes se cargan desde Google Fonts en `header.php`

## 🌐 Deploy

1. Sube todos los archivos a tu servidor
2. Asegúrate de que `.htaccess` esté activo
3. Verifica que mod_rewrite esté habilitado

## 📝 Licencia

© 2026 RedactaIA. Todos los derechos reservados.
