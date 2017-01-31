$(document).ready(function(){

let $win = $(window),
    w = 0,
    h = 0,
    opacity = 0,
    getWidth = function() {
        w = $win.width();
        h = $win.height();
    };
$win.resize(getWidth).mousemove(function(e) {

    opacity = Math.pow(((e.pageY-$win.height())/h), 2) - .25;
    opacity2 = Math.pow((e.pageY/h), 2) - .25;

    $('#top-glow').css('opacity',opacity);
    $('#submit-dream').css('opacity',opacity2);
}).resize();

$("#left-trigger, #left-box").mouseenter(function() {
  $("#left-box").css({
    "opacity": ".5",
    "width": "115px",
    "background-color": "black"
  });
});
$("#left-trigger, #left-box").mouseleave(function() {
  $("#left-box").css({
    "opacity": "0",
    "width": "0px",
    "background-color": "transparent"
  });
});
$("#right-trigger, #right-box").mouseenter(function() {
  $("#right-box").css({
    "opacity": ".5",
    "width": "115px",
    "background-color": "black"
  })
});
$("#right-trigger, #right-box").mouseleave(function() {
  $("#right-box").css({
    "opacity": "0",
    "width": "0px",
    "background-color": "transparent"
  });
});

let submit = () => {
  let newId;
  let dreamName = $('#dream-input').val().trim();
  $('#dream-input').val('');
  $.post('/', {dream: dreamName}, function(data) {
    newId = parseFloat(data) + 1;
    let newDream = $('.dream-contain:last').clone();
    newDream.find('p:first').html(dreamName);
    newDream.find('button:first').attr('data-id', newId);
    newDream.appendTo('#left-box');
  });
  $('#inserted').css('opacity', '1');
  setTimeout(function() {
    $('#inserted').css('opacity', '0');
  }, 2000);
}

$('#submit-dream').click(function(e) {
    e.preventDefault();
    submit();
});

$(document).keypress(function(e) {
    if(e.which === 13) {
      e.preventDefault();
      submit();
    }
});

$(document).on('click', 'button.devour-button', function(e) {
  e.preventDefault();
  let id = $(this).attr("data-id");
  let moveDiv = $(this).closest('div');
  let cloneDream = moveDiv.find('p:first');
  let cloneDiv = cloneDream.clone();
  $.ajax({
        type: 'POST',
        url: '/' + id
  });
  moveDiv.remove();
  cloneDream.addClass('dream-contain2');
  cloneDream.appendTo('#right-box');
});

});
