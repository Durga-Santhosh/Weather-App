let btn=document.querySelector(".btn");
let p=document.querySelector("p");
let input=document.querySelector(".inp");
let temp=document.querySelector(".tempvalue");
let cond=document.querySelector(".conduction");
let locat=document.querySelector(".locl");
let mainImg=document.querySelector("main");
let icon=document.querySelector(".weather-icon img");
//menu bar
let menu=document.querySelector(".menu1 i");
menu.addEventListener("click",()=>{
  document.querySelector(".menu2").style.transform="translateX(0px)";
  document.querySelector(".menu2").style.transition= "all 1s";
  menu.style.display="none";
  menu2.style.display="flex";
})
let menu2=document.querySelector(".menu p");
menu2.addEventListener("click",()=>{
  document.querySelector(".menu2").style.transform="translateX(170px)";
  document.querySelector(".menu2").style.transition= "all 1s";
  menu.style.display="flex";
  menu2.style.display="none"
})

//search function
btn.addEventListener("click", async ()=>{
    //displaying the pages
    document.querySelector(".message").style.display="none";
    document.querySelector("#hero").style.display="flex";
    document.querySelector("#weekly").style.display="flex";
    document.querySelector("#condations").style.display="flex";
    document.querySelector("#about").style.display="flex";
    mainImg.style.height="700px";



//API process
    let city=input.value;
    let url=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/$%7B${city}%7D?unitGroup=metric&key=3WEDWXF7P8MQX862ML7KH8237&contentType=json`;

    
  try {
    let response = await fetch(url);
    let data = await response.json();
   

    cond.innerText=data.currentConditions.conditions;
    temp.innerText=data.currentConditions.temp;
    locat.innerText=data.resolvedAddress;

    //Set Icons and Backgrounds

    if(data.currentConditions.icon==="rain"){
        mainImg.style.backgroundImage=`url(backgrounds/rain.gif)`;
        mainImg.style.zIndex=10;
        document.querySelector("#hero").style.backgroundImage=`url(backgrounds/rain.gif)`;
        icon.src=`condations/rain.png`;
    }
    else if(data.currentConditions.icon==="partly-cloudy-day"){
        mainImg.style.backgroundImage=`url(backgrounds/cloudyDay.jpg)`;
        document.querySelector("#hero").style.backgroundImage=`url(backgrounds/cloudyDay.jpg)`;
        icon.src=`condations/suncloud.png`;
    }
    else if(data.currentConditions.icon==="partly-cloudy-night"){
        mainImg.style.backgroundImage=`url(backgrounds/cloudyNight.jpg)`;
        document.querySelector("#hero").style.backgroundImage=`url(backgrounds/cloudyNight.jpg)`;
        document.querySelector("#hero").style.color="#FFDA3B";
        icon.src=`condations/cloudyNight.png`;
    }
    else if(data.currentConditions.icon==="clear-day"){
        mainImg.style.backgroundImage=`url(backgrounds/clearDay.jpg)`;
        document.querySelector("#hero").style.backgroundImage=`url(backgrounds/clearDay.jpg)`;
        icon.src=`condations/clearDay.png`;
    }
    else if(data.currentConditions.icon==="clear-night"){
        mainImg.style.backgroundImage=`url(backgrounds/clearNight.jpg)`;
        document.querySelector("#hero").style.backgroundImage=`url(backgrounds/clearNight.jpg)`;
        icon.src=`condations/clearNight.png`;
        document.querySelector("#hero").style.color="whitesmoke";
    }
    else if(data.currentConditions.icon==="cloudy"){
        mainImg.style.backgroundImage=`url(backgrounds/overcast.jpg)`;
        document.querySelector("#hero").style.backgroundImage=`url(backgrounds/overcast.jpg)`;
        icon.src=`condations/overcast.png`;
    }
    document.querySelector(".humidity").innerText=data.days[0].humidity;
    document.querySelector(".winspeed").innerText=data.currentConditions.windspeed;

    //today condition
    document.querySelector(".feellk").innerText=data.currentConditions.feelslike;
    document.querySelector(".visib").innerText=data.currentConditions.visibility;
    document.querySelector(".sunrise-at").innerText=data.currentConditions.sunrise;
    document.querySelector(".sunset-at").innerText=data.currentConditions.sunset;
    document.querySelector(".mintep").innerText=data.days[0].tempmin;
    document.querySelector(".maxtep").innerText=data.days[0].tempmax;



   //weekly conduction
 
   for (let i = 0; i < 7; i++) {
    const now = new Date(data.days[i+1].datetime);
    const dayIndex = (now.getDay() + 6) % 7; 
    const dWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const weekheadElement = document.querySelector(`.day${i+1} .weekhead`);
    if (weekheadElement) {
        weekheadElement.innerText = dWeek[dayIndex];
    }

}

//icons changing
const iconMap = {
    "clear-day": "condations/clearDay.png",
    "rain": "condations/rain.png",
    "partly-cloudy-night": "condations/cloudyNight.png",
    "partly-cloudy-day": "condations/suncloud.png",
    "cloudy": "condations/overcast.png",
    "clear-night": "condations/clearNight.png",
  };
  

  for (let i = 0; i < 7; i++) {
    const imgElement = document.querySelector(`.day${i} img`);
    if (imgElement && iconMap[data.days[i].icon]) {
      imgElement.src = iconMap[data.days[i].icon];
    }


  // Update the inner text of the elements for min and max temperatures
  const minElement = document.querySelector(`.min${i}`);
  const maxElement = document.querySelector(`.max${i}`);

  if (minElement) {
    minElement.innerText = data.days[i].tempmin;
  } 

  if (maxElement) {
    maxElement.innerText = data.days[i].tempmax;
  } 
 
 }
 //condition changing
 for (let i = 0; i < data.days.length; i++) {
  const conditi = document.querySelector(`.day${i} .condi`); // Assuming "day{i}" is a class
  if (conditi) {
    conditi.innerText = data.days[i].conditions;
  } 
}
}
//error handling
catch (error) {
  console.error("Error fetching weather data:", error);
  alert("Failed to fetch weather data. Please try again later.");
}
})

// let datetimeEpoch = 1726964406;
// let date = new Date(datetimeEpoch * 1000);
// // console.log(date.toString());
// let formattedDate = date.toLocaleTimeString();
// console.log(formattedDate);
// console.log("-----------------------------------------");
// const now = new Date();
// const day = now.getDay(); // returns a number representing the day of the week, starting with 0 for Sunday
// const hours = now.getHours();
// const minutes = now.getMinutes();
// const time = Number(`${hours}`);
// if(time>=18)
// {
//     console.log("yes");
// }
// else{
//     console.log("no");
// }
// console.log(`Today is day ${day} and the time is ${hours}:${minutes}.`);

// let datetimeEpoch = 1726964406;
// let date = new Date(datetimeEpoch * 1000);
// console.log(date.toString());
// let formattedDate = date.toLocaleTimeString();
// console.log(formattedDate);

// console.log("-------------------------------------------");
