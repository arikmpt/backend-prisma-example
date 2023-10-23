const controller = require('../controllers/authController');
const { users } = require('../models')
const utils = require('../utils')

describe('auth controller testing', () => {
    test('test register function', async () => {
        const hashedpassword = await utils.cryptPassword('123456789');

        const req = {
            body: {
                email: 'email@dummy.com',
                password: '123456789',
                gender: 'male',
                phone: '1234567890',
                name: 'Test User'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const expectedData = {
            id: 1,
            email: 'email@dummy.com',
            password: hashedpassword,
            profile: {
                id: 1,
                gender: 'male',
                phone: '1234567890',
                name: 'test user'
            }
        }

        users.create = jest.fn().mockResolvedValue(expectedData);

        await controller.register(req, res);

        // expect(users.create).toHaveBeenCalledWith({
        //     data: {
        //         email: 'email@dummy.com',
        //         password: hashedpassword,
        //         profile: {
        //             create: {
        //                 gender: 'male',
        //                 phone: '1234567890',
        //                 name: 'Test User'
        //             }
        //         }
        //     },
        //     include: {
        //         profile: true
        //     }
        // });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ data: expectedData });
    })
})