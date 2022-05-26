const express = require('express')
const Contenedor = require('./contenedor')


const DBfile = 'products.json'
const PORT = process.env.PORT || 8080
const app = express()
const contenedor = new Contenedor(DBfile)


app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.get('/api/products', (req, res) => {
    const data = contenedor.getAll()

    res.json(data)
})

app.get('/api/products/random', (req, res) => {
    const data = contenedor.getAll()
    const item = data[ Math.floor(Math.random() * data.length)]
    res.json(item)
})

app.post('/api/products', (req, res) => {
    const newData = req.body
    contenedor.save(newData)

    res.send('Se registró exitosamente')
})



const server = app.listen(PORT, () => console.log(`Listening ${PORT} ...`))
server.on('error', e => {
    console.log('Server error', e)
})