// Simulates a skeleton version of app.js
// for testing.
const location = [
    { name: 'Chicago', weather: 'Few Clouds' },
    { name: 'Phoenix', weather: 'Sunny' },
    { name: 'Portland', weather: 'Rainfall' }
];

function getCity(city) {
    return city.name === 'Chicago'
}
console.log(location.find(getCity));

module.exports = getCity