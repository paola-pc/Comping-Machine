import { useRouter } from "next/router";

const NavbarHeader = () => {
  const router = useRouter()
  return (
    <div>
      <h1 className="text-3xl text-sky-500"
        onClick={() => router.push('/')}
      >
        Comping Machine
      </h1>
    </div>
  )
}

export default NavbarHeader;