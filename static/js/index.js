import baffle from 'baffle'

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
        characters: '█▓█ ▒░/▒░ █░▒▓/ █▒▒ ▓▒▓/█ ░█▒/ ▒▓░ █<░▒ ▓/░>',
    })
    b.start();
    b.reveal(5000);
}

$(document).ready(baseSetUp);

