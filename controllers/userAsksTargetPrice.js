const { getSymbolFuturePrice } = require('../helper/googleSheetApi');
const { PARAMS } = require('../helper/constant');

const handleuserAsksTargetPrice = async (req) => {
    let target = req.body.queryResult.parameters['target-period'];

    let parameters = req.body.queryResult.parameters;
    let symbol = undefined;

    Object.keys(parameters).forEach(k => {
        if (PARAMS.includes(k) && parameters[k] !== '') {
            symbol = parameters[k];
        }
    });

    let response = undefined;

    if (symbol == undefined) {
        response = `We don't have the price of this security.`;
    } else {
        response = await getSymbolFuturePrice(symbol, target);
    }

    let responseText = {
        fulfillmentText: response
    };

    return responseText;
};

module.exports = {
    handleuserAsksTargetPrice
};
