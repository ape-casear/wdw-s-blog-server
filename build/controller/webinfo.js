"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class WebInfo {
    static update_count(type) {
        return __awaiter(this, void 0, void 0, function* () {
            let web_info_client = yield global.mongoDb.collection('web_info');
            let web_info_data = yield web_info_client.findOne({ "name": "web_info" });
            console.log(web_info_data);
            if (type === 'visit') {
                web_info_data.visit_count += 1;
            }
            else if (type === 'comment') {
                web_info_data.total_comment += 1;
            }
            else if (type === 'blog') {
                web_info_data.blog_count += 1;
            }
            let result = yield web_info_client.update({ "name": "web_info" }, { "name": "web_info", "visit_count": web_info_data.visit_count,
                "total_comment": web_info_data.total_comment, "blog_count": web_info_data.blog_count });
            return result;
        });
    }
    static get_count() {
        return __awaiter(this, void 0, void 0, function* () {
            let web_info_client = yield global.mongoDb.collection('web_info');
            let web_info_data = yield web_info_client.findOne({ "name": "web_info" });
            return web_info_data;
        });
    }
}
module.exports = WebInfo;
