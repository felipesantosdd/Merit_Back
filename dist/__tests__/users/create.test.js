"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const data_source_1 = require("../../data-source");
const app_1 = __importDefault(require("../../app"));
describe("/user", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // await AppDataSource.dropDatabase()
        yield connection.destroy();
    }));
    test("POST /users -  Deve ser possivel criar um usuario", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            nome: "felipe",
            email: "feliesantosdd@gmail.com",
            senha: "123456"
        };
        const response = yield (0, supertest_1.default)(app_1.default).post("/users").send(newUser);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("nome");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("senha");
        expect(response.status).toBe(201);
    }));
    it("POST /users - nao deve ser possivel criar mais de um usuario com o mesmo email", () => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = {
            nome: "Usuário Existente",
            email: "teste2@example.com",
            senha: "senha456"
        };
        yield (0, supertest_1.default)(app_1.default).post("/users").send(existingUser);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/users")
            .send(existingUser)
            .expect(409);
        expect(response.body.error).toBe("Este email já está sendo usado");
    }));
});