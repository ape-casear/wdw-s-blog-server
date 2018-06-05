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
const crypto_1 = __importDefault(require("crypto"));
const router = new koa_router_1.default();
router.get('/user/:id', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { id } = ctx.params;
    let result = yield user_1.default.getUser(id);
    ctx.body = { coed: 0, data: result[0] };
}));
router.post('/user/login', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { author, password } = ctx.request.body;
    const hash = crypto_1.default.createHash('sha256');
    password = hash.update(password + 'wdwblog').digest('hex');
    let result = yield user_1.default.login(author, password);
    if (result instanceof Array && result[0] && result[0].id) {
        result[0].password = '';
        result[0].telephone = '';
        ctx.body = { code: 0, data: result[0] };
        return;
    }
    ctx.body = { code: 500, msg: '账号或密码错误' };
}));
router.post('/user', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { author, password, telephone } = ctx.request.body;
    console.log({ author, password, telephone });
    let user = yield user_1.default.getUserByName(author);
    if (user[0] && user[0].id) {
        ctx.body = { code: 400, msg: '用户名已存在' };
        return;
    }
    const hash = crypto_1.default.createHash('sha256');
    password = hash.update(password + 'wdwblog').digest('hex');
    let result = yield user_1.default.putUser({ id: 0, author, password, telephone, create_time: '', snake_score: 0, mine_score: 0 });
    ctx.body = { code: 0, msg: result };
}));
router.get('/user/checkname/:author', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { author } = ctx.params;
    let user = yield user_1.default.getUserByName(author);
    if (user[0] && user[0].id) {
        ctx.body = { code: 400, msg: '用户名已存在' };
    }
    else {
        ctx.body = { code: 0, msg: 'ok' };
    }
}));
router.post('/user/update', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { snake_score, mine_score, id } = ctx.request.body;
    let address = ctx.request.ip;
    if (address !== '::1') {
        ctx.body = { code: 400, msg: '嘿，小伙，想干啥呢！' };
        return;
    }
    let result = yield user_1.default.updateUser({ id, author: '', password: '', telephone: 0, create_time: '', snake_score, mine_score });
    ctx.body = { code: 0, msg: result };
}));
module.exports = router.middleware();
