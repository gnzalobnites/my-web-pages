function modoNoct(){
  let botModoNoct = document.getElementById("botModoNoct");
  botModoNoct.setAttribute("class", "d-none");
  let botModoDiur = document.getElementById("botModoDiur");
  botModoDiur.setAttribute("class", "d-block btn btn-outline-secondary");

  let css_hightlight = document.getElementById("css_highlight");
  css_highlight.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/atom-one-dark.min.css";
  
  let navSup = document.getElementById("navSup");
  navSup.style.backgroundColor = "#000";
  navSup.setAttribute("class", "navbar navbar-dark bg-dark fixed-top");
  navSup.style.color = "#fff";
  
  let offcanvasNavbar = document.getElementById("offcanvasNavbar");
  offcanvasNavbar.style.backgroundColor = "#000";
  offcanvasNavbar.style.color = "#fff";
  
  let butClose = document.getElementById("butClose");
  butClose.setAttribute("class", "btn-close btn-close-white");
  
  document.body.style.color = "#fff";
  document.body.style.backgroundColor = "#000";

  let accordion = document.getElementById("accordionExample");
accordion.style.backgroundColor = "#000";
accordion.style.color = "#fff";

let accordion_items = document.getElementsByClassName("accordion-item");
for(let accordion_item of accordion_items){
  accordion_item.style.backgroundColor = "#000";
  accordion_item.style.color = "#fff";
}

let accordion_headers = document.getElementsByClassName("accordion-header");
for(let accordion_header of accordion_headers){
  accordion_header.style.backgroundColor = "#000";
  accordion_header.style.color = "#fff";
}

let accordion_bodies = document.getElementsByClassName("accordion-body");
for(let accordion_body of accordion_bodies){
  accordion_body.style.backgroundColor = "#000";
  accordion_body.style.color = "#fff";
}

let accordion_buttons = document.getElementsByClassName("accordion-button collapsed");
for(let accordion_button of accordion_buttons){
  accordion_button.style.backgroundColor = "#000";
  accordion_button.style.color = "#fff";
}

let dropdown_menu_offc = document.getElementById("dropdown_menu_offc");
dropdown_menu_offc.style.backgroundColor = "#000";
dropdown_menu_offc.style.color = "#fff";

}

function modoDiur(){
  let botModoDiur = document.getElementById("botModoDiur");
  botModoDiur.setAttribute("class", "d-none");
  let botModoNoct = document.getElementById("botModoNoct");
  botModoNoct.setAttribute("class", "d-block btn btn-outline-secondary");

  let css_hightlight = document.getElementById("css_highlight");
  css_highlight.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/default.min.css";
  
  let navSup = document.getElementById("navSup");
  navSup.style.backgroundColor = "#fff";
  navSup.setAttribute("class", "navbar bg-body-tertiary fixed-top");
  
  let offcanvasNavbar = document.getElementById("offcanvasNavbar");
  offcanvasNavbar.style.backgroundColor = "#fff";
  offcanvasNavbar.style.color = "#000";
  
  let butClose = document.getElementById("butClose");
  butClose.setAttribute("class", "btn-close");
  
  document.body.style.color = "#000";
  document.body.style.backgroundColor = "#fff";
    

let accordion = document.getElementById("accordionExample");
accordion.style.backgroundColor = "#fff";
accordion.style.color = "#000";

let accordion_items = document.getElementsByClassName("accordion-item");
for(let accordion_item of accordion_items){
  accordion_item.style.backgroundColor = "#fff";
  accordion_item.style.color = "#000";
}

let accordion_headers = document.getElementsByClassName("accordion-header");
for(let accordion_header of accordion_headers){
  accordion_header.style.backgroundColor = "#fff";
  accordion_header.style.color = "#000";
}

let accordion_bodies = document.getElementsByClassName("accordion-body");
for(let accordion_body of accordion_bodies){
  accordion_body.style.backgroundColor = "#fff";
  accordion_body.style.color = "#000";
}

let accordion_buttons = document.getElementsByClassName("accordion-button collapsed");
for(let accordion_button of accordion_buttons){
  accordion_button.style.backgroundColor = "#fff";
  accordion_button.style.color = "#000";
}

}




    
