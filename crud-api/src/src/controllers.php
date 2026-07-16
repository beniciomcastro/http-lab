<?php

declare(strict_types=1);

require_once __DIR__ . '/services.php';

function jsonInput(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return [];
    }

    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        throw new InvalidArgumentException('JSON inválido.');
    }

    return $decoded;
}

function respond(array $result): never
{
    http_response_code($result['status']);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result['data'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function handleResource(string $method, string $resource, ?int $id): never
{
    $resourceError = validateResource($resource);
    if ($resourceError) {
        respond(['status' => 404, 'data' => ['error' => $resourceError]]);
    }

    try {
        match ($method) {
            'GET' => respond(serviceList($resource)),
            'POST' => respond(serviceCreate($resource, jsonInput())),
            'PUT' => $id ? respond(serviceUpdate($resource, $id, jsonInput(), false)) : respond(['status' => 400, 'data' => ['error' => 'ID obrigatório.']]),
            'PATCH' => $id ? respond(serviceUpdate($resource, $id, jsonInput(), true)) : respond(['status' => 400, 'data' => ['error' => 'ID obrigatório.']]),
            'DELETE' => $id ? respond(serviceDelete($resource, $id)) : respond(['status' => 400, 'data' => ['error' => 'ID obrigatório.']]),
            default => respond(['status' => 405, 'data' => ['error' => 'Método não permitido.']]),
        };
    } catch (InvalidArgumentException $e) {
        respond(['status' => 400, 'data' => ['error' => $e->getMessage()]]);
    } catch (Throwable $e) {
        respond(['status' => 500, 'data' => ['error' => 'Erro interno do servidor.']]);
    }
}
