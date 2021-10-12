const ConnectionDB = require('./mongo_atlas/connection')
const express = require('express')
const ProductsRouter = require('./router')
const app = new express()
require('dotenv').config()

app.use(express.json())
app.use('/api/v1/products', ProductsRouter)

app.get('/', (req, res) => {
    res.status(200).send(`<h1>Home Page</h1><a href='api/v1/products'>to products API</a>`)
})
app.all('*', (req, res) => {
    res.status(404).send('Route doesn\'t exist')
})

const port = process.env.PORT || 5000

const Start = async () => {
    try {
        await ConnectionDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`listening to the server at port ${port}...`);
        })
    } catch (err) {
        console.log({ msg: 'connection error...' });
    }
}

Start();

