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
const koa_router_1 = __importDefault(require("koa-router"));
const request_1 = __importDefault(require("request"));
const router = new koa_router_1.default();
const timeout = (ms) => new Promise(res => setTimeout(res, ms));
router.get('/img/zhihu', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { img } = ctx.query;
    let url = ctx.url;
    console.log(url);
    url = url.substring(url.indexOf('img=') + 4);
    console.log(url);
    request_1.default.get(url).on('error', function (err) {
        console.log(err);
    }).on('response', (response) => {
        console.log('response');
    }).on('finish', () => {
        console.log('finish');
        ctx.body = { msg: 'done' };
    }).pipe(ctx.res);
    yield timeout(500);
}));
exports.default = router.middleware();
