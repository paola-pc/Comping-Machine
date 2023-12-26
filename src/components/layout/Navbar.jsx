//icons
import { SiYoutubemusic } from "react-icons/si";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { AiOutlineLogin } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from "next/router";
import HeaderLogo from './HeaderLogo'
import Link from 'next/link'
import Image from 'next/image'
import useLoginModal from '../../../Hooks/useLoginModal'

const Navbar = () => {
  const { data: session } = useSession();
  const loginModal = useLoginModal();
  let [profileDisplay, setProfileDisplay] = useState('hidden');
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter()

  useEffect(() => {
    if (session) setProfileDisplay('visible text-fuchsia-900');
  }, [session]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className='flex justify-between items-center w-[450px] md:w-full mx-auto h-fit p-2 rounded-b-lg shadow-lg shadow-fuchsia-900' >
      <div className="text-center text-xs relative">
        <Image
          onClick={scrollToTop}
          src="/logo-comping-machine-full-color-white.png"
          height={60}
          width={500}
          className="object-cover w-[300px] h-[60px] relative top-[6px]"
          alt="cm-full-logo"
        // You might need to add custom styles or a workaround for `right: '2%'`
        />
        <span className="absolute top-10 left-[60px] text-fuchsia-900">
          {session ? `| Logged as ${session.user.name}` : ''}
        </span>
      </div>

      <div className='w-min-[100px] flex justify-center items-center'>
        <Link href={session ? '/userHome' : '/'}>
          <SiYoutubemusic className=' text-fuchsia-400  opacity-80 hover:opacity-100 hover:text-emerald-200' style={iconStyle} />
        </Link>
        <button className={profileDisplay}>
          <MdOutlineLibraryMusic onClick={() => router.push('/userLibrary')} className=' text-fuchsia-400 opacity-80 hover:opacity-100 hover:text-emerald-200' style={iconStyle} />
        </button>

        {!session ?
          <AiOutlineLogin onClick={loginModal.onOpen} className=' text-fuchsia-400  opacity-80 hover:opacity-100 hover:text-emerald-200' style={iconStyle} />
          : <>
            <div className='inline'>
              <RiLogoutCircleRLine onClick={() => {
                signOut({ callbackUrl: '/' });
                localStorage.removeItem('session');
                localStorage.removeItem('user');
                localStorage.removeItem('nextauth.message');
              }} className=' text-fuchsia-400  opacity-80 hover:opacity-100 hover:text-rose-400' style={iconStyle} />
            </div>
          </>
        }
      </div>
    </div>
  )
}

const iconStyle = {

  height: '32px',
  width: '32px',
  margin: '2px 10px',
  backgroundColor: 'inherit',
  borderRadius: '50%',
  padding: '2px',
  cursor: 'pointer',
  display: 'inline'
}

export default Navbar;