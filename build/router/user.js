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
const user_1 = __importDefault(require("../controller/user"));
const router = new koa_router_1.default();
router.get('/user/:id', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { id } = ctx.params;
    let result = yield user_1.default.getUser(id);
    ctx.body = result;
}));
router.post('/user', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { author, password, telephone } = ctx.body;
    let result = yield user_1.default.putUser({ id: 0, author, password, telephone, create_time: '', snake_score: 0, mine_score: 0 });
    ctx.body = { code: 0, msg: result };
}));
router.post('/user/update', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { snake_score, mine_score, id } = ctx.body;
    let address = ctx.request.ip;
    if (address !== '::1') {
        ctx.body = { code: 400, msg: '嘿，小伙，想干啥呢！' };
        return;
    }
    let result = yield user_1.default.updateUser({ id, author: '', password: '', telephone: 0, create_time: '', snake_score, mine_score });
    ctx.body = { code: 0, msg: result };
}));
module.exports = router.middleware();
