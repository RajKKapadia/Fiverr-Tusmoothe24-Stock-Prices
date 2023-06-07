const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();

const RESPONSES_SHEET_ID = process.env.RESPONSES_SHEET_ID;
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const getSymbolCurrentPrice = async (symbol) => {

    symbol = symbol.toUpperCase();

    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });

    await doc.loadInfo();

    let sheet = doc.sheetsByTitle['Curent Prices']

    let rows = await sheet.getRows();

    let price = undefined;

    for (let index = 0; index < rows.length; index++) {
        let row = rows[index];
        if (row.symbol == symbol) {
            price = row.price;
            break;
        }
    };

   if (price == undefined) {
    return `I am not sure I have the price for the symbol ${symbol}.`
   } else {
    return `The current price of ${symbol} is ${price}.`
   }
};

const getSymbolFuturePrice = async (symbol, target) => {

    symbol = symbol.toUpperCase();

    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });

    await doc.loadInfo();

    let sheet = undefined;

    if (target === 'daily') {
        sheet = doc.sheetsByTitle['Daily Plays Target Price'];
    } else if (target === 'weekly') {
        sheet = doc.sheetsByTitle['Weekly Stock Target Prices']   
    } else {
        sheet = doc.sheetsByTitle['Monthly Plays Target Price']
    }

    console.log(sheet.a1SheetName);

    let rows = await sheet.getRows();

    let bearish = undefined;
    let bullish = undefined;

    for (let index = 0; index < rows.length; index++) {
        let row = rows[index];
        if (row.symbol == symbol) {
            bearish = row.bearish;
            bullish = row.bullish;
            break;
        }
    };

   if (bearish == undefined || bullish == undefined) {
    return `I am not sure I have the ${target} future price for the symbol ${symbol}.`
   } else {
    return `The ${target} future price of ${symbol}, for bullish ${bullish} and for bearish ${bearish}.`
   }
};

// getSymbolFuturePrice('AAPL', 'weekly')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

module.exports = {
    getSymbolCurrentPrice,
    getSymbolFuturePrice
};
