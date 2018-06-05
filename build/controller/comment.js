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
class Comment {
    static getComment(bloglistid) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `select * from comments where bloglistid=${mysqlutil_1.default.escape(bloglistid)}`;
            if (process.env.debug) {
                console.log(sql);
            }
            return yield global.asynConPool.queryAsync(sql);
        });
    }
    static addComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            comment = mysqlutil_1.default.escapeAll(comment);
            let sql = `insert into comments(bloglistid,author,comment,parent)
             values(${comment.bloglistid},${comment.author},${comment.comment},${comment.parent})`;
            if (process.env.debug) {
                console.log(sql);
            }
            return yield global.asynConPool.queryAsync(sql);
        });
    }
}
exports.default = Comment;
