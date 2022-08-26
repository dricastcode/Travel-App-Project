const supertest = require('supertest')
const app = require('../server/server')
const request = supertest(app)

describe('A post route test with async', () => {
    it('Should have a status code of 200', async () => {
        await request.post('/test')
            .expect(200)
            .then((response) =>
                expect(response.body.pass).toBe('pass'))
    })
})
