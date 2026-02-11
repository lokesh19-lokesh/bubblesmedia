<?php
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$date = $_POST['date'];

$to = "your@email.com";
$subject = "New Booking Request";
$message = "Name: $name\nEmail: $email\nPhone: $phone\nDate: $date";
$headers = "From: $email";

mail($to, $subject, $message, $headers);

echo "Success";
?>
