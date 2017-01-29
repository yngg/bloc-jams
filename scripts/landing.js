var pointsArray = document.getElementsByClassName('point');

var revealPoint = function(elm) {
    elm.style.opacity = 1;
    elm.style.transform = "scaleX(1) translateY(0)";
    elm.style.msTransform = "scaleX(1) translateY(0)";
    elm.style.WebkitTransform = "scaleX(1) translateY(0)";
};

var animatePoints = function(points) {
    
//    var revealPoint = function(idx) {
//        points[idx].style.opacity = 1;
//        points[idx].style.transform = "scaleX(1) translateY(0)";
//        points[idx].style.msTransform = "scaleX(1) translateY(0)";
//        points[idx].style.WebkitTransform = "scaleX(1) translateY(0)";
//    };
    
    forEach(points, revealPoint);
    
    
//    for(var i=0; i< points.length; i++) {
//        revealPoint(i);
//    }
//    var revealFirstPoint = function() {
//        points[0].style.opacity = 1;
//        points[0].style.transform = "scaleX(1) translateY(0)";
//        points[0].style.msTransform = "scaleX(1) translateY(0)";
//        points[0].style.WebkitTransform = "scaleX(1) translateY(0)";
//    };
// 
//    var revealSecondPoint = function() {
//        points[1].style.opacity = 1;
//        points[1].style.transform = "scaleX(1) translateY(0)";
//        points[1].style.msTransform = "scaleX(1) translateY(0)";
//        points[1].style.WebkitTransform = "scaleX(1) translateY(0)";
//    };
// 
//    var revealThirdPoint = function() {
//        points[2].style.opacity = 1;
//        points[2].style.transform = "scaleX(1) translateY(0)";
//        points[2].style.msTransform = "scaleX(1) translateY(0)";
//        points[2].style.WebkitTransform = "scaleX(1) translateY(0)";
//    };
// 
//    revealFirstPoint();
//    revealSecondPoint();
//    revealThirdPoint();
 
};

window.onload = function() {
    //alert("The window has loaded!");
    if (window.innerHeight > 950) {
        animatePoints(pointsArray);
    }
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    
    window.addEventListener('scroll', function(event) {
        if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
            animatePoints(pointsArray);   
        }
    });
}