setTimeout(function() {
  var botBusc = document.getElementById("botBusc");
  var botCerr = document.getElementById("botCerr");
  var botAnt = document.getElementById("botAnt");
  var botSig = document.getElementById("botSig");
  var inputBusc = document.getElementById("inputBusc");
  inputBusc.setAttribute("class","d-none");
  botSig.setAttribute("class","d-none");
  botCerr.setAttribute("class","d-none");
  botAnt.setAttribute("class","d-none");
  botBusc.setAttribute("class","d-none");
  }, 500);

  var indBusc = "";
  var numsCoincs = [];
  var etiquetas = ["p", "h1", "h2", "h3", "h4"];
  var parrs = [];
  var contadNoCoinc = 0;
  var elemsAnalizs = 0;
  
  function mostrarBusc(){
    contadNoCoinc = 0;
    var botSvg = document.getElementById("svg");
    var inputBusc = document.getElementById("inputBusc");
    var botCerr = document.getElementById("botCerr");
    let navSup = document.getElementById("navSup");
    navSup.setAttribute("class","d-none");
    botSvg.setAttribute("class","d-none");
    botCerr.setAttribute("class","d-block btn btn-outline-success");
    botBusc.setAttribute("class","d-block btn btn-outline-success");
    inputBusc.setAttribute("class","d-block form-control me-2");
  }
  
  function anterior(){
    indBusc--;
    if(indBusc < 0){
      indBusc = numsCoincs.length - 1;
    }
    let nroCoinc = numsCoincs[indBusc];
    let URLProxCoinc = `#c${nroCoinc}`;
    location.href = URLProxCoinc;
  }
  
  function siguiente(){
    indBusc++;
    if(indBusc >= numsCoincs.length){
      indBusc = 0;
    }
    let nroCoinc = numsCoincs[indBusc];
    let URLProxCoinc = `#c${nroCoinc}`;
    location.href = URLProxCoinc;
  }
  
  function cerrar(){

    var botBusc = document.getElementById("botBusc");
    var botCerr = document.getElementById("botCerr");
    var botAnt = document.getElementById("botAnt");
    var botSig = document.getElementById("botSig");
    var navSup = document.getElementById("navSup");
    let botSvg = document.getElementById("svg");
    var inputBusc = document.getElementById("inputBusc");
    inputBusc.setAttribute("class","d-none");
    botSig.setAttribute("class","d-none");
    botCerr.setAttribute("class","d-none");
    botAnt.setAttribute("class","d-none");
    botBusc.setAttribute("class","d-none");
    navSup.setAttribute("class","d-block navbar bg-body-tertiary fixed-top");
    botSvg.setAttribute("class", "d-block btn btn-info ms-auto mx-2");

    var elemsModifs = document.getElementsByClassName("coinc");

    const elemsModifsArray = Array.from(elemsModifs);
    elemsModifsArray.forEach((elem) => {           
      let textCoinc = document.createTextNode(elem.textContent);
      let nodoPad = elem.parentNode;
      nodoPad.replaceChild(textCoinc, elem);                   
    });

  }
  
  function busqueda(){
      // obtener la clave de búsqueda
      let inputBusc = document.getElementById("inputBusc");
      var claBusqMin = inputBusc.value.toLowerCase();
      var claBusqOrig = inputBusc.value;
      
      // encontrar y marcar coincidencias
      for(let etiqueta of etiquetas){

          // obtener los elementos de uno de los tipos dados
          var elementos = document.getElementsByTagName(etiqueta);
      
          // comprobar si hay coincidencias en ese grupo
          for (let i = 0; i < elementos.length; i++) {
          
            elemsAnalizs++;

            // obtener el contenido de cada elemento individual
            var htmlEleMin = elementos[i].innerHTML.toLowerCase();
            var htmlEleOrig = elementos[i].innerHTML;
            var textEleMin = elementos[i].textContent.toLowerCase();
            
            // comprobar si el elemento contiene la clave
            var incluyeClave = htmlEleMin.includes(claBusqMin);

            if(incluyeClave) {
              
              // marcar coincidencia:

              // obtener el segmento de párrafo anterior a la clave de búsqueda
              let indexClaBus = htmlEleMin.indexOf(claBusqMin);
              let partInicArr = htmlEleOrig.split("", indexClaBus);                
              let partIniCad = partInicArr.join("");
              //console.log(partIniCad);
              
              // obtener la coincidencia original
              var tamaClaBusq = claBusqMin.length;
              var tamaPartIni = partIniCad.length;
              var tamaPartIniMasCla = tamaPartIni + tamaClaBusq;     
              var partIniMasClaArr = htmlEleOrig.split("", tamaPartIniMasCla);
              var partIniMasClaCad = partIniMasClaArr.join("");
              var claBusqOrigArr = new Array(tamaClaBusq);
              for(let j = tamaClaBusq; j >= 0; j--){
                claBusqOrigArr[j] = partIniMasClaArr[partIniMasClaArr.length - (tamaClaBusq - j)];
              }       
              var claBusqOrigCad = claBusqOrigArr.join("");
              //console.log(claBusqOrigCad); 

              // obtener el segmento del párrafo posterior a la cadena         
              var tamaElemOrig = htmlEleOrig.length;
              var tamaPartFin = tamaElemOrig - tamaPartIniMasCla;
              var htmlElemOrigArr = htmlEleOrig.split("");       
              var partFinArr = new Array();
              for(let k = tamaPartFin; k >= 0; k--){
                partFinArr[k] = htmlElemOrigArr[htmlElemOrigArr.length - (tamaPartFin - k)];
              }
              let partFinCad = partFinArr.join("");
              //console.log(partFinCad);

              // unir las partes del párrafo  
              let parrNue = `${partIniCad}<span class="coinc">${claBusqOrigCad}</span>${partFinCad}`;
              //console.log(parrNue);
              //console.log(i);

              // insertar el párrafo nuevo
              let nodoTex = elementos[i].firstChild;
              elementos[i].innerHTML = parrNue;

            } else {
              contadNoCoinc++;
            }

          }
      }

      if (contadNoCoinc == elemsAnalizs) {
        ningCoinc();
        contadNoCoinc = 0;
      } else {
        marcarCoincs();
        setTimeout(function(){
          enfocarCoinc1();
        }, 500);
        abrirMenuBusq();
      }     
  };

  function marcarCoincs() {
    var arrCoinc = document.getElementsByClassName("coinc");
    for(let i = 0; i < arrCoinc.length; i++){
     arrCoinc[i].id = `c${i}`;
     arrCoinc[i].style.color = "#F00";
     arrCoinc[i].style.margin = "160 px";
     numsCoincs[i] = i;
    }
  }

  function enfocarCoinc1(){
    location.href = "#c0";
  }

  function abrirMenuBusq() {
    var botBusc = document.getElementById("botBusc");
    var botCerr = document.getElementById("botCerr");
    var botAnt = document.getElementById("botAnt");
    var botSig = document.getElementById("botSig");
    botSig.setAttribute("class","d-block btn btn-outline-success");
    botCerr.setAttribute("class","d-block btn btn-outline-success");
    botAnt.setAttribute("class","d-block btn btn-outline-success");
    botBusc.setAttribute("class","d-none");
  }
 
  function ningCoinc() {
    alert("No hay coincidencias");
    cerrar();
  }