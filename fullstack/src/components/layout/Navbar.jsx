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

const Navbar = () => {
  const { data: session } = useSession();
  let [profileDisplay, setProfileDisplay] = useState('hidden')
  const router = useRouter()

  useEffect(() => {
    if (session) {
      setProfileDisplay('visible text-fuchsia-900');
    }
  }, [session])

  return (
    <div className='container lg:max-w-[1000px] flex flex-col justify-center items-center lg:justify-center md:justify-center min-w-[400px]
    mx-auto h-fit w-full  p-2 rounded-b-lg
    shadow-lg shadow-fuchsia-900 
    ' >

      {/* <NavbarHeader /> */}
      <div className='w-min-[100px]'>
        <a href={session ? '/userHome' : '/'}>
          <FontAwesomeIcon className=' text-fuchsia-100 ring ring-pink-500 ring-offset-1 opacity-70 hover:opacity-100' style={iconStyle} icon={faKeyboard} />
        </a>
        <button className={profileDisplay}>
          <FontAwesomeIcon onClick={() => { router.push('/userProfile') }} className=' text-fuchsia-800 opacity-70 hover:opacity-100' style={iconStyle} icon={faMusic} />
        </button>

        {!session ?
          <FontAwesomeIcon onClick={() => router.push('/login')} className=' text-fuchsia-100 ring ring-pink-500 ring-offset-1 opacity-70 hover:opacity-100' style={iconStyle} icon={faUser} />
          : <>
            <div className='inline'>
              <FontAwesomeIcon onClick={() => signOut({ callbackUrl: '/' })} className=' text-fuchsia-100 ring ring-pink-500 ring-offset-1 opacity-70 hover:opacity-100' style={iconStyle} icon={faStopCircle} />
            </div>
          </>
        }
      </div>
      {session ? <div className={profileDisplay}><span className='text-fuchsia-200'>C O M P I N G - M A C H I N E </span>| Logged as {session.user.name}</div>
        : <span className='text-fuchsia-200'>C O M P I N G - M A C H I N E </span>
      }
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

const bgImage = {
  backgroundImage: 'url(/CM-logo.png)',
  backgroundSize: 'auto 100%',
  backgroundRepeat: 'no-repeat'
}

export default Navbar;