window.addEventListener('load', function(res) {
    document.getElementById('line1').classList.add('visible');

    new Vivus('heart', { duration: 200, start: 'autostart' });

    var initialWordDelay = 3000;
    var wordDisplayTime = 1500;
    // break;
    var scrollWords = document.getElementsByClassName('scroll-word');
    for (var i=0; i < scrollWords.length; i++) {
        var currentWord = scrollWords[i];
        setTimeout(
            function (word) {
                word.classList.add('active-line');
            },
            initialWordDelay + wordDisplayTime * i,
            currentWord);

        // Move word off the screen, unless it's the last one
        if (i < scrollWords.length-1) {
            setTimeout(function (word) {
                word.classList.remove('active-line');
                word.classList.add('finished-line');
            },
            initialWordDelay + wordDisplayTime * (i+1),
            currentWord);
        // Last one: add "final" styles
        } else {
            setTimeout(function (word) {
                word.classList.add('final-line');
            },
            initialWordDelay + wordDisplayTime * (i+1),// - wordDisplayTime/2,
            currentWord);
        }
    }
});
