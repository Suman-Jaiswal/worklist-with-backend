import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import AddPlanBtn from './AddPlanBtn'
import Icon from './Icon'
import LoginBtn from './LoginBtn'
import LogoutBtn from './LogoutBtn'

function Navbar() {

    const { state } = useContext(AuthContext)
    const { user } = state

    return (
        <div position='static'>

            <nav className="nav-wrapper bg-secondary py-2">

                <div className="container justify-content-between d-flex">

                    <div className="text-center d-flex">
                        <Icon para={1} />
                        <Link to='/' className='brand-logo text-decoration-none text-light ms-2 text-center my-auto'> Ninja Worklist</Link>
                    </div>

                    <div className='my-auto' >
                        <AddPlanBtn variant={'success'} />
                        {
                            Object.entries(user).length > 0 ?
                                <LogoutBtn />
                                :
                                <LoginBtn />
                        }
                        <div className='d-inline ms-2' >
                            {
                                Object.entries(user).length > 0 && <img src={user.imageUrl} style={{ width: '50px', borderRadius: '100%' }} alt="" />
                            }
                        </div>
                    </div>

                </div>

            </nav>

        </div>
    )
}

export default Navbar;