//SETTINGS VARIABE
var projectName = 'Untitled';
var author = 'none';
var keywords = '';
var description = '';
var incorporatesCSS = false;

var saveAlert = true;

function newProject() {

  location.href = "editor.php?event=new";

}

function closeProject() {
  localStorage.removeItem("testo");
  localStorage.removeItem("projectId");
  location.href = "dashboard.php";
}

var exportJSON = [];
var arrImages = [];
var totImages = 1;

function exportProject() {

  imgData = [];

  openHeadLink("loading");

  switchMode('switchPc');
  clickBoard();

  //STYLE THEME
  var cssText = "", cssTextExport = "";
  var classes = document.getElementById(styleName).sheet.cssRules;
  for (var x = 0; x < classes.length; x++) {
    cssText = classes[x].cssText || classes[x].style.cssText + '\n';

    if (cssText.split('{')[0].includes('-plater')) {
      cssTextExport += classes[x].cssText || classes[x].style.cssText;
    }

  }

  cssTextExport = cssTextExport.replaceAll("; ", ";\n  ").replaceAll("{ ", "\n{\n  ").replaceAll("  }", "}\n\n");

  for (var i=0; i<colorPalette.length; i++) {
    cssTextExport = cssTextExport.replaceAll(colorPalette[i].color.replace(", 1)", ")"), "var(--" + colorPalette[i].colorName + ")");
    cssTextExport = cssTextExport.replaceAll(colorPalette[i].color.replace("rgb", "rgba"), "var(--" + colorPalette[i].colorName + ")");
  }

  var classes = document.getElementsByClassName(styleName)[1].sheet.cssRules;
  var cssFont = "";
  for (var x = 0; x < classes.length; x++) {
    cssText = classes[x].cssText || classes[x].style.cssText;
    cssFont += cssText + '\n';
  }

  var cssVariables = "";
  // color palette variables
  cssVariables += '/* Global Variables */\n:root {\n';
  for (var i=0; i<colorPalette.length; i++) {
    cssVariables += '  --' + colorPalette[i].colorName + ': ' + colorPalette[i].color + ';\n';
  }
  cssVariables += '}';

  cssTextExport = cssFont + '\n' + cssVariables + '\n\n' + cssTextExport;

  for (var x=0; x<pagesJSON.length; x++) {

    if (pagesJSON[x].name.replace("OFF__::", "") == 'deleted') continue;

    document.getElementById('captured').innerHTML = pagesJSON[x].html;
    addAnimationClasses();
    exportIterator(pagesJSON[x].name.replace("OFF__::", ""), pagesJSON[x].type);
  }
  document.getElementById('captured').innerHTML = '';

  //SCRIPT
  var scriptJs;
  var clientScriptJs = new XMLHttpRequest();
  clientScriptJs.open('GET', './js/scriptForExport.js');
  clientScriptJs.setRequestHeader("Cache-Control", "no-cache");
  clientScriptJs.onload = function() {
    scriptJs = clientScriptJs.responseText;
  }
  clientScriptJs.send();

  //JQUERY
  var scriptJQuery;
  var clientScriptJQuery = new XMLHttpRequest();
  clientScriptJQuery.open('GET', './js/jquery.min.js');
  clientScriptJQuery.setRequestHeader("Cache-Control", "no-cache");
  clientScriptJQuery.onload = function() {
    scriptJQuery = clientScriptJQuery.responseText;
  }
  clientScriptJQuery.send();

  //CREATE ZIP

  var zip = new JSZip();

  var styleElementsCss = "";

  styleElementsCss += 'html {\n  scroll-behavior: smooth;\n}\n\n';

  styleElementsCss += 'body {\n  margin: 0;\n  outline: none;\n  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);\n  -webkit-tap-highlight-color: transparent;\n}\n\n';

  styleElementsCss += '.sectionClass {\n  display: flex;\n  flex-grow: 1;\n  overflow: hidden;\n}\n\n'

  styleElementsCss += '.sectionClass > div {\n  width: 100%;\n  display: flex;\n  justify-content:space-between;\n  flex-wrap: wrap;\n}\n\n'

  styleElementsCss += '.rowClass {\n  display: flex;\n  justify-content:space-between;\n  flex-wrap: wrap;\n}\n\n'

  styleElementsCss += 'b, i, u, strike {\n  pointer-events: none;\n}\n\n'

  styleElementsCss += '.includes {\n  width: 100%;\n}\n\n'

  styleElementsCss += '.fixed {\n  position: fixed;\n  top: 0;\n  z-index: 1000;\n}\n\n'

  var pageName = "";
  for (var x=0; x<exportJSON.length; x++) {

    if (exportJSON[x].type == 'main') pageName = "index.html";
    else if (exportJSON[x].type == '' || exportJSON[x].type == null) pageName = exportJSON[x].name + ".html";

    styleElementsCss += '/* PAGE: ' + exportJSON[x].name.toUpperCase() + ' */\n\n';
    styleElementsCss += exportJSON[x].styleElementsCss;

    zip.file(pageName, exportJSON[x].index);
  }

  // animations
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

  zip.file("themeStyle.css", cssTextExport);
  if (animationsExport != "") zip.file("animations.css", animationsExport);
  if (!incorporatesCSS) zip.file(projectName + ".css", styleElementsCss);
  // var img = zip.folder("images");

  for (var f=0; f<arrImages.length; f++) {

    // console.log(arrImages[f].split('__,')[1] + '   ' + arrImages[f].split('__,')[0]);

  }

  for (var f=0; f<imageToUrl.length; f++) {

    toDataURL(imageToUrl[f].url, imageToUrl[f].filename);

  }


  let timerImage = setInterval(function(){
    // if (imgData != null && scriptJs != null) {
    // console.log(imageToUrl.length + '   ' + imgData.length);

    if (scriptJs != null && scriptJQuery != null && imgData.length == imageToUrl.length) {

      clearInterval(timerImage);

      zip.file("js/script.js", scriptJs);
      zip.file("js/jquery.min.js", scriptJQuery);

      for (var a=0; a<imgData.length; a++) {
        zip.file("image/" + imgData[a].num, imgData[a].base64, {base64: true});
      }

      zip.generateAsync({type:"blob"})
      .then(function(content) {

          saveAs(content, projectName + ".zip");
          alertFun("Project exported successfully", "green");
          openHeadLink("loading");
      });
    }
  }, 100);

} //end function export

