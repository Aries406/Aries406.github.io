let nCount = selector => {
    $(selector).each(function() {
        $(this)
            .animate({
                Counter: $(this).text()
            }, {
                // A string or number determining how long the animation will run.
                duration: 4000,
                // A string indicating which easing function to use for the transition.
                easing: "swing",
                /**
                 * A function to be called for each animated property of each animated element. 
                 * This function provides an opportunity to
                 *  modify the Tween object to change the value of the property before it is set.
                 */
                step: function(value) {
                    $(this).text(Math.ceil(value));
                }
            });
    });
};

let a = 0;
$(window).scroll(function() {
    // The .offset() method allows us to retrieve the current position of an element  relative to the document
    let oTop = $(".numbers").offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() >= oTop) {
        a++;
        nCount(".rect > h1");
    }
});



/**
 *
 *  sticky navigation
 *
 */

let navbar = $(".navbar");

$(window).scroll(function() {
    // get the complete hight of window
    let oTop = $(".section-1").offset().top - window.innerHeight;
    if ($(window).scrollTop() > oTop) {
        navbar.addClass("sticky");
    } else {
        navbar.removeClass("sticky");
    }
});
//輪播圖切換時間
$('.carousel').carousel({
    interval: 2000
});


//輪播圖手勢

$(".carousel").swipe({

    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

        if (direction == 'left') $(this).carousel('next');
        if (direction == 'right') $(this).carousel('prev');

    },
    allowPageScroll: "vertical"

});


//jq_3d caroual
(function() {

    $(document).ready(function() {

        var options = {
            ovalWidth: 400,
            ovalHeight: 50,
            offsetX: 100,
            offsetY: 325,
            angle: 0,
            activeItem: 0,
            duration: 350,
            className: 'item'
        }

        var carousel = $('.carousel').CircularCarousel(options);

        /* Fires when an item is about to start it's activate animation */
        carousel.on('itemBeforeActive', function(e, item) {
            $(item).css('box-shadow', '0 0 20px blue');
        });

        /* Fires after an item finishes it's activate animation */
        carousel.on('itemActive', function(e, item) {
            $(item).css('box-shadow', '0 0 20px green');
        });

        /* Fires when an active item starts it's de-activate animation */
        carousel.on('itemBeforeDeactivate', function(e, item) {
            $(item).css('box-shadow', '0 0 20px yellow');
        })

        /* Fires after an active item has finished it's de-activate animation */
        carousel.on('itemAfterDeactivate', function(e, item) {
            $(item).css('box-shadow', '');
        })


        /* Previous button */
        $('.controls .previous').click(function(e) {
            carousel.cycleActive('previous');
            e.preventDefault();
        });

        /* Next button */
        $('.controls .next').click(function(e) {
            carousel.cycleActive('next');
            e.preventDefault();
        });

        /* Manaully click an item anywhere in the carousel */
        $('.carousel .item').click(function(e) {
            var index = $(this).index('li');
            carousel.cycleActiveTo(index);
            e.preventDefault();
        });

    });

})();
//輪播圖手勢

$(document).ready(function() {
    $("#myCarousel").swiperight(function() {
        $(this).carousel('prev');
    });
    $("#myCarousel").swipeleft(function() {
        $(this).carousel('next');
    });
});


//
function getData(PageName) {
    let req = new XMLHttpRequest();
    req.open("get", "http://127.0.0.1/" + pageName);
    req.onload = function() {
        let content = document.querySelector("content");
        content.innerHTML = this.responseText;
    };
    req.send();
}

//廣告框

adWidth = 160; //廣告寬度

nowX = 1000; //目前位置(left)
nowY = 100; //目前位置(top)

fad_style = document.getElementById('iRFloating').style;

function fadIni() {
    innerWidth = document.body.clientWidth;
    innerHeight = document.body.clientHeight;

    edge = (innerWidth - 1000) / 2;

    if (edge > adWidth) {
        posX = edge + 1000;
    } else {
        posX = innerWidth - adWidth;
    }

    posY = 100;

}

function fadRefresh() {
    offsetX = posX + document.body.scrollLeft - nowX;
    offsetY = posY + document.body.scrollTop - nowY;
    nowX += offsetX / 5;
    nowY += offsetY / 5;
    fad_style.left = nowX;
    fad_style.top = nowY;

    floatID = setTimeout('fadRefresh()', 20); //Refresh時間
}

function fadStart() {
    fadIni();
    window.onresize = fadIni;
    fadRefresh();
}

fadStart();