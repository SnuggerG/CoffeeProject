console.log("Script loaded");

const StartButton = document.getElementById("StartBtn");
const ResetButton = document.getElementById("ResetBtn");
const StepLabel = document.getElementById("StepLabel");
const TimerLabel = document.getElementById("TimerLabel");
const AmountLabel = document.getElementById("AmountLabel");

console.log("Element selected", StartButton, ResetButton, StepLabel,TimerLabel, AmountLabel);


let CurrentStep = 0;
let TimerCount;
let intervalId;

const steps = [
    {name: "Start", time: 3, water: 0},
    {name: "Pre-wet filter", time: 15, water: 0},
    {name: "Bloom", time: 45, water: 40},
    {name: "Pour-fase 1", time: 45, water: 80},
    {name: "Pour-fase 2", time: 45, water: 60},
    {name: "Pour-fase 3", time: 45, water: 60},
    {name: "Pour-fase 4", time: 45, water: 60}
];

ResetButton.onclick = function() {
    clearInterval(intervalId);
    intervalId = null;
    CurrentStep = 0;
    updateUI();
};

StartButton.onclick = function() {
    if (!intervalId) {
        startStep();
    }
};

function startStep() {
    const currentStep = steps[CurrentStep];
    TimerCount = currentStep.time;
    updateUI();

    intervalId = setInterval(function() {
        TimerCount--;
        TimerLabel.textContent = `00:${TimerCount}`;

        if (TimerCount <= 0) {
            clearInterval(intervalId);
            intervalId = null;
            CurrentStep++;

            if (CurrentStep < steps.length) {
                startStep();
            } else {
                finishTimer();
            }
        }
    }, 1000);
}

function updateUI() {
    const currentStep = steps[CurrentStep];
    StepLabel.textContent = `Step: ${currentStep.name}`;
    TimerLabel.textContent = `00:${currentStep.time}`;
    AmountLabel.textContent = `Pour ${currentStep.water}g of water`;
}

function finishTimer() {
    StepLabel.textContent = "Brewing Complete!";
    TimerLabel.textContent = "00:00";
    AmountLabel.textContent = "Enjoy your coffee!";
}

