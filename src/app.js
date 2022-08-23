const userForm = document.querySelector('.user-form')
const cityName = document.getElementById('city')
const departure = document.getElementById('departure-date')
const arrival = document.getElementById('arrival-date')

const msg = document.getElementById('msg')

userForm.addEventListener('submit', onSubmit)

async function onSubmit(e) {
    e.preventDefault()
    
    if(cityName.value === '' || departure.value === '' || arrival === '') {
        msg.innerHTML = 'Please enter all fields'
        setTimeout(() => msg.remove(), 2000)
        clearTimeout(onSubmit)
    } else {
        async function getData() {
            const destination = document.getElementById('city')
            const tripDates = document.getElementById('trip-dates')
            const cityTrip = document.getElementById('destination-city')
            const forecast = document.getElementById('forecast')
            const cityView = document.getElementById('view-city')
            
            try {
                const request = await fetch('http://localhost:8000/trip', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ city: destination.value })
                })
                const data = await request.json()
                cityTrip.innerHTML = `My destination: ${data.cityName}`
                tripDates.innerHTML = `From: ${departure.value} to ${arrival.value}`
                
                const weatherData = {
                    temp: data.temp,
                    description: data.weather,
                    icon: data.icon
                }

                const photo = data.photo
                
                forecast.innerHTML = `Current weather: ${weatherData.description} ${weatherData.temp}°F <img src="https://www.weatherbit.io/static/img/icons/${weatherData.icon}.png" alt="icon of current weather conditions" width="45px">`
                
                cityView.innerHTML = `<img src="${photo}" alt="Photo of the city searched" style="width: 400px; border-radius: 10px">`
                
                console.log(weatherData);
            } catch(err) {
                console.log(err)
            }
            cityName.value = ''
            departure.value = ''
            arrival.value = ''
        }
        await getData()
    }
    
}

module.exports = onSubmit