import { useEffect } from 'react'
import SimpleCard from './SimpleCard'
import React, { useContext, useState } from 'react'
import { PlanContext } from '../contexts/PlanContext'
import AddPlanBtn from './AddPlanBtn'
import Icon from './Icon'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthContext'
import Loader from './Loader'
import Footer from './Footer'

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


    return (<>

        <div className='container-lg my-4' style={{
            minHeight: '92vh'
        }}>
            <div className='row'
            >
                {
                    pageLoading ? <div className='text-secondary mx-auto pt-5'><Loader /></div> :
                        <>
                            {
                                authorised ?
                                    plans.length > 0 ? plans.map(
                                        (plan, i) => <div className='col-12 col-sm-6 col-md-4 col-lg-3 p-2'
                                            key={plan._id}
                                        >
                                            <SimpleCard
                                                sno={i + 1}
                                                plan={plan}
                                            />
                                        </div>
                                    ) :
                                        <div className='text-secondary m-auto mt-5' >

                                            <h4 className="text-secondary mb-3 text-center"> Create Your Plans! </h4>

                                            <div className='text-center'
                                                style={{ textAlign: "center", position: "absolute", top: "calc(50vh - 150px)", left: "calc(50vw - 100px)" }}>
                                                <Icon para={2} />
                                            </div>
                                            <div style={{ textAlign: "center", position: "absolute", top: "50vh", left: "calc(50vw - 35px)" }}>
                                                <AddPlanBtn variant={'outline-secondary'} />
                                            </div>


                                        </div> : <h4 className='text-secondary text-center mt-5'>You need to Login first</h4>
                            }
                        </>
                }

            </div>

        </div>
        <Footer />

    </>
    )
}
