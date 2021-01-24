const leftPath = "M26.6412 120.504C14.1544 119.565 38.7954 109.812 39.7271 97.4205C40.6589 85.0291 51.5367 75.745 64.0236 76.6838C76.5104 77.6227 50.8035 85.7918 49.8717 98.1833C48.94 110.575 39.1281 121.443 26.6412 120.504Z";
const rightPath = "M66.5 120.5C66.5 133.022 54.9264 109.182 42.5 109.182C30.0736 109.182 20 99.0306 20 86.5085C20 73.9864 30.0736 99.0085 42.5 99.0085C54.9264 99.0085 66.5 107.978 66.5 120.5Z";
let toggle = false;

function animateLogo()
    {
    if (toggle){
        const timeline = anime.timeline({duration : 1000,easing : 'easeOutQuad'});
        timeline.add({targets: ".Tail",d: [{value: rightPath}]});
        toggle = false;
    }
    else {
        const timeline = anime.timeline({duration : 1000,easing : 'easeOutQuad'});
        timeline.add({targets: ".Tail",d: [{value: leftPath}]});
        toggle = true;
    }
    setTimeout(() => { animateLogo(); }, Math.floor(Math.random() * 15000) + 1);
    }
animateLogo();