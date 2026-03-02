<?php
// ──────────────────────────────────────────────────────────────
//  api/serve.php?id=N
//  Entrega o arquivo de download de forma segura.
//  Os arquivos ficam em /arquivos/ (bloqueado por .htaccess).
//  Nenhuma URL direta aos arquivos é exposta ao usuário.
// ──────────────────────────────────────────────────────────────
require_once __DIR__ . '/config.php';

$id = (int)($_GET['id'] ?? 0);

if (!$id) {
    http_response_code(400);
    exit('Parâmetro inválido.');
}

// Busca o download no banco
$stmt = db()->prepare(
    "SELECT id, title, url, active FROM downloads WHERE id = ? AND active = 1"
);
$stmt->execute([$id]);
$dl = $stmt->fetch();

if (!$dl) {
    http_response_code(404);
    exit('Arquivo não encontrado ou inativo.');
}

$url = trim($dl['url']);

// ── URL externa → redireciona ──────────────────────────────
if (filter_var($url, FILTER_VALIDATE_URL)) {
    header('Location: ' . $url);
    exit;
}

// ── Arquivo local → serve da pasta /arquivos/ ──────────────
// basename() impede path traversal (../../etc/passwd etc.)
$filename = basename($url);

if ($filename === '' || $filename === '.') {
    http_response_code(400);
    exit('Nome de arquivo inválido.');
}

// Pasta protegida: um nível acima de /api/, irmã de /api/
$arquivosDir = realpath(dirname(__DIR__) . '/arquivos');
$filepath    = $arquivosDir . DIRECTORY_SEPARATOR . $filename;

// Garante que o caminho real fica dentro de /arquivos/
if (!$arquivosDir || strpos(realpath($filepath), $arquivosDir) !== 0) {
    http_response_code(403);
    exit('Acesso negado.');
}

if (!file_exists($filepath) || !is_file($filepath)) {
    http_response_code(404);
    exit('Arquivo não encontrado no servidor. Verifique se ele foi enviado para a pasta arquivos/.');
}

// ── Detecta MIME type ──────────────────────────────────────
$ext  = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
$mime = match($ext) {
    'exe'  => 'application/octet-stream',
    'zip'  => 'application/zip',
    'pdf'  => 'application/pdf',
    'msi'  => 'application/x-msdownload',
    'dmg'  => 'application/x-apple-diskimage',
    'pkg'  => 'application/x-newton-compatible-pkg',
    'apk'  => 'application/vnd.android.package-archive',
    default => mime_content_type($filepath) ?: 'application/octet-stream',
};

// ── Envia headers e arquivo ────────────────────────────────
while (ob_get_level()) { ob_end_clean(); }

header('Content-Type: ' . $mime);
header('Content-Disposition: attachment; filename="' . addslashes($filename) . '"');
header('Content-Length: ' . filesize($filepath));
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');
header('X-Content-Type-Options: nosniff');

readfile($filepath);
exit;
