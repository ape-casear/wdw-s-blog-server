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
const bloglist_1 = __importDefault(require("../controller/bloglist"));
const router = new koa_router_1.default();
router.get('/bloglist/:page_num', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let { page_num, page_size } = ctx.params;
    let result = yield bloglist_1.default.getBlogList(page_num, page_size || 10);
    ctx.body = result;
}));
module.exports = router.middleware();
