const settingTimeElement = document.querySelector('.settingTime');

function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0'); // 补零
    const seconds = now.getSeconds().toString().padStart(2, '0'); // 补零

    let timeOfDay = '';

    if (hours < 12) {
        timeOfDay = '上午';
    } else if (hours < 18) {
        timeOfDay = '下午';
    } else {
        timeOfDay = '晚上';
    }

    
    settingTimeElement.textContent = `${timeOfDay} ${hours}:${minutes}:${seconds}`;
}

updateTime();

setInterval(updateTime, 1000);
