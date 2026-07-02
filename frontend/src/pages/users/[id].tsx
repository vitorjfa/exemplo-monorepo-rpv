import { api } from "@/api/axiosInstance";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function User() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const get = await api.get(`/users/${id}`);
        console.log("usuario capturado", get.data);
      } catch (error) {
        console.error("error", error);
      }
    };

    id && fetchUser();
  }, [id]);
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <h1>Usuário específico {id}</h1>
      </div>
    </>
  );
}
