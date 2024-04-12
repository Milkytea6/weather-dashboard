// Selects the form element in the html.
const searchForm = document.querySelector('#search-form');
const searchButton = document.querySelector('#search-button');
const cityButtons = document.querySelector('#city-buttons button');
const cityCardsSection = document.querySelector('#city-cards');
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
            
            const cityCard = document.createElement('div');
            cityCard.classList.add('city-card');

            const cityName = document.createElement('h2');
            cityName.classList.add('city-name');
            cityName.textContent = data.city.name;

            const cityDate = document.createElement('p');
            cityDate.classList.add('city-date');
            cityDate.textContent = dayjs.unix(data.list[0].dt).format("MM-DD-YYYY");

            const cityIcon = document.createElement('img');
            cityIcon.classList.add('cityIcon');
            let iconSource = data.list[0].weather[0].icon
            cityIcon.src = `https://openweathermap.org/img/wn/${iconSource}@2x.png`;

            const cityHumidity = document.createElement('p');
            cityHumidity.classList.add('city-Humidity');
            cityHumidity.textContent = data.list[0].main.humidity;
            
            const cityTemp = document.createElement('p');
            cityTemp.classList.add('city-Temp');
            cityTemp.textContent = data.list[0].main.temp;
            
            const cityWind = document.createElement('p');
            cityWind.classList.add('city-Wind');
            cityWind.textContent = data.list[0].wind.speed;

0
            cityCard.append(cityName, cityDate, cityIcon, cityHumidity, cityTemp, cityWind);

            cityCardsSection.append(cityCard);
            // Loop thru 5 days
            for(i = 7; i < data.list.length; i += 8) {
                const cityCard = document.createElement('div');
            cityCard.classList.add('city-card');

            const cityName = document.createElement('h2');
            cityName.classList.add('city-name');
            cityName.textContent = data.city.name;

            const cityDate = document.createElement('p');
            cityDate.classList.add('city-date');
            cityDate.textContent = dayjs.unix(data.list[i].dt).format("MM-DD-YYYY");

            const cityIcon = document.createElement('img');
            cityIcon.classList.add('cityIcon');
            iconSource = data.list[i].weather[0].icon
            cityIcon.src = `https://openweathermap.org/img/wn/${iconSource}@2x.png`;

            const cityHumidity = document.createElement('p');
            cityHumidity.classList.add('city-Humidity');
            cityHumidity.textContent = data.list[i].main.humidity;
            
            const cityTemp = document.createElement('p');
            cityTemp.classList.add('city-Temp');
            cityTemp.textContent = data.list[i].main.temp;
            
            const cityWind = document.createElement('p');
            cityWind.classList.add('city-Wind');
            cityWind.textContent = data.list[i].wind.speed;

0
            cityCard.append(cityName, cityDate, cityIcon, cityHumidity, cityTemp, cityWind);

            cityCardsSection.append(cityCard);
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

