var _a;
import { actualizarFechaFooter } from './src/utils/fecha.js';
import { mostrarVentanaEmergente } from './src/components/ventanaEmergente.js';
import { imprimirSeccion } from './src/components/imprimirVentana.js';
import { limpiarResultados } from './src/components/limpiarResultados.js';
document.addEventListener('DOMContentLoaded', function () {
    var _a;
    // Elementos del DOM
    const salarioInput = document.getElementById('salario');
    const salarioRange = document.getElementById('salarioRange');
    const tipoContrato = document.getElementById('tipoContrato');
    const seguro = document.getElementById('seguro');
    const afpCheckbox = document.getElementById('afp');
    //const sfsCheckbox = document.getElementById('sfs') as HTMLInputElement;
    const dependientes = document.getElementById('dependientes');
    const calcularBtn = document.getElementById('calcular');
    const resultadosDiv = document.getElementById('resultados');
    const inicialCard = document.getElementById('inicialCard');
    // Sincronizar slider con input
    salarioInput.addEventListener('input', function () {
        salarioRange.value = String(this.value || 0);
    });
    salarioRange.addEventListener('input', function () {
        salarioInput.value = this.value;
    });
    // Calcular impuestos
    calcularBtn.addEventListener('click', function () {
        const salario = parseFloat(salarioInput.value) || 0;
        if (salario < 15860) {
            salarioInput.style.borderColor = 'red';
            salarioRange.style.borderColor = 'red';
            mostrarVentanaEmergente('El monto mínimo imponible es RD$ 15,860.00. Por favor, ingrese un salario mayor.');
            return;
        }
        else {
            salarioInput.style.borderColor = '';
            salarioRange.style.borderColor = '';
        }
        // Mostrar resultados
        inicialCard.classList.add('hidden');
        resultadosDiv.classList.remove('hidden');
        // Calcular deducciones
        const afp = afpCheckbox.checked ? salario * 0.0287 : 0;
        let ars = 0;
        if (seguro.value === 'ars' || seguro.value === 'senasa') {
            ars = salario * 0.0304;
        }
        // Calcular ISR según tablas DGII
        const isr = calcularISR(salario - (afp + ars));
        const totalDeducciones = afp + ars + isr;
        const salarioNeto = salario - totalDeducciones;
        // Actualizar UI
        document.getElementById('salarioBruto').textContent = `RD$ ${salario.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('isr').textContent = `RD$ ${isr.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('afpDed').textContent = `RD$ ${afp.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        //document.getElementById('sfsDed')!.textContent = `RD$ ${sfs.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('arsDed').textContent = `RD$ ${ars.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('totalDed').textContent = `RD$ ${totalDeducciones.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('salarioNeto').textContent = `RD$ ${salarioNeto.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        // Información ISR
        const isrInfo = generarInfoISR(salario - (afp + ars), isr);
        document.getElementById('isrInfo').innerHTML = isrInfo;
    });
    // Función para calcular ISR según tablas DGII
    function calcularISR(salarioImponible) {
        // Ajuste por dependientes (RD$ 1,313.50 por cada dependiente)
        let baseImponible = Math.max(0, salarioImponible);
        let impuesto = 0;
        if (baseImponible <= 34685.00)
            return 0;
        if (baseImponible > 34685.00 && baseImponible <= 52027.42) {
            const excedente = baseImponible - 34685.00;
            impuesto = excedente * 0.15;
        }
        else if (baseImponible > 52027.42 && baseImponible <= 72260.25) {
            const excedente1 = 52027.42 - 34685.00;
            const excedente2 = baseImponible - 52027.42;
            impuesto = (excedente1 * 0.15) + (excedente2 * 0.20);
        }
        else if (baseImponible > 72260.25) {
            const excedente1 = 52027.42 - 34685.00;
            const excedente2 = 72260.25 - 52027.42;
            const excedente3 = baseImponible - 72260.25;
            impuesto = (excedente1 * 0.15) + (excedente2 * 0.20) + (excedente3 * 0.25);
        }
        return Math.max(0, impuesto);
    }
    // Generar información detallada del ISR
    function generarInfoISR(salarioImponible, isr) {
        const baseImponible = Math.max(0, salarioImponible);
        let info = '';
        if (baseImponible <= 34685.00) {
            info += `Base imponible (RD$ ${baseImponible.toLocaleString('es-DO')}) está en el primer tramo (0% de ISR).`;
        }
        else if (baseImponible > 34685.00 && baseImponible <= 52027.42) {
            const excedente = baseImponible - 34685.00;
            info += `• Salario Imponible RD$ ${baseImponible}<br>`;
            info += `• Primeros RD$ 34,685: RD$ 0<br>`;
            info += `• Excedente RD$ ${excedente.toLocaleString('es-DO')} × 15% = RD$ ${(excedente * 0.15).toLocaleString('es-DO')}`;
        }
        else if (baseImponible > 52027.42 && baseImponible <= 72260.25) {
            const excedente1 = 52027.43 - 34685.00;
            const excedente2 = baseImponible - 52027.42;
            info += `• Salario Imponible RD$ ${baseImponible}<br>`;
            info += `• Primeros RD$ 34,685: RD$ 0<br>`;
            info += `• RD$ ${(excedente1).toLocaleString('es-DO')} × 15% = RD$ ${(excedente1 * 0.15).toLocaleString('es-DO')}<br>`;
            info += `• RD$ ${(excedente2).toLocaleString('es-DO')} × 20% = RD$ ${(excedente2 * 0.20).toLocaleString('es-DO')}`;
        }
        else if (baseImponible > 72260.25) {
            const excedente1 = 52027.43 - 34685.01;
            const excedente2 = 72260.25 - 52027.42;
            const excedente3 = baseImponible - 72260.25;
            info += `• Salario Imponible RD$ ${baseImponible}<br>`;
            info += `• Primeros RD$ 34,685: RD$ 0<br>`;
            info += `• RD$ ${(excedente1).toLocaleString('es-DO')} × 15% = RD$ ${(excedente1 * 0.15).toLocaleString('es-DO')}<br>`;
            info += `• RD$ ${(excedente2).toLocaleString('es-DO')} × 20% = RD$ ${(excedente2 * 0.20).toLocaleString('es-DO')}<br>`;
            info += `• RD$ ${(excedente3).toLocaleString('es-DO')} × 25% = RD$ ${(excedente3 * 0.25).toLocaleString('es-DO')}`;
        }
        return info;
    }
    // Evento para limpiar resultados y mostrar la tarjeta inicial
    (_a = document.getElementById('limpiar-resultados')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', limpiarResultados);
});
// Función para imprimir la sección de resultados
(_a = document.getElementById('imprimirResultados')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    imprimirSeccion('resultados');
});
// Llama funcion para actualizar la fecha del footer.
actualizarFechaFooter();
