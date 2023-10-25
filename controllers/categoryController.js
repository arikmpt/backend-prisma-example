const { categories } = require('../models');

module.exports = {
    create: async (req, res) => {
        try {

            const data = await categories.create({
                data: {
                    name: req.body.name,
                    is_active: req.body.is_active
                }
            })

            return res.status(201).json({
                data
            });
            
        } catch (error) {
            return res.status(500).json({
                error
            });
        }
    },
    list: async (req, res) => {
        try {
            const data = await categories.findMany();

            return res.status(200).json({
                data
            })
        } catch (error) {
            return res.status(500).json({
                error
            });
        }
    }
}