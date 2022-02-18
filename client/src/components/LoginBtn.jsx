import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { GoogleLogin } from 'react-google-login'
import { CLIENT_ID } from '../CLIENT_ID';
import { Button } from 'react-bootstrap'

export default function LoginBtn() {
    const { dispatch } = useContext(AuthContext)

    const onLoginSuccess = (res) => {
        dispatch({
            type: 'LOGIN',
            payload: res.profileObj
        })
    }
    const onFailure = (e) => {
        console.log('failed', e)
    }

    return (
        <GoogleLogin
            clientId={CLIENT_ID}
            render={props => (
                <Button size='sm' className='ms-2' onClick={props.onClick} disabled={props.disabled}>Login</Button>
            )}
            onSuccess={onLoginSuccess}
            onFailure={onFailure}
            isSignedIn={true}
            cookiePolicy={'single_host_origin'}
            onAutoLoadFinished={() => dispatch({ type: 'LOADING', payload: false })}
        />
    )
}
