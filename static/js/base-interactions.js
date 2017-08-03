
function baseSetUp() {
    $('.hamburger').click(function(e) {
        $(this).toggleClass('is-active');
    });
}


$(document).ready(baseSetUp);
