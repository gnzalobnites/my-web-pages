var express = require('express');

var router = express.Router();

router.get('/', function(req, res){
  res.render('plantilla_sin_main_reloj', {
    title: "Mi reloj web",
    google_site_verification_content:"IlwE29oPx3IJib2qhYUc07f7uJp7SpVM12hd1DnPiqE",
    apple_touch_icon_180_href: 'https://gonzalo-web-pages.onrender.com/mi-reloj-web/apple-touch-icon.png',
    icon_32_href: '/mi-reloj-web/favicon-32x32.png',
    icon_16_href: '/mi-reloj-web/favicon-16x16.png',
    manifest_href: '/mi-reloj-web/site.webmanifest',
    icon_safari_color: '#da532c',
    theme_color_content: '#ffffff',
    description_content: 'Aprende JavaScript desde cero con este curso gratuito. En este curso aprenderás los fundamentos de Python, como variables, tipos de datos, operaciones, flujo de control, funciones, objetos, módulos y excepciones. También aprenderás a usar librerías populares de Python, como NumPy, Pandas y Matplotlib.',
    og_site_name: 'My Web Clock',
    og_title: 'Reloj personalizado para tu escritorio',
    og_description: 'Reloj personalizado para tu escritorio. Elige el color y tamaño de fondo y fuente para crear un reloj único y a tu medida."',
    og_url: 'https://gonzalo-web-pages.onrender.com/mi-reloj-web-pug',
    og_image: 'https://gonzalo-web-pages.onrender.com/mi-reloj-web/og_image1.jpg',
    article_tag_1: 'Clock',
    article_tag_2: 'Customizable',
    article_tag_3: 'App',
    modo: req.cookies.modo
  }); 
  console.log(req.cookies.modo)
});

//exportar este router para usarlo en nuestro index.js 
module.exports = router;