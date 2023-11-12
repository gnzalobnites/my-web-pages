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

  let dropdown_menu_offc = document.getElementById("listaDelDropdown");
  dropdown_menu_offc.style.backgroundColor = "#000";
  dropdown_menu_offc.style.color = "#fff";

  let dropdown_ítems = document.getElementsByClassName("dropdown-item");
  for(dropdown_ítem of dropdown_ítems){
    dropdown_ítem.style.backgroundColor = "#000";
    dropdown_ítem.style.color = "#fff";
  }

  document.body.style.color = "#fff";
  document.body.style.backgroundColor = "#000";
}

function modoDiur(){
  let botModoDiur = document.getElementById("botModoDiur");
  botModoDiur.setAttribute("class", "d-none");
  let botModoNoct = document.getElementById("botModoNoct");
  botModoNoct.setAttribute("class", "d-block btn btn-outline-secondary");

  let css_hightlight = document.getElementById("css_highlight");
  css_hightlight.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/default.min.css";
  
  let navSup = document.getElementById("navSup");
  navSup.style.backgroundColor = "#fff";
  navSup.setAttribute("class", "navbar bg-body-tertiary fixed-top");
  
  let offcanvasNavbar = document.getElementById("offcanvasNavbar");
  offcanvasNavbar.style.backgroundColor = "#fff";
  offcanvasNavbar.style.color = "#000";
  
  let butClose = document.getElementById("butClose");
  butClose.setAttribute("class", "btn-close");

  let dropdown_menu_offc = document.getElementById("listaDelDropdown");
  dropdown_menu_offc.style.backgroundColor = "#fff";
  dropdown_menu_offc.style.color = "#000";

  let dropdown_ítems = document.getElementsByClassName("dropdown-item");
  for(dropdown_ítem of dropdown_ítems){
    dropdown_ítem.style.backgroundColor = "#fff";
    dropdown_ítem.style.color = "#000";
  }
  
  document.body.style.color = "#000";
  document.body.style.backgroundColor = "#fff";
    

}





