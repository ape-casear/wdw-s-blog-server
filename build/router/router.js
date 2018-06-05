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
const bloglist_1 = __importDefault(require("./bloglist"));
const blog_1 = __importDefault(require("./blog"));
const comment_1 = __importDefault(require("./comment"));
const user_1 = __importDefault(require("./user"));
const fileUpload_1 = __importDefault(require("../lib/fileUpload"));
const web_info_1 = __importDefault(require("./web_info"));
//////////scrape and img///////////////
const btc_1 = __importDefault(require("../scrape_img_router/btc"));
const graphics_card_1 = __importDefault(require("../scrape_img_router/graphics_card"));
const img_1 = __importDefault(require("../scrape_img_router/img"));
const zhihu_img_1 = __importDefault(require("./zhihu_img"));
const zhihu_1 = __importDefault(require("../scrape_img_router/zhihu"));
const zhihu_comment_1 = __importDefault(require("../scrape_img_router/zhihu_comment"));
const router = new koa_router_1.default();
router.get('/fortest', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    yield ctx.render('login');
}));
router.post('/fortest', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let { imgs } = ctx.request.body.files;
    let imgPair = [];
    if (!imgs.length) {
        imgs = [imgs];
    }
    for (let img of imgs) {
        let newpath = yield fileUpload_1.default.imgUpload(img);
        imgPair.push({ name: img.name, newpath });
    }
    ctx.body = { msg: 'ok', data: imgPair };
}));
router.get('/', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    ctx.type = 'json';
    ctx.body = { code: 1, msg: 'hello koa' };
}));
router.use(bloglist_1.default);
router.use(blog_1.default);
router.use(comment_1.default);
router.use(user_1.default);
router.use(web_info_1.default);
router.use(btc_1.default);
router.use(graphics_card_1.default);
router.use(img_1.default);
router.use(zhihu_img_1.default);
router.use(zhihu_1.default);
router.use(zhihu_comment_1.default);
module.exports = router.middleware();
