const { getEarningCalendar } = require('../helper/googleSheetApi');

const handleEarningCalendar = async (req) => {

    let dateString = req.body.queryResult.parameters.dateTime;

    let date = new Date(dateString);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    let localDate = date.toLocaleDateString('en-US', options);

    let response = await getEarningCalendar(localDate);

    let responseText = {
        fulfillmentText: response
    };

    return responseText;
};

module.exports = {
    handleEarningCalendar
};
