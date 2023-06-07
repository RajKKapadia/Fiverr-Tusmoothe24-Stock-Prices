const { getSymbolFuturePrice } = require('../helper/googleSheetApi');

const handleuserAsksTargetPrice = async (req) => {
    let symbol = req.body.queryResult.parameters['stock-symbol'];
    let target = req.body.queryResult.parameters['target-period'];

    console.log(symbol);
    console.log(target);

    let response = await getSymbolFuturePrice(symbol, target);

    let responseText = {
        fulfillmentText: response
    };

    return responseText;
};

module.exports = {
    handleuserAsksTargetPrice
};
