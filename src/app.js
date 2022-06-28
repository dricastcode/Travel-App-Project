
const userForm = document.querySelector('.user-form')
const cityName = document.getElementById('city-name')
const departure = document.getElementById('departure-date')
const arrival = document.getElementById('arrival-date')

const msg = document.getElementById('msg')

userForm.addEventListener('submit', onSubmit)

function onSubmit(e) {
    e.preventDefault()

    if(cityName.value === '' || departure.value === '' || arrival === '') {
        msg.innerHTML = 'Please enter all fields'
        setTimeout(() => msg.remove(), 2000)
        clearTimeout(onSubmit)
    } else {
        fetch('http://localhost:8000/trip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const destination = document.getElementById('destination-city')
                const tripDates = document.getElementById('trip-dates')
                destination.innerHTML = `My trip: data.city-name`
                tripDates.innerHTML = `From: ${departure.value} - ${arrival.value}`

                cityName.value = ''
                departure.value = ''
                arrival.value = ''
        })
    }
}

export { onSubmit }