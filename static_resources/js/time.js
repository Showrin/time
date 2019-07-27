function addPlaytimeAnimation(element) {
    element.classList.add('drum-area__key--playing');
}

function removePlaytimeAnimation(element) {
    element.classList.remove('drum-area__key--playing');
}

function playSound(keyNo) {
    const audio = document.querySelector(`audio[data-key="${keyNo}"]`);
    const drumKey = document.querySelector(`.drum-area__key[data-key="${keyNo}"]`);

    if (!audio) {
        return;
    }

    audio.currentTime = 0;
    audio.play();

    addPlaytimeAnimation(drumKey);
}


const drums = document.querySelectorAll(".drum-area__key");

window.addEventListener('keydown', function(e) {
    playSound(e.keyCode);
});

drums.forEach(drum => {
    drum.addEventListener('click', function() {
        const keyNo = this.getAttribute('data-key');
        playSound(keyNo);
    });
});

drums.forEach(drum => {
    drum.addEventListener('transitionend', function(e) {
        if(e.propertyName == "transform") {
            removePlaytimeAnimation(this);
        }
    });
});