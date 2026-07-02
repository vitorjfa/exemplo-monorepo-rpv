import { useRouter } from "next/router";

export default function Users() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        {" "}
        <h1>Usuários específico</h1>
      </div>
    </>
  );
}
