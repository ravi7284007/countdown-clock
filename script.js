const inputContainer = document.getElementById('input-container');
const coundownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date

const today = new Date().toISOString().split('T')[0];
// console.log(today);
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI
const updateDOM = () => {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        // console.log(distance);

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // console.log(days, hours, minutes, seconds);
        // hide input
        inputContainer.hidden = true;

        // If the countdown has ended, show complete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // Populate Countdown
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`
            timeElements[1].textContent = `${hours}`
            timeElements[2].textContent = `${minutes}`
            timeElements[3].textContent = `${seconds}`
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }

    }, second)


}

// Take Value's from form input
const updateCountDown = e => {
    e.preventDefault()
    // console.log(e);
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    }
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    // console.log(countdownTitle, countdownDate);
    // Check for valid date
    if (countdownDate === '') {
        alert('Please select a date for the countdown.')
    } else {
        // Get Number Version of current Date, updateDom
        countdownValue = new Date(countdownDate).getTime();
        // console.log(countdownValue);
        updateDOM();
    }
}

// Reset All Values
function reset() {
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;

    clearInterval(countdownActive);

    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
    //Get countdown from localstorage if available
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listners
coundownForm.addEventListener('submit', updateCountDown);
countdownBtn.addEventListener('click', reset)
completeBtn.addEventListener('click', reset)

restorePreviousCountdown()