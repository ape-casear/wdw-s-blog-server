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
const graphics_card_1 = __importDefault(require("../scrape_controller/graphics_card"));
const router = new koa_router_1.default();
router.get('/graphics_card', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { date1, date2 } = ctx.request.body;
    let result = yield graphics_card_1.default.getGraphics_card(date1, date2);
    ctx.body = { coed: 0, msg: result };
}));
router.put('/graphics_card', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let { name, url, price, type } = ctx.request.body;
    let result = yield graphics_card_1.default.putGraphics_card({
        id: 0, name, url, price, scrape_date: '', type
    });
    ctx.body = { coed: 0, msg: result };
}));
exports.default = router.middleware();
