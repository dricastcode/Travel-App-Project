
const userForm = document.querySelector('.user-form')
const cityName = document.getElementById('city')
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
        async function getData() {
            let city = cityName.value

            fetch('http://localhost:8000/trip')
            .then((response) => {
                return response.json()
            }) .then((result) => {
                console.log(result)
                result.main.temp
            })
            
        //     const response = await fetch('http://localhost:8000/trip', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json'
        //         },
        //         body: data
        //     })
        //     return response.json()
        //     } catch(err) {
        //         console.log(err)
        //     }
            
        // }

        const destination = document.getElementById('destination-city')
        destination.innerHTML = `My trip: ${getData.city}`
        const tripDates = document.getElementById('trip-dates')
        tripDates.innerHTML = `From: ${departure.value} - ${arrival.value}`

        console.log(getData());

     
                // const destination = document.getElementById('destination-city')
                // const tripDates = document.getElementById('trip-dates')
                // .then(res => res.json())
                // .then(data => {
                
                cityName.value = ''
                departure.value = ''
                arrival.value = ''
            }
        }}

export { onSubmit, getData }