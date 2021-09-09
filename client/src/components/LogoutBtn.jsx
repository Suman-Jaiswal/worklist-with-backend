import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { GoogleLogout } from 'react-google-login'
import { CLIENT_ID } from '../CLIENT_ID';
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

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
            <Button className='ms-2' variant='danger' onClick={props.onClick} disabled={props.disabled}>Logout</Button>
        )}
        onLogoutSuccess={onLogoutSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
    />
    )
}
