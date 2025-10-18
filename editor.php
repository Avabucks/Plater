<html>

<head>

  <title>Plater</title>

  <Meta charset="utf-8">

  <link rel="shortcut icon" href="favicon.png">
  <meta name="application-name" content="Plater">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <script src="./js/jquery.min.js"></script>

  <script src="./js/jszip.min.js"></script>

  <script src="js/aes.js"></script>
  <script src="js/UIScript.js"></script>
  <script src="js/script.js"></script>
  <script src="js/scriptPlater.js"></script>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="animations.css">
  <link rel="stylesheet" href="templateStyle.css">
  <!-- <link rel="stylesheet" href="styleElements.css"> -->
  <script src="js/FileSaver.js"></script>
  <script src="js/TreeView.js"></script>
  <script src=
"https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.5/dist/html2canvas.min.js">
  </script>

  <!-- mdl -->
  <link rel="stylesheet" href="./mdl/material.css">
  <script src="./mdl/material.js"></script>

  <style type="text/css" id="styleTheme" class="styleTheme" title="styleTheme">

    .button-plater {
    }

    .div-plater {
    }

    .image-plater {
    }

    .menu-plater {
    }

    .a-plater {
    }

    .label-plater {
    }

    .span-plater {
    }

    .input-plater {
    }

    .textarea-plater {
    }

  </style>

  <style type="text/css" id="styleTheme" class="styleTheme" title="styleTheme">
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Icons:wght@400&display=swap');
  </style>

  <style>
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(font/MaterialIcons-Regular.ttf) format('truetype');
  }

  </style>

</head>

