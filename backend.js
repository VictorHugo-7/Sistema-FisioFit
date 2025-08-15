import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(express.json());

// Configuração do CORS mais específica para desenvolvimento
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'], // Vite/React dev server
    credentials: true
}));

async function conectarAoMongoDB() {
    if (!MONGO_URL) {
        throw new Error("A variável MONGO_URL não está definida no arquivo .env");
    }
    await mongoose.connect(MONGO_URL);
    console.log("Conectado ao MongoDB!");
}

const usuarioSchema = new mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
usuarioSchema.plugin(uniqueValidator);
const Usuario = mongoose.model("Usuario", usuarioSchema);

// Middleware para verificar token JWT
const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ mensagem: "Token não fornecido" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ mensagem: "Token inválido" });
    }
};

app.post('/signup', async (req, res) => {
    try {
        const { login, password } = req.body;

        // Validações básicas
        if (!login || !password) {
            return res.status(400).json({ mensagem: "Login e senha são obrigatórios" });
        }

        const criptografada = await bcrypt.hash(password, 10);
        const usuario = new Usuario({ login, password: criptografada });
        await usuario.save();
        res.status(201).json({ mensagem: "Usuário criado com sucesso" });
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' && error.errors.login) {
            res.status(409).json({ mensagem: "Este usuário já existe" });
        } else {
            res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
    }
});

app.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(400).json({ mensagem: "Login e senha são obrigatórios" });
        }

        const u = await Usuario.findOne({ login });
        if (!u) return res.status(401).json({ mensagem: "login inválido" });

        const senhaValida = await bcrypt.compare(password, u.password);
        if (!senhaValida) return res.status(401).json({ mensagem: "senha inválida" });

        const token = jwt.sign({ login }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token, login });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
});

// Rota protegida de exemplo
app.get('/protected', verificarToken, (req, res) => {
    res.json({ mensagem: "Acesso autorizado", user: req.user });
});

// Rota para verificar se o token ainda é válido
app.get('/verify-token', verificarToken, (req, res) => {
    res.json({ valid: true, user: req.user });
});

app.listen(PORT, async () => {
    try {
        await conectarAoMongoDB();
        console.log(`Servidor rodando na porta ${PORT}`);
    } catch (e) {
        console.log('Erro', e);
    }
});