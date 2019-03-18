import baffle from 'baffle'

(function ($) {
    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *     the user visible viewport of a web browser.
     *     only accounts for vertical position, not horizontal.
     */
    $.fn.visible = function (partial) {
        var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;
        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
    };
})(jQuery);

function baseSetUp() {
    // Handle burger menu
    $('.hamburger').click(function(e) {
        $(this).toggleClass('is-active');
        $('.menu').toggleClass('hidden');
    });

    $('.menu-link').click(function(e) {
        $('.hamburger').removeClass('is-active');
        $('.menu').addClass('hidden');
    });


    // Set up baffle text
    let b = baffle('.baffle-me');
    b.set({
        characters: '<>01█▓█ ▒░/▒░ █░▒▓/ █▒▒ ▓▒▓/█ ░█▒/ ▒▓░ █<░▒ ▓/░>',
        exclude: ['D']
    })
    let baffleDone = false;

    // Trigger events when elements are scrolled into view...
    $(window).scroll(function () {
        var hT = $('#baffle-1').offset().top,
            hH = $('#baffle-1').outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();
        if (wS > (hT + hH - wH)) {
            if (baffleDone) {
                return;
            }
            b.start();
            b.reveal(1000, 400);
            baffleDone = true;
        }
    });

    var allMods = $(".slide-on-scroll");
    allMods.each(function (i, el) {
        var el = $(el);
        el.addClass('slide-on-scroll--translate-class');
        if (el.visible(true)) {
            el.addClass("already-visible");
        }
    });

    $(window).scroll(function (event) {
        allMods.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("come-in");
            }
        });

    });
}

$(document).ready(baseSetUp);