<body onbeforeunload="return funzioneChiudi();" translate="no">

  <div style='display: none;' ondrop="dropDELETE(event);" ondragover="dragOverDELETE(event);" ondragleave="dragLeaveDELETE(event);" class='floatingDelete'>
    <span style="color: rgb(255, 255, 255, .8); font-family: Material Icons; font-size: 22px; pointer-events: none;">delete</span>
  </div>

  <div id='captured' style='width: 1134px; height: 643px; position: fixed; z-index: -1000; background-color: rgb(255, 255, 255); display: none;'></div>

  <div id="contextMenu" class="fade-in2" data-idElem="" tabindex="0" onblur="this.style.display = 'none';" style='display: none; position: fixed; z-index: 10000; padding: 7px 0; background-color: rgb(255, 255, 255, 1); box-shadow: 1px 1px 7px 2px rgba(0, 0, 0, .2);'>
  </div>

  <div id='ombraForSelectionLink' style='display: none; width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 100000; pointer-events: none;'>
    <div style='width: 100%; height: 60px; background-color: rgb(0, 0, 0, .8); pointer-events: auto;'></div>
    <div style='width: calc(100% - 210px); height: calc(100% - 60px); background-color: rgb(0, 0, 0, .8); top: 60px; right: 0; position: fixed; pointer-events: auto;'></div>
  </div>

  <script>
    if (!localStorage.getItem("login_user")){
      location.href = 'dashboard.php';
    }
  </script>

  <div id='ombraEditor' style='position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; background-color: rgb(0, 0, 0, .7);'></div>

  <div id='editorCont' style='position: fixed; opacity: 0; transform: scale(.92); transition: .3s; z-index: 0; top: 0; left: 0; width: 100%; height: 100%; background-color: var(--primary);'>

  <header id='header' style='position: fixed; top:0; left:0; width: 100%; transition: 0.3s; z-index: 2; background: var(--primary); user-select: none;'>
    <p id='titolo' style='font-weight: 600; color: var(--white); font-size: 20px; letter-spacing: 0.3px; margin-left: 40px; margin-top: 10px; display: inline-block; vertical-align: middle;'>Plater<span style='font-size: 30px; color: var(--secondary);'>.</span></p>

    <!-- menu principale -->
    <ul id='menuPc' style='font-size: 15;'>

      <li id='themeLi'><a id='themeBut' onclick='openHeadLink("customTheme");' class='menuLi buttonMaterial'><span id='spanTheme' style='font-size: 16px; color: var(--secondary_opacity); font-family: Material Icons; padding-right: 12; position: relative; top: 3px;'>colorize</span>Customise Theme</a></li>
      <li id='sectionLi' style='DISPLAY: NONE;'><a id='liGrid' onclick='openHeadLink("sections");' class='menuLi buttonMaterial'><span id='spanGrid' style='font-size: 16px; color: var(--secondary_opacity); font-family: Material Icons; padding-right: 12; position: relative; top: 3px;'>calendar_view_month</span>Grid View</a></li>

      <!-- <li style='margin: 0 20px 0 10px; margin-top: 11px; width: 330px;'>
        <input id='searchElemText' onchange='searchElem(this.value, this);' style='width: 90%; margin-left: 5%; padding: 14px 40px; border-radius: 4px; border: none; font-size: 14px; color: rgb(255, 255, 255, .7);' placeholder="Search" />
      </li> -->

      <li style='margin: 0 40px 0 10px; margin-top: 11px;'>
        <div ondrop="dropPAGE(event);" ondragover="dragOverPAGE(event);" ondragleave="dragLeavePAGE(event);" id='searchElemText' onclick='openHeadLink("pagesManager")' style='width: 260px; margin-left: 5%; padding: 9px 15px; border-radius: 4px; font-size: 14px; color: rgb(255, 255, 255, .7);'>
          <div style='display: inline-block; vertical-align: middle; width: 45%; pointer-events: none;'>
            <span style='font-family: Material Icons; font-size: 20px; vertical-align: middle;'>article</span>
            <span id='currentPageText' style='font-size: 13px; margin-left: 10px; vertical-align: middle; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; width: 80px; display: inline-block;'>First Page</span>
          </div>
          <div style='display: inline-block; vertical-align: middle; width: 40%; text-align: right; pointer-events: none;'>
            <span style='font-family: Material Icons; font-size: 20px; vertical-align: middle; margin-right: -40px;'>arrow_drop_down</span>
          </div>
        </div>
      </li>

      <li style='margin: 0 20px 0 10px; margin-top: 7px;'><div id='contButDisplay' style='background-color: rgb(255, 255, 255, .1); width: 150px; text-align: center; padding: 6px 3px; border-radius: 6px; display: inline-block; vertical-align: middle; margin-top: 0px; transition: .2s;'>

          <div id='fullScreenBut' onclick='fullScreen();' style='display: inline-block; vertical-align: middle; padding: 8px; margin: 0px 2px;' class='menuLi buttonMaterial' style=''><span style='font-size: 22px; font-family: Material Icons; font-weight: 400; color: rgb(255, 255, 255, .8);'>fullscreen</span></div>
          <div id='switchPc' onclick='switchMode(this.id);' style='display: inline-block; vertical-align: middle; padding: 8px; margin: 0px 2px;' class='menuLi buttonMaterial' style=''><span style='font-size: 22px; font-family: Material Icons; font-weight: 400; color: rgb(255, 255, 255, .8);'>computer</span></div>
          <div id='switchMobile' onclick='switchMode(this.id);' style='display: inline-block; vertical-align: middle; padding: 8px; margin: 0px 2px;' class='menuLi buttonMaterial' style=''><span style='font-size: 22px; font-family: Material Icons; font-weight: 400; color: rgb(255, 255, 255, .8);'>phone_iphone</span></div>

      </div></li>

      <li id='addLi'><a id='addElementsBut' onclick='openHeadLink("addElementPopup");' class='menuLi buttonMaterial' style='margin-right: 30px;'><span id='spanAdd' style='font-size: 16px; color: var(--secondary_opacity); font-family: Material Icons; padding-right: 12; position: relative; top: 3px;'>add</span>Add Element</a></li>

      <!--
      <li><a class='menuLi buttonMaterial' style=''><span style='font-size: 16px; color: var(--secondary_opacity); font-family: Material Icons; padding-right: 12; position: relative; top: 3px;'>folder_open</span>Open</a></li>
      -->
      <li onclick='setMenu("More");'><a id="demo-menu-lower-right" class='menuLi buttonMaterial' style='padding: 6px; border-radius: 50px;'><span style='font-size: 16px; color: var(--secondary_opacity); font-family: Material Icons; font-size: 22px; font-weight: 400px;'>more_vert</span></a></li>

      <!-- <li><a class='menuLi buttonMaterial' style=''><span style='font-size: 16px; color: var(--secondary_opacity); font-family: Material Icons; padding-right: 12px; position: relative; top: 3px;'>save</span>Save</a></li>
      <li><a onclick='exportProject();' class='menuLi buttonMaterial' style=''><span style='font-size: 16px; color: var(--secondary_opacity); font-family: Material Icons; padding-right: 12px; position: relative; top: 3px;'>system_update_alt</span>Export</a></li>
      <li><a onclick='closeProject();' class='menuLi buttonMaterial' style=''><span style='font-size: 16px; color: var(--secondary_opacity); font-family: Material Icons; padding-right: 12px; position: relative; top: 3px;'>close</span>Close</a></li> -->
    </ul>
    <!-- - -->

    <div class="mdl-tooltip" data-mdl-for="themeLi">Customize Theme (Shift + T)</div> <!-- Theme tooltip -->
    <div class="mdl-tooltip" data-mdl-for="addLi">Add Element (Shift + A)</div> <!-- Add Element tooltip -->
    <div class="mdl-tooltip" data-mdl-for="sectionLi">Customize Grid View (Shift + G)</div> <!-- Sections tooltip -->
    <div class="mdl-tooltip" data-mdl-for="fullScreenBut">Fullscreen (Shift + F11)</div> <!-- Fullscreen tooltip -->
    <div class="mdl-tooltip" data-mdl-for="switchPc">Switch display to Pc (Ctrl + Shift + P)</div> <!-- Switch Pc tooltip -->
    <div class="mdl-tooltip" data-mdl-for="switchMobile">Switch display to Mobile (Ctrl + Shift + M)</div> <!-- Switch Mobile tooltip -->

    <div id='sottoMenuMore' style='position: absolute;'>
      <ul style='background-color: #fff;' class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="demo-menu-lower-right">
        <li id='galleryMenuBut' onclick='openHeadLink("imageManager"); typeAddingImage = null; loadTabellaImages();' style='width: 100%;' class="mdl-menu__item"><span style='font-size: 16px; color: var(--primary); font-family: Material Icons; padding-right: 12px; font-weight: 600;'>collections</span><span style='position: relative; top: -3px;'>Gallery</span></li>
        <li id='settingsMenuBut' onclick='openHeadLink("projectSettings");' style='width: 100%;' class="mdl-menu__item"><span style='font-size: 16px; color: var(--primary); font-family: Material Icons; padding-right: 12px; font-weight: 600;'>settings</span><span style='position: relative; top: -3px;'>Project Settings</span></li>
        <li id='saveMenuBut' onclick='saveProject();' style='width: 100%;' class="mdl-menu__item"><span style='font-size: 16px; color: var(--primary); font-family: Material Icons; padding-right: 12px; font-weight: 600;'>save</span><span style='position: relative; top: -3px;'>Save</span></li>
        <li id='downloadMenuBut' onclick='downloadProject();' style='width: 100%;' class="mdl-menu__item"><span style='font-size: 16px; color: var(--primary); font-family: Material Icons; padding-right: 12px; font-weight: 600;'>download</span><span style='position: relative; top: -3px;'>Download a copy</span></li>
        <li id='exportMenuBut' onclick='exportProject();' style='width: 100%;' class="mdl-menu__item mdl-menu__item--full-bleed-divider"><span style='font-size: 16px; color: var(--primary); font-family: Material Icons; padding-right: 12px; font-weight: 600;'>system_update_alt</span><span style='position: relative; top: -3px;'>Export</span></li>
        <!-- <li id='exportMenuBut' onclick='try {exportProject();} catch {alertFun("Error during export (Try to refresh the page)", "red")}' style='width: 100%;' class="mdl-menu__item mdl-menu__item--full-bleed-divider"><span style='font-size: 16px; color: var(--primary); font-family: Material Icons; padding-right: 12px; font-weight: 600;'>system_update_alt</span><span style='position: relative; top: -3px;'>Export</span></li> -->
        <li id='closeMenuBut' onclick='closeProject();' style='width: 100%;' class="mdl-menu__item"><span style='font-size: 16px; color: var(--primary); font-family: Material Icons; padding-right: 12px; font-weight: 600;'>close</span><span style='position: relative; top: -3px;'>Close</span></li>
      </ul>
    </div>

  </header>

  <main>

    <div id='fullBoard' style='position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: transparent; z-index: 3000; display: none;'>
    </div>

    <div id='boardOutMobile' style='position: fixed; width: calc(100% - 237px); height: calc(100% - 82px); top: 65px; margin-left: 220px; background-color: rgb(255, 255, 255, .02); border-radius: 5px; transform: translate(0, 0);'>
    </div>

    <div id='contFullScreenBut' style='width: 100%; text-align: center; margin-top: -50px; position: fixed; z-index: 3001; pointer-events: none; transition: .3s;'>
      <p onclick='fullScreen(); document.getElementById("contFullScreenBut").style.marginTop = "-50px";' class="buttonFullScreen" style='color: rgb(255, 255, 255); font-size: 14px; user-select: none; margin: 0; padding: 7px; border-radius: 50px; pointer-events: auto;'>
        <span style='font-size: 21px; font-weight: 400; font-family: Material Icons; padding-right: 16; display: inline-block; transition: .3s; padding: 0;'>
          close
        </span>
      </p>
    </div>


    <div id='boardPc'>
      <div id='boardOut' style='position: fixed; width: calc(100% - 232px); height: calc(100% - 82px); top: 65px; left: 215px; background-color: var(--white_board); border-radius: 5px; transition: .2s;'>
      </div>

      <div id='board' onscroll="scrollAnimations(); document.getElementById('contextMenu').style.display = 'none';" style='padding: 1px; scroll-padding: 1px; position: absolute; width: calc(100% - 252px); height: calc(100% - 102px); top: 75px; left: 225px; background-color: var(--white_board); overflow: auto; transform: translate(0, 0); cursor: pointer;'>
      </div>
    </div>

      <button id='openOrderElements' class='openProprieties' onclick="openOrderElements();" style='border: 0 solid var(--secondary_opacity); z-index: 0; position:fixed; left: 173px; top:calc(50% - 10px); width: 60; height: 60; border-radius: 50%; user-select: none;' class="scale-up-center">
        <i id='arrowOrder' class="material-icons" style='padding: 0; color: var(--secondary_opacity); margin-left: 25; transform: rotate(0deg);' >keyboard_arrow_left</i>
      </button>

      <div id='windowOrderElements' onscroll="document.getElementById('titoloTreeView').style.marginLeft = (5/100)*this.getBoundingClientRect().width + this.scrollLeft;" style='position: absolute; width: 200; height: calc(100% - 60px); padding: 0px 5px; top: 60px; left: 0; font-size: 14px; background-color: var(--primary); transition: .3s; display: block; overflow: auto; user-select: none;'>

          <div id='titoloTreeView' style='width: 90%; margin-left: 5%; margin-top: 3px; margin-bottom: -3px; text-align: center; color: rgb(255, 255, 255, .6); font-size: 14px; background-color:  rgb(255, 255, 255, .1); border-radius: 5px; padding: 1px 0;'>
            <p style='width: 180px;'>
              Project Elements
            </p>
          </div>

          <div id='contTreeView'>
            <ul style='padding-left: 0;' id="parent"></ul>
          </div>



        <!-- <div style='position: absolute; width: 210px; height: 40px; bottom: 0;'>
          <div id='buttForm' onclick='addForm();' class='button' style='padding: 7px 7px; margin-right: 10px; margin-left: 10px; margin-top: 3px; display: inline-block; vertical-align: middle; color: rgb(255, 255, 255, .7);'><span id='spanPos' style='font-family: Material Icons; font-size: 22px;'><span id="form">post_add</span></span></div>
        </div> -->

        <div class="mdl-tooltip" style='margin-top: -70px;' data-mdl-for="form">Add Form</div> <!-- Fit width tooltip -->

      </div>

    <button id='openProprieties' class='openProprieties' onclick="openProprieties();" style='border: 0 solid var(--secondary_opacity); z-index: 0; position:fixed; right: -58px; top:calc(50% - 10px); width: 60; height: 60; border-radius: 50%; user-select: none;' class="scale-up-center">
      <i id='arrow' class="material-icons" style='padding: 0; color: var(--secondary_opacity); margin-left: -25; transform: rotate(0deg);' >keyboard_arrow_left</i>
    </button>

    <div id='windowProperties' style='position: absolute; width: 0; height: calc(100% - 60px); top: 60px; right: 0; background-color: var(--primary); transition: .3s; display: none; overflow-y: auto;'>

    <div id='elementsProperties'>

      <input id='whiteSpace' style='font-size: 14px; padding-left: 5px; display: none;' class="mdl-textfield__input" type="text" id="sample3" placeholder=" ">

      <div style='width: 90%; margin: 15 0 -20px 5%;'>
        <!-- Id -->
        <div style='DISPLAY: NONE; font-size: 14px; color: rgb(255, 255, 255, .6);' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <select id='idText' onchange="" style='font-size: 14px; font-family: Inter; background-color: rgb(255, 255, 255, .1);' class="mdl-textfield__input" type="text" id="sample3">
            <option style=''>board</option>
          </select>
          <label class="mdl-textfield__label" for="sample3">Id</label>
        </div>

        <!-- Name -->
        <div style='font-size: 14px; color: rgb(255, 255, 255, .6);' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='nameText' style='padding: 8px 10px; font-size: 14px; font-family: Inter; background-color: rgb(255, 255, 255, .1);' class="mdl-textfield__input" type="text" id="sample3" placeholder="Name">
          <label class="mdl-textfield__label" for="sample3">Name</label>
        </div>

        <div style='width: calc(100% - 2px); text-align: center; margin: -10px 0 20px; padding: -5px; border-radius: 8px; border: 1px solid rgb(255, 255, 255, .1);'>

          <div id='buttCont' style='width: 100%;'>

            <div style='text-align: center; display: inline-block; vertical-align: middle; margin: 0 4px;'>
                  <p id='animationButt' onclick='openHeadLink("animationsManager");' class="button" style='margin: 5px 0; color: rgb(255, 255, 255, .6); font-size: 14px; border-radius: 900px; padding: 7px;'>
                    <span style='font-size: 22px; font-family: Material Icons; display: inline-block; transition: .1s; padding: 0;'>
                      animation
                    </span>
                </p>
            </div>

            <div class="mdl-tooltip" data-mdl-for="animationButt">Animation</div> <!-- Animation tooltip -->

            <div style='text-align: center; display: inline-block; vertical-align: middle; margin: 0 4px;'>
                  <p id='linkButt' onclick='openHeadLink("link");' class="button" style='margin: 5px 0; color: rgb(255, 255, 255, .6); font-size: 14px; border-radius: 900px; padding: 7px;'>
                    <span style='font-size: 22px; font-family: Material Icons; display: inline-block; transition: .1s; padding: 0;'>
                      link
                    </span>
                </p>
            </div>

            <div class="mdl-tooltip" data-mdl-for="linkButt">Link Href (Shift + L)</div> <!-- Link Href tooltip -->

            <div style='text-align: center; display: inline-block; vertical-align: middle; margin: 0 4px;'>
                  <p id='custButt' onclick='openHeadLink("custCSS");' class="button" style='margin: 5px 0; color: rgb(255, 255, 255, .6); font-size: 14px; border-radius: 900px; padding: 9px;'>
                    <span style='font-size: 20px; font-family: Material Icons; display: inline-block; transition: .3s; padding: 0;'>
                      colorize
                    </span>
                </p>
            </div>

              <div class="mdl-tooltip" data-mdl-for="custButt">Customize Css (Shift + C)</div> <!-- Customize Css tooltip -->

            <div id='duplicateDiv' style='text-align: center; display: inline-block; vertical-align: middle; margin: 0 4px;'>
                  <p id='duplicateButt' onclick='duplicateElement(selectedId, document.getElementById(selectedId).parentNode.parentNode.id);' class="button" style='margin: 5px 0; color: rgb(255, 255, 255, .6); font-size: 14px; border-radius: 900px; padding: 9px;'>
                    <span style='font-size: 20px; font-family: Material Icons; display: inline-block; transition: .3s; padding: 0;'>
                      content_copy
                    </span>
                </p>
            </div>

              <div class="mdl-tooltip" data-mdl-for="duplicateButt">Duplicate (Shift + V)</div> <!-- Duplicate tooltip -->

              <div style='text-align: center; display: inline-block; vertical-align: middle; margin: 0 4px;'>
                    <p id='deleteButt' onclick='deleteKey();' class="button" style='margin: 5px 0; color: rgb(255, 0, 0, .5); font-size: 14px; border-radius: 900px; padding: 9px;'>
                      <span style='font-size: 20px; font-family: Material Icons; display: inline-block; transition: .3s; padding: 0;'>
                        delete
                      </span>
                  </p>
              </div>

            </div> <!-- chiudi div contenitore button -->

          </div> <!-- chiudi div contenitore del contenitore button -->

        <!-- Append Child -->
        <div style='DISPLAY: NONE; font-size: 14px; color: rgb(255, 255, 255, .6);' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">

          <select id='childText' onchange="setChild(); aggiustaSelect();" style='font-size: 14px; background-color: var(--primary); font-family: Inter;' class="mdl-textfield__input" type="text" id="sample3">
            <option style=''>board</option>
          </select>

          <label class="mdl-textfield__label" for="sample3">Append Child</label>
        </div>

        <!-- Verical Align -->
        <div id='divVerticalAlign' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <div style='margin: -25px 0 10px;'>
            <div style='width: 100%; margin-top: -9px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
            <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>ELEMENTS VERTICAL ALIGN</span>
          </div>
          <div style='width: 100%; text-align: center; margin-bottom: -5px;'>
            <div onclick='verticalAlignSection("top");' name='vert-top' class='button' style='padding: 10px 10px; margin-right: 10px;'><span id='spanPos' style='font-family: Material Icons; font-size: 20px;'>vertical_align_top</span></div>
            <div onclick='verticalAlignSection("center");' name='vert-center' class='button' style='padding: 10px 10px; margin-right: 10px;'><span id='spanPos' style='font-family: Material Icons; font-size: 20px;'>vertical_align_center</span></div>
            <div onclick='verticalAlignSection("bottom");' name='vert-bottom' class='button' style='padding: 10px 10px;'><span id='spanPos' style='font-family: Material Icons; font-size: 20px;'>vertical_align_bottom</span></div>
          </div>

          <input id='verticalAlignSectionText' style='font-size: 14px; padding-left: 5px; display: none;' class="mdl-textfield__input" type="text" id="sample3" placeholder=" ">
        </div>

        <!-- Size -->
        <div id='divContSize' style='margin: 5px 0 10px;'>
          <div style='width: 100%; margin-top: -9px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
          <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>SIZE</span>
        </div>
        <div id='divWidth' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 39%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='widthText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Width">
          <label class="mdl-textfield__label" for="sample3">Width</label>
        </div>
        <div id='widthSlideCont' style='width: 100%; margin-top: -10px; margin-bottom: 15px;'>
          <input oninput='changeWidthSlider(event);' class="mdl-slider mdl-js-slider" id='widthSlide' type="range" min="0" max="20" value="0">
        </div>

        <div id='divHeight' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 39%; margin-left: 20%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='heightText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Height">
          <label class="mdl-textfield__label" for="sample3">Height</label>
        </div>
        <div id='divMinHeightSection' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 85%; display: inline-block; vertical-align: middle;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='minHeightTextSection' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Min Height" >
          <label class="mdl-textfield__label" for="sample3">Min Height</label>
        </div>
        <div id='fit-minHeight' style='width: 10%; text-align: center; margin: 15px 0 15px 0; display: inline-block; vertical-align: middle;'>
              <p onclick='setPosition("fit-minHeight");' class="button" style='color: rgb(255, 255, 255, .6); font-size: 14px; padding: 6px; margin: 0; border-radius: 50px;'>
                <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; display: inline-block; transition: .3s; padding: 0;'>
                  expand
                </span>
            </p>
        </div>

        <!-- Order Section -->
        <div id='divOrder' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <div style='margin: -25px 0 10px;'>
            <div style='width: 100%; margin-top: -5px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
            <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>ORDER SECTION</span>
          </div>
          <div style='width: 100%; text-align: center; margin-bottom: -5px;'>
            <div id='buttPos' name='left-order' onclick='decreaseOrder();' class='button' style='padding: 10px 10px; margin-right: 10px;'><span id='spanPos' style='font-family: Material Icons; font-size: 20px;'><span id="">arrow_back</span></span></div>
            <div id='buttPos' name='right-order' onclick='increaseOrder();' class='button' style='padding: 10px 10px; margin-right: 10px;'><span id='spanPos' style='font-family: Material Icons; font-size: 20px;'><span id="">arrow_forward</span></span></div>
          </div>

          <input id='orderText' style='font-size: 14px; padding-left: 5px; display: none;' class="mdl-textfield__input" type="text" id="sample3" placeholder=" ">

        </div>

        <div id='divFitSize' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <div style='width: 100%; text-align: center; margin-top: -20px; margin-bottom: 10px;'>
            <div id='buttPos' name='width' onclick='setPosition("fit-width");' class='button' style='padding: 10px 10px; margin-right: 10px; transform: rotate(90deg);'><span id='spanPos' style='font-family: Material Icons; font-size: 20px;'><span id="width">expand</span></span></div>
            <div style='DISPLAY: NONE;' id='buttPos' name='height' onclick='setPosition("fit-height");' class='button' style='padding: 10px 10px; margin-right: 10px;'><span id='spanPos' style='font-family: Material Icons; font-size: 20px;'><span id="height">expand</span></span></div>
            <div id='buttPos' name='aspect' onclick='setPosition("aspect-ratio");' class='button' style='padding: 10px 10px; margin-right: 10px;'><span id='spanPos' style='font-family: Material Icons; font-size: 20px;'><span id="aspect">aspect_ratio</span></span></div>
          </div>
        </div>

        <div class="mdl-tooltip" data-mdl-for="width">Fit Width (Shift + W)</div> <!-- Fit width tooltip -->
        <div class="mdl-tooltip" data-mdl-for="height">Fit Height (Shift + H)</div> <!-- Fit height tooltip -->
        <div class="mdl-tooltip" data-mdl-for="aspect">Aspect Ratio (Shift + A)</div> <!-- Aspect ratio tooltip -->

        <div id='divContWrap'>
          <div style='margin: 5px 0 10px;'>
            <div style='width: 100%; margin-top: -9px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
            <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>FLEX PROPERTIES</span>
          </div>
          <div id='divWrap' style='padding-bottom: 20px; margin: -2px auto -20px;'>
            <p>
              <input onclick='if (this.checked) document.getElementById("wrapText").value = "wrap"; if (!this.checked) document.getElementById("wrapText").value = "nowrap";' type="checkbox" id="wrapCheck" class='checkboxClass'>
              <label for="prova" style='--contentCheck: "Wrap Elements";'></label>
            </p>
            <input id='wrapText' style='display: none; padding: 8px 10px; font-size: 14px; font-family: Inter; background-color: rgb(255, 255, 255, .1);' class="mdl-textfield__input" type="text" id="sample3" placeholder="Name">
          </div>
        </div>

      </div>

      <!-- Position Properties -->
      <div id='divContPosition' onclick='openSUBProprieties("positionProperties", "arrowPropPosition");' style='width: 90%; margin: 10 0 10 5%; cursor: pointer; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span id='arrowPropPosition' style='font-size: 25px; font-family: Material Icons; padding-right: 12; position: relative; line-height: 10px; transform: rotate(90deg); top: 6px; display: inline-block; transition: .3s; padding: 0;'>arrow_right</span>Position Properties</p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .3); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>
      <div id='positionProperties' style='width: 90%; margin: 10 0 10 5%;'>

        <!-- Position Align -->
        <div id='divPositionAlign' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <div style='width: 100%; text-align: center; margin-bottom: 10px;'>
            <div id='buttPos' onclick='setPosition("center-left");' name='center-left' class='button' style='padding: 10px 10px; margin-right: 10px;'><span id='spanPos' style='font-family: Material Icons; font-size: 20px;'>align_horizontal_left</span></div>
            <div id='buttPos' onclick='setPosition("center-center");' name='center-center' class='button' style='padding: 10px 10px; margin-right: 10px;'><span id='spanPos' style='font-family: Material Icons; font-size: 20px;'>align_horizontal_center</span></div>
            <div id='buttPos' onclick='setPosition("center-right");' name='center-right' class='button' style='padding: 10px 10px;'><span id='spanPos' style='font-family: Material Icons; font-size: 20px;'>align_horizontal_right</span></div>
          </div>

          <input id='posPositionText' style='font-size: 14px; padding-left: 5px; display: none;' class="mdl-textfield__input" type="text" id="sample3" placeholder=" ">
          <input id='transformText' style='font-size: 14px; padding-left: 5px; display: none;' class="mdl-textfield__input" type="text" id="sample3" placeholder=" ">

          <input id='positionTextNone' style='font-size: 14px; padding-left: 5px; display: none;' class="mdl-textfield__input" type="text" id="sample3" placeholder=" ">
          <input id='verticalAlignNone' style='font-size: 14px; padding-left: 5px; display: none;' class="mdl-textfield__input" type="text" id="sample3" placeholder=" ">

        </div>

        <div id='marginDivCont'>
          <div style='margin: 5px 0 10px;'>
            <div style='width: 100%; margin-top: -9px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
            <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>MARGIN</span>
          </div>
          <div id='divMarginTop' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 23%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input id='marginTopText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Top">
            <label class="mdl-textfield__label" for="sample3">Top</label>
          </div>
          <div id='divMarginLeft' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 23%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input id='marginLeftText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Left">
            <label class="mdl-textfield__label" for="sample3">Left</label>
          </div>
          <div id='divMarginBottom' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 23%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input id='marginBottomText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Bottom">
            <label class="mdl-textfield__label" for="sample3">Bottom</label>
          </div>
          <div id='divMarginRight' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 23%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input id='marginRightText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Right">
            <label class="mdl-textfield__label" for="sample3">Right</label>
          </div>
      </div>

      <!-- Align Items -->
      <div id='alignItemsCont'>

        <div style='margin: 5px 0 10px;'>
          <div style='width: 100%; margin-top: -9px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
          <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>ALIGN ITEMS</span>
        </div>

        <div id='divoccupied' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='occupiedText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Occupied Space">
          <label class="mdl-textfield__label" for="sample3">Occupied Space</label>
        </div>
        <div id='occupiedSlideCont' style='width: 100%; margin-top: -10px; margin-bottom: 15px;'>
          <input oninput='changeRgb(event, "occupied");' class="mdl-slider mdl-js-slider" id='occupiedSlide' type="range" min="0" max="100" value="00">
        </div>

        <div id='divPositionAlign' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; padding: 0;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <div style='width: 100%; text-align: center; margin-bottom: 10px;'>
            <div id='buttPos' onclick='setPosition("top-flex");' name='top-flex' class='button' style='padding: 10px 10px; margin-right: 10px;'><span id='spanPos' style='font-family: Material Icons; font-size: 20px;'>align_vertical_top</span></div>
            <div id='buttPos' onclick='setPosition("center-flex");' name='center-flex' class='button' style='padding: 10px 10px; margin-right: 10px;'><span id='spanPos' style='font-family: Material Icons; font-size: 20px;'>align_vertical_center</span></div>
            <div id='buttPos' onclick='setPosition("bottom-flex");' name='bottom-flex' class='button' style='padding: 10px 10px;'><span id='spanPos' style='font-family: Material Icons; font-size: 20px;'>align_vertical_bottom</span></div>
            <div style='DISPLAY: NONE;' id='buttPos' onclick='setPosition("return");' name='return' class='button' style='padding: 10px 10px; margin-left: 40px;'><span id='spanPos' style='font-family: Material Icons; font-size: 20px;'>keyboard_return</span></div>
          </div>
        </div>

      </div>

        <!-- Display -->
        <div style='display: none; margin: 5px 0 10px;'>
          <div style='width: 100%; margin-top: -9px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
          <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>DISPLAY</span>
        </div>
        <div style='display: none;' id='divDisplay' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <select id='displayText' style='font-size: 14px; background-color: var(--primary); font-family: Inter;' onchange="changedDisplay = true;"  class="mdl-textfield__input" type="text" id="sample3">
            <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>none</option>
            <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>aligned</option>
            <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>unaligned</option>
          </select>
          <input id='displayTextNone' style='font-size: 14px; padding-left: 5px; display: none;' class="mdl-textfield__input" type="text" id="sample3" placeholder=" ">
          <label class="mdl-textfield__label" for="sample3">Display</label>
        </div>
        <div style='display: none;' id='divFixedPos' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 90%; margin-top: -15px; text-align: center;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <label style='left: 30px;' class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="fixedCheck">
            <input type="checkbox" id="fixedCheck" name="fixedCheck" class="mdl-checkbox__input"  onchange="changedPos = true;" checked>
            <input type="text" id="fixedCheckNone" class="mdl-checkbox__input">
            <span class="mdl-checkbox__label" style='font-size: 13px; margin-left: -30px;'>Fixed position during scrolling</span>
          </label>
        </div>

      </div>

      <!-- General Properties -->
      <div onclick='openSUBProprieties("generalProperties", "arrowPropGeneral");' style='width: 90%; margin: 30 0 10 5%; cursor: pointer; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span id='arrowPropGeneral' style='font-size: 25px; font-family: Material Icons; padding-right: 12; position: relative; line-height: 10px; transform: rotate(90deg); top: 6px; display: inline-block; transition: .3s; padding: 0;'>arrow_right</span>General Properties</p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .3); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>
      <div id='generalProperties' style='width: 90%; margin: 10 0 10 5%;'>


        <!-- Inner Text -->
        <div id='textTitle' style='margin: 30px 0 10px;'>
          <div style='width: 100%; margin-top: -9px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
          <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>TEXT</span>
        </div>

        <div id='innerTextCont'>
          <div style='margin-top: -20px;'>
            <div id='divInnerText' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 85%; display: inline-block; vertical-align: middle;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <div style='overflow: hidden; border: 1px solid rgb(255, 255, 255, .1); padding: 5px; border-radius: 5px; width: calc(100% - 10px); height: 20px;'>
                <div id='innerText' style='color: rgba(255, 255, 255, .6); font-size: 14px; line-height: 21px;'></div>
              </div>
            </div>
            <div style='width: 10%; text-align: center; margin: 15px 0 15px 0; display: inline-block; vertical-align: middle;'>
                  <p onclick='openInnerText();' class="button" style='color: rgb(255, 255, 255, .6); font-size: 14px; padding: 6px; margin: 0; border-radius: 50px;'>
                    <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; display: inline-block; transition: .3s; padding: 0;'>
                      more_horiz
                    </span>
                </p>
            </div>
          </div>
            <div id='divPlaceHolder1' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; display: inline-block; vertical-align: middle;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input id='placeHolderText1' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Placeholder">
              <label class="mdl-textfield__label" for="sample3">Place Holder</label>
            </div>
        </div>

        <div id='valueCont'>
          <div id='divValue' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; display: inline-block; vertical-align: middle;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input id='valueText' onchange='editedInput = true;' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Value">
            <label class="mdl-textfield__label" for="sample3">Text</label>
          </div>
          <div id='divPlaceHolder' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; display: inline-block; vertical-align: middle;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input id='placeHolderText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Placeholder">
            <label class="mdl-textfield__label" for="sample3">Place Holder</label>
          </div>
        </div>

        <!-- Padding -->
        <div id='paddingDivCont'>
          <div style='margin: 5px 0 10px;'>
            <div style='width: 100%; margin-top: -11px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
            <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>PADDING</span>
          </div>
          <div id='divPaddingTop' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 23%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input id='paddingTopText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Top">
            <label class="mdl-textfield__label" for="sample3">Top</label>
          </div>
          <div id='divPaddingLeft' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 23%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input id='paddingLeftText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Left">
            <label class="mdl-textfield__label" for="sample3">Left</label>
          </div>
          <div id='divPaddingBottom' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 23%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input id='paddingBottomText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Bottom">
            <label class="mdl-textfield__label" for="sample3">Bottom</label>
          </div>
          <div id='divPaddingRight' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 23%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input id='paddingRightText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Right">
            <label class="mdl-textfield__label" for="sample3">Right</label>
          </div>
        </div>

        <!-- Overflow -->
        <div id='overflowDivCont'>
          <div style='margin: 5px 0 10px;'>
            <div style='width: 100%; margin-top: -11px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
            <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>OVERFLOW</span>
          </div>
          <div id='divOverflowY' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 49%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <select id='overflowYText' style='font-size: 14px; background-color: var(--primary); font-family: Inter;' class="mdl-textfield__input" placeholder="Vertical Overflow" type="text" id="sample3">
                <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>visible</option>
                <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>hidden</option>
                <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>auto</option>
              </select>
            <label class="mdl-textfield__label" for="sample3">Vertical Overflow</label>
          </div>
          <div id='divOverflowX' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 49%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <select id='overflowXText' style='font-size: 14px; background-color: var(--primary); font-family: Inter;' class="mdl-textfield__input" placeholder="Horizontal Overflow" type="text" id="sample3">
                <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>visible</option>
                <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>hidden</option>
                <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>auto</option>
              </select>
            <label class="mdl-textfield__label" for="sample3">Horizontal Overflow</label>
          </div>
        </div>

        <!-- Font -->
        <div id='fontCont'>
        <div style='margin: 5px 0 10px;'>
          <div style='width: 100%; margin-top: -9px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
          <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>FONT</span>
        </div>
        <div id='divFontFamily' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 30%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <select id='fontFamilyText' style='font-size: 14px; background-color: var(--primary); font-family: Inter;' placeHolder='Font Family' class="mdl-textfield__input" type="text" id="sample3">
          </select>
          <label class="mdl-textfield__label" for="sample3">Font Family</label>
        </div>
        <div id='divFontSize' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 30%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='fontSizeText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Font Size">
          <label class="mdl-textfield__label" for="sample3">Font Size</label>
        </div>
        <div id='divFontWeight' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 30%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='fontWeightText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Font Weight">
          <label class="mdl-textfield__label" for="sample3">Font Weight</label>
        </div>
        <div id='divLetterSpacing' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 49%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='letterSpacingText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Letter Spacing">
          <label class="mdl-textfield__label" for="sample3">Letter Spacing</label>
        </div>
        <div id='divLineHeight' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 49%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='lineHeightText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Line Height">
          <label class="mdl-textfield__label" for="sample3">Line Height</label>
        </div>
        <div id='divTextAlign' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <div style='width: 100%; text-align: center; margin-top: -20px;'>
            <div onclick='document.getElementById("textAlignText").value = "left";' name='left' class='button' style='padding: 10px 10px;'><span style='font-family: Material Icons; font-size: 20px;'>format_align_left</span></div>
            <div onclick='document.getElementById("textAlignText").value = "center";' name='center' class='button' style='padding: 10px 10px;'><span style='font-family: Material Icons; font-size: 20px;'>format_align_center</span></div>
            <div onclick='document.getElementById("textAlignText").value = "right";' name='right' class='button' style='padding: 10px 10px;'><span style='font-family: Material Icons; font-size: 20px;'>format_align_right</span></div>
            <div onclick='document.getElementById("textAlignText").value = "justify";' name='justify' class='button' style='padding: 10px 10px;'><span style='font-family: Material Icons; font-size: 20px;'>format_align_justify</span></div>
          </div>
          <div style='display: none;'>
            <input id='textAlignText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder=" ">
            <input id='justifyContentOuterText' style='display: none; font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder=" ">
            <input id='flexGrowText' style='display: none; font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder=" ">
            <input id='alignItemsText' style='display: none; font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder=" ">
            <label class="mdl-textfield__label" for="sample3">Text Align</label>
          </div>
        </div>
        </div>

        <!-- Color -->
        <div id='colorCont'>
        <div style='margin: 5px 0 10px;'>
          <div style='width: 100%; margin-top: -11px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
          <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>COLOR</span>
        </div>
        <div id='divBackground' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 60%; vertical-align: middle;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='backgroundText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Background">
          <label class="mdl-textfield__label" for="sample3">Background</label>
        </div>
        <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 25%; text-align: center; vertical-align: middle;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input type="color" id="backgroundView" onchange="changeColor('background');" value="#060D17">
        </div>
        <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 5%; text-align: center; display: inline-block; vertical-align: middle;'>
          <p onclick="expandColor('backgroundExpand');" class="button" style="color: rgb(255, 255, 255, .6); font-size: 14px; padding: 6px; margin: 0; border-radius: 50px;">
            <span style="font-size: 20px; font-family: Material Icons; padding-right: 16; display: inline-block; transition: .3s; padding: 0;">
              expand_more
            </span>
          </p>
        </div>

        <div id='backgroundSlideCont' style='width: 80%; margin-top: -10px; margin-bottom: 15px;'>
          <input oninput='changeRgb(event, "background");' class="mdl-slider mdl-js-slider" id='backgroundSlide' type="range" min="0" max="100" value="0">
        </div>

        <div id='backgroundExpand' class='blur-in' style='display: none; width: 100%; background-color: rgb(255, 255, 255, .1); border-radius: 7px; margin-top: -5px; margin-bottom: 15px; padding: 4px 4px 7px 4px; user-select: none;'>
        </div>

        <div id='divColor' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 60%; vertical-align: middle;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='colorText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Color">
          <label class="mdl-textfield__label" for="sample3">Color</label>
        </div>
        <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 25%; text-align: center; vertical-align: middle;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input type="color" id="colorView" onchange="changeColor('color');" value="#060D17">
        </div>
        <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 5%; text-align: center; display: inline-block; vertical-align: middle;'>
          <p onclick="expandColor('colorExpand');" class="button" style="color: rgb(255, 255, 255, .6); font-size: 14px; padding: 6px; margin: 0; border-radius: 50px;">
            <span style="font-size: 20px; font-family: Material Icons; padding-right: 16; display: inline-block; transition: .3s; padding: 0;">
              expand_more
            </span>
          </p>
        </div>

        <div id='colorSlideCont' style='width: 80%; margin-top: -10px; margin-bottom: 15px;'>
          <input oninput='changeRgb(event, "color");' class="mdl-slider mdl-js-slider" id='colorSlide' type="range" min="0" max="100" value="0">
        </div>
        </div>

        <div id='colorExpand' class='blur-in' style='display: none; width: 100%; background-color: rgb(255, 255, 255, .1); border-radius: 7px; margin-top: -px; margin-bottom: 30px; padding: 4px 4px 7px 4px; user-select: none;'>
        </div>

        <!-- Border -->
        <div id ='borderCont'>
        <div style='margin: 5px 0 10px;'>
          <div style='width: 100%; margin-top: -9px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
          <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>BORDER</span>
        </div>
        <div id='divBorderSize' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 30%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='borderSizeText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Size">
          <label class="mdl-textfield__label" for="sample3">Size</label>
        </div>
        <div id='divBorderStyle' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 30%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <select id='borderStyleText' style='font-size: 14px; background-color: var(--primary); font-family: Inter;' class="mdl-textfield__input" type="text" id="sample3">
            <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>none</option>
            <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>solid</option>
            <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>dotted</option>
            <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>double</option>
            <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>dashed</option>
          </select>
          <label class="mdl-textfield__label" for="sample3">Style</label>
        </div>
        <div id='divBorderRadius' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 30%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='borderRadiusText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Radius">
          <label class="mdl-textfield__label" for="sample3">Radius</label>
        </div>
        <div id='divBorderColor' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 60%; vertical-align: middle;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='borderColorText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Border Color">
          <label class="mdl-textfield__label" for="sample3">Border Color</label>
        </div>
        <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 25%; text-align: center; vertical-align: middle;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input type="color" id="borderColorView" onchange="changeColor('borderColor');" value="#060D17">
        </div>
        <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 5%; text-align: center; display: inline-block; vertical-align: middle;'>
          <p onclick="expandColor('borderColorExpand');" class="button" style="color: rgb(255, 255, 255, .6); font-size: 14px; padding: 6px; margin: 0; border-radius: 50px;">
            <span style="font-size: 20px; font-family: Material Icons; padding-right: 16; display: inline-block; transition: .3s; padding: 0;">
              expand_more
            </span>
          </p>
        </div>

        <div id='borderSlideCont' style='width: 80%; margin-top: -10px; margin-bottom: 15px;'>
          <input oninput='changeRgb(event, "border");' class="mdl-slider mdl-js-slider" id='borderColorSlide' type="range" min="0" max="100" value="0">
        </div>
      </div>

      <div id='borderColorExpand' class='blur-in' style='display: none; width: 100%; background-color: rgb(255, 255, 255, .1); border-radius: 7px; margin-top: -5px; margin-bottom: 30px; padding: 4px 4px 7px 4px; user-select: none;'>
      </div>

        <!-- Image -->
        <div id ='imageCont'>
        <div style='margin: 5px 0 10px;'>
          <div style='width: 100%; margin-top: -9px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
          <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>IMAGE</span>
        </div>
        <div id='divImageUrl' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 85%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='imageUrlText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Url">
          <label class="mdl-textfield__label" for="sample3">Url</label>
        </div>
        <div style='width: 10%; text-align: center; margin: 15px 0 15px 0; display: inline-block; vertical-align: middle;'>
              <p onclick='openHeadLink("imageManager"); typeAddingImage = null; loadTabellaImages();' class="button" style='color: rgb(255, 255, 255, .6); font-size: 14px; padding: 6px; margin: 0; border-radius: 50px;'>
                <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; display: inline-block; transition: .3s; padding: 0;'>
                  more_horiz
                </span>
            </p>

        </div>
        <div id='divImageSize' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 30%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <select id='imageSizeText' style='font-size: 14px; background-color: var(--primary); font-family: Inter;' class="mdl-textfield__input" type="text" id="sample3">
            <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>auto</option>
            <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>cover</option>
            <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>contain</option>
          </select>
          <label class="mdl-textfield__label" for="sample3">Size</label>
        </div>
        <div id='divImagePosition' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 30%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='imagePositionText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Position">
          <label class="mdl-textfield__label" for="sample3">Position</label>
        </div>
        <div id='divImageRepeat' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 30%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <select id='imageRepeatText' style='font-size: 14px; background-color: var(--primary); font-family: Inter;' class="mdl-textfield__input" type="text" id="sample3">
            <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>no-repeat</option>
            <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>repeat</option>
          </select>
          <label class="mdl-textfield__label" for="sample3">Repeat</label>
        </div>
      </div>


      </div>


    </div>

        <div class="mdl-tooltip" data-mdl-for="deleteButt">Delete (canc)</div> <!-- Delete tooltip -->

      </div>

  </div>


  <div id='ombra' style='width: 100%; height: 100%; position: fixed; background-color: rgb(0, 0, 0, .7); z-index: 1000; display: none;'>

    <!-- CUSTOM THEME -->

    <div class="mdl-tooltip" data-mdl-for="spanExport">Export Theme</div> <!-- Export tooltip -->
    <div class="mdl-tooltip" data-mdl-for="spanImport">Import Theme</div> <!-- Import tooltip -->
    <div class="mdl-tooltip" data-mdl-for="spanRestore">Restore Theme</div> <!-- Restore tooltip -->

    <div id='customTheme' style='display: none;' class='popupFull'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          colorize</i></span>Customize Theme

            <span id='closeTheme' style='float: right; margin-right: 20px; margin-top: 2px;'><button id='closeTheme' class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openHeadLink("customTheme");'>
                <i id='closeTheme' class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
            </button></span>

            <p id='spanExport' onclick='exportTheme();' class="button" style='font-size: 15px; color: rgb(255, 255, 255, .6);position: absolute; right: 100px; margin-top: -58px;'>
              <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
                exit_to_app
              </span>
              <span style='font-size: 14px;'>Export</span>
            </p>

            <label for="import"><p id='spanImport' class="button" style='font-size: 15px; color: rgb(255, 255, 255, .6);position: absolute; right: 250px; margin-top: -58px;'>
              <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
                system_update_alt
              </span>
              <span style='font-size: 14px;'>Import</span>
            </p></label>

          <input type="file" id="import" onchange="importTheme(event, this);" accept=".css" hidden/>

          <p id='spanRestore' onclick='restoreTheme();' class="button" style='font-size: 15px; color: rgb(255, 255, 255, .6);position: absolute; right: 400px; margin-top: -58px;'>
            <span style='font-size: 21px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
              settings_backup_restore
            </span>
            <span style='font-size: 14px;'>Restore</span>
          </p>
        </p>

        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>

      <div style='position: absolute; height: calc(100% - 67px); width: 100%; margin-top: -10px;'>
        <div style='height: 100%; width: 15%; border-right: 1px solid rgb(200, 200, 200, .2); display: inline-block; vertical-align: middle;'>
          <div id='contElemCustomise' style='height: 95%; width: 100%; overflow: hidden auto;'>
          </div>
        </div>
        <div id='contCustomElem' style='position: absolute; height: 100%; width: 80%; vertical-align: middle; display: none;'>
          <div style='position: absolute; width: 40%; height: 90%; margin: 2.5%; vertical-align: middle;'>
            <div id='contCustomThemeElementOUTER' style='position: absolute; width: 100%; height: 100%; background-color: var(--white_board); border-radius: 14px;'>
            </div>

            <div id='contCustomThemeElement' style='position: absolute; width: calc(100% - 20px); height: calc(100% - 20px); top: 10px; left: 10px; background-color: var(--white_board); overflow: auto;'>

              <div onclick='toggleColorTheme(this);' class='buttonMaterial' style='color: rgb(30, 30, 30); position: absolute; top: 0; right: 0; font-family: Material Icons; font-size: 25px; padding: 6px; border-radius: 900px;'>
                brightness_6
              </div>

              <div id='whiteBoardCustom'>
              </div>
            </div>
        </div>
          <div style='position: absolute; width: 58%; height: 92%; margin-left: 47%; margin-top: 2%; overflow-y: auto;'>
            <div style='width: 100%; text-align: center; margin: 15px 0 15px 0;'>

              <div style='position: absolute; width: 90%; height: 90%; top: 5%;'>

                  <!-- Size -->
                  <div style='margin: 5px 0 10px; text-align: left; text-align: left;'>
                    <div style='width: 100%; margin-top: -9px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
                    <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>SIZE</span>
                  </div>
                  <div id='divWidth' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 39%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='widthTextCustomize' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Width">
                    <label class="mdl-textfield__label" for="sample3">Width</label>
                  </div>
                  <div id='divHeight' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 39%; margin-left: 20%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='heightTextCustomize' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Height">
                    <label class="mdl-textfield__label" for="sample3">Height</label>
                  </div>

                  <!-- <div id='divPositionAlign' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <div style='width: 100%; text-align: center; margin-top: -20px; margin-bottom: 10px;'>
                      <div id='buttPos' onclick='setPosition("fit-width");' class='button' style='padding: 10px 10px; margin-right: 10px; transform: rotate(90deg);'><span id='spanPos' style='font-family: Material Icons; font-size: 20px;'>expand</span></div>
                      <div id='buttPos' onclick='setPosition("fit-height");' class='button' style='padding: 10px 10px; margin-right: 10px;'><span id='spanPos' style='font-family: Material Icons; font-size: 20px;'>expand</span></div>
                      <div id='buttPos' onclick='setPosition("aspect-ratio");' class='button' style='padding: 10px 10px; margin-right: 10px;'><span id='spanPos' style='font-family: Material Icons; font-size: 20px;'><span id="aspect">aspect_ratio</span></span></div>
                    </div>
                  </div> -->

                  <div class="mdl-tooltip" data-mdl-for="aspect">Aspect Ratio (Shift + A)</div> <!-- Aspect ratio tooltip -->

                  <!-- Padding -->
                  <div style='margin: 5px 0 10px; text-align: left;'>
                    <div style='width: 100%; margin-top: -9px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
                    <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>PADDING</span>
                  </div>
                  <div id='divPaddingTop' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 24%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='paddingTopTextCustomize' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Top">
                    <label class="mdl-textfield__label" for="sample3">Top</label>
                  </div>
                  <div id='divPaddingLeft' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 24%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='paddingLeftTextCustomize' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Left">
                    <label class="mdl-textfield__label" for="sample3">Left</label>
                  </div>
                  <div id='divPaddingBottom' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 24%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='paddingBottomTextCustomize' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Bottom">
                    <label class="mdl-textfield__label" for="sample3">Bottom</label>
                  </div>
                  <div id='divPaddingRight' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 23%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='paddingRightTextCustomize' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Right">
                    <label class="mdl-textfield__label" for="sample3">Right</label>
                  </div>

                  <!-- Font -->
                  <div style='margin: 10px 0 10px; text-align: left;'>
                    <div style='width: 100%; margin-top: -9px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
                    <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>FONT</span>
                  </div>
                  <div id='divFontFamily' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 32%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <select onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='fontFamilyTextCustomize' style='font-size: 14px; background-color: var(--primary); font-family: Inter;' placeHolder='Font Family' class="mdl-textfield__input" type="text" id="sample3">
                    </select>
                    <label class="mdl-textfield__label" for="sample3">Font Family</label>
                  </div>
                  <div id='divFontSize' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 32%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='fontSizeTextCustomize' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Font Size">
                    <label class="mdl-textfield__label" for="sample3">Font Size</label>
                  </div>
                  <div id='divFontWeight' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 32%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='fontWeightTextCustomize' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Font Weight">
                    <label class="mdl-textfield__label" for="sample3">Font Weight</label>
                  </div>
                  <div id='divLetterSpacing' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 49%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='letterSpacingTextCustomize' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Letter Spacing">
                    <label class="mdl-textfield__label" for="sample3">Letter Spacing</label>
                  </div>
                  <div id='divLineHeight' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 49%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='lineHeightTextCustomize' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Line Height">
                    <label class="mdl-textfield__label" for="sample3">Line Height</label>
                  </div>
                  <div id='divTextCustomizeAlign' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <div style='width: 100%; text-align: center; margin-top: -20px;'>
                      <div onclick='document.getElementById("textAlignTextCustomize").value = "left"; checkAlignTheme(); applyCustomCSSTheme("textCSSCustom", customClass, "0");' name='leftCustomize' class='button' style='padding: 10px 10px;'><span style='font-family: Material Icons; font-size: 20px;'>format_align_left</span></div>
                      <div onclick='document.getElementById("textAlignTextCustomize").value = "center"; checkAlignTheme(); applyCustomCSSTheme("textCSSCustom", customClass, "0");' name='centerCustomize' class='button' style='padding: 10px 10px;'><span style='font-family: Material Icons; font-size: 20px;'>format_align_center</span></div>
                      <div onclick='document.getElementById("textAlignTextCustomize").value = "right"; checkAlignTheme(); applyCustomCSSTheme("textCSSCustom", customClass, "0");' name='rightCustomize' class='button' style='padding: 10px 10px;'><span style='font-family: Material Icons; font-size: 20px;'>format_align_right</span></div>
                      <div onclick='document.getElementById("textAlignTextCustomize").value = "justify"; checkAlignTheme(); applyCustomCSSTheme("textCSSCustom", customClass, "0");' name='justifyCustomize' class='button' style='padding: 10px 10px;'><span style='font-family: Material Icons; font-size: 20px;'>format_align_justify</span></div>
                    </div>
                    <div style='display: none;'>
                      <input onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='textAlignTextCustomize' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder=" ">
                      <label class="mdl-textfield__label" for="sample3">Text Align</label>
                    </div>
                  </div>

                  <!-- Color -->
                  <div style='margin: 5px 0 10px; text-align: left;'>
                    <div style='width: 100%; margin-top: -9px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
                    <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>COLOR</span>
                  </div>
                  <div id='divBackground' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 50%; vertical-align: middle;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='backgroundTextCustomize' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Background">
                    <label class="mdl-textfield__label" for="sample3">Background</label>
                  </div>
                  <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 40%; text-align: center; vertical-align: middle;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                      <input type="color" id="backgroundViewCustomize" onchange="changeColorTheme('background');" value="#060D17">
                  </div>
                  <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 5%; text-align: center; display: inline-block; vertical-align: middle;'>
                    <p onclick="expandColor('backgroundExpandCustomize');" class="button" style="color: rgb(255, 255, 255, .6); font-size: 14px; padding: 6px; margin: 0; border-radius: 50px;">
                      <span style="font-size: 20px; font-family: Material Icons; padding-right: 16; display: inline-block; transition: .3s; padding: 0;">
                        expand_more
                      </span>
                    </p>
                  </div>

                  <div id='backgroundSlideContCustomize' style='width: 80%; margin-top: -10px; margin-bottom: 15px;'>
                    <input onchange='changeRgb(event, "background");' class="mdl-slider mdl-js-slider" id='backgroundSlideCustomize' type="range" min="0" max="100" value="0">
                  </div>

                  <div id='backgroundExpandCustomize' class='blur-in' style='display: none; width: 100%; background-color: rgb(255, 255, 255, .1); border-radius: 7px; margin-top: -5px; margin-bottom: 15px; padding: 4px 4px 7px 4px; user-select: none; text-align: left;'>
                  </div>

                  <div id='divColor' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 50%; vertical-align: middle;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='colorTextCustomize' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Color">
                    <label class="mdl-textfield__label" for="sample3">Color</label>
                  </div>
                  <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 40%; text-align: center; vertical-align: middle;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input type="color" id="colorViewCustomize" onchange="changeColorTheme('color');" value="#060D17">
                  </div>
                  <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 5%; text-align: center; display: inline-block; vertical-align: middle;'>
                    <p onclick="expandColor('colorExpandCustomize');" class="button" style="color: rgb(255, 255, 255, .6); font-size: 14px; padding: 6px; margin: 0; border-radius: 50px;">
                      <span style="font-size: 20px; font-family: Material Icons; padding-right: 16; display: inline-block; transition: .3s; padding: 0;">
                        expand_more
                      </span>
                    </p>
                  </div>

                  <div id='colorSlideContCustomize' style='width: 80%; margin-top: -10px; margin-bottom: 15px;'>
                    <input onchange='changeRgb(event, "color");' class="mdl-slider mdl-js-slider" id='colorSlideCustomize' type="range" min="0" max="100" value="0">
                  </div>

                  <div id='colorExpandCustomize' class='blur-in' style='display: none; width: 100%; background-color: rgb(255, 255, 255, .1); border-radius: 7px; margin-top: -5px; margin-bottom: 30px; padding: 4px 4px 7px 4px; user-select: none; text-align: left;'>
                  </div>

                  <!-- Border -->
                  <div style='margin: 9px 0 10px; text-align: left;'>
                    <div style='width: 100%; margin-top: -9px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
                    <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>BORDER</span>
                  </div>
                  <div id='divBorderSize' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 30%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='borderSizeTextCustomize' style='font-size: 14px; padding-left: 5px; height: 35px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Size">
                    <label class="mdl-textfield__label" for="sample3">Size</label>
                  </div>
                  <div id='divBorderStyle' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 30%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <select onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='borderStyleTextCustomize' style='font-size: 14px; background-color: var(--primary); height: 35px; font-family: Inter;' class="mdl-textfield__input" type="text" id="sample3">
                      <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>none</option>
                      <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>solid</option>
                      <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>dotted</option>
                      <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>double</option>
                      <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>dashed</option>
                    </select>
                    <label class="mdl-textfield__label" for="sample3">Style</label>
                  </div>
                  <div id='divBorderRadius' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 30%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='borderRadiusTextCustomize' style='font-size: 14px; padding-left: 5px; height: 35px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Radius">
                    <label class="mdl-textfield__label" for="sample3">Radius</label>
                  </div>
                  <div id='divBorderColor' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 50%; vertical-align: middle;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='borderColorTextCustomize' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Color">
                    <label class="mdl-textfield__label" for="sample3">Color</label>
                  </div>
                  <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 40%; text-align: center; vertical-align: middle;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input type="color" id="borderColorViewCustomize" onchange="changeColorTheme('borderColor');" value="#060D17">
                  </div>
                  <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 5%; text-align: center; display: inline-block; vertical-align: middle;'>
                    <p onclick="expandColor('borderColorExpandCustomize');" class="button" style="color: rgb(255, 255, 255, .6); font-size: 14px; padding: 6px; margin: 0; border-radius: 50px;">
                      <span style="font-size: 20px; font-family: Material Icons; padding-right: 16; display: inline-block; transition: .3s; padding: 0;">
                        expand_more
                      </span>
                    </p>
                  </div>

                  <div id='borderSlideContCustomize' style='width: 80%; margin-top: -10px; margin-bottom: 15px;'>
                    <input onchange='changeRgb(event, "border");' class="mdl-slider mdl-js-slider" id='borderColorSlideCustomize' type="range" min="0" max="100" value="0">
                  </div>

                  <div id='borderColorExpandCustomize' class='blur-in' style='display: none; width: 100%; background-color: rgb(255, 255, 255, .1); border-radius: 7px; margin-top: -5px; margin-bottom: 30px; padding: 4px 4px 7px 4px; user-select: none; text-align: left;'>
                  </div>

                  <!-- Image -->
                  <div style='margin: 5px 0 0; text-align: left;'>
                    <div style='width: 100%; margin-top: -9px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
                    <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>IMAGE</span>
                  </div>
                  <div id='divImageUrl' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='imageUrlTextCustomize' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Url">
                    <label class="mdl-textfield__label" for="sample3">Url</label>
                  </div>
                  <div id='divImageSize' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 32%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <select onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='imageSizeTextCustomize' style='font-size: 14px; background-color: var(--primary); height: 35px; font-family: Inter;' class="mdl-textfield__input" type="text" id="sample3">
                      <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>auto</option>
                      <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>cover</option>
                      <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>contain</option>
                    </select>
                    <label class="mdl-textfield__label" for="sample3">Size</label>
                  </div>
                  <div id='divImagePosition' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 32%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='imagePositionTextCustomize' style='font-size: 14px; padding-left: 5px; height: 35px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Position">
                    <label class="mdl-textfield__label" for="sample3">Position</label>
                  </div>
                  <div id='divImageRepeat' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 32%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <select onfocusout='applyCustomCSSTheme("textCSSCustom", customClass, "0");' id='imageRepeatTextCustomize' style='font-size: 14px; background-color: var(--primary); height: 35px; font-family: Inter;' class="mdl-textfield__input" type="text" id="sample3">
                      <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>no-repeat</option>
                      <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>repeat</option>
                    </select>
                    <label class="mdl-textfield__label" for="sample3">Repeat</label>
                  </div>

                </div>

              <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style='display: none; position: fixed; z-index: 5000; top: 0; left: 0; background-color: red; width: 80%; margin: -5px 10%;'>
                <textarea style='height: 80%; color: rgb(255, 255, 255, .6); resize: none; padding: 5px; line-height: 27px; overflow: auto; white-space: nowrap;' class="mdl-textfield__input" type="text" rows= "3" id="textCSSCustom" spellcheck="false"></textarea>
                <label class="mdl-textfield__label" for="sample5">Theme Css</label>
              </div>

              </div>

          </div>

          <div style='display: none; position: absolute; top: 87%; width: 58%; height: 10%; margin-left: 47%; text-align: center;'>
            <p id='applyButtonCssTheme' onclick='applyCustomCSSTheme("textCSSCustom", customClass, "0");' class="button" style='color: rgb(255, 255, 255, .6); font-size: 14px; user-select: none; border: 1px solid rgb(200, 200, 200, .1);'>
              <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
                done
              </span>
              <span style='font-size: 14px;'>Done</span>
            </p>
        </div>

        </div>

        <div id='contFontLink' class='blur-in' style='position: absolute; height: 100%; width: 85%; top: 0; left: 15%; vertical-align: middle; display: none; overflow-y: auto;'>

          <div style='height: calc(100% - 150px); overflow: auto;'>
            <table class='table' id="tableFonts" style='margin-bottom: -20px;'>
            </table>
          </div>

          <div style='position: fixed; width: 100%; left: 0; bottom: 0; padding: 20px 0;'>

            <div style='width: 100%; height: 1px; background-color: rgb(200, 200, 200, .2);'></div>

            <div style='margin: 10px 0 5px 30px;'>
              <div style='font-size: 14px; font-weight: 700; color: rgb(225, 225, 225, .6);'>
                <div style='display: inline-block; vertical-align: middle;'>Insert Font</div>
                <div style='font-size: 12px; font-weight: 400; margin-left: 10px;display: inline-block;  vertical-align: middle; color: rgb(255, 255, 255, .3);'><span style='vertical-align: middle;'>Add only Google Fonts</span>
                    <span id='removeFontLink' onclick='window.open("https://fonts.google.com/", "_blank");' class="button" style='font-size: 16px; font-family: Material Icons; transition: .3s; color: rgb(255, 255, 255, .3); user-select: none; padding: 6px; border-radius: 50%; margin: 0; vertical-align: middle;'>
                      launch
                    </span>
                </div>
              </div>
            </div>

            <div style='display: inline-block; vertical-align: middle; width: calc(92% - 60px); padding: 0 30px 0 30px;'>
                <div style='width: calc(100% - 10px); color: rgb(255, 255, 255, .7); right: 10px; background-color: rgb(100, 100, 100, .2); border-radius: 8px; user-select: none; padding: 15px 20px;'>
                  <input id='fontFamilyLink-add' style='font-size: 14px; padding-left: 5px;' class='mdl-textfield__input' type='text' placeholder='Font Family'>
                </div>
            </div>

            <div style='display: inline-block; vertical-align: middle; width: 7%; text-align: center;'>
              <span onclick='addFont("-add");' class="button" style='margin-left: 10px; font-size: 22px; font-family: Material Icons; transition: .3s; color: rgb(255, 255, 255, .7); background-color: rgb(100, 100, 100, .2); border-radius: 8px; user-select: none; padding: 10px; margin: 0; vertical-align: middle;'>
                add
              </span>
            </div>

          </div>


          <div id='alertDelFontOmbra' style='position: fixed; left: 0%; top: 0%; width: 100%; height: 100%; background-color: rgb(0, 0, 0, .7); display: none;'>

            <div id='alertDeleteFont' style='width: 400px; display: none;' class='popup'>
              <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
                <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
                  warning</i></span>Alert Delete
                <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openAlertDelFont();'>
                    <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
                </button></span>
                </p>
                <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
              </div>

              <div style='padding: 0px 20px 4px 20px;'>
              <p style='color: rgb(255, 255, 255, .6); font-size: 15px;'>Are you sure that you want to delete this font?</p>
              </div>

              <div style='width: 100%; text-align: right; margin: -10px 0 5px 0;'>
                <p onclick='openAlertDelFont();' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 10px; border: 1px solid rgb(200, 200, 200, .1);'>
                  <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
                    close
                  </span>
                  <span style='font-size: 14px;'>Cancel</span>
                </p>

                <p name="applyDelFont" onclick='document.getElementsByClassName(styleName)[1].sheet.deleteRule(this.id); deleteFromArrayFont(this); openFont("text_formatFont Link"); alertFun("Font removed successfully", "green"); openAlertDelFont();' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 30px; border: 1px solid rgb(200, 200, 200, .1);'>
                  <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
                    done
                  </span>
                  <span style='font-size: 14px;'>Yes</span>
                </p>
              </div>
            </div>

          </div>

        </div>

        <div id='contColorPalette' class='blur-in' style='position: absolute; height: 100%; width: 85%; top: 0; left: 15%; vertical-align: middle; display: none; overflow-y: auto;'>

          <div style='height: calc(100% - 10px); overflow: auto;'>
            <table class='table' id="tableColors" style='margin-bottom: -20px;'>
            </table>

            <div id='divEmptyColors' style='width: calc(100% - 2px); text-align: center; margin-top: 0;'>
              <p style='font-size: 14px; color: rgb(255, 255, 255, .4); user-select: none;'>Click the button <span style='font-family: Material Icons; font-size: 20px; position: relative; top: 5px;'>bookmark_add</span> on a color property to create a new color palette</p>
            </div>

          </div>

          <div style='position: fixed; width: 100%; left: 0; bottom: 0; padding: 20px 0; display: none;'>

            <div style='width: 100%; height: 1px; background-color: rgb(200, 200, 200, .2);'></div>

            <div style='margin: 10px 0 5px 30px;'>
              <div style='font-size: 14px; font-weight: 700; color: rgb(225, 225, 225, .6);'>
                <div style='display: inline-block; vertical-align: middle; padding: 7px 0;'>Insert Color Palette</div>
              </div>
            </div>

            <div style='display: inline-block; vertical-align: middle; width: calc(92% - 60px); padding: 0 30px 0 30px;'>
                <div style='width: calc(100% - 10px); color: rgb(255, 255, 255, .7); right: 10px; background-color: rgb(100, 100, 100, .2); border-radius: 8px; user-select: none; padding: 15px 20px;'>
                  <input id='colorName-add' style='font-size: 14px; padding-left: 5px;' class='mdl-textfield__input' type='text' placeholder='Name'>
                  <input id='color-add' style='display: inline-block; font-size: 14px; padding-left: 5px;' value="rgb(0, 0, 0, 1)" class='mdl-textfield__input' type='text' placeholder='Color'>
                </div>
            </div>

            <div style='display: inline-block; vertical-align: middle; width: 7%; text-align: center;'>
              <span onclick='addColor();' class="button" style='margin-left: 10px; font-size: 22px; font-family: Material Icons; transition: .3s; color: rgb(255, 255, 255, .7); background-color: rgb(100, 100, 100, .2); border-radius: 8px; user-select: none; padding: 10px; margin: 0; vertical-align: middle;'>
                add
              </span>
            </div>

          </div>

          <div id='alertDelColorOmbra' style='position: fixed; left: 0%; top: 0%; width: 100%; height: 100%; background-color: rgb(0, 0, 0, .7); display: none;'>

            <div id='alertDeleteColor' style='width: 400px; display: none;' class='popup'>
              <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
                <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
                  warning</i></span>Alert Delete
                <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openAlertDelColor();'>
                    <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
                </button></span>
                </p>
                <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
              </div>

              <div style='padding: 0px 20px 4px 20px;'>
              <p style='color: rgb(255, 255, 255, .6); font-size: 15px;'>Are you sure that you want to delete this color?</p>
              </div>

              <div style='width: 100%; text-align: right; margin: -10px 0 5px 0;'>
                <p onclick='openAlertDelColor();' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 10px; border: 1px solid rgb(200, 200, 200, .1);'>
                  <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
                    close
                  </span>
                  <span style='font-size: 14px;'>Cancel</span>
                </p>

                <p name="applyDelColor" onclick='colorPalette = deleteFromJSON(colorPalette, "colorName", document.getElementById("colorName" + this.id).innerText); setColorPosition(); caricaTabellaColors(); openAlertDelColor(); alertFun("Font removed successfully", "green");' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 30px; border: 1px solid rgb(200, 200, 200, .1);'>
                  <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
                    done
                  </span>
                  <span style='font-size: 14px;'>Yes</span>
                </p>
              </div>
            </div>

          </div> <!-- end alert color -->

        </div> <!-- end color palette -->

      </div>
    </div>

    <!-- CUSTOMIZE CSS -->
    <div id='custCSS' style='width: 500px; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          colorize</i></span>Customize CSS
        <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openHeadLink("custCSS");'>
            <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
        </button></span>
        </p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>

      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style='width: 90%; margin: -5px 5%; margin-bottom: 20px;'>
        <textarea style='height: 150px; color: rgb(255, 255, 255, .3); resize: none; padding: 5px; line-height: 22px; font-size: 15px;' class="mdl-textfield__input" type="text" rows= "3" id="textCSSTheme" spellcheck="false" readonly> </textarea>
        <label class="mdl-textfield__label" for="sample5">Theme Css</label>
      </div>

      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style='width: 90%; margin: -5px 5%;'>
        <textarea style='height: 150px; color: rgb(255, 255, 255, .6); resize: none; padding: 5px; line-height: 22px; font-size: 15px; overflow: auto; white-space: nowrap;' class="mdl-textfield__input" type="text" rows= "3" id="textCSS" spellcheck="false"> </textarea>
        <label class="mdl-textfield__label" for="sample5">Custom Css</label>
      </div>

      <div style='width: 100%; text-align: center; margin: -10px 0 5px 0;'>
        <p id='applyButtonCSS' onclick='applyCustomCSS("textCSS", "." + selectedId.replace(" ", ""), posIndex); openHeadLink("custCSS");' class="button" style='color: rgb(255, 255, 255, .6); border: 1px solid rgb(200, 200, 200, .1);'>
          <span id='applyButtonCSS' style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
            done
          </span>
          <span id='applyButtonCSS' style='font-size: 14px;'>Done</span>
        </p>
      </div>
    </div>

    <!-- INNERTEXT POPUP -->
    <div id='innerTextMore' style='width: 500px; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          text_format</i></span>Inner Text
        <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openInnerText();'>
            <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
        </button></span>
        </p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>

      <div id='contFormatBut' style='margin: 15px 5% 10px; text-align: left;'>
        <div style='display: inline-block; border: 1px solid rgb(255, 255, 255, .1); padding: 12px 5px; border-radius: 8px; margin-right: 8px;'>
          <span onclick='formatText("bold");' class='buttonMaterial' style='color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 21px; vertical-align: middle; padding: 7px; border-radius: 900px; font-weight: 400;'>format_bold</span>
          <span onclick='formatText("italic");' class='buttonMaterial' style='color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 21px; vertical-align: middle; padding: 7px; border-radius: 900px; font-weight: 400;'>format_italic</span>
          <span onclick='formatText("underline");' class='buttonMaterial' style='color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 21px; vertical-align: middle; padding: 7px; border-radius: 900px; font-weight: 400;'>format_underlined</span>
          <span onclick='formatText("strikeThrough");' class='buttonMaterial' style='color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 21px; vertical-align: middle; padding: 7px; border-radius: 900px; font-weight: 400;'>strikethrough_s</span>
        </div>
        <div style='display: inline-block; border: 1px solid rgb(255, 255, 255, .1); padding: 12px 5px; border-radius: 8px;'>
          <span onclick='setUrl();' class='buttonMaterial' style='color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 21px; vertical-align: middle; padding: 7px; border-radius: 900px; font-weight: 400;'>link</span>
          <span class='buttonMaterial' style='color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 21px; vertical-align: middle; padding: 7px; border-radius: 900px; font-weight: 400;'>spa</span>
        </div>
      </div>

      <div style='margin: 15px 5% 5px; background-color: rgb(255, 255, 255, .05); border-radius: 8px; width: calc(90% - 20px); padding: 10px; height: 150px; overflow: auto;'>
        <div id='textAreaInnerText' style='width: 100%; height: 140px; color: rgb(255, 255, 255, .6); line-height: 25px; font-size: 15px;' contenteditable="true"></div>
      </div>

      <p id='whereIcon' style='margin-left: 5%; margin-top: -5px; font-size: 12px; color: rgb(255, 255, 255, .3);'><span style='vertical-align: middle;'>Where can I find the icon name?</span>
          <span id='removeFontLink' onclick='window.open("https://fonts.google.com/icons?selected=Material+Icons", "_blank");' class="button" style='font-size: 18px; font-family: Material Icons; transition: .3s; color: rgb(255, 255, 255, .4); user-select: none; padding: 6px; border-radius: 50%; margin: 0; vertical-align: middle;'>
            launch
          </span>
      </p>

      <div style='width: 100%; text-align: center; margin: -10px 0 5px 0;'>
        <p onclick='applyInnerText(); openInnerText();' class="button" style='color: rgb(255, 255, 255, .6); border: 1px solid rgb(200, 200, 200, .1);'>
          <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
            done
          </span>
          <span style='font-size: 14px;'>Done</span>
        </p>
      </div>
    </div>

    <!-- ALERT DELETE PAGE-->
    <div id='alertDeletePage' style='width: 400px; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          warning</i></span>Alert Delete
        <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openHeadLink("alertDeletePage");'>
            <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
        </button></span>
        </p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>

      <div style='padding: 0px 20px 4px 20px;'>
      <p style='color: rgb(255, 255, 255, .6); font-size: 15px;'>Are you sure that you want to delete this page?</p>
      </div>

      <div style='width: 100%; text-align: right; margin: -10px 0 5px 0;'>
        <p onclick='openHeadLink("alertDeletePage");' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 10px; border: 1px solid rgb(200, 200, 200, .1);'>
          <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
            close
          </span>
          <span style='font-size: 14px;'>Cancel</span>
        </p>

        <p onclick='deletePageFun(); openHeadLink("alertDeletePage");' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 30px; border: 1px solid rgb(200, 200, 200, .1);'>
          <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
            done
          </span>
          <span style='font-size: 14px;'>Yes</span>
        </p>
      </div>
    </div>

    <!-- ALERT DELETE -->
    <div id='alertDelete' style='width: 400px; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          warning</i></span>Alert Delete
        <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openHeadLink("alertDelete");'>
            <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
        </button></span>
        </p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>

      <div style='padding: 0px 20px 4px 20px;'>
      <p style='color: rgb(255, 255, 255, .6); font-size: 15px;'>Are you sure that you want to delete this element?</p>
      </div>

      <div style='width: 100%; text-align: right; margin: -10px 0 5px 0;'>
        <p onclick='openHeadLink("alertDelete");' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 10px; border: 1px solid rgb(200, 200, 200, .1);'>
          <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
            close
          </span>
          <span style='font-size: 14px;'>Cancel</span>
        </p>

        <p onclick='deleteElement(); openHeadLink("alertDelete");' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 30px; border: 1px solid rgb(200, 200, 200, .1);'>
          <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
            done
          </span>
          <span style='font-size: 14px;'>Yes</span>
        </p>
      </div>
    </div>

    <!-- ADD COLOR -->
    <div id='addColorPalette' style='width: 330px; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          palette</i></span>Add palette
        <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openHeadLink("addColorPalette");'>
            <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
        </button></span>
        </p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>

      <div style='text-align: center; padding: 10px 0;'>
        <div id="colorPreview" style='height: 70px; width: 70px; border-radius: 900px; display: inline-block;'></div>
        <div id="backColorPreview" style='height: 68px; width: 68px; border-radius: 900px; background-image: url("immagini/transparency.png"); position: fixed; z-index: -1;'></div>

        <div style='width: calc(90% - 12px); margin-left: 5%; height: 40px; margin-top: 20px; margin-bottom: 20px; background-color: rgb(255, 255, 255, .1); padding: 6px; border-radius: 4px;'>
          <div id='' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; margin-top: -5px;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input id='colorNameText' style='font-size: 14px; padding-left: 5px; letter-spacing: .5px;' class="mdl-textfield__input" type="text" placeholder="Color Name">
            <label class="mdl-textfield__label" for="sample3">Color Name</label>
          </div>
        </div>


        <div style='width: 100%; text-align: center; margin: -15px 0 5px 0;'>
          <p onclick='addColor();' class="button" style='color: rgb(255, 255, 255, .6); border: 1px solid rgb(200, 200, 200, .1);'>
            <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
              done
            </span>
            <span style='font-size: 14px;'>Done</span>
          </p>
        </div>

      </div>

    </div>

    <!-- LOADING -->
    <div id='loading' style='width: 180px; height: 50px; display: none; border-radius: 900px;' class='popup'>
      <div style='position: absolute; top: 50%; transform: translateY(-50%); right: 30px; color: rgb(200, 200, 200, .5); font-size: 15px;'>Loading...</div>
        <div class="lds-ring"><div></div><div></div><div></div></div>
    </div>

    <!-- ALERT NEW PROJECT -->
    <div id='newProject' style='width: 400px; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          drive_file_rename_outline</i></span>New Project
        </p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>

      <div style='width: calc(90% - 12px); margin-left: 5%; height: 40px; margin-top: 30px; margin-bottom: 20px; background-color: rgb(255, 255, 255, .1); padding: 6px; border-radius: 4px;'>
        <div id='' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; margin-top: -5px;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='projectNameText' style='font-size: 14px; padding-left: 5px; letter-spacing: .5px;' class="mdl-textfield__input" type="text" placeholder="Untitled">
          <label class="mdl-textfield__label" for="sample3">Project Name</label>
        </div>
      </div>


      <div style='width: 100%; text-align: right; margin: -10px 0 5px 0;'>
        <p onclick='applyProjectName();' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 30px; border: 1px solid rgb(200, 200, 200, .1);'>
          <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
            done
          </span>
          <span style='font-size: 14px;'>Done</span>
        </p>
      </div>
    </div>

    <!-- GALLERY -->
    <div id='imageManager' style='display: none;' class='popupFull'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          image</i></span>Gallery

          <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="button" style='border-radius: 90px; padding: 4px;' onclick='openHeadLink("imageManager");'>
              <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
          </button></span>

          <label for="openImage">
            <span class='button' style='position: absolute; padding: 4px; font-family: Material Icons; border-radius: 90px; font-size: 24px; right: 100px; top: 17px;'>
              add
            </span>
          </label>
          <input type="file" id="openImage" onclick='this.value = null;' onchange="compress(event, this);" accept="image/*" hidden/>

          <p id='removeImage' onclick='if (document.getElementById("removeImage").classList.toString().includes("disableOrder")) return; noneImage(); openHeadLink("imageManager");' class="button" style='font-size: 15px; color: rgb(255, 255, 255, .6);position: absolute; right: 150px; margin-top: -58px; transition: 0;'>
            <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
              image_not_supported
            </span>
            <span style='font-size: 14px;'>Remove Image</span>
          </p>


        </p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>


      <div id='contTableImages' style='width: 90%; margin: 2% 5%; height: 80%; overflow: auto; text-align: justify;'>

        <div id='tableImages' style='user-select: none; width: 100%; display: flex; justify-content: space-between; flex-wrap: wrap;'>
        </div>

      </div>

    </div>

    <div id='ombraLoading' style='width: 100%; height: 100%; position: fixed; background-color: rgb(0, 0, 0, .7); z-index: 20000; display: none;'>
      <div id='loadingImage' style='width: 180px; height: 50px; display: none; border-radius: 900px;' class='popup'>
        <div style='position: absolute; top: 50%; transform: translateY(-50%); right: 30px; color: rgb(200, 200, 200, .5); font-size: 15px;'>Loading...</div>
          <div class="lds-ring"><div></div><div></div><div></div></div>
      </div>

      <div id='alertDeleteImage' style='width: 400px; display: none;' class='popup'>
        <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
          <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
            warning</i></span>Alert Delete
          <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openDeleteImage();'>
              <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
          </button></span>
          </p>
          <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
        </div>

        <div style='padding: 0px 20px 4px 20px;'>
        <p style='color: rgb(255, 255, 255, .6); font-size: 15px;'>Are you sure that you want to delete this image?</p>
        </div>

        <div style='width: 100%; text-align: right; margin: -10px 0 5px 0;'>
          <p onclick='openDeleteImage();' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 10px; border: 1px solid rgb(200, 200, 200, .1);'>
            <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
              close
            </span>
            <span style='font-size: 14px;'>Cancel</span>
          </p>

          <p onclick='removeImage(idImageDelete); openDeleteImage();' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 30px; border: 1px solid rgb(200, 200, 200, .1);'>
            <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
              done
            </span>
            <span style='font-size: 14px;'>Yes</span>
          </p>
        </div>
      </div>

    </div>

    <!-- ADD ELEMENT -->
    <div id='addElementPopup' style='width: 360px; height: 550px; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          add</i></span>Add Element <span id='spanTitleAddElement' style='display: inline-flex; color: rgb(180, 180, 180, .6); margin-left: 10px;'></span>
        <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openHeadLink("addElementPopup");'>
            <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
        </button></span>
          <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
        </p>
      </div>

    <div style='height: 450px; overflow: auto;'>

      <div class='inlineAdd'>

        <div style='margin: 5px 6% -5px; width: 88%;'>
          <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>UI</span>
        </div>

        <div onclick='openHeadLink("addElementPopup"); openHeadLink("addContainer");' class='button addElemBut'>
          <div style='position: absolute; top: 30%; left: 50%; transform: translate(-50%, -30%); font-size: 25px; color: rgb(240, 240, 240, .7); font-family: Material Icons; user-select: none;'>
            featured_video
          </div>
          <div style='position: absolute; top: 80%; left: 50%; transform: translate(-50%, -80%); width: 100%; text-align: center; font-size: 12px; color: rgb(240, 240, 240, .7); user-select: none;'>
            Container
          </div>
        </div>
        <div onclick='addElements("button"); openHeadLink("addElementPopup");' class='button addElemBut'>
          <div style='position: absolute; top: 30%; left: 50%; transform: translate(-50%, -30%); font-size: 25px; color: rgb(240, 240, 240, .7); font-family: Material Icons; user-select: none;'>
            pin
          </div>
          <div style='position: absolute; top: 80%; left: 50%; transform: translate(-50%, -80%); width: 100%; text-align: center; font-size: 12px; color: rgb(240, 240, 240, .7); user-select: none;'>
            Button
          </div>
        </div>
        <div onclick='clickBoard(); openHeadLink("addElementPopup"); document.getElementById("removeImage").classList.add("disableOrder"); openHeadLink("imageManager"); typeAddingImage = "addImage"; loadTabellaImages();' class='button addElemBut'>
          <div style='position: absolute; top: 30%; left: 50%; transform: translate(-50%, -30%); font-size: 25px; color: rgb(240, 240, 240, .7); font-family: Material Icons; user-select: none;'>
            image
          </div>
          <div style='position: absolute; top: 80%; left: 50%; transform: translate(-50%, -80%); width: 100%; text-align: center; font-size: 12px; color: rgb(240, 240, 240, .7); user-select: none;'>
            Image
          </div>
        </div>
        <div STYLE='DISPLAY: NONE;' onclick='openHeadLink("addElementPopup"); openHeadLink("headerMenu");' class='button addElemBut'>
          <div style='position: absolute; top: 30%; left: 50%; transform: translate(-50%, -30%); font-size: 25px; color: rgb(240, 240, 240, .7); font-family: Material Icons; user-select: none;'>
            menu
          </div>
          <div style='position: absolute; top: 80%; left: 50%; transform: translate(-50%, -80%); width: 100%; text-align: center; font-size: 12px; color: rgb(240, 240, 240, .7); user-select: none;'>
            Menu
          </div>
        </div>
        <div onclick='openHeadLink("addElementPopup"); pagesMode = "Include"; openHeadLink("pagesManager");' class='button addElemBut'>
          <div style='position: absolute; top: 30%; left: 50%; transform: translate(-50%, -30%); font-size: 25px; color: rgb(240, 240, 240, .7); font-family: Material Icons; user-select: none;'>
            note_add
          </div>
          <div style='position: absolute; top: 80%; left: 50%; transform: translate(-50%, -80%); width: 100%; text-align: center; font-size: 12px; color: rgb(240, 240, 240, .7); user-select: none;'>
            Include Page
          </div>
        </div>

      </div>

      <div class='inlineAdd'>

        <!-- <div style='margin: 5px 6% -5px; width: 88%;'>
          <div style='width: 103%; margin-top: 0; margin-bottom: 15px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
          <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>Align</span>
        </div>

        <div onclick='addElements("inliner"); openHeadLink("addElementPopup");' class='button addElemBut'>
          <div style='position: absolute; top: 30%; left: 50%; transform: translate(-50%, -30%); font-size: 25px; color: rgb(240, 240, 240, .7); font-family: Material Icons; user-select: none;'>
            view_week
          </div>
          <div style='position: absolute; top: 80%; left: 50%; transform: translate(-50%, -80%); width: 100%; text-align: center; font-size: 12px; color: rgb(240, 240, 240, .7); user-select: none;'>
            Inliner
          </div>
        </div>
        <div onclick='addElements("box"); openHeadLink("addElementPopup");' class='button addElemBut'>
          <div style='position: absolute; top: 30%; left: 50%; transform: translate(-50%, -30%); font-size: 25px; color: rgb(240, 240, 240, .7); font-family: Material Icons; user-select: none;'>
            crop_5_4
          </div>
          <div style='position: absolute; top: 80%; left: 50%; transform: translate(-50%, -80%); width: 100%; text-align: center; font-size: 12px; color: rgb(240, 240, 240, .7); user-select: none;'>
            Box
          </div>
        </div> -->

        <div style='margin: 10px 6% -5px; width: 88%;'>
          <div style='width: 103%; margin-top: 0; margin-bottom: 15px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
          <span style='color: rgb(255, 255, 255, .6); font-size: 13px; margin-left: 1.5%;'>Text</span>
        </div>

        <div onclick='addElements("a"); openHeadLink("addElementPopup");' class='button addElemBut'>
          <div style='position: absolute; top: 30%; left: 50%; transform: translate(-50%, -30%); font-size: 25px; color: rgb(240, 240, 240, .7); font-family: Material Icons; user-select: none;'>
            link
          </div>
          <div style='position: absolute; top: 80%; left: 50%; transform: translate(-50%, -80%); width: 100%; text-align: center; font-size: 12px; color: rgb(240, 240, 240, .7); user-select: none;'>
            Link Text
          </div>
        </div>
        <div onclick='addElements("p"); openHeadLink("addElementPopup");' class='button addElemBut'>
          <div style='position: absolute; top: 30%; left: 50%; transform: translate(-50%, -30%); font-size: 25px; color: rgb(240, 240, 240, .7); font-family: Material Icons; user-select: none;'>
            format_list_bulleted
          </div>
          <div style='position: absolute; top: 80%; left: 50%; transform: translate(-50%, -80%); width: 100%; text-align: center; font-size: 12px; color: rgb(240, 240, 240, .7); user-select: none;'>
            Text
          </div>
        </div>
        <div onclick='addElements("span"); openHeadLink("addElementPopup");' class='button addElemBut'>
          <div style='position: absolute; top: 30%; left: 50%; transform: translate(-50%, -30%); font-size: 25px; color: rgb(240, 240, 240, .7); font-family: Material Icons; user-select: none;'>
            spa
          </div>
          <div style='position: absolute; top: 80%; left: 50%; transform: translate(-50%, -80%); width: 100%; text-align: center; font-size: 12px; color: rgb(240, 240, 240, .7); user-select: none;'>
            Material Icon
          </div>
        </div>

      </div>

      <div class='inlineAdd'>

        <div style='margin: 10px 6% -5px; width: 88%;'>
          <div style='width: 103%; margin-top: 0; margin-bottom: 15px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
          <span style='color: rgb(255, 255, 255, .6); font-size: 13px; margin-left: 1.5%;'>Input</span>
        </div>

        <div onclick='addElements("input"); openHeadLink("addElementPopup");' class='button addElemBut'>
          <div style='position: absolute; top: 30%; left: 50%; transform: translate(-50%, -30%); font-size: 25px; color: rgb(240, 240, 240, .7); font-family: Material Icons; user-select: none;'>
            text_fields
          </div>
          <div style='position: absolute; top: 80%; left: 50%; transform: translate(-50%, -80%); width: 100%; text-align: center; font-size: 12px; color: rgb(240, 240, 240, .7); user-select: none;'>
            InputBox
          </div>
        </div>
        <div onclick='addElements("textarea"); openHeadLink("addElementPopup");' class='button addElemBut'>
          <div style='position: absolute; top: 30%; left: 50%; transform: translate(-50%, -30%); font-size: 25px; color: rgb(240, 240, 240, .7); font-family: Material Icons; user-select: none;'>
            text_fields
          </div>
          <div style='position: absolute; top: 80%; left: 50%; transform: translate(-50%, -80%); width: 100%; text-align: center; font-size: 12px; color: rgb(240, 240, 240, .7); user-select: none;'>
            Textarea
          </div>
        </div>

        <div style='margin: 5px 6% -5px; width: 88%;'>
          <div style='width: 103%; margin-top: 0; margin-bottom: 15px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
          <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>Layout</span>
        </div>

        <div onclick='openHeadLink("addElementPopup"); openHeadLink("selectRow");' class='button addElemBut'>
          <div style='position: absolute; top: 30%; left: 50%; transform: translate(-50%, -30%); font-size: 25px; color: rgb(240, 240, 240, .7); font-family: Material Icons; user-select: none;'>
            calendar_view_month
          </div>
          <div style='position: absolute; top: 80%; left: 50%; transform: translate(-50%, -80%); width: 100%; text-align: center; font-size: 12px; color: rgb(240, 240, 240, .7); user-select: none;'>
            Row
          </div>
        </div>
        <div onclick='openHeadLink("addElementPopup"); addSection("", "225px");' class='button addElemBut'>
          <div style='position: absolute; top: 25%; left: 50%; transform: translate(-50%, -25%); font-size: 25px; color: rgb(240, 240, 240, .7); font-family: Material Icons; user-select: none;'>
            crop_16_9
          </div>
          <div style='line-height: 14px; position: absolute; top: 85%; left: 50%; transform: translate(-50%, -85%); width: 100%; text-align: center; font-size: 12px; color: rgb(240, 240, 240, .7); user-select: none;'>
            Section<br>
            <div id='spanNextToSection' style='display: flex; font-size: 10px; color: rgb(240, 240, 240, .4); width: 100%;'>next to </div>
          </div>
        </div>

      </div>

      <div class='inlineAdd'>

        <div style='margin: 10px 6% -5px; width: 88%;'>
          <div style='width: 103%; margin-top: 0; margin-bottom: 15px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
          <span style='color: rgb(255, 255, 255, .6); font-size: 13px; margin-left: 1.5%;'>Other</span>
        </div>

        <div onclick='openHeadLink("addElementPopup"); openHeadLink("includeMap");' class='button addElemBut'>
          <div style='position: absolute; top: 30%; left: 50%; transform: translate(-50%, -30%); font-size: 25px; color: rgb(240, 240, 240, .7); font-family: Material Icons; user-select: none;'>
            place
          </div>
          <div style='position: absolute; top: 80%; left: 50%; transform: translate(-50%, -80%); width: 100%; text-align: center; font-size: 12px; color: rgb(240, 240, 240, .7); user-select: none;'>
            Maps
          </div>
        </div>
        <div onclick='addElements("youtubeVideo"); openHeadLink("addElementPopup");' class='button addElemBut'>
          <div style='position: absolute; top: 30%; left: 50%; transform: translate(-50%, -30%); font-size: 25px; color: rgb(240, 240, 240, .7); font-family: Material Icons; user-select: none;'>
            smart_display
          </div>
          <div style='position: absolute; top: 80%; left: 50%; transform: translate(-50%, -80%); width: 100%; text-align: center; font-size: 12px; color: rgb(240, 240, 240, .7); user-select: none;'>
            Youtube Video
          </div>
        </div>

      </div>

    </div>

    </div>

    <!-- LINK -->
    <div id='link' style='width: 400px; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          link</i></span>Link
        <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openHeadLink("link"); closeLink();'>
            <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
        </button></span>
        </p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>

      <div style='width: 90%; margin-left: 5%;'>

        <div id='elementTitle' class='titleLink' style='width: 96%; padding: 10px 2%; background-color: rgb(200, 200, 200, .2); border-radius: 8px; margin-top: 20px;'>
          <span onclick='event.stopPropagation(); selectLinkType("element");' class='buttonMaterial' style='color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-right: 0; padding: 5px; border-radius: 900px;'>check_box_outline_blank</span>
          <span style='font-size: 14px; color: rgb(255, 255, 255, .7); vertical-align: middle;'>Go to element</span>
        </div>
        <div id='elementCont' class='contLink' style='display: none; width: calc(100% - 2px); border: 1px solid rgb(200, 200, 200, .2); border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; margin-bottom: 20px;'>
          <div style='width: 100%; text-align: center;'>

            <p id='goToText' style='font-size: 13px; color: rgb(255, 255, 255, .5); display: none; margin: 15px auto -5px;'><b>Go to: </b></p>

            <p id='' onclick='selectElementLink();' class='button' style='color: rgb(255, 255, 255, .6); border: 1px solid rgb(200, 200, 200, .1);'>
              <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
                ads_click
              </span>
              <span style='font-size: 14px;'>Select element</span>
            </p>
          </div>
        </div>

        <div id='internalTitle' class='titleLink' style='width: 96%; padding: 10px 2%; background-color: rgb(200, 200, 200, .2); border-radius: 8px; margin-top: 20px;'>
          <span onclick='event.stopPropagation(); selectLinkType("internal");' class='buttonMaterial' style='color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-right: 0; padding: 5px; border-radius: 900px;'>check_box_outline_blank</span>
          <span style='font-size: 14px; color: rgb(255, 255, 255, .7); vertical-align: middle;'>Internal page</span>
        </div>
        <div id='internalCont' class='contLink' style='display: none; width: calc(100% - 2px); border: 1px solid rgb(200, 200, 200, .2); border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; margin-bottom: 20px;'>
          <div id='selectPageCont' style='min-height: 20px;'>

          </div>
        </div>

        <div id='externalTitle' class='titleLink' style='width: 96%; padding: 10px 2%; background-color: rgb(200, 200, 200, .2); border-top-left-radius: 8px; border-top-right-radius: 8px; margin-top: 20px;'>
          <span onclick='event.stopPropagation(); selectLinkType("external");' class='buttonMaterial' style='color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-right: 0; padding: 5px; border-radius: 900px;'>check_box</span>
          <span style='font-size: 14px; color: rgb(255, 255, 255, .7); vertical-align: middle;'>External link</span>
        </div>
        <div id='externalCont' class='contLink' style='width: calc(100% - 2px); border: 1px solid rgb(200, 200, 200, .2); border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;'>
          <div style='width: calc(94% - 12px); margin-left: 3%; height: 40px; margin-top: 20px; margin-bottom: 20px; background-color: rgb(255, 255, 255, .1); padding: 6px; border-radius: 4px;'>
            <div id='' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; margin-top: -5px;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input id='linkText' style='font-size: 14px; padding-left: 5px; letter-spacing: .5px;' class="mdl-textfield__input" type="text" placeholder="Link">
              <label class="mdl-textfield__label" for="sample3">Link</label>
            </div>
          </div>
          <p style='margin-top: -5px; margin-left: 3%;'>
            <input onblur='linkType = "new tab_" + this.checked.toString();' type="checkbox" id="openInNewTab" class='checkboxClass'>
            <label for="prova" style='--contentCheck: "Open in new tab";'></label>
          </p>
        </div>

      </div>

      <div style='width: 100%; text-align: right; margin: 10px 0 5px 0;'>
        <p onclick='applyLink();' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 30px; border: 1px solid rgb(200, 200, 200, .1);'>
          <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
            done
          </span>
          <span style='font-size: 14px;'>Done</span>
        </p>
      </div>
    </div>

    <!-- SELECT ROW -->
    <div id='selectRow' style='width: 640px; height: auto; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          calendar_view_month</i></span>Structure
        <span id='closeStructure' style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openHeadLink("selectRow");'>
            <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
        </button></span>
          <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
        </p>
      </div>

      <div style='height: auto; overflow: auto; margin-bottom: 15px;'>

        <div class='inlineAdd' style='width: 97%; margin: 1.5%; text-align: center;'>

          <div id='structure-1' style='height: 50px; width: 90px; margin: 14px 13px; border: none; border-radius: 5px; display: inline-flex; justify-content:space-between; flex-wrap: wrap;' class='addElemBut'>
            <div class='previewStructure'></div>
          </div>
          <div id='structure-2' style='height: 50px; width: 90px; margin: 14px 13px; border: none; border-radius: 5px; display: inline-flex; justify-content:space-between; flex-wrap: wrap;' class='addElemBut'>
            <div class='previewStructure'></div>
            <div class='previewStructure'></div>
          </div>
          <div id='structure-3' style='height: 50px; width: 90px; margin: 14px 13px; border: none; border-radius: 5px; display: inline-flex; justify-content:space-between; flex-wrap: wrap;' class='addElemBut'>
            <div class='previewStructure'></div>
            <div class='previewStructure'></div>
            <div class='previewStructure'></div>
          </div>
          <div id='structure-4' style='height: 50px; width: 90px; margin: 14px 13px; border: none; border-radius: 5px; display: inline-flex; justify-content:space-between; flex-wrap: wrap;' class='addElemBut'>
            <div class='previewStructure'></div>
            <div class='previewStructure'></div>
            <div class='previewStructure'></div>
            <div class='previewStructure'></div>
          </div>
          <div id='structure-5' style='height: 50px; width: 90px; margin: 14px 13px; border: none; border-radius: 5px; display: inline-flex; justify-content:space-between; flex-wrap: wrap;' class='addElemBut'>
            <div class='previewStructure' style='flex-grow: 2;'></div>
            <div class='previewStructure'></div>
          </div>
          <div id='structure-6' style='height: 50px; width: 90px; margin: 14px 13px; border: none; border-radius: 5px; display: inline-flex; justify-content:space-between; flex-wrap: wrap;' class='addElemBut'>
            <div class='previewStructure'></div>
            <div class='previewStructure' style='flex-grow: 2;'></div>
          </div>
          <div id='structure-7' style='height: 50px; width: 90px; margin: 14px 13px; border: none; border-radius: 5px; display: inline-flex; justify-content:space-between; flex-wrap: wrap;' class='addElemBut'>
            <div class='previewStructure'></div>
            <div class='previewStructure'></div>
            <div class='previewStructure' style='flex-grow: 2;'></div>
          </div>
          <div id='structure-8' style='height: 50px; width: 90px; margin: 14px 13px; border: none; border-radius: 5px; display: inline-flex; justify-content:space-between; flex-wrap: wrap;' class='addElemBut'>
            <div class='previewStructure' style='flex-grow: 2;'></div>
            <div class='previewStructure'></div>
            <div class='previewStructure'></div>
          </div>
          <div id='structure-9' style='height: 50px; width: 90px; margin: 14px 13px; border: none; border-radius: 5px; display: inline-flex; justify-content:space-between; flex-wrap: wrap;' class='addElemBut'>
            <div class='previewStructure'></div>
            <div class='previewStructure' style='flex-grow: 2;'></div>
            <div class='previewStructure'></div>
          </div>
          <div id='structure-10' style='height: 50px; width: 90px; margin: 14px 13px; border: none; border-radius: 5px; display: inline-flex; justify-content:space-between; flex-wrap: wrap;' class='addElemBut'>
            <div class='previewStructure'></div>
            <div class='previewStructure' style='flex-grow: 3;'></div>
            <div class='previewStructure'></div>
          </div>

        </div>
      </div>

    </div>

    <!-- CUSTOMIZE HTML -->
    <div id='custHTML' style='width: 500px; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          colorize</i></span>Customize HTML
        <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openHeadLink("custHTML");'>
            <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
        </button></span>
        </p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>

      <div style='width: 40%; padding: 0px 5%; height: 100%; display: inline-block; vertical-align: middle;'>
        <div id='divHref' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; margin-bottom: -10px;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='hrefText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder=" ">
          <label class="mdl-textfield__label" for="sample3">Hyperlink</label>
        </div>
        <div id='divName' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; margin-bottom: -10px;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='nameText1' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder=" ">
          <label class="mdl-textfield__label" for="sample3">Name</label>
        </div>
        <div id='divType' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; margin-bottom: -10px;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='typeText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder=" ">
          <label class="mdl-textfield__label" for="sample3">Type</label>
        </div>

      </div>

      <div style='width: 38%; padding: 0px 5%; height: 100%; display: inline-block; vertical-align: middle;'>
        <div id='divValue' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; margin-bottom: -10px;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <!-- <input id='valueText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder=" "> -->
          <label class="mdl-textfield__label" for="sample3">Value</label>
        </div>
        <div id='divPlaceholder' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; margin-bottom: -10px;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='placeholderText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder=" ">
          <label class="mdl-textfield__label" for="sample3">Placeholder</label>
        </div>
        <div id='divTranslate' style='font-size: 14px; color: rgb(255, 255, 255, .6); margin-left: 5%; width: 40%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <select id='translateText' style='font-size: 14px; background-color: var(--primary); font-family: Inter;' onchange="changedDisplay = true;"  class="mdl-textfield__input" type="text" id="sample3">
            <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>true</option>
            <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>false</option>
          </select>
          <label class="mdl-textfield__label" for="sample3">Translate</label>
        </div>
        <div id='divSpellcheck' style='font-size: 14px; color: rgb(255, 255, 255, .6); margin-left: 5%; width: 40%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <select id='spellcheckText' style='font-size: 14px; background-color: var(--primary); font-family: Inter;' onchange="changedDisplay = true;"  class="mdl-textfield__input" type="text" id="sample3">
            <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>true</option>
            <option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>false</option>
          </select>
          <label class="mdl-textfield__label" for="sample3">Spellcheck</label>
        </div>

      </div>

      <div style='width: 100%; padding: 2% 0%; height: 100%; text-align: center;'>
        <div style='margin: 10px 0px 10px -15px; display: inline-block; vertical-align: middle;'>
          <input type="checkbox" id="readonlyText" style='vertical-align: middle;'>
          <label for="readonlyText" class='labelCheck' style='color: rgb(255, 255, 255, .5); font-size: 13px; cursor: pointer; user-select: none; vertical-align: middle;'>readonly</label>
        </div>
        <div style='margin: 10px 0px 10px -10px; display: inline-block; vertical-align: middle;'>
          <input type="checkbox" id="autofocusText" style='vertical-align: middle;'>
          <label for="autofocusText" class='labelCheck' style='color: rgb(255, 255, 255, .5); font-size: 13px; cursor: pointer; user-select: none; vertical-align: middle;'>autofocus</label>
        </div>
        <div style='margin: 10px 0px 10px -10px; display: inline-block; vertical-align: middle; display: none;'>
          <input type="checkbox" id="checkedText" style='vertical-align: middle;'>
          <label for="checkedText" class='labelCheck' style='color: rgb(255, 255, 255, .5); font-size: 13px; cursor: pointer; user-select: none; vertical-align: middle;'>checked</label>
        </div>
        <div style='margin: 10px 0px 10px -10px; display: inline-block; vertical-align: middle;'>
          <input type="checkbox" id="requiredText" style='vertical-align: middle;'>
          <label for="requiredText" class='labelCheck' style='color: rgb(255, 255, 255, .5); font-size: 13px; cursor: pointer; user-select: none; vertical-align: middle;'>required</label>
        </div>
        <div style='margin: 10px 0px 10px -10px; display: inline-block; vertical-align: middle;'>
          <input type="checkbox" id="hiddenText" style='vertical-align: middle;'>
          <label for="hiddenText" class='labelCheck' style='color: rgb(255, 255, 255, .5); font-size: 13px; cursor: pointer; user-select: none; vertical-align: middle;'>hidden</label>
        </div>
      </div>


      <div style='width: 100%; text-align: center; margin: -10px 0 5px 0;'>
        <p id='applyButtonHTML' onclick='setHTMLProperties(); openHeadLink("custHTML");' class="button" style='color: rgb(255, 255, 255, .6); border: 1px solid rgb(200, 200, 200, .1);'>
          <span id='applyButtonCSS' style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
            done
          </span>
          <span style='font-size: 14px;'>Done</span>
        </p>
      </div>
    </div>

    <!-- PROJECT SETTINGS -->
    <div id='projectSettings' style='width: 450px; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          settings</i></span>Project Settings
        <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openHeadLink("projectSettings");'>
            <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
        </button></span>
        </p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>

      <div style='height: 450px; padding: 0 15px; overflow: auto;'>
        <div style='text-align: center; padding: 20px 10px;'>

          <div style='display: inline-block; vertical-align: middle;'>
            <div class='faviconProject' style='width: 100px; height: 100px; border-radius: 900px;'>
              <label style='display: none; color: rgb(255, 255, 255, 0);'>add_photo_alternate</label>
            </div>
          </div>

          <div style='display: inline-block; vertical-align: middle; width: 250px; margin-left: 30px;'>

            <div style='margin: 10px 0; width: calc(100% - 12px); height: 40px; background-color: rgb(255, 255, 255, .1); padding: 6px; border-radius: 4px; display: block;'>
              <div id='divProjectName' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; margin-top: -5px;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input maxlength="30" onblur='projectName = this.value; document.title = projectName + " - Plater";' id='projectNameText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" placeholder='Project Name'>
                <label class="mdl-textfield__label" for="sample3">Project Name</label>
              </div>
            </div>

            <div style='margin: 10px 0; width: calc(100% - 12px); height: 40px; background-color: rgb(255, 255, 255, .1); padding: 6px; border-radius: 4px; display: block;'>
              <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; margin-top: -5px;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input onblur='author = this.value;' id='authorText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" placeholder='Author'>
                <label class="mdl-textfield__label" for="sample3">Author</label>
              </div>
            </div>

          </div>

          <div style='margin: 20px 0; width: calc(100% - 12px); height: 40px; background-color: rgb(255, 255, 255, .1); padding: 6px; border-radius: 4px; display: block;'>
            <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; margin-top: -5px;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input onblur='keywords = this.value;' id='keywordsText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" placeholder="Keywords (es. Televison, Video Games, Film)">
              <label class="mdl-textfield__label" for="sample3">Keywords</label>
            </div>
          </div>

          <div style='margin: 20px 0; width: calc(100% - 12px); height: 77px; background-color: rgb(255, 255, 255, .1); padding: 6px; border-radius: 4px; display: block;'>
            <div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%; margin-top: -5px;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <textarea onblur='description = this.value.replaceAll("\n", " "); this.value = description;' id='descriptionText' style='font-size: 14px; padding-left: 5px; resize: none; height: 60px;' class="mdl-textfield__input" type="text" placeholder='Description'></textarea>
              <label class="mdl-textfield__label" for="sample3">Description</label>
            </div>
          </div>

          <p style='margin-top: 30px;'>
            <input onblur='incorporatesCSS = this.checked;' type="checkbox" id="incorporatesCSS" class='checkboxClass'>
            <label for="prova" style='--contentCheck: "Incorporates CSS";'></label>
          </p>

        </div>
      </div>

    </div>


    <!-- HEADER MENU -->
    <div id='headerMenu' style='width: 400px; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          menu</i></span>Header Menu
        <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='tempARRAYmenu = []; document.getElementById("listMenu").innerHTML = ""; document.getElementById("noElementsMenu").style.display = null; openHeadLink("headerMenu");'>
            <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
        </button></span>
        </p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>

      <div style='margin: 10px 0 10px;'>

        <!-- no elements -->
        <div id='noElementsMenu' class='menuListItem' style='transition: .3s; width: 80%; margin: 10px auto; padding: 10px 0 0; user-select: none; font-size: 14px; color: rgb(255, 255, 255, .2); text-align: center;'>
          No Elements
        </div>

        <div id='listMenu' style='max-height: 130px; overflow: auto;'>

          <!-- <div class='menuListItem' style='transition: .3s; width: 80%; margin: 10px auto; border: 1px solid rgb(200, 200, 200, .1); border-radius: 5px; padding: 10px 12px; cursor: pointer; user-select: none; display: flex; justify-content:space-between;'>
            <div>
              <span style='font-size: 13px; color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 5px; vertical-align: middle;'>circle</span>
              <span style='font-size: 13px; color: rgb(255, 255, 255, .7); vertical-align: middle; margin-left: 5px;'>H</span>
            </div>
            <div>
              <span class='buttonMaterial' style='font-size: 13px; color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-right: 5px; padding: 5px; border-radius: 900px;'>link</span>
              <span class='buttonMaterial' style='font-size: 13px; color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-right: -5px; padding: 5px; border-radius: 900px;'>remove</span>
            </div>
          </div> -->

        </div>



        <!-- Add -->
        <hr style='width: 90%; margin: 0.5em 5%; border-color: rgb(255, 255, 255, .1);'>
        <div class='menuListItem' style='transition: .3s; width: 80%; margin: 10px auto; border: 1px solid rgb(200, 200, 200, 0); background-color: rgb(200, 200, 200, .1); border-radius: 5px; padding: 8px 12px; user-select: none;'>
          <div style='width: 91%; display: inline-block; vertical-align: middle; margin-top: -4px; margin-bottom: -20px;'>
              <div id='divNameMenu' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 90%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input id='nameMenuText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Name">
                <label class="mdl-textfield__label" for="sample3">Name</label>
              </div>
          </div>
          <div style='width: 7%; display: inline-block; vertical-align: middle; text-align: right; margin-top: 2px;'>
            <span onclick='addMenuElement(this);' class='buttonMaterial' style='font-size: 13px; color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 18px; line-height: 0px; vertical-align: middle; margin-right: -5px; margin-top: -1px; padding: 5px; border-radius: 900px;'>add</span>
          </div>
        </div>

      </div>

      <div style='width: 100%; text-align: center; margin: -10px 0 5px 0;'>
        <p id='applyHeader' onclick='addMenu(); openHeadLink("headerMenu");' class="button" style='color: rgb(255, 255, 255, .6); border: 1px solid rgb(200, 200, 200, .1);'>
          <span id='applyHeader' style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
            done
          </span>
          <span style='font-size: 14px;'>Done</span>
        </p>
      </div>

    </div>

    <!-- PAGES MANAGER -->
    <div id='pagesManager' style='width: 460px; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          article</i></span>Pages Manager
        <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openHeadLink("pagesManager"); pagesMode = "Select";'>
            <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
        </button></span>
        </p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>

      <div style='margin: 10px 0 10px;'>

        <div id='listPages' style='max-height: 170px; overflow: auto;'>

          <!-- <div class='pagesListItem' style='transition: .3s; width: 80%; margin: 10px auto; border: 1px solid rgb(200, 200, 200, .1); border-radius: 5px; padding: 10px 12px; cursor: pointer; user-select: none; display: flex; justify-content:space-between;'>
            <div>
              <span style='font-size: 13px; color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 5px; vertical-align: middle;'>circle</span>
              <span style='font-size: 13px; color: rgb(255, 255, 255, .7); vertical-align: middle; margin-left: 5px;'>H</span>
            </div>
            <div>
              <span class='buttonMaterial' style='font-size: 13px; color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-right: 5px; padding: 5px; border-radius: 900px;'>link</span>
              <span class='buttonMaterial' style='font-size: 13px; color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-right: -5px; padding: 5px; border-radius: 900px;'>remove</span>
            </div>
          </div> -->

        </div>



        <!-- Add -->
        <hr id='divisionPages' style='width: 90%; margin: 0.5em 5%; border-color: rgb(255, 255, 255, .1);'>
        <div class='pagesListItem' style='transition: .3s; width: 80%; margin: 10px auto 20px; border: 1px solid rgb(200, 200, 200, 0); background-color: rgb(200, 200, 200, .1); border-radius: 5px; padding: 8px 12px; user-select: none;'>
          <div style='width: 91%; display: inline-block; vertical-align: middle; margin-top: -4px; margin-bottom: -20px;'>
              <div id='divNamePages' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 90%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input id='namePagesText' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Name">
                <label class="mdl-textfield__label" for="sample3">Name</label>
              </div>
          </div>
          <div style='width: 7%; display: inline-block; vertical-align: middle; text-align: right; margin-top: 2px;'>
            <span onclick='addPagesElement(this);' class='buttonMaterial' style='font-size: 13px; color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 18px; line-height: 0px; vertical-align: middle; margin-right: -5px; margin-top: -1px; padding: 5px; border-radius: 900px;'>add</span>
          </div>
        </div>

      </div>

    </div>

    <!-- ADD MAP -->
    <div id='includeMap' style='width: 460px; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          place</i></span>Include Map
        <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openHeadLink("includeMap");'>
            <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
        </button></span>
        </p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>



    </div>

    <!-- ADD CONTAINER -->
    <div id='addContainer' style='width: 400px; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          featured_video</i></span>Container Construct
        <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openHeadLink("addContainer");'>
            <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
        </button></span>
        </p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>

      <div id='contSize' style='width: 90%; margin: 5%;'>
        <!-- Size -->
        <div style='margin: 5px 0 10px; text-align: left;'>
          <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>SIZE</span>
        </div>
        <div id='divWidthConstruct' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 49%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='widthTextConstruct' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Width" value="auto">
          <label class="mdl-textfield__label" for="sample3">Width</label>
        </div>
        <div id='divHeightConstruct' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 49%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='heightTextConstruct' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Height" value="auto">
          <label class="mdl-textfield__label" for="sample3">Height</label>
        </div>
      </div>

      <div id='contBackground' style='width: 90%; margin: 5%;'>
        <!-- Background -->
        <div style='margin: 5px 0 10px; text-align: left;'>
          <div style='width: 100%; margin-top: -9px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
          <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>BACKGROUND</span>
        </div>

        <div id='backgroundConstruct' class='blur-in' style='width: 100%; background-color: rgb(255, 255, 255, .1); border-radius: 7px; margin-top: 0px; margin-bottom: 30px; padding: 4px 4px 7px 4px; user-select: none;'>

          <div id='color_black' class='scale-up-center selectColor' onclick='selectColorConstruct(this);' style='background-color: rgb(0, 0, 0, 1);' data-color='rgb(0, 0, 0, 1)'></div>
          <div id='color_white' class='scale-up-center selectColor' onclick='selectColorConstruct(this);' style='background-color: rgb(255, 255, 255, 1);' data-color='rgb(255, 255, 255, 1)'></div>

          <div style='display: inline-block; vertical-align: middle; height: 30px; width: 1px; background-color: rgb(255, 255, 255, .1); margin: 2px -2px 0 5px;'>
          </div>

          <div id='colorPaletteDivContruct' style='display: inline-block; vertical-align: middle;'>
          </div>

          <input id="backgroundTextConstruct" style='display: none;' />
        </div>

      </div>

      <div id='contPadding' style='width: 90%; margin: 5%;'>
        <!-- Padding -->
        <div style='margin: 5px 0 10px; text-align: left;'>
          <div style='width: 100%; margin-top: -9px; margin-bottom: 10px; height: 1; background-color: rgb(255, 255, 255, .1);'></div>
          <span style='color: rgb(255, 255, 255, .6); font-size: 13px;'>PADDING</span>
        </div>
        <div id='divPaddingTopConstruct' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 23%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='paddingTopTextConstruct' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Top">
          <label class="mdl-textfield__label" for="sample3">Top</label>
        </div>
        <div id='divPaddingLeftConstruct' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 23%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='paddingLeftTextConstruct' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Left">
          <label class="mdl-textfield__label" for="sample3">Left</label>
        </div>
        <div id='divPaddingBottomConstruct' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 23%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='paddingBottomTextConstruct' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Bottom">
          <label class="mdl-textfield__label" for="sample3">Bottom</label>
        </div>
        <div id='divPaddingRightConstruct' style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 23%;' class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input id='paddingRightTextConstruct' style='font-size: 14px; padding-left: 5px;' class="mdl-textfield__input" type="text" id="sample3" placeholder="Right">
          <label class="mdl-textfield__label" for="sample3">Right</label>
        </div>
      </div>

      <div style='width: 100%; text-align: center; margin: -30px auto 10px;'>
        <p onclick='addElements("div"); openHeadLink("addContainer");' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 30px; border: 1px solid rgb(200, 200, 200, .1);'>
          <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
            done
          </span>
          <span style='font-size: 14px;'>Apply</span>
        </p>
      </div>

    </div>

    <!-- ANIMATIONS -->
    <div id='animationsManager' style='width: 400px; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          animation</i></span>Animations
        <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openHeadLink("animationsManager");'>
            <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
        </button></span>
        </p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>

      <div id='listAnimations' style='max-height: 260px; overflow: auto; margin-top: -7px;'>

      </div>

      <hr id='divisionPages' style='width: 90%; margin: 0.5em 5%; border-color: rgb(255, 255, 255, .1);'>

      <div style='width: calc(100% - 30px); text-align: right; padding: 0 20px 10px 10px;'>
        <span onclick='' class="button" style='margin-left: 10px; font-size: 22px; font-family: Material Icons; transition: .3s; color: rgb(255, 255, 255, .7); background-color: rgb(100, 100, 100, .2); border-radius: 8px; user-select: none; padding: 10px; margin: 0; vertical-align: middle;'>
          add
        </span>
      </div>

    </div>

  </div> <!-- div che chiude tutta l'ombra -->

  <div id='alertDelSectionOmbra' style='position: fixed; left: 0%; top: 0%; width: 100%; height: 100%; background-color: rgb(0, 0, 0, .7); display: none;'>

    <div id='alertDeleteSection' style='width: 400px; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          warning</i></span>Alert Delete
        <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openAlertDeleteSection();'>
            <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
        </button></span>
        </p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>

      <div style='padding: 0px 20px 4px 20px;'>
      <p style='color: rgb(255, 255, 255, .6); font-size: 15px; line-height: 24px;'>Are you sure that you want to delete this element?All contained elements will be deleted</p>
      </div>

      <div style='width: 100%; text-align: right; margin: -10px 0 5px 0;'>
        <p onclick='openAlertDeleteSection();' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 10px; border: 1px solid rgb(200, 200, 200, .1);'>
          <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
            close
          </span>
          <span style='font-size: 14px;'>Cancel</span>
        </p>

        <p name="applyDelSection" onclick='removeSection(); alertFun("Element removed successfully", "green"); openAlertDeleteSection();' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 30px; border: 1px solid rgb(200, 200, 200, .1);'>
          <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
            done
          </span>
          <span style='font-size: 14px;'>Yes</span>
        </p>
      </div>
    </div>

  </div>

  <div id='alertDelRowOmbra' style='position: fixed; left: 0%; top: 0%; width: 100%; height: 100%; background-color: rgb(0, 0, 0, .7); display: none;'>

    <div id='alertDeleteRow' style='width: 400px; display: none;' class='popup'>
      <div style='width: 100%; margin: 10 0 10 0; user-select: none;'>
        <p style='color: rgb(255, 255, 255, .6);'><span style='margin: 0 10 20 20; position: relative; line-height: 10px; top: 6px; display: inline-block; transition: .3s; padding: 0;'><i class="material-icons" style='color: rgb(255, 255, 255, .6);'>
          warning</i></span>Alert Delete
        <span style='float: right; margin-right: 20px; margin-top: 2px;'><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick='openAlertDeleteRow();'>
            <i class="material-icons" style='color: rgb(255, 255, 255, .6);'>close</i>
        </button></span>
        </p>
        <div style='width: 100%; height: 1; background-color: rgb(255, 255, 255, .1); margin-top: -10px; margin-bottom: 10px;'></div>
      </div>

      <div style='padding: 0px 20px 4px 20px;'>
      <p style='color: rgb(255, 255, 255, .6); font-size: 15px; line-height: 24px;'>Are you sure that you want to delete this element?All contained elements will be deleted</p>
      </div>

      <div style='width: 100%; text-align: right; margin: -10px 0 5px 0;'>
        <p onclick='openAlertDeleteRow();' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 10px; border: 1px solid rgb(200, 200, 200, .1);'>
          <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
            close
          </span>
          <span style='font-size: 14px;'>Cancel</span>
        </p>

        <p name="applyDelRow" onclick='removeRow(); alertFun("Element removed successfully", "green"); openAlertDeleteRow();' class="button" style='color: rgb(255, 255, 255, .6); margin-right: 30px; border: 1px solid rgb(200, 200, 200, .1);'>
          <span style='font-size: 20px; font-family: Material Icons; padding-right: 16; position: relative; line-height: 10px; top: 4px; display: inline-block; transition: .3s; padding: 0;'>
            done
          </span>
          <span style='font-size: 14px;'>Yes</span>
        </p>
      </div>
    </div>

  </div>

  <div id='alertBox' class='boxShadow' style='position: fixed; bottom: 10px; left: 10px; z-index: 2000; color: rgb(50, 50, 50, 1); border-radius: 10px; padding: 3px 20px; user-select: none; transition: .3s; opacity: 0; pointer-events: none;'>
    <p style='font-size: 15px;'>
      <span id='iconAlertBox' style='font-size: 20px; font-family: Material Icons; margin-right: 20px; position: relative; line-height: 10px; top: 4px; display: inline-block; padding: 0;'>
      </span>
      <label id='testoAlertBox' style='max-width: 250px; white-space: normal; display: inline-block; vertical-align: middle;'></label>
    </p>
  </div>

  <div id='idBox' class='boxShadow' style='position: fixed; z-index: 2000; border-radius: 6px; padding: 5px 5px; user-select: none; transition: .3s opacity; opacity: 0; pointer-events: none; background-color: rgb(253, 230, 203, .9)'>
  </div>

  <div id='activeButtAfterClickPos' class='display: none;'></div>

  <textarea style='display: none;' type="text" rows= "3" id="textCSSDuplicate" spellcheck="false"> </textarea>

  <div id='styleElem' style='display: none;'></div>
  <input id='tempInput' style='display: none;'/>

  </main>

</div>


<?php

if ($_GET['event']) {
  ?>
  <script>
  var eventProject = "<?php echo explode("?",$_REQUEST['event'])[0];?>";
  loadFuncitions(eventProject);
  </script>
  <?php
} else {
  ?>
  <script>
    window.location.href="dashboard.php";
  </script>
  <?php
}

?>

</body>

</html>
