const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();

const RESPONSES_SHEET_ID = process.env.RESPONSES_SHEET_ID;
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const getSymbolCurrentPrice = async (symbol) => {

    try {
        symbol = symbol.toUpperCase();

    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });

    await doc.loadInfo();

    let sheet = doc.sheetsByTitle['Curent Prices'];

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
        return `We don't have the price of this security.`;
    } else {
        return `The current price of ${symbol} is ${price}.`;
    }
    } catch (error) {
        console.error(`Error at getSymbolCurrentPrice -> ${error}`);
        return `We don't have the price of this security.`;
    }
};

const getSymbolFuturePrice = async (symbol, target) => {

    try {
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
        sheet = doc.sheetsByTitle['Weekly Target Price'];
    } else {
        sheet = doc.sheetsByTitle['Monthly Plays Target Price'];
    }

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
        return `We don't have the ${target} price of this security..`;
    } else {
        return `The ${target} future price of ${symbol}, for bullish ${bullish} and for bearish ${bearish}.`;
    }
    } catch (error) {
        console.error(`Error at getSymbolFuturePrice -> ${error}`);
        return `We don't have the ${target} price of this security..`;
    }
};

const getEarningCalendar = async (date) => {

    try {
        await doc.useServiceAccountAuth({
            client_email: CREDENTIALS.client_email,
            private_key: CREDENTIALS.private_key
        });
    
        await doc.loadInfo();
    
        let sheet = doc.sheetsByTitle['Earnings Calendar'];
    
        let rows = await sheet.getRows();
    
        let flag = false;

        let tempString = '';
    
        for (let index = 0; index < rows.length; index++) {
            let row = rows[index];
            if (row.earnings_date === date) {
                tempString += `${row.company} -> EPS ${row.eps}, EPS Forcast ${row.eps_forecast}, Revenue ${row.revenue} and Earning Forcast ${row.earnings_forecast}.\n\n`;
                flag = true;
            }
        };

        let outString = '';

        if (flag) {
            outString += `On ${date} the earnings are:\n\n${tempString.slice(0, -2)}.`;
        } else {
            outString += `We don't have any data for ${date}.`;
        }
    
        return outString;
    } catch (error) {
        console.error(`Error at getEarningCalendar -> ${error}`);
        return `We don't have any data for ${date}.`;
    }
};

const getEconomicCalendar = async (date, currencyName) => {

    try {
        await doc.useServiceAccountAuth({
            client_email: CREDENTIALS.client_email,
            private_key: CREDENTIALS.private_key
        });
    
        await doc.loadInfo();
    
        let sheet = doc.sheetsByTitle['Economic Calendar'];
    
        let rows = await sheet.getRows();
    
        let flag = false;

        let tempString = '';
    
        for (let index = 0; index < rows.length; index++) {
            let row = rows[index];
            if (row.date === date && row.currency === currencyName) {
                tempString += `Time ${row.time}, Event ${row.event}, Actual ${row.actual}, Forecast ${row.forecast} and Previous ${row.previous}.\n\n`;
                flag = true;
            }
        };

        let outString = '';

        if (flag) {
            outString += `On ${date} the economics are:\n\n${tempString.slice(0, -2)}.`;
        } else {
            outString += `We don't have any data for ${date}.`;
        }
    
        return outString;
    } catch (error) {
        console.error(`Error at getEarningCalendar -> ${error}`);
        return `We don't have any data for ${date}.`;
    }
};

// getEconomicCalendar('Monday, June 5, 2023', 'USD')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

module.exports = {
    getSymbolCurrentPrice,
    getSymbolFuturePrice,
    getEarningCalendar,
    getEconomicCalendar
};
