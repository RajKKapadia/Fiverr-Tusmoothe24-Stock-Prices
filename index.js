const express = require('express');

const webApp = express();

const PORT = process.env.PORT || 5000;

webApp.use(express.urlencoded({ extended: true }));
webApp.use(express.json());
webApp.use((req, res, next) => {
    console.log(`Path ${req.path} with Method ${req.method}`);
    next();
});

webApp.get('/', (req, res) => {
    res.sendStatus(200);
});

const { handlegetSymbolPrice } = require('./controllers/getSymbolPrice');
const { handleInputUnknown } = require('./controllers/inputUnknown');
const { handleuserAsksTargetPrice } = require('./controllers/userAsksTargetPrice');
const { handleEconomicCalendar } = require('./controllers/economicCalendar');
const { handleEarningCalendar } = require('./controllers/earningCalendar');

webApp.post('/dialogflow', async (req, res) => {

    let action = req.body.queryResult.action;

    let responseText = {};

    if (action === 'inputUnknown') {
        responseText = await handleInputUnknown(req);
    } else if (action === 'getSymbolPrice') {
        responseText = await handlegetSymbolPrice(req);
    } else if (action === 'userAsksTargetPrice') {
        responseText = await handleuserAsksTargetPrice(req);
    } else if (action === 'economicCalendar') {
        responseText = await handleEconomicCalendar(req);
    } else if (action === 'earningCalendar') {
        responseText = await handleEarningCalendar(req);
    }
    else {
        responseText['fulfillmentText'] = `No handler for the action ${action}.`
    }
    res.send(responseText);
});


webApp.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});