//iterator export
function exportIterator(pageName, pageType) {

  //IMAGES

  var boardElems = document.getElementById('captured').getElementsByTagName('*');
  for (var b=0; b<boardElems.length; b++) {
    var image = window.getComputedStyle(boardElems[b]).getPropertyValue("background-image");
    if (image.includes("blob:")) {
      arrImages.push(totImages + '__,' + image.split('"')[1]);
      totImages ++;
    }
  }

  //STYLE ELEMENTS

  var styleElementsCss = "";

  if (incorporatesCSS) {
    styleElementsCss += 'body {\n  margin: 0;\n  outline: none;\n  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);\n  -webkit-tap-highlight-color: transparent;\n}\n\n';

    styleElementsCss += '.sectionClass {\n  display: flex;\n  flex-grow: 1;\n  overflow: hidden;\n}\n\n'

    styleElementsCss += '.sectionClass > div {\n  width: 100%;\n  display: flex;\n  justify-content:space-between;\n  flex-wrap: wrap;\n}\n\n'

    styleElementsCss += '.rowClass {\n  display: flex;\n  justify-content:space-between;\n  flex-wrap: wrap;\n}\n\n'

    styleElementsCss += 'b, i, u, strike {\n  pointer-events: none;\n}\n\n'

    styleElementsCss += '.includes {\n  width: 100%;\n}\n\n'
  }

  var cssText = "", arrElem = []; cssElemExport = "";
  var classes = document.getElementById(styleName).sheet.cssRules;
  for (var x = 0; x < classes.length; x++) {
    cssText = classes[x].cssText || classes[x].style.cssText + '\n';

    for (var f=0; f<imageToUrl.length; f++) {
      // console.log(cssText);
      cssText = cssText.replace(imageToUrl[f].url, "image/" + imageToUrl[f].filename);
    }

    if (!cssText.split('{')[0].includes('-plater')) {
      arrElem.push(cssText);
      // alert(cssText);
    }

  }
  // console.log(arrElem);
  //ordino class

  var arrHtmlElements = [], arrElemOrder = [];
  var boardElems = document.getElementById('captured').getElementsByTagName('*');
  for (var l=0; l<boardElems.length; l++) {
    if (boardElems[l].id.includes("Button ") || boardElems[l].id.includes("Container ") || boardElems[l].id.includes("Image ") || boardElems[l].id.includes("Menu ") || boardElems[l].id.includes("Menu ") || boardElems[l].id.includes("Link ") || boardElems[l].id.includes("Text ") || boardElems[l].id.includes("MaterialIcon ") || boardElems[l].id.includes("InputBox ") || boardElems[l].id.includes("Textarea ") || boardElems[l].id.includes("Section ") || boardElems[l].id.includes("Row ")) {
      arrHtmlElements.push(boardElems[l].id.replace(" ", ""));
    }
  }

  var y=arrHtmlElements.length - 1;
  while(y != -1) {
    for (var g=0; g<arrElem.length; g++) {
      if (arrElem[g].includes(arrHtmlElements[y])) {
        arrElemOrder.push(arrElem[g]);
      }
    }
    y--;
  }

  arrElem = arrElemOrder;

  // console.log(arrElem);

  var length = arrElem.length, i = arrElem.length - 1, stringa = "", nameSection = "";

  var stringaOuter = "";

  while (i != -1) {

    if (!arrElem[i].includes("-mobile")) {

      for (var a=0; a<nameElementsJson.length; a++) {

        idElem = arrElem[i].split("{")[0].trim().replace(".", "");

        idElemSpace = arrElem[i].split("{")[0].trim().replace(".", "");
        var num = idElemSpace.match(/(\d+)/)[0];
        name = idElemSpace.replace(num, "");
        idElemSpace = name + ' ' + num;

        try {
        if (idElemSpace.includes("Section ")) {
          for (var q=0; q<nameElementsJson.length; q++) {
            if (nameElementsJson[q].id == idElemSpace) {
              nameSection = "/* Section Name: " + nameElementsJson[q].name + " */\n\n";
            }
          }
        } else {
          nameSection = '';
        }
      } catch {}

        if (nameElementsJson[a].id.replace(" ", "") == idElem) {
          stringaPc = arrElem[i];
          stringa = '@media (max-width: 600px) { ';

          for (var f=0; f<arrElem.length; f++) {
            val = arrElem[f].split("{")[0].replace(".", "").trim();
            if (val.split("{")[0].split("-")[0] == idElem && val.includes('-mobile') && !val.includes('-outer')) {
              stringa += arrElem[f].replace("-mobile", "");
              break;
            }
          }

          stringa += '}';

          var splitStringPc = stringaPc.replaceAll('{ ', '\n').replaceAll('; ', '\n').replaceAll('}', "").split("\n");
          var splitStringMobile = stringa.replaceAll('{ ', '\n').replaceAll('; ', '\n').replaceAll('@media (max-width: 600px) {\n', "").replaceAll('}', "").split("\n");

          stringa = stringa.replaceAll(";", ";\n   ").replaceAll("{", "{\n ").replaceAll("{\n", "{\n  ").replaceAll(") {\n  ", ") {\n").replaceAll("      }", "    }");

          for (var x=1; x<splitStringMobile.length; x++) {
            for (var y=1; y<splitStringMobile.length; y++) {

              if (splitStringPc[x] == splitStringMobile[y]) {
                if (splitStringPc[x] != '') stringa = stringa.replace('\n    ' + splitStringPc[x] + ';', "");
              }
            }
          }

          // cssElemExport += stringaPc + stringa.replaceAll(";", ";\n    ").replaceAll("{", "{\n ").replaceAll("{\n", "{\n    ");
          cssElemExportTmp = nameSection + stringaPc.replaceAll("  }", "}") + stringa;
          cssElemExportTmp = cssElemExportTmp.replaceAll("}", "}\n\n").replaceAll("; ", ";\n  ").replaceAll("{ ", "{\n  ").replaceAll("}\n\n@", "} @").replaceAll("}\n\n}", "}\n}").replaceAll("  }", "}").replaceAll("   }", "     }");
          cssElemExport += cssElemExportTmp;

          var stringaOuterPc = "", stringaOuterMobile = "";

          if (!nameElementsJson[a].id.includes("Row ") && !nameElementsJson[a].id.includes("Section ")) {

            for (var f=0; f<arrElem.length; f++) {
              val = arrElem[f].split("{")[0].replace(".", "").trim();
              if (val.split("{")[0].split("-")[0] == idElem && val.includes('-outer') && !val.includes('-mobile')) {
                stringaOuterPc += arrElem[f].replace('{ ', '{');
                break;
              }
            }

            stringaOuterMobile += '@media (max-width: 600px) { ';

            for (var f=0; f<arrElem.length; f++) {
              val = arrElem[f].split("{")[0].replace(".", "").trim();
              if (val.split("{")[0].split("-")[0] == idElem && val.includes('-outer-mobile')) {
                stringaOuterMobile += arrElem[f].replace("-mobile", "");
                break;
              }
            }

            stringaOuterMobile += '}';

            stringaOuterTmp = 'togli spazio' + stringaOuterPc + stringaOuterMobile;
            stringaOuterTmp = stringaOuterTmp.replaceAll(" {", " {\n   ").replaceAll("   .", " .").replaceAll("}", "\n}\n\n").replaceAll("; \n}\n\n@", ";\n} @").replaceAll("; \n}\n\n", ";\n  }");

            stringaOuter = stringaOuterTmp;

            var splitStringPc = stringaOuter.split("@media (max-width: 600px) {")[0].replaceAll("}", "").split('\n');
            var splitStringMobile = stringaOuter.split("@media (max-width: 600px) {\n")[1].replaceAll("}", "").split('\n');

            for (var x=1; x<splitStringMobile.length; x++) {
              for (var y=1; y<splitStringMobile.length; y++) {

                try {
                  if (splitStringPc[x].trim() == splitStringMobile[y].trim()) {
                    if (splitStringPc[x].trim() != '') stringaOuter = stringaOuter.replaceAll('\n    ' + splitStringPc[x].trim(), "");
                  }
                } catch {}
              }
            }

            cssElemExport += stringaOuter;
          }
        }
      }

    }
    i--;
  }


  styleElementsCss += cssElemExport.replaceAll("\ntogli spazio", ""); //.replaceAll("{\n   ", "{\n  ")


  //INDEX

  var divsEmpty = document.getElementsByClassName('emptySection');

  for (var s=divsEmpty.length-1; s>=0; s--) {
    divsEmpty[s].remove();
  }

  var pageLink = "";
  //link
  for (var w=0; w<linksJSON.length; w++) {

    if (linksJSON[w].elem == '') continue;

    try {

      pageLink = linksJSON[w].link;

      for (var q=0; q<pagesJSON.length; q++) {
        if (pagesJSON[q].name.replace("OFF__::", "") == 'deleted') continue;
        if (pagesJSON[q].name.replace("OFF__::", "") + '.html' == pageLink && pagesJSON[q].type == 'main') pageLink = "index.html"
      }

      if (linksJSON[w].type == 'new tab_false') document.getElementById(linksJSON[w].elem).setAttribute("onclick", "location.href='" + pageLink + "';");
      if (linksJSON[w].type == 'new tab_true') document.getElementById(linksJSON[w].elem).setAttribute("onclick", "window.open('" + pageLink + "', '_blank');");
      if (linksJSON[w].type == 'page') document.getElementById(linksJSON[w].elem).setAttribute("onclick", "location.href='" + pageLink + "';");
      if (linksJSON[w].type == 'element') document.getElementById(linksJSON[w].elem).setAttribute("onclick", "document.getElementsByClassName('" + pageLink + "')[0].scrollIntoView({behavior: 'smooth'});");
    } catch {}

  }
  //end link

  var elementsBoard = document.getElementById('captured').getElementsByTagName('*');
  for (var i=0; i<elementsBoard.length; i++) {

    try {
      if (elementsBoard[i].id == '' && (elementsBoard[i].children[0].className.includes("Button") || elementsBoard[i].children[0].className.includes("Container") || elementsBoard[i].children[0].className.includes("Image") || elementsBoard[i].children[0].className.includes("Menu") || elementsBoard[i].children[0].className.includes("Link") || elementsBoard[i].children[0].className.includes("Text") || elementsBoard[i].children[0].className.includes("MaterialIcon") || elementsBoard[i].children[0].className.includes("InputBox") || elementsBoard[i].children[0].className.includes("Textarea"))) {
        elementsBoard[i].style.pointerEvents = null;
      }

      if (elementsBoard[i].id == '' && elementsBoard[i].parentNode.id.includes("Section")) {
        elementsBoard[i].style.pointerEvents = null;
        elementsBoard[i].className = '';
      }
    } catch {}

    if (elementsBoard[i].className.includes("Button") || elementsBoard[i].className.includes("Container") || elementsBoard[i].className.includes("Image") || elementsBoard[i].className.includes("Menu") || elementsBoard[i].className.includes("Link") || elementsBoard[i].className.includes("Text") || elementsBoard[i].className.includes("MaterialIcon") || elementsBoard[i].className.includes("InputBox") || elementsBoard[i].className.includes("Textarea")) {
      elementsBoard[i].removeAttribute("style");
    }

    if (elementsBoard[i].id.includes("Section ")) {
      elementsBoard[i].style.width = null;
      elementsBoard[i].style.height = null;
      elementsBoard[i].style.display = null;
      elementsBoard[i].style.outline = null;

    }
    if (elementsBoard[i].id.includes("Row ")) {
      elementsBoard[i].style.width = null;
      elementsBoard[i].style.display = null;
      elementsBoard[i].removeAttribute('id');
      elementsBoard[i].removeAttribute('style');
    }

  }

  //tolgo id
  for (var i=0; i<elementsBoard.length; i++) {
    if (elementsBoard[i].id.includes("Button ") || elementsBoard[i].id.includes("Container ") || elementsBoard[i].id.includes("Image ") || elementsBoard[i].id.includes("Menu ") || elementsBoard[i].id.includes("Link ") || elementsBoard[i].id.includes("Text ") || elementsBoard[i].id.includes("MaterialIcon ") || elementsBoard[i].id.includes("InputBox ") || elementsBoard[i].id.includes("Textarea ") || elementsBoard[i].className.includes("Section") || elementsBoard[i].className.includes("Row")) {
      elementsBoard[i].id = '';
      elementsBoard[i].classList.remove("scale-up-center");
    }
  }

  var index, htmlCode;
  index = '<html>\n<head>\n\n';

  index += '  <title>' + pageName + '</title>\n\n'
  index += '  <meta charset="utf-8"/>\n'
  index += '  <meta name="author" content="' + author + '">\n'
  index += '  <meta name="keywords" content="' + keywords + '">\n'
  index += '  <meta name="description" content="' + description + '">\n'
  index += '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n'

  index += '\n  <!-- Include FILES --> \n';
  index += '  <link rel="stylesheet" href="./animations.css"> \n';
  index += '  <link rel="stylesheet" href="./themeStyle.css"> \n';
  if (!incorporatesCSS) index += '  <link rel="stylesheet" href="./' + projectName + '.css"> \n';
  index += '  <script src="./js/jquery.min.js"></script> \n';
  index += '  <script src="./js/script.js"></script> \n\n';

  if (incorporatesCSS) {
    index += '  <style> \n\n';

    var styleSplit = styleElementsCss.split('\n'), tempString = "";
    for (var b=0; b<styleSplit.length - 1; b++) {
      tempString += '    ' + styleSplit[b] + '\n';
    }
    index += tempString;
    index += '  </style> \n\n';
  }

  addAnimationClasses();

  index += '</head>\n<body>\n\n'
  htmlCode = '<main>\n' + document.getElementById('captured').innerHTML.trim() + '\n</main>';
  index += process(htmlCode).trim();
  index += '\n\n</body>\n</html>\n'

  //remove empty class and id and style
  index = index.replaceAll(' class=""', '');
  index = index.replaceAll(' id=""', '');
  index = index.replaceAll(' style=""', '');

  for (var i=0; i<elementsBoard.length; i++) {

    try {

      if (!elementsBoard[i].className.includes("-outer") && (elementsBoard[i].className.includes("Button") || elementsBoard[i].className.includes("Container") || elementsBoard[i].className.includes("Image") || elementsBoard[i].className.includes("Menu") || elementsBoard[i].className.includes("Link") || elementsBoard[i].className.includes("Text") || elementsBoard[i].className.includes("MaterialIcon") || elementsBoard[i].className.includes("InputBox") || elementsBoard[i].className.includes("Textarea") || elementsBoard[i].className.includes("Section") || elementsBoard[i].className.includes("Row"))) {
        var num = elementsBoard[i].className.split(" ")[1].match(/(\d+)/)[0];
        var tag = elementsBoard[i].className.split(" ")[1].replace(num, '');
        elementsBoard[i].id = tag + ' ' + num;
        elementsBoard[i].style.pointerEvents = 'auto';
      }

      if (elementsBoard[i].className.includes("-outer") && (elementsBoard[i].className.includes("Button") || elementsBoard[i].className.includes("Container") || elementsBoard[i].className.includes("Image") || elementsBoard[i].className.includes("Menu") || elementsBoard[i].className.includes("Menu") || elementsBoard[i].className.includes("Link") || elementsBoard[i].className.includes("Text") || elementsBoard[i].className.includes("MaterialIcon") || elementsBoard[i].className.includes("InputBox") || elementsBoard[i].className.includes("Textarea") || elementsBoard[i].className.includes("Section") || elementsBoard[i].className.includes("Row"))) {
        var num = elementsBoard[i].className.replace("-outer", "").match(/(\d+)/)[0];
        var tag = elementsBoard[i].className.replace("-outer", "").replace(num, '');
        elementsBoard[i].id = tag + ' ' + num + '-outer';
      }

      if (elementsBoard[i].id == '' && (elementsBoard[i].children[0].className.includes("Button") || elementsBoard[i].children[0].className.includes("Container") || elementsBoard[i].children[0].className.includes("Image") || elementsBoard[i].children[0].className.includes("Menu") || elementsBoard[i].children[0].className.includes("Link") || elementsBoard[i].children[0].className.includes("Text") || elementsBoard[i].children[0].className.includes("MaterialIcon") || elementsBoard[i].children[0].className.includes("InputBox") || elementsBoard[i].children[0].className.includes("Textarea"))) {
        elementsBoard[i].style.pointerEvents = 'none';
      }
      if (elementsBoard[i].id == '' && (elementsBoard[i].parentNode.id.includes("Section"))) {
        elementsBoard[i].style.pointerEvents = 'none';
        elementsBoard[i].className = 'divSection';
      }
    } catch {}

    if (elementsBoard[i].id.includes("Section ")) {
      elementsBoard[i].style.position = null;
      elementsBoard[i].style.verticalAlign = null;
      // elementsBoard[i].classList.toggle('sectionClass');
    }
    if (elementsBoard[i].id.includes("Row ")) {
      elementsBoard[i].style.position = null;
      elementsBoard[i].style.fontSize = null;
      // elementsBoard[i].classList.toggle('rowClass');
    }

  }

  var rowsClasses = document.getElementsByClassName("rowClass");
  for (var d=0; d<rowsClasses.length; d++) {
    rowsClasses[d].id = 'Row ' + parseInt(d + 1);
  }

  //remove link
  for (var w=0; w<linksJSON.length; w++) {
    if (linksJSON[w].elem == '') continue;

    try {
      document.getElementById(linksJSON[w].elem).removeAttribute("onclick");
    } catch {}

  }
  //end remove link

  removeAnimationClasses();

  emptySection();

  for (var z=0; z<nameElementsJson.length; z++) {

    styleElementsCss = styleElementsCss.replaceAll('.' + nameElementsJson[z].id.replace(" ", "") + ' {', '.' + nameElementsJson[z].name + ' {');
    styleElementsCss = styleElementsCss.replaceAll('.' + nameElementsJson[z].id.replace(" ", "") + '-outer {', '.' + nameElementsJson[z].name + '-outer {');

    for (var i=0; i<colorPalette.length; i++) {
      styleElementsCss = styleElementsCss.replaceAll(colorPalette[i].color.replace(", 1)", ")"), "var(--" + colorPalette[i].colorName + ")");
    }

    //quando incorporates CSS
    index = index.replaceAll('.' + nameElementsJson[z].id.replace(" ", "") + ' {', '.' + nameElementsJson[z].name + ' {');
    index = index.replaceAll('.' + nameElementsJson[z].id.replace(" ", "") + '-outer {', '.' + nameElementsJson[z].name + '-outer {');

    index = index.replaceAll(' ' + nameElementsJson[z].id.replace(" ", "") + '"', ' ' + nameElementsJson[z].name + '"');
    index = index.replaceAll(nameElementsJson[z].id.replace(" ", "") + '-outer"', nameElementsJson[z].name + '-outer"');
    index = index.replaceAll('id="' + nameElementsJson[z].id + '"', 'id="' + nameElementsJson[z].name + '"');

  }

  exportJSON.push({"name" : pageName, "type": pageType, "index": index, "styleElementsCss": styleElementsCss});

//   console.log(index);
//   console.log(styleElementsCss);
//   openHeadLink("loading");
// return;

}

