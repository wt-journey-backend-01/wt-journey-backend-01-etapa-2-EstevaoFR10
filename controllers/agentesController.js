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
