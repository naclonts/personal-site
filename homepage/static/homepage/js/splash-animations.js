window.addEventListener('load', function(res) {
    // Draw animations
    startAnimations();

    // Alternate fractal canvasses when hovering over heart
    document.getElementById('heart').addEventListener('mouseenter', function(e) {
        document.getElementById('canvas1').classList.remove('active');
    });
    document.getElementById('heart').addEventListener('mouseleave', function(e) {
        document.getElementById('canvas1').classList.add('active');
    });
});


function startAnimations() {
    // Dim the navigation tab for now
    document.getElementById('navigation-label').classList.add('unfocused');

    // Fade in "I"
    document.getElementById('line1').classList.add('visible');

    // Draw SVG heart
    new Vivus('heart', { duration: 200, start: 'autostart' });

    // Scroll words in as heart size increases
    var word;
    var initialWordDelay = 3000;
    var wordDisplayTime = 1500;
    var scrollWords = document.getElementsByClassName('scroll-word');
    var heart = document.getElementById('heart');
    var heartSizeIncrement = 1 / (scrollWords.length+1) * 100;
    heart.style.height = heartSizeIncrement + '%';

    for (var i=0; i < scrollWords.length; i++) {
        var currentWord = scrollWords[i];
        setTimeout(
            function (word) {
                word.classList.add('active-line');

                var h = heart.style.height;
                h = h.substring(0, h.length - 1);
                heart.style.height = h*1 + heartSizeIncrement + '%';
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
            initialWordDelay + wordDisplayTime * (i+1),
            currentWord);
        }
    }

    // Slide in github link kitty and text blurb, re-focus nav tab
    setTimeout(function () {
        document.getElementById('github-cat-block').classList.add('visible');
        document.getElementById('navigation-label').classList.remove('unfocused');
        document.getElementById('blurb-text').classList.add('active');
    }, initialWordDelay + wordDisplayTime * (i+1));


}
