const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");

function getAllCasos(req, res) {
    try {
        const { agente_id, status, q } = req.query;
        
        let casos;
        
        if (agente_id) {
            casos = casosRepository.findByAgenteId(agente_id);
        } else if (status) {
            casos = casosRepository.findByStatus(status);
        } else if (q) {
            casos = casosRepository.search(q);
        } else {
            casos = casosRepository.findAll();
        }
        
        res.status(200).json(casos);
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
}

function getCasoById(req, res) {
    try {
        const { id } = req.params;
        const caso = casosRepository.findById(id);
        
        if (!caso) {
            return res.status(404).json({ 
                status: 404,
                message: 'Caso não encontrado'
            });
        }
        
        res.status(200).json(caso);
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
}

function getAgenteByCasoId(req, res) {
    try {
        const { caso_id } = req.params;
        const caso = casosRepository.findById(caso_id);
        
        if (!caso) {
            return res.status(404).json({ 
                status: 404,
                message: 'Caso não encontrado'
            });
        }
        
        const agente = agentesRepository.findById(caso.agente_id);
        
        if (!agente) {
            return res.status(404).json({ 
                status: 404,
                message: 'Agente responsável não encontrado'
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

function createCaso(req, res) {
    try {
        const dadosCaso = req.body;
        
        // Validações básicas
        if (!dadosCaso.titulo || !dadosCaso.descricao || !dadosCaso.status || !dadosCaso.agente_id) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    titulo: !dadosCaso.titulo ? "Campo 'titulo' é obrigatório" : null,
                    descricao: !dadosCaso.descricao ? "Campo 'descricao' é obrigatório" : null,
                    status: !dadosCaso.status ? "Campo 'status' é obrigatório" : null,
                    agente_id: !dadosCaso.agente_id ? "Campo 'agente_id' é obrigatório" : null
                }
            });
        }
        
        // Validar status
        if (dadosCaso.status && !['aberto', 'solucionado'].includes(dadosCaso.status)) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    status: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'"
                }
            });
        }
        
        // Verificar se agente existe - retornar 404 se não existir
        const agente = agentesRepository.findById(dadosCaso.agente_id);
        if (!agente) {
            return res.status(404).json({
                status: 404,
                message: "Agente não encontrado"
            });
        }
        
        const novoCaso = casosRepository.create(dadosCaso);
        res.status(201).json(novoCaso);
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
}

function updateCaso(req, res) {
    try {
        const { id } = req.params;
        const dadosCaso = req.body;
        
        // Verificar se está tentando alterar o ID
        if (dadosCaso.id !== undefined) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    id: "Campo 'id' não pode ser alterado"
                }
            });
        }

        // Validar status se fornecido
        if (dadosCaso.status && !['aberto', 'solucionado'].includes(dadosCaso.status)) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    status: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'"
                }
            });
        }
        
        // Verificar se agente existe se fornecido
        if (dadosCaso.agente_id) {
            const agente = agentesRepository.findById(dadosCaso.agente_id);
            if (!agente) {
                return res.status(400).json({
                    status: 400,
                    message: "Parâmetros inválidos",
                    errors: {
                        agente_id: "Agente especificado não existe"
                    }
                });
            }
        }
        
        const casoAtualizado = casosRepository.update(id, dadosCaso);
        
        if (!casoAtualizado) {
            return res.status(404).json({ 
                status: 404,
                message: 'Caso não encontrado'
            });
        }
        
        res.status(200).json(casoAtualizado);
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
}

function deleteCaso(req, res) {
    try {
        const { id } = req.params;
        const casoDeletado = casosRepository.deleteById(id);
        
        if (!casoDeletado) {
            return res.status(404).json({ 
                status: 404,
                message: 'Caso não encontrado'
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
    getAllCasos,
    getCasoById,
    getAgenteByCasoId,
    createCaso,
    updateCaso,
    deleteCaso
};
