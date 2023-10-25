const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    cors = require('cors'),
    router = require('./routes/index'),
    swaggerUi = require('swagger-ui-express'),
    swaggerJson = require('./openapi.json')

require('dotenv').config()

app.use(express.json({ strict : false}))
app.use(cors())
app.use('/images', express.static('public/images'))
app.use('/api/v1', router)
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerJson))
// Handle 404 route
app.get('*', (req, res) => {
    return res.status(404).json({
        error: 'End point is not registered'
    })
})

app.listen(port, () => {
    console.log(`Server is running at PORT ${port}`)
})