"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarFechaFooter = actualizarFechaFooter;
// Funcion para actualizar fecha de footer
function actualizarFechaFooter() {
    var fecha = new Date();
    var year = fecha.getFullYear();
    var fechaFooter = document.getElementById('fechaFooter');
    var fechaActual = document.getElementById('fechaActual');
    fechaActual.textContent = "".concat(year);
    fechaFooter.textContent = "\u00A9 ".concat(year);
}
;
