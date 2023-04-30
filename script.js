function promptCalidad(opcionesCalidad, dia) {
  var mensaje = `Ingrese el código correspondiente a la calidad de sueño del día ${dia}:`;
  opcionesCalidad.forEach(function(opcion) {
    mensaje += ` ${opcion.nombre} (${opcion.code})`;
  });
  return prompt(mensaje);
}

function getHorasSuenio(dia) {
  return prompt(`Ingrese la cantidad de horas de sueño del día ${dia}:`);
}

function calcularResumenCalidadSuenio(opcionesCalidad, diasDelMes) {
  var resumenCalidadSuenio = [];
  var suenoTotal = 0;
  var calidadTotal = 0;

  opcionesCalidad.forEach(function(opcion) {
    resumenCalidadSuenio.push({ nombre: opcion.nombre, count: 0 });
  });

  for (var j = 1; j <= diasDelMes; j++) {
    var codigoCalidadSuenio = promptCalidad(opcionesCalidad, j);
    var horasSuenio = parseFloat(getHorasSuenio(j));
    suenoTotal += horasSuenio;

    opcionesCalidad.forEach(function(opcion, k) {
      if (codigoCalidadSuenio.toUpperCase() === opcion.code) {
        resumenCalidadSuenio[k].count++;
        calidadTotal += k + 1;
      }
    });
  }

  var promedioSuenio = suenoTotal / diasDelMes;
  var promedioCalidad = opcionesCalidad[Math.round(calidadTotal / diasDelMes)].nombre;
  var peorCalidadSuenio = resumenCalidadSuenio.slice().sort(function(a, b) {
    return b.count - a.count;
  }).slice(-5);
  var recomendaciones = [];

  if (peorCalidadSuenio.some(function(item) { return item.nombre === "Pésimo" })) {
    recomendaciones.push("Trate de establecer una rutina de sueño regular y acostarse y levantarse a la misma hora todos los días.");
  }
  if (peorCalidadSuenio.some(function(item) { return item.nombre === "Malo" })) {
    recomendaciones.push("Evite tomar cafeína y alcohol antes de acostarse, ya que pueden afectar la calidad del sueño.");
  }
  if (peorCalidadSuenio.some(function(item) { return item.nombre === "Ligero" })) {
    recomendaciones.push("Intente hacer ejercicio regularmente para ayudar a mejorar la calidad del sueño.");
  }

  var resumen = {
    resumenCalidadSuenio: resumenCalidadSuenio,
    promedioSuenio: promedioSuenio.toFixed(2),
    promedioCalidad: promedioCalidad,
    recomendaciones: recomendaciones
  };
  
  localStorage.setItem("resúmenSueño", JSON.stringify(resumen));
  
  return resumen;
}

var opcionesCalidad = [
  { nombre: "Excelente", code: "E" },
  { nombre: "Bueno", code: "B" },
  { nombre: "Regular", code: "R" },
  { nombre: "Ligero", code: "L" },
  { nombre: "Malo", code: "M" },
  { nombre: "Pésimo", code: "P" }
  ];
  
  function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  }
  
  function getData(key) {
  var value = localStorage.getItem(key);
  return value && JSON.parse(value);
  }
  
  var diasDelMes = parseInt(prompt("Ingrese la cantidad de días del mes a evaluar:"));
  var resumen = calcularResumenCalidadSuenio(opcionesCalidad, diasDelMes);
  
  saveData("resumenCalidadSuenio", resumen);
  
  document.write("<h2>Resumen de calidad de sueño del mes:</h2>");
  document.write("<p>Cantidad de días evaluados: " + diasDelMes + "</p>");
  document.write("<p>Promedio de horas de sueño: " + resumen.promedioSuenio + "</p>");
  document.write("<p>Promedio de calidad de sueño: " + resumen.promedioCalidad + "</p>");
  document.write("<ul>");
  for (var i = 0; i < resumen.resumenCalidadSuenio.length; i++) {
  document.write("<li>" + resumen.resumenCalidadSuenio[i].nombre + ": " + resumen.resumenCalidadSuenio[i].count + "</li>");
  }
  document.write("</ul>");
  document.write("<h3>Recomendaciones para mejorar la calidad del sueño:</h3>");
  document.write("<ul>");
  for (var j = 0; j < resumen.recomendaciones.length; j++) {
  document.write("<li>" + resumen.recomendaciones[j] + "</li>");
  }
  document.write("</ul>");
  
var storedResumen = getData("resumenCalidadSuenio");
if (storedResumen) {
console.log("Objeto Resúmen Sueño Recuperado Desde Almacenamiento:", storedResumen);
} else {
console.log("Objeto Resúmen Sueño No Encontrado En Almacenamiento.");
}
var resumenObjeto = localStorage.getItem("resúmenCalidadSueño");

if (resumenObjeto) {
console.log("Objeto Resúmen Sueño Encontrado En Almacenamiento:");
console.log(resumenObjeto);
} else {
console.log("Objeto Resúmen Sueño No Encontrado En Almacenamiento.");
}

localStorage.setItem("resúmenCalidadSueño", JSON.stringify(resumen));

document.write("</ul>");
