<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/controllers.php';

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';
$segments = array_values(array_filter(explode('/', trim($path, '/'))));

if (($segments[0] ?? '') !== 'api') {
    respond(['status' => 404, 'data' => ['error' => 'Rota não encontrada.']]);
}

$resource = $segments[1] ?? '';
$id = isset($segments[2]) && ctype_digit($segments[2]) ? (int)$segments[2] : null;

handleResource($_SERVER['REQUEST_METHOD'], $resource, $id);
