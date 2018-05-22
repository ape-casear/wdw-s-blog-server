"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mysqlutil_1 = __importDefault(require("../model/mysqlutil"));
const moment_1 = __importDefault(require("moment"));
class BTC {
    static getBTC(date1, date2) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = 'select * from btc where scrape_date >=' + mysqlutil_1.default.escape(date1);
            if (date2) {
                sql += ' and scrape_date<=' + mysqlutil_1.default.escape(date2);
            }
            if (process.env.debug) {
                console.log(sql);
            }
            return yield global.asynConPool.queryAsync(sql);
        });
    }
    static putBTC(btc) {
        return __awaiter(this, void 0, void 0, function* () {
            let date = moment_1.default().format('yyyy-MM-dd');
            let sql = `insert into btc(name, price_us, price_zh, tran_count, scrape_date ) values(
            ${mysqlutil_1.default.escape(btc.name)}, ${mysqlutil_1.default.escape(btc.price_us)},
            ${mysqlutil_1.default.escape(btc.price_zh)}, ${mysqlutil_1.default.escape(btc.tran_count)}, ${mysqlutil_1.default.escape(date)}
        )`;
            if (process.env.debug) {
                console.log(sql);
            }
            return yield global.asynConPool.queryAsync(sql);
        });
    }
}
module.exports = BTC;
