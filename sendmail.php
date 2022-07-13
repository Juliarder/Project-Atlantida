<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require 'phpmailer\src\Exception.php';
    require 'phpmailer\src\PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    // От кого письмо
    $mail->setFrom('info@fis.guru', 'Фрилансер по жизни');
    // Кому отправить
    $mail->addAdres('lodkinulian@gmail.com');
    // Тема письма
    $mail->Subject = 'Привет это я'

    // Тело письма
    $body = '<h1>Новый пользователь оставил отзыв!</h1>';
     
    // Прикрепить файл
    if(!empty($_FILES['image']['tmp_name'])) {
        // Путь загрузки файла
        $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
        // Грузим файл
        if (copy($_FILES['image']['tmp_name'], $filePath)){
            $fileAttach = $filePath;
            $body .= '<p><strong>Фото в приложении</strong>';
            $mail ->addAttachment($fileAttach);
        }
    }

    $mail->Body = $body;

    // отправляем
    if(!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены!'
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>