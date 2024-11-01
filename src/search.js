// Function to fetch weather data
async function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    const apiKey = '32804b24a847407391c53709241010'; // API key
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Fetch data (utk html)
        displayWeatherData(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

//display data + cloth recommend + image
function displayWeatherData(data) {
    const weatherDataDiv = document.getElementById('weatherData');
    const temp = data.current.temp_c;
    const condition = data.current.condition.text.toLowerCase();
    const windSpeed = data.current.wind_kph;
    const humidity = data.current.humidity;

    //if else utk recommendation
    let clothingRecommendation = '';
    let clothingImage = '';

    if (condition === "rain") {
        clothingRecommendation = "It's raining. Wear a waterproof jacket or bring an umbrella.";
        clothingImage = "waterproof.jpg"; 
    } else if (condition === "snow") {
        clothingRecommendation = "Snow is expected. Dress warmly with a winter coat, boots, and gloves.";
        clothingImage = "winter_coat.jpg"; 
    } else if (condition === "cloudy") {
        clothingRecommendation = "It's cloudy. A light jacket would be comfortable.";
        clothingImage = "light_jacket.jpg"; 
    } else if (condition === "sunny") {
        clothingRecommendation = "It's sunny! Wear light clothing and consider sunglasses or a hat for sun protection.";
        clothingImage = "sunny_outfit.jpg"; 
    } else if (windSpeed > 20) {
        clothingRecommendation = "It's windy outside, so a windbreaker might be helpful.";
        clothingImage = "windbreaker.jpg"; 
    } else if (humidity > 80) {
        clothingRecommendation = "Humidity is high. Light, breathable clothing is recommended.";
        clothingImage = "breathable_clothing.jpg"; 
    } else {
        clothingRecommendation = "The weather seems mild. Wear something comfortable.";
        clothingImage = "comfortable_clothing.jpg"; 
    }

    //display data from fetch api + cloth image
    weatherDataDiv.innerHTML = `
        <h3>${data.location.name}, ${data.location.region}, ${data.location.country}</h3>
        <p><strong>Local Time:</strong> ${data.location.localtime}</p>
        <p><strong>Current Temperature:</strong> ${temp}°C</p>
        <p><strong>Feels Like Temperature:</strong> ${data.current.feelslike_c}°C</p>
        <p><strong>Forecast Temperature (Max):</strong> ${data.forecast.forecastday[0].day.maxtemp_c}°C</p>
        <p><strong>Forecast Temperature (Min):</strong> ${data.forecast.forecastday[0].day.mintemp_c}°C</p>
        <p><strong>Sunrise:</strong> ${data.forecast.forecastday[0].astro.sunrise}</p>
        <p><strong>Sunset:</strong> ${data.forecast.forecastday[0].astro.sunset}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} kph</p>
        <p><strong>Weather Description:</strong> ${data.current.condition.text}</p>
        <p><strong>Icon:</strong> <img src="${data.current.condition.icon}" alt="Weather Icon"></p>
        <p><strong>Clothing Recommendation:</strong> ${clothingRecommendation}</p>
        <p><strong>Clothing Image Recommendation:</strong><br>
        <img src="${clothingImage}" alt="Clothing Recommendation Image" style="width:100px; height:auto;"/></p>
    `;
}

//add data ke plan
function addToDiary() {
    const location = document.getElementById('locationInput').value;
    const weatherDataDiv = document.getElementById('weatherData');

    if (location && weatherDataDiv.innerHTML) {
        const diaryEntry = {
            id: Date.now(),
            title: `Weather in ${location}`,
            content: weatherDataDiv.innerHTML
        };

        const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
        entries.push(diaryEntry);
        localStorage.setItem("diaryEntries", JSON.stringify(entries));

        alert("Weather data added to plan!");
    } else {
        alert("Please fetch the weather data first.");
    }
}
