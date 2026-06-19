import { api } from "@/api/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { get } from "http";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

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
      console.log("Logged feito com sucesso");
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("email", email);
    console.log("password", password);

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
            <label htmlFor="email">E-mail</label>
            <input
              className="border boder-slate-800 rounded-sm px-4 py-2 text-lg"
              placeholder="Enter your e-mail address"
              type="text"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex flex-col mb-8">
            <label htmlFor="password">Password</label>
            <input
              className="border boder-slate-800 rounded-sm px-4 py-2 text-lg"
              placeholder="Type your password"
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="w-full">
            <button className="p-4 w-full rounded-lg bg-sky-900 hover:bg-sky-600 transition text-gray-200 text-lg">
              Enviar
            </button>
          </div>
        </form>
        <div className="flex">
          <button
            className="p-4 w-full rounded-lg bg-sky-900 hover:bg-sky-600 transition text-gray-200 text-lg"
            onClick={handlePerfil}
          >
            Rota /perfil
          </button>
        </div>
        <div className="flex">
          <button
            className="p-4 w-full rounded-lg bg-sky-900 hover:bg-sky-600 transition text-gray-200 text-lg"
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
      </div>
    </>
  );
}

// #### CRIAR EM SEQUENCIA ####
// Criar um terceiro botão chamado "Logout" onde deverá remover o token do LocalStorage
