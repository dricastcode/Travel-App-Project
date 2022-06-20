//Testing commit to GitHub

const userForm = document.querySelector('.user-form')
const cityName = document.getElementById('city-name')
const departure = document.getElementById('departure-date')
const arrival = document.getElementById('arrival-date')

const msg = document.getElementById('msg')

userForm.addEventListener('submit', onSubmit)

function onSubmit(e) {
    e.preventDefault()

    if(cityName.value === '' || departure.value === '' || arrival === '') {
        // msg.classList.add('fields')
        msg.innerHTML = 'Please enter all fields'
    } else {
        console.log('success');
    }
}