<?php
// ──────────────────────────────────────────────────────────────
//  api/downloads.php
//  GET    /api/downloads.php          → lista downloads ativos (público)
//  GET    /api/downloads.php?all=1    → lista todos (requer auth)
//  GET    /api/downloads.php?hub=1    → apenas show_in_hub=1 (público)
//  POST   /api/downloads.php          → cria download (requer auth)
//  PUT    /api/downloads.php?id=N     → atualiza (requer auth)
//  DELETE /api/downloads.php?id=N     → exclui (requer auth)
// ──────────────────────────────────────────────────────────────
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'OPTIONS') { send_json([], 200); }

// ── GET — público ─────────────────────────────────────────────
if ($method === 'GET') {
    $all = isset($_GET['all']) && $_GET['all'] === '1';
    $hub = isset($_GET['hub']) && $_GET['hub'] === '1';

    if ($all) {
        require_auth();
        $stmt = db()->query("SELECT * FROM downloads ORDER BY sort_order ASC, id ASC");
    } elseif ($hub) {
        $stmt = db()->query("SELECT id, title, description, url, category, sort_order, show_in_hub FROM downloads WHERE active=1 AND show_in_hub=1 ORDER BY sort_order ASC, id ASC");
    } else {
        $stmt = db()->query("SELECT id, title, description, url, category, sort_order, show_in_hub FROM downloads WHERE active=1 ORDER BY sort_order ASC, id ASC");
    }

    send_json(['ok' => true, 'data' => $stmt->fetchAll()]);
}

// ── Escrita — requer auth ─────────────────────────────────────
require_auth();

if ($method === 'POST') {
    $b = json_decode(file_get_contents('php://input'), true);
    $title = trim($b['title'] ?? '');
    $url   = trim($b['url']   ?? '');
    if (!$title || !$url) send_error('Título e URL são obrigatórios', 400);

    $stmt = db()->prepare(
        "INSERT INTO downloads (title, description, url, category, sort_order, show_in_hub, active)
         VALUES (?,?,?,?,?,?,?)"
    );
    $stmt->execute([
        $title,
        trim($b['description'] ?? ''),
        $url,
        trim($b['category'] ?? 'Suporte'),
        (int)($b['sort_order'] ?? 0),
        (int)($b['show_in_hub'] ?? 0),
        (int)($b['active'] ?? 1),
    ]);
    send_json(['ok' => true, 'id' => (int) db()->lastInsertId()], 201);
}

if ($method === 'PUT') {
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) send_error('ID obrigatório', 400);
    $b = json_decode(file_get_contents('php://input'), true);
    $title = trim($b['title'] ?? '');
    $url   = trim($b['url']   ?? '');
    if (!$title || !$url) send_error('Título e URL são obrigatórios', 400);

    $stmt = db()->prepare(
        "UPDATE downloads SET title=?, description=?, url=?, category=?, sort_order=?, show_in_hub=?, active=? WHERE id=?"
    );
    $stmt->execute([
        $title,
        trim($b['description'] ?? ''),
        $url,
        trim($b['category'] ?? 'Suporte'),
        (int)($b['sort_order'] ?? 0),
        (int)($b['show_in_hub'] ?? 0),
        (int)($b['active'] ?? 1),
        $id,
    ]);
    send_json(['ok' => true]);
}

if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) send_error('ID obrigatório', 400);
    db()->prepare("DELETE FROM downloads WHERE id=?")->execute([$id]);
    send_json(['ok' => true]);
}

send_error('Método não suportado', 405);
