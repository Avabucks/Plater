<?php
  $codiceTemporaneo = $_POST['codiceTemporaneo'];
  $mail = $_POST['mail'];

  $to = $mail;
  $subject = "Verification Code - Plater";
  $txt = "<html>
  <head>
    <style type='text/css' id='styleTheme' class='styleTheme' title='styleTheme'>
      @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');
    </style>
  </head>
  <body style='margin: 0; font-family: Open Sans;'>
  <div style='height: 100%; width: 100%; text-align: center;'>

    <div style='width: 400px; height: auto; padding: 30px; background-color: rgb(50, 50, 50, .1); border-radius: 15px; text-align: left; display: inline-block;'>
      <p style='font-weight: 700; color: rgb(10, 10, 10, .6); font-size: 16px;'>Welocome</p>
      <p style='font-weight: 400; color: rgb(10, 10, 10, .6); font-size: 16px;'>We're excited to have you get started. First, you need to confirm your account. Your code:</p>
      <p style='font-size: 18px; font-weight: 700; letter-spacing: 1px; color: rgb(10, 10, 10, .6); background-color: rgb(10, 10, 10, .2); padding: 6px; border-radius: 10px; font-size: 23px; display: block; width: 100px; text-align: center;'>$codiceTemporaneo</p>
    </div>

  </div>
  </body>
  </html>";

  $recipient = "plater@innoaweb.it";
  $headers  = 'MIME-Version: 1.0' . "\r\n"
  	        .'Content-type: text/html; charset=utf-8' . "\r\n"
            .'From: ' . $recipient . "\r\n";
  mail($to,$subject,$txt,$headers);
?>
