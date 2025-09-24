const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Servir archivos estáticos desde el directorio raíz
app.use(express.static(path.join(__dirname)));

// Ruta para servir el index.html en todas las rutas (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Micro frontend de Operaciones ejecutándose en puerto ${PORT}`);
  console.log(`📱 Accede a: http://localhost:${PORT}`);
  console.log(`🌐 Micro frontend listo para operaciones industriales`);
});
