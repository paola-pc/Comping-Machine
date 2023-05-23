import { useRouter } from "next/router";

const NavbarHeader = () => {
  const router = useRouter()
  return (
    <div className="hidden lg:block md:block">
      <img
        onClick={() => router.push('/')}
        src="/logo-black.png"
        className="object-content w-40"></img>
    </div>
  )
}

export default NavbarHeader;