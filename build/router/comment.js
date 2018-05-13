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
const comment_1 = __importDefault(require("../controller/comment"));
const router = new koa_router_1.default();
router.get('/comment/:bloglistid', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { bloglistid } = ctx.params;
    ctx.body = yield comment_1.default.getComment(bloglistid);
}));
router.post('/comment/addcomment', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { bloglistid, author, comment, parent } = ctx.request.body;
    ctx.body = yield comment_1.default.addComment({ id: 0, bloglistid, author, comment, parent, comment_datatime: '' });
}));
exports.default = router.middleware();
