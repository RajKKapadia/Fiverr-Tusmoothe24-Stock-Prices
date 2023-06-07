const { getSymbolCurrentPrice } = require('../helper/googleSheetApi');

const handlegetSymbolPrice = async (req) => {
    let symbol = req.body.queryResult.parameters['stock-symbol'];
    let response = await getSymbolCurrentPrice(symbol);

    let responseText = {
        fulfillmentText: response
    };

    return responseText
};

module.exports = {
    handlegetSymbolPrice
};
