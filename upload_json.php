<?php
header('Content-Type: text/html; charset=utf-8');
$target_dir = "uploads/";
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $file_name = basename($_FILES["json_file"]["name"]);
    $directory_name = $_POST["directory_name"];
    $target_dir = $target_dir . $directory_name . "/";
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }

    $target_file = $target_dir . "page.json";
    $upload_ok = 1;

    if ($upload_ok == 0) {
        echo "Desculpe, seu arquivo não foi enviado.";
    } else {
        if (move_uploaded_file($_FILES["json_file"]["tmp_name"], $target_file)) {
            echo "Reportagem enviada! No Arc, selecione HTML, edite e cole na 1ª linha o que foi copiado para seu clipboard. Pré-visualize o conteúdo clicando no botão.";

        } else {
            echo "Desculpe, ocorreu um erro no envio de sua reportagem. Verifique se está conectado à VPN.";
            echo "Error: " . $_FILES["json_file"]["error"];
        }
    }
}
?>