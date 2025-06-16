        // Funcion para actualizar fecha de footer
        export function actualizarFechaFooter() {
            const fecha = new Date();
            const year = fecha.getFullYear();
            const fechaFooter = document.getElementById('fechaFooter') as HTMLSpanElement;
            const fechaActual = document.getElementById('fechaActual') as HTMLSpanElement;
            fechaActual.textContent = `${year}`;
            fechaFooter.textContent = `© ${year}`;
        };