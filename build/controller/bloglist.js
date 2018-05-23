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
class BlogList {
    static getBlogList(page_num, page_size, sort_type, tag) {
        return __awaiter(this, void 0, void 0, function* () {
            let sort = ' order by `pub_datetime` desc ';
            let tagcondition = '';
            if (tag) {
                tagcondition += ' where tag=' + mysqlutil_1.default.escape(tag);
            }
            if (sort_type) {
                if (sort_type === 'like') {
                    sort = ' order by `like` desc ';
                }
                else if (sort_type === 'browse_count') {
                    sort = ' order by `browse_count` desc ';
                }
            }
            let sql1 = `select * from bloglist ${tagcondition} ${sort} limit ${page_num * page_size},${page_size}`;
            let bloglist = (yield global.asynConPool.queryAsync(sql1));
            let sql2 = `select count(1) as total_page from bloglist`;
            if (process.env.debug) {
                console.log(sql1 + ';' + sql2);
            }
            let total_page = yield mysqlutil_1.default.query(sql2);
            return { bloglist, total_page };
        });
    }
    static getbloginfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = 'select * from bloglist where id=' + mysql_1.default.escape(id);
            if (process.env.debug) {
                console.log(sql);
            }
            return yield mysqlutil_1.default.queryOne(sql);
        });
    }
    static insertbloginfo(bloglist) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `insert into bloglist(title,author,tag) values(${mysql_1.default.escape(bloglist.title)},
        ${mysql_1.default.escape(bloglist.author)},${mysql_1.default.escape(bloglist.tag)})`;
            if (process.env.debug) {
                console.log(sql);
            }
            return yield global.asynConnection.queryAsync(sql);
        });
    }
}
exports.default = BlogList;
