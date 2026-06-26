import { api } from "@/api/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Cadastrar() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const route = useRouter()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('name', name)
    console.log('email', email)
    console.log('password', password)

    try {
      const response: AxiosResponse<{ message: string }> = await api.post('/user/register',
        { name, email, password }
      )
    } catch (error) {
      if (error instanceof AxiosError) {
        return console.warn(error.response?.data?.message)
      }
    }

    // try {
    //   // const response: AxiosResponse<{ auth: boolean, token: string }> = await api.post('/login', { email, password })

    //   if (response.data.auth) {
    //     const token = response.data.token
    //     localStorage.setItem('user_token', token)
    //   }
    // } catch (error) {
    //   if (error instanceof AxiosError) {
    //     return console.warn(error.response?.data?.message)
    //   }
    // }

  }

  return (
    <>
      <div className="flex flex-col gap-10 items-center justify-center min-h-screen w-full">
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center max-w-2xl">
          <div className="flex flex-col mb-8">
            <label htmlFor="name">Name</label>
            <input className="border boder-slate-800 rounded-sm px-4 py-2 text-lg" placeholder="Enter your name" type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} value={name} />
          </div>
          <div className="flex flex-col mb-8">
            <label htmlFor="email">E-mail</label>
            <input className="border boder-slate-800 rounded-sm px-4 py-2 text-lg" placeholder="Enter your e-mail address" type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>
          <div className="flex flex-col mb-8">
            <label htmlFor="password">Password</label>
            <input className="border boder-slate-800 rounded-sm px-4 py-2 text-lg" placeholder="Type your password" type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>
          <div className="w-full">
            <button className="p-4 w-full rounded-lg bg-sky-900 hover:bg-sky-600 transition text-gray-200 text-lg">Enviar</button>
             <button
          className="p-4 w-full rounded-lg bg-sky-900 hover:bg-sky-600 transition text-gray-200 text-lg"
          onClick={() => router.push("/")}
        >
          Logout Perfil
        </button>
          </div>
        </form>
      </div>
    </>
  );
}