<?php
$target_dir = "uploads/";
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $file_name = basename($_FILES["json_file"]["name"]);
    $target_file = $target_dir . $file_name;
    $upload_ok = 1;

    if ($upload_ok == 0) {
        echo "Desculpe, seu arquivo não foi enviado.";
    } else {
        if (move_uploaded_file($_FILES["json_file"]["tmp_name"], $target_file)) {
            echo "O arquivo " . htmlspecialchars($file_name) . " foi enviado com sucesso.";
        } else {
            echo "Desculpe, ocorreu um erro ao enviar seu arquivo. ";
            echo "Error: " . $_FILES["json_file"]["error"];
        }
    }
}
?>