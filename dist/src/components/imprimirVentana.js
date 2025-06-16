export function imprimirSeccion(id) {
    var _a;
    const contenido = (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.innerHTML;
    const ventana = window.open('', '_blank');
    if (ventana) {
        ventana.document.write(`
      <html>
        <head>
          <title>Imprimir</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${contenido}
        </body>
      </html>
    `);
        ventana.document.close();
    }
}
;
