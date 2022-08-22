
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
            
            try {
                // console.log(destination.value);
                const request = await fetch('http://localhost:8000/trip', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ city: destination.value })
                })
                // console.log(request);
                const data = await request.json()
                cityTrip.innerHTML = `My trip: ${data.cityName}`
                tripDates.innerHTML = `From: ${departure.value} - ${arrival.value}`
                
                const lat = data.lat
                const lng = data.lng
                const weatherData = { temp: data.temp, description: data.weather, icon: data.icon }
                const photo = data.photo

                forecast.innerHTML = `Current Forecast: ${weatherData.description} ${weatherData.temp}°F <img src="https://www.weatherbit.io/static/img/icons/${weatherData.icon}.png" alt="icon of current weather conditions">`

                console.log(photo);
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
export { onSubmit }