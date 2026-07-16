<?php

declare(strict_types=1);

function validateResource(string $resource): ?string
{
    return isset(RESOURCE_SCHEMAS[$resource]) ? null : 'Recurso inválido.';
}

function validatePayload(string $resource, array $payload, bool $partial = false): array
{
    $schema = RESOURCE_SCHEMAS[$resource]['fields'];
    $errors = [];
    $clean = [];

    foreach ($schema as $field => $rules) {
        $exists = array_key_exists($field, $payload);

        if (!$partial && ($rules['required'] ?? false) && !$exists) {
            $errors[$field] = 'Campo obrigatório.';
            continue;
        }

        if (!$exists) {
            continue;
        }

        $value = $payload[$field];
        $type = $rules['type'];

        if ($type === 'string') {
            if (!is_string($value) || trim($value) === '') {
                $errors[$field] = 'Informe um texto válido.';
            } else {
                $clean[$field] = trim($value);
            }
        } elseif ($type === 'email') {
            if (!is_string($value) || filter_var($value, FILTER_VALIDATE_EMAIL) === false) {
                $errors[$field] = 'Informe um e-mail válido.';
            } else {
                $clean[$field] = trim($value);
            }
        } elseif ($type === 'number') {
            if (!is_numeric($value) || (float)$value < 0) {
                $errors[$field] = 'Informe um número válido.';
            } else {
                $clean[$field] = (float)$value;
            }
        } elseif ($type === 'integer') {
            if (filter_var($value, FILTER_VALIDATE_INT) === false || (int)$value < 0) {
                $errors[$field] = 'Informe um número inteiro válido.';
            } else {
                $clean[$field] = (int)$value;
            }
        }
    }

    if ($partial && $clean === [] && $errors === []) {
        $errors['_payload'] = 'Envie pelo menos um campo válido.';
    }

    return ['errors' => $errors, 'data' => $clean];
}