var imgData = [];

//FUNTIONS INDENTATION HTML CODE

function process(str) {
  var div = document.createElement('div');
  div.innerHTML = str.trim();
  //INCLUDES

  var boardElems = div.getElementsByTagName('*');
  for (var b=0; b<boardElems.length; b++) {
    if (boardElems[b].parentNode.id.includes("Includes ")) {
      boardElems[b].parentNode.className = "includes";
      boardElems[b].parentNode.removeAttribute('id');
      boardElems[b].parentNode.removeAttribute('style');

      if (boardElems[b].classList.contains("fixed")) boardElems[b].parentNode.classList.add("fixed");

      var datasetInclude = boardElems[b].dataset.include;

      for (var k=0; k<pagesJSON.length; k++) {
        if (pagesJSON[k].name.replace("OFF__::", "") == 'deleted') continue;
        if (pagesJSON[k].name.replace("OFF__::", "") == datasetInclude && pagesJSON[k].type == 'main') datasetInclude = 'index'
      }

      boardElems[b].parentNode.dataset.include = datasetInclude;

      boardElems[b].parentNode.innerHTML = "";
    }
  }

  // console.log(div);


  return format(div, 0).innerHTML;
}

function format(node, level) {
  var indentBefore = new Array(level++ + 1).join('  '),
    indentAfter = new Array(level - 1).join('  '),
    textNode;

  for (var i = 0; i < node.children.length; i++) {
    textNode = document.createTextNode('\n' + indentBefore);
    node.insertBefore(textNode, node.children[i]);

    format(node.children[i], level);

    if (node.lastElementChild == node.children[i]) {
      textNode = document.createTextNode('\n' + indentAfter);
      node.appendChild(textNode);
    }
  }

  return node;
}

