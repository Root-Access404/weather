const apiKey = 'YOUR_API_KEY_HERE '; 
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');

// Everything MUST be inside this function to wait for the click
searchBtn.addEventListener('click', async () => {
    const city = cityInput.value;
    
    if (city === "") return;

    weatherResult.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`${apiBaseUrl}?q=${city}&appid=${apiKey}&units=metric`);
        
        // This log will help you debug if it still fails
        console.log("Response status:", response.status); 

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        
        weatherResult.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p style="font-size: 24px;">${Math.round(data.main.temp)}°C</p>
            <p>${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;
    } catch (error) {
        weatherResult.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
});
