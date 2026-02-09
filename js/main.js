/* ========================================================================= */
/*  Preloader Script
/* =========================================================================

window.onload = function () {
    document.getElementById('loading-mask').style.display = 'none';
} */

$(function(){
    /* ========================================================================= */
    /*  Menu item highlighting
    /* ========================================================================= */

    jQuery(window).scroll(function () {
        if (jQuery(window).scrollTop() > 400) {
            jQuery("#navigation").css("background-color","#00C7FC");
            jQuery("#navigation").addClass("animated-nav");
        } else {
            jQuery("#navigation").css("background-color","transparent");
            jQuery("#navigation").removeClass("animated-nav");
        }
    });

    $('#nav').onePageNav({
        filter: ':not(.external)',
        scrollSpeed: 950,
        scrollThreshold: 1
    });

    $('a[href^="#"]').on('click', function (event) {
        var targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') {
            return;
        }

        var $target = $(targetId);
        if ($target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $target.offset().top
            }, 700);
        }
    });

    // Slider Height
    var slideHeight = $(window).height();
    $('#home-carousel .carousel-inner .item, #home-carousel .video-container').css('height',slideHeight);

    $(window).resize(function(){'use strict',
        $('#home-carousel .carousel-inner .item, #home-carousel .video-container').css('height',slideHeight);
    });

    var touchStartX = null;
    var touchStartY = null;
    var swipeThreshold = 40;
    var isMouseDown = false;

    $('#home-carousel').on('touchstart', function (event) {
        var touch = event.originalEvent.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    });

    $('#home-carousel').on('touchend', function (event) {
        if (touchStartX === null || touchStartY === null) {
            return;
        }

        var touch = event.originalEvent.changedTouches[0];
        var deltaX = touch.clientX - touchStartX;
        var deltaY = touch.clientY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0) {
                $(this).carousel('prev');
            } else {
                $(this).carousel('next');
            }
        }

        touchStartX = null;
        touchStartY = null;
    });

    $('#home-carousel').on('mousedown', function (event) {
        if (event.which !== 1) {
            return;
        }
        isMouseDown = true;
        touchStartX = event.clientX;
        touchStartY = event.clientY;
    });

    $(document).on('mouseup', function (event) {
        if (!isMouseDown || touchStartX === null || touchStartY === null) {
            return;
        }

        var deltaX = event.clientX - touchStartX;
        var deltaY = event.clientY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0) {
                $('#home-carousel').carousel('prev');
            } else {
                $('#home-carousel').carousel('next');
            }
        }

        isMouseDown = false;
        touchStartX = null;
        touchStartY = null;
    });

    $('#home-carousel').on('mouseleave', function () {
        isMouseDown = false;
        touchStartX = null;
        touchStartY = null;
    });

    // portfolio filtering

    $("#projects").mixItUp();

    //fancybox

    $(".fancybox").fancybox({
        padding: 0,

        openEffect : 'elastic',
        openSpeed  : 650,

        closeEffect : 'elastic',
        closeSpeed  : 550,
    });


    /* ========================================================================= */
    /*  Facts count
    /* ========================================================================= */

    "use strict";
    $(".fact-item").appear(function () {
        $(".fact-item [data-to]").each(function () {
            var e = $(this).attr("data-to");
            $(this).delay(6e3).countTo({
                from: 50,
                to: e,
                speed: 3e3,
                refreshInterval: 50
            })
        })
    });

/* ========================================================================= */
/*  On scroll fade/bounce fffect
/* ========================================================================= */

    $("#testimonial").owlCarousel({
        pagination : true, // Show bullet pagination
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true
    });

    if (typeof WOW === "function") {
        new WOW({
            animateClass: 'animated',
            offset: 100,
            mobile: true
        }).init();
    } else {
        $(".wow").addClass("animated");
    }

});

/* ---------------------------------------------------------------------- */
/*      Progress Bars
/* ---------------------------------------------------------------------- */

initProgress('.progress');

function initProgress(el){
    jQuery(el).each(function(){
        var pData = jQuery(this).data('progress');
        progress(pData,jQuery(this));
    });
}


            
function progress(percent, $element) {
    var progressBarWidth = 0;
    
    (function myLoop (i,max) {
        progressBarWidth = i * $element.width() / 100;
        setTimeout(function () {   
        $element.find('div').find('small').html(i+'%');
        $element.find('div').width(progressBarWidth);
        if (++i<=max) myLoop(i,max);     
        }, 10)
    })(0,percent);  
}   
