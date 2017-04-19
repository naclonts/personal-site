
function setupMenuUI() {
    var navLabel = document.getElementById('navigation-label');
    var navCheck = document.getElementById('navigation-check');

    navCheck.addEventListener('change', function (e) {
        if (navCheck.checked) {
            navLabel.innerHTML = '<';
        } else {
            navLabel.innerHTML = '>';
        }
    });
}


window.addEventListener('load', setupMenuUI);
