export function imprimirSeccion(id: string): void {
    const contenido = document.getElementById(id)?.innerHTML;
    const ventana: Window | null = window.open('', '_blank');
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
};