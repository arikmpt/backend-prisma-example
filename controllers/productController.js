const { products } = require('../models');

module.exports = {
    create: async (req, res) => {
        try {
            const data = await products.create({
                data: {
                    name: req.body.name,
                    image: `/images/${req.file.filename}`,
                    price: parseFloat(req.body.price),
                    description: req.body.description,
                    quantity: parseInt(req.body.quantity),
                    category_id: parseInt(req.body.category_id)
                }
            })
            
            return res.status(201).json({
                data
            });
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            });
        }
    }
}