<?php
// ──────────────────────────────────────────────────────────────
//  api/users.php  — Gestão de Usuários (admin only)
//  GET    → lista usuários
//  POST   → cria usuário
//  PUT    → atualiza usuário
//  DELETE → desativa/remove usuário
// ──────────────────────────────────────────────────────────────
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'OPTIONS') { send_json([], 200); }

$me = require_admin(); // todos os endpoints exigem admin

// ── GET: Lista usuários ───────────────────────────────────────
if ($method === 'GET') {
    $users = db()->query("SELECT id,username,name,role,active,created_at FROM users ORDER BY id")
                 ->fetchAll();
    send_json($users);
}

// ── POST: Criar usuário ───────────────────────────────────────
if ($method === 'POST') {
    $b        = json_decode(file_get_contents('php://input'), true);
    $username = trim($b['username'] ?? '');
    $password = $b['password'] ?? '';
    $name     = trim($b['name']    ?? '');
    $role     = $b['role'] ?? 'editor';

    if (!$username || !$password || !$name) send_error('username, password e name são obrigatórios');
    if (!in_array($role, ['admin','editor','acesso'])) send_error('role deve ser admin, editor ou acesso');
    if (strlen($password) < 6) send_error('Senha deve ter ao menos 6 caracteres');

    // verifica duplicata
    $exists = db()->prepare("SELECT COUNT(*) FROM users WHERE username=?");
    $exists->execute([$username]);
    if ($exists->fetchColumn()) send_error('Username já está em uso', 409);

    $hash = password_hash($password, PASSWORD_DEFAULT);
    db()->prepare("INSERT INTO users (username,password_hash,name,role) VALUES (?,?,?,?)")
        ->execute([$username,$hash,$name,$role]);

    send_json(['ok'=>true,'id'=>db()->lastInsertId()], 201);
}

// ── PUT: Atualizar usuário ────────────────────────────────────
if ($method === 'PUT') {
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) send_error('ID é obrigatório');

    $b = json_decode(file_get_contents('php://input'), true);

    $fields = []; $params = [];

    if (isset($b['name'])) {
        $fields[] = 'name = ?';
        $params[]  = trim($b['name']);
    }
    if (isset($b['role'])) {
        if (!in_array($b['role'], ['admin','editor','acesso'])) send_error('role inválido');
        $fields[] = 'role = ?';
        $params[]  = $b['role'];
    }
    if (isset($b['active'])) {
        $fields[] = 'active = ?';
        $params[]  = (int)(bool)$b['active'];
    }
    if (!empty($b['password'])) {
        if (strlen($b['password']) < 6) send_error('Senha deve ter ao menos 6 caracteres');
        $fields[] = 'password_hash = ?';
        $params[]  = password_hash($b['password'], PASSWORD_DEFAULT);
    }

    if (empty($fields)) send_error('Nenhum campo para atualizar');

    $params[] = $id;
    db()->prepare("UPDATE users SET " . implode(', ', $fields) . " WHERE id=?")->execute($params);
    send_json(['ok' => true]);
}

// ── DELETE: Remover usuário ───────────────────────────────────
if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) send_error('ID é obrigatório');
    if ($id === (int)$me['sub']) send_error('Você não pode excluir seu próprio usuário', 403);

    db()->prepare("DELETE FROM users WHERE id=?")->execute([$id]);
    send_json(['ok' => true]);
}

send_error('Método não suportado', 405);
