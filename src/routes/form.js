const express = require('express')
const router = express.Router()
const Form = require('../models/form')

const newapicustomers = [];
var i = 1
router.get('/', async (req, res) => {
    res.render('index')
})

router.post('/', async (req, res) => {
    let form = new Form({
        Name: req.body.firstLastName,
        PhoneNumber: req.body.phoneNumber,
        Email: req.body.email,
        Description: req.body.description
    })
    try {
        let formsaved = await form.save()
        if (formsaved) {
            let customersformate = {
                customer_id: i++,
                display_name: formsaved.Name,
                channels: [
                    { type: 'email', value: formsaved.Email },
                    { type: 'sms', value: '+' + formsaved.PhoneNumber },
                    { type: 'whatsapp', value: '' }
                ],
                links: [
                    { type: 'Facebook', value: 'https://facebook.com', display_name: 'Social Media Profile' }
                ],
                details:{
                    title: "Reason for Contact",
                    content: formsaved.Description
                },
                worker: 'harrytseng00@gmail.com'
            }
            newapicustomers.push(customersformate);
            // console.log(JSON.stringify(newapicustomers))
        }
        res.render('new', {form: formsaved})
    } catch (err) {
        res.render('index', {
            form: form,
            errorMessage: err
        })
    }
})

// router.get('/get', async (req, res) => {
//     res.render('get')
// })
module.exports = {
    router : router,
    newapicustomers : newapicustomers
} 