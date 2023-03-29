<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <link href="https://fonts.cdnfonts.com/css/google-sans" rel="stylesheet">
    <title>Enviar arquivos</title>
</head>

<body>
    <style>
    body {
        margin: 0;
    }

    .file-container {
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
        padding: 20px;
    }

    p,
    .file-upload-label,
    table {
        font-family: Google Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
        margin: 0;
        color: #3a3a3a;
        padding: 20px 0;
        line-height: 1.25em;
        letter-spacing: 0.01rem;
        cursor: pointer;
    }

    h1 {
        font-family: Google Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
        font-size: 28px;
        color: #3a3a3a;
        margin: 40px 0;
    }

    .underline {
        text-decoration: underline;
        font-weight: 600;
    }

    button {
        border-radius: 40px;
        box-shadow: none;
        box-sizing: border-box;
        font-family: Google Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 14px;
        height: 36px;
        letter-spacing: .25px;
        line-height: 16px;
        padding: 9px 24px 9px 24px;
        background: #3a3a3a;
        border: none;
        color: white;
        cursor: pointer;
        margin: 12px 8px 0 0;
        box-shadow: 2px 2px 2px hsla(0, 0%, 7%, 0.119);
        float: left;
    }

    button:active {
        box-shadow: none;
        opacity: 0.8;
    }

    table {
        table-layout: auto;
        width: 100%;
    }

    th,
    td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #e8e8e8;
    }

    th {
        font-size: 14px;
    }

    th:nth-child(2),
    td:nth-child(2),
    th:nth-child(3),
    td:nth-child(3) {
        width: 1%;
        white-space: nowrap;
        text-align: right;
    }

    hr {
        border: none;
        border-bottom: 1px solid #e8e8e8;
    }

    .file-upload {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    .file-chosen {
        font-weight: 600;
    }
    </style>



    <div class='file-container'>
        <h1>Enviar arquivos para a reportagem:</h1>
        <form id="upload-form" method="POST"
            action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"] . "?id=" . $_GET['id']); ?>"
            enctype="multipart/form-data">

            <input type="file" id="file-upload" name='file' class="file-upload" onchange="updateFileName()">
            <label for="file-upload" id="file-upload-label" class="file-upload-label">
                <span class='underline'>Escolha o arquivo</span> que deseja enviar, respeitando o limite máximo de
                20MB.</label><br>
            <button type="submit">Enviar</button>
            <p id="file-chosen" class="file-chosen">Nenhum arquivo selecionado</p>
        </form>

        <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $documentId = $_GET['id'];
        $file = $_FILES['file'];
        $targetDir = "uploads/" . $documentId . "/";
        $targetFile = $targetDir . basename($file['name']);

        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        if (move_uploaded_file($file['tmp_name'], $targetFile)) {
            $result = "O arquivo <strong>" . htmlspecialchars($file['name']) . "</strong> foi enviado com sucesso!";
        } else {
            $result = "Ocorreu um erro ao enviar o arquivo <strong>" . htmlspecialchars($file['name']) . "</strong>";
        }
    }
?>

        <p><?php echo $result; ?></p>
        <script>
        function updateFileName() {
            var fileInput = document.getElementById('file-upload');
            var fileChosen = document.getElementById('file-chosen');

            if (fileInput.files.length > 0) {
                fileChosen.textContent = fileInput.files[0].name;
            } else {
                fileChosen.textContent = 'Nenhum arquivo selecionado';
            }
        }
        </script>

        <?php
            $documentId = $_GET['id'];
            $folder = "uploads/" . $documentId . "/";
            if (file_exists($folder)) {
                $files = scandir($folder);
                date_default_timezone_set('America/Sao_Paulo');
                echo '<table>';
                echo '<tr>';
                echo '<th>Nome</th>';
                echo '<th>Data</th>';
                echo '<th>Hora</th>';
                echo '</tr>';
                foreach ($files as $file) {
                    if ($file !== '.' && $file !== '..') {
                        $filePath = $folder . $file;
                        $fileDate = date("d/m/Y", filemtime($filePath));
                        $fileTime = date("H:i:s", filemtime($filePath));
                        echo '<tr>';
                        echo '<td><a href="' . $filePath . '">' . $file . '</a></td>';
                        echo '<td>' . $fileDate . '</td>';
                        echo '<td>' . $fileTime . '</td>';
                        echo '</tr>';
                    }
                }
                echo '</table>';
            } else {
                echo "A pasta $documentId não existe.";
            }
        ?>
    </div>
</body>

</html>