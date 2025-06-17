export function limpiarResultados() {
    // Oculta resultados y muestra la tarjeta inicial
    const resultadosDiv = document.getElementById('resultados');
    const inicialCard = document.getElementById('inicialCard');
    resultadosDiv.classList.add('hidden');
    inicialCard.classList.remove('hidden');
    // Limpia los campos de resultados
    document.getElementById('salarioBruto').textContent = '';
    document.getElementById('isr').textContent = '';
    document.getElementById('afpDed').textContent = '';
    document.getElementById('arsDed').textContent = '';
    document.getElementById('totalDed').textContent = '';
    document.getElementById('salarioNeto').textContent = '';
    document.getElementById('isrInfo').innerHTML = '';
    // Limpia los inputs de salario
    document.getElementById('salario').value = '';
    document.getElementById('salarioRange').value = '';
}
