//icons setup
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faKeyboard, faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
config.autoAddCss = false

import NavbarHeader from './NavbarHeader';

const Navbar = () => {


  return (
    <div className='lg:container mx-auto ring rounded-b-lg'> 
      <div className='flex justify-between p-5 mx-0.5'>
        <NavbarHeader />
        <div>
          <a href='/'>
            <FontAwesomeIcon className='ring ring-pink-500 ring-offset-1' style={iconStyle} icon={faKeyboard} />
          </a>
          <a href='/login'>
            <FontAwesomeIcon className='ring ring-pink-500 ring-offset-1' style={iconStyle}  icon={faUser} />
          </a>
        </div>
      </div>
    </div>
  )
}

const iconStyle = {
  color: 'whitesmoke',
  height: '26px',
  margin: '5px 10px',
  backgroundColor: 'inherit',
  borderRadius: '50px',
  padding: '5px'
}

export default Navbar;