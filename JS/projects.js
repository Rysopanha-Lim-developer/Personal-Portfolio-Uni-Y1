//WeatherDisplay

const nameOfCity = document.getElementById("nameOfCity");
const temperature = document.getElementById("temperature");
const windSpeed = document.getElementById("windSpeed");
const cloud = document.getElementById("cloud");
const submitCityName = document.getElementById("submitCityName");
const cityNames = document.getElementById("cityInput");
const apiKey = "b789de110168301724ded8bbc8a9fcf1"

submitCityName.addEventListener("click", event => {
    event.preventDefault();
    event.target.style.color = "rgba(15, 23, 42, 0.5)"

    try{
        if(cityNames.value == ""){
            throw new Error("Input can't be empty!!"); 
        }
        Displayer(cityNames.value)
    }
    catch(error){
        nameOfCity.textContent = error;
        temperature.textContent = `Temperature:`;
        windSpeed. textContent = `Wind speed:`;
        cloud.textContent = `Sky/Cloud:`;
    }
})
submitCityName.addEventListener("mouseout", event => {
    event.target.style.color = "rgba(15, 23, 42, 1)"
})

async function DataFetcher(cityNames) {
    
    try{
        const responses = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNames}&appid=${apiKey}&units=metric`);

        if(!responses.ok){
            throw new Error("404 Not found")
        }
        const weatherDatas = await responses.json();

        const tempDatas = weatherDatas.main;
        const cloudDatas = weatherDatas.clouds;
        const windDatas = weatherDatas.wind;
        const nameDatas = weatherDatas.name

        return [tempDatas, cloudDatas, nameDatas, windDatas];
    }
    catch(error){
        nameOfCity.textContent = error;
        temperature.textContent = `Temperature:`;
        windSpeed. textContent = `Wind speed:`;
        cloud.textContent = `Sky/Cloud:`;
        return null;
    }
}

async function Displayer(cityNames) {
    
    const displayData = await DataFetcher(cityNames);
    
    const [tempDisplay, cloudDisplay, nameDisplay, windDisplay] = displayData;

    console.log(tempDisplay.temp)
    console.log(cloudDisplay.all)
    console.log(nameDisplay)
    console.log(windDisplay.speed)


    nameOfCity.textContent = `City: ${nameDisplay}`;
    temperature.textContent = `Temperature: ${tempDisplay.temp}°C`;
    windSpeed. textContent = `Wind speed: ${windDisplay.speed}m/s`;


    if(cloudDisplay.all >= 0 && cloudDisplay.all<= 10){
        cloud.textContent = `Sky/Cloud: Sunny`;
    }
    else if(cloudDisplay.all > 10 && cloudDisplay.all<= 50){
        cloud.textContent = "Sky/Cloud: Partly Cloudy";
    }
    else if(cloudDisplay.all > 50 && cloudDisplay.all<= 80){
        cloud.textContent = "Sky/Cloud: Cloudy";
    }
    else if(cloudDisplay.all > 80 && cloudDisplay.all<= 100){
        cloud.textContent = "Sky/Cloud: Overcast";
    }
}


//To do list project


//Digital clock project
const clockDisplay = document.querySelector("#clockDisplay");
const dateDisplay = document.querySelector("#dateDisplay")

setInterval(TimeDisplayer, 1000)

function getTimer(){

    let timeValues = new Date()

    let seconds = timeValues.getSeconds();
    let minutes = timeValues.getMinutes();
    let hours = timeValues.getHours();
    let days = timeValues.getDay();
    let months = timeValues.getMonth();
    let years = timeValues.getFullYear();

    return [seconds, minutes, hours, days, months, years]
}
function TimeDisplayer(){
    const displayDatas = getTimer();
    let [secondsValue, minutesValue, hoursValue, daysValue, monthsValue, yearsValue] = displayDatas;
    
    let dayNight = hoursValue >= 12 ? "PM":"AM"

    hoursValue = hoursValue % 12
    hoursValue = hoursValue.toString().padStart(2, 0);
    minutesValue = minutesValue.toString().padStart(2, 0);
    secondsValue = secondsValue.toString().padStart(2, 0);
    daysValue = daysValue.toString().padStart(2,0);
    monthsValue = monthsValue.toString().padStart(2,0);
    yearsValue = yearsValue.toString();

    dateDisplay.textContent = `${daysValue}/${monthsValue}/${yearsValue}`
    clockDisplay.textContent = `${hoursValue}:${minutesValue}:${secondsValue} ${dayNight}`
}