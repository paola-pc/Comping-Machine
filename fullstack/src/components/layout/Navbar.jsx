//icons setup
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faKeyboard, faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
config.autoAddCss = false

import NavbarHeader from './NavbarHeader';

const Navbar = () => {


  return (
    <div className='container'> 
      <div className='flex justify-between p-5'>
        <NavbarHeader />
        <div>
          <a href='/'>
            <FontAwesomeIcon style={iconStyle} icon={faKeyboard} />
          </a>
          <a href='/login'>
            <FontAwesomeIcon style={iconStyle}  icon={faUser} />
          </a>
        </div>
      </div>
    </div>
  )
}

const iconStyle = {
  color: 'purple',
  height: '26px',
  margin: '5px 10px'
}

export default Navbar;