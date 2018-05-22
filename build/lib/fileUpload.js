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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.default = {
    imgUpload(file) {
        return __awaiter(this, void 0, void 0, function* () {
            let newpath = path_1.default.join(__dirname, '../../public/img/' + file.name);
            // console.log(ctx.request.body.files)
            const read = fs_1.default.createReadStream(file.path);
            const write = fs_1.default.createWriteStream(newpath);
            const pub = new Promise((resolve, reject) => {
                var stream = read.pipe(write);
                stream.on('finish', function () {
                    resolve(`${process.env.host}:${process.env.port}/public/img/${file.name}`);
                });
            });
            return yield pub;
        });
    }
};
