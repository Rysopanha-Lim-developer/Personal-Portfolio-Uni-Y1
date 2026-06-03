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
    let days = timeValues.getDate();
    let months = timeValues.getMonth() + 1; // the +1 is to get current month
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


//digital timer project

const timerDisplayer = document.getElementById("timerDisplayer")


let startTime = 0;
let elaspedTime = 0;
let switcher = true;
let timeUpdate = null;

document.getElementById("startBtn").addEventListener("click", Starter);
document.getElementById("stopBtn").addEventListener("click", Stopper);
document.getElementById("resetBtn").addEventListener("click", Reseter);

function Starter(){
    if(switcher){
        switcher = false
        startTime = Date.now() - elaspedTime;
        timeUpdate = setInterval(TimerDisplay, 10)
    } 
}

function Stopper(){
    if(!switcher){
        switcher = true
        clearInterval(timeUpdate)
    }
}

function Reseter(){
    if(!switcher){
        switcher = true;
        clearInterval(timeUpdate)
        timerDisplayer.textContent = '00:00:00:00'
        startTime = 0;
        elaspedTime = 0;
    }
}

function TimerDisplay(){
    let currentTime = Date.now()

    elaspedTime = currentTime - startTime;

    let milisecondsTime = Math.floor(elaspedTime % 1000)
    let secondsTime = Math.floor((elaspedTime/1000)% 60)
    let minutesTime = Math.floor((elaspedTime/(1000*60))%60)
    let hoursTime = Math.floor((elaspedTime/(1000*60*60)))

    milisecondsTime = milisecondsTime.toString().padStart(3, 0)
    secondsTime = secondsTime.toString().padStart(2,0)
    minutesTime = minutesTime.toString().padStart(2,0)
    hoursTime = hoursTime.toString().padStart(2,0)

    timerDisplayer.textContent = `${hoursTime}:${minutesTime}:${secondsTime}:${milisecondsTime}`
}


//Unit converter project

const leftUnits = [...document.querySelectorAll("#temperatureUnit #temperature1 li"),
    ...document.querySelectorAll("#weightUnit #weight1 li"),
    ...document.querySelectorAll("#speedUnit #speed1 li")];

const rightUnits = [...document.querySelectorAll("#temperatureUnit #temperature2 li"),
    ...document.querySelectorAll("#weightUnit #weight2 li"),
    ...document.querySelectorAll("#speedUnit #speed2 li")];

const choosenUnits = [...leftUnits];

const convertedToUnit = [...rightUnits];


const submitConvertionForm = document.getElementById("submitConvertionForm");

const unitOpts = [...document.querySelectorAll(".unit-opts")];

let MainUnitSelection = null;
let LeftUnit = null;
let RightUnit = null;


unitOpts.forEach(unit => {
        unit.addEventListener("click", () => {
            MainUnitSelection = unit.textContent;
        })
})
choosenUnits.forEach(unit => {
        unit.addEventListener("click", () => {
            LeftUnit = unit.textContent;
        })
})
convertedToUnit.forEach(unit => {
        unit.addEventListener("click", () => {
            RightUnit = unit.textContent;
        })
})


submitConvertionForm.addEventListener("click", event => {
    event.preventDefault()

    const unitInput = document.getElementById("unitInput").value;
    const selectedMainUnit = MainUnitSelection;

    TakeInBothUserInputAndSelectedMainUnit(selectedMainUnit,unitInput)
})


function TakeInBothUserInputAndSelectedMainUnit(pickedMainUnit,userInput){
    try{
        if(pickedMainUnit === null){
            throw new Error("Please section a Unit");
        }
        switch (pickedMainUnit) {
            case "Temperature":
                TemperatureUnitConverter(userInput);
                console.log(`You have picked ${pickedMainUnit}`);
                break;
            case "Weight":
                WeightUnitConverter(userInput);
                console.log(`You have picked ${pickedMainUnit}`);
                break;
            case "Speed":
                SpeedUnitConverter(userInput);
                console.log(`You have picked ${pickedMainUnit}`);
                break;
        }
    }
    catch(error){
        document.getElementById("convertionResult").textContent = error
    }
}

