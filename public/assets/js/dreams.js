$("#submit-dream").approach({
  "opacity": "1"
}, 400);
$("#top-glow").approach({
  "opacity": "1"
}, 350);
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
  let dreamName = $('#dream-input').val().trim();
  $.ajax({
        type: 'POST',
        url: '/',
        data: {dream: dreamName}
  });
  let newDream = $('.dream-contain:first').clone();
  newDream.find('p:first').html(dreamName);
  newDream.appendTo('#left-box');
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

$('.devour-button').click(function(e) {
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
