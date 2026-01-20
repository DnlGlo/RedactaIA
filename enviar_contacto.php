<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Recoger los datos del formulario
    $nombre = strip_tags(trim($_POST["nombre"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $asunto = strip_tags(trim($_POST["asunto"]));
    $mensaje = trim($_POST["mensaje"]);

    // 2. Validaciones básicas
    if (empty($nombre) || empty($mensaje) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Redirigir con error si falta algo
        header("Location: contacto.php?status=error&msg=missing_fields");
        exit;
    }

    // 3. Configurar el correo
    // IMPORTANTE: Cambia esto a TU email donde quieres recibir los mensajes
    $destinatario = "hola@redactaia.com";

    $asunto_email = "Nuevo contacto web: $asunto";

    $cuerpo_email = "Has recibido un nuevo mensaje desde el formulario de contacto web.\n\n";
    $cuerpo_email .= "Nombre: $nombre\n";
    $cuerpo_email .= "Email: $email\n";
    $cuerpo_email .= "Asunto: $asunto\n\n";
    $cuerpo_email .= "Mensaje:\n$mensaje\n";

    // Cabeceras para evitar caer en spam
    $headers = "From: $nombre <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // 4. Enviar el correo
    if (mail($destinatario, $asunto_email, $cuerpo_email, $headers)) {
        // Éxito
        header("Location: contacto.php?status=success");
    } else {
        // Fallo en el servidor
        header("Location: contacto.php?status=error&msg=server_error");
    }
} else {
    // Si intentan entrar directo al archivo sin enviar formulario
    header("Location: contacto.php");
    exit;
}
?>