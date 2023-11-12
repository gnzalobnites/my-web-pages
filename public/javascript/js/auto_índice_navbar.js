// Auto índice en barra de navegación

//Agregado de los elementos H2

/*Cada elemento H2 va seguido de una lista para
los elementos H3 anteriores al siguiente
elemento H2*/

var elsH2 = document.getElementsByTagName("h2");
var i = 1;
for (let elH2 of elsH2) {
  elH2.setAttribute("id", `elemento_H2_número_${i}`);
  let textoElH2 = document.createTextNode(elH2.textContent);
  let nuevoEnlBarrNav = document.createElement("a");
  nuevoEnlBarrNav.setAttribute("class","dropdown-item");
  nuevoEnlBarrNav.setAttribute("href", `#elemento_H2_número_${i}`);
  nuevoEnlBarrNav.appendChild(textoElH2);
  let nuevoÍtemLista = document.createElement("li");
  nuevoÍtemLista.appendChild(nuevoEnlBarrNav);
  let listaDelDropdown = document.getElementById("listaDelDropdown");
  listaDelDropdown.appendChild(nuevoÍtemLista);
  
  let nuevaListaDeElsH3 = document.createElement("ul");
  nuevaListaDeElsH3.setAttribute("class","dropdown-item");
  nuevaListaDeElsH3.setAttribute("id", `lista_${i}_de_elementos_H3`);
  listaDelDropdown.appendChild(nuevaListaDeElsH3);
  i++;
}

//Agregado de los elementos H3

var elsH3 = document.getElementsByTagName("h3");
//variable para iterar en el arreglo:
var j = 0;
//variable para iterar en las listas de elementos H3:
var k = 1;

while(j < elsH3.length){
  let textoElH3 = document.createTextNode(elsH3[j].textContent);
  let nuevoEnlaceAElH3 = document.createElement("a");
  nuevoEnlaceAElH3.setAttribute("class","dropdown-item");
  nuevoEnlaceAElH3.setAttribute("href", `#elemento_H3_número_${j + 1}`);
  nuevoEnlaceAElH3.appendChild(textoElH3);
  let nuevoÍtemListaElsH3 = document.createElement("li");
  nuevoÍtemListaElsH3.appendChild(nuevoEnlaceAElH3);
  let listaKElemsH3 = document.getElementById(`lista_${k}_de_elementos_H3`);
  listaKElemsH3.appendChild(nuevoÍtemListaElsH3);
  elsH3[j].setAttribute("id", `elemento_H3_número_${j + 1}`);
  if(elsH3[j].nextSibling.nextSibling) {
    if(elsH3[j].nextSibling.nextSibling.tagName == "H2") {
      k++;
    };
  }; 
  j++;
}