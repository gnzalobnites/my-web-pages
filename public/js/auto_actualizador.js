window.onload = function () {
    let objFech = new Date();
    let ani = objFech.getFullYear().toString();
    let mes = objFech.getMonth().toString();
    let dia = objFech.getDate().toString();
    let hor = objFech.getHours().toString();
    let min = objFech.getMinutes().toString();
    let expFec = ani + mes + dia + hor + min;
    console.log(expFec)
  
    let fecGua = localStorage.getItem('fecGua');
    
    if (fecGua == null) {
      localStorage.setItem('fecGua', expFec);
    } 
  
    if (eval(fecGua) < eval(expFec)) {
      alert("Recargando página")
      localStorage.setItem('fecGua', expFec);
      recPag()
    }
  }
   
  function recPag() {
    // Genera un número aleatorio para evitar la caché del navegador
    const randomParam = Math.random();
  
    // Obtiene la URL actual del navegador y agrega el parámetro de consulta único
    const nuevaURL = window.location.href + "?v=" + randomParam;
  
    // Redirige a la nueva URL, forzando así la recarga de la página sin caché
    window.location.href = nuevaURL;
  };