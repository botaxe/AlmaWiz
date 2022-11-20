require('dotenv').config();

const _ = (varName, defaults) => process.env[varName] || defaults || null;

const port = _('PORT', 5001);

// const newapicustomers = [];
// // //  hit api here and add data into the frontline.
// var axios = require('axios');
// var config = {
//   method: 'get',
//   url: 'http://localhost:5001/get',
//   headers: { 
//     'X-Auth-Key': _('AUTH_KEY'), 
//     'Cookie': '.Stackify.Rum=9702468a-7269-4a6d-bbc6-46e51136f632'
//   }
// };

// axios(config)
// .then(function (response) {
//     console.log(response.data)
// /*     var objs = JSON.parse() */
//   for (const type of response.data) {
//     const customersformate = {
//         customer_id: type.ClientNumber,
//         display_name: type.Name,
//         channels: [
//             { type: 'email', value: type.Email },
//             { type: 'sms', value: type.Phone },
//             { type: 'whatsapp', value: '' }
//         ],
//         links: [
//             { type: 'Facebook', value: 'https://facebook.com', display_name: 'Social Media Profile' }
//         ],
//         worker: 'harrytseng00@gmail.com'
//      }
//      newapicustomers.push(customersformate);
//   }
// })
// .catch(function (error) {
//   console.log(error);
// });
module.exports = {
    port: port,
    twilio: {
        account_sid: _('TWILIO_ACCOUNT_SID'),
        auth_token: _('TWILIO_AUTH_TOKEN'),
        sms_number: _('TWILIO_SMS_NUMBER'),
        whatsapp_number: _('TWILIO_WHATSAPP_NUMBER')
    },
    // cust:{
    //     newapicustomers: newapicustomers
    // }
};

