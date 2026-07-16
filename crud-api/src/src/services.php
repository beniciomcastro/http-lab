<?php

declare(strict_types=1);

require_once __DIR__ . '/data.php';
require_once __DIR__ . '/validation.php';

function serviceList(string $resource): array
{
    return ['status' => 200, 'data' => ['items' => listRecords(DATA_FILE, $resource)]];
}

function serviceCreate(string $resource, array $payload): array
{
    $validation = validatePayload($resource, $payload);
    if ($validation['errors']) {
        return ['status' => 422, 'data' => ['error' => 'Dados inválidos.', 'fields' => $validation['errors']]];
    }

    return ['status' => 201, 'data' => createRecord(DATA_FILE, $resource, $validation['data'])];
}

function serviceUpdate(string $resource, int $id, array $payload, bool $partial): array
{
    $validation = validatePayload($resource, $payload, $partial);
    if ($validation['errors']) {
        return ['status' => 422, 'data' => ['error' => 'Dados inválidos.', 'fields' => $validation['errors']]];
    }

    $record = updateRecord(DATA_FILE, $resource, $id, $validation['data'], $partial);
    if (!$record) {
        return ['status' => 404, 'data' => ['error' => 'Registro não encontrado.']];
    }

    return ['status' => 200, 'data' => $record];
}

function serviceDelete(string $resource, int $id): array
{
    $record = deleteRecord(DATA_FILE, $resource, $id);
    if (!$record) {
        return ['status' => 404, 'data' => ['error' => 'Registro não encontrado.']];
    }

    return ['status' => 200, 'data' => $record];
}
