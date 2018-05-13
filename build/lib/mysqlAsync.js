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
const bluebird_1 = __importDefault(require("bluebird"));
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        global.asynConPool = bluebird_1.default.promisifyAll(global.connectionPool);
        const connection = yield global.asynConPool.getConnectionAsync();
        global.asynConnection = bluebird_1.default.promisifyAll(connection);
        console.log('mysql async done!');
    });
}
module.exports = init;
