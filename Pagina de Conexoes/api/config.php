<?php
// ──────────────────────────────────────────────────────────────
//  Central de Conexões — Configuração do Banco de Dados
//  Edite este arquivo com as credenciais do seu servidor antes
//  de fazer o upload para produção.
// ──────────────────────────────────────────────────────────────

define('DB_HOST', 'localhost');
define('DB_NAME', 'nete_netecia');
define('DB_USER', 'nete_netecia');
define('DB_PASS', 'St@rgate1');
define('DB_CHARSET', 'utf8mb4');

define('JWT_SECRET', 'N3t3c1@S1t3_C3ntr4l_S3cr3t_K3y_2026!xZ9#qW7&mP2');
define('JWT_EXPIRY', 28800); // 8 horas em segundos

// ── Conexão PDO (singleton) ──────────────────────────────────
function db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    }
    return $pdo;
}

// ── Headers CORS/JSON ────────────────────────────────────────
function send_json($data, int $code = 200): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Authorization, Content-Type');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function send_error(string $msg, int $code = 400): void {
    send_json(['error' => $msg], $code);
}

// ── JWT helpers ──────────────────────────────────────────────
function b64url_encode(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}
function b64url_decode(string $data): string {
    return base64_decode(strtr($data, '-_', '+/'));
}

function jwt_create(array $payload): string {
    $header  = b64url_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload = b64url_encode(json_encode($payload));
    $sig     = b64url_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
    return "$header.$payload.$sig";
}

function jwt_verify(string $token): ?array {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    [$h, $p, $s] = $parts;
    $expected = b64url_encode(hash_hmac('sha256', "$h.$p", JWT_SECRET, true));
    if (!hash_equals($expected, $s)) return null;
    $data = json_decode(b64url_decode($p), true);
    if (!$data || ($data['exp'] ?? 0) < time()) return null;
    return $data;
}

// ── Requer autenticação ──────────────────────────────────────
function require_auth(): array {
    // Tenta pegar o Authorization de múltiplas fontes (compatível com OLS/LiteSpeed/Apache)
    $auth = $_SERVER['HTTP_AUTHORIZATION']
         ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
         ?? (function_exists('apache_request_headers') ? (apache_request_headers()['Authorization'] ?? '') : '')
         ?? '';
    if (!preg_match('/^Bearer\s+(.+)$/i', $auth, $m)) {
        send_error('Token não fornecido', 401);
    }
    $payload = jwt_verify($m[1]);
    if (!$payload) send_error('Token inválido ou expirado', 401);
    return $payload;
}

function require_admin(): array {
    $user = require_auth();
    if (($user['role'] ?? '') !== 'admin') send_error('Acesso restrito a administradores', 403);
    return $user;
}
