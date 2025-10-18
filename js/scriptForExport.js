window.onload = function() {
  $(function () {
    var includes = $('[data-include]')
    $.each(includes, function () {
      var file = $(this).data('include') + '.html'
      $(this).load(file)
    })
  })
};


window.onscroll = function() {
  var elements = document.getElementsByTagName('*');
  for (var w=0; w<elements.length; w++) {
    if (elements[w].className.includes("-onscreen") && isScrolledIntoView(elements[w])) {
      elements[w].className = elements[w].className.replaceAll("-onscreen", "");
    }
  }
};

function isScrolledIntoView(elem)
{
  	var position = elem.getBoundingClientRect();

    if(position.top < window.innerHeight && position.bottom >= 0) {
  		return true;
  	}
}
