var timeout;

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstpageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav" , {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    .to(".bounding-elem" , {
        y: 0,
        duration: 2,
        ease: Expo.easeInOut,
        delay: -1,
        stagger: 0.2
    })

    .from("#hero-footer" , {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })

}

// Scale min = 0.8 n Scale max = 1.2 , default value = 1.  using clamp() for this condition - 
// It round off any nnos less than 0.8 to 0.8 , greater than 1.2 to 1.2 n nos bw them is as it is 
// use according to required conditions

// var timeout ; Global variable for setTimeout() n clearTimeout
function circleshapechanger() {
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function(dets) {
        // clearTimeout(timeout) -> 
       // var xdiff = dets.clientX - xprev;
       // var ydiff = dets.clientY - yprev;
       //syntax use clamp() 
        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;
    })

    circleMouse(xscale,yscale);
    // TO bring back default scale of circle 
    // timeout = setTimeout(function (){
    //    document.querySelector("#mini-circle").style.transform = `translate(${dets.clientX-10}px, ${dets.clientY-10}px) scale(${1}, ${1})`;
    // },100);
}

//scale() is used for changing values of position 
function circleMouse(xscale, yscale) {
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#mini-circle").style.transform = `translate(${dets.clientX-10}px, ${dets.clientY-10}px) scale(${xscale}, ${yscale})`;
    })
}



circleshapechanger();
circleMouse();
firstpageAnim();

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

     elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot*0.5),

        });
    });
});