//END FUNCTIONS INDENTATION HTML CODE

function toDataURL(url, num) {
  var reader = new FileReader();
  reader.onload = function() {
      var dataUrl = reader.result;
      imgData.push({"num" : num, "base64" : dataUrl.split(',')[1]});
  };

  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      reader.readAsDataURL(blob);
  });
}


function downloadProject() {

      var userInput = saveFileInVar();

      var blob = new Blob([userInput], { type: "plt/plain;charset=utf-8" });
      saveAs(blob, projectName + ".plt");

      alertFun("Project downloaded successfully", "green");


}

function saveFileInVar() {

  selectedIdTemp = selectedId;

  clickBoard();
  setPageHTML();

  var toggle = false;

  if (displayMode != 'computer') {
    toggleMobileClass();
    toggle = true;
  }

  displayMode = 'computer';

  var outerDiv = document.getElementsByClassName("outerDiv");
  for (var k=0; k<outerDiv.length; k++) {
    outerDiv[k].classList.remove("outerDiv-mobile");
  }

  //css elements

  var cssText = "", cssElements = "";
  var classes = document.getElementById(styleName).sheet.cssRules;
  for (var x = 0; x < classes.length; x++) {
    cssText = classes[x].cssText || classes[x].style.cssText;

    if (!cssText.split('{')[0].includes('-plater')) {
      cssElements += classes[x].cssText || classes[x].style.cssText;
    }

  }

  //font imports

  var classes = document.getElementsByClassName(styleName)[1].sheet.cssRules;
  var cssFont = "";
  for (var x = 0; x < classes.length; x++) {
    cssText = classes[x].cssText || classes[x].style.cssText;
    cssFont += cssText + '\n';
  }

  // style elements

  var cssText = "", styleElements = "";
  var classes = document.getElementById(styleName).sheet.cssRules;
  for (var x = 0; x < classes.length; x++) {
    cssText = classes[x].cssText || classes[x].style.cssText + '\n';

    if (cssText.split('{')[0].includes('-plater')) {
      styleElements += classes[x].cssText || classes[x].style.cssText;
    }

  }

  styleElements = styleElements.replaceAll("; ", ";\n  ").replaceAll("{ ", "\n{\n  ").replaceAll("  }", "}\n\n");

  // color imports

  var colorImports = "";
  // color palette variables
  colorImports += '/* Global Variables */\n:root {\n';
  for (var i=0; i<colorPalette.length; i++) {
    colorImports += '  --' + colorPalette[i].colorName + ': ' + colorPalette[i].color + ';\n';
  }
  colorImports += '}';

  // html elements
  clickBoard();
  htmlCode = document.getElementById('board').innerHTML.trim();

  htmlCode = htmlCode.replaceAll("à", "___agrave___");
  htmlCode = htmlCode.replaceAll("è", "___egrave___");
  htmlCode = htmlCode.replaceAll("ì", "___igrave___");
  htmlCode = htmlCode.replaceAll("ò", "___ograve___");
  htmlCode = htmlCode.replaceAll("ù", "___ugrave___");

  for (var y=0; y<imageToUrl.length; y++) {
    if (imageToUrl[y].url != '' && imageToUrl[y].url != null && imageToUrl[y].urlTemp != '' && imageToUrl[y].urlTemp != null) cssElements = cssElements.replaceAll(imageToUrl[y].url, imageToUrl[y].urlTemp);
  }

  if (toggle) {
    toggleMobileClass();
    displayMode = 'mobile';
    var outerDiv = document.getElementsByClassName("outerDiv");
    for (var k=0; k<outerDiv.length; k++) {
      outerDiv[k].classList.add("outerDiv-mobile");
    }
  }

      var my_json = {
        projectName: projectName,
        author: author,
        keywords: keywords,
        description: description,
        incorporatesCSS: incorporatesCSS,
        cssElements: cssElements,
        fontImports: cssFont,
        colorImports: colorImports,
        styleElements: styleElements,
        htmlCode: htmlCode,
        lastSection: selectedIdTemp,
        totButtons: totButtons,
        totDiv: totDiv,
        totIncludes: totIncludes,
        totImages: totImages,
        totMenus: totMenus,
        totA: totA,
        totP: totP,
        totLabel: totLabel,
        totSpan: totSpan,
        totInput: totInput,
        totTextarea: totTextarea,
        totSections: totSections,
        totRows: totRows,
        jsonElems: JSON.stringify(nameElementsJson),
        elemState: JSON.stringify(elemState),
        imageToUrl: JSON.stringify(imageToUrl),
        pagesJSON: JSON.stringify(pagesJSON),
        colorToElement: JSON.stringify(colorToElement),
        currentPage: currentPage,
        currentPageID: currentPageID,
        linksJSON: JSON.stringify(linksJSON),
        animationsJSON: JSON.stringify(animationsJSON),
        animationsToElement: JSON.stringify(animationsToElement)
      };

      if (selectedIdTemp) document.getElementById(selectedIdTemp).click();

      return JSON.stringify(my_json);

}

function openLocalProject(event, thisEvent) {

  openFile(thisEvent.files[0]);

}

function openFile(file) {
  var fr=new FileReader();
  fr.onload=function(){

    testo = fr.result;

    // var obj = JSON.parse(testo);
    //
    // var elemSplit = obj.cssElements.split(";");
    // for (var a=0; a<elemSplit.length; a++) {
    //   if (elemSplit[a].includes("background-image")) {
    //
    //     var b64Data = elemSplit[a].split(":")[1].replace('url("', "").replaceAll('")', "").trim();
    //
    //     const blob = b64toBlob(b64Data, 'blob');
    //     const blobUrl = URL.createObjectURL(blob);
    //
    //     obj.cssElements = obj.cssElements.replaceAll(b64Data, blobUrl);
    //
    //   }
    // }
    //
    // testo = JSON.stringify(obj);

    // console.log(testo);
    // return;

    localStorage.setItem("testo", testo);
    localStorage.setItem("projectId", '0');

    location.href = "editor.php?event=open";

    document.getElementById('drop_zone').style.backgroundColor = null;
    document.getElementById('drop_zone').style.outline = null;
    document.getElementById('drop_zone').style.outlineOffset = null;
    document.getElementById('drop_zone').style.display = 'none';
    document.getElementById('drop_zone_inner').style.display = 'none';

  }

  fr.readAsBinaryString(file);

}

