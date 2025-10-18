//SCRIPT MENU
var altezzaMenu = 0;
var altezzaSottoMenu = 0;
var altezzaLi = 0;
var w = window.innerWidth;

function loadFunction(){
  try{document.getElementById('contAbout').style.marginTop = window.innerHeight;}catch{}

  var els = document.getElementsByClassName("arrowMenu");
    for(var i = 0; i < els.length; i++)
    {
          els[i].id = i;
    }

}

function resizeFun() {
  w = window.innerWidth;
}

function clickMenu() {

}

function clickSottoMenu(idSottoMenu, idMenuLi) {

  if (w >= '768') {
    document.getElementById(idSottoMenu).style.left = document.getElementById(idMenuLi).getBoundingClientRect().left - 50;

  if (document.getElementById(idSottoMenu).style.display == 'none' && w >= '768') {
    document.getElementById(idSottoMenu).style.display = 'block';
    setTimeout(togliMenu, 10);
    function togliMenu() {
      document.getElementById(idSottoMenu).style.height = altezzaSottoMenu;
      if (w > '768') document.getElementById(idSottoMenu).style.transition = '.3s';
    }

  } else {
    document.getElementById(idSottoMenu).style.height = '0';

    setTimeout(togliMenu, 290);
    function togliMenu() {
      document.getElementById(idSottoMenu).style.height = altezzaSottoMenu;
      document.getElementById(idSottoMenu).style.display = "none";
    }

  }
}

}

function getHeight(idMenu, idLi) {

  if (w => '768') {
    var els = document.getElementsByClassName("sottoMenu");
      for(var i = 0; i < els.length; i++)
      {
        if (els[i].id != idMenu) {
          els[i].style.display = 'none';
          els[i].style.transition = '0s';
        }
      }
  }

  if (document.getElementById(idMenu).style.display == 'none'){

    document.getElementById(idMenu).style.display = 'block';
    altezzaSottoMenu = document.getElementById(idMenu).getBoundingClientRect().height;
    altezzaLi = document.getElementById(idLi).getBoundingClientRect().height / 2;
    document.getElementById(idMenu).style.display = 'none';
    document.getElementById(idMenu).style.transition = '0s';
    document.getElementById(idMenu).style.height = '0';

  }

}

function turnArrow(elem) {

  if (w >= '768') {
      var els = document.getElementsByClassName("arrowMenu");
        for(var i = 0; i < els.length; i++)
        {
            if (els[i].id != elem.id){
              els[i].style.transform = '';
            }
        }


  elem.style.transition = '.3s';
  elem.style.display = 'inline-block';
  if (elem.style.transform == '') {
    elem.style.transform = 'rotate(180deg)';
  } else {
    elem.style.transform = '';
  }
  }

}
//END SCRIPT MENU
var avvia = true;

function scrollFunction(){

  var h = window.innerHeight;
  var w = window.innerWidth;

  if (window.scrollY == 0){ // è all'inizio
    document.getElementById('header').style.background = 'rgb(20, 20, 20, 0)';
  }

  if (window.scrollY != 0){
    document.getElementById('header').style.background = 'rgb(20, 20, 20, 1)';
  }

  try {
    var bounding = document.getElementById('contNumeriAbout').getBoundingClientRect();

    if (bounding.top >= 0 && bounding.bottom <= window.innerHeight+100 && avvia) {
      avvia = false;
      animateValue("number1", 0, document.getElementById('number1').innerHTML, 500);
      animateValue("number2", 0, document.getElementById('number2').innerHTML, 500);
      animateValue("number3", 0, document.getElementById('number3').innerHTML, 500);
      animateValue("number4", 0, document.getElementById('number4').innerHTML, 500);
    }

    var boundingContact = document.getElementById('contTestiHome').getBoundingClientRect();
    if (boundingContact.top >= 0 && boundingContact.bottom <= window.scrollY) {
      document.getElementById('contTestiHome').style.opacity = '0';
      document.getElementById('contFotoHome').style.backgroundImage = 'url("foto/contact.jpg")';
      document.getElementById('contFotoHome').style.boxShadow = 'inset 0 0 0 10000px rgba(0,0,0,.5)';
    } else {
      document.getElementById('contTestiHome').style.opacity = '1';
      document.getElementById('contFotoHome').style.backgroundImage = 'url("foto/home.png")';
      document.getElementById('contFotoHome').style.boxShadow = 'inset 0 0 0 10000px rgba(0,0,0,.7)';
    }

   } catch {}

} // end function

