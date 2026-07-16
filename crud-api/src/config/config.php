<?php

declare(strict_types=1);

const DATA_FILE = __DIR__ . '/../../data/data.json';

const ALLOWED_ORIGINS = [
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    'http://0.0.0.0:8080',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

const RESOURCE_SCHEMAS = [
    'products' => [
        'label' => 'Produtos',
        'fields' => [
            'name' => ['label' => 'Nome', 'type' => 'string', 'required' => true],
            'price' => ['label' => 'Preço', 'type' => 'number', 'required' => true],
            'stock' => ['label' => 'Estoque', 'type' => 'integer', 'required' => true],
        ],
    ],
    'users' => [
        'label' => 'Usuários',
        'fields' => [
            'name' => ['label' => 'Nome', 'type' => 'string', 'required' => true],
            'email' => ['label' => 'E-mail', 'type' => 'email', 'required' => true],
            'role' => ['label' => 'Função', 'type' => 'string', 'required' => true],
        ],
    ],
    'tasks' => [
        'label' => 'Tarefas',
        'fields' => [
            'title' => ['label' => 'Título', 'type' => 'string', 'required' => true],
            'status' => ['label' => 'Status', 'type' => 'string', 'required' => true],
            'priority' => ['label' => 'Prioridade', 'type' => 'string', 'required' => true],
        ],
    ],
    'tickets' => [
        'label' => 'Chamados',
        'fields' => [
            'subject' => ['label' => 'Assunto', 'type' => 'string', 'required' => true],
            'category' => ['label' => 'Categoria', 'type' => 'string', 'required' => true],
            'status' => ['label' => 'Status', 'type' => 'string', 'required' => true],
        ],
    ],
    'clients' => [
        'label' => 'Clientes',
        'fields' => [
            'name' => ['label' => 'Nome', 'type' => 'string', 'required' => true],
            'company' => ['label' => 'Empresa', 'type' => 'string', 'required' => true],
            'email' => ['label' => 'E-mail', 'type' => 'email', 'required' => true],
        ],
    ],
];
