//icons setup
import { SiYoutubemusic } from "react-icons/si";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { RiLoginCircleFill } from "react-icons/ri";
import { RiLogoutCircleRFill } from "react-icons/ri";

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from "next/router";
import NavbarHeader from './NavbarHeader'
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
    if (session) {
      setProfileDisplay('visible text-fuchsia-900');
    }
    const handleScroll = () => {
      if (window.scrollY >= 70) {
        setScrolled(true);
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll);
  }, [session]);



  return (
    <div className='flex flex-row-reverse justify-around items-center min-w-[450px] w-max
    mx-auto h-fit p-2 rounded-b-lg shadow-lg shadow-fuchsia-900 
    ' >
      <div className={`hidden lg:inline fixed right-1 bottom-[1px] lg:w-[100px] z-10 transition-all duration-500 ease-in-out ${scrolled ? 'opacity-40  cursor-pointer' : ' opacity-0'}`} >
        <NavbarHeader />
      </div>
      <div className='w-min-[100px] flex justify-center items-center'>
        <Link href={session ? '/userHome' : '/'}>
          <SiYoutubemusic className=' text-fuchsia-400  opacity-80 hover:opacity-100 hover:ring-1 ring-fuchsia-100' style={iconStyle} />
        </Link>
        <button className={profileDisplay}>
          <MdOutlineLibraryMusic onClick={() => router.push('/userLibrary')} className=' text-fuchsia-400 opacity-80 hover:opacity-100 hover:ring-1 ring-fuchsia-100' style={iconStyle} />
        </button>

        {!session ?
          <RiLoginCircleFill onClick={loginModal.onOpen} className=' text-fuchsia-400  opacity-80 hover:opacity-100 hover:ring-1 ring-emerald-300' style={iconStyle} />
          : <>
            <div className='inline'>
              <RiLogoutCircleRFill onClick={() => {
                signOut({ callbackUrl: '/' });
                localStorage.removeItem('session');
                localStorage.removeItem('user');
                localStorage.removeItem('nextauth.message');
              }} className=' text-fuchsia-400  opacity-80 hover:opacity-100 hover:ring-1 ring-rose-500' style={iconStyle} />
            </div>
          </>
        }
      </div>

      <div style={{ textAlign: 'center', fontSize: '11px', position: 'relative' }}>
        <Image onClick={() => router.push('/')}
          src="/logo-comping-machine-full-color-white.png"
          height={60}
          width={500}
          style={{ objectFit: "cover", width: '300px', height: '60px', position: 'relative', right: '2%', top: '6px', opacity: '0.85' }}
          alt="cm-full-logo" />
        <span className='absolute top-10 left-[60px] text-fuchsia-900'> {session ? `| Logged as ${session.user.name}` : ''}</span>
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
  display:'inline'
}



export default Navbar;

/*
 <FontAwesomeIcon onClick={() => router.push('/login')} className=' text-fuchsia-100 ring ring-pink-500 ring-offset-1 opacity-80 hover:opacity-100' style={iconStyle} icon={faUser} /> 
*/