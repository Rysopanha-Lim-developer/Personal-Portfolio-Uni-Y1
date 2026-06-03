//unitConverter project
const listVisibility = document.getElementById("listVisibility");
const temperature = document.getElementById("temperature-opt");
const weight = document.getElementById("weight-opt");
const speed = document.getElementById("speed-opt");

const leftUnits = [...document.querySelectorAll("#temperatureUnit #temperature1 li"),
    ...document.querySelectorAll("#weightUnit #weight1 li"),
    ...document.querySelectorAll("#speedUnit #speed1 li")];

const rightUnits = [...document.querySelectorAll("#temperatureUnit #temperature2 li"),
    ...document.querySelectorAll("#weightUnit #weight2 li"),
    ...document.querySelectorAll("#speedUnit #speed2 li")];

const choosenUnits = [...leftUnits];

const convertedToUnit = [...rightUnits]

//unitContainer list toggle
listVisibility.addEventListener("click", () =>{
    document.getElementById("listVisibility").classList.toggle("spin")
    weight.classList.toggle("showList");
    speed.classList.toggle("showList");
})

temperature.addEventListener("click", () => {
    temperature.style.border = "1.5px solid #0e0a0a"
    temperature.style.color = "#00F2FF";
    weight.style.border = "1.5px solid #00F2FF"
    weight.style.color = "#FFF"
    speed.style.border = "1.5px solid #00F2FF"
    speed.style.color = "#FFF"
    document.getElementById("temperatureUnit").classList.remove("invisible")
    document.getElementById("weightUnit").classList.remove("visible")
    document.getElementById("speedUnit").classList.remove("visible")
    choosenUnits.forEach(item => UnselectedCovertUnit(item))
    convertedToUnit.forEach(item => UnselectedCovertUnit(item))
})
weight.addEventListener("click", () => {
    weight.style.border = "1.5px solid #0e0a0a"
    weight.style.color = "#00F2FF";
    temperature.style.border = "1.5px solid #00F2FF"
    temperature.style.color = "#FFF"
    speed.style.border = "1.5px solid #00F2FF"
    speed.style.color = "#FFF"
    document.getElementById("temperatureUnit").classList.add("invisible")
    document.getElementById("weightUnit").classList.add("visible")
    document.getElementById("speedUnit").classList.remove("visible")
    choosenUnits.forEach(item => UnselectedCovertUnit(item))
    convertedToUnit.forEach(item => UnselectedCovertUnit(item))
})
speed.addEventListener("click", () => {
    speed.style.border = "1.5px solid #0e0a0a"
    speed.style.color = "#00F2FF";
    weight.style.border ="1.5px solid #00F2FF"
    weight.style.color = "#FFF"
    temperature.style.border = "1.5px solid #00F2FF"
    temperature.style.color = "#FFF"
    document.getElementById("temperatureUnit").classList.add("invisible")
    document.getElementById("weightUnit").classList.remove("visible")
    document.getElementById("speedUnit").classList.add("visible")
    choosenUnits.forEach(item => UnselectedCovertUnit(item))
    convertedToUnit.forEach(item => UnselectedCovertUnit(item))
})

//convertion option selection

function SelectedConvertUnit(item) {
    item.style.border = "2px solid #0e0a0a";
    item.style.color = "#00F2FF";
}
function UnselectedCovertUnit(item){
    item.style.border = "1.5px solid #00F2FF";
    item.style.color = "#FFF";
}

choosenUnits.forEach(selectedItem => {
    selectedItem.addEventListener("click", () => {

        choosenUnits.forEach(unselectedItem => {
            UnselectedCovertUnit(unselectedItem)
        });

        SelectedConvertUnit(selectedItem);
    });
});
convertedToUnit.forEach(selectedItem => {
    selectedItem.addEventListener("click", () => {

        convertedToUnit.forEach(unselectedItem => {
            UnselectedCovertUnit(unselectedItem)
        });
        
        SelectedConvertUnit(selectedItem);
    });
});