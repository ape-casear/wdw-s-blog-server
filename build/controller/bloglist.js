"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class BlogList {
    static getBlogList(page_num, page_size) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield Promise.all([new Promise(res => {
                    let sql = `select * from bloglist limit ${page_num * page_size},${page_size}`;
                    global.connectionPool.query(sql, (err, result) => {
                        if (err)
                            throw err;
                        res(result);
                    });
                }), new Promise(res => {
                    let sql = `select count(1) as total_page from bloglist`;
                    global.connectionPool.query(sql, (err, result) => {
                        if (err)
                            throw err;
                        res(result[0]);
                    });
                })]);
            console.log(results);
            let datas = results[0];
            for (let key in datas) {
                console.log(`key:${key},value:${datas[key]}`);
            }
            let total_pate = results[1];
            console.log((typeof total_pate));
            return { datas, total_pate };
        });
    }
}
exports.default = BlogList;
