//Auto-índice con botones
let elementosH2 = document.getElementsByTagName("h2");
let n = 1;
for(elementoH2 of elementosH2){
	let textoElH2 = elementoH2.textContent;
	let divDeBotónH2 = document.createElement("div");
	divDeBotónH2.setAttribute("class", "btn-group");
	divDeBotónH2.setAttribute("role", "group");
	divDeBotónH2.setAttribute("aria-label", "Button group with nested dropdown");
	divDeBotónH2.innerHTML = `<a href="#elemento_H2_número_${n}"><button type="button" class="btn btn-secondary índice-princ">${textoElH2}</button></a><div class="btn-group" role="group"><button type="button" class="btn btn-secondary dropdown-toggle índice-princ" data-bs-toggle="dropdown" aria-expanded="false"></button><ul class="dropdown-menu" id="lista_${n}_de_elementos_H3_botones"><li><a class="dropdown-item" href=""></a></li></ul>`;
let div_de_botones  = document.getElementById("div_de_botones");
div_de_botones.appendChild(divDeBotónH2);
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