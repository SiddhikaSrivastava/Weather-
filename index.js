const apiKey = "5be93f387827f2ce0f56a9ea8aa30bbe"
// apikey open from openweather API 

const weatherDataEle = document.querySelector(".weather-data")
// ek variable create kra hai weatherDataEle k naam se aur humare data ko select krne k liye div i.e.  .weather-data ko select krange it show us the data kile icon, temp, desc, details 
const cityNameEle = document.querySelector("#city-name")
// ek variable create kra hai cityNameEle k naam se aur usme access krne k liye id denge city-name wale input ko 
const formEle = document.querySelector("form")
const imgIcon = document.querySelector(".icon")

formEle.addEventListener("submit", (e)=>{
  // formEle mai ek event legayange jo ki hai submit 
    e.preventDefault()

    const cityValue = cityNameEle.value

    getWeatherData(cityValue)
})

// now create a function with getweatherdata 
async function getWeatherData(cityValue){
    try{
      // to featch the data from the api we use the featch meathod 
      // response ek variable hai jo ki fetch data ko store krega 
      // await means to wait till it don't get the data from featch and when we use await we also have to use async
        const response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)

        if(!response.ok){
            throw new Error("Network response is not ok!")
        }
        // if network response is not ok!



        // now response data is converted into json so
        // this converts the response into json and store it into the data 
        const data = await response.json()
        // console.log(data);



        // to access the data 
        const temprature = Math.floor(data.main.temp)
        // data k ander jo main hai aur uske ander jo temp hai give that value but that value is comming in decimal so we round off the value by using Math.floor and store irt in temperatur variable 
        const description = data.weather[0].description
        const icon = data.weather[0].icon

        const details = [
            `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]

        weatherDataEle.querySelector(".temp").textContent = `${temprature}°C`
        // it helps to access the .temp class and convert the textContent into degreeC
        weatherDataEle.querySelector(".desc").textContent = `${description}`
        // it helps to access the .desc class 
        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`

        weatherDataEle.querySelector(".details").innerHTML = details.map((detail)=>{
           return `<div>${detail}</div>`
        }).join("")

    }catch(err){
        weatherDataEle.querySelector(".temp").textContent = ""
        imgIcon.innerHTML = ""
        weatherDataEle.querySelector(".desc").textContent = "An Error Occurred!"

    }

}