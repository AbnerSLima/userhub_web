<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 3600");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'conexao.php';

$data = json_decode(file_get_contents("php://input"), true);
var_dump($data);


$login = $data['login'] ?? null;
$senha = $data['senha'] ?? null;

if ($login && $senha) {
    try {
        $stmt = $conn->prepare("SELECT * FROM users WHERE login = :login");
        $stmt->bindParam(':login', $login, PDO::PARAM_STR);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($senha, $user['senha'])) {
            echo json_encode([
                "success" => true,
                "user_id" => $user['user_id'],
                "nome" => $user['nome']
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["error" => "Usuário ou senha inválidos"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erro no servidor. Tente novamente mais tarde."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Campos login e senha são obrigatórios"]);
}
?>
