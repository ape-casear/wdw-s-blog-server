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
const mysqlutil_1 = __importDefault(require("../model/mysqlutil"));
class Blog {
    static getBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `select * from blog where id =` + mysql_1.default.escape(id);
            if (process.env.debug) {
                console.log(sql);
            }
            let result = yield mysqlutil_1.default.queryOne(sql);
            return result;
        });
    }
    static insertBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `insert into blog(bloglistid,blog) values(${mysql_1.default.escape(blog.bloglistid)},
            ${mysql_1.default.escape(blog.blog)})`;
            if (process.env.debug) {
                console.log(sql);
            }
            return yield global.asynConnection.queryAsync(sql);
        });
    }
}
exports.default = Blog;
