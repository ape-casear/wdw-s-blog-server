"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    transactions(sqls) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                global.connectionPool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
                    // connected! (unless `err` is set)
                    for (let sql of sqls) {
                        try {
                            yield this.ascynQuery(connection, sql).catch((e) => {
                                connection.rollback();
                                throw e;
                            });
                        }
                        catch (e) {
                            console.error(e.stack);
                            rej({ code: 100, msg: 'transaction failed' });
                        }
                    }
                    connection.commit((e) => {
                        if (e) {
                            console.error(e);
                            connection.rollback();
                        }
                        res({ code: 0, msg: 'transaction succeed' });
                    });
                }));
            });
        });
    },
    ascynQuery(connection, sql) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, rejects) => {
                if (process.env.debug) {
                    console.log(sql);
                }
                connection.query(sql, (err, result) => {
                    if (err) {
                        rejects(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
        });
    },
    query(sql) {
        return __awaiter(this, void 0, void 0, function* () {
            if (process.env.debug) {
                console.log(sql);
            }
            return new Promise((res, rej) => {
                global.connectionPool.query(sql, (err, result) => {
                    if (err)
                        throw err;
                    res(result);
                });
            });
        });
    },
    queryOne(sql) {
        return __awaiter(this, void 0, void 0, function* () {
            if (process.env.debug) {
                console.log(sql);
            }
            return new Promise((res, rej) => {
                global.connectionPool.query(sql, (err, result) => {
                    if (err)
                        throw err;
                    res(result[0]);
                });
            });
        });
    }
};