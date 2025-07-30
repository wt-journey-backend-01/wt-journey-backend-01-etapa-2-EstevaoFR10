const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API do Departamento de Polícia',
        description: 'Sistema de gerenciamento de agentes e casos policiais',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor de desenvolvimento',
        },
    ],
    paths: {
        '/agentes': {
            get: {
                summary: 'Listar todos os agentes',
                description: 'Retorna uma lista de todos os agentes. Suporta filtros por cargo e ordenação.',
                parameters: [
                    {
                        name: 'cargo',
                        in: 'query',
                        description: 'Filtrar por cargo (inspetor ou delegado)',
                        required: false,
                        schema: {
                            type: 'string',
                            enum: ['inspetor', 'delegado']
                        }
                    },
                    {
                        name: 'sort',
                        in: 'query',
                        description: 'Ordenar por data de incorporação (dataDeIncorporacao ou -dataDeIncorporacao)',
                        required: false,
                        schema: {
                            type: 'string',
                            enum: ['dataDeIncorporacao', '-dataDeIncorporacao']
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Lista de agentes retornada com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Agente'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                summary: 'Criar novo agente',
                description: 'Cadastra um novo agente no sistema',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/NovoAgente'
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Agente criado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Agente'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Dados inválidos',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Erro'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/agentes/{id}': {
            get: {
                summary: 'Obter agente por ID',
                description: 'Retorna um agente específico pelo seu ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID do agente',
                        schema: {
                            type: 'string',
                            format: 'uuid'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Agente encontrado',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Agente'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Agente não encontrado'
                    }
                }
            },
            put: {
                summary: 'Atualizar agente completamente',
                description: 'Atualiza todos os dados de um agente',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID do agente',
                        schema: {
                            type: 'string',
                            format: 'uuid'
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/NovoAgente'
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Agente atualizado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Agente'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Agente não encontrado'
                    }
                }
            },
            patch: {
                summary: 'Atualizar agente parcialmente',
                description: 'Atualiza alguns dados de um agente',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID do agente',
                        schema: {
                            type: 'string',
                            format: 'uuid'
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/AtualizarAgente'
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Agente atualizado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Agente'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Agente não encontrado'
                    }
                }
            },
            delete: {
                summary: 'Deletar agente',
                description: 'Remove um agente do sistema',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID do agente',
                        schema: {
                            type: 'string',
                            format: 'uuid'
                        }
                    }
                ],
                responses: {
                    '204': {
                        description: 'Agente deletado com sucesso'
                    },
                    '404': {
                        description: 'Agente não encontrado'
                    }
                }
            }
        },
        '/casos': {
            get: {
                summary: 'Listar todos os casos',
                description: 'Retorna uma lista de todos os casos. Suporta filtros.',
                parameters: [
                    {
                        name: 'agente_id',
                        in: 'query',
                        description: 'Filtrar por ID do agente responsável',
                        required: false,
                        schema: {
                            type: 'string',
                            format: 'uuid'
                        }
                    },
                    {
                        name: 'status',
                        in: 'query',
                        description: 'Filtrar por status do caso',
                        required: false,
                        schema: {
                            type: 'string',
                            enum: ['aberto', 'solucionado']
                        }
                    },
                    {
                        name: 'q',
                        in: 'query',
                        description: 'Busca full-text no título e descrição',
                        required: false,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Lista de casos retornada com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Caso'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                summary: 'Criar novo caso',
                description: 'Cadastra um novo caso no sistema',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/NovoCaso'
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Caso criado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Caso'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Dados inválidos',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Erro'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/casos/{id}': {
            get: {
                summary: 'Obter caso por ID',
                description: 'Retorna um caso específico pelo seu ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID do caso',
                        schema: {
                            type: 'string',
                            format: 'uuid'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Caso encontrado',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Caso'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Caso não encontrado'
                    }
                }
            },
            put: {
                summary: 'Atualizar caso completamente',
                description: 'Atualiza todos os dados de um caso',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID do caso',
                        schema: {
                            type: 'string',
                            format: 'uuid'
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/NovoCaso'
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Caso atualizado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Caso'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Caso não encontrado'
                    }
                }
            },
            patch: {
                summary: 'Atualizar caso parcialmente',
                description: 'Atualiza alguns dados de um caso',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID do caso',
                        schema: {
                            type: 'string',
                            format: 'uuid'
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/AtualizarCaso'
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Caso atualizado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Caso'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Caso não encontrado'
                    }
                }
            },
            delete: {
                summary: 'Deletar caso',
                description: 'Remove um caso do sistema',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID do caso',
                        schema: {
                            type: 'string',
                            format: 'uuid'
                        }
                    }
                ],
                responses: {
                    '204': {
                        description: 'Caso deletado com sucesso'
                    },
                    '404': {
                        description: 'Caso não encontrado'
                    }
                }
            }
        },
        '/casos/{caso_id}/agente': {
            get: {
                summary: 'Obter agente responsável por um caso',
                description: 'Retorna os dados completos do agente responsável por um caso específico',
                parameters: [
                    {
                        name: 'caso_id',
                        in: 'path',
                        required: true,
                        description: 'ID do caso',
                        schema: {
                            type: 'string',
                            format: 'uuid'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Agente responsável encontrado',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Agente'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Caso ou agente não encontrado'
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            Agente: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        format: 'uuid',
                        description: 'ID único do agente'
                    },
                    nome: {
                        type: 'string',
                        description: 'Nome completo do agente'
                    },
                    dataDeIncorporacao: {
                        type: 'string',
                        format: 'date',
                        description: 'Data de incorporação no formato YYYY-MM-DD'
                    },
                    cargo: {
                        type: 'string',
                        enum: ['inspetor', 'delegado'],
                        description: 'Cargo do agente'
                    }
                },
                example: {
                    id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
                    nome: "Rommel Carneiro",
                    dataDeIncorporacao: "1992-10-04",
                    cargo: "delegado"
                }
            },
            NovoAgente: {
                type: 'object',
                required: ['nome', 'dataDeIncorporacao', 'cargo'],
                properties: {
                    nome: {
                        type: 'string',
                        description: 'Nome completo do agente'
                    },
                    dataDeIncorporacao: {
                        type: 'string',
                        format: 'date',
                        description: 'Data de incorporação no formato YYYY-MM-DD'
                    },
                    cargo: {
                        type: 'string',
                        enum: ['inspetor', 'delegado'],
                        description: 'Cargo do agente'
                    }
                },
                example: {
                    nome: "João Silva",
                    dataDeIncorporacao: "2015-06-20",
                    cargo: "inspetor"
                }
            },
            AtualizarAgente: {
                type: 'object',
                properties: {
                    nome: {
                        type: 'string',
                        description: 'Nome completo do agente'
                    },
                    dataDeIncorporacao: {
                        type: 'string',
                        format: 'date',
                        description: 'Data de incorporação no formato YYYY-MM-DD'
                    },
                    cargo: {
                        type: 'string',
                        enum: ['inspetor', 'delegado'],
                        description: 'Cargo do agente'
                    }
                }
            },
            Caso: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        format: 'uuid',
                        description: 'ID único do caso'
                    },
                    titulo: {
                        type: 'string',
                        description: 'Título do caso'
                    },
                    descricao: {
                        type: 'string',
                        description: 'Descrição detalhada do caso'
                    },
                    status: {
                        type: 'string',
                        enum: ['aberto', 'solucionado'],
                        description: 'Status atual do caso'
                    },
                    agente_id: {
                        type: 'string',
                        format: 'uuid',
                        description: 'ID do agente responsável'
                    }
                },
                example: {
                    id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
                    titulo: "homicidio",
                    descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
                    status: "aberto",
                    agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
                }
            },
            NovoCaso: {
                type: 'object',
                required: ['titulo', 'descricao', 'status', 'agente_id'],
                properties: {
                    titulo: {
                        type: 'string',
                        description: 'Título do caso'
                    },
                    descricao: {
                        type: 'string',
                        description: 'Descrição detalhada do caso'
                    },
                    status: {
                        type: 'string',
                        enum: ['aberto', 'solucionado'],
                        description: 'Status inicial do caso'
                    },
                    agente_id: {
                        type: 'string',
                        format: 'uuid',
                        description: 'ID do agente responsável'
                    }
                },
                example: {
                    titulo: "roubo",
                    descricao: "Assalto a mão armada em estabelecimento comercial.",
                    status: "aberto",
                    agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
                }
            },
            AtualizarCaso: {
                type: 'object',
                properties: {
                    titulo: {
                        type: 'string',
                        description: 'Título do caso'
                    },
                    descricao: {
                        type: 'string',
                        description: 'Descrição detalhada do caso'
                    },
                    status: {
                        type: 'string',
                        enum: ['aberto', 'solucionado'],
                        description: 'Status do caso'
                    },
                    agente_id: {
                        type: 'string',
                        format: 'uuid',
                        description: 'ID do agente responsável'
                    }
                }
            },
            Erro: {
                type: 'object',
                properties: {
                    status: {
                        type: 'integer',
                        description: 'Código de status HTTP'
                    },
                    message: {
                        type: 'string',
                        description: 'Mensagem de erro'
                    },
                    errors: {
                        type: 'object',
                        description: 'Detalhes específicos dos erros'
                    }
                },
                example: {
                    status: 400,
                    message: "Parâmetros inválidos",
                    errors: {
                        status: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'"
                    }
                }
            }
        }
    }
};

module.exports = swaggerDefinition;
