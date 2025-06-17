        // Funcion para actualizar fecha de footer
        export function actualizarFechaFooter() {
            const fecha = new Date();
            const year = fecha.getFullYear();
            const fechaFooter = document.getElementById('fecha-footer') as HTMLSpanElement;
            const fechaTabla = document.getElementById('fecha-tabla') as HTMLSpanElement;
            const fechaIsr = document.getElementById('fecha-isr') as HTMLAnchorElement;
            fechaIsr.textContent = `${year}`;
            fechaTabla.textContent = `${year}`;
            fechaFooter.textContent = `© ${year}`;
        };