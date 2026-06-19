import { useRouter } from "next/router";

export default function Perfil() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen w-full">
      <div className="flex">
        <button
          className="p-4 w-full rounded-lg bg-sky-900 hover:bg-sky-600 transition text-gray-200 text-lg"
          onClick={() => router.push("/")}
        >
          Logout Perfil
        </button>
      </div>
    </div>
  );
}
