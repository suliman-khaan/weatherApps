let load = document.querySelector(".loading");
let content = document.querySelector(".card-content");
let error = document.querySelector(".error");
let errMsg = document.querySelector(".error span");
let form = document.querySelector(".form button");
let input = document.querySelector(".input");
let main = document.querySelector(".main");
let temp = document.querySelector("#temp");
let stat = document.querySelector("#weather_status");
let icon = document.querySelector("#icon").attributes.src;
let wname = document.querySelector("#name");
let tomorrow = document.querySelector("#tomorrow");
let nextTomorrow = document.querySelector("#nextTomorrow");
let today = document.querySelector("#temp_now");
let today_st = document.querySelector("#ws_now");
let nextDay = document.querySelector("#temp_next");
let next_st = document.querySelector("#ws_next");
let wallpaper = [
    "linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)), center / cover no-repeat url(asset/img/sun.jpg)",
    "linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)), center / cover no-repeat url(asset/img/cloud.jpg)",
    "linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)), center / cover no-repeat url(asset/img/rain.jpg)"
]
let iconList = [
    'asset/icon/sun.png',
    'asset/icon/cloudy.png',
    'asset/icon/rain.png',
    'asset/icon/snow.png',
]
let loadTime = () => {
    const now = new Date();
    const getCurrentDay = (x = 0) => {
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Firday";
        weekday[6] = "Saturday";
        let m = now.getDay();
        let n = m + x;
        let day = weekday[n == 7 ? 0 : n == 8 ? 1 : n];

        return day;
    };
    tomorrow.innerHTML = `${getCurrentDay(1)}`;
    nextTomorrow.innerHTML = `${getCurrentDay(2)}`;
}

window.addEventListener('load', () => {
    load.style.display = "none";
    content.style.display = "flex";
    api();
})

// console.log(query);


form.addEventListener('click', (e) => {
    e.preventDefault();
    let query = input.value;
    if (query != '') {
        content.style.display = "flex";
        api(query);
    } else {
        content.style.display = "none";
        error.style.display = "block";
        errMsg.innerHTML = "Enter City name";
        input.focus()
        console.log("Empty....")
    }
})
let api = async (query = 'mingora') => {
    try {
        await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${query}&cnt=5&units=metric&appid=83f4391b048e0902d0dc8b2603a27b4c`)
            .then(res => res.json())
            .then(res => {
                if (res.cod == '200' || res.cod <= '299') {
                    content.style.display = "flex";
                    error.style.display = "none";
                    loadTime();
                    //main Today
                    temp.innerHTML = `${Math.floor(res.list[0].main.temp)}&deg;`;
                    stat.innerHTML = `${res.list[0].weather[0].main}`;
                    //tomorrow
                    today_st.innerHTML = `${res.list[1].weather[0].main}`;
                    today.innerHTML = `${Math.floor(res.list[1].main.temp)}&deg;`;
                    //nextTomorrow
                    nextDay.innerHTML = `${Math.floor(res.list[2].main.temp)}&deg;`;
                    next_st.innerHTML = `${res.list[2].weather[0].main}`;
                    //name
                    wname.innerHTML = `${res.city.name}, ${res.city.country}`;
                    if (res.list[0].weather[0].main == "Clouds") {
                        main.style.background = wallpaper[1];
                        icon.value = iconList[1];
                    }
                    if (res.list[0].weather[0].main == "Clear") {
                        main.style.background = wallpaper[0];
                        icon.value = iconList[0];
                    }
                    if (res.list[0].weather[0].main == "Rain") {
                        main.style.background = wallpaper[2];
                        icon.value = iconList[2];
                    }
                    if (res.list[0].weather[0].main == "Snow") {
                        main.style.background = wallpaper[2];
                        icon.value = iconList[3];
                    }
                    console.log(res.cod);
                } else if (res.cod == '400' || res.cod <= '499') {
                    errMsg.innerText = "City not found!";
                    content.style.display = "none";
                    error.style.display = "block";
                    console.log(res.cod);
                }
            }).catch(err => {
                console.log("This is calling error: " + err.message);
                // content.style.display = "none";
                errMsg.innerText = err.message;
                throw err;
                // console.log()
            })
    } catch (error) {
        console.log("This is calling error: " + error);
    }
}
// api();