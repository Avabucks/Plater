<html>
<head>

  <title>Dashboard - Plater</title>

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
<body class='fade-in' translate="no" onresize="mobileNotSupp();" onload='document.title = "Dashboard - Plater"; mobileNotSupp(); openTableProject(); document.getElementById("usernameSpan").children[0].innerHTML += localStorage.getItem("username"); document.getElementById("usernameWelcome").children[0].innerHTML = localStorage.getItem("username");'>
  <header id='header' style='position: fixed; top:0; left:0; width: 100%; transition: 0.3s; z-index: 2; background: var(--primary); user-select: none;'>
    <p id='titolo' onclick='location.reload();' style='font-weight: 600; color: var(--white); font-size: 20px; letter-spacing: 0.3px; margin-left: 40px; margin-top: 10px; display: inline-block; vertical-align: middle; cursor: pointer;'>Plater<span style='font-size: 30px; color: var(--secondary);'>.</span></p>

    <!-- menu principale -->
    <ul id='menuPc' style='font-size: 15;'>

      <li><a onclick='openHomeCont("templateCont");' class='menuLi buttonMaterial' style='margin-right: 20px;'><span style='font-size: 16px; color: var(--secondary_opacity); font-family: Material Icons; padding-right: 12; position: relative; top: 3px; font-weight: 400;'>explore</span>Explore</a></li>
      <li><a onclick='openHomeCont("keybindingCont");' class='menuLi buttonMaterial' style='margin-right: 20px;'><span style='font-size: 16px; color: var(--secondary_opacity); font-family: Material Icons; padding-right: 12; position: relative; top: 3px; font-weight: 400;'>keyboard</span>Keybinding</a></li>
      <li><label for='openLocalProject'><a class='menuLi buttonMaterial' style='margin-right: 20px;'><span style='font-size: 16px; color: var(--secondary_opacity); font-family: Material Icons; padding-right: 12; position: relative; top: 3px;'>folder_open</span>Open</a></label></li>
      <li><a onclick='newProject();' class='menuLi buttonMaterial' style=''><span style='font-size: 16px; color: var(--secondary_opacity); font-family: Material Icons; padding-right: 12; position: relative; top: 3px;'>add</span>New Project</a></li>

      <li id='usernameSpan'><a id="demo-menu-lower-right" onclick='setMenu("User");' class='menuLi buttonMaterial' style='margin-left: 30px; border: 1px solid rgb(250, 250, 250, .3); transition: .3s;'><span style='font-size: 16px; font-family: Material Icons; padding-right: 12; position: relative; top: 3px;'>account_circle</span></a></li>

      <input type="file" id="openLocalProject" onchange="openLocalProject(event, this);" accept=".plt" hidden/>

    </ul>
    <!-- - -->

    <div id='sottoMenuUser' style='position: absolute;'>
      <ul style='background-color: #fff;' class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="demo-menu-lower-right">
        <!-- <li id='exportMenuBut' onclick='exportProject();' style='width: 100%;' class="mdl-menu__item mdl-menu__item--full-bleed-divider"><span style='font-size: 16px; color: var(--primary); font-family: Material Icons; padding-right: 12px; font-weight: 600;'>system_update_alt</span><span style='position: relative; top: -3px;'>Export</span></li> -->
        <li id='logoutMenuBut' onclick='logoutAccount();' style='width: 100%;' class="mdl-menu__item"><span style='font-size: 16px; color: var(--primary); font-family: Material Icons; padding-right: 12px; font-weight: 600;'>logout</span><span style='position: relative; top: -3px;'>Log Out</span></li>
      </ul>
    </div>

  </header>

  <div id='bgDuringSplash' style='position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: var(--primary); z-index: 100;'></div>

  <?php
    include 'splashScreen.php';
  ?>

  <div id='mobileNotSupp' style='display: none; position: fixed; top: 0; left: 0; z-index: 10000; width: 100%; height: 100%; background-color: var(--primary);'>
    <div style='position: absolute; top: 50%; left: 50%; width: 90%; transform: translate(-50%, -50%); text-align: center;'>
      <div style='font-size: 160px; color: var(--secondary_opacity); font-family: Material Icons; user-select: none; margin-bottom: 20px;'>
        browser_not_supported
      </div>
      <div style='width: 100%; text-align: center; font-size: 17px; color: var(--secondary_opacity); user-select: none;'>
        <b>Mobile is not supported!</b><br>
        Open this page on a desktop device
      </div>
    </div>
  </div>

  <div id="drop_zone" ondrop="dropHandler(event);" ondragover="dragOverHandler(event);" ondragleave="dragLeaveHandler(event);">
    <div id='drop_zone_inner' style='position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: none; width: 200px; height: 450px; pointer-events: none;'>
      <div style='position: absolute; top: 40%; left: 50%; transform: translate(-50%, -40%); font-family: Material Icons; font-size: 100px; color: #112440;'>system_update_alt</div>
      <div style='position: absolute; top: 60%; left: 50%; transform: translate(-50%, -60%); font-size: 17px; color: #112440; width: 100%; text-align: center;'>Drag and drop it here</div>
    </div>
  </div>

  <div id='sfondo' style='position: fixed; width: 100%; height: calc(100% - 65px); background-color: rgb(8, 16, 26, 0); border-top-left-radius: 50px; border-top-right-radius: 50px; z-index: -1;'>
  </div>

  <div id='homeCont' style='width: 100%; height: calc(100% - 65px); margin-top: 65px; overflow: auto;'>

    <!-- <div style='width: 100%; text-align: center; margin: 20px 0 25px;'><p style='color: rgb(200, 200, 200, .7); font-size: 22px; letter-spacing: .2px; font-weight: 300;'><span id='usernameWelcome'><b></b></span>, welcome in Plater</p></div> -->

    <div style='width: calc(84% - 40px); margin: 20px 8% 40px 8%; padding: 20px 20px 10px; background-color: rgb(100, 100, 100, .1); border-radius: 9px;'>

      <div style='margin-left: 10px; margin-top: -15px; margin-bottom: 0px; font-size: 17px; font-weight: 700; color: rgb(225, 225, 225, .9); letter-spacing: .3px;'>
        <p>New Project</p>
      </div>

        <div style='display: flex; overflow: auto;'>

          <div onclick='newProject();' class='templateSelect' style='display: flex; flex: 0 0 190px; flex-wrap:wrap;'>
            <div class='imagePreview' style='height: 130px; width: 192px; background-color: rgb(255, 255, 255, .8); border-radius: 8px; display: flex; justify-content: center; align-items: center;'>
              <div style='font-size: 40px; color: rgb(0, 0, 0, .7); font-family: Material Icons;'>
                <p>add</p>
              </div>
            </div>
            <div style='width: 100%; text-align: left;'>
              <p style='color: rgb(255, 255, 255, .7); font-size: 13px; margin: 10px 3px 5px;'><b>Empty Project</b></p>
            </div>
          </div>

          <div style='height: 170px; margin: 0 0 0 18px; border-radius: 900px; background-color: rgb(255, 255, 255, .3); border-radius: 8px; display: flex; flex: 0 0 1px;'></div>

          <!-- <div class='templateSelect' style='display: flex; flex: 0 0 190px; margin-left: 18px; flex-wrap:wrap;'>
            <div style='height: 120px; width: 190px; background-color: rgb(255, 255, 255, .8); border-radius: 8px;'></div>
            <div style='width: 100%; text-align: center;'>
              <p style='color: rgb(255, 255, 255, .6); font-size: 13px; margin: 2px 0 2px;'>Empty Project</p>
            </div>
          </div> -->

        </div>


    </div>

    <div style='display: inline-block; vertical-align: middle; width: 40%; margin-left: 10%; margin-top: -10px; margin-bottom: -30px; font-size: 17px; font-weight: 700; color: rgb(225, 225, 225, .9); letter-spacing: .3px;'>
      <p>Your Files</p>
    </div>
    <div style='display: inline-block; vertical-align: middle; width: 39%; text-align: right; margin-right: 10%; margin-top: -10px; margin-bottom: -30px; color: rgb(225, 225, 225, .6);'>
        <div onclick='localStorage.setItem("viewTable", "preview"); setViewTable();' id='preview' class='button' style='padding: 8px; margin-right: 5px;'><span style='font-family: Material Icons; font-size: 20px;'>grid_view</span></div>
        <div onclick='localStorage.setItem("viewTable", "detail"); setViewTable();' id='detail' class='button' style='padding: 8px;'><span style='font-family: Material Icons; font-size: 20px;'>view_agenda</span></div>
    </div>

    <div id='divEmptyProject' style='width: calc(100% - 2px); text-align: center; margin-top: 0;'>"
      <p style='font-size: 14px; color: rgb(255, 255, 255, .4); user-select: none;'>Click the button <span style='font-family: Material Icons; font-size: 20px; position: relative; top: 5px;'>add</span> to create a new project</p>
    </div>

    <table class='table' id="tableProject-detail" style='cursor: initial; border-spacing: 0 10px; margin-top: 30px; border-radius: 0; margin-bottom: 80px; width: 80%; margin-left: 10%; font-size: 14px;'>
    </table>
    <div id="tableProject-preview" style='margin-top: 30px; margin-bottom: 80px; width: 90%; margin-left: calc(5% + 15px); padding: 5px 0;'>
      <div style='margin: 0 auto;'>

      </div>
    </div>
  </div>

  <!-- ALERT DELETE PROJECT -->
  <div id='alertDeleteProjectOmbra' style='position: fixed; left: 0%; top: 0%; width: 100%; height: 100%; background-color: rgb(0, 0, 0, .7); display: none; z-index: 100;'>

    <div id='alertDeleteProject' style='width: 400px; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          warning</i></span>Alert Delete
        <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openAlertDeleteProject();'>
            <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
        </button></span>
        </p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>

      <div style='padding: 0px 20px 4px 20px;'>
      <p style='color: rgb(255, 255, 255, .6); font-size: 15px;'>Are you sure that you want to delete this project?</p>
      </div>

      <div style='width: 100%; text-align: right; margin: -10px 0 5px 0;'>
        <p onclick='openAlertDeleteProject();' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 10px; border: 1px solid rgb(200, 200, 200, .1);'>
          <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
            close
          </span>
          <span style='font-size: 14px;'>Cancel</span>
        </p>

        <p name="applyDeleteProject" onclick='deleteProject(); openAlertDeleteProject();' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 30px; border: 1px solid rgb(200, 200, 200, .1);'>
          <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
            done
          </span>
          <span style='font-size: 14px;'>Yes</span>
        </p>
      </div>
    </div>

  </div>


  <div id='templateCont' style='width: 100%; height: calc(100% - 65px); margin-top: 65px; overflow: auto; display: none; transform: scale(.9); opacity: 0;'>
  </div>

  <div id='keybindingCont' style='width: 100%; height: calc(100% - 65px); margin-top: 65px; overflow: auto; display: none; transform: scale(.9); opacity: 0;'>

    <div style='display: none; width: 70%; margin-left: 15%; height: 40px; margin-top: 50px; margin-bottom: 20px; background-color: rgb(255, 255, 255, .1); padding: 6px; border-radius: 4px;'>
      <div id='' style='font-size: 14px; color: rgb(255, 255, 255, .8); width: 100%; margin-top: -5px;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input id='searchKeybindingText' onkeyup='searchKeybinding();' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" value=" ">
        <label class="mdl-textfield__label" for="sample3">Search Command</label>
      </div>
    </div>

    <div style='width: 80%; margin-left: 10%; margin-top: 20px; margin-bottom: -10px; font-size: 17px; font-weight: 700; color: rgb(225, 225, 225, .9);'>
      <p>Keybinding</p>
    </div>
    <table class='table' id="tableFonts" style='cursor: initial; margin-top: 20px; border-radius: 0; margin-bottom: 80px; width: 80%; margin-left: 10%; font-size: 14px;'>
      <tr style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(150, 150, 150, .05); cursor: auto;'>
        <td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 15px 20px;'><span style='font-family: Material Icons; position: relative; top: 4px; font-size: 20px; margin-right: 10px; font-weight: 400;'>keyboard</span>shift+A</td>
        <td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding: 15px 10px; text-align: left; padding-left: 40px;'>popup:open-add-element</td>
      </tr>
      <tr style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(150, 150, 150, .05); cursor: auto;'>
        <td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 15px 20px;'><span style='font-family: Material Icons; position: relative; top: 4px; font-size: 20px; margin-right: 10px; font-weight: 400;'>keyboard</span>shift+B</td>
        <td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding: 15px 10px; text-align: left; padding-left: 40px;'>editor:remove-border</td>
      </tr>
      <tr style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(150, 150, 150, .05); cursor: auto;'>
        <td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 15px 20px;'><span style='font-family: Material Icons; position: relative; top: 4px; font-size: 20px; margin-right: 10px; font-weight: 400;'>keyboard</span>shift+C</td>
        <td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding: 15px 10px; text-align: left; padding-left: 40px;'>popup:open-customize-css</td>
      </tr>
      <tr style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(150, 150, 150, .05); cursor: auto;'>
        <td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 15px 20px;'><span style='font-family: Material Icons; position: relative; top: 4px; font-size: 20px; margin-right: 10px; font-weight: 400;'>keyboard</span>shift+G</td>
        <td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding: 15px 10px; text-align: left; padding-left: 40px;'>popup:open-gallery</td>
      </tr>
      <tr style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(150, 150, 150, .05); cursor: auto;'>
        <td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 15px 20px;'><span style='font-family: Material Icons; position: relative; top: 4px; font-size: 20px; margin-right: 10px; font-weight: 400;'>keyboard</span>shift+H</td>
        <td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding: 15px 10px; text-align: left; padding-left: 40px;'>editor:fit-height</td>
      </tr>
      <tr style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(150, 150, 150, .05); cursor: auto;'>
        <td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 15px 20px;'><span style='font-family: Material Icons; position: relative; top: 4px; font-size: 20px; margin-right: 10px; font-weight: 400;'>keyboard</span>shift+L</td>
        <td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding: 15px 10px; text-align: left; padding-left: 40px;'>popup:open-link-manager</td>
      </tr>
      <tr style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(150, 150, 150, .05); cursor: auto;'>
        <td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 15px 20px;'><span style='font-family: Material Icons; position: relative; top: 4px; font-size: 20px; margin-right: 10px; font-weight: 400;'>keyboard</span>shift+T</td>
        <td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding: 15px 10px; text-align: left; padding-left: 40px;'>popup:open-customize-theme</td>
      </tr>
      <tr style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(150, 150, 150, .05); cursor: auto;'>
        <td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 15px 20px;'><span style='font-family: Material Icons; position: relative; top: 4px; font-size: 20px; margin-right: 10px; font-weight: 400;'>keyboard</span>shift+V</td>
        <td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding: 15px 10px; text-align: left; padding-left: 40px;'>editor:duplicate-element</td>
      </tr>
      <tr style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(150, 150, 150, .05); cursor: auto;'>
        <td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 15px 20px;'><span style='font-family: Material Icons; position: relative; top: 4px; font-size: 20px; margin-right: 10px; font-weight: 400;'>keyboard</span>shift+W</td>
        <td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding: 15px 10px; text-align: left; padding-left: 40px;'>editor:fit-width</td>
      </tr>
      <tr style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(150, 150, 150, .05); cursor: auto;'>
        <td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 15px 20px;'><span style='font-family: Material Icons; position: relative; top: 4px; font-size: 20px; margin-right: 10px; font-weight: 400;'>keyboard</span>F2</td>
        <td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding: 15px 10px; text-align: left; padding-left: 40px;'>editor:edit-element-name</td>
      </tr>
      <tr style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(150, 150, 150, .05); cursor: auto;'>
        <td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 15px 20px;'><span style='font-family: Material Icons; position: relative; top: 4px; font-size: 20px; margin-right: 10px; font-weight: 400;'>keyboard</span>shift+F11</td>
        <td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding: 15px 10px; text-align: left; padding-left: 40px;'>editor:full-screen</td>
      </tr>
      <tr style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(150, 150, 150, .05); cursor: auto;'>
        <td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 15px 20px;'><span style='font-family: Material Icons; position: relative; top: 4px; font-size: 20px; margin-right: 10px; font-weight: 400;'>keyboard</span>canc</td>
        <td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding: 15px 10px; text-align: left; padding-left: 40px;'>editor:delete-element</td>
      </tr>
      <tr style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(150, 150, 150, .05); cursor: auto;'>
        <td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 15px 20px;'><span style='font-family: Material Icons; position: relative; top: 4px; font-size: 20px; margin-right: 10px; font-weight: 400;'>keyboard</span>ctrl+shift+D</td>
        <td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding: 15px 10px; text-align: left; padding-left: 40px;'>editor:deselect-all</td>
      </tr>
      <tr style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(150, 150, 150, .05); cursor: auto;'>
        <td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 15px 20px;'><span style='font-family: Material Icons; position: relative; top: 4px; font-size: 20px; margin-right: 10px; font-weight: 400;'>keyboard</span>ctrl+D</td>
        <td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding: 15px 10px; text-align: left; padding-left: 40px;'>editor:open/close-properties</td>
      </tr>
      <tr style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(150, 150, 150, .05); cursor: auto;'>
        <td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 15px 20px;'><span style='font-family: Material Icons; position: relative; top: 4px; font-size: 20px; margin-right: 10px; font-weight: 400;'>keyboard</span>ctrl+S</td>
        <td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding: 15px 10px; text-align: left; padding-left: 40px;'>editor:save-project</td>
      </tr>
      <tr style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(150, 150, 150, .05); cursor: auto;'>
        <td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 15px 20px;'><span style='font-family: Material Icons; position: relative; top: 4px; font-size: 20px; margin-right: 10px; font-weight: 400;'>keyboard</span>ctrl+shift+M</td>
        <td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding: 15px 10px; text-align: left; padding-left: 40px;'>editor:switch-mobile</td>
      </tr>
      <tr style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(150, 150, 150, .05); cursor: auto;'>
        <td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 15px 20px;'><span style='font-family: Material Icons; position: relative; top: 4px; font-size: 20px; margin-right: 10px; font-weight: 400;'>keyboard</span>ctrl+shift+P</td>
        <td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding: 15px 10px; text-align: left; padding-left: 40px;'>editor:switch-pc</td>
      </tr>
    </table>

  </div>

</body>
</html>
