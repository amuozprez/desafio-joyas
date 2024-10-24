const express = require('express');
const app = express();
const joyasRoutes = require('./src/routes/joyasRoutes');
const logMiddleware = require('./src/middlewares/logMiddleware');

app.use(logMiddleware);
app.use(joyasRoutes);

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
