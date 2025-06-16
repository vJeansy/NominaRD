export function mostrarVentanaEmergente(mensaje) {
    const ventanaEmergente = document.createElement('div');
    ventanaEmergente.className = 'ventana-emergente';
    ventanaEmergente.innerHTML = `
        <div id="alerta" class="hidden fixed bottom-4 right-4 bg-yellow-100 border
        border-yellow-400 text-yellow-700 px-4 py-3 rounded shadow-md"
        role="warning">
        <p>${mensaje}</p>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3" role="button">
        <svg id="cerrar-ventana" class="fill-current h-6 w-6 text-yellow-500" role="button"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Cerrar</title>
        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
      </span>
    </div>
    `;
    document.body.appendChild(ventanaEmergente);
    const alerta = document.getElementById('alerta');
    alerta === null || alerta === void 0 ? void 0 : alerta.classList.remove('hidden');
    const timeoutId = setTimeout(() => {
        if (document.body.contains(ventanaEmergente)) {
            document.body.removeChild(ventanaEmergente);
        }
        ;
    }, 5000);
    const botonCerrar = document.getElementById('cerrar-ventana');
    if (botonCerrar) {
        botonCerrar.addEventListener('click', () => {
            if (document.body.contains(ventanaEmergente)) {
                document.body.removeChild(ventanaEmergente);
                clearTimeout(timeoutId);
            }
        });
    }
}
