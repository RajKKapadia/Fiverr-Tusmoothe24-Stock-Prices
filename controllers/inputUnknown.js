const { textGeneration } = require('../helper/openaiApi');

const handleInputUnknown = async (req) => {
    let queryText = req.body.queryResult.queryText;
    let result = await textGeneration(queryText);

    let responseText = {};

    if (result.status == 1) {
        responseText = {
            fulfillmentText: result.response
        };

    } else {
        responseText = {
            fulfillmentText: `Sorry, I'm not able to help with that.`
        };
    }

    return responseText;
};

module.exports = {
    handleInputUnknown
};
