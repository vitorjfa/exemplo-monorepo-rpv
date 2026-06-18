import { api } from "@/api/axiosInstance";
import { AxiosError } from "axios";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("email", email);
    console.log("password", password);

    // const handlePerfil = async () => await api.get("/pefil", {})};

    try {
      const response = await api.post("/login", { email, password });
      console.log("response", response);
    } catch (error) {
      if (error instanceof AxiosError) {
        return console.warn(error.response?.data?.message);
      }
    }

    try {
      const response = await api.get("/perfil");
      console.log("response", response);
    } catch (error) {
      if (error instanceof AxiosError) {
        return console.warn(error.response?.data?.message);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen w-full">
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
            className="p-4 w-100 rounded-lg bg-sky-900 hover:bg-sky-600 transition text-gray-200 text-lg"
            onClick={async () => await api.get("/perfil", {})}
          >
            Perfil
          </button>
        </div>
      </div>
    </>
  );
}
