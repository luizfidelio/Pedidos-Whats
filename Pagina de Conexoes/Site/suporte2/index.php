<?php
$dir = "."; // Diretório atual

// Função para obter o tamanho do arquivo em um formato legível
function human_filesize($bytes, $decimals = 2) {
    $sz = 'BKMGTP';
    $factor = floor((strlen($bytes) - 1) / 3);
    return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . @$sz[$factor];
}

// Função para listar arquivos
function listFiles($dir) {
    $files = array_diff(scandir($dir), array('.', '..', 'index.php')); // Exclui . e .. e o próprio index.php
    $fileList = [];

    foreach ($files as $file) {
        if (is_file($dir . '/' . $file)) {
            $fileList[] = [
                'name' => $file,
                'size' => human_filesize(filesize($dir . '/' . $file)),
                'path' => $dir . '/' . $file
            ];
        }
    }

    return $fileList;
}

$files = listFiles($dir);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Lista de Arquivos</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
    </style>
</head>
<body>
    <h1>Lista de Arquivos para Download</h1>
    <table>
        <thead>
            <tr>
                <th>Nome do Arquivo</th>
                <th>Tamanho</th>
                <th>Download</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($files as $file): ?>
                <tr>
                    <td><?php echo htmlspecialchars($file['name']); ?></td>
                    <td><?php echo $file['size']; ?></td>
                    <td><a href="<?php echo htmlspecialchars($file['path']); ?>" download>Download</a></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>
