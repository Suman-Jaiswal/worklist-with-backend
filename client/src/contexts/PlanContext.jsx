import React, { createContext, useReducer } from 'react'
import { planReducer } from '../reducers/planReducer';

export const PlanContext = createContext()

const initialState = {
    plans: [],
    topics: [],
    loading: true
}

function PlanContextProvider(props) {

    const [state, dispatch] = useReducer(planReducer, initialState);

    return (
        <PlanContext.Provider value={{ state, dispatch }}>
            {props.children}
        </PlanContext.Provider>
    )
}
export default PlanContextProvider