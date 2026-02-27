<?php
// ──────────────────────────────────────────────────────────────
//  api/auth.php
//  GET  /api/auth.php          → verifica token, retorna usuário
//  POST /api/auth.php          → login, retorna JWT
// ──────────────────────────────────────────────────────────────
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'OPTIONS') { send_json([], 200); }

// ── GET: Verificar token / me ─────────────────────────────────
if ($method === 'GET') {
    $payload = require_auth();
    $user = db()->prepare("SELECT id,username,name,role,active FROM users WHERE id=?");
    $user->execute([$payload['sub']]);
    $u = $user->fetch();
    if (!$u || !$u['active']) send_error('Usuário inativo ou não encontrado', 401);
    send_json(['ok' => true, 'user' => $u]);
}

// ── POST: Login ───────────────────────────────────────────────
if ($method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);
    $username = trim($body['username'] ?? '');
    $password = $body['password'] ?? '';

    if (!$username || !$password) send_error('Usuário e senha são obrigatórios');

    $stmt = db()->prepare("SELECT * FROM users WHERE username=? AND active=1");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        send_error('Credenciais inválidas', 401);
    }

    $payload = [
        'sub'  => $user['id'],
        'user' => $user['username'],
        'name' => $user['name'],
        'role' => $user['role'],
        'iat'  => time(),
        'exp'  => time() + JWT_EXPIRY,
    ];

    send_json([
        'ok'    => true,
        'token' => jwt_create($payload),
        'user'  => [
            'id'       => $user['id'],
            'username' => $user['username'],
            'name'     => $user['name'],
            'role'     => $user['role'],
        ],
    ]);
}

send_error('Método não suportado', 405);
