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
const mysqlutil_1 = __importDefault(require("../model/mysqlutil"));
class User {
    static getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `select * from user where id = ${mysqlutil_1.default.escape(id)}`;
            if (process.env.debug) {
                console.log(sql);
            }
            return yield global.asynConPool.queryAsync(sql);
        });
    }
    static putUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `insert into user(author,password,telephone) values(${user.author},${user.password},${user.telephone})`;
            if (process.env.debug) {
                console.log(sql);
            }
            return yield global.asynConPool.queryAsync(sql);
        });
    }
    static updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let snake, mine_score;
            if (user.snake_score) {
                snake = 'snake_score = ' + user.snake_score;
            }
            if (user.mine_score) {
                mine_score = 'mine_score = ' + user.mine_score;
            }
            let sql = `update user set` + snake ? snake : '' + mine_score ? mine_score : '' + 'where id=' + mysqlutil_1.default.escape(user.id);
            if (process.env.debug) {
                console.log(sql);
            }
            return yield global.asynConPool.queryAsync(sql);
        });
    }
}
exports.default = User;
