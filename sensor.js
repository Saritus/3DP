var ball = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');

var maxX = garden.clientWidth - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;

function round(value, decimals) {
    let power_of_ten = 10 ** decimals;
    return Math.round(value * power_of_ten) / power_of_ten;
}

function handleOrientation(event) {
    var x = event.beta;  // In degree in the range [-180,180]
    var y = event.gamma; // In degree in the range [-90,90]

    output.innerHTML = "beta : " + round(x, 3) + "\n";
    output.innerHTML += "gamma: " + round(y, 3) + "\n";

    // Because we don't want to have the device upside down
    // We constrain the x value to the range [-90,90]
    if (x > 90) { x = 90 };
    if (x < -90) { x = -90 };

    // To make computation easier we shift the range of 
    // x and y to [0,180]
    x += 90;
    y += 90;

    // 10 is half the size of the ball
    // It center the positioning point to the center of the ball
    ball.style.top = (maxX * x / 180) + "px";
    ball.style.left = (maxY * y / 180) + "px";
}

window.addEventListener('deviceorientation', handleOrientation);

function handleMotion(event) {
    acceleration = event.acceleration;
    output.innerHTML = "acceleration : " + acceleration + "\n";

    accelerationIncludingGravity = event.accelerationIncludingGravity;
    output.innerHTML = "accelerationIncludingGravity : " + accelerationIncludingGravity + "\n";

    rotationRate = event.rotationRate;
    output.innerHTML = "rotationRate : " + rotationRate + "\n";

    interval = event.interval;
    output.innerHTML = "interval : " + interval + "\n";
}

window.addEventListener("devicemotion", handleMotion, true);