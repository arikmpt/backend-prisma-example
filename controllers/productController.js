const { products } = require('../models');
const { imageKit } = require('../utils');

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
    },
    createWithImageKit: async (req, res) => {
        try {
            const fileTostring = req.file.buffer.toString('base64');

            const uploadFile = await imageKit.upload({
                fileName: req.file.originalname,
                file: fileTostring
            });
            
            const data = await products.create({
                data: {
                    name: req.body.name,
                    image: uploadFile.url,
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
    },
    upload: async (req, res) => {
        try {
            const fileTostring = req.file.buffer.toString('base64');

            const uploadFile = await imageKit.upload({
                fileName: req.file.originalname,
                file: fileTostring
            });

            return res.status(200).json({
                data: {
                    name: uploadFile.name,
                    url: uploadFile.url,
                    type: uploadFile.fileType
                }
            })
        } catch (error) {
            return res.status(500).json({
                error
            });
        }
    }
}