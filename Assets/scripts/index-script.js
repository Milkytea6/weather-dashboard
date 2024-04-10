// Selects the form element in the html.
const searchForm = document.querySelector('#search-form');
const searchButton = document.querySelector('#search-button');
const cityButtons = document.querySelector('#city-buttons button');
// variable for my api key.
const apiKey = 'b52d0dab464b966c275ec23279d9be7d';


// function to get the coordinates of the city and place them as parameters into the forcast url.
function handleSearchForm(event) {
    event.preventDefault();

     const cityName = document.getElementById('search-input').value;
     console.log(`City Name: ${cityName}`);

    // Selects the input value
    const searchInput = document.querySelector('#search-input').value;
    // Alerts if no input was made.
    if (!searchInput) {
        window.alert("Please enter a city name");
        return
    }

    
    // API to find the coordinates of the city.
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
    // Fetch data from the weatherAPI
    fetch(weatherUrl)
        .then(function (response){
            if (!response.ok){
            throw response.json();
            }
            return response.json();
        })

    // Variables for the latitude/longitude.
    .then(function (data) {
        const lat = data.city.coord.lat;
        const lon = data.city.coord.lon;
        
    })
    .catch(function (error) {
        console.error('Error fetching weather data:', error);
    });
    // API to find the weather data based on the lon/lat parameters.
    const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(forcastUrl)
    .then(function (response){
        if (!response.ok){
            throw response.json();
        }
        return response.json();
    })

}
function inputCityButton(event){
    const searchInput = document.getElementById('search-input');
    searchInput.textContent = cityButtons.textContent;
    handleSearchForm(event);
}

cityButtons.addEventListener('click', inputCityButton);

searchButton.addEventListener('click', handleSearchForm);

