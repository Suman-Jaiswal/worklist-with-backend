import { useEffect } from 'react'
import SimpleCard from './SimpleCard'
import React, { useContext, useState } from 'react'
import { PlanContext } from '../contexts/PlanContext'
import AddPlanBtn from './AddPlanBtn'
import Icon from './Icon'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthContext'
import Loader from './Loader'

export default function Dashboard() {

    const [pageLoading, setpageLoading] = useState(true)
    const { state, dispatch } = useContext(PlanContext)
    const { user, loading, authorised } = useContext(AuthContext).state
    const { plans } = state

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

                axios.get(`/api/topics?q=${planIds}`)
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
        <div className='d-flex flex-wrap align-items-start justify-content-center container-lg my-5 gap-4'>
            {
                pageLoading ? <div style={{
                    marginTop: '35vh'
                }} className='text-secondary mx-auto'><Loader /></div> :
                    <>
                        {
                            authorised ?
                                plans.length > 0 ? plans.map(
                                    (plan, i) => <SimpleCard
                                        key={plan._id}
                                        sno={i + 1}
                                        plan={plan}
                                    />
                                ) :
                                    <div className='h4 text-secondary m-auto mt-2' >

                                        <h4 className="text-secondary mb-5 text-center"> + Create Your Plans Here + </h4>

                                        <Icon para={2} />

                                        <div style={{ position: 'relative', bottom: '150px', textAlign: 'center', width: '73%' }} >
                                            <AddPlanBtn variant={'transparent'} color={'text-secondary'} />
                                        </div>

                                    </div> : <h4 className='text-secondary mx-auto'>You need to Login first</h4>
                        }
                    </>
            }
        </div>
    )
}
