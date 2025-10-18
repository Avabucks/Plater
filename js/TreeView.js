// __TREEVIEW ELEMENTS HTML

function creaListElements() {

          var displayTemp = document.getElementById('windowOrderElements').style.display;
          document.getElementById('windowOrderElements').style.display = 'block';
          document.getElementById('contTreeView').style.width = '1000px';

          var list = [];

          var feed = {text: 'board', parentId: "0", nodes: null};

          list.push(feed);

          var elements = document.body.getElementsByTagName('*');
          for (var i = 0; i < elements.length; i++) {

              if (elements[i].id.includes("-outer")) continue;

              if (elements[i].id.includes("Button ") || elements[i].id.includes("Container ") || elements[i].id.includes("Includes ") || elements[i].id.includes("Image ") || elements[i].id.includes("Menu ") || elements[i].id.includes("Link ") || elements[i].id.includes("Text ") || elements[i].id.includes("MaterialIcon ") || elements[i].id.includes("InputBox ") || elements[i].id.includes("Textarea ") || elements[i].id.includes("Section ") || elements[i].id.includes("Row ")) {

                if (checkIfParentIncludes(elements[i])) continue;

                var parentId = elements[i].parentNode.parentNode.id;

                if (elements[i].id.includes("Section ")) parentId = elements[i].parentNode.id;
                if (elements[i].parentNode.parentNode.parentNode.id.includes("Section ")) parentId = elements[i].parentNode.parentNode.parentNode.id;

                if (elements[i].id.includes("Row ")) parentId = 'board';

                var feed = {text: elements[i].id, parentId: parentId, nodes: null};

                list.push(feed);

              }
          }

          function listToTree(data, options) {
            options = options || {};
            var ID_KEY = options.idKey || 'text';
            var PARENT_KEY = options.parentKey || 'parent';
            var CHILDREN_KEY = options.childrenKey || 'nodes';

            var tree = [],
              childrenOf = {};
            var item, id, parentId;

            for (var i = 0, length = data.length; i < length; i++) {
              item = data[i];
              id = item[ID_KEY];
              parentId = item[PARENT_KEY] || 0;
              // every item may have children
              childrenOf[id] = childrenOf[id] || [];
              // init its children
              item[CHILDREN_KEY] = childrenOf[id];
              if (parentId != 0) {
                // init its parent's children object
                childrenOf[parentId] = childrenOf[parentId] || [];
                // push it into its parent's children object
                childrenOf[parentId].push(item);
              } else {
                tree.push(item);
              }
            };

            return tree;
          }

          var tree = listToTree(list, {
            idKey: 'text',
            parentKey: 'parentId',
            childrenKey: 'nodes'
          });


    document.getElementById("parent").innerHTML = '';

    var html = recursive_tree(tree, 'li', 'ul');
    $('#parent').append(html);

    document.getElementById('contTreeView').style.width = document.getElementById('contTreeView').getElementsByTagName('li')[0].getBoundingClientRect().width;
    document.getElementById('windowOrderElements').style.display = displayTemp;

    var toggler = document.getElementById('parent').getElementsByClassName("caret");

    var i;

    for (i = 0; i < toggler.length; i++) {

      toggler[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");

        var nested = document.getElementsByClassName("li");
        // if (elemState.length != 0) elemState = [];
        console.log(elemState);
        //salvo sezioni aperte
        for (var a=0; a<nested.length; a++) {
          try {
            elemState.push({"page" : currentPage, "id" : replaceIcons(nested[a].innerText), "class" : nested[a].parentNode.children[2].className, "classIcon" : nested[a].parentNode.children[0].className});
          } catch {}
        }

      });
    }

    var elementsTree = document.getElementById('parent').getElementsByClassName('li');
    for (var j=0; j<elementsTree.length; j++) {
      //ricreo sezioni aperte
      for (var a=0; a<elemState.length; a++) {
        if (replaceIcons(elementsTree[j].innerText) == elemState[a].id && currentPage.replace("OFF__::", "") == elemState[a].page) {
          try {
          elementsTree[j].parentNode.children[2].className = elemState[a].class;
          elementsTree[j].parentNode.children[0].className = elemState[a].classIcon;
        } catch {}
        }
      }

    }

    // document.getElementById(selectedSectionId).style.outline = '2px solid rgb(255, 133, 0, .3)'
    // document.getElementById(selectedSectionId).style.outlineOffset = '-1px'


}

var custHTML = 'custHTML';

function recursive_tree(data, tag, child_wrapper, level) {
  var html = [];
  //return html array;
  level = level || 0;
  child_wrapper = (child_wrapper != false) ? child_wrapper : 'ul';
  $.each(data, function(i, obj) {
    var el = $('<' + tag + '>');

    var stringInner;
    var iconName;

    if (obj.text.includes('Row')) iconName = 'calendar_view_month';
    if (obj.text.includes('Section')) iconName = 'crop_16_9';
    if (obj.text.includes('board')) iconName = 'crop_16_9';

    if (obj.text.includes('Container')) iconName = 'featured_video';
    if (obj.text.includes('Button')) iconName = 'pin';
    if (obj.text.includes('Includes')) {
      if (!document.getElementById(replaceIcons(obj.text)).classList.contains("fixed")) {
        iconName = 'lock_open';
      } else {
        iconName = 'lock';
      }
    }
    if (obj.text.includes('Image')) iconName = 'image';
    if (obj.text.includes('Menu')) iconName = 'menu';
    if (obj.text.includes('Text')) iconName = 'format_list_bulleted';
    if (obj.text.includes('Link')) iconName = 'link';
    if (obj.text.includes('MaterialIcon')) iconName = 'spa';
    if (obj.text.includes('InputBox')) iconName = 'text_fields';
    if (obj.text.includes('Textarea')) iconName = 'text_fields';

    var backgroundImageAspect = window.getComputedStyle(document.getElementById(obj.text)).getPropertyValue("background-image");

    if (!backgroundImageAspect.includes("none")) //immagine
     iconName = 'image';

     // console.log(nameElementsJson);

    for (var i=0; i<nameElementsJson.length; i++) {
      if (nameElementsJson[i].id == obj.text) {
        stringInner = nameElementsJson[i].name;
      }
    }

    if (obj.text.includes("Includes ")) stringInner = '<span style="color: rgb(190, 190, 190, .5);"> - </span><span>' + document.getElementById(obj.text).dataset.include + '</span><span style="color: rgb(190, 190, 190, .5);"> - Included Page</span>';

    elementInner = '<span style="color: transparent; width: 1px; white-space: nowrap; max-width: 80px; display:inline-block; overflow: hidden; position: relative; vertical-align: middle; transform: scale(0);">(<span style="white-space: nowrap; max-width: 80px; display:inline-block; overflow: hidden; text-overflow: ellipsis; vertical-align: middle;">' + obj.text + '</span>)</span>';

    // var stringDropper = "<div class='stringDropper' style='DISPLAY: NONE; height: 2px; width: 100%; border-radius: 90px; background-color: rgb(225, 225, 225, 0); padding: 0 10px; margin-left: -10px;'></div>";
    var stringDropper = "";

    if (obj.hasOwnProperty('nodes') && obj.nodes != "" && obj.text != 'board') el.html('<span class="caret"></span><span ondblclick="dblClickFun(this);" draggable="true" ondrop="drop(event)" ondragend="dragEndHandler(event);" ondragover="allowDrop(event)" ondragleave="togliHover(event);" ondragstart="drag(event)" class="li" onclick="selectElement(this.innerText);"><span class="iconMenu">' + iconName + '</span>' + stringInner + elementInner + '</span>' + stringDropper);
    if (obj.nodes == "" && obj.text != 'board') el.html('<span ondblclick="dblClickFun(this);" draggable="true" ondrop="drop(event)" ondragend="dragEndHandler(event);" ondragover="allowDrop(event)" ondragleave="togliHover(event);" ondragstart="drag(event)" class="li" onclick="selectElement(this.innerText);"><span class="iconMenu">' + iconName + '</span>' + stringInner + elementInner + '</span>' + stringDropper);

    if (obj.hasOwnProperty('nodes') && obj.nodes != "" && obj.text == 'board') el.html('<span class="caret"></span><span draggable="true" ondrop="drop(event)" ondragend="dragEndHandler(event);" ondragover="allowDrop(event)" ondragleave="togliHover(event);" ondragstart="drag(event)" class="li" onclick="selectElement(this.innerText);"><span class="iconMenu">' + iconName + '</span>' + obj.text + elementInner + '</span>');
    if (obj.nodes == "" && obj.text == 'board') el.html('<span draggable="true" ondrop="drop(event)" ondragend="dragEndHandler(event);" ondragover="allowDrop(event)" ondragleave="togliHover(event);" ondragstart="drag(event)" class="li" onclick="selectElement(this.innerText);"><span class="iconMenu">' + iconName + '</span>' + obj.text + elementInner + '</span>');

    if (obj.hasOwnProperty('nodes') && obj.nodes != "" && document.getElementById(obj.text).hidden) el.html('<span class="caret"></span><span ondblclick="dblClickFun(this);" draggable="true" ondrop="drop(event)" ondragend="dragEndHandler(event);" ondragover="allowDrop(event)" ondragleave="togliHover(event);" ondragstart="drag(event)" class="li" style="color: rgb(255, 255, 255, .1);" onclick="selectElement(this.innerText);"><span class="iconMenu">' + iconName + '</span>' + stringInner + elementInner + '</span>' + stringDropper);
    if (obj.nodes == "" && document.getElementById(obj.text).hidden) el.html('<span ondblclick="dblClickFun(this);" draggable="true" ondrop="drop(event)" ondragend="dragEndHandler(event);" ondragover="allowDrop(event)" ondragleave="togliHover(event);" ondragstart="drag(event)" class="li" style="color: rgb(255, 255, 255, .1);" onclick="selectElement(this.innerText);"><span class="iconMenu">' + iconName + '</span>' + stringInner + elementInner + '</span>' + stringDropper);

    if (obj.hasOwnProperty('nodes')) {
      var wrapper = $('<' + child_wrapper + ' class="nested">');
      var els = recursive_tree(obj.nodes, tag, child_wrapper);
      wrapper.append(els);
      wrapper.appendTo(el);
    }
    html.push(el);
  });

  return html;
}

function selectElement(id) {

  if (isSelectingElementLink) {
    openHeadLink("link");
    selectLinkType("element");

    isSelectingElementLink = false;
    document.getElementById('ombraForSelectionLink').style.display = 'none';

    if (replaceIcons(id) == 'board') return;

    for (var i=0; i<nameElementsJson.length; i++) {
      if (nameElementsJson[i].id == replaceIcons(id)) {
        selectedElementLink = nameElementsJson[i].name;
      }
    }

    document.getElementById('goToText').innerHTML = '<b>Go to: </b>' + selectedElementLink + "<span onclick='togliSelectedElementLink();' style='vertical-align: middle; font-family: Material Icons; cursor: pointer; margin-left: 10px; margin-top: -2px; font-size: 20px; color: rgb(255, 255, 255, .8);'>close</span>";
    document.getElementById('goToText').style.display = null;

    return;
  }

  id = replaceIcons(id);
  if (id.includes("Includes ")) clickBoard();
  if (!document.getElementById(id).hidden && !id.includes("Section ") && !id.includes("Row ")) document.getElementById(id).click();
  if (document.getElementById(id).hidden && !id.includes("Section ") && !id.includes("Row ")) selectedId = id;

  if (id.includes("Section ") || id.includes("Row ")) {
    document.getElementById(id).click();
  }

  var sectionElements = document.getElementById('board').getElementsByClassName('sectionClass');
  for (var j=0; j<sectionElements.length; j++) {
    sectionElements[j].style.outline = '1px dashed rgb(0, 0, 0, .5)'
    document.getElementById(selectedSectionId).style.outlineOffset = null
  }
  // document.getElementById(selectedSectionId).style.outline = '2px solid rgb(255, 133, 0, .3)'
  // document.getElementById(selectedSectionId).style.outlineOffset = '-1px'

  var scrollId;
  var nodes = [];
  var element = document.getElementById(id);
  nodes.push(element);
  while(element.parentNode) {
      nodes.unshift(element.parentNode);
      element = element.parentNode;
      if (element.id != null)
        if (element.id.includes("Section ")) scrollId = element.id;

  }

  if (id.includes("Row ")) scrollId = id;
  if (id.includes("Section ")) scrollId = id;

  if (scrollId != null) {
    document.getElementById(scrollId).scrollIntoView({behavior: "smooth", inline: "nearest"});
  }

}

function togliDropper() {
  var stringDropperElem = document.getElementsByClassName("stringDropper");
  for (var i=0; i<stringDropperElem.length; i++) {
    stringDropperElem[i].style.backgroundColor = 'rgb(225, 225, 225, 0)';
  }
}

function allowDrop(ev) {
  ev.preventDefault();

  togliDropper();

  var y = parseInt(ev.pageY - ev.target.getBoundingClientRect().top);

  if (y < 20) {
    ev.target.classList.add("drag-hover");
  } else {
    ev.target.classList.remove("drag-hover");

    var stringDropperElem = ev.target.parentNode.getElementsByClassName("stringDropper");
    stringDropperElem[0].style.backgroundColor = 'rgb(225, 225, 225, .4)';

  }
}

function togliHover(ev) {
  ev.preventDefault();
  ev.target.classList.remove("drag-hover");

  togliDropper();

}

function dragEndHandler(ev) {
  document.getElementById('searchElemText').style.border = '2px dashed rgb(255, 255, 255, 0)';
  document.getElementById('searchElemText').style.backgroundColor = null;

  document.getElementsByClassName('floatingDelete')[0].style.backgroundColor = 'rgb(255, 0, 0, .1)';
  document.getElementsByClassName('floatingDelete')[0].style.border = '2px dashed rgb(255, 0, 0, 1)';
  document.getElementsByClassName('floatingDelete')[0].classList.add("scale-up-center-reverse");
  document.getElementsByClassName('floatingDelete')[0].classList.remove("scale-up-center");
  setTimeout(function() {
    document.getElementsByClassName('floatingDelete')[0].style.display = 'none';
  }, 150);

}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.innerText);

  document.getElementsByClassName('floatingDelete')[0].style.display = null;
  document.getElementsByClassName('floatingDelete')[0].classList.remove("scale-up-center-reverse");
  document.getElementsByClassName('floatingDelete')[0].classList.add("scale-up-center");

  draggingInclude = false;
  if (ev.target.innerText.includes("Includes ")) draggingInclude = true;
  if (draggingInclude) {
    clickBoard();
    return;
  }

  selectElement(ev.target.innerText);
  document.getElementById('searchElemText').style.border = '2px dashed rgb(255, 255, 255, .2)';
  document.getElementById('searchElemText').style.backgroundColor = 'rgb(255, 255, 255, 0)';

}

var deleteAsk = '';

function drop(ev) {
  ev.preventDefault();

  document.getElementById('searchElemText').style.border = '2px dashed rgb(255, 255, 255, 0)';
  document.getElementById('searchElemText').style.backgroundColor = null;

  edited = true;

  var data = ev.dataTransfer.getData("text");
  idDragged = document.getElementById(replaceIcons(ev.target.innerText)); //destinazione
  data = replaceIcons(data); //partenza

  if ((idDragged.id.includes("Includes ") || data.includes("Includes ")) && !idDragged.id.includes("board")) {
    creaListElements();
    clickBoard();
    return;
  }

  if (idDragged.id.includes("board") && (data.includes("Includes ") || data.includes("Row "))) {
    if (data.includes("Row ")) idDragged.appendChild(document.getElementById(data));
    if (data.includes("Includes ")) idDragged.appendChild(document.getElementById(data).parentNode);
    creaListElements();
    clickBoard();
    setPageHTML();
    return;
  }

  var y = parseInt(ev.pageY - ev.target.getBoundingClientRect().top);

  if (y < 20) {

    //check destinazione non è board
    if (!replaceIcons(ev.target.innerText).includes("board") && data != idDragged.id) {

      if (idDragged.id.includes("Section ")) idDragged = idDragged.children[0];
      if (idDragged.id.includes("Row ")) idDragged = idDragged;

      removeLastRow(replaceIcons(ev.target.innerText), data);

      if (!idDragged.id.includes("InputBox ") && !idDragged.id.includes("Textarea ") && !idDragged.id.includes("board") && !idDragged.id.includes("Row ") && !data.includes("Section ")) {
        try {idDragged.appendChild(document.getElementById(data).parentNode);} catch {alertFun("You cant drag here", 'blue')}
      }
      if (idDragged.id.includes("Row ") && data.includes("Section ")) {
        try {idDragged.appendChild(document.getElementById(data));} catch {alertFun("You cant drag here", 'blue')}
      }

      if (deleteAsk != '') {
        var myobj = document.getElementById(deleteAsk);
        myobj.remove();
        deleteAsk = '';
      }

    }

  } else {

    // if (idDragged.id.includes("Section ")) {
    //
    // } else {
    //   idDragged.parentNode.insertAdjacentHTML('afterEnd', document.getElementById(data).parentNode.outerHTML)
    // }
    //
    // document.getElementById(data).parentNode.remove();

  }

  creaListElements();
  selectElement(data);

  var elementsTree = document.getElementById('parent').getElementsByClassName('li');
  for (var j=0; j<elementsTree.length; j++) {
    if (replaceIcons(elementsTree[j].innerText) == idDragged) {
      elementsTree[j].scrollIntoView();
    }
  }

  emptySection();
  setPageHTML();

}

function dblClickFun(elem) {
  // if (!elem.innerText.includes("Section ") && !elem.innerText.includes("Row ")) openHeadLink('custHTML');
}

function removeLastRow(dest, part) {

  if (part.includes("Section ") && document.getElementById(part).parentNode.children.length == 1 && document.getElementById(part).parentNode.id != dest) {
    deleteAsk = document.getElementById(part).parentNode.id;
  }

}

// DRAG AND DROP PAGE
var pagesMode = 'Select';
var htmlDrop = [];

function dropPAGE(ev) {
  ev.preventDefault();

  var allowElem = false;

  document.getElementById('searchElemText').style.border = '2px dashed rgb(255, 255, 255, 0)';
  document.getElementById('searchElemText').style.backgroundColor = null;

  htmlDrop = [];

  var data = ev.dataTransfer.getData("text");
  data = replaceIcons(data); //partenza

  if (data.includes("Row")) {

    var elementsBoard = document.getElementById('board').children;
    var numIncludes = 0;
    for (var i=0; i<elementsBoard.length; i++) {
      if (elementsBoard[i].id.includes("Includes ")) {
        numIncludes ++;
      }
    }

    if (document.getElementById('board').children.length - 2 - numIncludes == 1) {
      alertFun("You can't drag this row because it's the last one", "red")
    } else {
      htmlDrop.push({name: data, html: document.getElementById(data).outerHTML});
      allowElem = true;
    }

  } else if (data.includes("Section")) {

    if (document.getElementById(data).parentNode.children.length == 1) {
      alertFun("You must drag the whole row", "red")
    } else {
      htmlDrop.push({name: data, html: document.getElementById(data).outerHTML});
      allowElem = true;
    }

  } else {
    htmlDrop.push({name: data, html: document.getElementById(data).parentNode.outerHTML});
    allowElem = true;
  }

  if (data.includes("Includes ")) allowElem = false;

  if (allowElem) pagesMode = 'Drop';
  if (allowElem) openHeadLink("pagesManager");
}

var draggingInclude = false;

function dragOverPAGE(ev) {
  ev.preventDefault();

  if (draggingInclude) return;

  document.getElementById('searchElemText').style.backgroundColor = 'rgb(255, 255, 255, .2)';
}

function dragLeavePAGE(ev) {
  ev.preventDefault();

  if (draggingInclude) return;

  document.getElementById('searchElemText').style.backgroundColor = 'rgb(255, 255, 255, 0)';
}

// DRAG AND DROP DELETE

var deleteInclude = "";

function dropDELETE(ev) {
  ev.preventDefault();

  var data = ev.dataTransfer.getData("text");
  data = replaceIcons(data); //partenza

  if (data.includes("Includes ")) {
    deleteInclude = data;
    openHeadLink("alertDelete");
  } else {
    deleteKey();
  }

}

function dragOverDELETE(ev) {
  ev.preventDefault();
  document.getElementsByClassName('floatingDelete')[0].style.backgroundColor = 'rgb(255, 0, 0, 1)';
  document.getElementsByClassName('floatingDelete')[0].style.border = '2px solid rgb(255, 0, 0, 1)';
}

function dragLeaveDELETE(ev) {
  ev.preventDefault();
  document.getElementsByClassName('floatingDelete')[0].style.backgroundColor = 'rgb(255, 0, 0, .1)';
  document.getElementsByClassName('floatingDelete')[0].style.border = '2px dashed rgb(255, 0, 0, 1)';
}
