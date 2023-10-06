const batteryLevel = document.getElementById('battery-level');
const timeDisplay = document.getElementById('time-display');
const alarmTimeInput = document.getElementById('alarm-time');
const addAlarmButton = document.getElementById('add-alarm');
const alarmItems = document.getElementById('alarm-items');
const toggleButton = document.getElementById('toggleButton');
let isClockVisible = true;


toggleButton.addEventListener('click', function() {
  const clockElement = document.getElementById('clock');
  if (isClockVisible) {
    clockElement.style.display = 'none'; // 시계를 숨깁니다.
  } else {
    clockElement.style.display = 'block'; // 시계를 표시합니다.
  }
  isClockVisible = !isClockVisible; // 상태를 토글합니다.
  
});

let batteryPercentage = 100;
let alarms = [];

function updateBatteryLevel() {
    batteryPercentage -= 1;
    batteryLevel.textContent = batteryPercentage + '%';

    if (batteryPercentage === 0) {
        timeDisplay.style.backgroundColor = 'black';
    }

    if (batteryPercentage < 0) {
        clearInterval(batteryInterval);
    }
}

const batteryInterval = setInterval(updateBatteryLevel, 1000);

function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}


setInterval(updateTime, 1000);
updateTime();

function addAlarm() {
    const alarmTime = alarmTimeInput.value;
    if (!alarmTime) return;

    alarms.push(alarmTime);
    renderAlarms();

    alarmTimeInput.value = '';
}

function removeAlarm(index) {
    alarms.splice(index, 1);
    renderAlarms();
}

function renderAlarms() {
    alarmItems.innerHTML = '';
    alarms.forEach((alarm, index) => {
        const li = document.createElement('li');
        li.textContent = alarm;
        const removeButton = document.createElement('button');
        removeButton.textContent = '삭제';
        removeButton.addEventListener('click', () => removeAlarm(index));
        li.appendChild(removeButton);
        alarmItems.appendChild(li);
    });
}

function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    clockElement.textContent = timeString;
  }

addAlarmButton.addEventListener('click', addAlarm);
