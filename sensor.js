// https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation
var ball = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var orientation = document.querySelector('.orientation');
var motion = document.querySelector('.motion');

var maxX = garden.clientWidth - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;

var lastTimestamp, currentTime;
var speedX, speedY, speedZ;

function round(value, decimals) {
    let power_of_ten = 10 ** decimals;
    return Math.round(value * power_of_ten) / power_of_ten;
}

function handleOrientation(event) {
    var x = event.beta;  // In degree in the range [-180,180]
    var y = event.gamma; // In degree in the range [-90,90]

    orientation.innerHTML = "beta : " + x + "\n";
    orientation.innerHTML += "gamma: " + y + "\n";

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

    config.data.labels.push("");
    config.data.datasets.forEach(function (dataset) {
        dataset.data.push({ x: new Date().getTime(), y: event.gamma });
    });
    myChart.update();
}

document.getElementById('addData').addEventListener('click', function () {
    handleOrientation({
        beta: Math.random() * 360 - 180,
        gamma: Math.random() * 180 - 90
    });
});

window.addEventListener('deviceorientation', handleOrientation);

function handleMotion(event) {

    // Acceleration
    acceleration = event.acceleration;
    motion.innerHTML = "acceleration : " + acceleration + "\n";
    motion.innerHTML += "\tx : " + acceleration.x + "\n";
    motion.innerHTML += "\ty : " + acceleration.y + "\n";
    motion.innerHTML += "\tz : " + acceleration.z + "\n";

    // Acceleration including gravity
    accelerationIncludingGravity = event.accelerationIncludingGravity;
    motion.innerHTML += "accelerationIncludingGravity : " + accelerationIncludingGravity + "\n";
    motion.innerHTML += "\tx : " + accelerationIncludingGravity.x + "\n";
    motion.innerHTML += "\ty : " + accelerationIncludingGravity.y + "\n";
    motion.innerHTML += "\tz : " + accelerationIncludingGravity.z + "\n";

    // Rotation rate
    rotationRate = event.rotationRate;
    motion.innerHTML += "rotationRate : " + rotationRate + "\n";
    motion.innerHTML += "\talpha : " + rotationRate.alpha + "\n";
    motion.innerHTML += "\tbeta : " + rotationRate.beta + "\n";
    motion.innerHTML += "\tgamma : " + rotationRate.gamma + "\n";

    // Interval
    interval = event.interval;
    motion.innerHTML += "interval : " + interval + "\n";

    // Calculate Speed
    currentTime = new Date().getTime();
    if (lastTimestamp) {
        // m/s² / 1000 * (miliseconds - miliseconds)/1000 /3600 => km/h
        speedX += event.acceleration.x / 1000 * ((currentTime - lastTimestamp) / 1000) / 3600;
        speedY += event.acceleration.y / 1000 * ((currentTime - lastTimestamp) / 1000) / 3600;
        speedZ += event.acceleration.z / 1000 * ((currentTime - lastTimestamp) / 1000) / 3600;
    }

    // Speed
    motion.innerHTML += "speed : \n";
    motion.innerHTML += "\tx : " + speedX + "\n";
    motion.innerHTML += "\ty : " + speedY + "\n";
    motion.innerHTML += "\tz : " + speedZ + "\n";

    lastTimestamp = currentTime;

}

window.addEventListener("devicemotion", handleMotion, true);