//Convertion selection
function TemperatureUnitConverter(inputValue){
    const selectedLeftUnit = LeftUnit;
    const selectedRightUnit = RightUnit;

    try{
        
        if(selectedLeftUnit === null || selectedRightUnit === null || selectedLeftUnit === selectedRightUnit){
            throw new Error("Please select 2 different choices");
        }

        if(inputValue === ""){
            throw new Error("Input cannot be empty");
        }

        if(isNaN(Number(inputValue))){
            throw new Error("Input must be a number");
        }  

        if(selectedLeftUnit === "Celsius" && selectedRightUnit === "Kelvin"){
            CelciusToKelvin(inputValue)
        }
        else if(selectedLeftUnit === "Celsius" && selectedRightUnit === "Fahrenheit"){
            CelciusToFahrenheit(inputValue)
        }
        else if(selectedLeftUnit === "Kelvin" && selectedRightUnit === "Celsius"){
            KelvinToCelcius(inputValue)
        }
        else if(selectedLeftUnit === "Kelvin" && selectedRightUnit === "Fahrenheit"){
            KelvinToFahrenheit(inputValue)
        }
        else if(selectedLeftUnit === "Fahrenheit" && selectedRightUnit === "Celsius"){
            FahrenheitToCelcius(inputValue)
        }
        else if(selectedLeftUnit === "Fahrenheit" && selectedRightUnit === "Kelvin"){
            FahrenheitToKelvin(inputValue)
        }  
    }
    catch(err){
        console.error(err)
        document.getElementById("convertionResult").textContent = err
    }
}
function SpeedUnitConverter(inputValue){
    const selectedLeftUnit = LeftUnit;
    const selectedRightUnit = RightUnit;

    try{
        
        if(selectedLeftUnit === null || selectedRightUnit === null || selectedLeftUnit === selectedRightUnit){
            throw new Error("Please select 2 different choices");
        }

        if(inputValue === ""){
            throw new Error("Input cannot be empty");
        }
        
        if(isNaN(Number(inputValue))){
            throw new Error("Input must be a number");
        }  

        if(selectedLeftUnit === "Km/h" && selectedRightUnit === "mph"){
            KmPerHToMph(inputValue)
        }
        else if(selectedLeftUnit === "Km/h" && selectedRightUnit === "m/s"){
            KmPerHToMPerSec(inputValue)
        }
        else if(selectedLeftUnit === "mph" && selectedRightUnit === "Km/h"){
            MphToKmPerH(inputValue)
        }
        else if(selectedLeftUnit === "mph" && selectedRightUnit === "m/s"){
            MphToMPerSec(inputValue)
        }
        else if(selectedLeftUnit === "m/s" && selectedRightUnit === "Km/h"){
            MPerSecToKmPerH(inputValue)
        }
        else if(selectedLeftUnit === "m/s" && selectedRightUnit === "mph"){
            MPerSecToMph(inputValue)
        }  
    }
    catch(err){
        console.error(err)
        document.getElementById("convertionResult").textContent = err
    }
}
function WeightUnitConverter(inputValue){
    const selectedLeftUnit = LeftUnit;
    const selectedRightUnit = RightUnit;

    try{
        
        if(selectedLeftUnit === null || selectedRightUnit === null || selectedLeftUnit === selectedRightUnit){
            throw new Error("Please select 2 different choices");
        }

        if(inputValue === ""){
            throw new Error("Input cannot be empty");
        }
        
        if(isNaN(Number(inputValue))){
            throw new Error("Input must be a number");
        } 

        if(selectedLeftUnit === "Kilogram(Kg)" && selectedRightUnit === "Pound(lbs)"){
            KiloToPound(inputValue)
        }
        else if(selectedLeftUnit === "Kilogram(Kg)" && selectedRightUnit === "Stone(st)"){
            KiloToStone(inputValue)
        }
        else if(selectedLeftUnit === "Pound(lbs)" && selectedRightUnit === "Kilogram(Kg)"){
            PoundToKilo(inputValue)
        }
        else if(selectedLeftUnit === "Pound(lbs)" && selectedRightUnit === "Stone(st)"){
            PoundToStone(inputValue)
        }
        else if(selectedLeftUnit === "Stone(st)" && selectedRightUnit === "Kilogram(Kg)"){
            StoneToKilo(inputValue)
        }
        else if(selectedLeftUnit === "Stone(st)" && selectedRightUnit === "Pound(lbs)"){
            StoneToPound(inputValue)
        }  
    }
    catch(err){
        console.error(err)
        document.getElementById("convertionResult").textContent = err
    }
}


