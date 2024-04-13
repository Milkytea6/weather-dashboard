// Selects the form element in the html.
const searchForm = document.querySelector('#search-form');
const searchButton = document.querySelector('#search-button');
const cityButtons = document.querySelector('#city-buttons button');
const cardsSection = document.querySelector('#cards');
// variable for my api key.
const apiKey = 'b52d0dab464b966c275ec23279d9be7d';


// function to get the coordinates of the city and place them as parameters into the forcast url.
function handleSearchForm(event) {
    event.preventDefault();

    const cityName = searchForm.searchInput.value;
    console.log(`City Name: ${cityName}`);
    console.log(typeof cityName);

    // Selects the input value
    // Alerts if no input was made.
    if (cityName === undefined) {
        window.alert("Please enter a city name");
        return
    }


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
            const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
            getWeatherData(forcastUrl);
        })
        .catch(function (error) {
            console.error('Error fetching city coordinates:', error);
        });
    // API to find the weather data based on the lon/lat parameters.

}
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
            
            const dailyCard = document.createElement('div');
            dailyCard.classList.add('daily-card');

            const dailyCity = document.createElement('h2');
            dailyCity.classList.add('daily-name');
            dailyCity.textContent = data.city.name;

            const dailyDate = document.createElement('p');
            dailyDate.classList.add('daily-date');
            dailyDate.textContent = dayjs.unix(data.list[0].dt).format("MM-DD-YYYY");

            const dailyIcon = document.createElement('img');
            dailyIcon.classList.add('daily-icon');
            let iconSource = data.list[0].weather[0].icon
            dailyIcon.src = `https://openweathermap.org/img/wn/${iconSource}@2x.png`;

            const dailyHumidity = document.createElement('p');
            dailyHumidity.classList.add('daily-Humidity');
            dailyHumidity.textContent = data.list[0].main.humidity;
            
            const dailyTemp = document.createElement('p');
            dailyTemp.classList.add('daily-Temp');
            dailyTemp.textContent = data.list[0].main.temp;
            
            const dailyWind = document.createElement('p');
            dailyWind.classList.add('daily-Wind');
            dailyWind.textContent = data.list[0].wind.speed;

0
            dailyCard.append(dailyCity, dailyDate, dailyIcon, dailyHumidity, dailyTemp, dailyWind);

            cardsSection.append(dailyCard);
            // Loop thru 5 days
            for(i = 7; i < data.list.length; i += 8) {
                const forcastCard = document.createElement('div');
            forcastCard.classList.add('forcast-card');

            const forcastCity = document.createElement('h2');
            forcastCity.classList.add('forcast-name');
            forcastCity.textContent = data.city.name;

            const forcastDate = document.createElement('p');
            forcastDate.classList.add('forcast-date');
            forcastDate.textContent = dayjs.unix(data.list[i].dt).format("MM-DD-YYYY");

            const forcastIcon = document.createElement('img');
            forcastIcon.classList.add('forcast-icon');
            iconSource = data.list[i].weather[0].icon
            forcastIcon.src = `https://openweathermap.org/img/wn/${iconSource}@2x.png`;

            const forcastHumidity = document.createElement('p');
            forcastHumidity.classList.add('forcast-Humidity');
            forcastHumidity.textContent = data.list[i].main.humidity;
            
            const forcastTemp = document.createElement('p');
            forcastTemp.classList.add('forcast-Temp');
            forcastTemp.textContent = data.list[i].main.temp;
            
            const forcastWind = document.createElement('p');
            forcastWind.classList.add('forcast-Wind');
            forcastWind.textContent = data.list[i].wind.speed;

0
            forcastCard.append(forcastCity, forcastDate, forcastIcon, forcastHumidity, forcastTemp, forcastWind);

            cardsSection.append(forcastCard);
            }
            


        })
        .catch(function (error) {
            console.error('Error fetching weather data:', error);
        });
}

function inputCityButton(event) {
    const searchInput = document.getElementById('search-input');
    searchInput.textContent = cityButtons.textContent;
    handleSearchForm(event);
}

cityButtons.addEventListener('click', inputCityButton);

searchButton.addEventListener('click', handleSearchForm);

