//icons setup
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faKeyboard, faUser, faStopCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
config.autoAddCss = false

import { useEffect, useState } from 'react'
// import useLoginModal from '../../../Hooks/useLoginModal'
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from "next/router";
import { faMusic, faRepeat } from '@fortawesome/free-solid-svg-icons'
import NavbarHeader from './NavbarHeader'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  const { data: session } = useSession();
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

  useEffect(() => {
    
  }, [])

  return (
    <div className='flex flex-row-reverse justify-around items-center min-w-[450px] w-max
    mx-auto h-fit p-2 rounded-b-lg shadow-lg shadow-fuchsia-900 
    ' >
      <div className={`hidden lg:inline fixed right-44 bottom-[1px] lg:w-[100px] z-10 transition-all duration-500 ease-in-out ${scrolled ? 'opacity-40  cursor-pointer' : ' opacity-0'}`} >
        <NavbarHeader />
      </div>
      <div className='w-min-[100px]'>
        <Link href={session ? '/userHome' : '/'}>
          <FontAwesomeIcon className=' text-fuchsia-100 ring ring-pink-500 ring-offset-1 opacity-80 hover:opacity-100' style={iconStyle} icon={faKeyboard} />
        </Link>
        <button className={profileDisplay}>
          <FontAwesomeIcon onClick={() => { router.push('/userProfile') }} className=' text-fuchsia-800 opacity-80 hover:opacity-100' style={iconStyle} icon={faMusic} />
        </button>

        {!session ?
          <FontAwesomeIcon onClick={() => router.push('/login')} className=' text-fuchsia-100 ring ring-pink-500 ring-offset-1 opacity-80 hover:opacity-100' style={iconStyle} icon={faUser} />
          : <>
            <div className='inline'>
              <FontAwesomeIcon onClick={() => {
                signOut({ callbackUrl: '/' });
                localStorage.removeItem('session');
                localStorage.removeItem('user');
                localStorage.removeItem('nextauth.message');
              }} className=' text-fuchsia-100 ring ring-pink-500 ring-offset-1 opacity-80 hover:opacity-100' style={iconStyle} icon={faStopCircle} />
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

  height: '30px',
  width: '30px',
  margin: '2px 10px',
  backgroundColor: 'inherit',
  borderRadius: '50%',
  padding: '2px',
  cursor: 'pointer',
}



export default Navbar;