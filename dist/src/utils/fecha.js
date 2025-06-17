// Funcion para actualizar fecha de footer
export function actualizarFechaFooter() {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const fechaFooter = document.getElementById('fecha-footer');
    const fechaTabla = document.getElementById('fecha-tabla');
    const fechaIsr = document.getElementById('fecha-isr');
    fechaIsr.textContent = `${year}`;
    fechaTabla.textContent = `${year}`;
    fechaFooter.textContent = `© ${year}`;
}
;
