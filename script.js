var suenoTotal = 0;
var calidadTotal = 0;
var diasDelMes = 31;
var opcionesCalidad = [
  { code: "1", nombre: "Pésimo" },
  { code: "2", nombre: "Malo" },
  { code: "3", nombre: "Ligero" },
  { code: "4", nombre: "Aceptable" },
  { code: "5", nombre: "Ok" },
  { code: "6", nombre: "Apropiado" },
  { code: "7", nombre: "Bueno" },
  { code: "8", nombre: "Excelente" }
];

function getHorasSuenio(i) {
  return prompt("Indique horas de sueño del día " + i + ":");
}

function getCalidadSuenio(i) {
  var promptCalidad = "Indique calidad de horas de sueño para el día " + i + " (";
  for (var j = 0; j < opcionesCalidad.length; j++) {
    promptCalidad += opcionesCalidad[j].code + "=" + opcionesCalidad[j].nombre;
    if (j < opcionesCalidad.length - 1) {
      promptCalidad += ", ";
    }
  }
  promptCalidad += "):";
  return prompt(promptCalidad);
}
function calcularResumenCalidadSuenio(opcionesCalidad, diasDelMes) {
  var resumenCalidadSuenio = [];
  for (var i = 0; i < opcionesCalidad.length; i++) {
    resumenCalidadSuenio.push({ nombre: opcionesCalidad[i].nombre, count: 0 });
  }
  for (var j = 1; j <= diasDelMes; j++) {
    var codigoCalidadSuenio = promptCalidad(opcionesCalidad, j);
    for (var k = 0; k < opcionesCalidad.length; k++) {
      if (codigoCalidadSuenio.toUpperCase() === opcionesCalidad[k].code) {
        resumenCalidadSuenio[k].count++;
        break;
      }
    }
  }
  return resumenCalidadSuenio;
}

function promptCalidad(opcionesCalidad, dia) {
  var promptCalidad = "Indique calidad de horas de sueño para el día " + dia + " (";
  for (var i = 0; i < opcionesCalidad.length; i++) {
    promptCalidad += opcionesCalidad[i].code + "=" + opcionesCalidad[i].nombre;
    if (i < opcionesCalidad.length - 1) {
      promptCalidad += ", ";
    }
  }
  promptCalidad += "):";
  return prompt(promptCalidad);
}

var resumenCalidadSuenio = calcularResumenCalidadSuenio(opcionesCalidad, diasDelMes);
document.write("<p>Aqui tiene un resúmen de su sueño por mes:</p>");
for (var l = 0; l < resumenCalidadSuenio.length; l++) {
  document.write("<p>" + resumenCalidadSuenio[l].nombre + ": " + resumenCalidadSuenio[l].count + " days</p>");
}

var promedioSuenio = suenoTotal / diasDelMes;
var promedioCalidad = opcionesCalidad[Math.round(calidadTotal / diasDelMes)].nombre;    
document.write("<p>Su promedio de horas de seuño para el mes es: " + promedioSuenio.toFixed(2) + "</p>");
document.write("<p>Su promedio en calidad de sueño para el mes es: " + promedioCalidad + "</p>");    
if (promedioSuenio < 7) {
    document.write("<p>Puede que no esté durmiendo lo suficiente. Cambie sus rutinas para el sueño o consulte a un profesional.</p>");
} else if (promedioSuenio >= 8) {
    document.write("<p>Está obteniendo una buena cantidad de sueño. Continúe con sus patrones de conducta para el mismo.</p>");
} else {
    document.write("<p>Su tiempo de sueño es promedio.</p>");
}
