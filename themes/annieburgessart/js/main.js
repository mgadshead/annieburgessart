/****************
FUNCTIONS
****************/

// when document is loaded
$(document).ready(function() {
    // if container exists animate it from 0 opacity
    if ($('.container').length) {
        gsap.to(".container", {autoAlpha: 1, y: 0, duration: 0.5});
    }
    // if gallery exists
    if ($('#gallery').length) {
        // initialize the light gallery plugin
        initializeLightGallery();
        // add a class to every image when it's loaded to run an animation
        imageLoad();
    }
    // check links to see if they're for the current page and highlight them
    currentPageLink();
    if ($('.current-menu-ancestor').length) {
        $('.current-menu-ancestor').addClass('arrow-up').find('.sub-menu').show();
    }
});

// initialize the light gallery plugin
function initializeLightGallery() {
    $('#gallery').lightGallery({
        download: false,
        counter: false
    });
}

// remove trailing slashes on urls to avoid false negatives in url comparisons
function removeTrailingSlash(url) {
    if (url) {
        return url.replace(/\/+$/, "");
    }
}

// check links to see if they're for the current page and highlight them
function currentPageLink() {
    $('.menu a').each(function(){
        $(this).removeClass('current-page-link');
        if (removeTrailingSlash($(this).attr('href')) == removeTrailingSlash(window.location.href)) {
            $(this).addClass('current-page-link');
        }
    });
}

// add a class to every image when it's loaded to run an animation
function imageLoad() {
    var $imgs = $('img');
    if ($imgs) {
        $imgs.each(function () {
            $(this).on('load', function() {
                $(this).addClass('animate-images');
            });
        });
    }
}

// set up a promise to delay page leave in barba for animation
function resolveAfterDelay() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, 500);
    });
}

// open and close the menu
function toggleMenu() {
    $('.hamburger').toggleClass('is-active');
    $('.menu-container').toggleClass('menu-open');
    $('.false-header').toggleClass('menu-open');
    if ($('.menu-container').hasClass('menu-open')) {
        gsap.fromTo(".menu > li", {opacity: 0, transform: "translateX(-40px)"}, {opacity: 1, transform: "translateX(0)", duration: 0.5, stagger: 0.1});
    }
}

/****************
CLICK EVENTS
****************/

// on drop down click check if the current page has a parent and the accordion is closed, if so highlight the parent link
$('.menu-item-has-children > a').click(function() {
    if ($(this).parent('.menu-item-has-children').hasClass('arrow-up') && $(this).parent('.menu-item-has-children').find('.current-page-link').length) {
        $(this).addClass('current-page-link');
    } else {
        $(this).removeClass('current-page-link');
    }
});

// on hamburger click change hamburger, change menu, change false header and run link animation
$('.hamburger').click(function() {
    toggleMenu();
});

// on menu click change hamburger, change menu, change false header and remove wordpress ancestor class
$('.menu li:not(.menu-item-has-children) a').click(function() {
    toggleMenu();
});

// on drop down click open/close the submenu and change the arrow direction
$('.menu-item-has-children > a').click(function() {
    $(this).closest('.menu-item-has-children').find('.sub-menu').slideToggle();
    $(this).closest('.menu-item-has-children').toggleClass('arrow-up');
});

/****************
MOBILE SWIPE EVENTS
****************/

$(".menu-container").touchwipe({
    wipeLeft: function() {
        if ($('.menu-container').hasClass('menu-open')) {
            toggleMenu();
        }
    },
    wipeRight: function() {
        if (!$('.menu-container').hasClass('menu-open')) {
            toggleMenu();
        }
    },
    min_move_x: 20,
    min_move_y: 20,
    preventDefaultEvents: false
});

/****************
NO PAGE REFRESH
****************/

// initialize no page refresh
barba.init({
    transitions: [{
        // generic transition for every page
        name: 'page-transition',
        // async to wait for transition to finish before leaving page
        async leave() {
            gsap.to(".container", {autoAlpha: 0, y: 40, duration: 0.5});
            await resolveAfterDelay();
        },
        // animate in on new page
        enter() {
            gsap.from(".container", {autoAlpha: 0, y: 40, duration: 0.5});
        }
    }],
    views: [/*{
        namespace: 'page',
        beforeEnter(data) {
            $('.header-page-title').text($(data.next.html).find('.header-page-title').text());
        }
    }, */{
        // scripts to run before entering portfolio pages
        namespace: 'portfolio',
        beforeEnter(data) {
            // add a class to every image when it's loaded to run an animation
            imageLoad();
            // initialize the light gallery plugin
            initializeLightGallery();
            // $('.header-page-title').text($(data.next.html).find('.header-page-title').text());
        },
        afterLeave(data) {
            // destroy gallery before reinitializing, not sure why i can't destroy the lightGallery instance, but this works?
            $('#gallery').remove();
        }
    }]
});

// global hook that runs on enter for every transition regardless of page
barba.hooks.enter(() => {
    // start each page at the top after page transition
    $(window).scrollTop(0);
    // check links to see if they're for the current page and highlight them
    currentPageLink();
});

// global hook that runs before every transition regardless of page
barba.hooks.before(() => {
    // on page refresh check if menu is open and then close it
    if ($('.menu-container').hasClass('menu-open')) {
        toggleMenu();
    }
});