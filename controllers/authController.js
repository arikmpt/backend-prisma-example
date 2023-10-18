const { users } = require('../models'),
    utils = require('../utils'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt')
require('dotenv').config()
const secret_key = process.env.JWT_KEY || 'no_secret'
module.exports = {
    register: async (req, res) => {
        try {

            const data = await users.create({
                data: {
                    email: req.body.email,
                    password: await utils.cryptPassword(req.body.password),
                    profile: {
                        create: {
                            gender: req.body.gender,
                            phone: req.body.phone,
                            name: req.body.name
                        }
                    }
                },
                include: {
                    profile: true
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
    login: async (req, res) => {
        try {
            const findUser = await users.findFirst({
                where: {
                    email : req.body.email
                }
            });

            if(!findUser) {
                return res.status(404).json({
                    error: "Your email is not registered in our system"
                })
            }

            if(bcrypt.compareSync(req.body.password, findUser.password)) {
                const token = jwt.sign({ id: findUser.id , email: findUser.email} , secret_key, { expiresIn : '6h'})
    
                return res.status(200).json({
                    data: {
                        token
                    }
                })
            }
    
            return res.status(403).json({
                error: 'Invalid credentials'
            })
        } catch (error) {
            return res.status(500).json({
                error
            });
        }
    },
    profile: async (req, res) => {
        try {
            const user = await users.findUnique({
                include: {
                    profile: true
                },
                where: {
                    id: res.user.id
                }
            })
    
            return res.status(200).json({
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                error
            });
        }
    },
    changePassword: async (req, res) => {
        const user = await users.findUnique({
            where: {
                id: res.user.id
            }
        })

        if(bcrypt.compareSync(req.body.old_password, user.password)) {
            const data = await users.update({
                where: {
                    id: res.user.id
                },
                data: {
                    password: await utils.cryptPassword(req.body.password)
                }
            })

            return res.status(200).json({
                data
            })
        }

        return res.status(403).json({
            error: 'Your old password is not valid'
        })
    }
}