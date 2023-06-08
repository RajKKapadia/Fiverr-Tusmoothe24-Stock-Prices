const { getSymbolCurrentPrice } = require('../helper/googleSheetApi');
const { PARAMS } = require('../helper/constant');

const handlegetSymbolPrice = async (req) => {
    let parameters = req.body.queryResult.parameters;
    let symbol = undefined;

    Object.keys(parameters).forEach(k => {
        if (PARAMS.includes(k) && parameters[k] !== 'None') {
            symbol = parameters[k];
        }
    });

    let response = undefined;

    if (symbol == undefined) {
        response = `We don't have the price of this security.`;
    } else {
        response = await getSymbolCurrentPrice(symbol);
    }

    let responseText = {
        fulfillmentText: response
    };

    return responseText
};

module.exports = {
    handlegetSymbolPrice
};
