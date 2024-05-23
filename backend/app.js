import fs from 'node:fs/promises'

import bodyParser from 'body-parser'
import express from 'express'

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    next()
})

app.get('/meals', async (req, res) => {
    const meals = await fs.readFile('./data/available-meals.json', 'utf8')

    res.json(JSON.parse(meals))
})

app.post('/orders', async (req, res) => {
    const orderData = req.body.order

    if (orderData === null || orderData.items === null) {
        return res.status(400).json({ message: 'Missing Data.' })
    }

    const customer = orderData.customer

    if (
        customer.email === null ||
        !customer.email.includes('@') ||
        customer.name === null ||
        customer.name.trim() === '' ||
        customer.postalCode === null ||
        customer.postalCode.trim() === '' ||
        customer.city === null ||
        customer.city.trim() === ''
    ) {
        return res.status(400).json({
            message:
                'Missing Data: Email, Name, Street, Postal Code or City is missing.',
        })
    }

    const newOrder = {
        ...orderData,
        id: (Math.random() * 1000).toString(),
    }

    const orders = await fs.readFile('./data/orders.json', 'utf8')
    const allOrders = JSON.parse(orders)

    allOrders.push(newOrder)

    await fs.writeFile('./data/orders.json', JSON.stringify(allOrders))

    res.status(201).json({ message: 'Order created!' })
})

app.use((req, res) => {
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }

    res.status(404).json({ message: 'Not Found.' })
})

app.listen(3000)
