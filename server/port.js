// This spins up node server on localhost

const app = require('./server')

// Port was extradited from the server file and is now on this file port.js to make it easier for
// a jest test to pass on server.js

const port = 8000;
const server = app.listen(port, listening)
function listening() {
    console.log(`Server running on port: ${port}`)
}