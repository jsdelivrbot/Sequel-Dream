$(document).ready(function() {

    let win = $(window),
        w = 0,
        h = 0,
        opacity = 0,
        getWidth = function() {
            w = win.width();
            h = win.height();
        };
    win.resize(getWidth).mousemove(function(e) {

        opacity = Math.pow(((e.pageY - win.height()) / h), 2) - .25;
        opacity2 = Math.pow((e.pageY / h), 2) - .2;
        opacity3 = Math.pow(((e.pageY - win.height()) / h), 2) + .15;

        $('#top-glow').css('opacity', opacity);
        $('#submit-dream').css('opacity', opacity2);
        $('.devour-button, .separators').css('opacity', opacity3);
    }).resize();

    $('#left-trigger, #users-box').mouseenter(function() {
        $('#users-box').css({
            "width": '125px'
        });
        $('#users-contain').css({
            "opacity": '1'
        })
    });
    $('#left-trigger, #users-box').mouseleave(function() {
        $('#users-box').css({
            "width": '0px'
        });
        $('#users-contain').css({
            "opacity": '0'
        })
    });

    let updateDreams = (element, height) => {
        $(element).each(function(index, element) {
            console.log(element);
            let elementId = $(element).attr('id');
            let excludeOffset = () => {
                let randOffset = Math.floor(Math.random() * 1100) + 50;
                return randOffset;
            }
            let excludeOffsetTop = () => {
                let randOffset2 = Math.floor(Math.random() * 250) + height;
                return randOffset2;
            }
            $('#' + elementId).offset({
                left: excludeOffset(),
                top: excludeOffsetTop()
            });
            $(element).css('opacity', '1');
        });
    }

    updateDreams('.dream-contain', 0);
    updateDreams('.dream-contain2', 500);



    $(document).on('click', function() {
        updateDreams('.dream-contain', 0);
        updateDreams('.dream-contain2', 500);
    })

    let submit = () => {
        if ($('#dream-input').val() === "" || $('#dream-input-user').val() === "") {
            return;
        } else {
            let newId;
            let dreamName = $('#dream-input').val().trim();
            let dreamUser = $('#dream-input-user').val().trim();
            $('#dream-input, #dream-input-user').val('');
            $.post('/', {
                dream: dreamName,
                dreamUser: dreamUser
            }, function(data) {
                newId = parseFloat(data) + 1;
                let newDream = $('.dream-contain:last').clone();
                newDream.find('p:first').html(dreamName);
                newDream.find('button:first').attr('data-id', newId);
                newDream.appendTo('#left-box');
                updateDreams('.dream-contain', 0);
            });
            let newUser = $('<div class="users"><p>' + dreamUser + '</p></div>');
            newUser.appendTo('#users-contain');
            $('#inserted').css('opacity', '1');
            setTimeout(function() {
                $('#inserted').css('opacity', '0');
            }, 2000);
        }
    }

    $('#submit-dream').click(function(e) {
        e.preventDefault();
        submit();
    });

    $(document).keypress(function(e) {
        if (e.which === 13) {
            e.preventDefault();
            submit();
        }
    });

    $(document).on('click', 'div.users', function() {
        let user = $(this).find('p').html();
        $('#selected-dream').empty();
        $.get('/' + user, function(data) {
            data.forEach((itm) => {
                let userDream = $('<p id="itm.id">' + itm.dream_name + '</p>');
                userDream.appendTo('#selected-dream');
            });
            $('#selected-dream').css('opacity', '1');
            setTimeout(function() {
                $('#selected-dream').css('opacity', '0');
            }, 3000);
        });
    });

    $(document).on('click', 'button.devour-button', function(e) {
        e.preventDefault();
        let id = $(this).attr("data-id");
        let moveDiv = $(this).closest('div');
        $.ajax({
            type: 'POST',
            url: '/' + id
        });
        moveDiv.find('button').remove();
        moveDiv.find('p:last').remove();
        moveDiv.removeClass('dream-contain');
        moveDiv.addClass('dream-contain2');
        moveDiv.appendTo('#right-box');
        updateDreams('.dream-contain', 0);
        updateDreams('.dream-contain2', 500);
    });
});
