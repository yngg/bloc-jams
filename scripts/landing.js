var revealPoint = function(idx) {
    points[idx].style.opacity = 1;
    points[idx].style.transform = "scaleX(1) translateY(0)";
    points[idx].style.msTransform = "scaleX(1) translateY(0)";
    points[idx].style.WebkitTransform = "scaleX(1) translateY(0)";
};

var animatePoints = function() {
    var points = document.getElementsByClassName('point');
    
    var revealPoint = function(idx) {
        points[idx].style.opacity = 1;
        points[idx].style.transform = "scaleX(1) translateY(0)";
        points[idx].style.msTransform = "scaleX(1) translateY(0)";
        points[idx].style.WebkitTransform = "scaleX(1) translateY(0)";
    };
    
    for(var i=0; i< points.length; i++) {
        revealPoint(i);
    }
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