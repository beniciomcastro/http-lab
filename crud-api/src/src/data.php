<?php

declare(strict_types=1);

function loadData(string $file): array
{
    if (!is_file($file)) {
        throw new RuntimeException('Data file not found.');
    }

    $content = file_get_contents($file);
    $data = json_decode($content ?: '', true);

    if (!is_array($data)) {
        throw new RuntimeException('Invalid data file.');
    }

    return $data;
}

function saveData(string $file, array $data): void
{
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    if ($json === false || file_put_contents($file, $json, LOCK_EX) === false) {
        throw new RuntimeException('Unable to save data.');
    }
}

function listRecords(string $file, string $resource): array
{
    $data = loadData($file);
    return $data[$resource] ?? [];
}

function createRecord(string $file, string $resource, array $payload): array
{
    $data = loadData($file);
    $id = (int)($data['nextIds'][$resource] ?? 1);
    $record = ['id' => $id, ...$payload];

    $data[$resource][] = $record;
    $data['nextIds'][$resource] = $id + 1;
    saveData($file, $data);

    return $record;
}

function updateRecord(string $file, string $resource, int $id, array $payload, bool $partial): ?array
{
    $data = loadData($file);

    foreach ($data[$resource] as $index => $record) {
        if ((int)$record['id'] !== $id) {
            continue;
        }

        $updated = $partial ? array_merge($record, $payload) : ['id' => $id, ...$payload];
        $updated['id'] = $id;
        $data[$resource][$index] = $updated;
        saveData($file, $data);
        return $updated;
    }

    return null;
}

function deleteRecord(string $file, string $resource, int $id): ?array
{
    $data = loadData($file);

    foreach ($data[$resource] as $index => $record) {
        if ((int)$record['id'] !== $id) {
            continue;
        }

        array_splice($data[$resource], $index, 1);
        saveData($file, $data);
        return $record;
    }

    return null;
}
