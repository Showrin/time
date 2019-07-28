// ########### Geting access to the dom elements ################
const clockHandSecond = document.querySelector('#js-second');
const clockHandMinute = document.querySelector('#js-minute');
const clockHandHour = document.querySelector('#js-hour');
const digitalTime = document.querySelector('#js-digital-time');
const dateShower = document.querySelector('#js-date');
const mobileSearchBtn = document.querySelector('#js-mobile-search-btn');
const sidenavCloseBtn = document.querySelector('#js-back-btn');
const sidenav = document.querySelector('#js-mobile-sidenav');



// ########### Geting access to the System date ################
var date = new Date();
var second = date.getSeconds();
var minute = date.getMinutes();
var hour = date.getHours();



// ########### Setting the initial points of the clock's hand ################
clockHandSecond.style.transform = `rotate(${((second/60) * 360) + 90}deg)`;
clockHandMinute.style.transform = `rotate(${((minute/60) * 360) + 90}deg)`;
clockHandHour.style.transform = `rotate(${((hour / 12) * 360) + (minute * (360 / (12*60))) + 90}deg)`;



// ########### Controling sidenav ################
mobileSearchBtn.addEventListener('click', function() {
    sidenav.style.left = 0;
});

sidenavCloseBtn.addEventListener('click', function() {
    sidenav.style.left = "100%";
});



// ########### Declaring movement control functions ################

var fullAngleCountForSecond = 0; //control variable for avoiding glitch after 360 degree rotation
var fullAngleCountForMinute = 0; //control variable for avoiding glitch after 360 degree rotation
var fullAngleCountForHour = 0; //control variable for avoiding glitch after 360 degree rotation

function clockSecondMove() {
    let date = new Date();
    let second = date.getSeconds();

    if (second == 0) {
        fullAngleCountForSecond += 360;
    }

    let angleForSecond = ((second/60) * 360) + fullAngleCountForSecond + 90;
    clockHandSecond.style.transform = `rotate(${angleForSecond}deg)`; //second hand changes per second
}

function clockMinuteMove() {
    let date = new Date();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    if (minute == 0 && second == 0) {
        fullAngleCountForMinute += 360;
    }

    var angleForMinute = ((minute/60) * 360) + fullAngleCountForMinute + 90;
    clockHandMinute.style.transform = `rotate(${angleForMinute}deg)`; //minute hand changes per minute
}

function clockHourMove() {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    if (hour == 0 && minute == 0 && second == 0) {
        fullAngleCountForHour += 360;
    }

    var angleForHour = ((hour / 12) * 360) + (minute * (360 / (12*60))) + fullAngleCountForHour + 90;
    clockHandHour.style.transform = `rotate(${angleForHour}deg)`; //hour hand changes per hour
}


// ########### App Digital Clock functions ################
function digitalSecondSet() {
    let date = new Date();
    let second = date.getSeconds();

    return numberFormater(second);
}

function digitalMinuteSet() {
    let date = new Date();
    let minute = date.getMinutes();

    return numberFormater(minute);
}

function digitalHourSet() {
    let date = new Date();
    let hour = date.getHours();

    return numberFormater(hour);
}

function digitalTimeSet() {
    let time = `${digitalHourSet()}:${digitalMinuteSet()}:${digitalSecondSet()}`;
    digitalTime.innerHTML = time;
}



// ########### App Date Setter functions ################
function dateSetter(date) {
    let parts = date.toString().split(' ');
    dateShower.innerHTML = `${parts[2]} ${parts[1]}, ${parts[3]}`;
}



// ########### Utility functions ################
function numberFormater(number) {
    if (number >= 0 && number <= 9) {
        return '0' + number;
    } else {
        return number;
    }
}




// ########### Calling the functions ################
setInterval(clockSecondMove, 1000);
setInterval(clockMinuteMove, 1000);
setInterval(clockHourMove, 1000);

setInterval(digitalTimeSet, 1000);

dateSetter(date);