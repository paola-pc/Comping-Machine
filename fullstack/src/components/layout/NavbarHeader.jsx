import { useRouter } from "next/router";
import Image from "next/image";

const NavbarHeader = () => {
  const router = useRouter()
  return (
    <div className="hidden lg:block md:block">
      <Image
        onClick={() => router.push('/')}
        src="/logo-black.png"
        height={200}
        width={200}>
        </Image>
    </div>
  )
}

export default NavbarHeader;