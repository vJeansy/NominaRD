var _a;
import { actualizarFechaFooter } from './src/utils/fecha.js';
import { mostrarVentanaEmergente } from './src/components/ventanaEmergente.js';
import { imprimirSeccion } from './src/components/imprimirVentana.js';
document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const salarioInput = document.getElementById('salario');
    const salarioRange = document.getElementById('salarioRange');
    const tipoContrato = document.getElementById('tipoContrato');
    const seguro = document.getElementById('seguro');
    const afpCheckbox = document.getElementById('afp');
    const sfsCheckbox = document.getElementById('sfs');
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
        const sfs = sfsCheckbox.checked ? salario * 0.0304 : 0;
        let ars = 0;
        if (seguro.value === 'ars' || seguro.value === 'senasa') {
            ars = salario * 0.0304;
        }
        // Calcular ISR según tablas DGII
        const isr = calcularISR(salario - (afp + sfs), dependientes.value);
        const totalDeducciones = afp + sfs + ars + isr;
        const salarioNeto = salario - totalDeducciones;
        // Actualizar UI
        document.getElementById('salarioBruto').textContent = `RD$ ${salario.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('isr').textContent = `RD$ ${isr.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('afpDed').textContent = `RD$ ${afp.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('sfsDed').textContent = `RD$ ${sfs.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('arsDed').textContent = `RD$ ${ars.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('totalDed').textContent = `RD$ ${totalDeducciones.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('salarioNeto').textContent = `RD$ ${salarioNeto.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        // Información ISR
        const isrInfo = generarInfoISR(salario - (afp + sfs), isr, dependientes.value);
        document.getElementById('isrInfo').innerHTML = isrInfo;
    });
    // Función para calcular ISR según tablas DGII
    function calcularISR(salarioImponible, dependientes) {
        // Ajuste por dependientes (RD$ 1,313.50 por cada dependiente)
        const ajusteDependientes = parseInt(dependientes) * 1313.50;
        let baseImponible = Math.max(0, salarioImponible - ajusteDependientes);
        let impuesto = 0;
        if (baseImponible <= 47524)
            return 0;
        if (baseImponible > 47524 && baseImponible <= 69905) {
            const excedente = baseImponible - 47524;
            impuesto = excedente * 0.15;
        }
        else if (baseImponible > 69905 && baseImponible <= 139810) {
            const excedente1 = 69905 - 47524;
            const excedente2 = baseImponible - 69905;
            impuesto = (excedente1 * 0.15) + (excedente2 * 0.20);
        }
        else if (baseImponible > 139810) {
            const excedente1 = 69905 - 47524;
            const excedente2 = 139810 - 69905;
            const excedente3 = baseImponible - 139810;
            impuesto = (excedente1 * 0.15) + (excedente2 * 0.20) + (excedente3 * 0.25);
        }
        return Math.max(0, impuesto);
    }
    // Generar información detallada del ISR
    function generarInfoISR(salarioImponible, isr, dependientes) {
        const ajusteDependientes = parseInt(dependientes) * 1313.50;
        const baseImponible = Math.max(0, salarioImponible - ajusteDependientes);
        let info = '';
        if (parseInt(dependientes) > 0) {
            info += `Ajuste por ${dependientes} dependiente(s): RD$ ${ajusteDependientes.toLocaleString('es-DO')}<br>`;
            info += `Base imponible: RD$ ${salarioImponible.toLocaleString('es-DO')} - RD$ ${ajusteDependientes.toLocaleString('es-DO')} = RD$ ${baseImponible.toLocaleString('es-DO')}<br><br>`;
        }
        if (baseImponible <= 47524) {
            info += `Base imponible (RD$ ${baseImponible.toLocaleString('es-DO')}) está en el primer tramo (0% de ISR).`;
        }
        else if (baseImponible > 47524 && baseImponible <= 69905) {
            const excedente = baseImponible - 47524;
            info += `• Primeros RD$ 47,524: RD$ 0<br>`;
            info += `• Excedente RD$ ${excedente.toLocaleString('es-DO')} × 15% = RD$ ${(excedente * 0.15).toLocaleString('es-DO')}`;
        }
        else if (baseImponible > 69905 && baseImponible <= 139810) {
            const excedente1 = 69905 - 47524;
            const excedente2 = baseImponible - 69905;
            info += `• Primeros RD$ 47,524: RD$ 0<br>`;
            info += `• RD$ ${excedente1.toLocaleString('es-DO')} × 15% = RD$ ${(excedente1 * 0.15).toLocaleString('es-DO')}<br>`;
            info += `• RD$ ${excedente2.toLocaleString('es-DO')} × 20% = RD$ ${(excedente2 * 0.20).toLocaleString('es-DO')}`;
        }
        else if (baseImponible > 139810) {
            const excedente1 = 69905 - 47524;
            const excedente2 = 139810 - 69905;
            const excedente3 = baseImponible - 139810;
            info += `• Primeros RD$ 47,524: RD$ 0<br>`;
            info += `• RD$ ${excedente1.toLocaleString('es-DO')} × 15% = RD$ ${(excedente1 * 0.15).toLocaleString('es-DO')}<br>`;
            info += `• RD$ ${excedente2.toLocaleString('es-DO')} × 20% = RD$ ${(excedente2 * 0.20).toLocaleString('es-DO')}<br>`;
            info += `• RD$ ${excedente3.toLocaleString('es-DO')} × 25% = RD$ ${(excedente3 * 0.25).toLocaleString('es-DO')}`;
        }
        return info;
    }
});
// Función para imprimir la sección de resultados
(_a = document.getElementById('imprimirResultados')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    imprimirSeccion('resultados');
});
actualizarFechaFooter();
