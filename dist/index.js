"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const db_1 = __importDefault(require("./utils/db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
}));
app.use("/api/users", user_route_1.default);
app.get("/", (req, res) => {
    res.send("Hello, TypeScript + Node.js!");
});
(0, db_1.default)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.log(error);
});
