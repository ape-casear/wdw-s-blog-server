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
const moment_1 = __importDefault(require("moment"));
exports.default = {
    imgUpload(file) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(ctx.request.body.files)
            const date = moment_1.default().format('YYYY-MM-DD');
            let newpath = path_1.default.join(__dirname, '../../public/img/' + date + '_' + file.name);
            const read = fs_1.default.createReadStream(file.path);
            const write = fs_1.default.createWriteStream(newpath);
            const pub = new Promise((resolve, reject) => {
                var stream = read.pipe(write);
                stream.on('finish', function () {
                    resolve(`http://www.weidongwei.com:${process.env.PORT}/public/img/${date}_${file.name}`);
                });
            });
            return yield pub;
        });
    }
};
