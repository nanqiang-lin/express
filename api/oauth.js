const express = require('express');
const router = express.Router();
const axios = require('axios');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const CLIENT_ID = 'Iv1.886a4ad470aa674d';
const CLIENT_SECRET = '4da86eca9b865e5466b17d91061c826733afdb7f';

 app.get('*', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const { clientID = CLIENT_ID, clientSecret = CLIENT_SECRET, code = req.query.code } = req.body
    const { status, data } = await axios({
        method: 'post',
        url: 'http://github.com/login/oauth/access_token?' +
            `client_id=${clientID}&` +
            `client_secret=${clientSecret}&` +
            `code=${code}`,
        headers: {
            accept: 'application/json'
        }
    }).catch(e => e.response)
    console.log('---')
    console.log(status, data)
    res.json({status, data})
});


// router.post('*', async function (ctx, next) {
//     const { clientID = CLIENT_ID, clientSecret = CLIENT_SECRET, code } = ctx.request.body
//     const { status, data } = await axios({
//         method: 'post',
//         url: 'http://github.com/login/oauth/access_token?' +
//             `client_id=${clientID}&` +
//             `client_secret=${clientSecret}&` +
//             `code=${code}`,
//         headers: {
//             accept: 'application/json'
//         }
//     }).catch(e => e.response)
//     ctx.body = { status, data }
// })

// module.exports = router;
module.exports = app;