function animateValue(id, start, end, duration) {
    if (start === end) return;
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.getElementById(id);
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

//SCRIPT GALLERY
var numeroImmagine = 0, totFoto = 0;

function clickGallery(el, id) {
  document.getElementById("contOmbraImage").style.display = "block";
  document.getElementById("contOmbraImage").style.background = "rgb(0, 0, 0, 0.9)";
  document.getElementById("imageVisualizza").src = el.style.backgroundImage.replace(/(url\(|\)|")/g, '');
  document.body.style.overflow = 'hidden';
  document.getElementById("contOmbraImage").classList.remove("fade-out");
  document.getElementById("contOmbraImage").classList.add("fade-in");

      // Conta totale foto nella cartella foto/gallery/ --------------
      function conta() { i++; img.src = "foto/gallery/portfolio " + i + ".png"; }
      function stop() { totFoto = i - 1; }

      var i = 0, img = new Image();

      img.onload = conta;
      img.onerror = stop;
      conta();
      // Fine Conta --------------------------------------------------

      numeroImmagine = parseInt(id);

}

function avantiImage() {
  if (numeroImmagine < 8) {

  numeroImmagine += 1;

  document.getElementById("imageVisualizza").src = "foto/gallery/portfolio " + numeroImmagine + ".png";
  document.getElementById("imageVisualizza").style.transform = 'translate(-20%, -50%)';
  document.getElementById("imageVisualizza").style.opacity = '.5';

  setTimeout(mettiTransition, 1);
  function mettiTransition() {
    document.getElementById("imageVisualizza").style.transition = '0.3s';
    document.getElementById("imageVisualizza").style.transform = 'translate(-50%, -50%)';
    document.getElementById("imageVisualizza").style.opacity = '1';
  }

  setTimeout(sposta, 300);
  function sposta() {
    document.getElementById("imageVisualizza").style.transition = '0s';
  }

} // end if

} // end function AVANTI

function indietroImage() {
  if (numeroImmagine > 1) {

  numeroImmagine -= 1;

  document.getElementById("imageVisualizza").src = "foto/gallery/portfolio " + numeroImmagine + ".png";
  document.getElementById("imageVisualizza").style.transform = 'translate(-70%, -50%)';
  document.getElementById("imageVisualizza").style.opacity = '.5';

  setTimeout(mettiTransition, 1);
  function mettiTransition() {
    document.getElementById("imageVisualizza").style.transition = '0.3s';
    document.getElementById("imageVisualizza").style.transform = 'translate(-50%, -50%)';
    document.getElementById("imageVisualizza").style.opacity = '1';
  }

  setTimeout(sposta, 300);
  function sposta() {
    document.getElementById("imageVisualizza").style.transition = '0s';
  }

} // end if

} // end function INDIETRO

function chiudiGallery(e) {
  if(e.target !== e.currentTarget) return;
  document.getElementById("contOmbraImage").style.background = "rgb(0, 0, 0, 0)";
  document.getElementById("contOmbraImage").classList.add("fade-out");
  document.getElementById("contOmbraImage").classList.remove("fade-in");

  setTimeout(togliOmbra, 300);
  function togliOmbra() {
    document.getElementById("contOmbraImage").style.display = "none";
    document.body.style.overflowY = "auto";
  }
}
//END SCRIPT GALLERY


//FAQ PAGE

function clickFAQ(id) {

  var altezza = 0;
  var elem = document.querySelectorAll('#' + id)[1];
  elem.style.transition = '.3s';

  if (elem.style.display == 'none') {
    elem.style.display = 'block';
    elem.style.height = 'auto';
    altezza = elem.getBoundingClientRect().height;
    elem.style.height = '0';

    setTimeout(compare, 10);
    function compare() {
      elem.style.height = altezza;
    }

  } else if (elem.style.display == 'block') {
    elem.style.height = '0';

    setTimeout(compare, 290);
    function compare() {
      elem.style.display = 'none';
    }

  }

}

//END FAQ PAGE
