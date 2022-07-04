
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
        async function getData(data) {
            const response = await fetch('http://localhost:8000/trip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
            },
                body: JSON.stringify(data),
                mode: 'cors',
                credentials: 'same-origin'
            })
            return response.json()
            document.getElementById('destination-city').innerHTML = `My trip: ${data.city}`
            document.getElementById('trip-dates').innerHTML = `From: ${departure.value} - ${arrival.value}`
            
            console.log(data);
        }
        
                // const destination = document.getElementById('destination-city')
                // const tripDates = document.getElementById('trip-dates')
                // .then(res => res.json())
                // .then(data => {
                
                cityName.value = ''
                departure.value = ''
                arrival.value = ''
        }
    }

export { onSubmit }