function dropHandler(ev) {
  ev.preventDefault();
  var file = ev.dataTransfer.items[0].getAsFile();
  if (file.name.includes(".plt")) {
    document.getElementById('drop_zone_inner').children[0].innerText = 'check_circle_outline';
    document.getElementById('drop_zone_inner').children[1].innerText = 'File dropped succesfully!';
    document.getElementById('drop_zone_inner').classList.add("popup");
    openFile(file);
  }
  else dragLeaveHandler(ev);
}

function dragOverHandler(ev) {
  ev.preventDefault();
  document.getElementById('drop_zone').style.backgroundColor = 'var(--primary)';
  document.getElementById('drop_zone').style.outline = '3px dashed #112440';
  document.getElementById('drop_zone').style.outlineOffset = '-15px';
  document.getElementById('drop_zone_inner').style.display = 'block';
}

function dragLeaveHandler(ev) {
  ev.preventDefault();
  document.getElementById('drop_zone').style.backgroundColor = null;
  document.getElementById('drop_zone').style.outline = null;
  document.getElementById('drop_zone').style.outlineOffset = null;
  document.getElementById('drop_zone').style.display = 'none';
  document.getElementById('drop_zone_inner').style.display = 'none';
}

document.addEventListener('dragover', function(e) {
  try {document.getElementById('drop_zone').style.display = 'block';} catch {}
});

function saveProject() {

  clickBoard();

  document.getElementById('captured').style.display = 'block';
  document.getElementById('captured').innerHTML = document.getElementById('board').innerHTML;

  let div = document.getElementById('captured');

  html2canvas(div, {allowTaint: true}).then(
    function (canvas) {
      try {
          canvas.toBlob((blob) => {
          var filename = 'THUMBNAIL__project' + projectId + '.jpg';
          var fileSend = new File([blob], 'THUMBNAIL__project' + projectId + '.jpg', { type: "image/jpeg" });

          var formData= new FormData();

          formData.append('file', fileSend, filename);
          var xhttp = new XMLHttpRequest();

          xhttp.open("POST", "upload.php", true);
          xhttp.send(formData);

          document.getElementById('captured').innerHTML = '';
          document.getElementById('captured').style.display = 'none';
          emptySection();

        }, 'image/jpeg');
      } catch {
        document.getElementById('captured').innerHTML = '';
        document.getElementById('captured').style.display = 'none';
        emptySection();
        clickBoard();
      }
    })


  if (projectId == null) {
     alertFun("Unable to save this file", "red");
     return;
  }
  // projectId, projectName, userId, contenuto, lastModified

  var lastModified = Date.now();

  var fileText = saveFileInVar();

  var fileText = CryptoJS.AES.encrypt(fileText, "pass");
  fileText = fileText.toString();

  $.ajax({
    url: "saveProject.php",
    type: 'POST',

    data: {
      projectId:projectId,
      projectName:projectName,
      userId:userId,
      fileText:fileText,
      lastModified:lastModified
    },

    success: function (data){

      if (data != '') projectId = data;
        edited = false;
        if (saveAlert) alertFun("File saved successfully", "green");
        saveAlert = true;
    }
  });

}

function setViewTable() {
  document.getElementById('preview').style.backgroundColor = 'transparent';
  document.getElementById('detail').style.backgroundColor = 'transparent';
  document.getElementById(localStorage.getItem('viewTable')).style.backgroundColor = '#141B24';

  document.getElementById('tableProject-preview').style.display = 'none';
  document.getElementById('tableProject-detail').style.display = 'none';
  document.getElementById('tableProject-' + localStorage.getItem('viewTable')).style.display = null;

}

