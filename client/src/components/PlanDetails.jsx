import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios'
import DeleteTopicBtn from './DeleteTopicBtn';
import AddTopicBtn from './AddTopicBtn';
import { AuthContext } from '../contexts/AuthContext';
import { PlanContext } from '../contexts/PlanContext';
import ShareBtn from './ShareBtn';
import Collaborators from './Collaborators';
import EditPlanBtn from './EditPlanBtn';

export default function PlanDetails() {

    const { topics } = useContext(PlanContext).state
    const { user, loading, authorised } = useContext(AuthContext).state
    const { id } = useParams()
    const [topicsR, setTopicsR] = useState([])
    const [plan, setPlan] = useState({})
    const [pageLoading, setpageLoading] = useState(true)
    const [access, setAccess] = useState(true)
    const [toggle, setToggle] = useState(true)

    const handleCheck = (topic, i) => {
        axios.put(`/api/topics/${topic._id}`, {
            ...topic,
            completed: !topic.completed
        })
            .then(res => {
                setToggle(!toggle)
                const array = [...topicsR]
                array[i] = { ...array[i], completed: !topic.completed }
                setTopicsR(array)
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        setpageLoading(true)
        if (!loading) {
            if (authorised) {
                axios.get(`/api/plans/plan/${id}`)
                    .then(res => {
                        if (res.data.collaborators.includes(user.email)) {
                            setAccess(true)
                            setPlan(res.data)
                            setpageLoading(false)
                        }
                        else {
                            setAccess(false)
                            setpageLoading(false)
                        }
                    })
                    .catch(err => console.log(err))
            }
            else {
                setAccess(false)
                setpageLoading(loading)
            }
        }

    }, [id, user, loading, authorised])

    useEffect(() => {
        axios.get(`/api/topics/${id}`)
            .then(res => {
                setTopicsR(res.data)
            })
            .catch(err => console.log(err))
    }, [id, topics])

    return (
        <div className=' my-3 container-lg' style={{ minHeight: '79vh' }}>
            {
                pageLoading ? <h4 className='text-secondary text-center pt-5'>Loading...</h4> : access ?
                    <div >
                        <div className="sticky-top bg-light">
                             <div  className="py-1 px-3 d-flex justify-content-between" >
                            <span className="lead fw-bold text-secondary">  {plan && plan.title}</span>
                            <span className='' >
                                <Collaborators collaborators={plan.collaborators} plan={plan} setPlan={setPlan} />
                                <EditPlanBtn  plan={plan} setPlan={setPlan} />
                                <ShareBtn setPlan={setPlan} plan={plan} />
                            </span>
                        </div>

                        <div style={{ borderBottom: '0.5px solid #dddddd'}} className="py-1 px-3 d-flex text-secondary justify-content-between" >
                            <span style={{width: '70%', fontSize: '13px' }} > {plan && plan.description} </span>
                            <span  style={{ fontSize: '13px' }} className='me-2' > {' Topics: '} {topicsR ? topicsR.length : 0}</span>
                        </div>
                        </div>
                       

                        <div className="container pt-3"> <AddTopicBtn variant={'outline-primary'} color={''} planID={id} /></div>

                        <div className="container my-2">

                            <div className="inbox">
                                {
                                    topicsR ? topicsR.map((topic, i) => <div key={i} className="item">
                                        {` ${i + 1}. `}  <input type="checkbox" onChange={() => handleCheck(topic, i)} checked={topic.completed} />
                                        <p className='topic-name text-secondary'> {topic.title}</p> <DeleteTopicBtn title={topic.title} id={topic._id} />
                                    </div>) : null
                                }
                            </div>

                        </div>

                    </div> : <h4 className='text-danger text-center pt-5'>You are not allowed to access this page, contact author of the plan! {!authorised ? 'Also make sure you are logged in.' : null} </h4>
            }

        </div>

    )
}
