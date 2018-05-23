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
const koa_router_1 = __importDefault(require("koa-router"));
const blog_1 = __importDefault(require("../controller/blog"));
const bloglist_1 = __importDefault(require("../controller/bloglist"));
const webinfo_1 = __importDefault(require("../controller/webinfo"));
const fs_1 = __importDefault(require("fs"));
const router = new koa_router_1.default();
//根据id获取blog
router.get('/blog/:id', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { id } = ctx.params;
    let result_content = yield blog_1.default.getBlog(id);
    let result_info = yield bloglist_1.default.getbloginfo(id);
    ctx.body = { code: 0, msg: 'ok', data: { content: result_content, info: result_info } };
}));
router.post('/fortest', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { blog } = ctx.request.body.files;
    let { title, author, type } = ctx.request.body.fields;
    let data = fs_1.default.readFileSync(ctx.request.body.files.blog.path);
    webinfo_1.default.update_count('blog');
    console.log(data.toString());
    try {
        yield global.asynConnection.beginTransactionAsync();
        let result2 = yield bloglist_1.default.insertbloginfo({ title, author, type });
        console.log(result2);
        let result1 = yield blog_1.default.insertBlog({ id: 0, bloglistid: result2.insertId, blog: data.toString() });
        yield global.asynConnection.commitAsync();
        ctx.body = { code: 0, msg: [result2, result1] };
    }
    catch (e) {
        yield global.asynConnection.rollbackAsync();
        ctx.body = { code: 100, msg: 'insert failed' };
        throw e;
    }
}));
module.exports = router.middleware();
