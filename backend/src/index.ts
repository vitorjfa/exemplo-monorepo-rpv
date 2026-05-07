import Express from "express";

const app = Express();
const port = 3000;

app.use(Express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.get("/users", (req, res) => {
  res.status(200).json({
    data: {
      infos: {
        users: [
          {
            id: 1,
            name: "Vitor",
            age: "32",
          },
        ],
      },
    },
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
