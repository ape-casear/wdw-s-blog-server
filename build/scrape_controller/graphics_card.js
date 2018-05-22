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
class Graphics_card {
    static getGraphics_card(date1, date2) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = 'select * from graphics_card where scrape_date>=' + mysqlutil_1.default.escape(date1);
            if (date2) {
                sql += ' and scrape_date<=' + mysqlutil_1.default.escape(date2);
            }
            if (process.env.debug) {
                console.log(sql);
            }
            return yield global.asynConPool.queryAsync(sql);
        });
    }
    static putGraphics_card(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let date = moment_1.default().format('yyyy-MM-dd');
            let sql = `insert into graphics_card(name,url,price,scrape_date,type) values(
            ${mysqlutil_1.default.escape(data.name)}, ${mysqlutil_1.default.escape(data.url)},
            ${mysqlutil_1.default.escape(data.price)}, ${mysqlutil_1.default.escape(date)}, ${mysqlutil_1.default.escape(data.type)}
        )`;
            if (process.env.debug) {
                console.log(sql);
            }
            return yield global.asynConPool.queryAsync(sql);
        });
    }
}
module.exports = Graphics_card;
