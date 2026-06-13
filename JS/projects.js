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

const addTasks = document.getElementById("taskInput-submit");
const taskInput = document.getElementById("taskInput");
const mondayList = document.getElementById("mondayList");

pageReload()

addTasks.addEventListener("click", event =>{
    event.preventDefault()
    
    AddNewTask()
})

function AddNewTask(){

    if(taskInput.value !== ''){

        const mondayTask = taskInput.value.replace("Delete", "").trim()
        console.log(mondayTask)


        CreateNewTask(mondayTask)
        TaskDataBase()

        taskInput.value = ""
    }
}

function CreateNewTask(task){
    const newTask = document.createElement("li")
    newTask.classList = "tasks"
    newTask.textContent = task

    const deletebtn = document.createElement("button")
    deletebtn.classList = "delete-btn"
    deletebtn.textContent = "Delete"

    newTask.append(deletebtn)

    mondayList.appendChild(newTask)

    deletebtn.addEventListener("click", ()=>{

        mondayList.removeChild(newTask)

        TaskDataBase()

    })
}

function TaskDataBase(){
    let allTasks = [];
    mondayList.querySelectorAll("li").forEach(e => {
        allTasks.push(e.textContent.trim().replace("Delete", ""))
    })
    localStorage.setItem("everyTasks", JSON.stringify(allTasks))

}

function pageReload(){
    const reloadedData = JSON.parse(localStorage.getItem("everyTasks")) || []

    reloadedData.forEach(CreateNewTask)
}


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

// Simple calulator project

const number = document.querySelectorAll(".number");
const sign = document.querySelectorAll(".sign");
const calculatorInput = document.querySelector("#calculatorInput");
const percent = document.getElementById("percent");
const ce = document.getElementById("ce");
const ca = document.getElementById("ca");
const clear = document.getElementById("clear");
const half = document.getElementById("half");
const power = document.getElementById("power");
const root = document.getElementById("root");
const chageSign = document.getElementById("chageSign");
const equalSign = document.getElementById("equalSign");
const maxLength = 15;
let calNum = null;

// Define what is "allowed"
const allowedKeys = "0123456789+-*/.";

calculatorInput.addEventListener("keydown", event => {
    if (allowedKeys.includes(event.key)) {
        appendValue(event.key);
    } else if (event.key === "Enter" || event.key === "=") {
        calculate();
    } else if (event.key === "Backspace") {
        calculatorInput.value = calculatorInput.value.slice(0, -1);
    }
});

function appendValue(value) {
    if (calculatorInput.value.length < maxLength) {
        calculatorInput.value += value;
    }
}

function calculate() {
    try {
        calculatorInput.value = eval(calculatorInput.value).toFixed(2);
    } catch {
        calculatorInput.value = "Error";
    }
}

clear.onclick = function(){
    calculatorInput.textContent = "";
    calculatorInput.value = calculatorInput.textContent
}
ce.onclick = function(){
    calculatorInput.textContent = "";
    calculatorInput.value = calculatorInput.textContent
}
ca.onclick = function(){
    calculatorInput.value = calculatorInput.value.slice(0, -1)
}

number.forEach(item => {
    item.onclick = function(){
        if(calculatorInput.value.length < maxLength){
            calculatorInput.value += this.textContent; 
        }
        else{
            calculatorInput.value += "";
        }
    }
})

sign.forEach(item => {
    item.onclick = function(){
        if(calculatorInput.value.length < maxLength){
            calculatorInput.value += this.textContent; 
        }
        else{
            calculatorInput.value += "";
        }
    }
})

if(calculatorInput.value.length < maxLength){
    percent.onclick = function(){
        calNum = Number(calculatorInput.value)
        calculatorInput.value = (calNum/100)
    }
    half.onclick = function(){
        calNum = Number(calculatorInput.value)
        calculatorInput.value = calNum/2
    }
    power.onclick = function(){
        calNum = Number(calculatorInput.value)
        calculatorInput.value = (calNum ** 2).toFixed(2)
    }
    root.onclick = function(){
        calNum = Number(calculatorInput.value)
        calNum = Math.sqrt(calNum).toFixed(2)
        calculatorInput.value = calNum
    }
    chageSign.onclick = function(){
        calNum = Number(calculatorInput.value)
        calculatorInput.value = -calNum
    }
}

equalSign.onclick = function(){
    try {
        calculatorInput.value = eval(calculatorInput.value).toFixed(2);
    } catch (error) {
        calculatorInput.value = "Error";
    }
}

//Password generator

const uppercaseChars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const lowercaseChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const numberChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbolChars = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "{", "}", "[", "]", "|", ":", ";", "<", ">", ",", ".", "?", "/"];

const everything = [...uppercaseChars, ...lowercaseChars, ...numberChars, ...symbolChars];

const chars4 = document.getElementById("chars-4");
const chars8 = document.getElementById("chars-8");
const chars12 = document.getElementById("chars-12");
const chars15 = document.getElementById("chars-15");
const passwordLength = document.querySelectorAll(".password-length")
const generateBtn = document.getElementById("generate-password-btn")
const passwordDisplay = document.getElementById("generated-password")
let chosenLength = null;

passwordLength.forEach(length => {
    length.addEventListener("click", event => {
        chosenLength = event.target.id
    })
})
generateBtn.addEventListener("click", ()=>{
    if(chosenLength === "chars-4"){
        console.log(chosenLength)
        const fourLongPassword = GenerateFourCharsPassword(everything)
        passwordDisplay.textContent = fourLongPassword
    }
    else if(chosenLength === "chars-8"){
        console.log(chosenLength)
        const eightLongPassword = GenerateEightCharsPassword(everything)
        passwordDisplay.textContent = eightLongPassword

    }
    else if(chosenLength === "chars-12"){
        console.log(chosenLength)
        const tweleLongPassword = GenerateTweleCharsPassword(everything)
        passwordDisplay.textContent = tweleLongPassword
    }
    else if(chosenLength === "chars-15"){
        console.log(chosenLength)
        const fifteenLongPassword = GenerateFifteenCharsPassword(everything)
        passwordDisplay.textContent = fifteenLongPassword
    }
})

