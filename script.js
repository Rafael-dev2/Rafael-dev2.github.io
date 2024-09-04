
    function smoothScroll(target, duration) {
    console.log(target);
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.scrollY;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = easing(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
}

    function easing(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 *t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

    requestAnimationFrame(animation);
}

     sobre = document.querySelector('#sobre');
     about = document.querySelector('#experiencias');
     services = document.querySelector('#projetos');
    //var contact = document.querySelector('#contact');

    /* const sobreLink = document.querySelector('#indiceSobre');
     const experienciasLink = document.querySelector('#indiceExp');
     const projetosLink = document.querySelector('#indiceProj');
    //var contactLink = document.querySelector('nav a[href="#contact"]');
*/
    (document.querySelector('#indiceSobre')).addEventListener('click', function() {
    smoothScroll('#sobre', 1000);
});

    (document.querySelector('#indiceExp')).addEventListener('click', function() {
    smoothScroll('#experiencias', 1000);
});

    (document.querySelector('#indiceProj')).addEventListener('click', function() {
    smoothScroll('#projetos', 1000);
});
/*
    contactLink.addEventListener('click', function() {
    smoothScroll('#contact', 1000);
});*/