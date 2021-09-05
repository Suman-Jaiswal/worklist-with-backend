import { AppBar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import AddPlanBtn from './AddPlanBtn'
import Icon from './Icon'

function Navbar() {
    return (
        <AppBar position='static'>

            <nav className="nav-wrapper py-2">

                <div className="container justify-content-between d-flex">

                    <div className="text-center d-flex">
                        <Icon para={1} />
                        <Link to='/' className='brand-logo text-decoration-none text-light ms-3'> Ninja Worklist</Link>
                    </div>

                    <div className='my-auto' >
                        <AddPlanBtn variant={'success'} />
                    </div>

                </div>

            </nav>

        </AppBar>
    )
}

export default Navbar;