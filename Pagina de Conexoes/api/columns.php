<?php
// ──────────────────────────────────────────────────────────────
//  api/columns.php  — Colunas, Cards e Links do CentralAdm
//
//  GET  /api/columns.php              → todas as colunas + cards + links
//  POST /api/columns.php              → criar coluna/card/link (auth)
//  PUT  /api/columns.php?id=N         → atualizar coluna/card/link (auth)
//  DELETE /api/columns.php?id=N       → deletar coluna/card/link (auth)
//
//  Parâmetro ?type=column|card|link define o recurso (default=column)
// ──────────────────────────────────────────────────────────────
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$type   = $_GET['type'] ?? 'column';
if ($method === 'OPTIONS') { send_json([], 200); }

// ── GET: Retorna colunas com cards e links aninhados ──────────
if ($method === 'GET') {
    $all = isset($_GET['all']);

    if ($type === 'cards' && isset($_GET['column_id'])) {
        $colId = (int)$_GET['column_id'];
        $cards = db()->prepare("SELECT * FROM adm_cards WHERE column_id=? ORDER BY sort_order,id");
        $cards->execute([$colId]);
        $result = $cards->fetchAll();
        foreach ($result as &$card) {
            $links = db()->prepare("SELECT * FROM adm_links WHERE card_id=? ORDER BY sort_order,id");
            $links->execute([$card['id']]);
            $card['links'] = $links->fetchAll();
        }
        send_json($result);
    }

    $whereCol = $all ? '' : 'WHERE c.active = 1';
    $cols = db()->query("SELECT * FROM adm_columns c $whereCol ORDER BY c.sort_order, c.id")->fetchAll();

    foreach ($cols as &$col) {
        $whereCard = $all ? '' : 'AND ca.active = 1';
        $cards = db()->prepare("SELECT * FROM adm_cards ca WHERE ca.column_id=? $whereCard ORDER BY ca.sort_order, ca.id");
        $cards->execute([$col['id']]);
        $col['cards'] = $cards->fetchAll();

        foreach ($col['cards'] as &$card) {
            $links = db()->prepare("SELECT * FROM adm_links WHERE card_id=? ORDER BY sort_order, id");
            $links->execute([$card['id']]);
            $card['links'] = $links->fetchAll();
        }
    }
    send_json($cols);
}

// ── POST: Criar ───────────────────────────────────────────────
if ($method === 'POST') {
    require_auth();
    $b = json_decode(file_get_contents('php://input'), true);

    if ($type === 'column') {
        $title    = trim($b['title']    ?? '');
        $subtitle = trim($b['subtitle'] ?? '');
        $sort     = (int)($b['sort_order'] ?? 0);
        if (!$title) send_error('Título é obrigatório');

        db()->prepare("INSERT INTO adm_columns (title,subtitle,sort_order) VALUES (?,?,?)")
            ->execute([$title,$subtitle,$sort]);
        send_json(['ok'=>true,'id'=>db()->lastInsertId()], 201);
    }

    if ($type === 'card') {
        $colId    = (int)($b['column_id']         ?? 0);
        $name     = trim($b['name']               ?? '');
        $tag      = trim($b['tag']                ?? '');
        $domain   = trim($b['favicon_domain']     ?? '');
        $initials = trim($b['fallback_initials']  ?? '');
        $sort     = (int)($b['sort_order']        ?? 0);
        if (!$colId || !$name) send_error('column_id e name são obrigatórios');

        db()->prepare("INSERT INTO adm_cards (column_id,name,tag,favicon_domain,fallback_initials,sort_order) VALUES (?,?,?,?,?,?)")
            ->execute([$colId,$name,$tag,$domain,$initials,$sort]);
        send_json(['ok'=>true,'id'=>db()->lastInsertId()], 201);
    }

    if ($type === 'link') {
        $cardId = (int)($b['card_id']    ?? 0);
        $label  = trim($b['label']       ?? '');
        $url    = trim($b['url']         ?? '');
        $sort   = (int)($b['sort_order'] ?? 0);
        if (!$cardId || !$label || !$url) send_error('card_id, label e url são obrigatórios');

        db()->prepare("INSERT INTO adm_links (card_id,label,url,sort_order) VALUES (?,?,?,?)")
            ->execute([$cardId,$label,$url,$sort]);
        send_json(['ok'=>true,'id'=>db()->lastInsertId()], 201);
    }

    send_error('type inválido (column|card|link)');
}

// ── PUT: Atualizar ────────────────────────────────────────────
if ($method === 'PUT') {
    require_auth();
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) send_error('ID é obrigatório');
    $b = json_decode(file_get_contents('php://input'), true);

    $tableMap = [
        'column' => ['adm_columns', ['title','subtitle','active','sort_order']],
        'card'   => ['adm_cards',   ['column_id','name','tag','favicon_domain','fallback_initials','active','sort_order']],
        'link'   => ['adm_links',   ['card_id','label','url','sort_order']],
    ];

    if (!isset($tableMap[$type])) send_error('type inválido');
    [$table, $allowed] = $tableMap[$type];

    $fields = []; $params = [];
    foreach ($allowed as $f) {
        if (array_key_exists($f, $b)) {
            $fields[] = "$f = ?";
            $params[]  = in_array($f, ['active','sort_order','column_id','card_id']) ? (int)$b[$f] : trim($b[$f]);
        }
    }
    if (empty($fields)) send_error('Nenhum campo para atualizar');
    $params[] = $id;
    db()->prepare("UPDATE $table SET " . implode(', ', $fields) . " WHERE id=?")->execute($params);
    send_json(['ok' => true]);
}

// ── DELETE: Remover ───────────────────────────────────────────
if ($method === 'DELETE') {
    require_auth();
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) send_error('ID é obrigatório');

    $tableMap = ['column'=>'adm_columns','card'=>'adm_cards','link'=>'adm_links'];
    if (!isset($tableMap[$type])) send_error('type inválido');

    db()->prepare("DELETE FROM {$tableMap[$type]} WHERE id=?")->execute([$id]);
    send_json(['ok' => true]);
}

send_error('Método não suportado', 405);
