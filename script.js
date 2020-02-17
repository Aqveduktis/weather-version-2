/* 



  
Insert Comment 
*/

fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=2b9468766d0e54560c7e599762d2e80b').then((response) => {
    return response.json()
}).then((json) => {
    console.log(json)
    const times = (new Date(json.dt * 1000)).toUTCString().split(' ')
    const suny = [json.sys.sunrise, json.sys.sunset]
    console.log("sun", suny)
    const sunyNew = suny.map((item) => {
        return (new Date(item * 1000)).toUTCString().split(' ')
    })
    console.log(sunyNew)
    const sunyList = sunyNew.map((item) => {
        const clock = item[4].split(':')
        return `${clock[0]}:${clock[1]}`
    })
    console.log(sunyList)
    const noSecond = times[4].split(':')
    console.log(times)
    let weatherObject = {
        city: json.name,
        name: json.weather[0].main,
        description: json.weather[0].description,
        temp: `${(json.main.temp - 273.15).toFixed(1)}&#8451;`,
        weekDay: times[0].replace(',', ''),
        date: `${times[1]} ${times[2]}`,
        time: `${noSecond[0]}:${noSecond[1]}`,
        rise: sunyList[0],
        set: sunyList[1]
    }
  
   
    console.log("my object", weatherObject)
    const icons = {
        clouds: {image: "media/clouds.png", bgColor: '#809ea1', fontColor: '#F47775'},
        rain: {image: "media/rain.svg", bgColor: '#4b595e', fontColor: '#164A68'},
        clear: {image:  "media/clear.png", bgColor: '#6ac6f9', fontColor: '#2A5510'}
    }

    const pictures = () => {
        console.log("inside function", weatherObject.name)
        let choice = "blank"
        if (weatherObject.name === "Clouds") {
            choice = icons.clouds
        }
        else if (weatherObject.name === "Rain") {
            choice = icons.rain
        }
        else if (weatherObject.name === "Clear") {
            choice = icons.clear
        }
        else if (weatherObject.name === "Snow") {
            choice = icons.rain
        }
        console.log("image", choice)
        return choice
    }
    
    const myChoice = pictures()
    console.log(myChoice)
    const todayWeather = [json.main.temp, json.main.feels_like, json.main.temp_min, json.main.temp_max]
    const myToday = document.getElementById('todayWeather')
    myToday.style.backgroundColor = myChoice.bgColor
     document.getElementById('city').innerHTML = `<p>${weatherObject.city}</p><p>${weatherObject.date}</p>`
    document.getElementById('icon').src = myChoice.image
    document.getElementById('tempeture').innerHTML = `${weatherObject.temp}`
   
    document.getElementById('weather').innerHTML = `${weatherObject.description}`
    document.getElementById('sun').innerHTML += `<p>sunrise</p><p>${weatherObject.rise}</p><p>sunrise</p><p>${weatherObject.set}</p>`
     
    
    
})

fetch('https://api.openweathermap.org/data/2.5/forecast?q=London&appid=2b9468766d0e54560c7e599762d2e80b').then((response) => {
    return response.json()
}).then((jsonweek) => {
    console.log('week', jsonweek)
    console.log("day1", jsonweek.list[0])
    const weekTimes = (new Date(jsonweek.dt * 1000)).toUTCString().split(' ')

    const myFunc = () => {
        let dayListWeather = []
        jsonweek.list.forEach((item) => {
            const weekTime = (new Date(item.dt * 1000)).toUTCString().split(' ')
            console.log(weekTime)
            const y = item.dt_txt.split(' ')
            dayListWeather.push({ name: item.weather[0].main, description: item.weather[0].description, temp: ((item.main.temp - 273.15).toFixed(1)), weekDay: weekTime[0], month: weekTime[2], date: weekTime[1], time: y[1], wind: item.wind.speed })

        })
        return dayListWeather

    }
    const newArr = myFunc()
    console.log(newArr)
    const weatherShow = newArr.filter((item) => {
        return (item.time === "12:00:00")
    })
    console.log(weatherShow)

//const myTry = pictures()



    const weekText = document.getElementById('forecast')
    const fontCol = document.getElementById('headline').style.color
    const symbol = (weather) => {
        let img = 'X'
        if (weather === 'Clouds'){
            img = '&#9729;'
        }
        else if (weather === 'Rain'){
            img = '&#9730;'
        }
        else if (weather === 'Clear'){
            img = '&#9728;'
        }
        else {
            img =  '&#9733;'
        }
        
    return img
    }
    
    
    weatherShow.forEach((day, index, arr) => {
        const myIndex = index.toString()
      const myString = document.getElementById(myIndex)
        myString.innerHTML += `<p>${day.weekDay} ${day.month} ${day.date}</p><p>${symbol(day.name)} ${day.temp}&#8451;</p>`
        
        myString.style.borderTopColor = fontCol
        myString.style.borderTopStyle = 'dotted'
        myString.style.borderWidth = 'thin'
        
    })
    
})
