// DOM Object selectors
const userForm = document.querySelector('.user-form')
const cityName = document.getElementById('city')
const departure = document.getElementById('departure-date')
const arrival = document.getElementById('arrival-date')

// Message selector. It runs only if the user does not fill the form and leaves it blank.
const msg = document.getElementById('msg')

userForm.addEventListener('submit', onSubmit)

async function onSubmit(e) {
    e.preventDefault()
    
    // A red banner will pop up telling the user to fill the required fields if left blank
    if(cityName.value === '' || departure.value === '' || arrival === '') {
        msg.innerHTML = 'Please enter all fields'
        setTimeout(() => msg.remove(), 2000)
        clearTimeout(onSubmit)
    } else {
        // initializes API retrieval from the server
        async function getData() {
            const destination = document.getElementById('city')
            const tripDates = document.getElementById('trip-dates')
            const cityTrip = document.getElementById('destination-city')
            const forecast = document.getElementById('forecast')
            const cityView = document.getElementById('view-city')
            
            // Here the user awaits the data being called from the node server
            try {
                const request = await fetch('http://localhost:8000/trip', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ city: destination.value })
                })
                // Destination data from user applies here
                const data = await request.json()
                cityTrip.innerHTML = `My destination: ${data.cityName}`
                tripDates.innerHTML = `From: ${departure.value} to ${arrival.value}`
                
                // Weather data from the server gets added here along with description and a
                // visual aid of the climate
                const weatherData = {
                    temp: data.temp,
                    description: data.weather,
                    icon: data.icon
                }

                // Finally a photo of the location being called is retrieved here
                const photo = data.photo
                
                // These code blocks update the UI with the weather and photo
                forecast.innerHTML = `Current weather: ${weatherData.description} ${weatherData.temp}°F <img src="https://www.weatherbit.io/static/img/icons/${weatherData.icon}.png" alt="icon of current weather conditions" width="45px">`
                
                cityView.innerHTML = `<img src="${photo}" alt="Photo of the city searched" style="width: 400px; border-radius: 10px">`
                
                console.log(weatherData);
            } catch(err) {
                console.log(err)
            }

            // Once the form is filled and then submitted, the form clears the values here
            cityName.value = ''
            departure.value = ''
            arrival.value = ''
        }
        await getData()
    }
}

module.exports = onSubmit