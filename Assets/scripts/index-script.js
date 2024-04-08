// Selects the form element in the html.
const searchForm = document.querySelector('#search-form');
// variable for my api key.
const apiKey = 'b52d0dab464b966c275ec23279d9be7d';
// function to get the coordinates of the city and place them as parameters into the forcast url.
function handleSearchForm(event) {

    event.preventDefault;
    // Selects the input value
    const searchInput = document.querySelector('#search-input').value;
    // Alerts if no input was made.
    if (!searchInput) {
        window.alert("Please enter a city name");
        return
    }

    
    // API to find the coordinates of the city.
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}`;
    // Fetch data from the weatherAPI
    fetch(weatherUrl)
        .then(function (response){
            if (!response.ok){
            throw response.json();
            }
            return response.json();
        })
    // Variables for the latitude/longitude.
    const lat = 0;
    const lon = 0;


    // API to find the weather data based on the lon/lat parameters.
    const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
}