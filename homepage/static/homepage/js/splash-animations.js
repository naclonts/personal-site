window.addEventListener('load', function(res) {
    console.log('starting');
    var w = window.innerHeight;
    console.log(w);
    document.getElementById('heart')
    new Vivus('heart', { duration: 170, start: 'autostart' });

    var scrollWords = document.getElementsByClassName('scroll-word');
    var currentWord = scrollWords[0];
    setTimeout(function () {
        currentWord.classList.toggle('active-line');
    }, 500);
});
