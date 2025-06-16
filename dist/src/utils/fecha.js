// Funcion para actualizar fecha de footer
export function actualizarFechaFooter() {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const fechaFooter = document.getElementById('fechaFooter');
    const fechaActual = document.getElementById('fechaActual');
    fechaActual.textContent = `${year}`;
    fechaFooter.textContent = `© ${year}`;
}
;
