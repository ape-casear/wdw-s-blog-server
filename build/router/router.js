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
const router = new koa_router_1.default();
router.get('/', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    ctx.type = 'json';
    ctx.body = { code: 1, msg: 'hello koa' };
}));
router.use(bloglist_1.default);
module.exports = router.middleware();
