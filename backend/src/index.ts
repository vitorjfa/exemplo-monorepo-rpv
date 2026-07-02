import express, { Response } from "express";
import cors from "cors";
import { login } from "./controllers/authController";
import { AuthRequest, verifyJWT } from "./middleware/authMiddleware";
import { db } from "./database/connection";
import { config } from "node:process";
import { Knex } from "knex";

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

app.get("/users", verifyJWT, async (req, res) => {
  const { q, limit } = req.query;
  console.log("query params", req.query);
  // return res.status(400).json({ message: "Não habilitado!" })

  const baseQuery: Knex = await db("users");
  console.log("baseQuery", baseQuery);

  if (q) {
    baseQuery.whereILike("name", `%${q}%`);
  }

  const query = await db
    .select("id", "name", "email")
    .from("users")
    .limit(parseInt(limit as string) || 2);

  const mappedUsers = query.map((user) => {
    return { ...user, idAjustado: user.id + 10 };
  });

  console.log(mappedUsers);

  // const query = await db.select('id', 'name', 'email').from('users').whereILike('name', `%${q}%`).limit(parseInt(limit as string) || 10)
  console.log("retorno da query", query);
  res.status(200).json({
    data: {
      infos: {
        users: query,
        totalUsers: query.length,
        totalPages: 4,
        actualPage: 1,
        itensPage: 2,
      },
    },
  });
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  console.log("nova requisicao");

  const query = await db.select("name", "email", "id").from("users").where({
    id,
  });

  console.log("query length", query.length === 0);

  if (query.length === 0) {
    return res.status(204).json({ message: "Usuario não encontrado !" });
  }

  return res.status(200).json({
    message: "Usuário encontrado com sucesso!",
    data: {
      info: {
        users: query,
      },
    },
  });
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  const userExists = await db.select("*").from("users").where({ id });

  if (userExists.length === 0) {
    return res.status(400).json({ message: "Usuário não encontrado!" });
  }

  const deleteUser = await db.delete().from("users").where({ id });

  console.log("Remover", deleteUser);

  return res.status(200).json({ message: "Usuário removido com sucesso !" });
});

app.post("/user/register", async (req, res) => {
  console.log("#".repeat(50));
  console.log("req.body", req.body);
  console.log("#".repeat(50));
  const { name, email, password } = req.body;
  // Verificar se o email a ser cadastrado existe previamente no banco
  // Se EXISTIR deverá retornar erro 412 com a mensagem ( Não foi possível realizar a operação )

  const emails = await db.raw(`SELECT * FROM users WHERE email = ?`, [email]);
  const emailExists = emails[0].length > 0 ? true : false;

  if (emailExists) {
    return res
      .status(412)
      .json({
        message: "A requisição não pode ser concluída. Email já cadastrado.",
      });
  }

  await db.raw(
    `INSERT INTO users (name,email,password_hashed) VALUES ( ?, ?, ? );`,
    [name, email, password],
  );

  const [lastInserted] = await db.select("*").from("users").where({ email });
  console.log(lastInserted);
  console.log(lastInserted.id);

  return res.status(200).json({ message: "Usuário cadastrado com sucesso !" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
