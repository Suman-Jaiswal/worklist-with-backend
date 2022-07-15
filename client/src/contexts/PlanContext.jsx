import React, { createContext, useEffect, useReducer } from 'react'
import { planReducer } from '../reducers/planReducer';

export const PlanContext = createContext()

const initialState = {
    plans: [],
    topics: [],
    loading: true
}

function PlanContextProvider(props) {

    const [state, dispatch] = useReducer(planReducer, initialState);
    useEffect(() => {
        console.log('plans: ', state.plans)
        console.log('topics: ', state.topics)
    }, [state])
    return (
        <PlanContext.Provider value={{ state, dispatch }}>
            {props.children}
        </PlanContext.Provider>
    )
}
export default PlanContextProvider