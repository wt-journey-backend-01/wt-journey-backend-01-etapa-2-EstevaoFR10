require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./docs/swagger');
const { errorHandler, notFoundHandler } = require('./utils/errorHandler');

// Importar rotas
const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota raiz
app.get('/', (req, res) => {
    res.json({
        message: 'API do Departamento de Polícia',
        version: '1.0.0',
        endpoints: [
            'GET /agentes',
            'GET /casos', 
            'GET /docs'
        ]
    });
});

// Configurar Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rotas da API
app.use('/agentes', agentesRoutes);
app.use('/casos', casosRoutes);

// Middleware para rotas não encontradas
app.use(notFoundHandler);

// Middleware de tratamento de erros
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em localhost:${PORT}`);
    console.log(`Documentação da API disponível em http://localhost:${PORT}/docs`);
});