function GenerateFourCharsPassword(everything){
    const maxPasswordLength = 4;
    let generatedPassword = ""
    for(let i=0; i<maxPasswordLength; i++){
        const randomChars = Math.floor(Math.random()* (everything.length))
        generatedPassword += everything[randomChars]
    }
    return generatedPassword;
}

function GenerateEightCharsPassword(everything){
    const maxPasswordLength = 8;
    let generatedPassword = ""
    for(let i=0; i<maxPasswordLength; i++){
        const randomChars = Math.floor(Math.random()* (everything.length))
        generatedPassword += everything[randomChars]
    }
    return generatedPassword;
}

function GenerateTweleCharsPassword(everything){
    const maxPasswordLength = 12;
    let generatedPassword = ""
    for(let i=0; i<maxPasswordLength; i++){
        const randomChars = Math.floor(Math.random()* (everything.length))
        generatedPassword += everything[randomChars]
    }
    return generatedPassword;
}

function GenerateFifteenCharsPassword(everything){
    const maxPasswordLength = 15;
    let generatedPassword = ""
    for(let i=0; i<maxPasswordLength; i++){
        const randomChars = Math.floor(Math.random()* (everything.length))
        generatedPassword += everything[randomChars]
    }
    return generatedPassword;
}


//Guessing game

const chancesLeft = document.getElementById("chancesleft");
const gameResult = document.getElementById("game-result");
const randomNumbersInput = document.getElementById("randomNumbersInput");
const randomNumbersSubmit = document.getElementById("randomNumbersSubmit");
const randomNumbersReset = document.getElementById("randomNumbersReset")
let engineOutPut = Math.floor((Math.random()*100)+1)
let maxAttempts = 3;
let usedAttempt= 1;
console.log(engineOutPut)

randomNumbersSubmit.addEventListener("click", ()=>{
    const userRandomNums = randomNumbersInput.value;
    GuessingGameEngine(userRandomNums)
})
randomNumbersReset.addEventListener("click", ()=>{
    maxAttempts = 3;
    usedAttempt = 1;
    chancesLeft.textContent = `You have ${maxAttempts} left`
    gameResult.textContent = "."
    randomNumbersInput.value = ""
    engineOutPut = Math.floor((Math.random()*100)+1)
})

function GuessingGameEngine(randomNums){
    randomNums = Number(randomNums);
    
    if(usedAttempt < maxAttempts){
        if(randomNums === engineOutPut){
            gameResult.textContent = `You Win`
        }
        else{
            maxAttempts --;
            chancesLeft.textContent = `You have ${maxAttempts} left`
            gameResult.textContent = `Try again`
        }
    }
    else{
        chancesLeft.textContent = `You Lose`
        gameResult.textContent = `The number is ${engineOutPut}`
    }
}

//Rock Paper Scissor

const icon1 = document.querySelectorAll(".icon1");
const icon2 = document.querySelectorAll(".icon2");
const startbtnRPS = document.getElementById("startbtn-RPS");
const againbtnRPS = document.getElementById("againbtn-RPS");
const rock1 = document.getElementById("rock1");
const paper1 = document.getElementById("paper1");
const scissor1 = document.getElementById("scissor1");
const report = document.getElementById("report")
let playerChoices;

icon2.forEach(icon =>{
    icon.addEventListener("click", ()=>{
        switch (icon.id) {
            case "rock2":
                playerChoices = 1
                break;
            case "paper2":
                playerChoices = 2
                break;
            case "scissor2":
                playerChoices = 3
                break;
        }
    })
})

startbtnRPS.addEventListener("click", ()=>{
    RockPaperScissorEngine()
    startbtnRPS.disabled = true
    startbtnRPS.style.cursor = "not-allowed"
})
againbtnRPS.addEventListener("click", ()=>{
    playerChoices = null;
    icon1.forEach(icon =>{
        icon.classList.remove("clicked")
    })
    icon2.forEach(icon =>{
        icon.classList.remove("clicked")
    })
    startbtnRPS.disabled = false
    startbtnRPS.style.cursor = "pointer"
    report.textContent = "Choose your choice"
})



function RockPaperScissorEngine(){
    const computerValue = Math.floor((Math.random()*3)+1)
    switch (computerValue) {
        case 1:
            rock1.classList.add("clicked")
            ResultChecker(1)
            break;
        case 2:
            paper1.classList.add("clicked")
            ResultChecker(2)
            break;
        case 3:
            scissor1.classList.add("clicked")
            ResultChecker(3)
            break;
    }
}

function ResultChecker(computerValue){
    if(playerChoices == 1){
        if(computerValue == 1){
            report.textContent = "Draw"
        }
        else if(computerValue == 2){
            report.textContent = "You Lose"
        }
        else if(computerValue == 3){

            report.textContent = "You Win"
        }
    }
    else if(playerChoices == 2){
        if(computerValue == 1){
            report.textContent = "You Win"
        }
        else if(computerValue == 2){
            report.textContent = "Draw"
        }
        else if(computerValue == 3){
            report.textContent = "You Lose"
        }
    }
    else if(playerChoices == 3){
        if(computerValue == 1){
            report.textContent = "You Lose"     
        }
        else if(computerValue == 2){
            report.textContent = "You Win"
        }
        else if(computerValue == 3){
            report.textContent = "Draw"
        }
    }
}