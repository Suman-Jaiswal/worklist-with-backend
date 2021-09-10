import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { GoogleLogout } from 'react-google-login'
import { CLIENT_ID } from '../CLIENT_ID';
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LogoutBtn() {

    const { dispatch } = useContext(AuthContext)
    const history = useHistory()

    const onLogoutSuccess = (res) => {
        dispatch({
            type: 'LOGOUT',
            payload: {}
        })
        console.log('logged out')
        history.push('/')
    }
    const onFailure = (e) => {
        console.log('failed', e)
    }

    return (
        <GoogleLogout
            clientId={CLIENT_ID}
            render={props => (
                <Button variant='danger' onClick={props.onClick} disabled={props.disabled} className='ms-2' aria-labelledby="contained-modal-title-vcenter" >
                    <FontAwesomeIcon icon={faPowerOff} size='sm' /> <span className='ms-1 create-text'>Logout</span>
                </Button>
            )}
            onLogoutSuccess={onLogoutSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
        />
    )
}