function createTablePreview() {

  var html = "";
  var tableDetail = document.getElementById('tableProject-detail').children[0].children;

  for (var i=0; i<tableDetail.length; i++) {

    urlImage = 'uploads/THUMBNAIL__project' + tableDetail[i].children[0].innerText + '.jpg';
    fileName = tableDetail[i].children[2].innerText;
    date = tableDetail[i].children[4].innerText;

    html +=
    "<div onclick='openProjectFromClickTable(this, event);' class='templateSelect scale-up-center' style='display: inline-block; margin-right: 30px; margin-bottom: 30px; vertical-align: middle;'>"
    + "<div style='display: none;'>" + tableDetail[i].children[0].innerText + "</div>"
    + "<div class='imagePreview' style='height: 150px; width: 240px; background-color: rgb(100, 100, 100, .1); border-radius: 8px; background-position: center; background-size: 91%; background-repeat: no-repeat; background-image: url(" + '"' + urlImage + '"' + ");'>"
    + "</div>"
    + "<div style='width: 170px; text-align: left; display: inline-block; vertical-align: middle;'>"
      + "<p style='color: rgb(255, 255, 255, .7); font-size: 13px; margin: 10px 3px 5px; '><span id='currentPageText' style='font-size: 13px; vertical-align: middle; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; width: 160px; display: inline-block;'><b>" + fileName + "</span></b></p>"
      + "<p style='color: rgb(255, 255, 255, .7); font-size: 12px; margin: 5px 3px 5px;'>" + date + "</p>"
    + "</div>"
    + "<div style='width: 70px; text-align: right; display: inline-block; vertical-align: middle;'>"
      + "<p id='removeProject' onclick='openAlertDeleteProject(this);' class='button' style='color: rgb(255, 255, 255, .4); user-select: none; padding: 6px; border-radius: 50%; margin: 0; margin-right: 9px;'>"
        + "<span id='removeProjectSpan' style='font-size: 22px; font-family: Material Icons; transition: .3s;'>"
          + "remove"
        + "</span>"
      + "</p>"
    + "</div>"
  + "</div>";

  }

  document.getElementById('tableProject-preview').children[0].innerHTML = html;

  var row = parseInt(((window.innerWidth*90/100))/270);
  document.getElementById('tableProject-preview').children[0].style.width = (row * 270);

}

window.addEventListener('resize', function() {
  var row = parseInt(((window.innerWidth*90/100))/270);
  document.getElementById('tableProject-preview').children[0].style.width = (row * 270);
});

function openTableProject() {

  if (!localStorage.getItem('viewTable')) {
    localStorage.setItem('viewTable', 'detail');
    setViewTable();
  } else {
    setViewTable();
  }

  $.ajax({
    url: "tableProject.php",
    type: 'POST',

    data: {userId:userId},

    success: function (data){
      if (data != '') {
        try {document.getElementById('divEmptyProject').style.display = 'none';} catch {}

        var headerTable = ""
        + "<thead class='slide-top' style='font-size: 15px; color: rgb(255, 255, 255, .7); background-color: rgb(100, 100, 100, .1); border-radius: 6px;'"
          + "<td style='padding: 15px 10px; text-align: left; display: none;'></td>"
          + "<td style='border-top-left-radius: 6px; border-bottom-left-radius: 6px; padding: 15px 40px 15px 25px; font-family: Material Icons; font-size: 20px; widtd: 5px;'></td>"
          + "<td style='padding: 15px 0; text-align: left; widtd: 80%; font-size: 13.5px; letter-spacing: .3px;'>File</td>"
          + "<td style='padding: 15px 10px; text-align: left; widtd: 100px; font-family: Material Icons; font-size: 20px;'></td>"
          + "<td style='padding: 15px 10px; text-align: left; widtd: 30%; font-size: 13.5px; letter-spacing: .3px;'>Last Modified</td>"
          + "<td style='border-top-right-radius: 6px; border-bottom-right-radius: 6px; padding: 15px 10px; text-align: left; widtd: 30%;'></td>"
        + "</thead>";

        document.getElementById('tableProject-detail').innerHTML = data;
        sortByDate();
        createTablePreview();
        document.getElementById('tableProject-detail').innerHTML = headerTable + document.getElementById('tableProject-detail').innerHTML;
      } else {
        try {document.getElementById('divEmptyProject').style.display = 'block';} catch {}
        document.getElementById('tableProject-detail').innerHTML = data;
      }
    }
  });

}

var openMode = "";
function openProjectFromClickTable(th, event) {

  if (event.target.id.includes("remove")) return;
  if (event.target.id.includes("launch")) return;

  $.ajax({
    url: "selectProject.php",
    type: 'POST',

    data: {id:th.children[0].innerText},

    success: function (data){
      data = JSON.parse(data);
      var len = data.length;
      for(var i=0; i<len; i++){
        var progetto = data[i].Progetto;
        var id = data[i].id;
      }

      var code = CryptoJS.AES.decrypt(progetto, "pass");
      var decryptedMessage = code.toString(CryptoJS.enc.Utf8);

      localStorage.setItem("testo", decryptedMessage);
      localStorage.setItem("projectId", id);

      if (openMode == "N") window.open("editor.php?event=open");
      else location.href = "editor.php?event=open";
      openMode = "";
    }
  });

}


$(window).focus(function() {
      // if (userId != localStorage.getItem("login_user")) location.href = 'dashboard.php';
      // openTableProject();
});

var idProj;
function deleteProject() {

  $.ajax({
    url: "deleteProject.php",
    type: 'POST',

    data: {id:idProj},

    success: function (data){

      var code = CryptoJS.AES.decrypt(data, "pass");
      var decryptedMessage = code.toString(CryptoJS.enc.Utf8);

      var jsonVar = JSON.parse(decryptedMessage);
      var images = JSON.parse(jsonVar.imageToUrl)

      for (var k=0; k<images.length; k++) {
        if (images[k].urlTemp != '') {
          $.ajax({
            url: 'delete.php',
            data: {'file' : images[k].urlTemp }
          });
        }
      }
      openTableProject();
    }
  });

}

function openAlertDeleteProject(th) {

  try {
    idProj = th.parentNode.parentNode.children[0].innerText;
  } catch {}

  var id = 'alertDeleteProject';

  if (document.getElementById('alertDeleteProjectOmbra').style.display == 'none') {
    document.getElementById('alertDeleteProjectOmbra').style.display = 'block';
    document.getElementById(id).style.display = 'block';
    document.getElementById(id).style.animation = '.3s cubic-bezier(.175,.885,.32,1.275) 0s 1 popupAnim';
  } else {
    document.getElementById('alertDeleteProjectOmbra').style.display = 'none';
    document.getElementById(id).style.display = 'none';
    document.getElementById(id).style.animation = '';
  }

}

var codiceTemporaneo;

