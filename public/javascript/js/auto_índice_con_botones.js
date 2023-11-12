//Auto-índice con botones
let elementosH2 = document.getElementsByTagName("h2");
let n = 1;
for(elementoH2 of elementosH2){
	let textoElH2 = elementoH2.textContent;
	let divDeBotónH2 = document.createElement("div");
	divDeBotónH2.setAttribute("class", "btn-group");
    divDeBotónH2.setAttribute("style", "margin-bottom: 2px");
	divDeBotónH2.innerHTML = `<a href="#elemento_H2_número_${n}" >
      <button class="btn btn-info btn-lg botón-h2" type="button" style="text-overflow: ellipsis;">
        ${textoElH2}
      </button>
    </a>
    <button type="button" class="btn btn-lg btn-info dropdown-toggle dropdown-toggle-split botón-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
      <span class="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu" id="lista_${n}_de_elementos_H3_botones">
      <li><a class="dropdown-item" href=""></a></li>
    </ul>`;
let div_fondo = document.getElementById("fondo");
div_fondo.appendChild(divDeBotónH2);
let br = document.createElement("br");
div_fondo.appendChild(br);
n++;
};

//Agregado de los elementos H3

var elemsH3 = document.getElementsByTagName("h3");
//variable para iterar en el arreglo:
var ñ = 0;
//variable para iterar en las listas de elementos H3:
var o = 1;

while(ñ < elemsH3.length){
  let textoElH3 = document.createTextNode(elemsH3[ñ].textContent);
  let nuevoEnlaceAElH3 = document.createElement("a");
  nuevoEnlaceAElH3.setAttribute("class","dropdown-item");
  nuevoEnlaceAElH3.setAttribute("href", `#elemento_H3_número_${ñ + 1}`);
  nuevoEnlaceAElH3.appendChild(textoElH3);
  let nuevoÍtemListaElsH3 = document.createElement("li");
  nuevoÍtemListaElsH3.appendChild(nuevoEnlaceAElH3);
  let listaOElemsH3 = document.getElementById(`lista_${o}_de_elementos_H3_botones`);
  listaOElemsH3.appendChild(nuevoÍtemListaElsH3);
  /*elsH3[j].setAttribute("id", `elemento_H3_número_${ñ + 1}`);*/
  if(elemsH3[ñ].nextSibling.nextSibling){
    if(elemsH3[ñ].nextSibling.nextSibling.tagName == "H2") {
        o++;
    };
  };
  ñ++;
}
