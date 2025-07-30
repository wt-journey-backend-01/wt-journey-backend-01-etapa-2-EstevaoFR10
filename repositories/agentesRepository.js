const agentes = [
    {
        id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
        nome: "Rommel Carneiro",
        dataDeIncorporacao: "1992-10-04",
        cargo: "delegado"
    },
    {
        id: "b7e2c8d9-1a3f-4e5b-9c7d-2f8e6a4b0c1d",
        nome: "Ana Silva",
        dataDeIncorporacao: "2010-03-15",
        cargo: "inspetor"
    },
    {
        id: "c9f1e7a5-4b2d-3c8e-7f9a-1e5c8b6d4a2f",
        nome: "Carlos Santos",
        dataDeIncorporacao: "2008-07-22",
        cargo: "inspetor"
    }
];

function findAll() {
    return agentes;
}

function findById(id) {
    return agentes.find(agente => agente.id === id);
}

function create(dadosAgente) {
    const novoAgente = {
        id: generateUUID(),
        ...dadosAgente
    };
    agentes.push(novoAgente);
    return novoAgente;
}

function update(id, dadosAgente) {
    const index = agentes.findIndex(agente => agente.id === id);
    if (index !== -1) {
        // Remover o campo 'id' dos dados a serem atualizados para proteger o ID
        const { id: _, ...dadosLimpos } = dadosAgente;
        
        agentes[index] = {
            ...agentes[index],
            ...dadosLimpos
        };
        return agentes[index];
    }
    return null;
}

function deleteById(id) {
    const index = agentes.findIndex(agente => agente.id === id);
    if (index !== -1) {
        const agenteDeletado = agentes[index];
        agentes.splice(index, 1);
        return agenteDeletado;
    }
    return null;
}

function findByCargo(cargo) {
    return agentes.filter(agente => agente.cargo === cargo);
}

function findAllSorted(sortBy) {
    const agentesCopy = [...agentes];
    
    if (sortBy === 'dataDeIncorporacao') {
        return agentesCopy.sort((a, b) => new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao));
    }
    
    if (sortBy === '-dataDeIncorporacao') {
        return agentesCopy.sort((a, b) => new Date(b.dataDeIncorporacao) - new Date(a.dataDeIncorporacao));
    }
    
    return agentesCopy;
}

// Função auxiliar para gerar UUID simples
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteById,
    findByCargo,
    findAllSorted
};
