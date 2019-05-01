var orientation = document.querySelector('.orientation');
var motion = document.querySelector('.motion');

function handleOrientation(event) {
    console.log(event);
    orientation.innerHTML = "orientation : " + event + "\n";
    orientation.innerHTML += "\talpha : " + event.alpha + "\n";
    orientation.innerHTML += "\tbeta : " + event.beta + "\n";
    orientation.innerHTML += "\tgamma: " + event.gamma + "\n";
}

window.addEventListener('deviceorientation', handleOrientation);

function handleMotion(event) {
    console.log(event);

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

}

window.addEventListener("devicemotion", handleMotion, true);
