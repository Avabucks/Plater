<?php
  $username = $_POST['username'];
  $mail = $_POST['mail'];
  $password = md5($_POST['password']);

  $id_univoco = md5(round(microtime(true) * 1000) + rand(0, 15000));

  include 'config.php';

  $tabella = 'tbl_accessi';

        // Connessione al db
          $mysqli = new mysqli($host, $username_db, $password_db, $db_name) or die( "Unable to connect");
  $mysqli->select_db($db_name) or die( "Unable to select database");
    mysqli_set_charset($mysqli,"utf8");

    $query="INSERT INTO $tabella (usernameText, mailText, passwordText, univocoText) VALUES ('$username', '$mail', '$password', '$id_univoco') ";

    if (mysqli_query($mysqli, $query)) {

    }
    $mysqli->close();


?>