//Temp convertion formula
function CelciusToKelvin(celcius){
    let kelvin = (Number(celcius) + 273).toFixed(3)
    document.getElementById("convertionResult").textContent = `Result: ${kelvin}K`;
};
function CelciusToFahrenheit(celcius){
    let fahrenheit = ((Number(celcius) * (9/5))+32).toFixed(3)
    document.getElementById("convertionResult").textContent = `Result: ${fahrenheit}°F`;
};
function KelvinToCelcius(kelvin){
    let celcius = (Number(kelvin) - 273).toFixed(3)
    document.getElementById("convertionResult").textContent = `Result: ${celcius}°C`;
};
function KelvinToFahrenheit(kelvin){
    let fahrenheit = (((Number(kelvin) - 273)*(9/5))+32).toFixed(3)
    document.getElementById("convertionResult").textContent = `Result: ${fahrenheit}°F`;
};
function FahrenheitToCelcius(fahrenheit){
    let celcius = ((Number(fahrenheit) - 32)*(5/9)).toFixed(3)
    document.getElementById("convertionResult").textContent = `Result: ${celcius}°C`;
};
function FahrenheitToKelvin(fahrenheit){
    let kelvin = (((Number(fahrenheit) - 32)*(5/9)+273)).toFixed(3)
    document.getElementById("convertionResult").textContent = `Result: ${kelvin}K`;
};

//Weight covertion formula
function KiloToPound(kilo){
    let pound = (Number(kilo)*2.205).toFixed(3);
    document.getElementById("convertionResult").textContent = `Result: ${pound}lbs`;
};
function KiloToStone(kilo){
    let stone = (Number(kilo)/6.35).toFixed(3);
    document.getElementById("convertionResult").textContent = `Result: ${stone}st`;
};
function PoundToKilo(pound){
    let kilo = (Number(pound)/2.205).toFixed(3);
    document.getElementById("convertionResult").textContent = `Result: ${kilo}kg`;
};
function PoundToStone(pound){
    let stone = (Number(pound)/14).toFixed(3);
    document.getElementById("convertionResult").textContent =  `Result: ${stone}st`;
};
function StoneToKilo(stone){
    let kilo = (Number(stone)*6.35).toFixed(3);
    document.getElementById("convertionResult").textContent = `Result: ${kilo}kg`;
};
function StoneToPound(stone){
    let pound = (Number(stone)*14).toFixed(3);
    document.getElementById("convertionResult").textContent = `Result: ${pound}lbs`;
};


//Speed convertion formula
function KmPerHToMph(kmperH){
    let mph = (Number(kmperH)/1.609).toFixed(3);
    document.getElementById("convertionResult").textContent = `Result: ${mph}mph`;
};
function KmPerHToMPerSec(KmperH){
    let mPerS = (Number(KmperH)/3.6).toFixed(3);
    document.getElementById("convertionResult").textContent = `Result: ${mPerS}m/s`;
};
function MphToKmPerH(mph){
    let kmPerH = (Number(mph)*1.609).toFixed(3);
    document.getElementById("convertionResult").textContent = `Result: ${kmPerH}Km/h`;
};
function MphToMPerSec(mph){
    let mPerSec = (Number(mph)/2.237).toFixed(3);
    document.getElementById("convertionResult").textContent = `Result: ${mPerSec}m/s`;
};
function MPerSecToKmPerH(mPerSec){
    let kmPerH = (Number(mPerSec)*3.6).toFixed(3);
    document.getElementById("convertionResult").textContent = `Result: ${kmPerH}Km/h`;
};
function MPerSecToMph(mPerSec){
    let mph = (Number(mPerSec)*2.237).toFixed(3);
    document.getElementById("convertionResult").textContent =`Result: ${mph}mph`;
};