function registerAccount() {

  errorString = '<p class="errorString" style="font-size: 13px; color: rgb(255,0,0, .4); line-height: 0; margin: -10 2 -5;">';
  var errorStringElem = document.getElementsByClassName("errorString");
  i = errorStringElem.length - 1;
  while (i>=0) {
    errorStringElem[i].remove();
    i--;
  }

  var userNameText = document.getElementById("userNameRegisterText");
  var emailText = document.getElementById("emailRegisterText");
  var passwordText = document.getElementById("passwordRegisterText");
  var repeatPasswordText = document.getElementById("repeatPasswordRegisterText");
  var verificationCodeText = document.getElementById("verificationCodeRegisterText");

  if (userNameText.style.display == 'block' && emailText.style.display == 'block' && passwordText.style.display == 'block' && repeatPasswordText.style.display == 'block') { // pre registrazione

    //check exist email
    $.ajax({
      url: "checkMail.php",
      type: 'POST',

      data: {
        mail: emailText.children[0].children[0].value
      },

      success: function (data){

        if (userNameText.children[0].children[0].value == '') {
          userNameText.insertAdjacentHTML('afterEnd', errorString + 'You must fill this field' + '</p>');
        }
        if (emailText.children[0].children[0].value == '') {
          emailText.insertAdjacentHTML('afterEnd', errorString + 'You must fill this field' + '</p>');
        }
        if (passwordText.children[0].children[0].value == '') {
          passwordText.insertAdjacentHTML('afterEnd', errorString + 'You must fill this field' + '</p>');
        }
        if (repeatPasswordText.children[0].children[0].value == '') {
          repeatPasswordText.insertAdjacentHTML('afterEnd', errorString + 'You must fill this field' + '</p>');
        }

        if (userNameText.children[0].children[0].value == '' || emailText.children[0].children[0].value == '' || passwordText.children[0].children[0].value == '') return;

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailText.children[0].children[0].value))) {
          emailText.insertAdjacentHTML('afterEnd', errorString + 'This email is not valid' + '</p>');
          return;
        }

        if (data == 'exist') {
          emailText.insertAdjacentHTML('afterEnd', errorString + 'This email already exist' + '</p>');
          return;
        }

        if (passwordText.children[0].children[0].value != repeatPasswordText.children[0].children[0].value) {
          repeatPasswordText.insertAdjacentHTML('afterEnd', errorString + 'The passwords are different' + '</p>');
          return;
        }

        if (passwordText.children[0].children[0].value.length < 8) {
          passwordText.insertAdjacentHTML('afterEnd', errorString + 'The password must contain at least 8 characters' + '</p>');
          return;
        }

        if (document.getElementById('robot').value != '') return;

        codiceTemporaneo = parseInt(Math.random() * (99999 - 10000) + 10000);

        $.ajax({
          url: "sendMail.php",
          type: 'POST',

          data: {
            codiceTemporaneo:codiceTemporaneo,
            mail:emailText.children[0].children[0].value
          },

          success: function (data){

          }
        });


        document.getElementById('loader').style.transform = 'scaleX(1)';
        setTimeout(function() {
          document.getElementById('loader').style.display = 'none';
          userNameText.style.display = 'none';
          emailText.style.display = 'none';
          passwordText.style.display = 'none';
          repeatPasswordText.style.display = 'none';
          verificationCodeText.style.display = 'block';
          document.getElementById("signInCont").className += 'fade-in';
          document.getElementById("signInText").innerText = 'Check your mail';
        }, 1200)

      }
    });

    //send mail

  } else {

    if (verificationCodeText.children[0].children[0].value == '' || verificationCodeText.children[0].children[0].value != codiceTemporaneo) {
      verificationCodeText.insertAdjacentHTML('afterEnd', errorString + 'Error code' + '</p>');
      return;
    }

    $.ajax({
      url: "signinFunction.php",
      type: 'POST',

      data: {
        username: replaceSQLInjection(userNameText.children[0].children[0].value),
        mail: replaceSQLInjection(emailText.children[0].children[0].value),
        password: replaceSQLInjection(passwordText.children[0].children[0].value)
      },

      success: function (data){
        location.href = 'login.php';
      }
    });

  }

}

function loginAccount() {

  document.getElementById("incorretPassword").style.display = 'none';

  var errorStringElem = document.getElementsByClassName("errorString");
  i = errorStringElem.length - 1;
  while (i>=0) {
    errorStringElem[i].remove();
    i--;
  }

  var emailText = document.getElementById("emailLoginText");
  var passwordText = document.getElementById("passwordLoginText");

  if (emailText.children[0].children[0].value == '') {
    emailText.insertAdjacentHTML('afterEnd', '<p class="errorString" style="font-size: 13px; color: rgb(255,0,0, .4); line-height: 0; margin: -10px 2px -5px;">' + 'You must fill this field' + '</p>');
  }
  if (passwordText.children[0].children[0].value == '') {
    passwordText.insertAdjacentHTML('afterEnd', '<p class="errorString" style="font-size: 13px; color: rgb(255,0,0, .4); line-height: 0; margin: 0 2px;">' + 'You must fill this field' + '</p>');
  }

  if (emailText.children[0].children[0].value == '' || passwordText.children[0].children[0].value == '') return;

  $.ajax({
    url: "loginFunction.php",
    type: 'POST',

    data: {
      mail: replaceSQLInjection(emailText.children[0].children[0].value),
      password: replaceSQLInjection(passwordText.children[0].children[0].value)
    },

    success: function (data){

      data = JSON.parse(data);
      var len = data.length;
      for(var i=0; i<len; i++){
        var username = data[i].usernameText;
        var univoco_id = data[i].univocoText;
      }

      if (data == '') {
        document.getElementById("incorretPassword").style.display = 'block';
        return;
      }
      localStorage.setItem("login_user", univoco_id);
      localStorage.setItem("username", username);
      location.href = "dashboard.php";
    }
  });

}

function replaceSQLInjection(text) {

  text = text.replaceAll('"', '');
  text = text.replaceAll("'", '');
  text = text.replaceAll("/", '');
  text = text.replaceAll("<", '');
  text = text.replaceAll(">", '');
  text = text.replaceAll(" ", '');

  return text;
}

function logoutAccount() {

  localStorage.removeItem("login_user");
  localStorage.removeItem("username");
  location.href = "login.php";

}
