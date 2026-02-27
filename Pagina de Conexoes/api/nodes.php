<?php
// ──────────────────────────────────────────────────────────────
//  api/nodes.php  — Nós da órbita do Hub Central
//  GET    → público, retorna nós ativos
//  POST   → cria nó (requer auth)
//  PUT    → atualiza nó (requer auth)
//  DELETE → remove nó (requer auth)
// ──────────────────────────────────────────────────────────────
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'OPTIONS') { send_json([], 200); }

// ── GET: Lista nós ────────────────────────────────────────────
if ($method === 'GET') {
    $all = isset($_GET['all']); // ?all=1 para ver inativos (requer auth)
    if ($all) require_auth();

    $where = $all ? '' : 'WHERE active = 1';
    $nodes = db()->query("SELECT * FROM hub_nodes $where ORDER BY sort_order, id")
                 ->fetchAll();
    send_json($nodes);
}

// ── POST: Criar nó ────────────────────────────────────────────
if ($method === 'POST') {
    require_auth();
    $b = json_decode(file_get_contents('php://input'), true);

    $title        = trim($b['title']        ?? '');
    $url          = trim($b['url']          ?? '');
    $icon_url     = trim($b['icon_url']     ?? '');
    $fallback_bg  = trim($b['fallback_bg']  ?? '#AC3A40');
    $fallback_txt = trim($b['fallback_text']?? '');
    $target_blank = isset($b['target_blank']) ? (int)(bool)$b['target_blank'] : 1;
    $active       = isset($b['active'])       ? (int)(bool)$b['active']       : 1;
    $sort_order   = (int)($b['sort_order']   ?? 0);

    if (!$title || !$url) send_error('Título e URL são obrigatórios');

    $stmt = db()->prepare("INSERT INTO hub_nodes
        (title,url,icon_url,fallback_bg,fallback_text,target_blank,active,sort_order)
        VALUES (?,?,?,?,?,?,?,?)");
    $stmt->execute([$title,$url,$icon_url,$fallback_bg,$fallback_txt,$target_blank,$active,$sort_order]);

    $id = db()->lastInsertId();
    send_json(['ok'=>true,'id'=>$id], 201);
}

// ── PUT: Atualizar nó ─────────────────────────────────────────
if ($method === 'PUT') {
    require_auth();
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) send_error('ID é obrigatório');

    $b = json_decode(file_get_contents('php://input'), true);

    $fields = [];
    $params = [];
    $map = ['title','url','icon_url','fallback_bg','fallback_text','target_blank','active','sort_order'];
    foreach ($map as $f) {
        if (array_key_exists($f, $b)) {
            $fields[] = "$f = ?";
            $params[]  = in_array($f, ['target_blank','active','sort_order']) ? (int)$b[$f] : trim($b[$f]);
        }
    }
    if (empty($fields)) send_error('Nenhum campo para atualizar');

    $params[] = $id;
    db()->prepare("UPDATE hub_nodes SET " . implode(', ', $fields) . " WHERE id=?")
       ->execute($params);

    send_json(['ok' => true]);
}

// ── DELETE: Remover nó ────────────────────────────────────────
if ($method === 'DELETE') {
    require_auth();
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) send_error('ID é obrigatório');

    db()->prepare("DELETE FROM hub_nodes WHERE id=?")->execute([$id]);
    send_json(['ok' => true]);
}

send_error('Método não suportado', 405);
