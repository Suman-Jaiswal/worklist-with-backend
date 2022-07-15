import React, { useContext, useEffect, useState } from 'react'
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { PlanContext } from "./contexts/PlanContext";
import { Switch, Route } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext';
import axios from 'axios';
import Loader from './components/Loader';

function App() {

    const [pageLoading, setpageLoading] = useState(true)
    const { dispatch } = useContext(PlanContext)
    const { user, loading, authorised } = useContext(AuthContext).state

    useEffect(() => {

        setpageLoading(loading)

        if (!authorised) {
            return
        }

        setpageLoading(true)

        axios.get(`/api/plans/${user.email}`)
            .then(res => {
                const planIds = res.data.map(a => a._id)
                dispatch({
                    type: 'GET_PLANS',
                    payload: res.data
                })

                axios.get(`/api/topics/?q=${planIds}`)
                    .then(res => {
                        dispatch({
                            type: 'GET_TOPICS',
                            payload: res.data
                        })
                        setpageLoading(false)
                    })
                    .catch(e => console.log('could not fetch topics', e))
            })
            .catch(e => console.log('could not fetch plans', e))
    }, [dispatch, user, authorised, loading])

    return (
        <div className='App'>
            <Navbar />
            {pageLoading ? <Loader /> :
                <Switch>
                    <Route path='/plan/:id' exact component={Dashboard} />
                    <Route path='/' exact component={Dashboard} />
                </Switch>
            }
        </div>
    );
}

export default App;
