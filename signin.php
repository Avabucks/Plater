<html>
<head>

  <title>Sign Up - Plater</title>

    <Meta charset="utf-8">

    <link rel="shortcut icon" href="favicon.png">
    <meta name="application-name" content="Plater">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script src="./js/jquery.min.js"></script>

    <script src="js/aes.js"></script>
    <script src="js/script.js"></script>
    <script src="js/scriptPlater.js"></script>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="animations.css">
    <link rel="stylesheet" href="templateStyle.css">
    <link rel="stylesheet" href="styleElements.css">
    <script src="js/FileSaver.js"></script>
    <script src="js/TreeView.js"></script>
    <script src="js/UIScript.js"></script>

    <!-- mdl -->
    <link rel="stylesheet" href="./mdl/material.css">
    <script src="./mdl/material.js"></script>

    <style>
    @font-face {
      font-family: 'Material Icons';
      font-style: normal;
      font-weight: 400;
      src: url(font/MaterialIcons-Regular.ttf) format('truetype');
    }

    </style>

</head>
<body class='fade-in' translate="no" onresize="mobileNotSupp();" onload='document.title = "Sign Up - Plater"; mobileNotSupp();'>

  <script>
    if (localStorage.getItem("login_user")){
      location.href = 'dashboard.php';
    }
  </script>

  <div id='loader' style='position: fixed; top: 0; left: 0; width: 100%; transform: scaleX(0); transform-origin: 0; height: 5px; background-color: var(--secondary_opacity); transition: 1.2s;'></div>


  <header id='header' style='position: fixed; top:0; left:0; width: 100%; transition: 0.3s; z-index: 2; user-select: none;'>
    <p id='titolo' onclick='location.reload();' style='font-weight: 600; color: var(--white); font-size: 20px; letter-spacing: 0.3px; margin-left: 40px; display: inline-block; vertical-align: middle; cursor: pointer;'>Plater<span style='font-size: 30px; color: var(--secondary);'>.</span></p>

    <!-- menu principale -->
    <ul id='menuPc' style='font-size: 15;'>

    </ul>
    <!-- - -->

  </header>

  <div id='mobileNotSupp' style='display: none; position: fixed; top: 0; left: 0; z-index: 10000; width: 100%; height: 100%; background-color: var(--primary);'>
    <div style='position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;'>
      <div style='font-size: 160px; color: var(--secondary_opacity); font-family: Material Icons; user-select: none; margin-bottom: 20px;'>
        browser_not_supported
      </div>
      <div style='width: 100%; text-align: center; font-size: 17px; color: var(--secondary_opacity); user-select: none;'>
        <b>Mobile is not supported!</b><br>
        Open this page on a desktop device
      </div>
    </div>
  </div>


  <div style='height: 100%; display: flex; align-items: center; justify-content: center;'>
    <div id='signInCont' style='width: 30%; height: auto; padding: 30px; background-color: rgb(50, 50, 50, .1); border-radius: 15px;'>
      <p id='signInText' style='font-size: 18px; font-weight: 700; color: rgb(255, 255, 255, .4);'>Sign Up</p>

      <div id='userNameRegisterText' style='width: calc(100% - 12px); height: 40px; margin-top: 30px; margin-bottom: 20px; background-color: rgb(255, 255, 255, .1); padding: 6px; border-radius: 4px; display: block;'>
        <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; margin-top: -5px;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input style='font-size: 14px; padding-left: 5px; letter-spacing: .5px;' class="mdl-textfield__input" type="text" value='' placeholder="Username">
          <label class="mdl-textfield__label" for="sample3">Username</label>
        </div>
      </div>

      <div id='emailRegisterText' style='width: calc(100% - 12px); height: 40px; margin-top: 30px; margin-bottom: 20px; background-color: rgb(255, 255, 255, .1); padding: 6px; border-radius: 4px; display: block;'>
        <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; margin-top: -5px;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input style='font-size: 14px; padding-left: 5px; letter-spacing: .5px;' class="mdl-textfield__input" type="text" value='' placeholder="Email">
          <label class="mdl-textfield__label" for="sample3">Email</label>
        </div>
      </div>

      <div id='passwordRegisterText' style='width: calc(100% - 12px); height: 40px; margin-top: 30px; margin-bottom: 20px; background-color: rgb(255, 255, 255, .1); padding: 6px; border-radius: 4px; display: block;'>
        <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; margin-top: -5px;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input style='font-size: 14px; padding-left: 5px; letter-spacing: .5px;' class="mdl-textfield__input" type="password" value='' placeholder="Password">
          <label class="mdl-textfield__label" for="sample3">Password</label>
        </div>
      </div>

      <div id='repeatPasswordRegisterText' style='width: calc(100% - 12px); height: 40px; margin-top: 30px; margin-bottom: 20px; background-color: rgb(255, 255, 255, .1); padding: 6px; border-radius: 4px; display: block;'>
        <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; margin-top: -5px;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input style='font-size: 14px; padding-left: 5px; letter-spacing: .5px;' class="mdl-textfield__input" type="password" value='' placeholder="Repeat Password">
          <label class="mdl-textfield__label" for="sample3">Repeat Password</label>
        </div>
      </div>

      <input id='robot' style='display: none;'>

      <div id='verificationCodeRegisterText' style='width: calc(100% - 12px); height: 40px; margin-top: 30px; margin-bottom: 20px; background-color: rgb(255, 255, 255, .1); padding: 6px; border-radius: 4px; display: none;'>
        <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; margin-top: -5px;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input style='font-size: 14px; padding-left: 5px; letter-spacing: .5px;' class="mdl-textfield__input" type="password" value='' placeholder="Code">
          <label class="mdl-textfield__label" for="sample3">Verification Code</label>
        </div>
      </div>

      <div style='width: 100%; text-align: center; margin: 0px 0 5px 0;'>
        <p class="button" onclick="registerAccount();" style='color: rgb(255, 255, 255, .6); padding: 12px; width: 30%; background-color: rgb(100, 100, 100, .1);'>
          <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
            person_add
          </span>
          <span style='font-size: 14px;'>Sign Up</span>
        </p>
      </div>
    </div>
  </div>

</body>
</html>
