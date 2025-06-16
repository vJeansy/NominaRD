"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fecha_1 = require("./src/utils/fecha");
document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    var salarioInput = document.getElementById('salario');
    var salarioRange = document.getElementById('salarioRange');
    var tipoContrato = document.getElementById('tipoContrato');
    var seguro = document.getElementById('seguro');
    var afpCheckbox = document.getElementById('afp');
    var sfsCheckbox = document.getElementById('sfs');
    var dependientes = document.getElementById('dependientes');
    var calcularBtn = document.getElementById('calcular');
    var resultadosDiv = document.getElementById('resultados');
    var inicialCard = document.getElementById('inicialCard');
    // Sincronizar slider con input
    salarioInput.addEventListener('input', function () {
        salarioRange.value = String(this.value || 0);
    });
    salarioRange.addEventListener('input', function () {
        salarioInput.value = this.value;
    });
    // Calcular impuestos
    calcularBtn.addEventListener('click', function () {
        var salario = parseFloat(salarioInput.value) || 0;
        if (salario <= 0) {
            alert('Por favor ingresa un salario válido');
            return;
        }
        // Mostrar resultados
        inicialCard.classList.add('hidden');
        resultadosDiv.classList.remove('hidden');
        // Calcular deducciones
        var afp = afpCheckbox.checked ? salario * 0.0287 : 0;
        var sfs = sfsCheckbox.checked ? salario * 0.0304 : 0;
        var ars = 0;
        if (seguro.value === 'ars' || seguro.value === 'senasa') {
            ars = salario * 0.0304;
        }
        // Calcular ISR según tablas DGII
        var isr = calcularISR(salario - (afp + sfs), dependientes.value);
        var totalDeducciones = afp + sfs + ars + isr;
        var salarioNeto = salario - totalDeducciones;
        // Actualizar UI
        document.getElementById('salarioBruto').textContent = "RD$ ".concat(salario.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        document.getElementById('isr').textContent = "RD$ ".concat(isr.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        document.getElementById('afpDed').textContent = "RD$ ".concat(afp.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        document.getElementById('sfsDed').textContent = "RD$ ".concat(sfs.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        document.getElementById('arsDed').textContent = "RD$ ".concat(ars.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        document.getElementById('totalDed').textContent = "RD$ ".concat(totalDeducciones.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        document.getElementById('salarioNeto').textContent = "RD$ ".concat(salarioNeto.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        // Información ISR
        var isrInfo = generarInfoISR(salario - (afp + sfs), isr, dependientes.value);
        document.getElementById('isrInfo').innerHTML = isrInfo;
    });
    // Función para calcular ISR según tablas DGII
    function calcularISR(salarioImponible, dependientes) {
        // Ajuste por dependientes (RD$ 1,313.50 por cada dependiente)
        var ajusteDependientes = parseInt(dependientes) * 1313.50;
        var baseImponible = Math.max(0, salarioImponible - ajusteDependientes);
        var impuesto = 0;
        if (baseImponible <= 47524)
            return 0;
        if (baseImponible > 47524 && baseImponible <= 69905) {
            var excedente = baseImponible - 47524;
            impuesto = excedente * 0.15;
        }
        else if (baseImponible > 69905 && baseImponible <= 139810) {
            var excedente1 = 69905 - 47524;
            var excedente2 = baseImponible - 69905;
            impuesto = (excedente1 * 0.15) + (excedente2 * 0.20);
        }
        else if (baseImponible > 139810) {
            var excedente1 = 69905 - 47524;
            var excedente2 = 139810 - 69905;
            var excedente3 = baseImponible - 139810;
            impuesto = (excedente1 * 0.15) + (excedente2 * 0.20) + (excedente3 * 0.25);
        }
        return Math.max(0, impuesto);
    }
    // Generar información detallada del ISR
    function generarInfoISR(salarioImponible, isr, dependientes) {
        var ajusteDependientes = parseInt(dependientes) * 1313.50;
        var baseImponible = Math.max(0, salarioImponible - ajusteDependientes);
        var info = '';
        if (parseInt(dependientes) > 0) {
            info += "Ajuste por ".concat(dependientes, " dependiente(s): RD$ ").concat(ajusteDependientes.toLocaleString('es-DO'), "<br>");
            info += "Base imponible: RD$ ".concat(salarioImponible.toLocaleString('es-DO'), " - RD$ ").concat(ajusteDependientes.toLocaleString('es-DO'), " = RD$ ").concat(baseImponible.toLocaleString('es-DO'), "<br><br>");
        }
        if (baseImponible <= 47524) {
            info += "Base imponible (RD$ ".concat(baseImponible.toLocaleString('es-DO'), ") est\u00E1 en el primer tramo (0% de ISR).");
        }
        else if (baseImponible > 47524 && baseImponible <= 69905) {
            var excedente = baseImponible - 47524;
            info += "\u2022 Primeros RD$ 47,524: RD$ 0<br>";
            info += "\u2022 Excedente RD$ ".concat(excedente.toLocaleString('es-DO'), " \u00D7 15% = RD$ ").concat((excedente * 0.15).toLocaleString('es-DO'));
        }
        else if (baseImponible > 69905 && baseImponible <= 139810) {
            var excedente1 = 69905 - 47524;
            var excedente2 = baseImponible - 69905;
            info += "\u2022 Primeros RD$ 47,524: RD$ 0<br>";
            info += "\u2022 RD$ ".concat(excedente1.toLocaleString('es-DO'), " \u00D7 15% = RD$ ").concat((excedente1 * 0.15).toLocaleString('es-DO'), "<br>");
            info += "\u2022 RD$ ".concat(excedente2.toLocaleString('es-DO'), " \u00D7 20% = RD$ ").concat((excedente2 * 0.20).toLocaleString('es-DO'));
        }
        else if (baseImponible > 139810) {
            var excedente1 = 69905 - 47524;
            var excedente2 = 139810 - 69905;
            var excedente3 = baseImponible - 139810;
            info += "\u2022 Primeros RD$ 47,524: RD$ 0<br>";
            info += "\u2022 RD$ ".concat(excedente1.toLocaleString('es-DO'), " \u00D7 15% = RD$ ").concat((excedente1 * 0.15).toLocaleString('es-DO'), "<br>");
            info += "\u2022 RD$ ".concat(excedente2.toLocaleString('es-DO'), " \u00D7 20% = RD$ ").concat((excedente2 * 0.20).toLocaleString('es-DO'), "<br>");
            info += "\u2022 RD$ ".concat(excedente3.toLocaleString('es-DO'), " \u00D7 25% = RD$ ").concat((excedente3 * 0.25).toLocaleString('es-DO'));
        }
        return info;
    }
});
(0, fecha_1.actualizarFechaFooter)();
