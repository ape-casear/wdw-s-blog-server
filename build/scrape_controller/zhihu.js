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
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const moment_1 = __importDefault(require("moment"));
class zhihu {
    static getByDate() {
        return __awaiter(this, void 0, void 0, function* () {
            let start = moment_1.default().format('YYYY-MM-DD') + ' 00:00:00';
            let end = moment_1.default().format('YYYY-MM-DD') + ' 23:59:59';
            let sql = `select * from zhihu where created_time >=${mysql_1.default.escape(start)} and created_time<=${mysql_1.default.escape(end)}`;
            if (process.env.debug) {
                console.log(sql);
            }
            let result = yield global.asynConPool.queryAsync(sql);
            return result;
        });
    }
}
exports.default = zhihu;
