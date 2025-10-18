var selected = false;
var selectedId = "";
var customClass;
var timeOutAlert;
var posIndex = 9;
var changedDisplay = false;
var changedPos = false;
var selectedSectionId;
var displayMode = 'computer';
var edited = false;
var firstClick = false;
var nameElementsJson = [];
var search = false;
var elemState = [];
var imageToUrl = [];
var projectId;
var userId;
var arrayFont = [];
var linksJSON = [];
var linkType = "new tab_false";
var colorPalette = [];
var colorToElement = [];
var animationsJSON = [];
var animationsToElement = [];

window.addEventListener("load", load);
window.addEventListener("resize", aggiustaSelect);

function funzioneChiudi() {
  if (edited && location.hostname !== "localhost") {
    localStorage.removeItem("testo");
    localStorage.removeItem("projectId");
    return "Write something clever here...";
  }
} //end function

function alertFun(testo, colore) {

  clearTimeout(timeOutAlert);

  document.getElementById('testoAlertBox').innerText = testo;
  document.getElementById('alertBox').style.opacity = '1';

  if (colore == 'blue') {
    document.getElementById('alertBox').style.backgroundColor = 'rgb(79, 154, 255, 1)';
    document.getElementById('iconAlertBox').innerText = 'lightbulb';
  }

  if (colore == 'green') {
    document.getElementById('alertBox').style.backgroundColor = 'rgb(133, 232, 55, 1)';
    document.getElementById('iconAlertBox').innerText = 'done';
  }

  if (colore == 'red') {
    document.getElementById('alertBox').style.backgroundColor = 'rgb(252, 107, 107, 1)';
    document.getElementById('iconAlertBox').innerText = 'close';
  }

  timeOutAlert = setTimeout(fun, 2000);
  function fun() {
    document.getElementById('alertBox').style.opacity = '0';
  }

}

function mobileNotSupp() {
  if (window.innerWidth < 768) document.getElementById('mobileNotSupp').style.display = 'block'; else document.getElementById('mobileNotSupp').style.display = 'none';
}

//Delete element

document.addEventListener('keydown', function(event) {

      var keycode = event.keyCode;
      key = String.fromCharCode(keycode);

      // alert(keycode);

      source = event.target;
      exclude = ['input', 'textarea'];

      if(event.keyCode == 122 && event.shiftKey && document.getElementById('ombra').style.display == 'none') { //shift + F11
        fullScreen();
      }

      if(event.keyCode == 113) { //F2
        document.getElementById('windowProperties').scrollTo(0, 0);
        document.getElementById('nameText').select();
      }

      if (selected && exclude.indexOf(source.tagName.toLowerCase()) !== -1 && event.keyCode == 13 && document.getElementById('ombra').style.display == 'none') { //invio set properties
        setProprieties();
        source.blur();
      }

      if(exclude.indexOf(source.tagName.toLowerCase()) === -1 && document.getElementById('ombra').style.display == 'none' && document.getElementById('fullBoard').style.display == 'none') {
        if(event.keyCode == 46) { //canc
          deleteKey();
        }
        if(event.keyCode == 65 && event.shiftKey && displayMode == 'computer') { //shift + A
          openHeadLink("addElementPopup");
        }
        if(event.keyCode == 84 && event.shiftKey && displayMode == 'computer') { //shift + T
          openHeadLink("customTheme");
        }
        if(event.keyCode == 71 && event.shiftKey) { //shift + G
            typeAddingImage = null;
            loadTabellaImages();
            openHeadLink("imageManager");
        }
        if(event.keyCode == 67 && event.shiftKey && selected && !selectedId.includes("Section ") && !selectedId.includes("Row ")) { //shift + C
          openHeadLink("custCSS");
        }
        if(event.keyCode == 76 && event.shiftKey && selected && !selectedId.includes("Section ") && !selectedId.includes("Row ")) { //shift + L
          openHeadLink("link");
        }
        //DEV
        // if(event.keyCode == 67 && event.shiftKey && selected && location.hostname === "localhost") { //shift + C DEV
        //   openHeadLink("custCSS");
        // }
        if(event.keyCode == 66 && event.shiftKey && selected && !selectedId.includes("Section ") && !selectedId.includes("Row ")) { //shift + B
          document.getElementById('borderStyleText').value = 'none';
          setClasses('border-style', 'borderStyleText', styleName);
          setProprieties();
        }
        if(event.keyCode == 87 && event.shiftKey && selected && !selectedId.includes("Section ") && !selectedId.includes("Row ")) { //shift + W
          setPosition("fit-width");
        }
        if(event.keyCode == 72 && event.shiftKey && selected && !selectedId.includes("Section ") && !selectedId.includes("Row ")) { //shift + H
          setPosition("fit-height");
        }
        if(event.keyCode == 86 && event.shiftKey && selected && displayMode == 'computer') { //shift + V
        // if(event.keyCode == 86 && event.shiftKey && selected && displayMode == 'computer' && !selectedId.includes("Section ") && !selectedId.includes("Row ")) { //shift + V
          // openHeadLink("loading");
          setTimeout(function() {
            duplicateElement(selectedId, document.getElementById(selectedId).parentNode.parentNode.id);
          }, 5);
        }
        if(event.keyCode == 37 && selected && !selectedId.includes("Section ") && !selectedId.includes("Row ")) { //arrow Left
          edited = true;
          event.preventDefault();
          val = document.getElementById('marginLeftText').value.match(/(\d+)/)[0];
          unit = document.getElementById('marginLeftText').value.replace(val, "").replace("-", "");

          if (!event.shiftKey) document.getElementById('marginLeftText').value = parseInt(document.getElementById('marginLeftText').value) - 1 + unit;
          if (event.shiftKey) document.getElementById('marginLeftText').value = parseInt(document.getElementById('marginLeftText').value) - 5 + unit;
          setClasses('margin-left', 'marginLeftText', styleName);

          aggiustaSelect();
        }
        if(event.keyCode == 39 && selected && !selectedId.includes("Section ") && !selectedId.includes("Row ")) { //arrow Right
          edited = true;
          event.preventDefault();
          val = document.getElementById('marginLeftText').value.match(/(\d+)/)[0];
          unit = document.getElementById('marginLeftText').value.replace(val, "").replace("-", "");

          if (!event.shiftKey) document.getElementById('marginLeftText').value = parseInt(document.getElementById('marginLeftText').value) + 1 + unit;
          if (event.shiftKey) document.getElementById('marginLeftText').value = parseInt(document.getElementById('marginLeftText').value) + 5 + unit;
          setClasses('margin-left', 'marginLeftText', styleName);

          aggiustaSelect();
        }
        if(event.keyCode == 38 && selected && !selectedId.includes("Section ") && !selectedId.includes("Row ")) { //arrow Up
          edited = true;
          event.preventDefault();
          val = document.getElementById('marginTopText').value.match(/(\d+)/)[0];
          unit = document.getElementById('marginTopText').value.replace(val, "").replace("-", "");

          if (!event.shiftKey) document.getElementById('marginTopText').value = parseInt(document.getElementById('marginTopText').value) - 1 + unit;
          if (event.shiftKey) document.getElementById('marginTopText').value = parseInt(document.getElementById('marginTopText').value) - 5 + unit;
          setClasses('margin-top', 'marginTopText', styleName);

          aggiustaSelect();
        }
        if(event.keyCode == 40 && selected && !selectedId.includes("Section ") && !selectedId.includes("Row ")) { //arrow Down
          edited = true;
          event.preventDefault();
          val = document.getElementById('marginTopText').value.match(/(\d+)/)[0];
          unit = document.getElementById('marginTopText').value.replace(val, "").replace("-", "");

          if (!event.shiftKey) document.getElementById('marginTopText').value = parseInt(document.getElementById('marginTopText').value) + 1 + unit;
          if (event.shiftKey) document.getElementById('marginTopText').value = parseInt(document.getElementById('marginTopText').value) + 5 + unit;
          setClasses('margin-top', 'marginTopText', styleName);

          aggiustaSelect();
        }

        if(event.keyCode == 37 && selected && selectedId.includes("Section ")) { //arrow Left section
          event.preventDefault();
          edited = true;
          decreaseOrder();
        }
        if(event.keyCode == 39 && selected && selectedId.includes("Section ")) { //arrow Right section
          event.preventDefault();
          edited = true;
          increaseOrder();
        }

      }

      if(event.keyCode == 68 && !event.shiftKey && event.ctrlKey && document.getElementById('fullBoard').style.display == 'none') { //ctrl + D
        event.preventDefault();
        openProprieties();
      }
      if(selectedSectionId != null && event.keyCode == 83 && !event.shiftKey && event.ctrlKey && document.getElementById('fullBoard').style.display == 'none') { //ctrl + S
        event.preventDefault();
        saveProject();
      }
      if(event.keyCode == 68 && event.shiftKey && event.ctrlKey && document.getElementById('fullBoard').style.display == 'none') { //ctrl + shift + D
        event.preventDefault();
        document.getElementById('board').click();
      }
      if(event.keyCode == 80 && event.shiftKey && event.ctrlKey && document.getElementById('fullBoard').style.display == 'none') { //ctrl + shift + P
        event.preventDefault();
        switchMode('switchPc');
      }
      if(event.keyCode == 77 && event.shiftKey && event.ctrlKey && document.getElementById('fullBoard').style.display == 'none') { //ctrl + shift + M
          event.preventDefault();
          switchMode('switchMobile');
      }
      if(event.keyCode == 13 && document.getElementById('alertDelete').style.display == 'block' && document.getElementById('fullBoard').style.display == 'none') { //invio delete element
        deleteElement();
        openHeadLink("alertDelete");
      }
      if(event.keyCode == 13 && document.getElementById('newProject').style.display == 'block' && document.getElementById('fullBoard').style.display == 'none') { //invio new project
        openHeadLink("newProject");
        applyProjectName();
      }

      if (event.target.id.includes("InputBox ") || event.target.id.includes("Textarea ")) document.getElementById(event.target.id).blur();

});

function deleteKey() {
  if (selectedId.includes("Button ") || selectedId.includes("Container ") || selectedId.includes("Image ") || selectedId.includes("Menu ") || selectedId.includes("Link ") || selectedId.includes("Text ") || selectedId.includes("MaterialIcon ") || selectedId.includes("InputBox ") || selectedId.includes("Textarea ")) {
    openHeadLink("alertDelete");
  }
  if (selectedId.includes("Section ")) {
    openAlertDeleteSection();
  }
  if (selectedId.includes("Row ")) {
    openAlertDeleteRow();
  }
}

function convertDate(d) {
  return +(p[2]+p[1]+p[0]);
}

