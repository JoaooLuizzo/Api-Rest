import express from 'express'
import { StatusCodes } from 'http-status-codes'

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000
let users = [
    { id: 1, name: 'João Luiz Barroso', age: 21 },
    { id: 2, name: 'Rafael Ribeiro', age: 31 },
    { id: 3, name: 'Gabriel Custódio', age: 27 }
]

app.listen(PORT, () => {
    console.log(`Server rodando em http://localhost:${PORT}`)
})

app.get('/', (request, response) => {
    return response.send('<h1>Trabalhando com o servidor Express</h1>')
})

app.get('/users', (request, response) => {
    return response.send(users)
})

app.get('/users/:userID', (request, response) => {
    const userID = request.params.userID
    const user = users.find(user => {
        return user.id === Number(userID)
    })
    return response.send(user)
})

app.post('/users', (request, response) => {
    const newUser = request.body
    users.push(newUser)
    return response.status(StatusCodes.CREATED).send(newUser)
})

app.put('/users/:userID', (request, response) => {
    const userID = request.params.userID
    const updatedUser = request.body

    users = users.map(user => {
        if (Number(userID) === user.id) {
            return updatedUser
        }
        return user
    })
    return response.send(updatedUser)
})

app.delete('/users/:userID', (request, response) => {
    const userID = request.params.userID
    users = users.filter(user => Number(userID) !== user.id)
    return response.status(StatusCodes.NO_CONTENT).send()
})
