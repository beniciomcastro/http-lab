<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/config.php';

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ALLOWED_ORIGINS, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';

if (str_starts_with($path, '/api/')) {
    require __DIR__ . '/../src/api.php';
}

if ($path === '/openapi.json') {
    header('Content-Type: application/json; charset=utf-8');
    readfile(__DIR__ . '/openapi.json');
    exit;
}

if ($path === '/docs' || $path === '/docs.html') {
    header('Content-Type: text/html; charset=utf-8');
    readfile(__DIR__ . '/docs.html');
    exit;
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode([
    'name' => 'HTTP Lab API',
    'status' => 'online',
    'docs' => '/docs.html',
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
