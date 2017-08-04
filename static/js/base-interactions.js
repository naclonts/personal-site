
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
}

$(document).ready(baseSetUp);
