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
class WebInfo {
    static update_visit_count() {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = 'update webinfo set visit_count = visit_count+20 ';
            let result = yield mysqlutil_1.default.query(sql);
            return result;
        });
    }
    static get_visit_count() {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = 'select visit_count from  webinfo';
            let result = yield mysqlutil_1.default.queryOne(sql);
            return result;
        });
    }
    static get_total_comment() {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = 'select count(1) as total_comment  from comment';
            let result = yield mysqlutil_1.default.queryOne(sql);
            return result;
        });
    }
}
module.exports = WebInfo;
