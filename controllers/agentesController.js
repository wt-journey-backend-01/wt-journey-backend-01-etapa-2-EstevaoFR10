const agentesRepository = require("../repositories/agentesRepository");

function getAllAgentes(req, res) {
    try {
        const { cargo, sort } = req.query;
        
        let agentes;
        
        if (cargo) {
            agentes = agentesRepository.findByCargo(cargo);
        } else if (sort) {
            agentes = agentesRepository.findAllSorted(sort);
        } else {
            agentes = agentesRepository.findAll();
        }
        
        res.status(200).json(agentes);
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
}

function getAgenteById(req, res) {
    try {
        const { id } = req.params;
        const agente = agentesRepository.findById(id);
        
        if (!agente) {
            return res.status(404).json({ 
                status: 404,
                message: 'Agente não encontrado'
            });
        }
        
        res.status(200).json(agente);
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
}

function createAgente(req, res) {
    try {
        const dadosAgente = req.body;
        
        // Validações básicas
        if (!dadosAgente.nome || !dadosAgente.dataDeIncorporacao || !dadosAgente.cargo) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    nome: !dadosAgente.nome ? "Campo 'nome' é obrigatório" : null,
                    dataDeIncorporacao: !dadosAgente.dataDeIncorporacao ? "Campo 'dataDeIncorporacao' é obrigatório" : null,
                    cargo: !dadosAgente.cargo ? "Campo 'cargo' é obrigatório" : null
                }
            });
        }

        // Validação de formato de data
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dadosAgente.dataDeIncorporacao)) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    dataDeIncorporacao: "Campo 'dataDeIncorporacao' deve estar no formato YYYY-MM-DD"
                }
            });
        }

        // Verificar se não é data futura
        const inputDate = new Date(dadosAgente.dataDeIncorporacao + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (inputDate > today) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    dataDeIncorporacao: "Campo 'dataDeIncorporacao' não pode ser uma data futura"
                }
            });
        }
        
        const novoAgente = agentesRepository.create(dadosAgente);
        res.status(201).json(novoAgente);
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
}

function updateAgente(req, res) {
    try {
        const { id } = req.params;
        const dadosAgente = req.body;
        
        // Verificar se está tentando alterar o ID
        if (dadosAgente.id !== undefined) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    id: "Campo 'id' não pode ser alterado"
                }
            });
        }

        // Validação de tipos de dados - detectar payload em formato incorreto
        const camposPermitidos = ['nome', 'dataDeIncorporacao', 'cargo'];
        
        // Verificar se há campos não permitidos
        const camposInvalidos = Object.keys(dadosAgente).filter(campo => 
            campo !== 'id' && !camposPermitidos.includes(campo)
        );
        
        if (camposInvalidos.length > 0) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    [camposInvalidos[0]]: `Campo '${camposInvalidos[0]}' não é permitido`
                }
            });
        }

        // Validação de tipos de dados para campos fornecidos
        if (dadosAgente.nome !== undefined && typeof dadosAgente.nome !== 'string') {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    nome: "Campo 'nome' deve ser uma string"
                }
            });
        }

        if (dadosAgente.dataDeIncorporacao !== undefined && typeof dadosAgente.dataDeIncorporacao !== 'string') {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    dataDeIncorporacao: "Campo 'dataDeIncorporacao' deve ser uma string"
                }
            });
        }

        if (dadosAgente.cargo !== undefined && typeof dadosAgente.cargo !== 'string') {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    cargo: "Campo 'cargo' deve ser uma string"
                }
            });
        }

        // Validação de valores específicos
        if (dadosAgente.cargo !== undefined) {
            const cargosValidos = ['delegado', 'inspetor', 'escrivao', 'agente'];
            if (!cargosValidos.includes(dadosAgente.cargo)) {
                return res.status(400).json({
                    status: 400,
                    message: "Parâmetros inválidos",
                    errors: {
                        cargo: "Campo 'cargo' deve ser 'delegado', 'inspetor', 'escrivao' ou 'agente'"
                    }
                });
            }
        }

        // Validação básica de formato de data se fornecida
        if (dadosAgente.dataDeIncorporacao) {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(dadosAgente.dataDeIncorporacao)) {
                return res.status(400).json({
                    status: 400,
                    message: "Parâmetros inválidos",
                    errors: {
                        dataDeIncorporacao: "Campo 'dataDeIncorporacao' deve estar no formato YYYY-MM-DD"
                    }
                });
            }

            // Verificar se não é data futura
            const inputDate = new Date(dadosAgente.dataDeIncorporacao + 'T00:00:00');
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (inputDate > today) {
                return res.status(400).json({
                    status: 400,
                    message: "Parâmetros inválidos",
                    errors: {
                        dataDeIncorporacao: "Campo 'dataDeIncorporacao' não pode ser uma data futura"
                    }
                });
            }
        }
        
        const agenteAtualizado = agentesRepository.update(id, dadosAgente);
        
        if (!agenteAtualizado) {
            return res.status(404).json({ 
                status: 404,
                message: 'Agente não encontrado'
            });
        }
        
        res.status(200).json(agenteAtualizado);
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
}

function deleteAgente(req, res) {
    try {
        const { id } = req.params;
        const agenteDeletado = agentesRepository.deleteById(id);
        
        if (!agenteDeletado) {
            return res.status(404).json({ 
                status: 404,
                message: 'Agente não encontrado'
            });
        }
        
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
}

module.exports = {
    getAllAgentes,
    getAgenteById,
    createAgente,
    updateAgente,
    deleteAgente
};
