"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var typeorm_1 = require("typeorm");
var transaction_schema_1 = require("../assets/model/transaction.schema");
var DatabaseService = /** @class */ (function () {
    function DatabaseService(name) {
        this.init(name);
        this.initListeners();
    }
    DatabaseService.prototype.init = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, typeorm_1.createConnection({
                                name: name,
                                type: 'sqlite',
                                synchronize: true,
                                logging: true,
                                logger: 'simple-console',
                                database: 'host/assets/data/database.sqlite',
                                entities: [transaction_schema_1.Transaction]
                                // ,
                                // dropSchema: true
                            })];
                    case 1:
                        _a.connection = _b.sent();
                        this.transactionRepo = this.connection.getRepository(transaction_schema_1.Transaction);
                        return [2 /*return*/];
                }
            });
        });
    };
    DatabaseService.prototype.initListeners = function () {
        var _this = this;
        electron_1.ipcMain.on('transactions', function (event, args) { return __awaiter(_this, void 0, void 0, function () {
            var returnValue, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnValue = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.transactionRepo.createQueryBuilder("tr")
                                .where("tr.from = :account or tr.to = :account", { account: args[0] })
                                .orderBy("tr.id", "DESC")
                                .getMany()
                                .then(function (res) { return returnValue = res; })
                                .catch(function (error) { return console.log(error); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        event.returnValue = null;
                        throw err_1;
                    case 4:
                        event.returnValue = returnValue;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        electron_1.ipcMain.on('mainTransactions', function (event, args) { return __awaiter(_this, void 0, void 0, function () {
            var returnValue, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnValue = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.transactionRepo.createQueryBuilder("tr")
                                .where("(tr.from = :account or tr.to = :account) and (tr.base = 1 and tr.target = 1 or tr.base = 1 and tr.target = 2 or tr.base = 2 and tr.target = 1)", { account: args[0] })
                                .orderBy("tr.id", "DESC")
                                .getMany()
                                .then(function (res) { return returnValue = res; })
                                .catch(function (error) { return console.log(error); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        err_2 = _a.sent();
                        event.returnValue = null;
                        throw err_2;
                    case 4:
                        event.returnValue = returnValue;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        electron_1.ipcMain.on('rewardTransactions', function (event, args) { return __awaiter(_this, void 0, void 0, function () {
            var returnValue, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnValue = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.transactionRepo.createQueryBuilder("tr")
                                .where("(tr.from = :account or tr.to = :account) and (tr.base = 3 and tr.target = 1 or tr.base = 3 and tr.target = 2)", { account: args[0] })
                                .orderBy("tr.id", "DESC")
                                .getMany()
                                .then(function (res) { return returnValue = res; })
                                .catch(function (error) { return console.log(error); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        err_3 = _a.sent();
                        event.returnValue = null;
                        throw err_3;
                    case 4:
                        event.returnValue = returnValue;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        electron_1.ipcMain.on('mainToMainTransactions', function (event, args) { return __awaiter(_this, void 0, void 0, function () {
            var returnValue, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnValue = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.transactionRepo.createQueryBuilder("tr")
                                .where("(tr.from = :account or tr.to = :account) and tr.base = 1 and tr.target = 1", { account: args[0] })
                                .orderBy("tr.id", "DESC")
                                .getMany()
                                .then(function (res) { return returnValue = res; })
                                .catch(function (error) { return console.log(error); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        err_4 = _a.sent();
                        event.returnValue = null;
                        throw err_4;
                    case 4:
                        event.returnValue = returnValue;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        electron_1.ipcMain.on('mainToStakeTransactions', function (event, args) { return __awaiter(_this, void 0, void 0, function () {
            var returnValue, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnValue = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.transactionRepo.createQueryBuilder("tr")
                                .where("(tr.from = :account or tr.to = :account) and tr.base = 1 and tr.target = 2", { account: args[0] })
                                .orderBy("tr.id", "DESC")
                                .getMany()
                                .then(function (res) { return returnValue = res; })
                                .catch(function (error) { return console.log(error); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        err_5 = _a.sent();
                        event.returnValue = null;
                        throw err_5;
                    case 4:
                        event.returnValue = returnValue;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        electron_1.ipcMain.on('rewardToMainTransactions', function (event, args) { return __awaiter(_this, void 0, void 0, function () {
            var returnValue, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnValue = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.transactionRepo.createQueryBuilder("tr")
                                .where("(tr.from = :account or tr.to = :account) and tr.base = 3 and tr.target = 1", { account: args[0] })
                                .orderBy("tr.id", "DESC")
                                .getMany()
                                .then(function (res) { return returnValue = res; })
                                .catch(function (error) { return console.log(error); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        err_6 = _a.sent();
                        event.returnValue = null;
                        throw err_6;
                    case 4:
                        event.returnValue = returnValue;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        electron_1.ipcMain.on('rewardToStakeTransactions', function (event, args) { return __awaiter(_this, void 0, void 0, function () {
            var returnValue, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnValue = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.transactionRepo.createQueryBuilder("tr")
                                .where("(tr.from = :account or tr.to = :account) and tr.base = 3 and tr.target = 2", { account: args[0] })
                                .orderBy("tr.id", "DESC")
                                .getMany()
                                .then(function (res) { return returnValue = res; })
                                .catch(function (error) { return console.log(error); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        err_7 = _a.sent();
                        event.returnValue = null;
                        throw err_7;
                    case 4:
                        event.returnValue = returnValue;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        electron_1.ipcMain.on('stakeToMainTransactions', function (event, args) { return __awaiter(_this, void 0, void 0, function () {
            var returnValue, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnValue = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.transactionRepo.createQueryBuilder("tr")
                                .where("(tr.from = :account or tr.to = :account) and tr.base = 2 and tr.target = 1", { account: args[0] })
                                .orderBy("tr.id", "DESC")
                                .getMany()
                                .then(function (res) { return returnValue = res; })
                                .catch(function (error) { return console.log(error); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        err_8 = _a.sent();
                        event.returnValue = null;
                        throw err_8;
                    case 4:
                        event.returnValue = returnValue;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    DatabaseService.prototype.countTransaction = function (hashargs) {
        return __awaiter(this, void 0, void 0, function () {
            var count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transactionRepo
                            .createQueryBuilder('tr')
                            .select('DISTINCT(`hash`)')
                            .where("tr.hash = :hash", { hash: hashargs })
                            .getCount()];
                    case 1:
                        count = _a.sent();
                        return [2 /*return*/, count];
                }
            });
        });
    };
    DatabaseService.prototype.addTransaction = function (from, to, value, base, target, hash, receive) {
        return __awaiter(this, void 0, void 0, function () {
            var trans, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        trans = new transaction_schema_1.Transaction();
                        return [4 /*yield*/, this.countTransaction(hash)];
                    case 1:
                        count = _a.sent();
                        if (count > 0) {
                            return [2 /*return*/];
                        }
                        trans.type = 0;
                        trans.value = value;
                        trans.from = from;
                        trans.to = to;
                        trans.base = base;
                        trans.target = target;
                        trans.hash = hash;
                        trans.receive = receive;
                        // 사용안하는 데이터
                        // trans.blockHash = "0x0000000000000000000000000000000000000000000000000000000000000000";
                        // trans.blockNumber = 0;
                        // trans.gas = 0;
                        // trans.gasPrice = 0;
                        // trans.input = "0x";
                        // trans.nonce = 0;
                        // trans.r = "0x0000000000000000000000000000000000000000000000000000000000000000";
                        // trans.s = "0x0000000000000000000000000000000000000000000000000000000000000000";
                        // trans.transactionIndex = 0;
                        // trans.v = "0x00";
                        return [4 /*yield*/, this.transactionRepo.save(trans)];
                    case 2:
                        // 사용안하는 데이터
                        // trans.blockHash = "0x0000000000000000000000000000000000000000000000000000000000000000";
                        // trans.blockNumber = 0;
                        // trans.gas = 0;
                        // trans.gasPrice = 0;
                        // trans.input = "0x";
                        // trans.nonce = 0;
                        // trans.r = "0x0000000000000000000000000000000000000000000000000000000000000000";
                        // trans.s = "0x0000000000000000000000000000000000000000000000000000000000000000";
                        // trans.transactionIndex = 0;
                        // trans.v = "0x00";
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return DatabaseService;
}());
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=databaseService.js.map