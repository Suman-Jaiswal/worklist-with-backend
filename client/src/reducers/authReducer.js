export const authReducer = (state, action) => {
    
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                loading: false,
                authorised: true
            }
        case 'LOGOUT':
            return {
                ...state,
                user: {},
                loading: false,
                authorised: false
            }
        case 'LOADING':
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}