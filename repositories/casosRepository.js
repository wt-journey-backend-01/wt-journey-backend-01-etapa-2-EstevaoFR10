const casos = [
    {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
    },
    {
        id: "a8c3d5e7-9b1f-2e4a-6c8d-5f7e9a1b3c4d",
        titulo: "roubo",
        descricao: "Assalto a mão armada em estabelecimento comercial na Rua das Flores, 123. Suspeito fugiu com dinheiro do caixa.",
        status: "solucionado",
        agente_id: "b7e2c8d9-1a3f-4e5b-9c7d-2f8e6a4b0c1d"
    },
    {
        id: "d2f6a8b4-3c7e-1f5d-8a9c-4e6b2d8f7a3c",
        titulo: "furto",
        descricao: "Furto de veículo registrado no estacionamento do shopping center. Proprietário relatou desaparecimento do carro.",
        status: "aberto",
        agente_id: "c9f1e7a5-4b2d-3c8e-7f9a-1e5c8b6d4a2f"
    }
];

function findAll() {
    return casos;
}

function findById(id) {
    return casos.find(caso => caso.id === id);
}

function create(dadosCaso) {
    const novoCaso = {
        id: generateUUID(),
        ...dadosCaso
    };
    casos.push(novoCaso);
    return novoCaso;
}

function update(id, dadosCaso) {
    const index = casos.findIndex(caso => caso.id === id);
    if (index !== -1) {
        casos[index] = {
            ...casos[index],
            ...dadosCaso
        };
        return casos[index];
    }
    return null;
}

function deleteById(id) {
    const index = casos.findIndex(caso => caso.id === id);
    if (index !== -1) {
        const casoDeletado = casos[index];
        casos.splice(index, 1);
        return casoDeletado;
    }
    return null;
}

function findByAgenteId(agente_id) {
    return casos.filter(caso => caso.agente_id === agente_id);
}

function findByStatus(status) {
    return casos.filter(caso => caso.status === status);
}

function search(query) {
    const searchTerm = query.toLowerCase();
    return casos.filter(caso => 
        caso.titulo.toLowerCase().includes(searchTerm) || 
        caso.descricao.toLowerCase().includes(searchTerm)
    );
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
    findByAgenteId,
    findByStatus,
    search
};
