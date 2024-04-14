// Selects the form element in the html.
const searchForm = document.querySelector('#search-form');
const searchButton = document.querySelector('#search-button');
const cityButtons = document.querySelectorAll('.city-button');
const cardsSection = document.querySelector('#cards');
const dropDown = document.querySelector('#drop-down');
// variable for my api key.
const apiKey = 'b52d0dab464b966c275ec23279d9be7d';

dropDown.addEventListener('click', getLocalStorage);

function getLocalStorage() {
    // gets cities from local storage
    const cities = JSON.parse(localStorage.getItem('cities'));
    // clears the options 
    dropDown.innerHTML = "";
    // creates an option for each city saved in local storage
    for (i = 0; i < cities.length; i++) {
        let savedCity = cities[i];
        console.log(typeof savedCity);
        const option = document.createElement('option');
        option.textContent = savedCity;
        option.value = savedCity;
        dropDown.append(option);
    }
}

searchButton.addEventListener('click', handleSearchForm);
// function to get the coordinates of the city and place them as parameters into the forcast url.
function handleSearchForm(event) {
    event.preventDefault();
    cardsSection.innerHTML = '';

    const cityName = searchForm.searchInput.value;
    console.log(`City Name: ${cityName}`);
    console.log(typeof cityName);

    // Selects the input value
    // Alerts if no input was made.
    if (cityName === "") {
        window.alert("Please enter a city name");
        return
    }
    // Saves city name to local storage
    let cities = JSON.parse(localStorage.getItem('cities') || '[]');
    if (!cities.includes(cityName)) {
        cities.push(cityName);
    };
    localStorage.setItem('cities', JSON.stringify(cities));



    // API to find the coordinates of the city.
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

    // Fetch data from the weatherAPI
    fetch(weatherUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })

        // Variables for the latitude/longitude.
        .then(function (data) {
            let lat = data.city.coord.lat;
            let lon = data.city.coord.lon;
            console.log(lat);
            console.log(lon);
            const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            getWeatherData(forcastUrl);
        })
        .catch(function (error) {
            console.error('Error fetching city coordinates:', error);
        });
    // API to find the weather data based on the lon/lat parameters.

}
// Adds event listener to each button on the page.
cityButtons.forEach(cityButton => {

    cityButton.addEventListener('click', function () {
        // Clears the weather data
        cardsSection.innerHTML = '';

        cityButton = cityButton.textContent;
        console.log(`City Name: ${cityButton}`);
        console.log(typeof cityButton);

        // Selects the input value
        // Alerts if no input was made.
        if (cityButton === undefined) {
            window.alert("Please enter a city name");
            return
        }
        // API to find the coordinates of the city.
        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityButton}&appid=${apiKey}`;

        // Fetch data from the weatherAPI
        fetch(weatherUrl)
            .then(function (response) {
                if (!response.ok) {
                    throw response.json();
                }
                return response.json();
            })

            // Variables for the latitude/longitude.
            .then(function (data) {
                let lat = data.city.coord.lat;
                let lon = data.city.coord.lon;
                console.log(lat);
                console.log(lon);
                const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
                getWeatherData(forcastUrl);
            })
            .catch(function (error) {
                console.error('Error fetching city coordinates:', error);
            });
    });
});

function getWeatherData(forcastUrl) {
    fetch(forcastUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        // Access data and append to the document
        .then(function (data) {
            console.log(data);
            console.log(typeof data.city.name);



            const dailyCard = document.createElement('div');
            dailyCard.classList.add('daily-card');

            const dailyCity = document.createElement('h2');
            dailyCity.classList.add('daily-city');
            dailyCity.textContent = data.city.name;

            const dailyDay = document.createElement('h3');
            dailyDay.classList.add('daily-day');
            // dailyDay.textContent = dayjs.unix(data.list[0].dt).format("dddd");
            dailyDay.textContent = 'Today';

            const dailyDate = document.createElement('p');
            dailyDate.classList.add('daily-date');
            dailyDate.textContent = dayjs.unix(data.list[0].dt).format("MMMM DD, YYYY");

            const dailyIcon = document.createElement('img');
            dailyIcon.classList.add('daily-icon');
            let iconSource = data.list[0].weather[0].icon
            dailyIcon.src = `https://openweathermap.org/img/wn/${iconSource}@2x.png`;

            const dailyHumidity = document.createElement('p');
            dailyHumidity.classList.add('daily-Humidity');
            dailyHumidity.textContent = `Humidity: ${data.list[0].main.humidity}`;

            const dailyTemp = document.createElement('p');
            dailyTemp.classList.add('daily-Temp');
            dailyTemp.textContent = `Temperature: ${data.list[0].main.temp}F\u00B0`;

            const dailyWind = document.createElement('p');
            dailyWind.classList.add('daily-Wind');
            dailyWind.textContent = `Wind Speed: ${data.list[0].wind.speed}MPH`;

            dailyCard.append(dailyDay, dailyDate, dailyIcon, dailyHumidity, dailyTemp, dailyWind);

            cardsSection.append(dailyCity, dailyCard);

            const forecastTitle = document.createElement('h2');
            forecastTitle.classList.add('forecast-title');
            forecastTitle.textContent = "5 Day forecast";
            cardsSection.append(forecastTitle);
            // Loop thru 5 days
            for (i = 7; i < data.list.length; i += 8) {
                const forecastCard = document.createElement('div');
                forecastCard.classList.add('forecast-card');

                // const forecastCity = document.createElement('h2');
                // forecastCity.classList.add('forecast-name');
                // forecastCity.textContent = data.city.name;


                const forecastDay = document.createElement('h3');
                forecastDay.classList.add('forecast-date');
                forecastDay.textContent = dayjs.unix(data.list[i].dt).format("dddd");

                const forecastDate = document.createElement('p');
                forecastDate.classList.add('forecast-date');
                forecastDate.textContent = dayjs.unix(data.list[i].dt).format("MMMM DD, YYYY");

                const forecastIcon = document.createElement('img');
                forecastIcon.classList.add('forecast-icon');
                iconSource = data.list[i].weather[0].icon
                forecastIcon.src = `https://openweathermap.org/img/wn/${iconSource}@2x.png`;

                const forecastHumidity = document.createElement('p');
                forecastHumidity.classList.add('forecast-Humidity');
                forecastHumidity.textContent = `Humidity: ${data.list[i].main.humidity}`;

                const forecastTemp = document.createElement('p');
                forecastTemp.classList.add('forecast-Temp');
                forecastTemp.textContent = `Temperature: ${data.list[i].main.temp}F\u00B0`;

                const forecastWind = document.createElement('p');
                forecastWind.classList.add('forecast-Wind');
                forecastWind.textContent = `Wind Speed: ${data.list[i].wind.speed}MPH`;

                0
                forecastCard.append(forecastDay, forecastDate, forecastIcon, forecastHumidity, forecastTemp, forecastWind);

                cardsSection.append(forecastCard);
            }



        })
        .catch(function (error) {
            console.error('Error fetching weather data:', error);
        });
}




