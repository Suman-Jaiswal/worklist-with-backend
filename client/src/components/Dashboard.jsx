import { useEffect } from 'react'
import SimpleCard from './SimpleCard'
import React, { useContext, useState } from 'react'
import { PlanContext } from '../contexts/PlanContext'
import AddPlanBtn from './AddPlanBtn'
import Icon from './Icon'
import axios from 'axios'

export default function Dashboard() {
    const [loading, setLoading] = useState(true)
    const { state, dispatch } = useContext(PlanContext)
    const {plans} = state

    useEffect(() => {
        axios.get('/api/plans')
        .then(res => {
            dispatch({
                type: 'GET_PLANS',
                payload: res.data
            })
            setLoading(false)
        })
    }, [dispatch])

    useEffect(() => {
        axios.get('/api/topics')
        .then(res => {
            dispatch({
                type: 'GET_TOPICS',
                payload: res.data
            })
            setLoading(false)
        })
    }, [dispatch])

    return (
        <div className='d-flex flex-wrap container-lg my-5 gap-4 dashboard' style={{ minHeight: '70.2vh' }}>
        {
            loading? <h4 className='text-secondary mx-auto'>Loading...</h4>:
            <>
            {
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

                    </div>
            }
        </>
        }
        </div>
    )
}