function sortByDate() {
  var tbody = document.querySelector("#tableProject-detail tbody");
  // get trs as array for ease of use
  var rows = [].slice.call(tbody.querySelectorAll("tr"));

  rows.sort(function(a,b) {
    return a.cells[4].innerHTML > b.cells[4].innerHTML ? -1 : b.cells[4].innerHTML > a.cells[4].innerHTML ? 1 : 0;
  });

  rows.forEach(function(v) {

    var dateTimeTable = new Date(parseInt(v.cells[4].innerText));
    var dd = String(dateTimeTable.getDate()).padStart(2, '0');
    var mm = String(dateTimeTable.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = dateTimeTable.getFullYear();
    var hour = dateTimeTable.toLocaleString('en-GB').split(",")[1].split(":")[0] + ':' + dateTimeTable.toLocaleString('en-GB').split(",")[1].split(":")[1];

    v.cells[4].innerText = dd + '/' + mm + '/' + yyyy;
    // alert(dateTimeTable.getTime());

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var today = dd + '/' + mm + '/' + yyyy;

      if (v.cells[4].innerText == today) {
        v.cells[4].innerText = 'Today  · ' + hour;
      } else {

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        v.cells[4].innerText = v.cells[4].innerText.split("/")[0] + ' ' + monthNames[parseInt(v.cells[4].innerText.split("/")[1]) - 1] + ' ' + v.cells[4].innerText.split("/")[2];
      }

    tbody.appendChild(v);
  });
}

function openHomeCont(idCont) {

  if (idCont != 'homeCont') {
    document.getElementById('homeCont').style.display = 'none';
    document.getElementById('homeCont').style.transform = 'scale(.9)';
    document.getElementById('homeCont').style.opacity = '0';
  }

  if (idCont != 'templateCont') {
    document.getElementById('templateCont').style.display = 'none';
    document.getElementById('templateCont').style.transform = 'scale(.9)';
    document.getElementById('templateCont').style.opacity = '0';
  }

  if (idCont != 'keybindingCont') {
    document.getElementById('keybindingCont').style.display = 'none';
    document.getElementById('keybindingCont').style.transform = 'scale(.9)';
    document.getElementById('keybindingCont').style.opacity = '0';
  }

  document.getElementById(idCont).style.display = "block";
  document.getElementById(idCont).style.transition = '.3s cubic-bezier(.175,.885,.32,1.275)';

  setTimeout(wait, 10);
  function wait() {
    document.getElementById(idCont).style.transform = "scale(1)";
    document.getElementById(idCont).style.opacity = "1";
  }
}

function deleteIncludes(data) {
  edited = true;

  document.getElementById(data).parentNode.remove();

  clickBoard()
  setPageHTML();
  creaListElements();
}

function deleteElement() {

  edited = true;

  if (deleteInclude != "") {
    document.getElementById(deleteInclude).parentNode.remove();
    clickBoard()
    setPageHTML();
    creaListElements();
    deleteInclude = "";
  }

  if (selectedId.includes("Button ") || selectedId.includes("Container ") || selectedId.includes("Image ") || selectedId.includes("Menu ") || selectedId.includes("Link ") || selectedId.includes("Text ") || selectedId.includes("MaterialIcon ") || selectedId.includes("InputBox ") || selectedId.includes("Textarea ")) {

    //delete image
    // var valueMobile, valueDesktop;
    // var rules = document.getElementById(styleName).sheet.cssRules;
    // for (var i = 0; i < rules.length; i++) {
    //   if (rules[i].selectorText === "." + selectedId.replace(" ", "")) {
    //     valueDesktop = rules[i].style["background-image"];
    //   }
    //   if (rules[i].selectorText === "." + selectedId.replace(" ", "") + '-mobile') {
    //     valueMobile = rules[i].style["background-image"];
    //   }
    // }
    //
    // var isLastDesktop, isLastMobile;
    // for (var i = 0; i < rules.length; i++) {
    //   if (!rules[i].selectorText.includes("-mobile")) {
    //     if (rules[i].style["background-image"] == valueDesktop && rules[i].selectorText != '.' + selectedId.replace(" ", "")) {
    //       isLastDesktop = false;
    //       break
    //     } else isLastDesktop = true;
    //   }
    //   if (rules[i].selectorText.includes("-mobile")) {
    //     if (rules[i].style["background-image"] == valueMobile && rules[i].selectorText != '.' + selectedId.replace(" ", "") + '-mobile') {
    //       isLastMobile = false;
    //       break
    //     } else isLastMobile = true;
    //   }
    // }
    //
    // if (isLastDesktop && isLastMobile) {
    //
    //   for (var a=0; a < imageToUrl.length; a++) {
    //
    //     if (imageToUrl[a].url == valueDesktop.replace('url("', "").replace('")', "")) {
    //       $.ajax({
    //         url: 'delete.php',
    //         data: {'file' : imageToUrl[a].urlTemp },
    //       });
    //
    //       imageToUrl[a].url = "";
    //       imageToUrl[a].tempUrl = "";
    //       imageToUrl[a].filename = "";
    //     }
    //     if (imageToUrl[a].url == valueMobile.replace('url("', "").replace('")', "")) {
    //       $.ajax({
    //         url: 'delete.php',
    //         data: {'file' : imageToUrl[a].urlTemp },
    //       });
    //
    //       imageToUrl[a].url = "";
    //       imageToUrl[a].tempUrl = "";
    //       imageToUrl[a].filename = "";
    //     }
    //   }
    //
    // }





    //delete all rules
    var styleTag = document.getElementById (styleName);
    var sheet = styleTag.sheet ? styleTag.sheet : styleTag.styleSheet;

    if (sheet.cssRules) {
        for (var i=0; i<sheet.cssRules.length; i++) {
          if (sheet.cssRules[i].selectorText === '.' + selectedId.replace(" ", "")) {
              sheet.deleteRule (i);
          }
          if (sheet.cssRules[i].selectorText === '.' + selectedId.replace(" ", "") + '-mobile') {
              sheet.deleteRule (i);
          }
        }
    }
    //

    //elimino dalla stringa json
    deleteJsonString(selectedId);

    var myobj = document.getElementById(selectedId).parentNode;
    myobj.remove();
    clickBoard();
    document.getElementById('idBox').style.opacity = '0';
    createSelectId();
    creaListElements();

    emptySection();
    // saveProject();
    setPageHTML();

  } // end if

}

function deleteJsonString(id) {

  for (var i=0; i<nameElementsJson.length; i++) {
    if (nameElementsJson[i].id == id) {
      nameElementsJson[i].id = "";
      nameElementsJson[i].name = "";

      // try {
      //   alert(id);
        var delChildren = document.getElementById(id).children;
        for (var a=0; a<delChildren.length; a++) {
          deleteJsonString(delChildren[a].children[0].id);
        }
      // } catch {}

    }
  }

  console.log(nameElementsJson);
}

function load() {

  userId = localStorage.getItem("login_user");

  document.title = projectName + ' - Plater';

  try {
    document.getElementById('editorCont').style.transform = 'scale(1)';
    document.getElementById('editorCont').style.opacity = '1';

  setTimeout(wait, 700);

  function wait() {
    setMenu("Add");
    setMenu("More");
    var styleElement = document.getElementById(styleName);
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.type = 'text/css';
      styleElement.id = styleName;
      styleElement.title = styleName;
      document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    creaListElements();

    // document.getElementById('contTreeView').style.width = '1000px';
    setTimeout(wait1, 400);
    function wait1() {
      // document.getElementById('contTreeView').style.width = document.getElementById('contTreeView').getElementsByTagName('li')[0].getBoundingClientRect().width;
    }

      document.getElementById('switchPc').style.backgroundColor = 'rgb(209, 209, 209, .2)';

  }

} catch {}

}

function loadFuncitions(eventProject) {

  if (eventProject == 'new') {
    projectId = 0;
    openHeadLink("newProject");
    document.getElementById('projectNameText').focus();
    getClassesAndIds();
    restoreTheme();
    creaJSONAnimation();
  }
  if (eventProject == 'open') {
    openProject();
  }

}

function applyProjectName() {

  edited = true;

  openHeadLink("newProject");

  if (document.getElementById('projectNameText').value != '') projectName = document.getElementById('projectNameText').value;
  document.title = projectName + ' - Plater';

  author = localStorage.getItem("username");

}

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

function openProject() {

  var testo = localStorage.getItem("testo");
  if (testo == null) window.location.href="dashboard.php";

  var obj = JSON.parse(testo);

  projectId = localStorage.getItem("projectId");

  projectName = obj.projectName;
  document.title = projectName + ' - Plater';

  if (obj.author) author = obj.author;
  if (!obj.author) author = localStorage.getItem('username');
  if (obj.keywords) keywords = obj.keywords;
  if (obj.description) description = obj.description;
  if (obj.incorporatesCSS) incorporatesCSS = obj.incorporatesCSS;

  var colorImports = '\n' + obj.colorImports + '\n';
  if (obj.colorImports == null) colorImports = '';
  var testo = obj.fontImports + '\n' + obj.styleElements;

  if (location.hostname !== "localhost") {
    localStorage.removeItem("testo");
    localStorage.removeItem("projectId");
  }

  getClassesAndIds();
  importThemeFun(obj.fontImports + colorImports + '\n' + obj.styleElements);

  // alert(obj.cssElements);
  var htmlCode = "";
  htmlCode = obj.htmlCode;

  htmlCode = htmlCode.replaceAll("___agrave___", "à");
  htmlCode = htmlCode.replaceAll("___egrave___", "è");
  htmlCode = htmlCode.replaceAll("___igrave___", "ì");
  htmlCode = htmlCode.replaceAll("___ograve___", "ò");
  htmlCode = htmlCode.replaceAll("___ugrave___", "ù");

  document.getElementById('board').innerHTML = htmlCode;
  createSelectId();

  selectedId = obj.lastSection;

  if (selectedId == '' || selectedId == null) {
    var elementsBoard = document.getElementById('board').children;
    for (var i=0; i<elementsBoard.length; i++) {
      if (elementsBoard[i].id.includes("Row ")) {
        selectedSectionId = elementsBoard[i].children[0].id;
      }
    }
  } else {
    setTimeout(function() {

      var scrollId;
      var nodes = [];
      var element = document.getElementById(selectedId);
      nodes.push(element);
      while(element.parentNode) {
          nodes.unshift(element.parentNode);
          element = element.parentNode;
          if (element.id != null)
            if (element.id.includes("Section ")) scrollId = element.id;

      }

      if (selectedId.includes("Row ")) scrollId = selectedId;
      if (selectedId.includes("Section ")) scrollId = selectedId;

      if (scrollId != null) {
        document.getElementById(scrollId).scrollIntoView({behavior: "smooth"});
      }

        document.getElementById(selectedId).click();

    }, 800);

  }

  // pages
  try {
    pagesJSON = JSON.parse(obj.pagesJSON) || [{name: "First Page", html: "", type: "main"}];
  } catch {}
  currentPage = obj.currentPage || "First Page";
  currentPageID = obj.currentPageID || "0";
  setBoardTheme();

  document.getElementById("currentPageText").innerText = currentPage;
  // end pages

  //link
  try {
    linksJSON = JSON.parse(obj.linksJSON) || [];
  } catch {}

  //color
  try {
    colorToElement = JSON.parse(obj.colorToElement) || [];
  } catch {}

  //animations
  try {
    animationsJSON = JSON.parse(obj.animationsJSON) || [];
  } catch {creaJSONAnimation();}
  try {
    animationsToElement = JSON.parse(obj.animationsToElement) || [];
  } catch {}

  totButtons = obj.totButtons;
  totDiv = obj.totDiv;
  totIncludes = obj.totIncludes || 0;
  totImages = obj.totImages;
  totMenus = obj.totMenus || 0;
  totA = obj.totA;
  totP = obj.totP;
  totLabel = obj.totLabel;
  totSpan = obj.totSpan;
  totInput = obj.totInput;
  totTextarea = obj.totTextarea;
  totSections = obj.totSections;
  totRows = obj.totRows;

  if (obj.jsonElems == null) {
    var totElemBoard = document.getElementById('board').getElementsByTagName('*');
    for (var i=0; i<totElemBoard.length; i++) {
        nameElementsJson.push({"id" : totElemBoard[i].id, "name" : totElemBoard[i].id.replaceAll(" ", "")});
    }
  } else {
    nameElementsJson = JSON.parse(obj.jsonElems);
    for (var i=0; i<nameElementsJson.length; i++) {
      nameElementsJson[i].name = nameElementsJson[i].name.replaceAll(" ", "");
    }
  }

  if (obj.elemState != null) {
    elemState = JSON.parse(obj.elemState);
  }

  var imageToUrlTemp = [];
  if (obj.imageToUrl != null) {
    imageToUrlTemp = JSON.parse(obj.imageToUrl);
  }

  var totImages_tmp = 0, totImages_compare = 0, arrImages = [];

  var xhr = [], blob = [], urlTemp = [];

  for (var a=0; a<imageToUrlTemp.length; a++) {
      (function(a){
        totImages_tmp++;
        urlTemp[a] = imageToUrlTemp[a].urlTemp;
        xhr[a] = new XMLHttpRequest();
        xhr[a].open("GET", urlTemp[a]);
        xhr[a].responseType = "blob";//force the HTTP response, response-type header to be blob
        xhr[a].onload = function()
        {
            totImages_compare++;
            blob[a] = xhr[a].response;
          try {
            imageToUrl.push({"url" : URL.createObjectURL(blob[a]), "urlTemp" : imageToUrlTemp[a].urlTemp, "filename" : imageToUrlTemp[a].filename});
            arrImages.push({"url" : urlTemp[a], "blob" : URL.createObjectURL(blob[a])});
          } catch {}
        }
        xhr[a].send();
    })(a);
      // const blob = b64toBlob(b64Data, 'blob');
      // const blobUrl = URL.createObjectURL(blob);
      //
      // obj.cssElements = obj.cssElements.replaceAll(b64Data, blobUrl);

  }

  openHeadLink("loading");

  let timerImage = setInterval(function(){
  if (totImages_tmp == totImages_compare) {
    clearInterval(timerImage);

    for (var i=0; i<imageToUrl.length; i++) {
      if (imageToUrl[i].url != '' && imageToUrl[i].url != null && imageToUrl[i].urlTemp != '' && imageToUrl[i].urlTemp != null) obj.cssElements = obj.cssElements.replaceAll(imageToUrl[i].urlTemp, imageToUrl[i].url);
    }

    var styleTag1 = document.getElementById (styleName);
    var sheet1 = styleTag1.sheet ? styleTag1.sheet : styleTag1.styleSheet;

    if (sheet1.cssRules) {
      const totRules = posIndex;
        for (var i=totRules-1; i>=0; i--) {
                try{ sheet1.deleteRule (i); } catch {}
        }
    }

    var linesTesto = obj.cssElements.split('}');

    for (var x = 0; x < linesTesto.length - 1; x++) {
       document.getElementById(styleName).sheet.insertRule(linesTesto[x] + '}', x);
    }

    //import css

    var cssFont = obj.fontImports;

    var linesTesto1 = testo.split('}\n');

    for (var x = 0; x < linesTesto1.length - 1; x++) {
            linesTesto1[x] = linesTesto1[x].replace(cssFont, "");
            document.getElementById(styleName).sheet.insertRule(linesTesto1[x] + '}', x);

            var arr = linesTesto1[x].match(/(?:[\.]{1})([a-zA-Z_]+[\w-_]*)(?:[\s\.\,\{\>#\:]{0})/igm);

            document.getElementById(arr[0].replace(".", "")).style.display = 'block';
            document.getElementById(arr[0].replace(".", "")).style.width = 'auto';
            document.getElementById(arr[0].replace(".", "")).style.height = 'auto';
            var width = document.getElementsByClassName(arr[0].replace(".", ""))[0].clientWidth;
            var height = document.getElementsByClassName(arr[0].replace(".", ""))[0].clientHeight;
            document.getElementById(arr[0].replace(".", "")).style.width = width;
            document.getElementById(arr[0].replace(".", "")).style.height = height;
            document.getElementById(arr[0].replace(".", "")).style.display = 'none';

    }

    var aTags = document.getElementsByTagName("div");
    var searchText = "inset 2px 0 0 var(--secondary_opacity)";
    var found;

    for (var i = 0; i < aTags.length; i++) {
      if (aTags[i].style.boxShadow == searchText && !aTags[i].innerText.includes("Font Link")) {
        selectedElemCustom(aTags[i].innerText);
      }
    }

    var elemBoardRow = document.getElementsByClassName("rowClass");
    for (var e=0; e<elemBoardRow.length; e++) {
      if (elemBoardRow[e].className == "rowClass") {
        elemBoardRow[e].className += " " + elemBoardRow[e].id.replace(" ", "");
      }
    }

    openHeadLink("loading");
    emptySection();

    var outerDivs = document.getElementsByTagName('*');
    for (var q=0; q<outerDivs.length; q++) {
      // console.log(outerDivs[q].children[0].id);
      if (outerDivs[q].className.includes("-outer")) {
        // outerDivs[q].style.cssText = 'pointer-events: none;';
        // selectedId = outerDivs[q].id;
        // document.getElementById('justifyContentOuterText').value = 'start';
        // setClasses('justify-content', 'justifyContentOuterText', styleName);
        // document.getElementById('widthText').value = '100%';
        // setClasses('width', 'widthText', styleName);
        // document.getElementById('displayTextNone').value = 'flex';
        // setClasses('display', 'displayTextNone', styleName);
        // document.getElementById('flexGrowText').value = '1';
        // setClasses('flex-grow', 'flexGrowText', styleName);
        // document.getElementById('alignItemsText').value = 'flex-start';
        // setClasses('align-items', 'alignItemsText', styleName);
        // selectedId = '';
      }

    }

    // setSectionHeight();

  }
}, 1);

}

function setMenu(type) {

  setTimeout(wait, 100);
  function wait() {

    if (type == 'More') {
      document.getElementById('sottoMenuMore').style.marginLeft = document.getElementById('demo-menu-lower-right').getBoundingClientRect().left + 45;
      document.getElementById('sottoMenuMore').style.top = '8px';
    }
    if (type == 'User') {
      document.getElementById('sottoMenuUser').style.marginLeft = document.getElementById('demo-menu-lower-right').getBoundingClientRect().left + document.getElementById('demo-menu-lower-right').getBoundingClientRect().width + 10;
      document.getElementById('sottoMenuUser').style.top = '5px';
    }

  }

}

function clickBoard() {
  selected = false;
  selectedId = "";

  var elementsTree = document.getElementById('parent').getElementsByClassName('li');
  for (var j=0; j<elementsTree.length; j++) {
     elementsTree[j].style.backgroundColor = 'transparent';
  }

  openProprieties();

  var elementsBoard = document.getElementById('board').getElementsByTagName('*');
  for (var i=0; i<elementsBoard.length; i++) {
    if (elementsBoard[i].id == 'outlinerSelection' || elementsBoard[i].id == 'outlinerSelectionOUTER') {
      elementsBoard[i].remove();
    }
  }

}

var totButtons = 0;
var totDiv = 0;
var totImages = 0;
var totMenus = 0;
var totA = 0;
var totP = 0;
var totLabel = 0;
var totSpan = 0;
var totInput = 0;
var totTextarea = 0;
var totIncludes = 0;

function addElements(type) {

  firstClick = true;

  clickBoard();

  var createdId;

  edited = true;

    var divContainer = document.createElement("DIV");
    divContainer.style.pointerEvents = 'none';
    if (type != "includes") document.getElementById(selectedSectionId).children[0].appendChild(divContainer);
    if (type == "includes") document.getElementById('board').appendChild(divContainer);

  if (type=="button") {
    totButtons ++;
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "Button " + totButtons;
    btn.className += "button-plater blur-in " + "Button" + totButtons;
    btn.id = "Button " + totButtons;
    divContainer.appendChild(btn);
    createdId = "Button " + totButtons;
  }

  if (type=="div") {
    totDiv ++;
    var div = document.createElement("DIV");
    div.className += "div-plater blur-in " + "Container" + totDiv;
    div.id = "Container " + totDiv;
    // div.style.boxShadow = '0px 0px 2px black inset';
    // div.innerHTML = "Div " + totDiv;
    divContainer.appendChild(div);
    createdId = "Container " + totDiv;
  }

  if (type=="image") {
    totImages ++;
    var img = document.createElement("DIV");
    img.className += "image-plater blur-in " + "Image" + totImages;
    img.id = "Image " + totImages;
    divContainer.appendChild(img);
    createdId = "Image " + totImages;
  }

  if (type=="menu") {
    totMenus ++;
    var menu = document.createElement("UL");
    menu.className += "menu-plater blur-in " + "Menu" + totMenus;
    menu.id = "Menu " + totMenus;
    divContainer.appendChild(menu);
    createdId = "Menu " + totMenus;
  }

  if (type=="a") {
    totA ++;
    var aElem = document.createElement("A");
    aElem.className += "a-plater blur-in " + "Link" + totA;
    aElem.id = "Link " + totA;
    aElem.innerHTML = "Link " + totA;
    divContainer.appendChild(aElem);
    createdId = "Link " + totA;
  }

  if (type=="p") {
    totP ++;
    var pElem = document.createElement("LABEL");
    pElem.className += "label-plater blur-in " + "Text" + totP;
    pElem.id = "Text " + totP;
    pElem.innerHTML = "Text " + totP;
    divContainer.appendChild(pElem);
    createdId = "Text " + totP;
  }

  if (type=="span") {
    totSpan ++;
    var pSpan = document.createElement("SPAN");
    pSpan.className += "span-plater blur-in " + "MaterialIcon" + totSpan;
    pSpan.id = "MaterialIcon " + totSpan;
    pSpan.innerHTML = "spa";
    pSpan.translate = false;
    divContainer.appendChild(pSpan);
    createdId = "MaterialIcon " + totSpan;
  }

  if (type=="input") {
    totInput ++;
    var pInput = document.createElement("INPUT");
    pInput.className += "input-plater blur-in " + "InputBox" + totInput;
    pInput.id = "InputBox " + totInput;
    pInput.setAttribute("value", "InputBox " + totInput);
    divContainer.appendChild(pInput);
    createdId = "InputBox " + totInput;
  }

  if (type=="textarea") {
    totTextarea ++;
    var pTextarea = document.createElement("TEXTAREA");
    pTextarea.className += "textarea-plater blur-in " + "Textarea" + totTextarea;
    pTextarea.id = "Textarea " + totTextarea;
    pTextarea.innerHTML = "Textarea " + totTextarea;
    pTextarea.style.resize = 'none';
    divContainer.appendChild(pTextarea);
    createdId = "Textarea " + totTextarea;
  }

  if (type=="includes") {
    totIncludes ++;
    var pIncludes = document.createElement("DIV");
    pIncludes.className += "includes blur-in " + "Includes" + totIncludes;
    pIncludes.id = "Includes " + totIncludes;
    divContainer.appendChild(pIncludes);
    createdId = "Includes " + totIncludes;
  }

  document.getElementById(styleName).sheet.insertRule("." + createdId.replace(" ", "") + '{}', posIndex);
  document.getElementById(styleName).sheet.insertRule("." + createdId.replace(" ", "") + '-mobile' + '{}', posIndex);
  document.getElementById(styleName).sheet.insertRule("." + createdId.replace(" ", "") + '-outer' + '{}', posIndex);
  document.getElementById(styleName).sheet.insertRule("." + createdId.replace(" ", "") + '-outer-mobile' + '{}', posIndex);

  divContainer.children[0].style.pointerEvents = 'auto';
  divContainer.id = createdId + '-outer';
  divContainer.className = createdId.replace(" ", "") + '-outer';
  selectedId = createdId + '-outer';
  document.getElementById('justifyContentOuterText').value = 'start';
  setClasses('justify-content', 'justifyContentOuterText', styleName);
  document.getElementById('widthText').value = '100%';
  setClasses('width', 'widthText', styleName);
  document.getElementById('displayTextNone').value = 'flex';
  setClasses('display', 'displayTextNone', styleName);
  document.getElementById('flexGrowText').value = '1';
  setClasses('flex-grow', 'flexGrowText', styleName);
  document.getElementById('alignItemsText').value = 'flex-start';
  setClasses('align-items', 'alignItemsText', styleName);
  selectedId = '';

  document.getElementById(selectedSectionId).scrollIntoView({behavior: "smooth"});

  nameElementsJson.push({"id" : createdId, "name" : createdId.replaceAll(" ", "")});

  creaListElements();

  emptySection();

  setPageHTML();

  // setSectionHeight();

  // var tempSelect = selectedId;
  //
  // selectedId = createdId;
  //
  // setTimeout(function () {
  //   document.getElementById(selectedId).click();
  //   createSelectId();
  //
  //   selectedId = tempSelect;
  //   clickBoard();
  //
  // }, 1);
  //
  setTimeout(function () {
    firstClick = false;
  }, 300);

  setTimeout(function () {
    document.getElementById(createdId).classList.remove("blur-in");
    setPageHTML();

    selectedId = '';

  }, 250);

  if (type=="image") {
    setTimeout(function () {
      selectedId = createdId;
      setPosition("aspect-ratio");
    }, 10);
  }

  if (type=="div") {
    setTimeout(function () {
      selectedId = createdId;
      setClasses('width', 'widthTextConstruct', styleName);
      setClasses('height', 'heightTextConstruct', styleName);
      if (document.getElementById('backgroundTextConstruct').value != '') setClasses('background-color', 'backgroundTextConstruct', styleName);
      if (document.getElementById('paddingTopTextConstruct').value != '') setClasses('padding-top', 'paddingTopTextConstruct', styleName);
      if (document.getElementById('paddingLeftTextConstruct').value != '') setClasses('padding-left', 'paddingLeftTextConstruct', styleName);
      if (document.getElementById('paddingBottomTextConstruct').value != '') setClasses('padding-bottom', 'paddingBottomTextConstruct', styleName);
      if (document.getElementById('paddingRightTextConstruct').value != '') setClasses('padding-right', 'paddingRightTextConstruct', styleName);

      //svuoto i campi
      document.getElementById('widthTextConstruct').value = 'auto';
      document.getElementById('heightTextConstruct').value = 'auto';

      var selectColorElements = document.getElementsByClassName("selectColor");
      for (var i=0; i<selectColorElements.length; i++) {
        selectColorElements[i].style.outline = null;
      }
      document.getElementById('backgroundTextConstruct').value = '';

      document.getElementById('paddingTopTextConstruct').value = '';
      document.getElementById('paddingLeftTextConstruct').value = '';
      document.getElementById('paddingBottomTextConstruct').value = '';
      document.getElementById('paddingRightTextConstruct').value = '';

    }, 1);
  }


  if (createdId.includes("Menu ")) return createdId;

}

function createSelectId() {
  var elements = document.body.getElementsByTagName('*');
  var sel;
  var opt;

  var select = document.getElementById("idText");
  var length = select.options.length;
  for (i = length-1; i >= 0; i--) {
    select.options[i] = null;
  }

  for (var i = 0; i < elements.length; i++) {

      if (elements[i].id.includes("Button ") || elements[i].id.includes("Container ") || elements[i].id.includes("Image ") || elements[i].id.includes("Menu ") || elements[i].id.includes("Link ") || elements[i].id.includes("Text ") || elements[i].id.includes("MaterialIcon ") || elements[i].id.includes("InputBox ") || elements[i].id.includes("Textarea ")) {
        sel = document.getElementById('idText');
        opt = document.createElement('option');
        opt.style.backgroundColor = 'var(--primary)';
        opt.appendChild( document.createTextNode(elements[i].id) );
        sel.appendChild(opt);
      }

  }

  try {sortSelect(sel);} catch {}

}

function sortSelect(selElem) {

  var valueSel = selElem.value;

    var tmpAry = new Array();
    for (var i=0;i<selElem.options.length;i++) {
        tmpAry[i] = new Array();
        tmpAry[i][0] = selElem.options[i].text;
        tmpAry[i][1] = selElem.options[i].value;
    }
    tmpAry.sort();
    while (selElem.options.length > 0) {
        selElem.options[0] = null;
    }
    for (var i=0;i<tmpAry.length;i++) {
        var op = new Option(tmpAry[i][0], tmpAry[i][1]);
        op.style.backgroundColor = 'var(--primary)';
        selElem.options[i] = op;
    }

    selElem.value = valueSel;

    return;
}

var widthProprietiesOrder = 200;

function openOrderElements() {
  var board = document.getElementById('board').style;
  var outBoard = document.getElementById('boardOut').style;
  var outBoardMobile = document.getElementById('boardOutMobile').style;
  var windowProperties = document.getElementById('windowOrderElements').style;
  var openProprietiesButt = document.getElementById('openOrderElements').style;
  var arrow = document.getElementById('arrowOrder').style;

  windowProperties.transition = '.2s';
  board.transition = '.2s';
  outBoard.transition = '.2s';
  outBoardMobile.transition = '.2s';
  openProprietiesButt.transition = '.2s';
  arrow.transition = '.2s';

  if (windowProperties.display == 'none'){
    windowProperties.display = 'block';

    setTimeout(fun, 100);
    function fun() {
      windowProperties.width = widthProprietiesOrder;

      if (displayMode == 'computer') {
        board.width = 'calc(100% - 252px)';
        outBoard.width = 'calc(100% - 232px)';
        board.left = '225px';
        outBoard.left = '215px';
      }

      outBoardMobile.width = document.getElementById('boardOutMobile').getBoundingClientRect().width - 205;
      outBoardMobile.marginLeft = '220px';

      openProprietiesButt.left = widthProprietiesOrder - 27;
      arrow.transform = 'rotate(0deg)';
      try {document.getElementById('outlinerSelection').style.display = 'none';} catch {}
      try {document.getElementById('outlinerSelectionOUTER').style.display = 'none';} catch {}

      setTimeout(wait, 200);
      function wait() {
      try {aggiustaSelect();} catch {}
      try {document.getElementById('outlinerSelection').style.display = 'block';} catch {}
      try {document.getElementById('outlinerSelectionOUTER').style.display = 'block';} catch {}
      }

    }

  } else {
    windowProperties.width = 0;

    if (displayMode == 'computer') {
      board.width = 'calc(100% - 52px)';
      outBoard.width = 'calc(100% - 32px)';
      board.left = '25px';
      outBoard.left = '15px';
    }
    outBoardMobile.width = document.getElementById('boardOutMobile').getBoundingClientRect().width + 205;
    outBoardMobile.marginLeft = '15px';

    openProprietiesButt.left = - 29;
    arrow.transform = 'rotate(180deg)';

    try {document.getElementById('outlinerSelection').style.display = 'none';} catch {}
    try {document.getElementById('outlinerSelectionOUTER').style.display = 'none';} catch {}

    setTimeout(fun, 200);
    function fun() {
      windowProperties.display = 'none';
      try {aggiustaSelect();} catch {}
      try {document.getElementById('outlinerSelection').style.display = 'block';} catch {}
      try {document.getElementById('outlinerSelectionOUTER').style.display = 'block';} catch {}
    }

  }
}

function openProprieties() {

  var board = document.getElementById('board').style;
  var outBoardMobile = document.getElementById('boardOutMobile').style;
  var windowProperties = document.getElementById('windowProperties').style;
  var openProprietiesButt = document.getElementById('openProprieties').style;
  var arrow = document.getElementById('arrow').style;
  var widthProprieties = 300;

  windowProperties.transition = '.2s';
  board.transition = '.2s';
  outBoardMobile.transition = '.2s';
  openProprietiesButt.transition = '.2s';
  arrow.transition = '.2s';

  if (windowProperties.display == 'none' && selected){
    windowProperties.display = 'block';

    setTimeout(fun, 100);
    function fun() {

      outBoardMobile.width = document.getElementById('boardOutMobile').getBoundingClientRect().width - 290;
      outBoardMobile.right = 307;

      windowProperties.width = widthProprieties;
      openProprietiesButt.right = widthProprieties - 35;
      arrow.transform = 'rotate(180deg)';
    }

  } else {
    if (document.getElementById('windowProperties').getBoundingClientRect().width != 0) outBoardMobile.width = document.getElementById('boardOutMobile').getBoundingClientRect().width + 290;
    windowProperties.width = 0;
    openProprietiesButt.right = - 58;
    arrow.transform = 'rotate(0deg)';

    outBoardMobile.right = 17;

    setTimeout(fun, 290);
    function fun() {
      windowProperties.display = 'none';
    }

  }

}

document.addEventListener('mousemove', function(e) {

  try {var windowProperties = document.getElementById('windowProperties').style;

    if (e.clientX > window.innerWidth - 29 && windowProperties.display == 'none') {
      document.getElementById('openProprieties').style.right = '-29px';
    } else if (windowProperties.display == 'none') {
      document.getElementById('openProprieties').style.right = '-58px';
    }

    windowProperties = document.getElementById('windowOrderElements').style;

    if (e.clientX < 29 && windowProperties.display == 'none') {
      document.getElementById('openOrderElements').style.left = '-29px';
    } else if (windowProperties.display == 'none') {
      document.getElementById('openOrderElements').style.left = '-58px';
    }

    fullBoard = document.getElementById('fullBoard').style;

    if (e.clientY < 54 && fullBoard.display == 'block') {
      document.getElementById('contFullScreenBut').style.marginTop = '18px';
    } else {
      document.getElementById('contFullScreenBut').style.marginTop = '-50px';
    }

  } catch {}
});

document.addEventListener('mouseover', function(e) {

  if (checkIfParentIncludes(e.target)) return;

  try {
    if (document.getElementById('fullBoard').style.display == 'block') return;

    if (e.target.id.includes("Button ") || e.target.id.includes("Container ") || e.target.id.includes("Image ") || e.target.id.includes("Menu ") || e.target.id.includes("Link ") || e.target.id.includes("Text ") || e.target.id.includes("MaterialIcon ") || e.target.id.includes("InputBox ") || e.target.id.includes("Textarea ") || e.target.id.includes("Section ") || e.target.id.includes("Row ")) {
      document.getElementById('idBox').style.top = document.getElementById(e.target.id).getBoundingClientRect().top - 30;
      document.getElementById('idBox').style.left = document.getElementById(e.target.id).getBoundingClientRect().left + 2;
      document.getElementById('idBox').style.opacity = '1';

      var ifLinkHtml = '';
      for (var w=0; w<linksJSON.length; w++) {
        if (linksJSON[w].elem == e.target.id) ifLinkHtml = '<span style="margin-right: 5px; margin-top: 20px; vertical-align: middle; padding: 2px 2px 2px 2px; font-family: Material Icons; font-size: 15px; background-color: rgb(50, 50, 50, 1); border-radius: 900px; color: rgb(255, 255, 255, .8);">link</span>';
      }

      var ifAnimation = '';
      for (var w=0; w<animationsToElement.length; w++) {
        if (animationsToElement[w].idElem == e.target.id) ifAnimation = '<span style="margin-right: 5px; margin-top: 20px; vertical-align: middle; padding: 2px 2px 2px 2px; font-family: Material Icons; font-size: 15px; background-color: rgb(50, 50, 50, 1); border-radius: 900px; color: rgb(255, 255, 255, .8);">animation</span>';
      }

      for (var i=0; i<nameElementsJson.length; i++) {
        if (nameElementsJson[i].id == e.target.id) {
          document.getElementById('idBox').innerHTML = ifLinkHtml + ifAnimation + '<span style="vertical-align: middle; font-size: 13px; color: rgb(50, 50, 50, 1);">' + nameElementsJson[i].name + '</span>';
        }
      }

      //change cursor
      document.body.style.cursor = 'pointer';

      if (!selected && !e.target.id.includes("Row") && !e.target.id.includes("Section")) {

        try {document.getElementById('outlinerSelectionOUTER').remove()} catch {}

        var outlineOUTER = document.createElement("DIV");
        outlineOUTER.id = "outlinerSelectionOUTER";
        outlineOUTER.style.position = 'fixed';
        outlineOUTER.style.backgroundColor = 'transparent';
        outlineOUTER.style.zIndex = '0';
        outlineOUTER.style.opacity = '0';
        outlineOUTER.style.transition = '.2s';
        outlineOUTER.style.border = '1px solid rgb(200, 200, 200, .3)';
        outlineOUTER.style.cssText += 'mix-blend-mode: difference;';
        outlineOUTER.style.pointerEvents = 'none';

        if (document.getElementById('fullBoard').style.display == 'block') outlineOUTER.style.display = 'none';

        document.getElementById('board').appendChild(outlineOUTER);

        var outlineOUTER = document.getElementById('outlinerSelectionOUTER');
        var elem = document.getElementById(e.target.id);

        setTimeout(function() {
          outlineOUTER.style.opacity = '1';
        }, 10);

        outlineOUTER.style.width = elem.parentNode.getBoundingClientRect().width - 2;
        outlineOUTER.style.height = elem.getBoundingClientRect().height - 2;

        outlineOUTER.style.top = document.getElementById('board').scrollTop + elem.getBoundingClientRect().top - document.getElementById('board').getBoundingClientRect().top;

        var windowProperties = document.getElementById('windowOrderElements').style;

        if (windowProperties.display == 'none') outlineOUTER.style.left = document.getElementById('board').scrollLeft + elem.parentNode.getBoundingClientRect().left - document.getElementById('board').getBoundingClientRect().left;
        else outlineOUTER.style.left = document.getElementById('board').scrollLeft + elem.parentNode.getBoundingClientRect().left - document.getElementById('board').getBoundingClientRect().left;

      }

    } else {
      document.body.style.cursor = null;
    }
  } catch {}

});

document.addEventListener('mouseout', function(e) {

  if (checkIfParentIncludes(e.target)) return;

  if (e.target.id.includes("Button ") || e.target.id.includes("Container ") || e.target.id.includes("Image ") || e.target.id.includes("Menu ") || e.target.id.includes("Link ") || e.target.id.includes("Text ") || e.target.id.includes("MaterialIcon ") || e.target.id.includes("InputBox ") || e.target.id.includes("Textarea ") || e.target.id.includes("Section ") || e.target.id.includes("Row ")) {
    document.getElementById('idBox').style.opacity = '0';

    if (!selected) {
      try {document.getElementById('outlinerSelectionOUTER').remove()} catch {}
    }
  }

});


document.addEventListener('click', function(e) {

  if (e.target.id != 'contextMenu') {
    document.getElementById('contextMenu').style.display = 'none';
  }

  if (checkIfParentIncludes(e.target)) return;

  if (document.getElementById('fullBoard').style.display == 'block') return;

  if (e.target.id.includes("openOrderElements") || e.target.id.includes("arrowOrder") || e.target.id.includes("windowOrderElements")) return;

  if (document.getElementById('ombra').style.display == 'block' || e.target.className.includes("mdl-button__ripple-container")) {
    document.getElementById('activeButtAfterClickPos').click();
    return;
  }

  if (e.target.id.includes("InputBox ") || e.target.id.includes("Textarea ")) {
    document.getElementById(e.target.id).blur();
  }

  if (!e.target.id.includes("Text") && !e.target.id.includes("buttPos") && !e.target.id.includes("spanPos") && !e.target.id.includes("applyButtonCSS") && !e.target.id.includes("applyButtonCssTheme") && !e.target.id.includes("activeButtAfterClickPos") && selected) {
    setProprieties();
  }

  try {
    if (!e.target.id.includes("-outer") && (e.target.id.includes("Button ") || e.target.id.includes("Container ") || e.target.id.includes("Image ") || e.target.id.includes("Menu ") || e.target.id.includes("Link ") || e.target.id.includes("Text ") || e.target.id.includes("MaterialIcon ") || e.target.id.includes("InputBox ") || e.target.id.includes("Textarea "))) {

      selectedIdTemp = e.target.id;

      var elem = document.getElementById(selectedIdTemp);

      if (selectedIdTemp.includes("InputBox ")) {
        document.getElementById('innerTextCont').style.display = 'none';
        document.getElementById('valueCont').style.display = 'block';
        document.getElementById('valueText').value = elem.value;
        document.getElementById('placeHolderText').value = elem.placeholder;
        document.getElementById('divPlaceHolder1').style.display = 'block';
      } else if (selectedIdTemp.includes("Textarea ")) {
          document.getElementById('innerTextCont').style.display = 'block';
          document.getElementById('valueCont').style.display = 'none';
          document.getElementById('divPlaceHolder1').style.display = 'block';
          document.getElementById('placeHolderText1').value = elem.placeholder;
      } else {
        document.getElementById('innerTextCont').style.display = 'block';
        document.getElementById('valueCont').style.display = 'none';
        document.getElementById('divPlaceHolder1').style.display = 'none';
      }
    }

    if (selectedIdTemp.includes("Image ")) {
      document.getElementById('innerTextCont').style.display = 'none';
      document.getElementById('valueCont').style.display = 'none';
      document.getElementById('divPlaceHolder1').style.display = 'none';
    }

  } catch {}

  if (e.target.id == "board" || e.target.tagName == "BODY" || e.target.id == "boardOut" || e.target.id.includes("boardOutMobile")) {
    clickBoard();
  }

  //click element

  if (!e.target.id.includes("-outer") && (e.target.id.includes("activeButtAfterClickPos") || e.target.id.includes("idText") || e.target.id.includes("applyButtonCSS") || e.target.id.includes("applyButtonCssTheme") || e.target.id.includes("Button ") || e.target.id.includes("Container ") || e.target.id.includes("Image ") || e.target.id.includes("Menu ") || e.target.id.includes("Link ") || e.target.id.includes("Text ") || e.target.id.includes("MaterialIcon ") || e.target.id.includes("InputBox ") || e.target.id.includes("Textarea ") || e.target.id.includes("Section ") || e.target.id.includes("Row "))) {

    try {document.getElementById('outlinerSelection').remove()} catch {}
    try {document.getElementById('outlinerSelectionOUTER').remove()} catch {}
    if (!e.target.id.includes("applyButtonCSS") && !e.target.id.includes("applyButtonCssTheme") && !e.target.id.includes("activeButtAfterClickPos")) selected = true;
    if (!e.target.id.includes("applyButtonCSS") && !e.target.id.includes("applyButtonCssTheme") && !e.target.id.includes("activeButtAfterClickPos")) selectedId = e.target.id;

    if (!selected) return;

    if (e.target.id.includes("idText")) selectedId = document.getElementById('idText').value;

    if (!isContextMenu && (document.getElementById('windowProperties').style.display == 'none' && !firstClick) && (e.target.id.includes("Button ") || e.target.id.includes("Container ") || e.target.id.includes("Image ") || e.target.id.includes("Menu ") || e.target.id.includes("Link ") || e.target.id.includes("Text ") || e.target.id.includes("MaterialIcon ") || e.target.id.includes("InputBox ") || e.target.id.includes("Textarea ") || e.target.id.includes("Section ") || e.target.id.includes("Row "))) openProprieties();

    var elem = document.getElementById(selectedId);

    if (e.target.id.includes("Section ")) {
      selectedSectionId = e.target.id;
    } else {
      var parentIncludes = false;
      var a = elem;
      var els = [];
      while (a) {
          els.unshift(a);
          a = a.parentNode;
          try {if (a.parentNode.id.includes("Section ")) selectedSectionId = a.parentNode.id;} catch {}
      }
    }

    attivaProprieta(selectedId);

    var searchValue = document.getElementById('searchElemText').value;
    for (var i=0; i<nameElementsJson.length; i++) {
      if (nameElementsJson[i].id.toLowerCase() == selectedId.toLowerCase()) {
        // if (!nameElementsJson[i].name.toLowerCase().includes(searchValue.toLowerCase())) document.getElementById('searchElemText').value = '';
      }
    }


    //select section
    var scrollId;
    var nodes = [];
    var element = document.getElementById(selectedId);
    nodes.push(element);
    while(element.parentNode) {
        nodes.unshift(element.parentNode);
        element = element.parentNode;
        if (element.id != null)
          if (element.id.includes("Section ")) scrollId = element.id;

    }

    if (selectedId.includes("Row ")) scrollId = selectedId;
    if (selectedId.includes("Section ")) scrollId = selectedId;

    if (scrollId != null && !isContextMenu) {
      document.getElementById(scrollId).scrollIntoView({behavior: "smooth", inline: "nearest"});
    }
    isContextMenu = false;

    //link
    document.getElementById('linkButt').children[0].innerText = 'add_link';
    document.getElementById('linkButt').style.backgroundColor = null;
    for (var w=0; w<linksJSON.length; w++) {
      if (linksJSON[w].elem == selectedId) {
        document.getElementById('linkButt').children[0].innerText = 'link';
        document.getElementById('linkButt').style.backgroundColor = 'rgb(150, 150, 150, .1)';
      }
    }

    //animation
    document.getElementById('animationButt').style.backgroundColor = null;
    for (var w=0; w<animationsToElement.length; w++) {
      if (animationsToElement[w].idElem == selectedId) {
        document.getElementById('animationButt').style.backgroundColor = 'rgb(150, 150, 150, .1)';
      }
    }

    var outline = document.createElement("DIV");
    outline.id = "outlinerSelection";
    outline.style.position = 'fixed';
    outline.style.backgroundColor = 'transparent';
    outline.style.zIndex = '0';
    outline.style.border = '2px solid var(--secondary_opacity)';
    outline.style.pointerEvents = 'none';

    var outlineOUTER = document.createElement("DIV");
    outlineOUTER.id = "outlinerSelectionOUTER";
    outlineOUTER.style.position = 'fixed';
    outlineOUTER.style.backgroundColor = 'transparent';
    outlineOUTER.style.zIndex = '0';
    outlineOUTER.style.border = '1px solid rgb(200, 200, 200, .3)';
    outlineOUTER.style.cssText += 'mix-blend-mode: difference;';
    outlineOUTER.style.pointerEvents = 'none';

    if (document.getElementById('fullBoard').style.display == 'block') outline.style.display = 'none';
    if (document.getElementById('fullBoard').style.display == 'block') outlineOUTER.style.display = 'none';

    document.getElementById('board').appendChild(outline);
    document.getElementById('board').appendChild(outlineOUTER);

    aggiustaSelect();

    // document.getElementById('widthText').value = getStyle(elem)[0];
    // document.getElementById('heightText').value = getStyle(elem)[1];
    //
    // document.getElementById('topText').value = getStyle(elem)[2];
    // document.getElementById('bottomText').value = getStyle(elem)[3];
    // document.getElementById('leftText').value = getStyle(elem)[4];
    // document.getElementById('rightText').value = getStyle(elem)[5];

    creaListFont();

    document.getElementById('fontFamilyText').value = getStyle(elem)[0].replaceAll('"', '').replaceAll("'", "");
    document.getElementById('fontSizeText').value = getStyle(elem)[1];
    document.getElementById('fontWeightText').value = getStyle(elem)[2];
    document.getElementById('letterSpacingText').value = getStyle(elem)[3];
    document.getElementById('lineHeightText').value = getStyle(elem)[4];
    document.getElementById('textAlignText').value = getStyle(elem)[5];
    document.getElementById('backgroundText').value = getStyle(elem)[6];
    document.getElementById('colorText').value = getStyle(elem)[7];
    document.getElementById('borderSizeText').value = getStyle(elem)[8];
    document.getElementById('borderStyleText').value = getStyle(elem)[9];
    document.getElementById('borderRadiusText').value = getStyle(elem)[10];
    document.getElementById('borderColorText').value = getStyle(elem)[11];

    if (getStyle(elem)[12].includes("blob:")) document.getElementById('imageUrlText').value = 'image';
    if (!getStyle(elem)[12].includes("blob:")) document.getElementById('imageUrlText').value = getStyle(elem)[12];

    document.getElementById('imageSizeText').value = getStyle(elem)[13];
    document.getElementById('imagePositionText').value = getStyle(elem)[14];
    document.getElementById('imageRepeatText').value = getStyle(elem)[15];


    getPosition_slide();

    document.getElementById('widthText').value = getStyle(elem)[21];
    document.getElementById('widthSlide').classList.remove('is-lowest-value');
    var val = parseInt(getStyle(elem)[21]);
    document.getElementById('widthSlide').value = val * 20 / 1920;
    var elemChild = document.getElementById('widthSlideCont').children;
    for (var i=0; i<elemChild.length; i++) {
      elemChild[i].children[1].children[0].style.flex = String(val * 1 / 1920) + ' 1 0%';
      elemChild[i].children[1].children[1].style.flex = String(1 - (val * 1 / 1920)) + ' 1 0%';
    }

    //PARENT WIDTH
    document.getElementById('occupiedText').value = getStyle(elem.parentNode)[21];
    document.getElementById('occupiedSlide').classList.remove('is-lowest-value');
    document.getElementById('occupiedSlide').value = parseInt(getStyle(elem.parentNode)[21]);
    var elemChild = document.getElementById('occupiedSlideCont').children;
    for (var i=0; i<elemChild.length; i++) {
      elemChild[i].children[1].children[0].style.flex = String(parseInt(getStyle(elem.parentNode)[21]) / 100) + ' 1 0%';
      elemChild[i].children[1].children[1].style.flex = String(1 - parseInt(getStyle(elem.parentNode)[21]) / 100) + ' 1 0';
    }

    if (getStyle(elem)[21].includes('%') && getStyle(elem)[21].includes('calc'))
      document.getElementById('widthText').value = '100%';

    document.getElementById('heightText').value = getStyle(elem)[22];

    if (getStyle(elem)[22].includes('%') && getStyle(elem)[22].includes('calc'))
      document.getElementById('heightText').value = '100%';

    document.getElementById('paddingTopText').value = getStyle(elem)[23];
    document.getElementById('paddingLeftText').value = getStyle(elem)[24];
    document.getElementById('paddingBottomText').value = getStyle(elem)[25];
    document.getElementById('paddingRightText').value = getStyle(elem)[26];

    document.getElementById('overflowYText').value = getStyle(elem)[36].replace("scroll", "auto");
    document.getElementById('overflowXText').value = getStyle(elem)[37].replace("scroll", "auto");

    if (getStyle(elem)[27] == 'block') document.getElementById('displayText').value = 'unaligned';
    if (getStyle(elem)[27] == 'inline-block') document.getElementById('displayText').value = 'aligned';

    if (getStyle(elem)[28] == 'fixed') document.getElementById('fixedCheck').checked = false;
    if (getStyle(elem)[28] != 'fixed') document.getElementById('fixedCheck').checked = true;

    document.getElementById('minHeightTextSection').value = getStyle(elem)[30];
    document.getElementById('verticalAlignSectionText').value = getStyle(elem)[35];

    document.getElementById('wrapText').value = getStyle(elem)[38];
    if (getStyle(elem)[38] == 'wrap') document.getElementById('wrapCheck').checked = true;
    if (getStyle(elem)[38] == 'nowrap') document.getElementById('wrapCheck').checked = false;

    var text = elem.innerText
    for (var k=0; k<elem.childNodes.length; k++) {
      text = text.replace(elem.childNodes[k].innerText, "").replace('<br />', /\n\r?/g);
    }
    if (selectedId.includes("Textarea ")) text = elem.textContent;

    if (!selectedId.includes("Row ") && !selectedId.includes("Section ")) document.getElementById('innerText').innerHTML = getTextElem(document.getElementById(selectedId));

    getNameElement(selectedId);

    document.getElementById('idText').value = selectedId;

    try {

      const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

      document.getElementById('backgroundView').value = rgba2hex('rgb(' + getStyle(elem)[6].split(',')[0].replace( /^\D+/g, '') + ', ' + getStyle(elem)[6].split(',')[1].replace( /^\D+/g, '') + ', ' + getStyle(elem)[6].split(',')[2].replace( /^\D+/g, '').replace(')', '') + ')' );
      document.getElementById('colorView').value = rgba2hex('rgba(' + getStyle(elem)[7].split(',')[0].replace( /^\D+/g, '') + ', ' + getStyle(elem)[7].split(',')[1].replace( /^\D+/g, '') + ', ' + getStyle(elem)[7].split(',')[2].replace( /^\D+/g, '').replace(')', '') + ')' );
      document.getElementById('borderColorView').value = rgba2hex('rgb(' + getStyle(elem)[11].split(',')[0].replace( /^\D+/g, '') + ', ' + getStyle(elem)[11].split(',')[1].replace( /^\D+/g, '') + ', ' + getStyle(elem)[11].split(',')[2].replace( /^\D+/g, '').replace(')', '') + ')' );

    var rgba, alpha;

    rgba = getStyle(elem)[6];
    alpha = rgba.split(',')[3];
    if (alpha == null) alpha = '1';
    alpha = alpha.replace(')', '');

    if (alpha != 0) document.getElementById('backgroundSlide').classList.remove('is-lowest-value');
      else document.getElementById('backgroundSlide').classList.add('is-lowest-value');
    document.getElementById('backgroundSlide').value = alpha * 100;
    var elemChild = document.getElementById('backgroundSlideCont').children;
    for (var i=0; i<elemChild.length; i++) {
      elemChild[i].children[1].children[0].style.flex = String(alpha) + ' 1 0%';
      elemChild[i].children[1].children[1].style.flex = String(1 - alpha) + ' 1 0';
    }

    rgba = getStyle(elem)[7];
    alpha = rgba.split(',')[3];
    if (alpha == null) alpha = '1';
    alpha = alpha.replace(')', '');

    if (alpha != 0) document.getElementById('colorSlide').classList.remove('is-lowest-value');
      else document.getElementById('colorSlide').classList.add('is-lowest-value');
    document.getElementById('colorSlide').value = alpha * 100;
    var elemChild = document.getElementById('colorSlideCont').children;
    for (var i=0; i<elemChild.length; i++) {
      elemChild[i].children[1].children[0].style.flex = String(alpha) + ' 1 0%';
      elemChild[i].children[1].children[1].style.flex = String(1 - alpha) + ' 1 0';
    }

    rgba = getStyle(elem)[11];
    alpha = rgba.split(',')[3];
    if (alpha == null) alpha = '1';
    alpha = alpha.replace(')', '');

    if (alpha != 0) document.getElementById('borderColorSlide').classList.remove('is-lowest-value');
      else document.getElementById('borderColorSlide').classList.add('is-lowest-value');
    document.getElementById('borderColorSlide').value = alpha * 100;
    var elemChild = document.getElementById('borderSlideCont').children;
    for (var i=0; i<elemChild.length; i++) {
      elemChild[i].children[1].children[0].style.flex = String(alpha) + ' 1 0%';
      elemChild[i].children[1].children[1].style.flex = String(1 - alpha) + ' 1 0';
    }

    // console.clear()

  } catch {}


    document.getElementById('fixedCheck').click();

  }

  //seleziona elemento nel TreeView
  var elementsTree = document.getElementById('parent').getElementsByClassName('li');
  for (var j=0; j<elementsTree.length; j++) {
      if (replaceIcons(elementsTree[j].innerText) == selectedId && !firstClick) elementsTree[j].style.backgroundColor = 'rgba(150, 150, 150, .2)';
      else elementsTree[j].style.backgroundColor = 'transparent';
  }


  // if ((document.getElementById('windowProperties').style.display == 'none' && selected && !firstClick) && (e.target.id.includes("Button ") || e.target.id.includes("Container ") || e.target.id.includes("Link ") || e.target.id.includes("Text ") || e.target.id.includes("MaterialIcon ") || e.target.id.includes("InputBox ") || e.target.id.includes("Textarea ") || e.target.id.includes("Section "))) openProprieties();
  // setTimeout(function () {
  //   if ((document.getElementById('windowProperties').style.display == 'none' && selected) && (e.target.id.includes("Button ") || e.target.id.includes("Container ") || e.target.id.includes("Link ") || e.target.id.includes("Text ") || e.target.id.includes("MaterialIcon ") || e.target.id.includes("InputBox ") || e.target.id.includes("Textarea ") || e.target.id.includes("Section "))) openProprieties();
  // }, 10);



  //SELEZIONO TASTI PROPRIETA
  if(selected) {

    compareWidth = document.getElementById('widthText').value;
    compareHeight = document.getElementById('heightText').value;

    if (compareWidth == '100%') document.querySelector('[name="width"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
      else document.querySelector('[name="width"]').style.backgroundColor = 'transparent';
    if (compareHeight == '100%') document.querySelector('[name="height"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
      else document.querySelector('[name="height"]').style.backgroundColor = 'transparent';

    if (document.getElementById('widthText').value == 'auto' && document.getElementById('heightText').value == 'auto') document.querySelector('[name="aspect"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
      else document.querySelector('[name="aspect"]').style.backgroundColor = 'transparent';


    var el = document.getElementById(selectedId), alignment = "";
    alignment = window.getComputedStyle(el.parentNode).getPropertyValue("justify-content");

    if (alignment == 'start') document.querySelector('[name="center-left"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
      else document.querySelector('[name="center-left"]').style.backgroundColor = 'transparent';
    if (alignment == 'center') document.querySelector('[name="center-center"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
      else document.querySelector('[name="center-center"]').style.backgroundColor = 'transparent';
    if (alignment == 'end') document.querySelector('[name="center-right"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
      else document.querySelector('[name="center-right"]').style.backgroundColor = 'transparent';

    verticalAlignment = window.getComputedStyle(el.parentNode).getPropertyValue("align-items");

    if (verticalAlignment == 'flex-start') document.querySelector('[name="top-flex"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
      else document.querySelector('[name="top-flex"]').style.backgroundColor = 'transparent';
    if (verticalAlignment == 'center') document.querySelector('[name="center-flex"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
      else document.querySelector('[name="center-flex"]').style.backgroundColor = 'transparent';
    if (verticalAlignment == 'flex-end') document.querySelector('[name="bottom-flex"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
      else document.querySelector('[name="bottom-flex"]').style.backgroundColor = 'transparent';

    if (document.getElementById('textAlignText').value == 'left' || document.getElementById('textAlignText').value == 'start') document.querySelector('[name="left"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
      else document.querySelector('[name="left"]').style.backgroundColor = 'transparent';
    if (document.getElementById('textAlignText').value == 'center') document.querySelector('[name="center"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
      else document.querySelector('[name="center"]').style.backgroundColor = 'transparent';
    if (document.getElementById('textAlignText').value == 'right') document.querySelector('[name="right"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
      else document.querySelector('[name="right"]').style.backgroundColor = 'transparent';
    if (document.getElementById('textAlignText').value == 'justify') document.querySelector('[name="justify"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
      else document.querySelector('[name="justify"]').style.backgroundColor = 'transparent';

    if (document.getElementById('verticalAlignSectionText').value == 'flex-start') document.querySelector('[name="vert-top"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
      else document.querySelector('[name="vert-top"]').style.backgroundColor = 'transparent';
    if (document.getElementById('verticalAlignSectionText').value == 'center') document.querySelector('[name="vert-center"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
      else document.querySelector('[name="vert-center"]').style.backgroundColor = 'transparent';
    if (document.getElementById('verticalAlignSectionText').value == 'flex-end') document.querySelector('[name="vert-bottom"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
      else document.querySelector('[name="vert-bottom"]').style.backgroundColor = 'transparent';

      checkExistOrder();

  }

  //FINE SELEZIONE TASTI PROPRIETA

});

document.addEventListener('dblclick', function(e) {


  if (e.target.id.includes("Button ") || e.target.id.includes("Container ") || e.target.id.includes("Image ") || e.target.id.includes("Menu ") || e.target.id.includes("Link ") || e.target.id.includes("Text ") || e.target.id.includes("MaterialIcon ") || e.target.id.includes("InputBox ") || e.target.id.includes("Textarea ")) {
    // openHeadLink('custHTML');
  }

});

function getPosition_slide() {

  var elem = document.getElementById(selectedId);
  document.getElementById('marginTopText').value = getStyle(elem)[31];
  document.getElementById('marginLeftText').value = getStyle(elem)[32];
  document.getElementById('marginBottomText').value = getStyle(elem)[33];
  document.getElementById('marginRightText').value = getStyle(elem)[34];

}

function setPosition_slide() {

  var elem = document.getElementById(selectedId);

  if (getStyle(elem)[31] != document.getElementById('marginTopText').value) {
    // val = document.getElementById('marginTopText').value.match(/(\d+)/)[0];
    // document.getElementById('marginTopText').value = val + 'px';
    setClasses('margin-top', 'marginTopText', styleName);
  }
  if (getStyle(elem)[32] != document.getElementById('marginLeftText').value) {
    // val = document.getElementById('marginLeftText').value.match(/(\d+)/)[0];
    // document.getElementById('marginLeftText').value = val + 'px';
    setClasses('margin-left', 'marginLeftText', styleName);
  }
  if (getStyle(elem)[33] != document.getElementById('marginBottomText').value) {
    // val = document.getElementById('marginBottomText').value.match(/(\d+)/)[0];
    // document.getElementById('marginBottomText').value = val + 'px';
    setClasses('margin-bottom', 'marginBottomText', styleName);
  }
  if (getStyle(elem)[34] != document.getElementById('marginRightText').value) {
    // val = document.getElementById('marginRightText').value.match(/(\d+)/)[0];
    // document.getElementById('marginRightText').value = val + 'px';
    setClasses('margin-right', 'marginRightText', styleName);
  }

}

var styleName = 'styleTheme';

function setProprieties() {

  var elem = document.getElementById(selectedId);

  if (getStyle(elem)[0].replaceAll('"', '').replaceAll("'", "") != document.getElementById('fontFamilyText').value) {
    setClasses('font-family', 'fontFamilyText', styleName);
  }
  if (getStyle(elem)[1] != document.getElementById('fontSizeText').value) {
    setClasses('font-size', 'fontSizeText', styleName);
  }
  if (getStyle(elem)[2] != document.getElementById('fontWeightText').value) {
    setClasses('font-weight', 'fontWeightText', styleName);
  }
  if (getStyle(elem)[3] != document.getElementById('letterSpacingText').value) {
    setClasses('letter-spacing', 'letterSpacingText', styleName);
  }
  if (getStyle(elem)[4] != document.getElementById('lineHeightText').value) {
    setClasses('line-height', 'lineHeightText', styleName);
  }
  if (getStyle(elem)[5] != document.getElementById('textAlignText').value) {
    setClasses('text-align', 'textAlignText', styleName);
  }
  if (getStyle(elem)[6] != document.getElementById('backgroundText').value) {
    setClasses('background-color', 'backgroundText', styleName);
    // document.getElementById(selectedId).click();
  }
  if (getStyle(elem)[7] != document.getElementById('colorText').value) {
    setClasses('color', 'colorText', styleName);
    // document.getElementById(selectedId).click();
  }
  if (getStyle(elem)[8] != document.getElementById('borderSizeText').value) {
    setClasses('border-width', 'borderSizeText', styleName);
  }
  if (getStyle(elem)[9] != document.getElementById('borderStyleText').value) {
    setClasses('border-style', 'borderStyleText', styleName);
  }
  if (getStyle(elem)[10] != document.getElementById('borderRadiusText').value) {
    setClasses('border-radius', 'borderRadiusText', styleName);
  }
  if (getStyle(elem)[11] != document.getElementById('borderColorText').value) {
    setClasses('border-color', 'borderColorText', styleName);
    // document.getElementById(selectedId).click();
  }
  if (getStyle(elem)[12] != document.getElementById('imageUrlText').value && document.getElementById('imageUrlText').value != 'image') {
    var val = document.getElementById('imageUrlText').value.replace('url("', "");
    if (val != '') document.getElementById('imageUrlText').value = 'url("' + val.replace('")', '') + '")';
    if (val == '') document.getElementById('imageUrlText').value = 'none';
    if (document.getElementById('imageUrlText').value == 'none' && selectedId.includes("Image ")) document.getElementById('imageUrlText').value = 'image';
    setClasses('background-size', 'imageSizeText', styleName);
    setClasses('background-image', 'imageUrlText', styleName);
    creaListElements();
  }
  if (getStyle(elem)[13] != document.getElementById('imageSizeText').value) {
    setClasses('background-size', 'imageSizeText', styleName);
  }
  if (getStyle(elem)[14] != document.getElementById('imagePositionText').value) {
    setClasses('background-position', 'imagePositionText', styleName);
  }
  if (getStyle(elem)[15] != document.getElementById('imageRepeatText').value) {
    setClasses('background-repeat', 'imageRepeatText', styleName);
  }

  setPosition_slide();

  if (getStyle(elem)[23] != document.getElementById('paddingTopText').value) {
    setClasses('padding-top', 'paddingTopText', styleName);
  }
  if (getStyle(elem)[24] != document.getElementById('paddingLeftText').value) {
    setClasses('padding-left', 'paddingLeftText', styleName);
  }
  if (getStyle(elem)[25] != document.getElementById('paddingBottomText').value) {
    setClasses('padding-bottom', 'paddingBottomText', styleName);
  }
  if (getStyle(elem)[26] != document.getElementById('paddingRightText').value) {
    setClasses('padding-right', 'paddingRightText', styleName);
  }

  if (getStyle(elem)[21] != document.getElementById('widthText').value) {

      if (document.getElementById('widthText').value == 'auto') {
        document.getElementById("whiteSpace").value = 'nowrap';
      } else {
        document.getElementById("whiteSpace").value = 'normal';
        if (!selectedId.includes('Row ') && !selectedId.includes('Section ') && !selectedId.includes('Container ')) {
          document.getElementById('displayTextNone').value = 'inline-block';
          // setClasses('display', 'displayTextNone', styleName);
        }
      }


      if (!(selectedId.includes('Section ')) && !document.getElementById('widthText').value.includes('100%')) {
          setClasses('white-space', 'whiteSpace', styleName);
          setClasses('width', 'widthText', styleName);
      }

      if (getStyle(elem)[21].includes('%') && getStyle(elem)[21].includes('calc') && !selectedId.includes('Section ')) {
        setPosition('fit-width');
        document.getElementById('widthText').value = '100%';
      } else {
        setClasses('white-space', 'whiteSpace', styleName);
        setClasses('width', 'widthText', styleName);
      }


  }

  if (getStyle(elem)[22] != document.getElementById('heightText').value && !selectedId.includes("Section ") && document.getElementById('heightText').value != null) {

    if (document.getElementById('heightText').value.includes("%")) {
      alertFun("You can't use percentage for the height. You can use vh (viewport height) or px", "red");
      document.getElementById('heightText').value = getStyle(elem)[22];
      return;
    }

    if (document.getElementById('heightText').value == 'auto') document.getElementById("whiteSpace").value = 'nowrap';
      else document.getElementById("whiteSpace").value = 'normal';
    setClasses('white-space', 'whiteSpace', styleName);

    if (!document.getElementById('heightText').value.includes('100%')) {
      setClasses('height', 'heightText', styleName);
    } else {
      setPosition('fit-height');
    }

    document.getElementById('minHeightTextSection').value = '0px';
    setClasses('min-height', 'minHeightTextSection', styleName);
  }

  if (getStyle(elem.parentNode)[6] != document.getElementById('occupiedText').value) {
    var tempSelectedId = selectedId;
    selectedId = elem.parentNode.id;
    setClasses('width', 'occupiedText', styleName);
    selectedId = tempSelectedId;
    // document.getElementById(selectedId).click();
  }

  if (getStyle(elem)[36] != document.getElementById('overflowYText').value) {
    setClasses('overflow-y', 'overflowYText', styleName);
  }
  if (getStyle(elem)[37] != document.getElementById('overflowXText').value) {
    setClasses('overflow-x', 'overflowXText', styleName);
  }

  if (getStyle(elem)[38] != document.getElementById('wrapText').value) {
    setClasses('flex-wrap', 'wrapText', styleName);
  }

  var valueDisplay = document.getElementById('displayText').value;
  if (valueDisplay == 'aligned') valueDisplay = 'inline-block';
  if (valueDisplay == 'unaligned') valueDisplay = 'block';
  document.getElementById('displayTextNone').value = valueDisplay;

    if (document.getElementById('valueCont').style.display == 'block') {
      elem.setAttribute("value", document.getElementById('valueText').value);
      elem.placeholder = document.getElementById('placeHolderText').value;
    } else if (document.getElementById('divPlaceHolder1').style.display == 'block') {
      elem.setAttribute("placeholder", document.getElementById('placeHolderText1').value);
    }

  // if (changedDisplay) {
  //   if(getStyle(elem)[28] == 'fixed' && valueDisplay == 'inline-block') {
  //     document.getElementById('displayText').value = 'unaligned';
  //     alertFun('To selecte aligned you must disable fixed scroll', 'blue');
  //    }
  //   else {
  //     setClasses('display', 'displayTextNone', styleName);
  //     if(valueDisplay == 'inline-block') {
  //       document.getElementById('fixedCheckNone').value = 'relative';
  //       setClasses('position', 'fixedCheckNone', styleName);
  //       document.getElementById('verticalAlignNone').value = 'middle';
  //       setClasses('vertical-align', 'verticalAlignNone', styleName);
  //      }
  //      if(valueDisplay == 'block') {
  //        document.getElementById('fixedCheckNone').value = 'absolute';
  //          setClasses('position', 'fixedCheckNone', styleName);
  //       }
  //
  //   }
  //
  //
  //   changedDisplay = false;
  // }

  // var valuePositionFixed = document.getElementById('fixedCheck').checked;
  // if (valuePositionFixed) valuePositionFixed = 'sticky';
  // if (!valuePositionFixed) valuePositionFixed = 'absolute';
  // document.getElementById('fixedCheckNone').value = valuePositionFixed;
  //
  // var topValue = document.getElementById('topText').value;
  //
  // if (changedPos) {
  //   if (topValue == 'auto') topValue = '0px';
  //   alert(topValue);
  //   setClasses('inset', 'topText', styleName);
  //   setClasses('position', 'fixedCheckNone', styleName);
  //   changedPos = false;
  // }

  try {
  const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

  document.getElementById('backgroundView').value = rgba2hex('rgb(' + getStyle(elem)[6].split(',')[0] + ', ' + getStyle(elem)[6].split(',')[1] + ', ' + getStyle(elem)[6].split(',')[2] + ')' );
  document.getElementById('colorView').value = rgba2hex('rgb(' + getStyle(elem)[7].split(',')[0] + ', ' + getStyle(elem)[7].split(',')[1] + ', ' + getStyle(elem)[7].split(',')[2] + ')' );
  document.getElementById('borderColorView').value = rgba2hex('rgb(' + getStyle(elem)[11].split(',')[0] + ', ' + getStyle(elem)[11].split(',')[1] + ', ' + getStyle(elem)[11].split(',')[2] + ')' );

  var rgba, alpha;

  rgba = getStyle(elem)[6];
  alpha = rgba.split(',')[3];
  if (alpha == null) alpha = '1';
  alpha = alpha.replace(')', '');

  if (alpha != 0) document.getElementById('backgroundSlide').classList.remove('is-lowest-value');
    else document.getElementById('backgroundSlide').classList.add('is-lowest-value');
  document.getElementById('backgroundSlide').value = alpha * 100;
  var elemChild = document.getElementById('backgroundSlideCont').children;
  for (var i=0; i<elemChild.length; i++) {
    elemChild[i].children[1].children[0].style.flex = String(alpha) + ' 1 0%';
    elemChild[i].children[1].children[1].style.flex = String(1 - alpha) + ' 1 0';
  }

  rgba = getStyle(elem)[7];
  alpha = rgba.split(',')[3];
  if (alpha == null) alpha = '1';
  alpha = alpha.replace(')', '');

  if (alpha != 0) document.getElementById('colorSlide').classList.remove('is-lowest-value');
    else document.getElementById('colorSlide').classList.add('is-lowest-value');
  document.getElementById('colorSlide').value = alpha * 100;
  var elemChild = document.getElementById('colorSlideCont').children;
  for (var i=0; i<elemChild.length; i++) {
    elemChild[i].children[1].children[0].style.flex = String(alpha) + ' 1 0%';
    elemChild[i].children[1].children[1].style.flex = String(1 - alpha) + ' 1 0';
  }

  rgba = getStyle(elem)[11];
  alpha = rgba.split(',')[3];
  if (alpha == null) alpha = '1';
  alpha = alpha.replace(')', '');

  if (alpha != 0) document.getElementById('borderColorSlide').classList.remove('is-lowest-value');
    else document.getElementById('borderColorSlide').classList.add('is-lowest-value');
  document.getElementById('borderColorSlide').value = alpha * 100;
  var elemChild = document.getElementById('borderSlideCont').children;
  for (var i=0; i<elemChild.length; i++) {
    elemChild[i].children[1].children[0].style.flex = String(alpha) + ' 1 0%';
    elemChild[i].children[1].children[1].style.flex = String(1 - alpha) + ' 1 0';
  }
  // console.clear()

  } catch {}

//SECTION-------------------------------------------

  if (getStyle(elem)[30] != document.getElementById('minHeightTextSection').value && selectedId.includes("Section")) {
    setClasses('min-height', 'minHeightTextSection', styleName);
  }
  if (getStyle(elem)[30] != document.getElementById('minHeightTextSection').value && !selectedId.includes("Section")) {
    heightText.value = 'auto';

    setClasses('height', 'heightText', styleName);

    // if (selectedId.includes('Container ')) {
    //   document.getElementById('displayTextNone').value = 'block';
    //   setClasses('display', 'displayTextNone', styleName);
    // }
    setClasses('min-height', 'minHeightTextSection', styleName);
  }

  setNameElement(selectedId);

  aggiustaSelect();
}

function getStyle(el){
    var display = window.getComputedStyle(el).getPropertyValue("display");
    el.style.display = "none";
    var fontFamily = window.getComputedStyle(el).getPropertyValue("font-family");
    var fontSize = window.getComputedStyle(el).getPropertyValue("font-size");
    var fontWeight = window.getComputedStyle(el).getPropertyValue("font-weight");
    var letterSpacing = window.getComputedStyle(el).getPropertyValue("letter-spacing");
    var lineHeight = window.getComputedStyle(el).getPropertyValue("line-height");
    var textAlign = window.getComputedStyle(el).getPropertyValue("text-align");

    var background = window.getComputedStyle(el).getPropertyValue("background-color");
    var color = window.getComputedStyle(el).getPropertyValue("color");

    // var borderSize = window.getComputedStyle(el).getPropertyValue("border-width");
    var borderStyle = window.getComputedStyle(el).getPropertyValue("border-style");
    var borderRadius = window.getComputedStyle(el).getPropertyValue("border-radius");
    var borderColor = window.getComputedStyle(el).getPropertyValue("border-color");

    var backgroundSize = window.getComputedStyle(el).getPropertyValue("background-size");
    var backgroundPosition = window.getComputedStyle(el).getPropertyValue("background-position");
    var backgroundRepeat = window.getComputedStyle(el).getPropertyValue("background-repeat");

    var appendChild = el.parentNode.id;

    var top = window.getComputedStyle(el).getPropertyValue("top");
    var left = window.getComputedStyle(el).getPropertyValue("left");
    var bottom = window.getComputedStyle(el).getPropertyValue("bottom");
    var right = window.getComputedStyle(el).getPropertyValue("right");

    var paddingTop = window.getComputedStyle(el).getPropertyValue("padding-top");
    var paddingLeft = window.getComputedStyle(el).getPropertyValue("padding-left");
    var paddingBottom = window.getComputedStyle(el).getPropertyValue("padding-bottom");
    var paddingRight = window.getComputedStyle(el).getPropertyValue("padding-right");

    var overflowY = window.getComputedStyle(el).getPropertyValue("overflow-y");
    var overflowX = window.getComputedStyle(el).getPropertyValue("overflow-x");

    var position = window.getComputedStyle(el).getPropertyValue("position");

    var margin = window.getComputedStyle(el).getPropertyValue("margin");

    var flexWrap = window.getComputedStyle(el).getPropertyValue("flex-wrap");

    var stringaMobile;
    if (displayMode == 'computer') stringaMobile = "";
    if (displayMode == 'mobile') stringaMobile = "-mobile";

    var rules = document.getElementById(styleName).sheet.cssRules;
    for (var i = 0; i < rules.length; i++) {
      if (rules[i].selectorText === "." + el.id.replace(" ", "") + stringaMobile) {
        var minHeight = rules[i].style["min-height"];
        var width = rules[i].style["width"];
        var height = rules[i].style["height"];
        var borderSize = rules[i].style["border-width"];
        var backgroundImage = rules[i].style["background-image"];
      }
    }

    if (backgroundImage == '' || backgroundImage == null) backgroundImage = window.getComputedStyle(el).getPropertyValue("background-image");
    if (width == '' || width == null) width = window.getComputedStyle(el).getPropertyValue("width");
    if (height == '' || height == null) height = window.getComputedStyle(el).getPropertyValue("height");
    if (minHeight == '' || minHeight == null) minHeight = window.getComputedStyle(el).getPropertyValue("min-height");
    if ((borderSize == '' || borderSize == null) && (selectedId.includes("Container ") || selectedId.includes("InputBox ") || selectedId.includes("Textarea "))) borderSize = '1px';
    if ((borderSize == '' || borderSize == null) && !(selectedId.includes("Container ") || selectedId.includes("InputBox ") || selectedId.includes("Textarea "))) borderSize = '0px';

    var marginTop = window.getComputedStyle(el).getPropertyValue("margin-top");
    var marginLeft = window.getComputedStyle(el).getPropertyValue("margin-left");
    var marginBottom = window.getComputedStyle(el).getPropertyValue("margin-bottom");
    var marginRight = window.getComputedStyle(el).getPropertyValue("margin-right");

    var verticalAlign = window.getComputedStyle(el).getPropertyValue("align-items");

    el.style.display = null;
    return [fontFamily, fontSize, fontWeight, letterSpacing, lineHeight, textAlign, background, color, borderSize, borderStyle, borderRadius, borderColor, backgroundImage, backgroundSize, backgroundPosition, backgroundRepeat, appendChild, top, left, bottom, right, width, height, paddingTop, paddingLeft, paddingBottom, paddingRight, display, position, margin, minHeight, marginTop, marginLeft, marginBottom, marginRight, verticalAlign, overflowY, overflowX, flexWrap]; //38
}

function aggiustaSelect() {
  var outline = document.getElementById('outlinerSelection');
  var outlineOUTER = document.getElementById('outlinerSelectionOUTER');
  var elem = document.getElementById(selectedId);

  if (!selected){
    return;
  }

  // outline.style.transform = window.getComputedStyle(elem).getPropertyValue("transform");

  // elem.style.transform = 'none';

  // if (window.getComputedStyle(elem).getPropertyValue("position") == 'absolute') {
  // var top = 0;
  // var left = 0;
  //   var a = elem;
  //   var arr = [];
  //   for(var n in a){
  //     a = a.parentNode;
  //     if(a.nodeName == 'BODY') // return if the element is the body element
  //       break;
  //      top += a.offsetTop;
  //      left += a.offsetLeft;
  //   }
  //   top = elem.offsetTop + top - 65;
  //   left = elem.offsetLeft + left - 15;

  outline.style.width = elem.getBoundingClientRect().width - 4;
  outline.style.height = elem.getBoundingClientRect().height - 4;

  outline.style.top = document.getElementById('board').scrollTop + elem.getBoundingClientRect().top - document.getElementById('board').getBoundingClientRect().top;
  var windowProperties = document.getElementById('windowOrderElements').style;
  if (windowProperties.display == 'none') outline.style.left = document.getElementById('board').scrollLeft + elem.getBoundingClientRect().left - document.getElementById('board').getBoundingClientRect().left;
  else outline.style.left = document.getElementById('board').scrollLeft + elem.getBoundingClientRect().left - document.getElementById('board').getBoundingClientRect().left;

  if (!selectedId.includes("Row") && !selectedId.includes("Section")) {
    try {
      outlineOUTER.style.width = elem.parentNode.getBoundingClientRect().width - 2;
      outlineOUTER.style.height = elem.getBoundingClientRect().height - 2;

      outlineOUTER.style.top = document.getElementById('board').scrollTop + elem.getBoundingClientRect().top - document.getElementById('board').getBoundingClientRect().top;

      if (windowProperties.display == 'none') outlineOUTER.style.left = document.getElementById('board').scrollLeft + elem.parentNode.getBoundingClientRect().left - document.getElementById('board').getBoundingClientRect().left;
      else outlineOUTER.style.left = document.getElementById('board').scrollLeft + elem.parentNode.getBoundingClientRect().left - document.getElementById('board').getBoundingClientRect().left;
    } catch {}
  }

  // } else {
  //   outline.style.top = elem.offsetTop;
  //   outline.style.left = elem.offsetLeft;
  // }

  elem = document.getElementById(selectedId);

  elem.style.transform = null;

}

function openSUBProprieties(id, arrowId) {

  var divProp = document.getElementById(id).style;
  var arrow = document.getElementById(arrowId).style;

  if (arrow.transform == 'rotate(90deg)') {
    arrow.transform = 'rotate(0deg)';
    divProp.display = 'none';
  } else {
    arrow.transform = 'rotate(90deg)';
    divProp.display = 'block';
  }

}

var likeMobile = false;

function setClasses(className, valueName, styleName) {

  // edited = true;

  // var styleBefore = String(window.getComputedStyle(document.getElementById(selectedId)).getPropertyValue(className));
  //
  // var styleElement = document.getElementById(styleName);
  // getId = getCss('.' + selectedId.replace(" ", ""), styleName);
  //
  // var lengthText = 0;
  // // console.log(getCss('.' + selectedId.replace(" ", "") + '-mobile' , styleName));
  //
  // cssTextCust = getCss('.' + selectedId.replace(" ", "") + '-mobile' , styleName);
  // cssTextCust = cssTextCust.replace('.' + selectedId.replace(" ", "") + '-mobile' + ' { ', "");
  //
  // cssTextCust = cssTextCust.replace('}', "");
  // cssTextCust = cssTextCust.replaceAll('; ', "\n");
  //
  // var lines = cssTextCust.split('\n');
  // for(var j = 0; j < lines.length;j++){
  //     lengthText ++;
  // }
  //
  // for (var i=0; i<lengthText; i++) {
  //   $("#styleElem").removeAttr("style");
  //   $("#styleElem").css(lines[i].split(':')[0], lines[i].split(':')[1]);
  //     if (String(window.getComputedStyle(document.getElementById('styleElem')).getPropertyValue(className)) == styleBefore) likeMobile = true;
  // }

  var valueDesktop, valueMobile;
  var rules = document.getElementById(styleName).sheet.cssRules;
  for (var i = 0; i < rules.length; i++) {
    if (rules[i].selectorText === "." + selectedId.replace(" ", "")) {
      valueDesktop = rules[i].style[className];
    }
    if (rules[i].selectorText === "." + selectedId.replace(" ", "") + '-mobile') {
      valueMobile = rules[i].style[className];
    }
  }

  // alert(className + ': ' + document.getElementById(valueName).value);

  if (valueDesktop == valueMobile) likeMobile = true;

    var styleElement = document.getElementById(styleName);
    getId = getCss('.' + selectedId.replace(" ", ""), styleName);

    if (displayMode == 'computer' && document.getElementById('customTheme').style.display == 'none') {

      if (likeMobile) {
        change_css_style (styleName, '.' + selectedId.replace(" ", "") + '-mobile', className, document.getElementById(valueName).value, posIndex);
      }

      change_css_style (styleName, '.' + selectedId.replace(" ", ""), className, document.getElementById(valueName).value, posIndex);
    } else if (displayMode == 'mobile' && document.getElementById('customTheme').style.display == 'none') {
      change_css_style (styleName, '.' + selectedId.replace(" ", "") + '-mobile', className, document.getElementById(valueName).value, posIndex);
    } else if (document.getElementById('customTheme').style.display == 'block') {
      change_css_style (styleName, '.' + selectedId.replace(" ", ""), className, document.getElementById(valueName).value, posIndex);
    }

    hasMobile = false;
    likeMobile = false;

  // var id = selectedId.replace(" ", "");
  // var elements = document.getElementsByClassName(id);
  // for(var i=0; i<elements.length; i++){
  //   var idClass = document.getElementById(elements[i].id);
  //   elements[i].classList.remove(id);
  //
  //   setTimeout(fun, 10);
  //   function fun() {
  //     idClass.classList.add(id);
  //   }
  //
  // }


}

function getCss(className, style) {
    var cssText = "";
    var classes = document.getElementById(style).sheet.cssRules;
    for (var x = 0; x < classes.length; x++) {
        if (classes[x].selectorText == className) {
            cssText += classes[x].cssText || classes[x].style.cssText;
        }
    }
    return cssText;
}


function change_css_style (titulo,selector,propiedad,valor, pos) {
  // alert(titulo + '----' + selector + '----' + propiedad + '----' + valor)
  getId = getCss(selector, styleName);

    if (getId != "") {
      let y=0;
      while (y<document.getElementById(titulo).sheet.cssRules.length) {
          if (document.getElementById(titulo).sheet.cssRules[y].selectorText==selector) {
            document.getElementById(titulo).sheet.cssRules[y].style[propiedad] = valor;
            y = document.getElementById(titulo).sheet.cssRules.length;
          }
        y++;
      }
    } else {
      //styleElement.innerHTML += '.' + selectedId.replace(" ", "") + '{' + className + ': ' + document.getElementById(valueName).value + ';} ';
      document.getElementById(titulo).sheet.insertRule(selector + '{' + propiedad + ': ' + valor + ';} ', pos);
    }



    var cssText = "";
    var classes = document.getElementsByClassName(styleName)[0].sheet.cssRules;
    for (var x = 0; x < classes.length; x++) {
            cssText += classes[x].cssText || classes[x].style.cssText;
            // console.log(classes[x].cssText || classes[x].style.cssText);
    }

    // setSectionHeight();

}

var myParam = "";

function openHeadLink(id, closeStructure) {

  if (document.getElementById('ombra').style.display == 'none') {
    document.getElementById('ombra').style.display = 'block';
    document.getElementById(id).style.display = 'block';
    // document.getElementById(id).style.animation = '.3s cubic-bezier(.175,.885,.32,1.275) 0s 1 popupAnim';
  } else if (document.getElementById('ombra').style.display == 'block') {

    document.getElementById('ombra').style.display = 'none';
    document.getElementById(id).style.display = 'none';
    // document.getElementById(id).style.animation = '';

    if (id == 'newProject') {
      openHeadLink('selectRow', false);
    }
  }

  if (closeStructure == true) document.getElementById('closeStructure').style.display = 'block';
  if (closeStructure == false) document.getElementById('closeStructure').style.display = 'none';


  if (id == 'headLink') {
    openFont();
  }

  if (id == 'imageManager') {

    if (document.getElementById('ombra').style.display == 'block') {

      const urlParams = new URLSearchParams(window.location.search);
      myParam = urlParams.get('event');

      var url = new URL(window.location);
      url.searchParams.set('popup', 'imageManager');
      window.history.pushState({}, '', url);
    } else {
      var uri = window.location.toString();
      if (uri.indexOf("?") > 0) {
          var clean_uri = uri.substring(0, uri.indexOf("?"));
          window.history.replaceState({}, document.title, clean_uri);
      }

      var url = new URL(window.location);
      url.searchParams.set('event', myParam);
      window.history.pushState({}, '', url);

    }

  }

  if (id == 'customTheme') {

    if (document.getElementById('ombra').style.display == 'block') {

      const urlParams = new URLSearchParams(window.location.search);
      myParam = urlParams.get('event');

      var url = new URL(window.location);
      url.searchParams.set('popup', 'customTheme');
      window.history.pushState({}, '', url);
    } else {
      var uri = window.location.toString();
      if (uri.indexOf("?") > 0) {
          var clean_uri = uri.substring(0, uri.indexOf("?"));
          window.history.replaceState({}, document.title, clean_uri);
      }

      var url = new URL(window.location);
      url.searchParams.set('event', myParam);
      window.history.pushState({}, '', url);

    }

    clickBoard();
    // getClassesAndIds();
    openFont('text_formatFont Link');
  }

  if (id == 'custHTML') {
    // getHTMLProperties();
  }

  if (id == 'addContainer') {

    document.getElementById('colorPaletteDivContruct').innerHTML = '';
    for (var i=0; i<colorPalette.length; i++) {
      document.getElementById('colorPaletteDivContruct').innerHTML += "<div id='" + id + "_color_" + colorPalette[i].colorName + "' class='scale-up-center selectColor' onclick='selectColorConstruct(this);' style='background-color: " + colorPalette[i].color + ";' data-color='" + colorPalette[i].color + "'></div>";
    }
    if (colorPalette.length == 0) document.getElementById('colorPaletteDivContruct').innerHTML = "<div style='color: rgb(255, 255, 255, .6); font-size: 13px; text-align: center; width: 100%; margin-top: 2px;'>No color palettes</div>";

  }

  if (id == 'link') {

    document.getElementById('selectPageCont').innerHTML = '';

    for (var x=0; x<pagesJSON.length; x++) {

      // if (pagesJSON[x].name == document.getElementById('currentPageText').innerText) continue;

      var html = "<div onclick='selectPageLink(this);' class='button' style='transition: .3s; width: 80%; margin: 10px auto; border: 1px solid rgb(200, 200, 200, .1); border-radius: 6px; padding: 10px 12px; cursor: pointer; user-select: none; display: flex; justify-content:space-between;'>"
        + "<div>"
          + "<span style='font-size: 13px; color: rgb(255, 255, 255, .7); vertical-align: middle; margin-left: 5px;'>"
            + pagesJSON[x].name.replace("OFF__::", "")
          + "</span>"
        + "</div>"
      + "</div>";

      document.getElementById('selectPageCont').innerHTML += html;

    }

    for (var w=0; w<linksJSON.length; w++) {
      if (linksJSON[w].elem == selectedId) {
        document.getElementById('linkText').value = linksJSON[w].link;
        linkType = linksJSON[w].type;

        if (linkType == 'new tab_true') document.getElementById('openInNewTab').checked = true;
        else document.getElementById('openInNewTab').checked = false;

        if (linkType == 'page') selectLinkType("internal");

        if (linkType == 'element') {
          document.getElementById('goToText').innerHTML = '<b>Go to: </b>' + linksJSON[w].link + "<span onclick='togliSelectedElementLink();' style='vertical-align: middle; font-family: Material Icons; cursor: pointer; margin-left: 10px; margin-top: -2px; font-size: 20px; color: rgb(255, 255, 255, .8);'>close</span>";
          document.getElementById('goToText').style.display = null;
          selectLinkType("element");
        }

        var list = document.getElementById('selectPageCont').children;
        for (var i=0; i<list.length; i++) {
          if (list[i].innerText + '.html' == linksJSON[w].link) {
            selectedPage = list[i].innerText;
            list[i].style.backgroundColor = 'rgba(150, 150, 150, .1)';
            list[i].style.border = null;
          }
        }

      }
    }
  }

  if (id == 'addElementPopup') {

    for (var i=0; i<nameElementsJson.length; i++) {
      if (nameElementsJson[i].id == selectedSectionId) {
        document.getElementById('spanTitleAddElement').innerHTML = '<span style="max-width: 130px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">(' + nameElementsJson[i].name.toUpperCase() + '</span>)';
      }
      if (nameElementsJson[i].id == document.getElementById(selectedSectionId).parentNode.children[document.getElementById(selectedSectionId).parentNode.children.length - 1].id) {
        document.getElementById('spanNextToSection').innerHTML = '<span style="margin-left: 5px; width: 90px; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">next to ' + nameElementsJson[i].name.toUpperCase() + '</span>';
      }
    }

  }

  if (id == 'pagesManager') {

    document.getElementById('listPages').innerHTML = '';

    for (var x=0; x<pagesJSON.length; x++) {

      var html = "<div id='page" + x + "' onclick='selectPage(this);' class='button' style='transition: .3s; width: 80%; margin: 10px auto; border: 1px solid rgb(200, 200, 200, .1); border-radius: 6px; padding: 10px 12px; cursor: pointer; user-select: none; display: flex; justify-content:space-between;'>"
        + "<div>"
          + "<span style='font-size: 13px; color: rgb(255, 255, 255, .7); vertical-align: middle; margin-left: 5px;'>"
            + pagesJSON[x].name.replace("OFF__::", "")
          + "</span>"
        + "</div>"
        + "<div id='renameDiv' style='display: none;' onclick='event.stopPropagation();'>"
          + "<input style='font-family: Inter; background-color: rgb(255, 255, 255, .1); color: rgb(255, 255, 255, .7); border: 1px solid rgb(255, 255, 255, .1); padding: 2px 5px; border-radius: 4px;' />"
        + "</div>"
        + "<div class='buttonsManagePage'>"
          + "<span onclick='event.stopPropagation(); renamePage(this);' class='buttonMaterial' style='font-size: 13px; color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-right: 5px; padding: 5px; border-radius: 900px;'>edit</span>"
          if (pagesJSON[x].type == 'main') {
            html += "<span onclick='event.stopPropagation(); deletePage(this);' class='buttonMaterial' style='font-size: 13px; color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-right: -5px; padding: 5px; border-radius: 900px; opacity: .3; poiner-events: none;'>remove</span>"
          } else {
            html += "<span onclick='event.stopPropagation(); deletePage(this);' class='buttonMaterial' style='font-size: 13px; color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-right: -5px; padding: 5px; border-radius: 900px;'>remove</span>"
          }

          html += "<div style='height: 20px; margin: auto 15px auto 20px; width: 2px; background-color: rgb(200, 200, 200, .1); display: inline-block; vertical-align: middle;'></div>";

          if (pagesJSON[x].type == 'main') {
            html += "<span title='Set as first page' onclick='event.stopPropagation(); setMain(this);' class='buttonMaterial' style='color: var(--secondary); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-right: 0; padding: 5px; border-radius: 900px;'>check_box</span>";
          } else {
            html += "<span title='Set as first page' onclick='event.stopPropagation(); setMain(this);' class='buttonMaterial' style='color: var(--secondary); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-right: 0; padding: 5px; border-radius: 900px;'>check_box_outline_blank</span>";
          }

        html += "</div>"
      + "</div>";

      document.getElementById('listPages').innerHTML += html;

      if (pagesJSON[x].name.replace("OFF__::", "") == 'deleted') document.getElementById("page" + x).style.display = 'none';

      document.getElementById("namePagesText").value = '';

    }

    document.getElementById('page' + currentPageID).style.border = '1px solid rgb(255, 255, 255, .7)';
    document.getElementById('page' + currentPageID).children[2].children[1].style.opacity = '.3';
    document.getElementById('page' + currentPageID).children[2].children[1].style.pointerEvents = 'none';
    if (pagesMode == 'Include') document.getElementById('page' + currentPageID).style.display = 'none';

    // PAGES MODE --------------------------------
    var buttonsManagePage = document.getElementsByClassName('buttonsManagePage');

    if (pagesMode == 'Drop' || pagesMode == 'Include') {
      document.getElementsByClassName('pagesListItem')[0].style.display = 'none';
      document.getElementById('divisionPages').style.display = 'none';
      for(var i=0; i<buttonsManagePage.length; i++) {
        buttonsManagePage[i].style.display = 'none';
      }
      document.getElementById('pagesManager').style.width = '360px';
    } else {
      document.getElementsByClassName('pagesListItem')[0].style.display = null;
      document.getElementById('divisionPages').style.display = null;
      for(var i=0; i<buttonsManagePage.length; i++) {
        buttonsManagePage[i].style.display = null;
      }
      document.getElementById('pagesManager').style.width = '460px';
    }

    // --------------------------------

  }

  if (id == 'animationsManager') {

    document.getElementById('listAnimations').innerHTML = '';

    var html = "";
    html += "<div style='height: 20px; background-color: var(--primary); position: fixed; width: 100%; z-index: 1000;'></div><div style='border-radius: 6px; position: fixed; left: calc(10% - 14px); width: 80%; z-index: 1000; margin: 5px auto; padding: 10px 12px; background-color: #13181F; color: rgb(255, 255, 255, .7); font-size: 13px;'><span style='margin-left: 30px;'>Name</span><span style='margin-left: 110px;'>Load / On Screen</span></div><div style='height: 40px;'></div>";

    document.getElementById('listAnimations').innerHTML += html;

    for (var x=0; x<animationsJSON.length; x++) {

      var loadText = "radio_button_checked";
      var onscreenText = "radio_button_unchecked";

      var isThis = false;
      for (var w=0; w<animationsToElement.length; w++) {
        if (animationsToElement[w].idElem == selectedId && animationsToElement[w].idAnimation == animationsJSON[x].idAnimation) {
          if (animationsToElement[w].whenActive == "onscreen") {
            loadText = "radio_button_unchecked";
            onscreenText = "radio_button_checked";
          }
          isThis = true;
        }
      }

      html = "";

      if (isThis) html += "<div data-idanimation='" + animationsJSON[x].idAnimation + "' onclick='selectAnimation(this);' class='button' style='transition: .3s; width: 80%; margin: 10px auto; border: 1px solid rgb(200, 200, 200, .1); border-radius: 6px; padding: 10px 12px; cursor: pointer; user-select: none; display: flex; justify-content:space-between; border: 1px solid rgb(255, 255, 255, .7);'>"
      if (!isThis) html += "<div data-idanimation='" + animationsJSON[x].idAnimation + "' onclick='selectAnimation(this);' class='button' style='transition: .3s; width: 80%; margin: 10px auto; border: 1px solid rgb(200, 200, 200, .1); border-radius: 6px; padding: 10px 12px; cursor: pointer; user-select: none; display: flex; justify-content:space-between;'>"
        html += "<div>"
          + "<span style='font-size: 13px; color: rgb(255, 255, 255, .7); vertical-align: middle; margin-left: 5px;'>"
            + "<span id='checkFixed' style='font-family: Material Icons; font-size: 20px; margin-right: 10px; vertical-align: middle;'>animation</span>" + "<span style='overflow: hidden; white-space: nowrap; text-overflow: ellipsis; width: 100px; display: inline-block;'>" + animationsJSON[x].nameAnimation + "</span>"
          + "</span>"
        + "</div>"
        + "<div id='renameDiv' style='display: none;' onclick='event.stopPropagation();'>"
          + "<input style='font-family: Inter; background-color: rgb(255, 255, 255, .1); color: rgb(255, 255, 255, .7); border: 1px solid rgb(255, 255, 255, .1); padding: 2px 5px; border-radius: 4px;' />"
        + "</div>"
        + "<div class='buttonsManagePage'>"

        if (isThis) html += "<span id='contSettingAnimation' style='opacity: 1; transition: 0s; pointer-events: auto;'>"
        if (!isThis) html += "<span id='contSettingAnimation' style='opacity: 0; transition: 0s; pointer-events: none;'>"
        html += "<span id='loadCheck' onclick='event.stopPropagation(); setWhenActive(this);' class='buttonMaterial' style='margin-right: 9px; font-size: 13px; color: var(--secondary); font-family: Material Icons; font-size: 18px; vertical-align: middle; padding: 5px; border-radius: 900px;'>" + loadText + "</span>"
          + "<span style='font-size: 13px; color: rgb(255, 255, 255, .7); font-size: 18px; vertical-align: middle; padding: 5px 0; border-radius: 900px;'>/</span>"
          + "<span id='onscreenCheck' onclick='event.stopPropagation(); setWhenActive(this);' class='buttonMaterial' style='margin-left: 9px; font-size: 13px; color: var(--secondary); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-right: 10px; padding: 5px; border-radius: 900px;'>" + onscreenText + "</span>"
        + "</span>"

          + "<span onclick='event.stopPropagation(); editAnimation(this.parentNode.parentNode);' class='buttonMaterial' style='font-size: 13px; color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-left: 15px; margin-right: 5px; padding: 5px; border-radius: 900px;'>edit</span>"
          // + "<span onclick='event.stopPropagation(); deleteAnimation(this.parentNode.parentNode);' class='buttonMaterial' style='font-size: 13px; color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-right: -5px; padding: 5px; border-radius: 900px;'>remove</span>"
        html += "</div>"
      + "</div>";

      if (animationsJSON[x].nameAnimation != 'deleted') document.getElementById('listAnimations').innerHTML += html;

    }

    // document.getElementById('page' + currentPageID).style.border = '1px solid rgb(255, 255, 255, .7)';

    if (x == 0) {
      document.getElementById('listAnimations').innerHTML = "<div style='width: calc(100% - 2px); text-align: center; margin-top: 0;'>"
                  +  "<p style='font-size: 14px; color: rgb(255, 255, 255, .4); user-select: none;'><span style='font-family: Material Icons; font-size: 20px; position: relative; top: 5px;'>hourglass_disabled</span> No animations yet</p>"
                +  "</div>";
    }

  }

  if (id == 'projectSettings') {

    document.getElementById('divProjectName').children[0].focus();
    document.getElementById('divProjectName').children[0].value = projectName;
    document.getElementById('authorText').value = author;
    document.getElementById('keywordsText').value = keywords;
    document.getElementById('descriptionText').value = description;

    document.getElementById('incorporatesCSS').checked = incorporatesCSS;

  }

  var elemTextCssTheme = document.getElementById('textCSSTheme');
  var elemTextCss = document.getElementById('textCSS');
  if (id == 'custCSS') {
    var tag = document.getElementById(selectedId).tagName.toLowerCase();
    if (document.getElementById(selectedId).tagName.toLowerCase() == 'ul') tag = 'menu';
    if (selectedId.includes("Image ")) tag = 'image';
    var cssTextCust = getCss('.' + tag + '-plater', 'styleTheme');
    cssTextCust = cssTextCust.replace('.' + tag + '-plater { ', "");
    cssTextCust = cssTextCust.replace('}', "");
    cssTextCust = cssTextCust.replaceAll('; ', "\n");
    elemTextCssTheme.value = cssTextCust;

    var lengthText = 0;
    var lengthText2 = 0;
    var lines = elemTextCssTheme.value.split('\n');
    for(var i = 0;i < lines.length;i++){
        lengthText ++;
    }

    var cssTextCust;
    if (displayMode == 'computer') cssTextCust = getCss('.' + selectedId.replace(" ", "") , styleName);
    if (displayMode == 'mobile') cssTextCust = getCss('.' + selectedId.replace(" ", "") + '-mobile' , styleName);
    if (displayMode == 'computer') cssTextCust = cssTextCust.replace('.' + selectedId.replace(" ", "") + ' { ', "");
    if (displayMode == 'mobile') cssTextCust = cssTextCust.replace('.' + selectedId.replace(" ", "") + '-mobile' + ' { ', "");
    cssTextCust = cssTextCust.replace('}', "");
    cssTextCust = cssTextCust.replaceAll('; ', "\n");

    var lines2 = cssTextCust.split('\n');
    for(var j = 0; j < lines2.length;j++){
        lengthText2 ++;
    }

    for (var i=0; i<lengthText; i++) {
      for(var j = 0; j < lengthText2;j++){
        if (lines[i].split(':')[0] == lines2[j].split(':')[0]) {
          elemTextCssTheme.value = elemTextCssTheme.value.replace(elemTextCssTheme.value.split('\n')[i], "");
        }
      }
    }

    elemTextCss.value = cssTextCust;
    elemTextCssTheme.value = elemTextCssTheme.value.replaceAll(/^\s*[\r\n]/gm, "");

  }

}

window.addEventListener('popstate', function(event) {

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('event') == '' || urlParams.get('event') == null) window.location.href="dashboard.php";

    var popups = document.getElementById('ombra').children;
    for (var i=0; i<popups.length; i++) {
      if (popups[i].style.display == 'block') {
        openHeadLink(popups[i].id);
        break;
      }
    }

}, false);

function openFont(classId) {
  //Cambia colore

  document.getElementById('contCustomElem').style.display = 'none';
  document.getElementById('contFontLink').style.display = 'block';
  document.getElementById('contColorPalette').style.display = 'none';

  const elements = document.getElementsByClassName("elemCust");
  var a = 0;
  while(a < elements.length){
    elements[a].style.boxShadow = null;
    a++;
  }

  elements[0].children[0].style.boxShadow = 'inset 2px 0 0 var(--secondary_opacity)';
  elements[0].children[1].style.boxShadow = null;

  caricaTabellaFont();

}

function openColor(classId) {
  //Cambia colore

  document.getElementById('contCustomElem').style.display = 'none';
  document.getElementById('contFontLink').style.display = 'none';
  document.getElementById('contColorPalette').style.display = 'block';

  const elements = document.getElementsByClassName("elemCust");
  var a = 0;
  while(a < elements.length){
    elements[a].style.boxShadow = null;
    a++;
  }

  elements[0].children[0].style.boxShadow = null;
  elements[0].children[1].style.boxShadow = 'inset 2px 0 0 var(--secondary_opacity)';

  //carico tabella colori
  caricaTabellaColors();

}

function addColor() {

  var totColors = colorPalette.length + 1;
  var existColorName = false;

  for (var i=0; i<colorPalette.length; i++) {
    if (colorPalette[i].colorName == document.getElementById('colorNameText').value) existColorName = true;
  }

  if (existColorName) alertFun("Exist another color with the same name", "blue");
  if (document.getElementById('colorNameText').value == '') alertFun("You have to add a name", "blue");;
  if (document.getElementById('colorNameText').value == '' || existColorName) return;

  colorPalette.push({
                     "colorName" : document.getElementById('colorNameText').value,
                     "color" : document.getElementById('colorPreview').style.backgroundColor,
                     "position" : totColors
                   });

  document.getElementById('colorNameText').value = '';

  caricaTabellaColors();

  openHeadLink("addColorPalette");
}

function setColorPosition() {
  for (var i=0; i<colorPalette.length; i++) {
    colorPalette[i].position = i + 1;
  }
}

function removeColor(id) {
  edited = true;

  id = id.replace('removeColor', '');

  document.querySelector('[name="applyDelColor"]').id = id;
  openAlertDelColor();

}

function openAlertDelColor() {

  var id = 'alertDeleteColor';

  if (document.getElementById('alertDelColorOmbra').style.display == 'none') {
    document.getElementById('alertDelColorOmbra').style.display = 'block';
    document.getElementById(id).style.display = 'block';
    document.getElementById(id).style.animation = '.3s cubic-bezier(.175,.885,.32,1.275) 0s 1 popupAnim';
  } else {
    document.getElementById('alertDelColorOmbra').style.display = 'none';
    document.getElementById(id).style.display = 'none';
    document.getElementById(id).style.animation = '';
  }

}

function caricaTabellaColors() {

  if (colorPalette.length != 0) document.getElementById("divEmptyColors").style.display = 'none';
  else document.getElementById("divEmptyColors").style.display = null;

  //cancello tabella
  document.getElementById('tableColors').innerHTML = ""

  var headerTable = ""
  + "<thead style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(100, 100, 100, .1); border-radius: 6px;'"
    + "<td style='padding: 15px 10px; text-align: left; display: none;'></td>"
    + "<td style='border-top-left-radius: 6px; border-bottom-left-radius: 6px; padding: 15px 10px 15px 20px; text-align: left; font-size: 13.5px; letter-spacing: .3px; width: 10px;'></td>"
    + "<td style='padding: 15px 0; text-align: left; width: 80%; font-size: 13.5px; padding: 15px 10px 15px 0; letter-spacing: .3px;'>Color Name</td>"
    + "<td style='border-top-right-radius: 6px; border-bottom-right-radius: 6px; padding: 15px 10px; text-align: left; widtd: 30%;'></td>"
  + "</thead>";

  document.getElementById('tableColors').innerHTML = headerTable;

  var totId = 0;

  for (var i=0; i<colorPalette.length; i++) {
    for (var a=0; a<colorPalette.length; a++) {
      if (parseInt(colorPalette[a].position) - 1 == i) {

        colorName = colorPalette[a].colorName;
        color = colorPalette[a].color;
        creaTabellaColorPalette(totId, colorName, color);
        totId ++;

      }
    }
  }

}

function creaTabellaColorPalette(id, colorName, color) {

  var html = "<tr id='trColor" + id + "' style='background-color: rgb(100, 100, 100, .1);'>"
    + "<td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 0px; width: 5px;'>"
      + "<div style='background-color: " + color + "; height: 30px; width: 30px; border-radius: 7px; margin: 0 auto;'></div>"
    + "</td>"
    + "<td>"
      + "<div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%;'>"
        + "<p id='colorName" + id + "' style='font-size: 14px;'>" + colorName + "</p>"
      + "</div>"
    + "</td>"
    + "<td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; width: 20px; text-align: right;'>"
      + "<p id='removeColor" + id + "' onclick='removeColor(this.id);' class='button' style='color: rgb(255, 255, 255, .4); user-select: none; padding: 6px; border-radius: 50%; margin: 0;'>"
        + "<span id='removeColor' style='font-size: 22px; font-family: Material Icons; transition: .3s;'>"
          + 'remove'
        + "</span>"
      + "</p>"
    + "</td>"

  + "</tr>"

  document.getElementById('tableColors').innerHTML += html;

}

function caricaTabellaFont() {

  //cancello tabella
  document.getElementById('tableFonts').innerHTML = ""

  var headerTable = ""
  + "<thead style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(100, 100, 100, .1); border-radius: 6px;'"
    + "<td style='padding: 15px 10px; text-align: left; display: none;'></td>"
    + "<td style='border-top-left-radius: 6px; border-bottom-left-radius: 6px; padding: 15px 10px 15px 20px; text-align: left; font-size: 13.5px; letter-spacing: .3px; width: 5px;'>Font Family</td>"
    + "<td style='padding: 15px 0; text-align: left; width: 80%; font-size: 13.5px; padding: 15px 10px 15px 20px; letter-spacing: .3px;'>Font Weight</td>"
    + "<td style='border-top-right-radius: 6px; border-bottom-right-radius: 6px; padding: 15px 10px; text-align: left; widtd: 30%;'></td>"
  + "</thead>";

  document.getElementById('tableFonts').innerHTML = headerTable;

  var totId = 0;
  var cssText;

  var classes = document.getElementsByClassName(styleName)[1].sheet.cssRules;
  for (var x = 0; x < classes.length; x++) {
          cssText = classes[x].cssText || classes[x].style.cssText;
          creaTabellaFontLink(totId, cssText.split("family=")[1].split(":wght")[0], cssText.split(":wght@")[1].split("&display")[0], 'remove', '');
          totId ++;
  }

}

function creaTabellaFontLink(id, fontFamily, fontWeight, removeIcon, addIcon) {

  var html = "<tr id='trFont" + id + "' style='background-color: rgb(100, 100, 100, .1);'>"
    + "<td style='border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding: 20px; width: 30px; white-space: nowrap;'>"
      + "<div style='font-size: 14px; color: rgb(255, 255, 255, .6); width: 100%;'>"
        + "<p id='fontFamilyLink" + id + "' style='font-size: 14px;'>" + fontFamily.replaceAll("+", " ") + "</p>"
      + "</div>"
    + "</td>"
    + "<td>";

    var totWeight = fontWeight.split(";");
    for (var k=0; k<totWeight.length; k++) {
      html += "<span id='fontWeightLink" + id + "' style='font-size: 14px; color: rgb(255, 255, 255, .6); padding: 2px 8px; background-color: rgb(255, 255, 255, .2); border-radius: 14px; margin: 0 2px;'>" + totWeight[k] + "</span>";
    }

    if (fontFamily.replaceAll("+", " ") != 'Material Icons' && fontFamily.replaceAll("+", " ") != 'Inter') {
      html += "</td>"
      + "<td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; width: 20px;'>"

          html += "<p id='removeFontLink" + id + "' onclick='removeFont(this.id);' class='button' style='color: rgb(255, 255, 255, .4); user-select: none; padding: 6px; border-radius: 50%; margin: 0;'>"
        + "<span id='removeFontLink' style='font-size: 22px; font-family: Material Icons; transition: .3s;'>"
          + removeIcon
        + "</span>"
      + "</p>"
      + "</td>"

    } else {
      html += "</td>"
      + "<td style='border-top-right-radius: 10px; border-bottom-right-radius: 10px; width: 20px;'>"

      html += "<p style='color: rgb(255, 255, 255, .2); user-select: none; padding: 6px; border-radius: 50%; margin: 0;'>"
        + "<span style='font-size: 22px; font-family: Material Icons; transition: .3s;'>"
          + 'lock'
        + "</span>"
      + "</p>"

      + "</td>"
    }


  + "</tr>"

  document.getElementById('tableFonts').innerHTML += html;

}

function deleteFromArrayFont(ev) {

  var findFont = document.getElementById("tableFonts").children[parseInt(ev.id)].children[0].children[0].innerText;
  arrayFont.splice(arrayFont.indexOf(findFont), 1);
  creaListFont();

}

function removeFont(id) {
  edited = true;

  id = id.replace('removeFontLink', '');
  id = id.replace('addFontLink', '');

  document.querySelector('[name="applyDelFont"]').id = id;
  openAlertDelFont();

}

function openAlertDelFont() {

  var id = 'alertDeleteFont';

  if (document.getElementById('alertDelFontOmbra').style.display == 'none') {
    document.getElementById('alertDelFontOmbra').style.display = 'block';
    document.getElementById(id).style.display = 'block';
    document.getElementById(id).style.animation = '.3s cubic-bezier(.175,.885,.32,1.275) 0s 1 popupAnim';
  } else {
    document.getElementById('alertDelFontOmbra').style.display = 'none';
    document.getElementById(id).style.display = 'none';
    document.getElementById(id).style.animation = '';
  }

}

function addFont(id) {

  edited = true;

  if (document.getElementById('fontFamilyLink' + id).value != '') {

    document.getElementsByClassName(styleName)[1].sheet.insertRule("@import url('https://fonts.googleapis.com/css2?family=" + document.getElementById('fontFamilyLink' + id).value.replaceAll(" ", "+") + ":wght@" + "100;300;400;600;700;800" + "&display=swap');", 0);

    arrayFont.push(document.getElementById('fontFamilyLink' + id).value);

    document.getElementById('fontFamilyLink' + id).value = "";

    openFont('text_formatFont Link');
    alertFun("Font added successfully", 'green');
  }

  creaListFont();

}

function creaListFont() {

  document.getElementById("fontFamilyText").innerHTML = "";
  document.getElementById("fontFamilyTextCustomize").innerHTML = "";

  for (var i=0; i<arrayFont.length; i++) {

    document.getElementById("fontFamilyText").innerHTML +=
      "<option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>" + arrayFont[i] + "</option>";
    document.getElementById("fontFamilyTextCustomize").innerHTML +=
      "<option style='background-color: var(--primary); color: var(--white); font-family: Inter; font-size: 14px;'>" + arrayFont[i] + "</option>";

  }

}

function getClassesAndIds() {

  // let y=0;
  // while (y<document.getElementById('styleTheme').sheet.cssRules.length) {
  //     if (document.getElementById('styleTheme').sheet.cssRules[y].selectorText=='.button-plater') {
  //       document.getElementById('styleTheme').sheet.cssRules[y].style['padding'] = '100%';
  //       y = document.getElementById('styleTheme').sheet.cssRules.length;
  //     }
  //   y++;
  // }

  let cssText = "";
  var classes = document.getElementById('styleTheme').sheet.cssRules;
  for (var x = 0; x < classes.length; x++) {
          cssText += classes[x].cssText || classes[x].style.cssText;
  }

  var arr = cssText.match(/(?:[\.]{1})([a-zA-Z_]+[\w-_]*)(?:[\s\.\,\{\>#\:]{0})/igm);

  const elements = document.getElementsByClassName("elemCust");
  // try {
    while(elements.length > 0){
        var elem = document.getElementById(elements[0].innerText.replace(".", "").split("::")[1]);
        elements[0].remove();
        try {elem.remove();} catch {}
    }
  // } catch {}
  var exist = false;

  var div = document.createElement("DIV");
  div.className = "elemCust";
  div.innerHTML = "<div onclick='openFont(this.innerText);' style='width: 100%; text-align: left; color: rgb(255, 255, 255, .7); padding: 13px 0 18px 30px; user-select: none; cursor: pointer; border-radius: 0px; margin-bottom: 3px; font-size: 15px;' class='button'>" + "<span style='font-size: 22px; font-family: Material Icons; padding-right: 6; position: relative; top: 6px;'>text_format</span>Font Link</a>" + "</div>"
  div.innerHTML += "<div onclick='openColor(this.innerText);' style='width: 100%; text-align: left; color: rgb(255, 255, 255, .7); padding: 13px 0 18px 30px; user-select: none; cursor: pointer; border-radius: 0px; margin-bottom: 3px; font-size: 15px;' class='button'>" + "<span style='font-size: 22px; font-family: Material Icons; padding-right: 6; position: relative; top: 6px;'>palette</span>Color Palette</a>" + "</div>"
  div.innerHTML += "<div style='width: 100%; height: 1px; background-color: rgb(200, 200, 200, .2); margin-bottom: 3px;'></div>"
  document.getElementById('contElemCustomise').appendChild(div);

  for (var i=0; i<arr.length; i++) {

    for(var b=0; b<document.getElementsByClassName("elemCust").length; b++){
      if (document.getElementsByClassName("elemCust")[b].innerText == arr[i]) {
        exist = true;
      }
    }

    if (!exist && arr[i].indexOf('-plater') != -1) {

      var stringaElem = "";

      if (arr[i].replace("-plater", "").replace("." , "") == 'div') stringaElem = '<span class="iconMenu">featured_video</span><span style="position: relative; top: 1px; left: 7px; font-size: 15px;">Container</span>';
      if (arr[i].replace("-plater", "").replace("." , "") == 'button') stringaElem = '<span class="iconMenu">pin</span><span style="position: relative; top: 1px; left: 7px; font-size: 15px;">Button</span>';
      if (arr[i].replace("-plater", "").replace("." , "") == 'label') stringaElem = '<span class="iconMenu">format_list_bulleted</span><span style="position: relative; top: 1px; left: 7px; font-size: 15px;">Text</span>';
      if (arr[i].replace("-plater", "").replace("." , "") == 'a') stringaElem = '<span class="iconMenu">link</span><span style="position: relative; top: 1px; left: 7px; font-size: 15px;">Link Text</span>';
      if (arr[i].replace("-plater", "").replace("." , "") == 'span') stringaElem = '<span class="iconMenu">spa</span><span style="position: relative; top: 1px; left: 7px; font-size: 15px;">Material Icon</span>';
      if (arr[i].replace("-plater", "").replace("." , "") == 'input') stringaElem = '<span class="iconMenu">text_fields</span><span style="position: relative; top: 1px; left: 7px; font-size: 15px;">Input</span>';
      if (arr[i].replace("-plater", "").replace("." , "") == 'textarea') stringaElem = '<span class="iconMenu">text_fields</span><span style="position: relative; top: 1px; left: 7px; font-size: 15px;">Textarea</span>';

      var displayBut = "block";
      if (arr[i].replace("-plater", "").replace("." , "") == 'image') displayBut = "none";
      if (arr[i].replace("-plater", "").replace("." , "") == 'menu') displayBut = "none";

      //bottoni di fianco
      var div = document.createElement("DIV");
      div.className = "elemCust buttonsTheme";
      div.style = "display: " + displayBut;
      div.innerHTML = "<div onclick='selectedElemCustom(this.innerText);' style='width: 100%; text-align: left; color: rgb(255, 255, 255, .7); padding: 18px 0 18px 30px; user-select: none; cursor: pointer; border-radius: 0px;' class='button'>" + stringaElem + '<span style="color: transparent; width: 1px; white-space: nowrap; max-width: 80px; display:inline-block; overflow: hidden; position: relative; vertical-align: middle; transform: scale(0);">' + '::' + arr[i] + '</span>' + "</div>"
      document.getElementById('contElemCustomise').appendChild(div);

      //div contenitore
      var div = document.createElement("DIV");
      div.id = arr[i].replace(".", "");
      div.style.border = '1px dashed rgb(0, 0, 0, .6)';
      div.style.textAlign = 'left';
      div.style.padding = '2px';
      div.style.position = 'absolute';
      div.style.top = '0';
      div.style.left = '0';
      div.style.bottom = '0';
      div.style.right = '0';
      div.style.margin = 'auto';
      document.getElementById('whiteBoardCustom').appendChild(div);

      var elem = document.createElement(arr[i].replace(".", "").replace("-plater", "").toUpperCase());
      elem.className = arr[i].replace(".", "");
      elem.id = arr[i].replace(".", "");
      elem.innerHTML = arr[i].replace(".", "").replace("-plater", "");

      if (arr[i].replace(".", "").replace("-plater", "") == 'span') elem.innerHTML = 'spa';

      elem.style.display = 'inline-block';
      elem.style.resize = 'none';
      document.getElementById(arr[i].replace(".", "")).appendChild(elem);


      var elCreated = document.getElementById(arr[i].replace(".", "")).getElementsByClassName(arr[i].replace(".", ""))[0];

      document.getElementById(arr[i].replace(".", "")).style.display = 'none';
      document.getElementById('contCustomElem').style.display = 'none';
      document.getElementById('contFontLink').style.display = 'none';
      document.getElementById('contColorPalette').style.display = 'none';

    }
    exist = false;

  }

  $('.buttonsTheme').sort(function(a, b) {
    if (a.textContent < b.textContent) {
      return -1;
    } else {
      return 1;
    }
  }).appendTo('#contElemCustomise');

}

var selectedIdCustomize;

function selectedElemCustom(classId) {

  document.getElementById('contCustomElem').style.display = 'block';
  document.getElementById('contFontLink').style.display = 'none';
  document.getElementById('contColorPalette').style.display = 'none';

  classId = classId.split("::")[1];

  //Cambia colore
  const elements = document.getElementsByClassName("elemCust");
  var a = 0;
  while(a < elements.length){
      if (elements[a].innerText.split("::")[1] != classId) {
        elements[a].style.boxShadow = null;
      } else {
        elements[a].style.boxShadow = 'inset 2px 0 0 var(--secondary_opacity)';
        selectedIdCustomize = elements[a].innerText.split("::")[1];
      }
      if (a != 0) document.getElementById(elements[a].innerText.replace(".", "").split("::")[1]).style.display = 'none';
      a++;
  }

  elements[0].children[0].style.boxShadow = null;
  elements[0].children[1].style.boxShadow = null;

  //

  var elemCust = document.getElementById(classId.replace(".", ""));
  document.getElementById('contCustomElem').style.display = 'inline-block';
  elemCust.style.display = 'inline-block';
  elemCust.style.transform = 'scale(.8)';
  elemCust.style.transition = '.3s transform';
  setTimeout(fun, 10);  function fun() {elemCust.style.transform = 'scale(1)';}


    var elemTextCss = document.getElementById('textCSSCustom');
    var cssTextCust = getCss(classId, 'styleTheme');
    cssTextCust = cssTextCust.replace(classId + ' { ', "");
    cssTextCust = cssTextCust.replace('}', "");
    cssTextCust = cssTextCust.replaceAll('; ', "\n");
    elemTextCss.textContent = cssTextCust;

    customClass = classId;

    caricaProprietaCustomizeTheme(classId);

}

function caricaProprietaCustomizeTheme(className) {

  var elem = document.getElementById(className.replace(".", "")).getElementsByClassName(className.replace(".", ""))[0];

  creaListFont();

  document.getElementById('fontFamilyTextCustomize').value = getStyle(elem)[0].replaceAll('"', '').replaceAll("'", "");
  document.getElementById('fontSizeTextCustomize').value = getStyle(elem)[1];
  document.getElementById('fontWeightTextCustomize').value = getStyle(elem)[2];
  document.getElementById('letterSpacingTextCustomize').value = getStyle(elem)[3];
  document.getElementById('lineHeightTextCustomize').value = getStyle(elem)[4];
  document.getElementById('textAlignTextCustomize').value = getStyle(elem)[5];
  document.getElementById('backgroundTextCustomize').value = getStyle(elem)[6];
  document.getElementById('colorTextCustomize').value = getStyle(elem)[7];
  document.getElementById('borderSizeTextCustomize').value = getStyle(elem)[8];
  document.getElementById('borderStyleTextCustomize').value = getStyle(elem)[9];
  document.getElementById('borderRadiusTextCustomize').value = getStyle(elem)[10];
  document.getElementById('borderColorTextCustomize').value = getStyle(elem)[11];
  document.getElementById('imageUrlTextCustomize').value = getStyle(elem)[12];
  document.getElementById('imageSizeTextCustomize').value = getStyle(elem)[13];
  document.getElementById('imagePositionTextCustomize').value = getStyle(elem)[14];
  document.getElementById('imageRepeatTextCustomize').value = getStyle(elem)[15];

  document.getElementById(className.replace(".", "")).style.width = elem.clientWidth + 2 * parseInt(getStyle(elem)[8]);
  document.getElementById(className.replace(".", "")).style.height = elem.clientHeight + 2 * parseInt(getStyle(elem)[8]);

  document.getElementById(customClass.replace(".", "")).style.width = elem.clientWidth + 2 * parseInt(getStyle(elem)[8]);
  document.getElementById(customClass.replace(".", "")).style.height = elem.clientHeight + 2 * parseInt(getStyle(elem)[8]);
  if (elem.clientWidth > document.getElementById('contCustomThemeElement').clientWidth) {
    document.getElementById(customClass.replace(".", "")).style.right = 'auto';
    document.getElementById(customClass.replace(".", "")).style.margin = '0';
  } else {
    document.getElementById(customClass.replace(".", "")).style.right = '0';
    document.getElementById(customClass.replace(".", "")).style.margin = 'auto';
  }

  if (elem.clientHeight > document.getElementById('contCustomThemeElement').clientHeight) {
    document.getElementById(customClass.replace(".", "")).style.bottom = 'auto';
    document.getElementById(customClass.replace(".", "")).style.margin = '0';
  } else {
    document.getElementById(customClass.replace(".", "")).style.bottom = '0';
    document.getElementById(customClass.replace(".", "")).style.margin = 'auto';
  }

  document.getElementById('widthTextCustomize').value = getStyle(elem)[21];
  document.getElementById('heightTextCustomize').value = getStyle(elem)[22];
  document.getElementById('paddingTopTextCustomize').value = getStyle(elem)[23];
  document.getElementById('paddingLeftTextCustomize').value = getStyle(elem)[24];
  document.getElementById('paddingBottomTextCustomize').value = getStyle(elem)[25];
  document.getElementById('paddingRightTextCustomize').value = getStyle(elem)[26];

  checkAlignTheme();

  try {

    const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

    document.getElementById('backgroundViewCustomize').value = rgba2hex('rgb(' + getStyle(elem)[6].split(',')[0].replace( /^\D+/g, '') + ', ' + getStyle(elem)[6].split(',')[1].replace( /^\D+/g, '') + ', ' + getStyle(elem)[6].split(',')[2].replace( /^\D+/g, '').replace(')', '') + ')' );
    document.getElementById('colorViewCustomize').value = rgba2hex('rgba(' + getStyle(elem)[7].split(',')[0].replace( /^\D+/g, '') + ', ' + getStyle(elem)[7].split(',')[1].replace( /^\D+/g, '') + ', ' + getStyle(elem)[7].split(',')[2].replace( /^\D+/g, '').replace(')', '') + ')' );
    document.getElementById('borderColorViewCustomize').value = rgba2hex('rgb(' + getStyle(elem)[11].split(',')[0].replace( /^\D+/g, '') + ', ' + getStyle(elem)[11].split(',')[1].replace( /^\D+/g, '') + ', ' + getStyle(elem)[11].split(',')[2].replace( /^\D+/g, '').replace(')', '') + ')' );

  var rgba, alpha;

  rgba = getStyle(elem)[6];
  alpha = rgba.split(',')[3];
  if (alpha == null) alpha = '1';
  alpha = alpha.replace(')', '');

  if (alpha != 0) document.getElementById('backgroundSlideCustomize').classList.remove('is-lowest-value');
    else document.getElementById('backgroundSlideCustomize').classList.add('is-lowest-value');
  document.getElementById('backgroundSlideCustomize').value = alpha * 100;
  var elemChild = document.getElementById('backgroundSlideContCustomize').children;
  for (var i=0; i<elemChild.length; i++) {
    elemChild[i].children[1].children[0].style.flex = String(alpha) + ' 1 0%';
    elemChild[i].children[1].children[1].style.flex = String(1 - alpha) + ' 1 0';
  }

  rgba = getStyle(elem)[7];
  alpha = rgba.split(',')[3];
  if (alpha == null) alpha = '1';
  alpha = alpha.replace(')', '');

  if (alpha != 0) document.getElementById('colorSlideCustomize').classList.remove('is-lowest-value');
    else document.getElementById('colorSlideCustomize').classList.add('is-lowest-value');
  document.getElementById('colorSlideCustomize').value = alpha * 100;
  var elemChild = document.getElementById('colorSlideContCustomize').children;
  for (var i=0; i<elemChild.length; i++) {
    elemChild[i].children[1].children[0].style.flex = String(alpha) + ' 1 0%';
    elemChild[i].children[1].children[1].style.flex = String(1 - alpha) + ' 1 0';
  }

  rgba = getStyle(elem)[11];
  alpha = rgba.split(',')[3];
  if (alpha == null) alpha = '1';
  alpha = alpha.replace(')', '');

  if (alpha != 0) document.getElementById('borderColorSlideCustomize').classList.remove('is-lowest-value');
    else document.getElementById('borderColorSlideCustomize').classList.add('is-lowest-value');
  document.getElementById('borderColorSlideCustomize').value = alpha * 100;
  var elemChild = document.getElementById('borderSlideContCustomize').children;
  for (var i=0; i<elemChild.length; i++) {
    elemChild[i].children[1].children[0].style.flex = String(alpha) + ' 1 0%';
    elemChild[i].children[1].children[1].style.flex = String(1 - alpha) + ' 1 0';
  }

  // console.clear()

} catch {}

}

function checkAlignTheme() {
  if (document.getElementById('textAlignTextCustomize').value == 'left' || document.getElementById('textAlignTextCustomize').value == 'start') document.querySelector('[name="leftCustomize"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
    else document.querySelector('[name="leftCustomize"]').style.backgroundColor = 'transparent';
  if (document.getElementById('textAlignTextCustomize').value == 'center') document.querySelector('[name="centerCustomize"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
    else document.querySelector('[name="centerCustomize"]').style.backgroundColor = 'transparent';
  if (document.getElementById('textAlignTextCustomize').value == 'right') document.querySelector('[name="rightCustomize"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
    else document.querySelector('[name="rightCustomize"]').style.backgroundColor = 'transparent';
  if (document.getElementById('textAlignTextCustomize').value == 'justify') document.querySelector('[name="justifyCustomize"]').style.backgroundColor = 'rgb(150, 150, 150, .1)';
    else document.querySelector('[name="justifyCustomize"]').style.backgroundColor = 'transparent';
}

function applyCustomCSSTheme() {

  edited = true;

  text = document.getElementById('textCSSCustom');

  var elem = document.getElementById(customClass.replace(".", "")).getElementsByClassName(customClass.replace(".", ""))[0];

  if (getStyle(elem)[0] != document.getElementById('fontFamilyTextCustomize').value) {
    text.textContent += 'font-family: ' + document.getElementById('fontFamilyTextCustomize').value + '\n';
  }
  if (getStyle(elem)[1] != document.getElementById('fontSizeTextCustomize').value) {
    text.textContent += 'font-size: ' + document.getElementById('fontSizeTextCustomize').value + '\n';
  }
  if (getStyle(elem)[2] != document.getElementById('fontWeightTextCustomize').value) {
    text.textContent += 'font-weight: ' + document.getElementById('fontWeightTextCustomize').value + '\n';
  }
  if (getStyle(elem)[3] != document.getElementById('letterSpacingTextCustomize').value) {
    text.textContent += 'letter-spacing: ' + document.getElementById('letterSpacingTextCustomize').value + '\n';
  }
  if (getStyle(elem)[4] != document.getElementById('lineHeightTextCustomize').value) {
    text.textContent += 'line-height: ' + document.getElementById('lineHeightTextCustomize').value + '\n';
  }
  if (getStyle(elem)[5] != document.getElementById('textAlignTextCustomize').value) {
    text.textContent += 'text-align: ' + document.getElementById('textAlignTextCustomize').value + '\n';
  }
  if (getStyle(elem)[6] != document.getElementById('backgroundTextCustomize').value) {
    text.textContent += 'background: ' + document.getElementById('backgroundTextCustomize').value + '\n';
  }
  if (getStyle(elem)[7] != document.getElementById('colorTextCustomize').value) {
    text.textContent += 'color: ' + document.getElementById('colorTextCustomize').value + '\n';
  }
  if (getStyle(elem)[8] != document.getElementById('borderSizeTextCustomize').value) {
    text.textContent += 'border-width: ' + document.getElementById('borderSizeTextCustomize').value + '\n';
  }
  if (getStyle(elem)[9] != document.getElementById('borderStyleTextCustomize').value) {
    text.textContent += 'border-style: ' + document.getElementById('borderStyleTextCustomize').value + '\n';
  }
  if (getStyle(elem)[10] != document.getElementById('borderRadiusTextCustomize').value) {
    text.textContent += 'border-radius: ' + document.getElementById('borderRadiusTextCustomize').value + '\n';
  }
  if (getStyle(elem)[11] != document.getElementById('borderColorTextCustomize').value) {
    text.textContent += 'border-color: ' + document.getElementById('borderColorTextCustomize').value + '\n';
  }
  if (getStyle(elem)[12] != document.getElementById('imageUrlTextCustomize').value) {
    var val = document.getElementById('imageUrlTextCustomize').value.replace('url("', "");
    document.getElementById('imageUrlTextCustomize').value = 'url("' + val.replace('")', '') + '")';
    text.textContent += 'background-size: ' + document.getElementById('imageSizeTextCustomize').value + '\n';
    text.textContent += 'background-image: ' + document.getElementById('imageUrlTextCustomize').value + '\n';
  }
  if (getStyle(elem)[13] != document.getElementById('imageSizeTextCustomize').value) {
    text.textContent += 'background-size: ' + document.getElementById('imageSizeTextCustomize').value + '\n';
  }
  if (getStyle(elem)[14] != document.getElementById('imagePositionTextCustomize').value) {
    text.textContent += 'background-position: ' + document.getElementById('imagePositionTextCustomize').value + '\n';
  }
  if (getStyle(elem)[15] != document.getElementById('imageRepeatTextCustomize').value) {
    text.textContent += 'background-repeat: ' + document.getElementById('imageRepeatTextCustomize').value + '\n';
  }
  if (getStyle(elem)[21] != document.getElementById('widthTextCustomize').value) {
    if (document.getElementById('widthTextCustomize').value == 'auto') document.getElementById("whiteSpace").value = 'nowrap';
      else document.getElementById("whiteSpace").value = 'normal';
    text.textContent += 'white-space: ' + document.getElementById('whiteSpace').value + '\n';

    text.textContent += 'width: ' + document.getElementById('widthTextCustomize').value + '\n';
  }
  if (getStyle(elem)[22] != document.getElementById('heightTextCustomize').value) {
    if (document.getElementById('heightTextCustomize').value == 'auto') document.getElementById("whiteSpace").value = 'nowrap';
      else document.getElementById("whiteSpace").value = 'normal';
    text.textContent += 'white-space: ' + document.getElementById('whiteSpace').value + '\n';

    text.textContent += 'height: ' + document.getElementById('heightTextCustomize').value + '\n';
  }
  if (getStyle(elem)[23] != document.getElementById('paddingTopTextCustomize').value) {
    text.textContent += 'padding-top: ' + document.getElementById('paddingTopTextCustomize').value + '\n';
  }
  if (getStyle(elem)[24] != document.getElementById('paddingLeftTextCustomize').value) {
    text.textContent += 'padding-left: ' + document.getElementById('paddingLeftTextCustomize').value + '\n';
  }
  if (getStyle(elem)[25] != document.getElementById('paddingBottomTextCustomize').value) {
    text.textContent += 'padding-bottom: ' + document.getElementById('paddingBottomTextCustomize').value + '\n';
  }
  if (getStyle(elem)[26] != document.getElementById('paddingRightTextCustomize').value) {
    text.textContent += 'padding-right: ' + document.getElementById('paddingRightTextCustomize').value + '\n';
  }

  applyCustomCSS("textCSSCustom", customClass, "0");
  var cssTextCust = getCss(customClass, 'styleTheme');
  cssTextCust = cssTextCust.replace(customClass + ' { ', "");
  cssTextCust = cssTextCust.replace('}', "");
  cssTextCust = cssTextCust.replaceAll('; ', "\n");
  text.textContent = cssTextCust;

  elem.style.width = null;
  elem.style.height = null;

  if (!getStyle(elem)[21].includes('%')) {
    document.getElementById(customClass.replace(".", "")).style.width = elem.clientWidth + 2 * parseInt(getStyle(elem)[8]);
  } else {
    document.getElementById(customClass.replace(".", "")).style.width = 'calc(' + getStyle(elem)[21] + ' + ' + 2 * parseInt(getStyle(elem)[8]) + 'px)';
    elem.style.width = '100%';
  }

  if (!getStyle(elem)[22].includes('%')) {
    document.getElementById(customClass.replace(".", "")).style.height = elem.clientHeight + 2 * parseInt(getStyle(elem)[8]);
  } else {
    document.getElementById(customClass.replace(".", "")).style.height = 'calc(' + getStyle(elem)[22] + ' + ' + 2 * parseInt(getStyle(elem)[8]) + 'px)';
    elem.style.height = '100%';
  }


  if (elem.clientWidth > document.getElementById('contCustomThemeElement').clientWidth) {
    document.getElementById(customClass.replace(".", "")).style.right = 'auto';
    document.getElementById(customClass.replace(".", "")).style.margin = '0';
  } else {
    document.getElementById(customClass.replace(".", "")).style.right = '0';
    document.getElementById(customClass.replace(".", "")).style.margin = 'auto';
  }

  if (elem.clientHeight > document.getElementById('contCustomThemeElement').clientHeight) {
    document.getElementById(customClass.replace(".", "")).style.bottom = 'auto';
    document.getElementById(customClass.replace(".", "")).style.margin = '0';
  } else {
    document.getElementById(customClass.replace(".", "")).style.bottom = '0';
    document.getElementById(customClass.replace(".", "")).style.margin = 'auto';
  }

}

function applyCustomCSS(valueName, className, pos) {

  edited = true;

    if (displayMode == 'mobile') className = className + '-mobile';

    var elemTextCss = document.getElementById(valueName);

    var lengthText = 0;
    var lines = elemTextCss.value.replaceAll(";", "").split('\n');
    for(var i = 0;i < lines.length;i++){
        lengthText ++;
    }

    //delete all rules
    var styleTag = document.getElementById (styleName);
    var sheet = styleTag.sheet ? styleTag.sheet : styleTag.styleSheet;

    if (sheet.cssRules) {
        for (var i=0; i<sheet.cssRules.length; i++) {

            if (sheet.cssRules[i].selectorText === className) {
                sheet.deleteRule (i);
            }
        }
    }

    var trovataShadow = false;
    for (var i=0; i<lengthText; i++) {
         // if (lines[i].split(':')[0] == 'box-shadow') {
         //   document.getElementById(selectedId).style.boxShadow = null;
         //   trovataShadow = true;
         // }

        change_css_style (styleName, className, lines[i].split(':')[0], lines[i].replace(lines[i].split(':')[0] + ':', ""), pos);
    }

    // try { if (!trovataShadow && selectedId.includes("Container ")) {
    //   document.getElementById(selectedId).style.boxShadow = '0px 0px 2px black inset';
    // } } catch {}

    if (className.includes("-plater")) {
      var elem = document.getElementById(className.replace(".", ""));

      // document.getElementById(className.replace(".", "")).style.width = 'auto';
      // document.getElementById(className.replace(".", "")).style.height = 'auto';
      // var width = document.getElementsByClassName(className.replace(".", ""))[0].clientWidth;
      // var height = document.getElementsByClassName(className.replace(".", ""))[0].clientHeight;
      // document.getElementById(className.replace(".", "")).style.width = width;
      // document.getElementById(className.replace(".", "")).style.height = height;

    }

    if (!className.includes("-plater") && !valueName.includes("Duplicate")) alertFun("CSS applied successfully", "green");
    //setProprieties();

}

function setPosition(pos) {

  edited = true;

  var el = document.getElementById(selectedId);

  var posPositionText = document.getElementById('posPositionText');
  var posTopText = document.getElementById('yText');
  var posLeftText = document.getElementById('xText');

  var widthText = document.getElementById('widthText');
  var heightText = document.getElementById('heightText');

  posPositionText.value = 'relative';

  if (pos == 'center-left') {

    document.getElementById('justifyContentOuterText').value = window.getComputedStyle(el).getPropertyValue("justify-content");
    setClasses('justify-content', 'justifyContentOuterText', styleName);

    if (document.getElementById('marginRightText').value != '0px') {
      document.getElementById('marginRightText').value = '0px';
      setClasses('margin-right', 'marginRightText', styleName);
    }

    selectedId = document.getElementById(selectedId).parentNode.id;
    document.getElementById('justifyContentOuterText').value = 'start';
    setClasses('justify-content', 'justifyContentOuterText', styleName);
    selectedId = document.getElementById(selectedId).children[0].id;

  }
  if (pos == 'center-center') {

    document.getElementById('justifyContentOuterText').value = window.getComputedStyle(el).getPropertyValue("justify-content");
    setClasses('justify-content', 'justifyContentOuterText', styleName);


    if (document.getElementById('marginLeftText').value != '0px') {
      document.getElementById('marginLeftText').value = '0px';
      setClasses('margin-left', 'marginLeftText', styleName);
    }
    if (document.getElementById('marginRightText').value != '0px') {
      document.getElementById('marginRightText').value = '0px';
      setClasses('margin-right', 'marginRightText', styleName);
    }

    selectedId = document.getElementById(selectedId).parentNode.id;
    document.getElementById('justifyContentOuterText').value = 'center';
    setClasses('justify-content', 'justifyContentOuterText', styleName);
    selectedId = document.getElementById(selectedId).children[0].id;
  }
  if (pos == 'center-right') {

    document.getElementById('justifyContentOuterText').value = window.getComputedStyle(el).getPropertyValue("justify-content");
    setClasses('justify-content', 'justifyContentOuterText', styleName);

    if (document.getElementById('marginLeftText').value != '0px') {
      document.getElementById('marginLeftText').value = '0px';
      setClasses('margin-left', 'marginLeftText', styleName);
    }

    selectedId = document.getElementById(selectedId).parentNode.id;
    document.getElementById('justifyContentOuterText').value = 'end';
    setClasses('justify-content', 'justifyContentOuterText', styleName);
    selectedId = document.getElementById(selectedId).children[0].id;
  }


  if (pos == 'top-flex') {

    document.getElementById('justifyContentOuterText').value = window.getComputedStyle(el).getPropertyValue("align-items");
    setClasses('align-items', 'justifyContentOuterText', styleName);

    selectedId = document.getElementById(selectedId).parentNode.id;
    document.getElementById('justifyContentOuterText').value = 'flex-start';
    setClasses('align-items', 'justifyContentOuterText', styleName);
    selectedId = document.getElementById(selectedId).children[0].id;

  }
  if (pos == 'center-flex') {

    document.getElementById('justifyContentOuterText').value = window.getComputedStyle(el).getPropertyValue("align-items");
    setClasses('align-items', 'alignItemsText', styleName);


    selectedId = document.getElementById(selectedId).parentNode.id;
    document.getElementById('alignItemsText').value = 'center';
    setClasses('align-items', 'alignItemsText', styleName);
    selectedId = document.getElementById(selectedId).children[0].id;
  }
  if (pos == 'bottom-flex') {

    document.getElementById('alignItemsText').value = window.getComputedStyle(el).getPropertyValue("align-items");
    setClasses('align-items', 'alignItemsText', styleName);

    selectedId = document.getElementById(selectedId).parentNode.id;
    document.getElementById('alignItemsText').value = 'flex-end';
    setClasses('align-items', 'alignItemsText', styleName);
    selectedId = document.getElementById(selectedId).children[0].id;
  }


  if (pos == 'fit-width') {

    document.getElementById("whiteSpace").value = 'normal';
    setClasses('white-space', 'whiteSpace', styleName);

    var size = 0, sizePerc = 100;
    if (parseInt(getStyle(el)[8]) > 0 && getStyle(el)[9] != 'none'){
      if (getStyle(el)[8].replace(parseInt(getStyle(el)[8]), "") != '%') size += 2 * parseInt(getStyle(el)[8]);
      if (getStyle(el)[8].replace(parseInt(getStyle(el)[8]), "") == '%') sizePerc -= 2 * parseInt(getStyle(el)[8]);
    } else {
      document.getElementById('widthText').value = '100%';
    }

    if (parseInt(getStyle(el)[24]) > 0 && (selectedId.includes("MaterialIcon ") || selectedId.includes("Text ") || selectedId.includes("Link ") || selectedId.includes("Container ") || selectedId.includes("Image "))){
      if (getStyle(el)[24].replace(parseInt(getStyle(el)[24]), "") != '%') size += parseInt(getStyle(el)[24]);
      if (getStyle(el)[24].replace(parseInt(getStyle(el)[24]), "") == '%') sizePerc -= parseInt(getStyle(el)[24]);
    } else {
      document.getElementById('widthText').value = '100%';
    }

    if (parseInt(getStyle(el)[26]) > 0 && (selectedId.includes("MaterialIcon ") || selectedId.includes("Text ") || selectedId.includes("Link ") || selectedId.includes("Container ") || selectedId.includes("Image "))){
      if (getStyle(el)[26].replace(parseInt(getStyle(el)[26]), "") != '%') size += parseInt(getStyle(el)[26]);
      if (getStyle(el)[26].replace(parseInt(getStyle(el)[26]), "") == '%') sizePerc -= parseInt(getStyle(el)[26]);
    } else {
      document.getElementById('widthText').value = '100%';
    }

    if (parseInt(getStyle(el)[8]) > 0 || parseInt(getStyle(el)[24]) > 0 || parseInt(getStyle(el)[26]) > 0)
      document.getElementById('widthText').value = 'calc(' + sizePerc + '% - ' + size + 'px' + ')';

    if (selectedId.includes("InputBox ") || selectedId.includes("Textarea "))
      document.getElementById('widthText').value = '100%';

     setClasses('width', 'widthText', styleName);
     document.getElementById('widthText').value = '100%';
  }
  if (pos == 'fit-height') {

    document.getElementById("whiteSpace").value = 'normal';
    setClasses('white-space', 'whiteSpace', styleName);

    var size = 0, sizePerc = 100;
    if (parseInt(getStyle(el)[8]) > 0 && getStyle(el)[9] != 'none'){
      if (getStyle(el)[8].replace(parseInt(getStyle(el)[8]), "") != '%') size += 2 * parseInt(getStyle(el)[8]);
      if (getStyle(el)[8].replace(parseInt(getStyle(el)[8]), "") == '%') sizePerc -= 2 * parseInt(getStyle(el)[8]);
    } else {
      document.getElementById('heightText').value = '100%';
    }

    if (parseInt(getStyle(el)[23]) > 0 && selectedId.includes("MaterialIcon ") || selectedId.includes("Text ") || selectedId.includes("Link ") || selectedId.includes("Container ") || selectedId.includes("Image ")){
      if (getStyle(el)[23].replace(parseInt(getStyle(el)[23]), "") != '%') size += parseInt(getStyle(el)[23]);
      if (getStyle(el)[23].replace(parseInt(getStyle(el)[23]), "") == '%') sizePerc -= parseInt(getStyle(el)[23]);
    } else {
      document.getElementById('heightText').value = '100%';
    }

    if (parseInt(getStyle(el)[25]) > 0 && selectedId.includes("MaterialIcon ") || selectedId.includes("Text ") || selectedId.includes("Link ") || selectedId.includes("Container ") || selectedId.includes("Image ")){
      if (getStyle(el)[25].replace(parseInt(getStyle(el)[25]), "") != '%') size += parseInt(getStyle(el)[25]);
      if (getStyle(el)[25].replace(parseInt(getStyle(el)[25]), "") == '%') sizePerc -= parseInt(getStyle(el)[25]);
    } else {
      document.getElementById('heightText').value = '100%';
    }

    if (parseInt(getStyle(el)[8]) > 0 || parseInt(getStyle(el)[23]) > 0 || parseInt(getStyle(el)[25]) > 0)
      document.getElementById('heightText').value = 'calc(' + sizePerc + '% - ' + size + 'px' + ')';

    if (selectedId.includes("InputBox ") || selectedId.includes("Textarea "))
      document.getElementById('heightText').value = '100%';

    setClasses('height', 'heightText', styleName);
    document.getElementById('heightText').value = '100%';

    document.getElementById('minHeightTextSection').value = '0px';
    setClasses('min-height', 'minHeightTextSection', styleName);

    // setPercentageHeight();

  }
  if (pos == 'fit-minHeight') {

    document.getElementById("minHeightTextSection").value = '100vh';
    setClasses('min-height', 'minHeightTextSection', styleName);

  }
  if (pos == 'aspect-ratio') {

    widthText.value = 'auto';
    heightText.value = 'auto';
    setClasses('width', 'widthText', styleName);
    setClasses('height', 'heightText', styleName);

    document.getElementById("whiteSpace").value = 'nowrap';
    setClasses('white-space', 'whiteSpace', styleName);

    // if (selectedId.includes('Container ')) {
    //   document.getElementById('displayTextNone').value = 'block';
    //   setClasses('display', 'displayTextNone', styleName);
    // }

  }

  var backgroundImageAspect = window.getComputedStyle(document.getElementById(selectedId)).getPropertyValue("background-image");

  if (pos == 'aspect-ratio' && selectedId.includes('Image ') && !backgroundImageAspect.includes("none")) { //immagine

    var img = new Image();
    img.onload = function(){
        widthText.value = this.width + 'px';
        heightText.value = this.height + 'px';
        setClasses('width', 'widthText', styleName);
        setClasses('height', 'heightText', styleName);

        aggiustaSelect();
    };

    img.src = backgroundImageAspect.split('"')[1];

  }


  if (pos != 'fit-width' && pos != 'fit-height' && pos != 'fit-minHeight' && pos != 'aspect-ratio') {
    // setClasses('position', 'posPositionText', styleName);
    // setClasses('top', 'yText', styleName);
    // setClasses('left', 'xText', styleName);
    // setTransform('%', '%');
  }
  // document.getElementById('activeButtAfterClickPos').click();


  aggiustaSelect();

}

function setChild() {

  if (!document.getElementById('childText').value.includes("InputBox")) {
    document.getElementById(document.getElementById('childText').value).appendChild(document.getElementById(selectedId));
  }
  creaListElements();

}

function changeColor(type) {

  edited = true;

  document.getElementById(type + 'Text').value = document.getElementById(type + 'View').value;
  if (type == 'background') setClasses('background-color', 'backgroundText', styleName);
  if (type == 'color') setClasses('color', 'colorText', styleName);
  if (type == 'border') setClasses('border-color', 'borderColorText', styleName);

  if (type == 'background') document.getElementById('backgroundSlide').value = '100';
  if (type == 'color') document.getElementById('colorSlide').value = '100';
  if (type == 'border') document.getElementById('borderColorSlide').value = '100';

  var elemChild = document.getElementById(type + 'SlideCont').children;
  for (var i=0; i<elemChild.length; i++) {
    elemChild[i].children[1].children[0].style.flex = '1 1 0';
    elemChild[i].children[1].children[1].style.flex = '0 1 0';
  }

  document.getElementById(selectedId).click();
}

function changeRgb(e, type) {

  edited = true;

  var customize;
  if (document.getElementById('ombra').style.display == 'block') customize = 'Customize';
    else customize = '';

  if (type == 'background') {
    var val = document.getElementById(type + 'Text' + customize).value.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '');
    var r = val.split(',')[0];
    var g = val.split(',')[1];
    var b = val.split(',')[2];
    document.getElementById(type + 'Text' + customize).value = "rgb(" + r + "," + g + "," + b + ", " + e.target.value/100 + ")";
  }
  if (type == 'color') {
      var val = document.getElementById(type + 'Text' + customize).value.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '');
      var r = val.split(',')[0];
      var g = val.split(',')[1];
      var b = val.split(',')[2];
      document.getElementById(type + 'Text' + customize).value = "rgb(" + r + "," + g + "," + b + ", " + e.target.value/100 + ")";
  }
  if (type == 'border') {
      var val = document.getElementById(type + 'ColorText' + customize).value.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '');
      var r = val.split(',')[0];
      var g = val.split(',')[1];
      var b = val.split(',')[2];
      document.getElementById(type + 'ColorText' + customize).value = "rgb(" + r + "," + g + "," + b + ", " + e.target.value/100 + ")";
  }
  if (type == 'occupied') {
    document.getElementById(type + 'Text').value = e.target.value + "%";
  }


  if (customize == 'Customize') applyCustomCSSTheme("textCSSCustom", customClass, "0");

  setProprieties();
}

function changeWidthSlider(e) {

  edited = true;

  if (e.target.value == 0) e.target.value = 1;
  document.getElementById('widthText').value = e.target.value * 1920 / 20 + 'px';

  setProprieties();
}

function changeColorTheme(type) {

  edited = true;

  document.getElementById(type + 'TextCustomize').value = document.getElementById(type + 'ViewCustomize').value;
  applyCustomCSSTheme("textCSSCustom", customClass, "0");

  // try {
    caricaProprietaCustomizeTheme(selectedIdCustomize);
// } catch {}

}

function exportTheme() {
  var cssText = "", cssTextExport = "";
  var classes = document.getElementById(styleName).sheet.cssRules;

  for (var x = 0; x < classes.length; x++) {
          cssText = classes[x].cssText || classes[x].style.cssText;

          if (cssText.split('{')[0].includes('-plater')) {
            cssTextExport += classes[x].cssText || classes[x].style.cssText;
          }

  }

  cssTextExport = cssTextExport.replaceAll("; ", ";\n  ").replaceAll("{ ", "\n{\n  ").replaceAll("  }", "}\n\n");

  for (var i=0; i<colorPalette.length; i++) {
    cssTextExport = cssTextExport.replaceAll(colorPalette[i].color.replace(", 1)", ")"), "var(--" + colorPalette[i].colorName + ")");
    cssTextExport = cssTextExport.replaceAll(colorPalette[i].color.replace("rgb", "rgba"), "var(--" + colorPalette[i].colorName + ")");
  }

  classes = document.getElementsByClassName(styleName)[1].sheet.cssRules;
  var cssFont = "";
  for (x = 0; x < classes.length; x++) {
          cssFont += classes[x].cssText || classes[x].style.cssText;
          cssFont += '\n';
  }

  var cssVariables = "";
  // color palette variables
  cssVariables += '/* Global Variables */\n:root {\n';
  for (var i=0; i<colorPalette.length; i++) {
    cssVariables += '  --' + colorPalette[i].colorName + ': ' + colorPalette[i].color + ';\n';
  }
  cssVariables += '}';

  cssTextExport = cssFont + '\n' + cssVariables + '\n\n' + cssTextExport;

  var userInput = cssTextExport;

  var blob = new Blob([userInput], { type: "css/plain;charset=utf-8" });
  saveAs(blob, "themeStyle.css");

  alertFun("Theme exported successfully", "green");

}

function importTheme(event, thisEvent) {

  edited = true;
  var testo = "";

  var fr=new FileReader();
  fr.onload=function(){

    clickBoard();

    testo = fr.result;

    importThemeFun(testo);

    fr.abort();
    alertFun("Theme imoprted successfully", "green");

  }

  try {fr.readAsText(thisEvent.files[0]);} catch {}


}

function importThemeFun(testo) {

  openFont();

  //fonts
  var styleTag = document.getElementsByClassName(styleName)[1];
  var sheet = styleTag.sheet ? styleTag.sheet : styleTag.styleSheet;
  var cssFont = "";

  if (sheet.cssRules) {
    const totRules = sheet.cssRules.length;
      for (var i=totRules-1; i>=0; i--) {
              sheet.deleteRule (i);
      }
  }

  var linesTesto = testo.split('\n');

  arrayFont = [];

  for (var x = 0; x < linesTesto.length; x++) {

    if (linesTesto[x].includes("@import")) {
      sheet.insertRule(linesTesto[x]);
      cssFont += linesTesto[x] + '\n';
      arrayFont.push(linesTesto[x].split("family=")[1].split(":wght")[0].replaceAll("+", " "));
    }

  }

  caricaTabellaFont();

  //color palette
  colorPalette = [];
  var posizione = 1;

  for (var x = 0; x < linesTesto.length; x++) {

    if (linesTesto[x].includes("--") && !linesTesto[x].includes("var(")) {
      console.log(linesTesto[x].split(": ")[1].split(";")[0]);

      colorPalette.push({
                         "colorName" : linesTesto[x].split("--")[1].split(": ")[0],
                         "color" : linesTesto[x].split(": ")[1].split(";")[0],
                         "position" : posizione
                       });
      posizione ++;
    }

  }
  console.log(colorPalette);
  caricaTabellaColors();

  //import css

  var styleTag = document.getElementById (styleName);
  var sheet = styleTag.sheet ? styleTag.sheet : styleTag.styleSheet;

  if (sheet.cssRules) {
    const totRules = posIndex;
      for (var i=totRules-1; i>=0; i--) {
              sheet.deleteRule (i);
      }
  }

  var linesTesto = testo.split('\n}');

  for (var x = 0; x < linesTesto.length - 1; x++) {
          linesTesto[x] = linesTesto[x].replace(cssFont, "");
          document.getElementById(styleName).sheet.insertRule(linesTesto[x] + '}', x);

          var arr = linesTesto[x].match(/(?:[\.]{1})([a-zA-Z_]+[\w-_]*)(?:[\s\.\,\{\>#\:]{0})/igm);
          try {
            document.getElementById(arr[0].replace(".", "")).style.display = 'block';
            document.getElementById(arr[0].replace(".", "")).style.width = 'auto';
            document.getElementById(arr[0].replace(".", "")).style.height = 'auto';
            var width = document.getElementsByClassName(arr[0].replace(".", ""))[0].clientWidth;
            var height = document.getElementsByClassName(arr[0].replace(".", ""))[0].clientHeight;
            document.getElementById(arr[0].replace(".", "")).style.width = width;
            document.getElementById(arr[0].replace(".", "")).style.height = height;
            document.getElementById(arr[0].replace(".", "")).style.display = 'none';
          } catch {}

  }

  var aTags = document.getElementsByTagName("div");
  var searchText = "inset 2px 0 0 var(--secondary_opacity)";
  var found;

  for (var i = 0; i < aTags.length; i++) {
    if (aTags[i].style.boxShadow == searchText && !aTags[i].innerText.includes("Font Link")) {
      selectedElemCustom(aTags[i].innerText);
    }
  }

}

function restoreTheme() {

  edited = true;

  $.ajax({
    url:'styleElements.css',
    success: function (data){
      // alert(data);
      importThemeFun(data);
      //
      // var userInput = data;
      //
      // var blob = new Blob([userInput], { type: "css/plain;charset=utf-8" });
      // saveAs(blob, "themeStyle.css");

    }
  });

}

// __SECTIONS
var totSections = 0;
var totRows = 0;

function emptySection() {

  var sections = document.getElementById('board').getElementsByClassName('sectionClass');
  var divsEmpty = document.getElementsByClassName('emptySection');

  for (var s=divsEmpty.length-1; s>=0; s--) {
    divsEmpty[s].remove();
  }

  for (var b=0; b<sections.length; b++) {

    var parentIncludes = false;
    var a = sections[b];
    var els = [];
    while (a) {
        els.unshift(a);
        a = a.parentNode;
        try {if (a.parentNode.id.includes("Includes ")) parentIncludes = true;} catch {}
    }

    if (sections[b].children[0].children.length == 0 && displayMode != 'mobile' && !parentIncludes) {
      sections[b].children[0].innerHTML = '<div class="buttonSection emptySection" style="padding: 1px 6px;" onclick="selectedSectionId = this.parentNode.parentNode.id; openHeadLink(' + "'addElementPopup'" + ');">add</div>'
    } else {
      // setSectionHeight();
    }
  }

  aggiustaSelect();

}

function addRowPopup(structure) {

  openHeadLink('selectRow', true);

  if (structure == 'structure-1') {
    addRow("load", '225px');
  }
  if (structure == 'structure-2') {
    addRow("load", '225px');
    addSection('', '225px');
  }
  if (structure == 'structure-3') {
    addRow("load", '225px');
    for (var i=0; i<2; i++) {addSection('', '225px');}
  }
  if (structure == 'structure-4') {
    addRow("load", '225px');
    for (var i=0; i<3; i++) {addSection('', '225px');}
  }
  if (structure == 'structure-5') {
    addRow("load", '675px');
    addSection('', '225px');
  }
  if (structure == 'structure-6') {
    addRow("load", '225px');
    addSection('', '675px');
  }
  if (structure == 'structure-7') {
    addRow("load", '225px');
    addSection('', '225px');
    addSection('', '450px');
  }
  if (structure == 'structure-8') {
    addRow("load", '450px');
    addSection('', '225px');
    addSection('', '225px');
  }
  if (structure == 'structure-9') {
    addRow("load", '225px');
    addSection('', '450px');
    addSection('', '225px');
  }
  if (structure == 'structure-10') {
    addRow("load", '225px');
    addSection('', '450px');
    addSection('', '225px');
  }
}

function addRow(ev, width) {
  edited = true;

  totRows ++;
  var row = document.createElement("DIV");
  row.className += "rowClass " + "Row" + totRows;
  row.id = "Row " + totRows;
  document.getElementById('board').appendChild(row);
  nameElementsJson.push({"id" : "Row " + totRows, "name" : "Row" + totRows});

  // creaListElements();
  if (ev == 'load') {
    selectedSectionId = "Row " + totRows;
  }
  addSection(ev, width);

}

function addSection(ev, width) {

  edited = true;

  clickBoard();

  edited = true;
  totSections ++;
  var section = document.createElement("DIV");
  section.className = "sectionClass " + "Section" + totSections;
  section.id = "Section " + totSections;

  if (ev == 'load') {
    document.getElementById(selectedSectionId).appendChild(section);
  } else {
    document.getElementById(selectedSectionId).parentNode.appendChild(section);
  }

  selectedSectionId = "Section " + totSections;

  var divSection = document.createElement("DIV");
  divSection.className = 'divSection';
  // divSection.style = '--align-desktop:left; --align-mobile:left;';
  divSection.style.pointerEvents = 'none';
  document.getElementById("Section " + totSections).appendChild(divSection);

  selectedIdTemp = selectedId;
  selectedId = "Section " + totSections;
  document.getElementById('minHeightTextSection').value = '0px';
  setClasses('min-height', 'minHeightTextSection', styleName);
  document.getElementById('widthText').value = width;
  setClasses('width', 'widthText', styleName);
  document.getElementById('orderText').value = document.getElementById(selectedSectionId).parentNode.children.length;
  setClasses('order', 'orderText', styleName);
  document.getElementById('verticalAlignSectionText').value = 'flex-start';
  setClasses('align-items', 'verticalAlignSectionText', styleName);
  selectedId = selectedIdTemp;

  nameElementsJson.push({"id" : "Section " + totSections, "name" : "Section" + totSections});

  creaListElements();
  emptySection();
  orderSection();
  // setSectionHeight();

  setPageHTML();

}

function removeSection() {

  edited = true;

    if (document.getElementById(selectedSectionId).parentNode.getElementsByClassName('sectionClass').length == 1) {
      var myobj = document.getElementById(selectedSectionId).parentNode;
      deleteJsonString(document.getElementById(selectedSectionId).parentNode.id);
      myobj.remove();
    } else {
      var myobj = document.getElementById(selectedSectionId);
      deleteJsonString(selectedSectionId);
      myobj.remove();
    }


    selectedSectionId = document.getElementById('board').getElementsByClassName("sectionClass")[0].id;

    clickBoard();
    creaListElements();
    orderSection();
    setPageHTML();

}

function openAlertDeleteSection() {

  var id = 'alertDeleteSection';

  if (document.getElementById('alertDelSectionOmbra').style.display == 'none') {

    var totSectionDel = document.getElementById('board').getElementsByClassName("sectionClass").length;
    var elementsBoard = document.getElementById('board').children;
    var numIncludes = 0;
    var numSectionInInludes = 0;
    for (var i=0; i<elementsBoard.length; i++) {
      if (elementsBoard[i].id.includes("Includes ")) {
        numIncludes ++;

        var elemIncludes = elementsBoard[i].getElementsByClassName("sectionClass");
        for (var d=0; d<elemIncludes.length; d++) {
          if (elemIncludes[d].id.includes("Section ")) {
            numSectionInInludes ++;
          }
        }

      }
    }

    console.log(numSectionInInludes);

    var totRowDel = document.getElementById('board').getElementsByClassName("rowClass").length;
    if (totRowDel - numIncludes == 1 && totSectionDel - numSectionInInludes == 1) {
      alertFun("You can't delete this element", "red");
      return;
    }

    document.getElementById('alertDelSectionOmbra').style.display = 'block';
    document.getElementById(id).style.display = 'block';
    document.getElementById(id).style.animation = '.3s cubic-bezier(.175,.885,.32,1.275) 0s 1 popupAnim';

  } else {
    document.getElementById(id).style.display = 'none';
    document.getElementById('alertDelSectionOmbra').style.display = 'none';
    document.getElementById(id).style.animation = '';
  }

}

function removeRow() {

  edited = true;

    var myobj = document.getElementById(selectedSectionId).parentNode;
    deleteJsonString(document.getElementById(selectedSectionId).parentNode.id);
    myobj.remove();

    selectedSectionId = document.getElementById('board').getElementsByClassName("sectionClass")[0].id;

    clickBoard();
    creaListElements();
    orderSection();
    setPageHTML();

}

function openAlertDeleteRow() {

  var id = 'alertDeleteRow';

  if (document.getElementById('alertDelRowOmbra').style.display == 'none') {

    var elementsBoard = document.getElementById('board').children;
    var numIncludes = 0;
    for (var i=0; i<elementsBoard.length; i++) {
      if (elementsBoard[i].id.includes("Includes ")) {
        numIncludes ++;
      }
    }

    var totRowDel = document.getElementById('board').getElementsByClassName("rowClass").length;
    if (totRowDel - numIncludes == 1) {
      alertFun("You can't delete this element", "red");
      return;
    }

    document.getElementById('alertDelRowOmbra').style.display = 'block';
    document.getElementById(id).style.display = 'block';
    document.getElementById(id).style.animation = '.3s cubic-bezier(.175,.885,.32,1.275) 0s 1 popupAnim';

  } else {
    document.getElementById(id).style.display = 'none';
    document.getElementById('alertDelRowOmbra').style.display = 'none';
    document.getElementById(id).style.animation = '';
  }

}

function switchMode(id) {

  clickBoard();

  if (id == 'switchPc') {

    document.getElementById('contButDisplay').style.width = '150px';
    document.getElementById('fullScreenBut').style.display = 'inline-block';

    if (displayMode != 'computer') toggleMobileClass();

    if (displayMode != 'computer') document.getElementById('addElementsBut').classList.toggle("buttonMaterial");
    document.getElementById('addElementsBut').style.color = null;
    document.getElementById('spanAdd').style.color = 'var(--secondary_opacity)';
    document.getElementById('addElementsBut').style.pointerEvents = null;

    if (displayMode != 'computer') document.getElementById('themeBut').classList.toggle("buttonMaterial");
    document.getElementById('themeBut').style.color = null;
    document.getElementById('spanTheme').style.color = 'var(--secondary_opacity)';
    document.getElementById('themeBut').style.pointerEvents = null;

    document.getElementById('duplicateDiv').style.display = 'inline-block';

    if (displayMode != 'computer') document.getElementById('liGrid').classList.toggle("buttonMaterial");
    document.getElementById('liGrid').style.color = null;
    document.getElementById('spanGrid').style.color = 'var(--secondary_opacity)';
    document.getElementById('liGrid').style.pointerEvents = null;

    displayMode = 'computer';

    document.getElementById('switchPc').style.backgroundColor = 'rgb(209, 209, 209, .2)';
    document.getElementById('switchMobile').style.backgroundColor = 'transparent';

    document.getElementById('boardPc').appendChild(document.getElementById('boardOut'));
    document.getElementById('boardPc').appendChild(document.getElementById('board'));

    if (document.getElementById('windowOrderElements').style.display == 'block') {
      document.getElementById('board').style.width = 'calc(100% - 252px)';
      document.getElementById('boardOut').style.width = 'calc(100% - 232px)';
      document.getElementById('board').style.left = '225px';
      document.getElementById('boardOut').style.left = '215px';
    } else {
      document.getElementById('board').style.width = 'calc(100% - 52px)';
      document.getElementById('boardOut').style.width = 'calc(100% - 32px)';
      document.getElementById('board').style.left = '25px';
      document.getElementById('boardOut').style.left = '15px';
    }

    document.getElementById('board').style.height = 'calc(100% - 102px)';
    document.getElementById('board').style.margin = null;
    document.getElementById('board').style.top = '75px';
    document.getElementById('board').style.right = null;
    document.getElementById('boardOut').style.height = 'calc(100% - 82px)';
    document.getElementById('boardOut').style.margin = null;
    document.getElementById('boardOut').style.top = '65px';
    document.getElementById('boardOut').style.right = null;

    var outerDiv = document.getElementsByClassName("outerDiv");
    for (var k=0; k<outerDiv.length; k++) {
      outerDiv[k].classList.remove("outerDiv-mobile");
    }

  } else if (id == 'switchMobile') {

    setTimeout(function() {

      document.getElementById('contButDisplay').style.width = '100px';
      document.getElementById('fullScreenBut').style.display = 'none';

      if (displayMode != 'mobile') toggleMobileClass();

      if (displayMode != 'mobile') document.getElementById('addElementsBut').classList.toggle("buttonMaterial");
      document.getElementById('addElementsBut').style.color = 'rgb(193, 193, 193, .5)';
      document.getElementById('spanAdd').style.color = 'rgb(193, 193, 193, .5)';
      document.getElementById('addElementsBut').style.pointerEvents = 'none';

      if (displayMode != 'mobile') document.getElementById('themeBut').classList.toggle("buttonMaterial");
      document.getElementById('themeBut').style.color = 'rgb(193, 193, 193, .5)';
      document.getElementById('spanTheme').style.color = 'rgb(193, 193, 193, .5)';
      document.getElementById('themeBut').style.pointerEvents = 'none';

      document.getElementById('duplicateDiv').style.display = 'none';

      if (displayMode != 'mobile') document.getElementById('liGrid').classList.toggle("buttonMaterial");
      document.getElementById('liGrid').style.color = 'rgb(193, 193, 193, .5)';
      document.getElementById('spanGrid').style.color = 'rgb(193, 193, 193, .5)';
      document.getElementById('liGrid').style.pointerEvents = 'none';

      displayMode = 'mobile';

      document.getElementById('switchPc').style.backgroundColor = 'transparent';
      document.getElementById('switchMobile').style.backgroundColor = 'rgb(209, 209, 209, .2)';
      document.getElementById('board').style.width = 340;
      document.getElementById('boardOut').style.width = 340 + 20;
      document.getElementById('board').style.height = 'calc(100% - 20px)';
      document.getElementById('board').style.margin = 'auto';
      document.getElementById('board').style.top = '10';
      document.getElementById('board').style.left = '0';
      document.getElementById('board').style.right = '0';
      document.getElementById('boardOut').style.height = '100%';
      document.getElementById('boardOut').style.margin = 'auto';
      document.getElementById('boardOut').style.top = '0';
      document.getElementById('boardOut').style.left = '0';
      document.getElementById('boardOut').style.right = '0';

      var outerDiv = document.getElementsByClassName("outerDiv");
      for (var k=0; k<outerDiv.length; k++) {
        outerDiv[k].classList.add("outerDiv-mobile");
      }

      document.getElementById('boardOutMobile').appendChild(document.getElementById('boardOut'));
      document.getElementById('boardOutMobile').appendChild(document.getElementById('board'));

      document.getElementById(selectedSectionId).scrollIntoView();
      emptySection();
      // setSectionHeight();


  }, 50);

  }
  emptySection();
  // setSectionHeight();


  aggiustaSelect();
  try {document.getElementById(selectedSectionId).scrollIntoView();} catch {}
}

function toggleMobileClass() {

  var elementsBoard = document.getElementsByTagName('*');
  for (var i=0; i<elementsBoard.length; i++) {

    if (!elementsBoard[i].id.includes("-outer") && (elementsBoard[i].id.includes("Button ") || elementsBoard[i].id.includes("Container ") || elementsBoard[i].id.includes("Image ") || elementsBoard[i].id.includes("Menu ") || elementsBoard[i].id.includes("Link ") || elementsBoard[i].id.includes("Text ") || elementsBoard[i].id.includes("MaterialIcon ") || elementsBoard[i].id.includes("InputBox ") || elementsBoard[i].id.includes("Textarea ") || elementsBoard[i].id.includes("Section ") || elementsBoard[i].id.includes("Row "))) {
      var tagName = capitalizeFirstLetter(elementsBoard[i].tagName.toLowerCase());
      var elemName;

      if (tagName == 'Div') elemName = 'Container'
      if (tagName == 'Button') elemName = 'Button'
      if (tagName == 'Label') elemName = 'Text'
      if (tagName == 'A') elemName = 'Link'
      if (tagName == 'Span') elemName = 'MaterialIcon'
      if (tagName == 'Input') elemName = 'InputBox'
      if (tagName == 'Textarea') elemName = 'Textarea'

      if (elementsBoard[i].id.includes("Image ")) elemName = 'Image'
      if (elementsBoard[i].id.includes("Menu ")) elemName = 'Menu'
      if (elementsBoard[i].id.includes("Section ")) elemName = 'Section'
      if (elementsBoard[i].id.includes("Row ")) elemName = 'Row'

      var numElem = elementsBoard[i].id.match(/(\d+)/)[0];
      elementsBoard[i].classList.toggle(elemName + numElem + '-mobile');
      elementsBoard[i].classList.toggle(elemName + numElem + '');
    }

    if (elementsBoard[i].id.includes("Section ") && displayMode != 'mobile') { // != perchè ancora non è cambiata la variabile **MOBILE
      // if (elementsBoard[i].children[0].children[0].className.includes("emptySection") && displayMode == 'mobile') elementsBoard[i].style.display = 'none';
    }

    if (elementsBoard[i].id.includes("Section ") && displayMode != 'computer') { // != perchè ancora non è cambiata la variabile **COMPUTER
      elementsBoard[i].style.display = null;
    }

    if (elementsBoard[i].className.includes("-outer") && !elementsBoard[i].className.includes("-mobile")) {
      elementsBoard[i].className += '-mobile';
    } else if (elementsBoard[i].className.includes("-outer") && elementsBoard[i].className.includes("-mobile")) {
      elementsBoard[i].className = elementsBoard[i].className.replace('-mobile', '');
    }

  }

}

function openInnerText() {

  if (selectedId.includes("MaterialIcon ")) document.getElementById('whereIcon').style.display = 'block';
    else document.getElementById('whereIcon').style.display = 'none';

  id = 'innerTextMore';

  if (document.getElementById('ombra').style.display == 'none') {
    document.getElementById('ombra').style.display = 'block';
    document.getElementById(id).style.display = 'block';
    document.getElementById(id).style.animation = '.3s cubic-bezier(.175,.885,.32,1.275) 0s 1 popupAnim';
  } else {
    document.getElementById('ombra').style.display = 'none';
    document.getElementById(id).style.display = 'none';
    document.getElementById(id).style.animation = '';
  }


  document.getElementById('textAreaInnerText').innerHTML = getTextElem(document.getElementById(selectedId));

}

function getTextElem(elem) {

  var tempElem = document.createElement("DIV");
  tempElem.innerHTML = elem.innerHTML;
  var tempElemCHILD = tempElem.children;

  for (var k=tempElemCHILD.length - 1; k>=0; k--) {
    if (tempElemCHILD[k].id.includes("-outer")) {
      tempElemCHILD[k].remove();
    }
  }

  text = tempElem.innerHTML;
  document.getElementById('contFormatBut').style.display = null;

  if (selectedId.includes("Textarea ")) {
    text = elem.textContent;
    document.getElementById('contFormatBut').style.display = 'none';
  }

  testoOpen = tempElem.innerHTML;

  return text;
}

var testoOpen = "";
function applyInnerText() {

  edited = true;

  // var elem = document.getElementById(selectedId);
  // if (selectedId.includes("Textarea ")) elem.textContent = text;
  //   else {
  //
  //     var text = elem.innerHTML
  //     for (var k=0; k<elem.childNodes.length; k++) {
  //       text = text.replace(elem.childNodes[k].innerHTML, "").trim();
  //     }
  //     text = text.replace(/\n\r?/g, '<br>');
  //     if (!selectedId.includes("MaterialIcon ")) elem.innerHTML = elem.innerHTML.replace(text.trim(), document.getElementById('textAreaInnerText').innerHTML).replace(/\n\r?/g, '<br>');
  //       else elem.innerHTML = elem.innerHTML.replace(text.trim(), document.getElementById('textAreaInnerText').innerHTML).replace(/\n\r?/g, '<br>').toLowerCase();
  //   }
  //
  //
  // //aggiorna text
  // text = elem.innerHTML
  // for (var k=0; k<elem.childNodes.length; k++) {
  //   text = text.replace(elem.childNodes[k].innerHTML, "");
  // }

  var text = document.getElementById('textAreaInnerText').innerHTML.replaceAll('<div>', '<br>');
  text = text.replaceAll("</div>", "");
  var elem = document.getElementById(selectedId);

  if (selectedId.includes("Textarea ")) {
    elem.textContent = text;
  } else {
    var tempElem = document.createElement("DIV");
    tempElem.innerHTML = elem.innerHTML;
    var tempElemCHILD = tempElem.children;

    elem.innerHTML = text;

    elem.innerHTML += tempElem.innerHTML.replace(testoOpen, "");
  }

  document.getElementById('innerText').innerHTML = getTextElem(document.getElementById(selectedId));

  creaListElements();
  setPageHTML();
}

function duplicateElement(id, parent) {

  if (selected) {

    edited = true;

    var createdId;
    var elemId = id.match(/(\d+)/)[0];
    var elemTag = id.replace(elemId, "").trim();
    var tagName;

    if (elemTag == 'Row') tagName = 'div';
    if (elemTag == 'Section') tagName = 'div';
    if (elemTag == 'Container') tagName = 'div';
    if (elemTag == 'Button') tagName = 'button';
    if (elemTag == 'Image') tagName = 'div';
    if (elemTag == 'Menu') tagName = 'ul';
    if (elemTag == 'Text') tagName = 'label';
    if (elemTag == 'Link') tagName = 'a';
    if (elemTag == 'MaterialIcon') tagName = 'span';
    if (elemTag == 'InputBox') tagName = 'input';
    if (elemTag == 'Textarea') tagName = 'textarea';

    if (elemTag == 'Row') totRows++;
    if (elemTag == 'Section') totSections++;
    if (elemTag == 'Container') totDiv++;
    if (elemTag == 'Button') totButtons++;
    if (elemTag == 'Image') totImages++;
    if (elemTag == 'Menu') totMenus++;
    if (elemTag == 'Text') totP++;
    if (elemTag == 'Link') totA++;
    if (elemTag == 'MaterialIcon') totSpan++;
    if (elemTag == 'InputBox') totInput++;
    if (elemTag == 'Textarea') totTextarea++;

    if (elemTag == 'Row') elemId = totRows;
    if (elemTag == 'Section') elemId = totSections;
    if (elemTag == 'Container') elemId = totDiv;
    if (elemTag == 'Button') elemId = totButtons;
    if (elemTag == 'Image') elemId = totImages;
    if (elemTag == 'Menu') elemId = totMenus;
    if (elemTag == 'Text') elemId = totP;
    if (elemTag == 'Link') elemId = totA;
    if (elemTag == 'MaterialIcon') elemId = totSpan;
    if (elemTag == 'InputBox') elemId = totInput;
    if (elemTag == 'Textarea') elemId = totTextarea;

    var dupElem = document.createElement(tagName.toUpperCase());
    if (document.getElementById(id).className.includes("-plater")) {
      if (elemTag == 'Image') tagName = 'image';
      if (elemTag == 'Menu') tagName = 'menu';
      dupElem.className = tagName + "-plater " + capitalizeFirstLetter(elemTag) + elemId;
    } else {
      dupElem.className = capitalizeFirstLetter(elemTag) + elemId;
    }

    if (elemTag == 'Section') {
      dupElem.className = "sectionClass " + dupElem.className;
      dupElem.style = "outline: rgba(0, 0, 0, 0.5) dashed 1px;";
      dupElem.innerHTML = '<div class="divSection" style="pointer-events: none;"></div>'
    }

    if (elemTag == 'Row') {
      dupElem.className = "rowClass " + dupElem.className;
    }

    dupElem.id = capitalizeFirstLetter(elemTag) + " " + elemId;
    createdId = capitalizeFirstLetter(elemTag) + " " + elemId;

    var text = document.getElementById(id).innerText
    for (var k=0; k<document.getElementById(id).childNodes.length; k++) {
      text = text.replace(document.getElementById(id).childNodes[k].innerText, "").replace('<br />', /\n\r?/g);
    }

    if (elemTag != 'Row' && elemTag != 'Section' && elemTag != 'Container' && elemTag != 'InputBox' && elemTag != 'Textarea') dupElem.innerHTML = getTextElem(document.getElementById(id));
    if (elemTag == 'MaterialIcon') dupElem.translate = false;
    if (elemTag == 'InputBox') dupElem.setAttribute("value", document.getElementById(id).value);
    if (elemTag == 'InputBox' || elemTag == 'Textarea') dupElem.setAttribute("placeholder", document.getElementById(id).placeholder);
    if (elemTag == 'Textarea') dupElem.style.resize = 'none';
    if (elemTag == 'Textarea') dupElem.textContent = document.getElementById(id).textContent;

    if (elemTag != 'Row' && elemTag != 'Section') {
      var divContainer = document.createElement("DIV");
      divContainer.id = capitalizeFirstLetter(elemTag) + ' ' + elemId + '-outer';
      divContainer.className = capitalizeFirstLetter(elemTag) + elemId + '-outer';
      divContainer.style.pointerEvents = 'none';

      var cssTextCustOUTER = getCss('.' + capitalizeFirstLetter(elemTag) + id.match(/(\d+)/)[0] + '-outer', styleName);
      cssTextCustOUTER = cssTextCustOUTER.replace('.' + capitalizeFirstLetter(elemTag) + id.match(/(\d+)/)[0] + '-outer { ', "");
      cssTextCustOUTER = cssTextCustOUTER.replace('}', "");
      cssTextCustOUTER = cssTextCustOUTER.replaceAll('; ', "\n");

      document.getElementById('textCSSDuplicate').value = "";

      var lines2 = cssTextCustOUTER.split('\n');
      for(var j = 0; j < lines2.length;j++){
          document.getElementById('textCSSDuplicate').value += lines2[j] + '\n';
      }

      applyCustomCSS("textCSSDuplicate", "." + capitalizeFirstLetter(elemTag) + elemId + '-outer', posIndex);

      //Mobile OUTER
      document.getElementById('textCSSDuplicate').value = "";

      var cssTextCustMobile = getCss('.' + capitalizeFirstLetter(elemTag) + id.match(/(\d+)/)[0] + '-outer-mobile' , styleName);
      cssTextCustMobile = cssTextCustMobile.replace('.' + capitalizeFirstLetter(elemTag) + id.match(/(\d+)/)[0] + '-outer-mobile' + ' { ', "");
      cssTextCustMobile = cssTextCustMobile.replace('}', "");
      cssTextCustMobile = cssTextCustMobile.replaceAll('; ', "\n");

      document.getElementById('textCSSDuplicate').value = "";

      var lines2Mobile = cssTextCustMobile.split('\n');
      for(var j = 0; j < lines2Mobile.length;j++){
          document.getElementById('textCSSDuplicate').value += lines2Mobile[j] + '\n';
      }

      applyCustomCSS("textCSSDuplicate", "." + capitalizeFirstLetter(elemTag) + elemId + '-outer-mobile', posIndex);

      var divClass = document.getElementsByClassName('divSection');
      for (var k=0; k<divClass.length; k++) {
        if (parent == '') {
          document.getElementById(selectedSectionId).children[0].appendChild(divContainer);
        } else {
          if (parent.includes("Section")) {
            document.getElementById(parent).children[0].appendChild(divContainer);
          } else {
            document.getElementById(parent).appendChild(divContainer);
          }
        }
      }



      divContainer.appendChild(dupElem);
      divContainer.children[0].style.pointerEvents = 'auto';

    } else if (elemTag == 'Section') {
      if (parent.includes("Row")) document.getElementById(parent).appendChild(dupElem);
      else document.getElementById(id).parentNode.appendChild(dupElem);
    } else if (elemTag == 'Row') {
      document.getElementById('board').appendChild(dupElem);
    }

    var cssTextCust = getCss('.' + capitalizeFirstLetter(elemTag) + id.match(/(\d+)/)[0] , styleName);
    cssTextCust = cssTextCust.replace('.' + capitalizeFirstLetter(elemTag) + id.match(/(\d+)/)[0] + ' { ', "");
    cssTextCust = cssTextCust.replace('}', "");
    cssTextCust = cssTextCust.replaceAll('; ', "\n");

    document.getElementById('textCSSDuplicate').value = "";

    var lines2 = cssTextCust.split('\n');
    for(var j = 0; j < lines2.length;j++){
        document.getElementById('textCSSDuplicate').value += lines2[j] + '\n';
    }

    applyCustomCSS("textCSSDuplicate", "." + capitalizeFirstLetter(elemTag) + elemId, posIndex);

    //Mobile
    document.getElementById('textCSSDuplicate').value = "";

    var cssTextCustMobile = getCss('.' + capitalizeFirstLetter(elemTag) + id.match(/(\d+)/)[0] + '-mobile' , styleName);
    cssTextCustMobile = cssTextCustMobile.replace('.' + capitalizeFirstLetter(elemTag) + id.match(/(\d+)/)[0] + '-mobile' + ' { ', "");
    cssTextCustMobile = cssTextCustMobile.replace('}', "");
    cssTextCustMobile = cssTextCustMobile.replaceAll('; ', "\n");

    document.getElementById('textCSSDuplicate').value = "";

    var lines2Mobile = cssTextCustMobile.split('\n');
    for(var j = 0; j < lines2Mobile.length;j++){
        document.getElementById('textCSSDuplicate').value += lines2Mobile[j] + '\n';
    }

    applyCustomCSS("textCSSDuplicate", "." + capitalizeFirstLetter(elemTag) + elemId + '-mobile', posIndex);
    document.getElementById(capitalizeFirstLetter(elemTag) + " " + elemId).classList.remove("." + capitalizeFirstLetter(elemTag) + elemId + '-mobile');

    var nameNewElem = "";
    var numElem = 0;

    for (var i=0; i<nameElementsJson.length; i++) {
      if (nameElementsJson[i].id.toLowerCase() == id.toLowerCase()) {
        nameNewElem = nameElementsJson[i].name.split('_')[0];
      }
    }
    for (var i=0; i<nameElementsJson.length; i++) {
      if (nameElementsJson[i].name.split('_')[0].toLowerCase() == nameNewElem.toLowerCase()) {
        numElem++;
      }
    }

    nameElementsJson.push({"id" : dupElem.id, "name" : nameNewElem + '_' + numElem});

    //Children

    var elem = document.getElementById(capitalizeFirstLetter(elemTag) + " " + id.match(/(\d+)/)[0]);

    if (elemTag == 'Section') {
      elem = elem.children[0];
    }

    var elemChild = elem.children;

    elem.innerHTML = elem.innerHTML.replace("<br>", "\n");


    for (var i=0; i<elemChild.length; i++) {

      try {
        var idElementoDaCopiare = elemChild[i].children[0].id;

        if (elemTag == 'Row') idElementoDaCopiare = elemChild[i].id;

        if (idElementoDaCopiare != '') {
          duplicateElement(idElementoDaCopiare, dupElem.id);
        }

      } catch {}
    }

  }

  var allElem = document.getElementById("board").getElementsByTagName("*");
  for (var a=0; a<allElem.length; a++) {
    allElem[a].innerHTML = allElem[a].innerHTML.replace("\n", "<br>");
  }

  // clickBoard();
  creaListElements();
  setPageHTML();
  createSelectId();
  emptySection();
  document.getElementById(dupElem.id).click();

  var elementsTree = document.getElementById('parent').getElementsByClassName('li');
  for (var j=0; j<elementsTree.length; j++) {
    if (replaceIcons(elementsTree[j].innerText) == dupElem.id) {
      elementsTree[j].style.backgroundColor = 'rgba(150, 150, 150, .2)';
      elementsTree[j].scrollIntoView();
    }
  }

  // openHeadLink("loading");

}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function compress(e) {

  if (projectId == 0) {
    alertFun("You have to save this project before", "blue");
    return;
  }

  document.getElementById('ombraLoading').style.display = 'block';
  document.getElementById('loadingImage').style.display = 'block';
  document.getElementById('loadingImage').style.animation = '.3s cubic-bezier(.175,.885,.32,1.275) 0s 1 popupAnim';

try {
  // var formData = new FormData();
  // var filename = projectName + '_' + e.target.files[0].name;
  //
  // var secPas = "myPassword";
  // filename = CryptoJS.AES.encrypt(filename, secPas);
  // filename = String(filename).replace("/", "slashh");
  //
  // // var decrypted = CryptoJS.AES.decrypt(encrypted, secPas);
  // // alert (decrypted.toString(CryptoJS.enc.Utf8));
  //
  //   formData.append("file", e.target.files[0], filename);
  //
  //   var xhttp = new XMLHttpRequest();
  //
  //   xhttp.open("POST", "ajaxfile.php", true);
  //   xhttp.send(formData);
  //
  //   var url = 'uploads/' + filename;
  //   document.getElementById('imageUrlText').value = 'url("' + url + '")';
  //   setClasses('background-image', 'imageUrlText', styleName);
  //
  //   openHeadLink("loading");
  //   creaListElements();
  //
  //   //seleziona elemento nel TreeView
  //   var elementsTree = document.getElementById('parent').getElementsByClassName('li');
  //   for (var j=0; j<elementsTree.length; j++) {
  //     if (!replaceIcons(elementsTree[j].innerText).includes("Section ")) {
  //       if (replaceIcons(elementsTree[j].innerText) == selectedId && !firstClick) elementsTree[j].style.backgroundColor = 'rgba(150, 150, 150, .2)';
  //       else elementsTree[j].style.backgroundColor = 'transparent';
  //     }
  //   }
  //
  //   return;

  var fr = new FileReader;

  fr.onload = function() {
      var img = new Image;

      img.onload = function() {

        const tmp_width = img.width;
        const tmp_height = img.height;

        if (tmp_width > 1920) {
          width = 1920;
          height = tmp_height * width / tmp_width;
        } else {
          width = tmp_width;
          height = tmp_height;
        }

        const fileName = e.target.files[0].name;
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = event => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                    const elem = document.createElement('canvas');

                    elem.width = width;
                    elem.height = height;
                    const ctx = elem.getContext('2d');
                    // img.width and img.height will contain the original dimensions
                    ctx.drawImage(img, 0, 0, width, height);
                    ctx.canvas.toBlob((blob) => {
                        const file = new File([blob], fileName, {
                            type: 'image/' + e.target.files[0].name.split(".")[e.target.files[0].name.split(".").length - 1],
                            lastModified: Date.now()
                        });
                      getBase64(file);
                    }, 'image/' + e.target.files[0].name.split(".")[e.target.files[0].name.split(".").length - 1], 1);
                },
                reader.onerror = error => console.log(error);
        };

      };

      img.src = fr.result;
  };

  fr.readAsDataURL(e.target.files[0]);


} catch {
    document.getElementById('ombraLoading').style.display = 'none';
    document.getElementById('loadingImage').style.display = 'none';
    document.getElementById('loadingImage').style.animation = '';
}

}

var imgData;

function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {

    for (var k=0; k<imageToUrl.length; k++) {
      if (imageToUrl[k].filename == file.name) {
        document.getElementById('ombraLoading').style.display = 'none';
        document.getElementById('loadingImage').style.display = 'none';
        document.getElementById('loadingImage').style.animation = '';
        alertFun("File not uploaded because exist another file with the same name", "blue");
        return;
      }
    }

  var url = URL.createObjectURL(file);

  var filename = projectName + '_' + Date.now() + '_' + file.name;
  var fileSend = new File([file], filename);

  var formData= new FormData();

  formData.append('file', fileSend, filename);
  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", "upload.php", true);
  xhttp.send(formData);

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      var response = this.responseText;
      if(response == 1){

        imageToUrl.push({"url" : url, "urlTemp" : 'uploads/' + filename, "filename" : file.name});
        loadTabellaImages();
        document.getElementById('ombraLoading').style.display = 'none';
        document.getElementById('loadingImage').style.display = 'none';
        document.getElementById('loadingImage').style.animation = '';
        alertFun("File uploaded succesfully", "green");
        saveAlert = false;
        var selectTmp = selectedId;
        saveProject();
        selectedId = selectTmp;
      }else{

        document.getElementById('ombraLoading').style.display = 'none';
        document.getElementById('loadingImage').style.display = 'none';
        document.getElementById('loadingImage').style.animation = '';
        alertFun("File not uploaded (Try to refresh the page)", "red");
      }
    }
  };




   };
   reader.onerror = function (error) {
     console.log('Error: ', error);

    document.getElementById('ombraLoading').style.display = 'none';
    document.getElementById(loadingImage).style.display = 'none';
    document.getElementById(loadingImage).style.animation = '';

    alertFun("File not uploaded (Try to refresh the page)", "red");
   };
}

function changeUnit(idValue) {

  var inputElem = document.getElementById(idValue).value;
  var val = parseInt(inputElem);
  var unit = inputElem.replace(parseInt(inputElem), '');

  if (val == '0') return;

  if (unit == 'px') {

    var pixels = val;

    var screenSize;
    if (idValue.includes('x')) screenSize = document.getElementById(selectedId).parentNode.getBoundingClientRect().width;
    if (idValue.includes('y')) screenSize = document.getElementById(selectedId).parentNode.getBoundingClientRect().height;

    var elemSize;
    if (idValue.includes('x')) elemSize = document.getElementById(selectedId).getBoundingClientRect().width;
    if (idValue.includes('y')) elemSize = document.getElementById(selectedId).getBoundingClientRect().height;

    var percentage = pixels / ((screenSize - elemSize) / 100);

    document.getElementById(idValue).value = Math.round(percentage) + '%';

  } else if (unit == '%') {

    var percentage = val;

    var screenSize;
    if (idValue.includes('x')) screenSize = document.getElementById(selectedId).parentNode.getBoundingClientRect().width;
    if (idValue.includes('y')) screenSize = document.getElementById(selectedId).parentNode.getBoundingClientRect().height;

    var elemSize;
    if (idValue.includes('x')) elemSize = document.getElementById(selectedId).getBoundingClientRect().width;
    if (idValue.includes('y')) elemSize = document.getElementById(selectedId).getBoundingClientRect().height;

    var pixels = (percentage / 100 * screenSize) - (elemSize / 100 * val);
    document.getElementById(idValue).value = parseInt(pixels) + 'px';

  }

}

var heightTemp, widthTemp, topTemp, leftTemp;
function fullScreen() {

  clickBoard();

  var divsEmpty = document.getElementsByClassName('emptySection');

  for (var s=divsEmpty.length-1; s>=0; s--) {
    divsEmpty[s].remove();
  }

  if (document.getElementById('fullBoard').style.display == 'none' && displayMode == 'computer') {

    widthTemp = document.getElementById('board').getBoundingClientRect().width;
    heightTemp = document.getElementById('board').getBoundingClientRect().height;
    topTemp = document.getElementById('board').getBoundingClientRect().top;
    leftTemp = document.getElementById('board').getBoundingClientRect().left;

    document.getElementById('fullBoard').style.transition = '0s';
    document.getElementById('fullBoard').style.display = 'block';
    document.getElementById('fullBoard').style.width = widthTemp;
    document.getElementById('fullBoard').style.height = heightTemp;
    document.getElementById('fullBoard').style.top = topTemp;
    document.getElementById('fullBoard').style.left = leftTemp;

    setTimeout(function() {

      var elemSection = document.getElementById('board').getElementsByClassName('sectionClass');
      for (var i=0; i<elemSection.length; i++) {
        elemSection[i].style.outline = 'none';
      }

      var elem = document.getElementsByClassName("includes");
      for (var i=0; i<elem.length; i++) {
        elem[i].style = '';
      }

      document.getElementById('fullBoard').style.transition = '.2s';

      document.getElementById('fullBoard').style.width = '100%';
      document.getElementById('fullBoard').style.height = '100%';
      document.getElementById('fullBoard').style.top = '0';
      document.getElementById('fullBoard').style.left = '0';

      document.getElementById('fullBoard').appendChild(document.getElementById('board'));

      document.getElementById('board').style.width = '100%';
      document.getElementById('board').style.height = '100%';
      document.getElementById('board').style.left = '0';
      document.getElementById('board').style.top = '0';
      document.getElementById('board').style.padding = '0';
      document.getElementById('board').style.right = null;
      document.getElementById('board').style.margin = null;

      // setSectionHeight();
      doCaptured = false;
      addAnimationClasses();

    }, 1);

    setTimeout(function () {
      document.getElementById('board').style.transform = null;
    }, 200);

  } else if (document.getElementById('fullBoard').style.display == 'block' && displayMode == 'computer') {

    document.getElementById('fullBoard').style.width = widthTemp;
    document.getElementById('fullBoard').style.height = heightTemp;
    document.getElementById('fullBoard').style.top = topTemp;
    document.getElementById('fullBoard').style.left = leftTemp;
    document.getElementById('board').style.padding = '1px';
    document.getElementById('board').style.transform = "translate(0px, 0px)";

    removeAnimationClasses();

    setTimeout(function() {

      var elemSection = document.getElementById('board').getElementsByClassName('sectionClass');
      for (var i=0; i<elemSection.length; i++) {
        elemSection[i].style.outline = null;
      }

      var elem = document.getElementsByClassName("includes");
      for (var i=0; i<elem.length; i++) {
        elem[i].style = 'outline: 2px solid red; outline-offset: -2px;';
      }

      document.getElementById('switchPc').click();
      document.getElementById('fullBoard').style.display = 'none';
      document.getElementById(selectedSectionId).scrollIntoView();

      emptySection();
      // setSectionHeight();

    }, 200);

  }

}

function replaceIcons(testo) {
  testo = testo.replace("calendar_view_month", "");
  testo = testo.replace("crop_16_9", "");
  testo = testo.replace("featured_video", "");
  testo = testo.replace("pin", "");
  testo = testo.replace("article", "");
  testo = testo.replace("lock_open", "");
  testo = testo.replace("lock", "");
  testo = testo.replace("format_list_bulleted", "");
  testo = testo.replace("link", "");
  testo = testo.replace("spa", "");
  testo = testo.replace("text_fields", "");
  testo = testo.replace("image", "");

  testo = testo.split("(")[testo.split("(").length - 1];

  testo = testo.replace(')', '');
  return testo;
}

var elemNamePre = "";

function getNameElement(id) {

  var elemName = "";

  for (var i=0; i<nameElementsJson.length; i++) {
    if (nameElementsJson[i].id == id) {
      elemName = nameElementsJson[i].name;
    }
  }

  elemNamePre = elemName;
  document.getElementById('nameText').value = elemName;
}

function setNameElement(id) {

  var elemName;

  elemName = document.getElementById('nameText').value;

  var existName = false;

  for (var i=0; i<nameElementsJson.length; i++) {

    if (nameElementsJson[i].name.toLowerCase() == elemName.toLowerCase()) {
      existName = true;
    }

    if (elemName.includes("(") || elemName.includes(")") || elemName.includes("*") || elemName.trim() == '') {
      existName = true;
    }
  }

  if (existName) {

    document.getElementById('nameText').value = elemNamePre;

    // alertFun("This name already exist", "blue");
    return;
  }

  for (var w=0; w<linksJSON.length; w++) {
    if (linksJSON[w].link == elemNamePre && linksJSON[w].type == 'element') {
      linksJSON[w].link = replaceAllCharacter(elemName);
    }
  }

  document.getElementById('contTreeView').style.width = '1000px';

  for (var i=0; i<nameElementsJson.length; i++) {
    if (nameElementsJson[i].name == elemNamePre) {
      nameElementsJson[i].name = replaceAllCharacter(elemName);

      var elementsTree = document.getElementById('parent').getElementsByClassName('li');
      for (var j=0; j<elementsTree.length; j++) {
        if (replaceIcons(elementsTree[j].innerText) == nameElementsJson[i].id) {
          elementsTree[j].innerHTML = elementsTree[j].innerHTML.replace(elemNamePre, replaceAllCharacter(elemName));
          elemNamePre = replaceAllCharacter(elemName);

          document.getElementById('nameText').value = replaceAllCharacter(elemName);

        }
      }

    }

  }

  function replaceAllCharacter(testo) {
    testo = testo.replace('-', 'abcTRATTINOabc');
    testo = testo.replace(/[^\w\s]/gi, '');
    testo = testo.replace('abcTRATTINOabc', '-');
    testo = testo.replaceAll(" ", "_");

    return testo;
  }

  document.getElementById('contTreeView').style.width = document.getElementById('contTreeView').getElementsByTagName('li')[0].getBoundingClientRect().width;

}

function searchElem(value, e) {

  //se il testo è vuoto
  if (value == '') {
    clickBoard();
    return;
  }

  //seleziona elemento se è uguale al testo
  var arrElemSearch = [];

  for (var i=0; i<nameElementsJson.length; i++) {
    if (nameElementsJson[i].name.toLowerCase().includes(value.toLowerCase())) {
      arrElemSearch.push(nameElementsJson[i].id);
    }
  }

  if (arrElemSearch.length != 0) {

    search = true;

    document.getElementById(arrElemSearch[0]).click();

    setTimeout(function () {

      var elementsTree = document.getElementById('parent').getElementsByClassName('li');
      for (var j=0; j<elementsTree.length; j++) {
        if (replaceIcons(elementsTree[j].innerText) == arrElemSearch[0])
          elementsTree[j].click();
      }

      search = false;

    }, 1);


  }
    else clickBoard();
}

function loadTabellaImages() {

  //cancello tabella
  var html = ""

  document.getElementById('tableImages').innerHTML = html;

  try {document.getElementById('contTableImages').removeChild(document.getElementById('divEmpty'));} catch {}

  //remove image button
  if (selected && (selectedId.includes("Image ") || getStyle(document.getElementById(selectedId))[12] != 'none')) {
    document.getElementById('removeImage').classList.remove('disableOrder');
  } else {
    document.getElementById('removeImage').classList.add('disableOrder');
  }

  var lengthArray = imageToUrl.length;

  for (var i=0; i<imageToUrl.length; i++) {

    if (imageToUrl[i].url == '' || imageToUrl[i].url == null || imageToUrl[i].urlTemp == '' || imageToUrl[i].urlTemp == null) {
      lengthArray--;
    } else {
      if (!selected) {
        selectedIcon = '';
        if (typeAddingImage == 'addImage') {
          selectedIcon = 'radio_button_unchecked';
        }
      } else {
          if ('url("' + imageToUrl[i].url + '")' != window.getComputedStyle(document.getElementById(selectedId)).getPropertyValue("background-image")) selectedIcon = 'radio_button_unchecked';
            else selectedIcon = 'radio_button_checked';
      }

        creaTabellaImages(i, imageToUrl[i].urlTemp, imageToUrl[i].filename, selectedIcon);
    }

  }

  if (lengthArray != 0) {

  html = "<div style='margin: 30px 0; text-align: center; justify-content: center; width: 25%; display: flex; flex-grow: 1; align-items: flex-start;'><div>"

  + "<label for='openImage'>"
    + "<div class='galleryImage' style='height: 150px; width: 200px; background-color: rgb(255, 255, 255, .8); border-radius: 8px; display: flex; justify-content: center; align-items: center;'>"
      + "<div style='font-size: 40px; color: rgb(0, 0, 0, .7); font-family: Material Icons;'>"
        + "<p>add</p>"
      + "</div>"
    + "</div>"
  + "</label>"

    html += "<div class='disableOrder' style='opacity: 0; color: rgb(255, 255, 255, .7); margin: 5px auto 2px; font-size: 13px; padding: 8px 12px; border-radius: 8px;'>"
      + "<span style='font-family: Material Icons; font-size: 20px; vertical-align: middle;'>add_photo_alternate</span><span style='vertical-align: middle; margin-left: 5px;'>Select image</span>"
    + '</div>'

    html += "<div class='button' style='opacity: 0; color: rgb(255, 0, 0, .5); margin: 2px auto 5px; font-size: 13px; padding: 8px 12px; border-radius: 8px;'>"
      + "<span style='font-family: Material Icons; font-size: 20px; vertical-align: middle;'>remove</span><span style='vertical-align: middle; margin-left: 5px;'>Delete image</span>"
    + '</div>'
  + '</div></div>';

  document.getElementById('tableImages').innerHTML += html;

  //aggiungi spazi vuoti
  var spaziovuoto = "";

  spaziovuoto = "<div style='margin: 30px 0; text-align: center; justify-content: center; width: 25%; display: flex; flex-grow: 1; align-items: flex-start;'></div>";

  var mancanti = 3 - (lengthArray - 4 * parseInt((lengthArray + 1)/4));
  for (var m=0; m<mancanti; m++) {
    document.getElementById('tableImages').innerHTML += spaziovuoto;
  }

  // fine spazi vuoti

  }

  if (lengthArray == 0) {
    var html = "";

      html += "<div id='divEmpty' style='width: calc(100% - 2px); text-align: center; margin-top: -10px;'>"
        html += "<p style='font-size: 14px; color: rgb(255, 255, 255, .4); user-select: none;'>Click the button <span style='font-family: Material Icons; font-size: 20px; position: relative; top: 5px;'>add</span> to add images</p>"
      + "</div>"

  document.getElementById('contTableImages').innerHTML = html + document.getElementById('contTableImages').innerHTML;
  return;
  }

}

var idImageDelete = "";

function creaTabellaImages(id, urlImage, fileName, selectedIcon) {


    var html = "";

    html = "<div style='margin: 30px 0; text-align: center; justify-content: center; width: 25%; display: flex; flex-grow: 1; align-items: flex-start;'><div>"
      + "<div id='selectImage" + id + "' ";
      if (selectedIcon != '') html += "class='galleryImage'";
      if (selectedIcon != '') html += "onclick='selectImage(this.id);'";
      html += "style='background-image: url(" + '"' + urlImage + '"' + "), url(immagini/transparency.png); opacity: 0; transition: .2s; border: 1px solid rgb(200, 200, 200, .1); width: 200px; height: 150px; background-size: auto, cover; background-position: center; background-repeat: no-repeat; border-radius: 10px;'>"
      + '</div>';

    if (selectedIcon != '') {
      html += "<div id='selectImage" + id + "' onclick='selectImage(this.id);' class='button' style='display: block; color: rgb(255, 255, 255, .7); margin: 5px auto 2px; font-size: 13px; padding: 8px 12px; border-radius: 8px;'>"
        + "<span style='font-family: Material Icons; font-size: 20px; vertical-align: middle;'>add_photo_alternate</span><span style='vertical-align: middle; margin-left: 5px;'>Select image</span>"
      + '</div>'
    } else {
      html += "<div class='disableOrder' style='color: rgb(255, 255, 255, .7); margin: 5px auto 2px; font-size: 13px; padding: 8px 12px; border-radius: 8px;'>"
        + "<span style='font-family: Material Icons; font-size: 20px; vertical-align: middle;'>add_photo_alternate</span><span style='vertical-align: middle; margin-left: 5px;'>Select image</span>"
      + '</div>'
    }

    html += "<div id='removeImage" + id + "' onclick='openDeleteImage(); idImageDelete = this.id;' class='button' style='color: rgb(255, 0, 0, .5); margin: 2px auto 5px; font-size: 13px; padding: 8px 12px; border-radius: 8px;'>"
      + "<span style='font-family: Material Icons; font-size: 20px; vertical-align: middle;'>remove</span><span style='vertical-align: middle; margin-left: 5px;'>Delete image</span>"
    + '</div>'
  + '</div></div>';


  //   html += "<td style='width: 10px; border-top-left-radius: 10px; border-bottom-left-radius: 10px;'>"
  // + "<p id='selectImage" + id + "' onclick='selectImage(this.id);' class='button' style='color: rgb(255, 255, 255, .4); user-select: none; padding: 6px; border-radius: 50%; margin: 0; margin-left: 9px;'>"
  //   + "<span style='font-size: 22px; font-family: Material Icons; transition: .3s;'>"
  //     + selectedIcon
  //   + "</span>"
  //   + "</p>"
  //   + "</td>"
  //

  document.getElementById('tableImages').innerHTML += html;

  var actualImage = new Image();
  actualImage.src = $('#selectImage' + id).css('background-image').split(", url")[0].replace(/"/g,"").replace(/url\(|\)$/ig, "");

  actualImage.onload = function() {
      width = this.width;
      height = this.height;
      if (width > 200 || height > 150) document.getElementById('selectImage' + id).style.backgroundSize = 'contain, cover';
      document.getElementById('selectImage' + id).style.opacity = '1';
  }

}

function selectImage(id) {

  edited = true;

  var index = id.replace("selectImage", "");

  if (typeAddingImage == "addImage") {
    addElements("image");

    selectedId = 'Image ' + totImages;

    document.getElementById('imageUrlText').value = 'url("' + imageToUrl[index].url + '")';
    setClasses('background-image', 'imageUrlText', styleName);
    document.getElementById('imageUrlText').value = 'image';

    clickBoard();
  } else {

    document.getElementById('imageUrlText').value = 'url("' + imageToUrl[index].url + '")';
    setClasses('background-image', 'imageUrlText', styleName);
    document.getElementById('imageUrlText').value = 'image';

    creaListElements();
  }

  openHeadLink("imageManager");

  //seleziona elemento nel TreeView
  var elementsTree = document.getElementById('parent').getElementsByClassName('li');
  for (var j=0; j<elementsTree.length; j++) {
   if (!replaceIcons(elementsTree[j].innerText).includes("Section ")) {
     if (replaceIcons(elementsTree[j].innerText) == selectedId && !firstClick) elementsTree[j].style.backgroundColor = 'rgba(150, 150, 150, .2)';
     else elementsTree[j].style.backgroundColor = 'transparent';
   }
  }

}

function noneImage() {

  edited = true;

  document.getElementById('imageUrlText').value = 'none';
  setClasses('background-image', 'imageUrlText', styleName);

  creaListElements();
}

function removeImage(id) {

  edited = true;

  var index = id.replace("removeImage", "");

  clickBoard();

  var displayModeTemp = displayMode;
  var imagesElem = document.getElementById('board').getElementsByTagName('*');

  var arrayElemError = [], stringErr = 'This images is already used in: ';

  displayMode = 'computer';

  for (var m=0; m<imagesElem.length; m++) {

      if (getStyle(imagesElem[m])[12] == 'url("' + imageToUrl[index].url +'")') {
        for (var i=0; i<nameElementsJson.length; i++) {
          if (nameElementsJson[i].id == imagesElem[m].id) {
            arrayElemError.push(nameElementsJson[i].name);
          }
        }
      }

  }

  displayMode = 'mobile';

  for (var m=0; m<imagesElem.length; m++) {

      if (getStyle(imagesElem[m])[12] == 'url("' + imageToUrl[index].url +'")') {
        for (var i=0; i<nameElementsJson.length; i++) {
          if (nameElementsJson[i].id == imagesElem[m].id) {
            arrayElemError.push(nameElementsJson[i].name + ' (mobile)');
          }
        }
      }

  }

  displayMode = displayModeTemp;

  if (arrayElemError.length > 0) {
    for (var n=0; n<arrayElemError.length - 1; n++) {
      stringErr += arrayElemError[n] + ', ';
    }
    stringErr += arrayElemError[n];
    alertFun(stringErr, "red");
    return;
  }

  if (selected && imageToUrl[index].url == window.getComputedStyle(document.getElementById(selectedId)).getPropertyValue("background-image").replaceAll('"', '').replace("url(", "").replace(")", "")) {
    document.getElementById('imageUrlText').value = 'none';
    setClasses('background-image', 'imageUrlText', styleName);
  }


  $.ajax({
    url: 'delete.php',
    data: {'file' : imageToUrl[index].urlTemp },
    success: function (response) {

      imageToUrl[index].url = "";
      imageToUrl[index].urlTemp = "";
      imageToUrl[index].filename = "";

      loadTabellaImages();
      saveAlert = false;
      var selectTmp = selectedId;
      saveProject();
      selectedId = selectTmp;

      alertFun("File deleted successfully", "green");
    },
    error: function () {
      alertFun("File not deleted (Try to refresh the page)", "red");
    }
  });


}

function openDeleteImage() {

  if (document.getElementById('ombraLoading').style.display == 'block') {
    document.getElementById('ombraLoading').style.display = 'none';
    document.getElementById('alertDeleteImage').style.display = 'none';
    document.getElementById('alertDeleteImage').style.animation = '';
  } else {
    document.getElementById('ombraLoading').style.display = 'block';
    document.getElementById('alertDeleteImage').style.display = 'block';
    document.getElementById('alertDeleteImage').style.animation = '.3s cubic-bezier(.175,.885,.32,1.275) 0s 1 popupAnim';
  }

}

function attivaProprieta(id) {

  //SIZE
  document.getElementById('divContSize').style.display = 'block';
  document.getElementById('divWidth').style.display = 'inline-block';
  document.getElementById('divWidth').children[0].readOnly = false;
  document.getElementById('divWidth').style.width = '39%';
  document.getElementById('widthSlideCont').style.display = 'none';
  document.getElementById('widthText').style.display = null;
  document.getElementById('divHeight').style.display = 'inline-block';
  document.getElementById('divMinHeightSection').style.display = 'inline-block';
  document.getElementById('fit-minHeight').style.display = 'none';
  document.getElementById('divMinHeightSection').style.width = '100%';
  document.getElementById('divVerticalAlign').style.display = 'block';
  document.getElementById('divFitSize').style.display = 'block'; //(fit-width ...)
  document.getElementById('divOrder').style.display = 'block';
  document.getElementById('divPositionAlign').style.display = 'block';
  document.getElementById('divContWrap').style.display = 'none';

  //POSITION
  document.getElementById('divContPosition').style.display = 'block';
  document.getElementById('positionProperties').style.display = 'block';
  document.getElementById('alignItemsCont').style.display = 'block';

  document.getElementById('textTitle').style.display = 'block';
  document.getElementById('paddingDivCont').style.display = 'block';
  document.getElementById('overflowDivCont').style.display = 'none';
  document.getElementById('fontCont').style.display = 'block';
  document.getElementById('colorCont').style.display = 'block';
  document.getElementById('borderCont').style.display = 'block';
  document.getElementById('imageCont').style.display = 'block';
  document.getElementById('buttCont').children[0].style.display = 'inline-block';
  document.getElementById('buttCont').children[2].style.display = 'inline-block';
  document.getElementById('buttCont').children[4].style.display = 'inline-block';
  document.getElementById('buttCont').children[6].style.display = 'inline-block';
  document.getElementById('buttCont').children[8].style.display = 'inline-block';

  if (id.includes("Section ")) {
    document.getElementById('divWidth').style.display = 'block';
    document.getElementById('divWidth').style.width = '100%';
    document.getElementById('divWidth').children[0].readOnly = true;
    document.getElementById('widthSlideCont').style.display = 'block';
    document.getElementById('widthText').style.display = 'none';
    document.getElementById('divHeight').style.display = 'none';
    document.getElementById('divMinHeightSection').style.width = '85%';
    document.getElementById('fit-minHeight').style.display = 'inline-block';
    document.getElementById('divFitSize').style.display = 'none'; //(fit-width ...)
    document.getElementById('divPositionAlign').style.display = 'none';
    document.getElementById('divContPosition').style.display = 'none';
    document.getElementById('positionProperties').style.display = 'none';
    document.getElementById('alignItemsCont').style.display = 'none';
    document.getElementById('innerTextCont').style.display = 'none';
    document.getElementById('valueCont').style.display = 'none';
    document.getElementById('textTitle').style.display = 'none';
    document.getElementById('fontCont').style.display = 'none';
    document.getElementById('buttCont').children[0].style.display = 'inline-block';
    document.getElementById('buttCont').children[2].style.display = 'none';
    document.getElementById('buttCont').children[4].style.display = 'none';
    document.getElementById('buttCont').children[6].style.display = 'inline-block';
    document.getElementById('buttCont').children[8].style.display = 'inline-block';
  } else if (id.includes("Container ")) {
    document.getElementById('fontCont').style.display = 'none';
    document.getElementById('divVerticalAlign').style.display = 'none';
    document.getElementById('divOrder').style.display = 'none';
    document.getElementById('divContWrap').style.display = 'block';
    document.getElementById('overflowDivCont').style.display = 'block';
  } else if (id.includes("Image ")) {
    document.getElementById('fontCont').style.display = 'none';
    document.getElementById('divVerticalAlign').style.display = 'none';
    document.getElementById('divOrder').style.display = 'none';
    document.getElementById('textTitle').style.display = 'none';
    document.getElementById('fontCont').style.display = 'none';
    document.getElementById('colorCont').style.display = 'none';
  } else if (id.includes("Row ")) {
    document.getElementById('divContSize').style.display = 'none';
    document.getElementById('divMinHeightSection').style.display = 'none';
    document.getElementById('divVerticalAlign').style.display = 'none';
    document.getElementById('divOrder').style.display = 'none';
    document.getElementById('paddingDivCont').style.display = 'none';
    document.getElementById('divWidth').style.display = 'none';
    document.getElementById('divHeight').style.display = 'none';
    document.getElementById('fit-minHeight').style.display = 'none';
    document.getElementById('divFitSize').style.display = 'none'; //(fit-width ...)
    document.getElementById('divPositionAlign').style.display = 'none';
    document.getElementById('divContPosition').style.display = 'none';
    document.getElementById('alignItemsCont').style.display = 'none';
    document.getElementById('positionProperties').style.display = 'none';
    document.getElementById('innerTextCont').style.display = 'none';
    document.getElementById('valueCont').style.display = 'none';
    document.getElementById('textTitle').style.display = 'none';
    document.getElementById('fontCont').style.display = 'none';
    document.getElementById('buttCont').children[0].style.display = 'inline-block';
    document.getElementById('buttCont').children[2].style.display = 'none';
    document.getElementById('buttCont').children[4].style.display = 'none';
    document.getElementById('buttCont').children[6].style.display = 'inline-block';
    document.getElementById('buttCont').children[8].style.display = 'inline-block';
  } else {
    document.getElementById('divVerticalAlign').style.display = 'none';
    document.getElementById('divOrder').style.display = 'none';
  }

}

function orderSection() {

  var rows = document.getElementsByClassName('rowClass'), tempId = selectedId;
  for (var i=0; i<rows.length; i++) {
    var orderNum = 1;
    var arrOrder = [];

    for (var k=0; k<rows[i].children.length; k++) {
      arrOrder.push({'order': parseInt(window.getComputedStyle(document.getElementById(rows[i].children[k].id)).getPropertyValue('order')), 'id': rows[i].children[k].id});
    }

    arrOrder = arrOrder.sort(sortByProperty('order'));

    var k=0;
    while (k<arrOrder.length) {
      selectedId = arrOrder[k].id;
      document.getElementById('orderText').value = orderNum;
      setClasses('order', 'orderText', styleName);
      orderNum++;
      k++;
    }

  }

  if (tempId != null || tempId != "") selectedId = tempId;
  checkExistOrder();
}

function increaseOrder() {

  var rows = document.getElementsByClassName('rowClass'), tempId = selectedId;
  for (var i=0; i<rows.length; i++) {

    var arrOrder = [];

    for (var k=0; k<rows[i].children.length; k++) {
      arrOrder.push({'order': parseInt(window.getComputedStyle(document.getElementById(rows[i].children[k].id)).getPropertyValue('order')), 'id': rows[i].children[k].id});
    }
    arrOrder = arrOrder.sort(sortByProperty('order'));

    for (var y=0; y<arrOrder.length; y++) {
      if (arrOrder[y].order == parseInt(window.getComputedStyle(document.getElementById(tempId)).getPropertyValue('order')) + 1) {
        try {
          selectedId = arrOrder[y].id;
          document.getElementById('orderText').value = parseInt(arrOrder[y].order) - 1;
          setClasses('order', 'orderText', styleName);
        } catch {}
      }
    }

  }

  if (tempId != null || tempId != "") selectedId = tempId;

  document.getElementById('orderText').value = parseInt(window.getComputedStyle(document.getElementById(selectedId)).getPropertyValue('order')) + 1;
  setClasses('order', 'orderText', styleName);

  aggiustaSelect();
  orderSection();
}

function decreaseOrder() {

  var rows = document.getElementsByClassName('rowClass'), tempId = selectedId;
  for (var i=0; i<rows.length; i++) {

    var arrOrder = [];

    for (var k=0; k<rows[i].children.length; k++) {
      arrOrder.push({'order': parseInt(window.getComputedStyle(document.getElementById(rows[i].children[k].id)).getPropertyValue('order')), 'id': rows[i].children[k].id});
    }
    arrOrder = arrOrder.sort(sortByProperty('order'));

    for (var y=0; y<arrOrder.length; y++) {
      if (arrOrder[y].order == parseInt(window.getComputedStyle(document.getElementById(tempId)).getPropertyValue('order')) - 1) {
        try {
          selectedId = arrOrder[y].id;
          document.getElementById('orderText').value = parseInt(arrOrder[y].order) + 1;
          setClasses('order', 'orderText', styleName);
        } catch {}
      }
    }

  }

  if (tempId != null || tempId != "") selectedId = tempId;

  document.getElementById('orderText').value = parseInt(window.getComputedStyle(document.getElementById(selectedId)).getPropertyValue('order')) - 1;
  setClasses('order', 'orderText', styleName);

  aggiustaSelect();
  orderSection();
}

function checkExistOrder() {

  document.querySelector('[name="left-order"]').classList.remove('disableOrder');
  document.querySelector('[name="right-order"]').classList.remove('disableOrder');

  var row = document.getElementById(selectedSectionId).parentNode;
  var arrOrder = [];

  for (var k=0; k<row.children.length; k++) {
    arrOrder.push({'order': parseInt(window.getComputedStyle(document.getElementById(row.children[k].id)).getPropertyValue('order')), 'id': row.children[k].id});
  }
  arrOrder = arrOrder.sort(sortByProperty('order'));

  for (var y=0; y<arrOrder.length; y++) {
    if (arrOrder[y].order == window.getComputedStyle(document.getElementById(selectedSectionId)).getPropertyValue('order')) {
      //check exist
      try {
        checkExist = arrOrder[y+1].id;
      } catch {
        document.querySelector('[name="right-order"]').classList.add('disableOrder');
      }
      try {
        checkExist = arrOrder[y-1].id;
      } catch {
        document.querySelector('[name="left-order"]').classList.add('disableOrder');
      }
    }
  }

}

function sortByProperty(property){
   return function(a,b){
      if(a[property] > b[property])
         return 1;
      else if(a[property] < b[property])
         return -1;

      return 0;
   }
}

$(document).ready(function(){
  $(".previewStructure").hover(function(){
    $(this).parent().children(".previewStructure").each(function () {
      $(this).css("background-color", "rgb(200, 200, 200, .25)");
    });
    }, function(){
      $(this).parent().children(".previewStructure").each(function () {
        $(this).css("background-color", "rgb(200, 200, 200, .4)");
      });
  });
});

$(document).ready(function(){
  $(".previewStructure").click(function(){
    $(this).parent().children(".previewStructure").each(function () {
      $(this).css("background-color", "rgb(200, 200, 200, .2)");
    });
    addRowPopup($(this).parent().attr('id'));
  });
});

function verticalAlignSection(pos) {

  if (pos == 'top') {
    document.getElementById('verticalAlignSectionText').value = 'flex-start';
    setClasses('align-items', 'verticalAlignSectionText', styleName);
  }

  if (pos == 'center') {
    document.getElementById('verticalAlignSectionText').value = 'center';
    setClasses('align-items', 'verticalAlignSectionText', styleName);
  }

  if (pos == 'bottom') {
    document.getElementById('verticalAlignSectionText').value = 'flex-end';
    setClasses('align-items', 'verticalAlignSectionText', styleName);
  }

}

function toggleColorTheme(ev) {

  ev.parentNode.style.transition = '.2s';
  ev.parentNode.parentNode.children[0].style.transition = '.2s';

  if (ev.style.color.includes('255')) {
    ev.style.color = 'rgb(30, 30, 30)';
    ev.parentNode.style.backgroundColor = 'var(--white_board)';
    ev.parentNode.parentNode.children[0].style.backgroundColor = 'var(--white_board)';
  } else {
    ev.style.color = 'rgb(255, 255, 255, .8)';
    ev.parentNode.style.backgroundColor = 'rgb(30, 30, 30)';
    ev.parentNode.parentNode.children[0].style.backgroundColor = 'rgb(30, 30, 30)';
  }

}

// function setPercentageHeight() {
//
//   var elemBoardRow = document.getElementById("board").getElementsByTagName('*');
//   for (var e=0; e<elemBoardRow.length; e++) {
//
//     var overflowSizes = parseInt(getStyle(elemBoardRow[e])[22].split("- ")[1]);
//
//     if (getStyle(elemBoardRow[e])[22].includes("%") && elemBoardRow[e].parentNode.parentNode.parentNode.id.includes("Section")) {
//       elemBoardRow[e].style.height = parseInt(getStyle(elemBoardRow[e])[22].split(" -")[0].replace("calc(", "")) / 100 * elemBoardRow[e].parentNode.parentNode.parentNode.clientHeight - overflowSizes;
//     }
//     if (getStyle(elemBoardRow[e])[22].includes("%") && !elemBoardRow[e].parentNode.parentNode.parentNode.id.includes("Section")) {
//       elemBoardRow[e].style.height = parseInt(getStyle(elemBoardRow[e])[22].split(" -")[0].replace("calc(", "")) / 100 * elemBoardRow[e].parentNode.parentNode.clientHeight - overflowSizes;
//     }
//   }
//
// }

var tempARRAYmenu = [];

function addMenu() {

  if (tempARRAYmenu.length == 0) { //variabile vuota
    alertFun("Add at least 1 element", "red");
    return;
  }

  var createdElem = addElements("menu");

  for (var i=0; i<tempARRAYmenu.length; i++) {
    document.getElementById(createdElem).innerHTML += '<li>' + tempARRAYmenu[i] + '</li>';
  }

  //restore
  tempARRAYmenu = [];
  document.getElementById('listMenu').innerHTML = '';
  document.getElementById('noElementsMenu').style.display = null;


}

function addMenuElement(ev) {

  var nome = document.getElementById("nameMenuText").value;

  if (nome != '' || nome) {

    document.getElementById('noElementsMenu').style.display = 'none';

    var html = "<div class='menuListItem' style='transition: .3s; width: 80%; margin: 10px auto; border: 1px solid rgb(200, 200, 200, .1); border-radius: 6px; padding: 10px 12px; cursor: pointer; user-select: none; display: flex; justify-content:space-between;'>"
      + "<div>"
        + "<span style='font-size: 13px; color: rgb(255, 255, 255, .7); vertical-align: middle; margin-left: 5px;'>"
          + nome
        + "</span>"
      + "</div>"
      + "<div>"
        + "<span class='buttonMaterial' style='font-size: 13px; color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-right: 5px; padding: 5px; border-radius: 900px;'>link</span>"
        + "<span class='buttonMaterial' style='font-size: 13px; color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-right: -5px; padding: 5px; border-radius: 900px;'>remove</span>"
      + "</div>"
    + "</div>";

    tempARRAYmenu.push(nome);
    document.getElementById('listMenu').innerHTML += html;

    var objDiv = document.getElementById("listMenu");
    objDiv.scrollTop = objDiv.scrollHeight;

    document.getElementById("nameMenuText").value = '';

  }

}

// FORMAT TEXT ----------------------------------------

function formatText(tag, value) {
  document.execCommand(tag, false, value);
}

function setUrl() {
  // var url = "https://www.google.com";
  // var sText = document.getSelection();
  // document.execCommand('insertHTML', false, '<a href="' + url + '" target="_blank">' + sText + '</a>');
  // document.getElementById('textAreaInnerText').value = '';
}

document.addEventListener('paste', function (event) {
  event.preventDefault();
  document.execCommand('inserttext', false, event.clipboardData.getData('text/plain'));
});

// PAGES -----------------------------

var pagesJSON = [{name: "First Page", html: "", type: "main"}];
var currentPage = "First Page";
var currentPageID = "0";

function addPagesElement(ev) {

  var nome = document.getElementById("namePagesText").value;

  if (nome != '' || nome) {

    var html = "<div id='page" + document.getElementById('listPages').children.length + "' onclick='selectPage(this);' class='button' style='transition: .3s; width: 80%; margin: 10px auto; border: 1px solid rgb(200, 200, 200, .1); border-radius: 6px; padding: 10px 12px; cursor: pointer; user-select: none; display: flex; justify-content:space-between;'>"
      + "<div>"
        + "<span style='font-size: 13px; color: rgb(255, 255, 255, .7); vertical-align: middle; margin-left: 5px;'>"
          + nome
        + "</span>"
      + "</div>"
      + "<div>"
        + "<span onclick='event.stopPropagation(); renamePage(this);' class='buttonMaterial' style='font-size: 13px; color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-right: 5px; padding: 5px; border-radius: 900px;'>edit</span>"
        + "<span onclick='event.stopPropagation(); deletePage(this);' class='buttonMaterial' style='font-size: 13px; color: rgb(255, 255, 255, .7); font-family: Material Icons; font-size: 18px; vertical-align: middle; margin-right: -5px; padding: 5px; border-radius: 900px;'>remove</span>"
      + "</div>"
    + "</div>";

    pagesJSON.push({"name" : nome, "html" : '', "type": ''});
    document.getElementById('listPages').innerHTML += html;

    elemState.push({"page" : nome, "id" : "", "class" : "", "classIcon" : ""});

    var objDiv = document.getElementById("listPages");
    objDiv.scrollTop = objDiv.scrollHeight;

    document.getElementById("namePagesText").value = '';

    selectPage(document.getElementById('page' + (document.getElementById('listPages').children.length - 1)));
    openHeadLink('selectRow', false);

  }

}

function selectPage(ev) {

  if (pagesMode == 'Drop') {
    document.getElementById('board').innerHTML = document.getElementById('board').innerHTML.replace(htmlDrop[0].html, "");
    setPageHTML();
  }

  switchMode('switchPc');
  clickBoard();

  if (pagesMode != 'Include') {
    if (currentPage != ev.children[0].innerText) {
      document.getElementById('board').classList.add("blur-in");
    }
    setTimeout(function() {
      document.getElementById('board').classList.remove("blur-in");
    }, 200);

    currentPage = ev.children[0].innerText;
    currentPageID = ev.id.replace("page", "");
    setBoardTheme();
    document.getElementById('board').innerHTML = pagesJSON[currentPageID].html;
    clickBoard(); //giusto che ce ne siano 2
    try {
      var elementsBoard = document.getElementById('board').children;
      for (var i=0; i<elementsBoard.length; i++) {
        if (elementsBoard[i].id.includes("Row ")) {
          selectedSectionId = elementsBoard[i].children[0].id;
        }
      }
    } catch {}
    document.getElementById("currentPageText").innerText = currentPage;
  }

  if (pagesMode == 'Drop') {
    if (htmlDrop[0].name.includes("Row")) pasteElem = document.getElementById('board');
    if (htmlDrop[0].name.includes("Section")) pasteElem = document.getElementById(selectedSectionId).parentNode;
    if (!htmlDrop[0].name.includes("Row") && !htmlDrop[0].name.includes("Section")) pasteElem = document.getElementById(selectedSectionId).children[0];
    pasteElem.innerHTML += htmlDrop[0].html;
    setPageHTML();
    pagesMode = "Select";
  }

  if (pagesMode == 'Include') {
    addIncludePage(ev.children[0].innerText);
    pagesMode = "Select";
  }

  openHeadLink("pagesManager");
  creaListElements();
  emptySection();
  setIncludes();

}

function setPageHTML() {
  try {document.getElementById('outlinerSelectionOUTER').remove()} catch {}
  pagesJSON[currentPageID].html = document.getElementById('board').innerHTML;
  setIncludes();
}

function setMain(ev) {

  var list = document.getElementById('listPages').children;

  for (var i=0; i<list.length; i++) {
    list[i].children[2].children[3].innerText = 'check_box_outline_blank';
  }
  for (var w=0; w<pagesJSON.length; w++) {
    if (pagesJSON[w].type == '' || pagesJSON[w].type == 'main') {
      pagesJSON[w].type = '';
    }
  }

  ev.innerText = 'check_box';
  pagesJSON[ev.parentNode.parentNode.id.replace("page", "")].type = 'main';

}

function renamePage(ev) {

  if (ev.innerText == 'edit') {
    ev.innerText = 'done';
    ev.parentNode.parentNode.children[1].style.display = null;
    ev.parentNode.parentNode.children[1].parentNode.children[0].style.display = 'none';
    ev.parentNode.parentNode.children[1].children[0].value = ev.parentNode.parentNode.children[0].innerText;
    ev.parentNode.parentNode.children[1].children[0].select();
  } else {

    for (var w=0; w<linksJSON.length; w++) {
      if (linksJSON[w].type == 'page' && linksJSON[w].link == ev.parentNode.parentNode.children[0].children[0].innerText + '.html') {
        linksJSON[w].link = ev.parentNode.parentNode.children[1].children[0].value + '.html';
      }
    }

    var elementsBoard = document.getElementById('board').children;
    var numIncludes = 0;
    for (var i=0; i<elementsBoard.length; i++) {
      console.log(elementsBoard[i].children[0].dataset.include + '  ' + elementsBoard[i].id);
      if (elementsBoard[i].children[0].dataset.include == ev.parentNode.parentNode.children[0].children[0].innerText) {
        elementsBoard[i].children[0].dataset.include = ev.parentNode.parentNode.children[1].children[0].value;
        setPageHTML();
        creaListElements();
      }
    }

    ev.innerText = 'edit';
    ev.parentNode.parentNode.children[1].style.display = 'none';
    ev.parentNode.parentNode.children[1].parentNode.children[0].style.display = null;
    var newName = ev.parentNode.parentNode.children[1].children[0].value;

    var existPageName = false;
    for (var w=0; w<pagesJSON.length; w++) {
      if (pagesJSON[w].name.replace("OFF__::", "") == ev.parentNode.parentNode.children[1].children[0].value) existPageName = true;
    }

    if (!existPageName) {

      var offORon = "";
      if (pagesJSON[ev.parentNode.parentNode.id.replace("page", "")].name.includes("OFF__::")) offORon = "OFF__::";
      pagesJSON[ev.parentNode.parentNode.id.replace("page", "")].name = offORon + ewName;
      ev.parentNode.parentNode.children[0].children[0].innerText = newName;
      if (ev.parentNode.parentNode.id.replace("page", "") == currentPageID) currentPage = newName;
      document.getElementById("currentPageText").innerText = currentPage;
      alertFun("Page renamed succesfully", "green");
    } else {
      alertFun("This name has already been used", "red")
    }

  }

}

var pagesDelete = "";
function deletePage(ev) {
  openHeadLink('pagesManager');
  openHeadLink('alertDeletePage');
  pagesDelete = ev.parentNode.parentNode.innerText.replace("editremovecheck_box_outline_blank", "").replace("editremovecheck_box", "");
}

function deletePageFun() {

  var totPages = 0;

  for (var w=0; w<pagesJSON.length; w++) {
    if (pagesJSON[w].name != "deleted") totPages ++;
  }

  for (var x=0; x<pagesJSON.length; x++) {

    if (pagesJSON[x].name.replace("OFF__::", "") == 'deleted') continue;
    document.getElementById('captured').innerHTML = pagesJSON[x].html;
    var elementsBoard = document.getElementById('captured').children;
    for (var i=0; i<elementsBoard.length; i++) {
      if (elementsBoard[i].children[0].dataset.include == pagesDelete) {
        alertFun("You can't delete this page because it's included in a page", "red");
        document.getElementById('captured').innerHTML = '';
        return;
      }
    }

  }
  document.getElementById('captured').innerHTML = '';

  if (totPages == 1) {
    alertFun("You can't delete this page", "red")
    return;
  }

  for (var w=0; w<pagesJSON.length; w++) {
    if (pagesJSON[w].name.replace("OFF__::", "") == pagesDelete) {
      pagesJSON[w].name = "deleted";
      break;
    }
  }

}

var selectedElementLink = '';
var isSelectingElementLink = false;

function selectElementLink() {
  document.getElementById('ombraForSelectionLink').style.display = null;
  isSelectingElementLink = true;
  openHeadLink("link");
}

function applyLink() {

  edited = true;

  var trovato = false;
  for (var w=0; w<linksJSON.length; w++) {
    if (linksJSON[w].elem == selectedId) {
      if (linkType == 'page') {
        linksJSON[w].link = selectedPage + '.html';
        linksJSON[w].type = linkType;
      } else if (linkType != 'element') {
        linksJSON[w].link = document.getElementById('linkText').value;
        linksJSON[w].type = linkType;
      } else if (linkType == 'element') {
        linksJSON[w].link = selectedElementLink;
        linksJSON[w].type = linkType;
      }
      trovato = true;

      if ((linkType == 'page' && selectedPage == '') || (linkType != 'page' && linkType != 'element' && document.getElementById('linkText').value == '') || (linkType == "element" && selectedElementLink == '')) {
        linksJSON[w].elem = '';
        document.getElementById('linkButt').children[0].innerText = 'add_link';
        document.getElementById('linkButt').style.backgroundColor = null;
      }
    }
  }

  if ((linkType == 'page' && selectedPage == '') || (linkType != 'page' && linkType != 'element' && document.getElementById('linkText').value == '') || (linkType == "element" && selectedElementLink == '')) {
    openHeadLink("link");
    closeLink();
    return;
  }

  if (!trovato) {
    if (linkType == 'page') linksJSON.push({"elem" : selectedId, "link" : selectedPage + '.html', "type": linkType});
    if (linkType != 'page' && linkType != 'element') linksJSON.push({"elem" : selectedId, "link" : document.getElementById('linkText').value, "type": linkType});
    if (linkType == 'element') {
      linksJSON.push({"elem" : selectedId, "link" : selectedElementLink, "type": linkType});
    }
  }

  document.getElementById('linkButt').children[0].innerText = 'link';
  document.getElementById('linkButt').style.backgroundColor = 'rgb(150, 150, 150, .1)';

  openHeadLink("link");
  closeLink();
}

function closeLink() {
  document.getElementById('linkText').value = '';
  document.getElementById('openInNewTab').checked = false;
  linkType = 'new tab_false';
  selectLinkType("external");
  selectedPage = "";
  console.log(linksJSON);
}

function togliSelectedElementLink() {
  document.getElementById('goToText').style.display = 'none';
  selectedElementLink = '';
}

function selectLinkType(mode) {

  if (mode == 'external') {
    linkType = 'new tab_false';
    var list = document.getElementById('selectPageCont').children;
    for (var i=0; i<list.length; i++) {
      list[i].style.backgroundColor = 'transparent';
      list[i].style.border = '1px solid rgb(200, 200, 200, .1)';
    }
    selectedPage = "";
  } else if (mode == 'internal') {
    linkType = 'page';
    document.getElementById('linkText').value = '';
    document.getElementById('openInNewTab').checked = false;
  } else if (mode == 'element') {
    linkType = 'element';
    document.getElementById('linkText').value = '';
    document.getElementById('openInNewTab').checked = false;
  }

  var titleLink = document.getElementsByClassName("titleLink");
  var contLink = document.getElementsByClassName("contLink");

  for (var i=0; i<titleLink.length; i++) {
    titleLink[i].style.borderRadius = '8px';
    titleLink[i].children[0].innerText = 'check_box_outline_blank';
    contLink[i].style.display = 'none';

  }

  document.getElementById(mode + 'Title').style.borderRadius = null;
  document.getElementById(mode + 'Title').style.borderTopLeftRadius = '8px';
  document.getElementById(mode + 'Title').style.borderTopRightRadius = '8px';
  document.getElementById(mode + 'Title').children[0].innerText = 'check_box';
  document.getElementById(mode + 'Cont').style.display = null;

}

var selectedPage;

function selectPageLink(ev) {

  var list = document.getElementById('selectPageCont').children;
  for (var i=0; i<list.length; i++) {
    list[i].style.backgroundColor = 'transparent';
    list[i].style.border = '1px solid rgb(200, 200, 200, .1)';
  }

  if (ev.innerText == selectedPage) {
    ev.style.backgroundColor = 'transparent';
    ev.style.border = '1px solid rgb(200, 200, 200, .1)';
    selectedPage = "";
  } else {
    ev.style.backgroundColor = 'rgba(150, 150, 150, .1)';
    ev.style.border = null;
    selectedPage = ev.innerText;
  }


}

function addIncludePage(name) {
  addElements("includes");
  document.getElementById("Includes " + totIncludes).dataset.include = name;
  setIncludes();
}

function setIncludes() {

  var elem = document.getElementsByClassName("includes");

  for (var i=0; i<elem.length; i++) {
    name = elem[i].dataset.include;

    for (var w=0; w<pagesJSON.length; w++) {
      if (pagesJSON[w].name.replace("OFF__::", "") == name) {
        console.log(pagesJSON);
        elem[i].parentNode.style = 'pointer-events: auto;';
        elem[i].style = 'outline: 2px solid red; outline-offset: -2px;';
        elem[i].innerHTML = pagesJSON[w].html;

        var divsEmpty = elem[i].getElementsByClassName('emptySection');
        for (var s=divsEmpty.length-1; s>=0; s--) {
          divsEmpty[s].remove();
        }

        break;
      }
    }
  }

  clickBoard();

}

function checkIfParentIncludes(elem) {
  var parentIncludes = false;
  var a = elem;
  var els = [];
  while (a) {
      els.unshift(a);
      a = a.parentNode;
      try {if (a.parentNode.id.includes("Includes ")) parentIncludes = true;} catch {}
  }
  return parentIncludes;
}

function deleteFromJSON(jsonVar, fromVar, findVar) {
  for (var i=0; i<jsonVar.length; i++) {
    if (jsonVar[i][fromVar] == findVar) jsonVar[i][fromVar] = '';
  }

  var newJson = [];
  for (var i=0; i<jsonVar.length; i++) {
    if (jsonVar[i][fromVar] != '') newJson.push(jsonVar[i]);
  }

  return newJson;
}

function expandColor(id) {

  if (document.getElementById(id).style.display == 'none') {
    document.getElementById(id).style.display = null;
  } else {
    document.getElementById(id).style.display = 'none';
  }

  document.getElementById(id).innerHTML = '';

  var selectionColor = "";

  for (var i=0; i<colorPalette.length; i++) {

    if (colorPalette[i].color.replace(", 1)", ")") == document.getElementById(id.split("_")[0].replace("Expand", "Text")).value) selectionColor = " outline: 2px solid rgb(255, 255, 255, .8);";
    if (colorPalette[i].color.replace("rgb", "rgba") == document.getElementById(id.split("_")[0].replace("Expand", "Text")).value) selectionColor = " outline: 2px solid rgb(255, 255, 255, .8);";
    document.getElementById(id).innerHTML += "<div id='" + id + "_color_" + colorPalette[i].colorName + "' class='scale-up-center selectColor' onclick='selectColor(this);' style='background-color: " + colorPalette[i].color + ";" + selectionColor + "' data-color='" + colorPalette[i].color + "'></div>";
    selectionColor = "";

  }

  if (colorPalette.length == 0) document.getElementById(id).innerHTML = "<div style='color: rgb(255, 255, 255, .6); font-size: 13px; text-align: center; width: 100%; margin-top: 2px;'>No color palettes</div>";

  if (!id.includes("Customize")) document.getElementById(id).innerHTML += '<div style="width: 100%; margin-top: 7px; text-align: right;"><div style="width: 100%; height: 1px; background-color: rgb(200, 200, 200, .3);"></div><div id="' + id + '" onclick="addBookmarkColor(this.id);" class="button" style="font-family: Material Icons; color: rgb(255, 255, 255, .8); padding: 5px; margin-top: 5px; font-size: 20px;">bookmark_add</div></div>'

}

function addBookmarkColor(id) {
  expandColor(id);
  openHeadLink("addColorPalette");

  document.getElementById('backColorPreview').style.top = document.getElementById('colorPreview').offsetTop + 1;
  document.getElementById('backColorPreview').style.left = document.getElementById('colorPreview').offsetLeft + 1;

  document.getElementById("colorNameText").focus();
  document.getElementById('colorPreview').style.backgroundColor = document.getElementById(id.replace("Expand", "Text")).value;

}

function selectColor(ev) {

  var colorName = ev.id.split("_")[2];
  var color = ev.dataset.color;

  // if (!ev.id.includes("Theme_")) colorToElement.push({"id": selectedId, "colorName": colorName, "color": color});

  document.getElementById(ev.id.split("_")[0].replace("Expand", "Text")).value = color;

  setTimeout(function() {
    try {document.getElementById(selectedId).click();} catch {}
    try {
      applyCustomCSSTheme("textCSSCustom", customClass, "0");
      var totElemCust = document.getElementsByClassName("elemCust");
      for (var i=0; i<totElemCust.length; i++) {
        if (totElemCust[i].style.boxShadow.includes("var(--secondary_opacity)")) {
          selectedElemCustom(totElemCust[i].innerText);
        }
      }
    } catch {}
  }, 1);

  expandColor(ev.id.split("_")[0]);
}

// contruct è quando lo crei dall' add
function selectColorConstruct(ev) {

  var colorName = ev.id.split("_")[2];
  var color = ev.dataset.color;

  var selectColorElements = document.getElementsByClassName("selectColor");
  for (var i=0; i<selectColorElements.length; i++) {
    selectColorElements[i].style.outline = null;
  }

  if (document.getElementById('backgroundTextConstruct').value == color) {
    document.getElementById('backgroundTextConstruct').value = '';
    return;
  }

  document.getElementById("backgroundTextConstruct").value = color;

  ev.style.outline = '2px solid rgb(255, 255, 255, .7)';

}

var isContextMenu = false;

document.addEventListener('contextmenu', function(ev) {
    ev.preventDefault();

    if (document.getElementById('fullBoard').style.display == 'block' || displayMode == 'mobile') return;

    var id = replaceIcons(ev.target.parentNode.innerText);

    if (id.includes("Includes ")) {
      document.getElementById("contextMenu").style.display = null;
      document.getElementById("contextMenu").style.top = ev.clientY;
      document.getElementById("contextMenu").style.left = ev.clientX;

      document.getElementById("contextMenu").innerHTML = "";

      document.getElementById("contextMenu").innerHTML += "<p class='contextMenu' onclick='setFixed(this);' style='font-size: 13px; color: rgb(0, 0, 0, .8); margin: 0; padding: 7px 10px;'><span id='checkFixed' style='font-family: Material Icons; font-size: 20px; margin-right: 10px; vertical-align: middle;'>check</span><span style='vertical-align: middle;'>Fixed position</span></p>";
      // document.getElementById("contextMenu").innerHTML += "<div style='width: 94%; height: 1px; margin-left: 3%; background-color: rgb(0, 0, 0, .1);'></div>";
      // document.getElementById("contextMenu").innerHTML += "<p class='contextMenu' onclick='openHeadLink(" + '"alertDelete"' + ");' style='font-size: 13px; color: rgb(0, 0, 0, .8); margin: 0; padding: 7px 10px;'><span id='checkFixed' style='font-family: Material Icons; font-size: 20px; margin-right: 10px; vertical-align: middle;'>delete</span><span style='vertical-align: middle;'>Delete</span></p>";

      if (document.getElementById(id).classList.contains("fixed")) document.getElementById('checkFixed').style.opacity = '1';
      else document.getElementById('checkFixed').style.opacity = '0';

      document.getElementById("contextMenu").dataset.idElem = id;

      // deleteInclude = id;


    }

    id = ev.target.id;

    if (id.includes("Button ") || id.includes("Container ") || id.includes("Image ") || id.includes("Menu ") || id.includes("Link ") || id.includes("Text ") || id.includes("MaterialIcon ") || id.includes("InputBox ") || id.includes("Textarea ") || id.includes("Section ") || id.includes("Row ")) {

      isContextMenu = true;
      document.getElementById(id).click();

      document.getElementById("contextMenu").style.display = null;

      document.getElementById("contextMenu").innerHTML = "";
      document.getElementById("contextMenu").innerHTML += "<p class='contextMenu' onclick='openHeadLink(" + '"animationsManager"' + ");' style='font-size: 13px; color: rgb(0, 0, 0, .8); margin: 0; padding: 7px 10px;'><span id='' style='font-family: Material Icons; font-size: 20px; margin-right: 10px; vertical-align: middle;'>animation</span><span style='vertical-align: middle;'>Animations</span></p>";
      if (id.includes("Row") || !id.includes("Section ")) document.getElementById("contextMenu").innerHTML += "<p class='contextMenu' onclick='openHeadLink(" + '"link"' + ");' style='font-size: 13px; color: rgb(0, 0, 0, .8); margin: 0; padding: 7px 10px;'><span id='' style='font-family: Material Icons; font-size: 20px; margin-right: 10px; vertical-align: middle;'>link</span><span style='vertical-align: middle;'>Link</span></p>";
      if (id.includes("Row") || !id.includes("Section ")) document.getElementById("contextMenu").innerHTML += "<p class='contextMenu' onclick='openHeadLink(" + '"custCSS"' + ");' style='font-size: 13px; color: rgb(0, 0, 0, .8); margin: 0; padding: 7px 10px;'><span id='' style='font-family: Material Icons; font-size: 20px; margin-right: 10px; vertical-align: middle;'>colorize</span><span style='vertical-align: middle;'>Custom CSS</span></p>";
      document.getElementById("contextMenu").innerHTML += "<p class='contextMenu' onclick='duplicateElement(selectedId, document.getElementById(selectedId).parentNode.parentNode.id);' style='font-size: 13px; color: rgb(0, 0, 0, .8); margin: 0; padding: 7px 10px;'><span id='' style='font-family: Material Icons; font-size: 20px; margin-right: 10px; vertical-align: middle;'>content_copy</span><span style='vertical-align: middle;'>Duplicate</span></p>";
      document.getElementById("contextMenu").innerHTML += "<div style='width: 94%; height: 1px; margin-left: 3%; background-color: rgb(0, 0, 0, .1);'></div>";
      document.getElementById("contextMenu").innerHTML += "<p class='contextMenu' onclick='deleteKey();' style='font-size: 13px; color: rgb(0, 0, 0, .8); margin: 0; padding: 7px 10px;'><span id='' style='font-family: Material Icons; font-size: 20px; margin-right: 10px; vertical-align: middle;'>delete</span><span style='vertical-align: middle;'>Delete</span></p>";

      var topContextMenu = ev.clientY;
      if (topContextMenu + document.getElementById('contextMenu').clientHeight > window.innerHeight) {
        topContextMenu = topContextMenu - document.getElementById('contextMenu').clientHeight;
      }
      document.getElementById("contextMenu").style.top = topContextMenu;

      var leftContextMenu = ev.clientX;
      if (leftContextMenu + document.getElementById('contextMenu').clientWidth > window.innerWidth) {
        leftContextMenu = leftContextMenu - document.getElementById('contextMenu').clientWidth;
      }
      document.getElementById("contextMenu").style.left = leftContextMenu;

    }

    if (id.includes("boardOut")) {
      document.getElementById("contextMenu").style.display = null;

      document.getElementById("contextMenu").innerHTML = "";
      if (!pagesJSON[currentPageID].name.includes("OFF__::")) document.getElementById("contextMenu").innerHTML += "<p class='contextMenu' onclick='turnBoard();' style='font-size: 13px; color: rgb(0, 0, 0, .8); margin: 0; padding: 7px 10px;'><span id='' style='font-family: Material Icons; font-size: 20px; margin-right: 10px; vertical-align: middle;'>nightlight_round</span><span style='vertical-align: middle;'>Turn Off</span></p>";
      if (pagesJSON[currentPageID].name.includes("OFF__::")) document.getElementById("contextMenu").innerHTML += "<p class='contextMenu' onclick='turnBoard();' style='font-size: 13px; color: rgb(0, 0, 0, .8); margin: 0; padding: 7px 10px;'><span id='' style='font-family: Material Icons; font-size: 20px; margin-right: 10px; vertical-align: middle;'>wb_sunny</span><span style='vertical-align: middle;'>Turn On</span></p>";

      var topContextMenu = ev.clientY;
      if (topContextMenu + document.getElementById('contextMenu').clientHeight > window.innerHeight) {
        topContextMenu = topContextMenu - document.getElementById('contextMenu').clientHeight;
      }
      document.getElementById("contextMenu").style.top = topContextMenu;

      var leftContextMenu = ev.clientX;
      if (leftContextMenu + document.getElementById('contextMenu').clientWidth > window.innerWidth) {
        leftContextMenu = leftContextMenu - document.getElementById('contextMenu').clientWidth;
      }
      document.getElementById("contextMenu").style.left = leftContextMenu;

    }

    return false;
}, false);

function turnBoard() {

  if (!pagesJSON[currentPageID].name.includes("OFF__::")) {
    pagesJSON[currentPageID].name = "OFF__::" + pagesJSON[currentPageID].name;
  } else {
    pagesJSON[currentPageID].name = pagesJSON[currentPageID].name.replace("OFF__::", "");
  }

  setBoardTheme();

}

function setBoardTheme() {

  if (!pagesJSON[currentPageID].name.includes("OFF__::")) {
    document.getElementById('boardOut').style.backgroundColor = 'var(--white_board)';
    document.getElementById('board').style.backgroundColor = 'var(--white_board)';
  } else {
    document.getElementById('boardOut').style.backgroundColor = 'var(--black_board)';
    document.getElementById('board').style.backgroundColor = 'var(--black_board)';
  }

}

function setFixed(ev) {

  if (document.getElementById(ev.parentNode.dataset.idElem).classList.contains("fixed"))
    document.getElementById(ev.parentNode.dataset.idElem).classList.remove("fixed");
  else {
    document.getElementById(ev.parentNode.dataset.idElem).classList.add("fixed");
  }

  ev.parentNode.style.display = 'none';

  setPageHTML();
  creaListElements();

}

function selectAnimation(ev) {

  edited = true;

  var edit = false;
  for (var w=0; w<animationsToElement.length; w++) {
    if (animationsToElement[w].idElem == selectedId && animationsToElement[w].idAnimation == ev.dataset.idanimation) {
      animationsToElement[w].idElem = '';
      animationsToElement[w].idAnimation = '';
      animationsToElement[w].whenActive = 'load';
      ev.style.border = '1px solid rgb(200, 200, 200, .1)';
      ev.children[2].children[0].style.opacity = '0';
      ev.children[2].children[0].style.pointerEvents = 'none';
      ev.children[2].children[0].children[0].innerText = 'radio_button_unchecked';
      ev.children[2].children[0].children[2].innerText = 'radio_button_checked';
      edit = true;
      break;
    }
  }


  if (!edit) {
    animationsToElement.push({"idElem" : selectedId, "idAnimation" : ev.dataset.idanimation, "whenActive" : "load"});
    ev.style.border = '1px solid rgb(255, 255, 255, .7)';
    ev.children[2].children[0].style.opacity = '1';
    ev.children[2].children[0].style.pointerEvents = null;
    ev.children[2].children[0].children[0].innerText = 'radio_button_checked';
    ev.children[2].children[0].children[2].innerText = 'radio_button_unchecked';
  }

  // openHeadLink("animationsManager");
  console.log(animationsToElement);

}

function setWhenActive(ev) {

  if (ev.id == 'loadCheck') {
    ev.innerText = 'radio_button_checked';
    ev.parentNode.children[2].innerText = 'radio_button_unchecked';

    for (var w=0; w<animationsToElement.length; w++) {
      if (animationsToElement[w].idElem == selectedId && animationsToElement[w].idAnimation == ev.parentNode.parentNode.parentNode.dataset.idanimation) {
        animationsToElement[w].whenActive = 'load';
      }
    }

  } else {
    ev.innerText = 'radio_button_checked';
    ev.parentNode.children[0].innerText = 'radio_button_unchecked';

    for (var w=0; w<animationsToElement.length; w++) {
      if (animationsToElement[w].idElem == selectedId && animationsToElement[w].idAnimation == ev.parentNode.parentNode.parentNode.dataset.idanimation) {
        animationsToElement[w].whenActive = 'onscreen';
      }
    }

  }

}

function addAnimationStyleSheet() {

  try {document.getElementById('animationStyle').remove()} catch {}

  var sheet = document.createElement('style')
  sheet.id = 'animationStyle'

  var animationsExport = "";
  for (var w=0; w<animationsJSON.length; w++) {

    var nameAnimation = animationsJSON[w].nameAnimation;
    var prop = animationsJSON[w].prop;
    var start = animationsJSON[w].start;
    var end = animationsJSON[w].end;
    var duration = animationsJSON[w].duration;
    var delay = animationsJSON[w].delay;
    var repeat = animationsJSON[w].repeat;

    animationsExport += "." + nameAnimation + "{webkit-animation:" + nameAnimation +  " " + duration + " linear " + delay + " both; animation:" + nameAnimation +  " " + duration + " linear " + delay + " " + repeat + " both}\n"

    // start value
    var splitProp = "", splitVal = "", startValue = "";
    splitProp = prop.split("__::");
    splitVal = start.split("__::");
    for (var s=0; s<splitProp.length; s++) {
      startValue += splitProp[s] + ":" + splitVal[s] + ";";
    }
    startValue = startValue.slice(0, -1);

    // end value
    var endValue = "";
    splitProp = "";
    splitVal = "";
    splitProp = prop.split("__::");
    splitVal = end.split("__::");
    for (var s=0; s<splitProp.length; s++) {
      endValue += splitProp[s] + ":" + splitVal[s] + ";";
    }
    endValue = endValue.slice(0, -1);

    animationsExport += "@-webkit-keyframes " + nameAnimation + "{0%{" + startValue + "}100%{" + endValue + "}}@keyframes " + nameAnimation + "{0%{" + startValue + "}100%{" + endValue + "}}\n\n"

  }

  sheet.innerHTML = animationsExport;
  document.body.appendChild(sheet);

}

var doCaptured = true;
function addAnimationClasses() {

  addAnimationStyleSheet();

  for (var w=0; w<animationsToElement.length; w++) {
    if (animationsToElement[w].idElem != "" && animationsToElement[w].idElem != "deleted") {
      var classes = "";
      document.getElementById(animationsToElement[w].idElem).classList.remove(animationsToElement[w].idElem.replace(" ", ""));
      for (var e=0; e<animationsJSON.length; e++) {
        if (animationsJSON[e].idAnimation == animationsToElement[w].idAnimation) {
          var onscreen = "";
          if (animationsToElement[w].whenActive == 'onscreen') onscreen = "-onscreen";
          classes += " " + animationsJSON[e].nameAnimation + onscreen;
          // if (doCaptured) document.getElementById('captured').innerHTML = document.getElementById('board').innerHTML;
          // if (!doCaptured) startAnimation(animationsJSON[e].nameAnimation + onscreen, animationsToElement[w].idElem);
        }
      }
      document.getElementById(animationsToElement[w].idElem).className = document.getElementById(animationsToElement[w].idElem).classList[0] + " " + classes + " " + document.getElementById(animationsToElement[w].idElem).classList[document.getElementById(animationsToElement[w].idElem).classList.length - 1];
      document.getElementById(animationsToElement[w].idElem).classList.add(animationsToElement[w].idElem.replace(" ", ""));
    }
  }

  doCaptured = true;

  console.log(animationsJSON);
  console.log(animationsToElement);

}

function removeAnimationClasses() {

  for (var w=0; w<animationsToElement.length; w++) {
    if (animationsToElement[w].idElem != "" && animationsToElement[w].idElem != "deleted") {
      for (var e=0; e<animationsJSON.length; e++) {
        if (animationsJSON[e].idAnimation == animationsToElement[w].idAnimation) {
          document.getElementById(animationsToElement[w].idElem).className = document.getElementById(animationsToElement[w].idElem).classList[0] + " " + document.getElementById(animationsToElement[w].idElem).classList[document.getElementById(animationsToElement[w].idElem).classList.length - 1];
        }
      }
    }
  }

}

function scrollAnimations() {

  var elements = document.getElementsByTagName('*');
  for (var w=0; w<elements.length; w++) {
    if (elements[w].className.includes("-onscreen") && isScrolledIntoView(elements[w])) {
      elements[w].className = elements[w].className.replaceAll("-onscreen", "");
    }
  }

}

function isScrolledIntoView(elem)
{
  	var position = elem.getBoundingClientRect();

    if(position.top < window.innerHeight && position.bottom >= 0) {
  		return true;
  	}
}

function creaJSONAnimation() {
  animationsJSON = [];
  animationsJSON.push({"idAnimation" : 0, "nameAnimation" : "fade-in", "prop" : "opacity", "start" : "0", "end" : "1", "duration" : ".4s", "delay" : "0s", "repeat" : ""});
  animationsJSON.push({"idAnimation" : 1, "nameAnimation" : "blur-in", "prop" : "filter", "start" : "blur(6px)", "end" : "blur(0)", "duration" : ".4s", "delay" : "0s", "repeat" : ""});
  animationsJSON.push({"idAnimation" : 2, "nameAnimation" : "slide-right", "prop" : "opacity__::transform", "start" : "0__::translateX(-150px)", "end" : "1__::translateX(0)", "duration" : ".4s", "delay" : "0s", "repeat" : ""});
  animationsJSON.push({"idAnimation" : 3, "nameAnimation" : "slide-left", "prop" : "opacity__::transform", "start" : "0__::translateX(150px)", "end" : "1__::translateX(0)", "duration" : ".4s", "delay" : "0s", "repeat" : ""});
  animationsJSON.push({"idAnimation" : 4, "nameAnimation" : "slide-bottom", "prop" : "opacity__::transform", "start" : "0__::translateY(150px)", "end" : "1__::translateY(0)", "duration" : ".4s", "delay" : "0s", "repeat" : ""});
  animationsJSON.push({"idAnimation" : 5, "nameAnimation" : "slide-top", "prop" : "opacity__::transform", "start" : "0__::translateY(-150px)", "end" : "1__::translateY(0)", "duration" : ".4s", "delay" : "0s", "repeat" : ""});
  animationsJSON.push({"idAnimation" : 6, "nameAnimation" : "scale-out", "prop" : "opacity__::transform", "start" : "0__::scale(.5)", "end" : "1__::scale(1)", "duration" : ".4s", "delay" : "0s", "repeat" : ""});
  animationsJSON.push({"idAnimation" : 7, "nameAnimation" : "scale-in", "prop" : "opacity__::transform", "start" : "0__::scale(2)", "end" : "1__::scale(1)", "duration" : ".4s", "delay" : "0s", "repeat" : ""});
  animationsJSON.push({"idAnimation" : 8, "nameAnimation" : "ping", "prop" : "transform", "start" : "translateY(-15px)", "end" : "translateY(0)", "duration" : ".4s", "delay" : "0s", "repeat" : "infinte"});
}
