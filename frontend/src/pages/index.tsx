import { api } from "@/api/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleCadastro = () => {
    router.push("/cadastro");
  };

  const handlePerfil = async () => {
    try {
      const response = await api.get("/perfil");
      console.log("response", response);
      router.push("/perfil");
    } catch (error) {
      if (error instanceof AxiosError) {
        router.push("/perfil");
        return console.warn(error.response?.data?.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    console.log("Token removido do localStorage");

    if (!localStorage.getItem("user_token")) {
      console.log("Logout feito com sucesso");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: AxiosResponse<{ auth: boolean; token: string }> =
        await api.post("/login", { email, password });

      if (response.data.auth) {
        const token = response.data.token;

        localStorage.setItem("user_token", token);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return console.warn(error.response?.data?.message);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10 items-center justify-center min-h-screen w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center max-w-2xl"
        >
          <div className="flex flex-col mb-8">
            <label>Email</label>

            <input
              className="border rounded-sm px-4 py-2 text-lg"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="flex flex-col mb-8">
            <label>Password</label>

            <input
              className="border rounded-sm px-4 py-2 text-lg"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button className="p-4 w-full rounded-lg bg-sky-900 hover:bg-sky-600 text-gray-200">
            Enviar
          </button>
        </form>

        <button
          className="p-4 rounded-lg bg-sky-900 hover:bg-sky-600 text-gray-200"
          onClick={handleCadastro}
        >
          Rota /cadastro
        </button>

        <button
          className="p-4 rounded-lg bg-sky-900 hover:bg-sky-600 text-gray-200"
          onClick={handlePerfil}
        >
          Rota /perfil
        </button>

        <button
          className="p-4 rounded-lg bg-sky-900 hover:bg-sky-600 text-gray-200"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
}
