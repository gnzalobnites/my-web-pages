var express = require('express');

var router = express.Router();

router.get('/', function(req, res){

  res.render('plantilla_sin_main', {
    title: "JavaScript desde cero",
    google_site_verification_content:"IlwE29oPx3IJib2qhYUc07f7uJp7SpVM12hd1DnPiqE",
    apple_touch_icon_180_href: 'https://gonzalo-web-pages.onrender.com/javascript/apple-touch-icon-js.png',
    icon_32_href: '/javascript/favicon-32x32.png',
    icon_16_href: '/javascript/favicon-16x16.png',
    manifest_href: '/javascript/site.webmanifest',
    icon_safari_color: '#da532c',
    theme_color_content: '#ffffff',
    description_content: 'Aprende JavaScript desde cero con este curso gratuito. En este curso aprenderás los fundamentos de Python, como variables, tipos de datos, operaciones, flujo de control, funciones, objetos, módulos y excepciones. También aprenderás a usar librerías populares de Python, como NumPy, Pandas y Matplotlib.',
    og_site_name: 'JavaScript desde cero',
    og_title: 'Aprende JavaScript Curso Desde Cero',
    og_description: 'Aprende JavaScript desde cero con este curso gratuito. En este curso aprenderás los fundamentos de Python, como variables, tipos de datos, operaciones, flujo de control, funciones, objetos, módulos y excepciones. También aprenderás a usar librerías populares de Python, como NumPy, Pandas y Matplotlib.',
    og_url: 'https://gonzalo-web-pages.onrender.com/javascript',
    og_image: 'https://gonzalo-web-pages.onrender.com/javascript/images/javascript_fondo.png',
    article_tag_1: 'JavaScript',
    article_tag_2: 'Español',
    article_tag_3: 'Curso',
    
  }); 
  //console.log(req.cookies)
});
router.get('/test-cookies', function(req, res){
  const cookies = req.cookies;
  res.send(cookies);
});

//exportar este router para usarlo en nuestro index.js 
module.exports = router;