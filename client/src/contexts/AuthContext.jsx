import React, { createContext, useEffect, useReducer } from 'react'
import { authReducer } from '../reducers/authReducer';

export const AuthContext = createContext()

const initialState = {
    user: {},
    loading: true,
    authorised: false
}

function AuthContextProvider(props) {

    const [state, dispatch] = useReducer(authReducer, initialState);
    useEffect(() => {
        // console.log('user', state.user)
    }, [state])

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider