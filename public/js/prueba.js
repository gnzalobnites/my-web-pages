
function mostrar_botones_sesión(){
    //alert("Hola desde /public/js")
    let div_int_reloj = document.getElementById('div_int_reloj');
    div_int_reloj.setAttribute('class', 'gap-1 d-none');
    let botones_sesion = document.getElementById('botones_sesion');
    botones_sesion.setAttribute('class', 'gap-1 d-block');
}