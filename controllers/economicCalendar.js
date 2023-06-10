const { getEconomicCalendar } = require('../helper/googleSheetApi');

const handleEconomicCalendar = async (req) => {

    let dateString = req.body.queryResult.parameters.dateTime;
    let currencyName = req.body.queryResult.parameters.currencyName;

    let date = new Date(dateString);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    let localDate = date.toLocaleDateString('en-US', options);

    let response = await getEconomicCalendar(localDate, currencyName);

    let responseText = {
        fulfillmentText: response
    };

    return responseText;
};

module.exports = {
    handleEconomicCalendar
};
