import express, { Response } from "express";
import cors from "cors";
import { login } from "./controllers/authController";
import { AuthRequest, verifyJWT } from "./middleware/authMiddleware";
import { db } from "./database/connection";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Servidor rodando!" });
});

app.post("/login", login);

app.get("/perfil", verifyJWT, (req: AuthRequest, res: Response) => {
  res.status(200).json({ message: `Seja bem vindo! Seu id é ${req.userId}` });
});

app.get("/users", (req, res) => {
  // return res.status(400).json({ message: "Não habilitado!" })
  res.status(200).json({
    data: {
      infos: {
        users: [
          { name: "Daniel", age: 35 },
          { name: "Joel", age: 45 },
        ],
      },
    },
  });
});

app.post("/user/register", async (req, res) => {
  console.log("#".repeat(50));
  console.log("req.body", req.body);
  console.log("#".repeat(50));
  const { name, email, password } = req.body;
  // Trazer o usuário de Código 1
  // Mostrar no retorno somente Nome e Email
  const retornoBanco = await db.raw(
    `INSERT INTO users (name,email,password_hashed) VALUES ( ?, ?, ? );`,
    [name, email, password],
  );
  const retornoBancoEmail = await db.raw(
    `SELECT name,email FROM users WHERE email = ?;`,
    [email],
  );

  if (retornoBancoEmail.rows.length > 0) {
    console.log("Email já cadastrado!");
    console.log(retornoBancoEmail.rows[0]);
  } else {
    console.log("Email disponível!");
  }
  // console.log(retornoBanco[0][0].name)

  return res.status(200).json({ message: "Usuário cadastrado com sucesso !" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
