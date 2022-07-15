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
import Loader from './Loader';
import Icon from './Icon';
import AddPlanBtn from './AddPlanBtn';
import Footer from './Footer';

export default function PlanDetails() {

    const { topics, plans } = useContext(PlanContext).state
    const { user, loading, authorised } = useContext(AuthContext).state
    const { id } = useParams()
    const [topicsR, setTopicsR] = useState([])
    const [plan, setPlan] = useState({})
    const [pageLoading, setpageLoading] = useState(true)
    const [access, setAccess] = useState(false)
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
                const plan = plans.filter(p => p._id === id);
                console.log(plan)
                if (plan.length > 0) {
                    if (plan[0].collaborators.includes(user.email)) {
                        setAccess(true)
                        setPlan(plan[0])
                        setpageLoading(false)
                    }
                    else {
                        setAccess(false)
                        setpageLoading(false)
                    }
                }
                else {
                    setpageLoading(false)
                }
            }
            else {
                setAccess(false)
                setpageLoading(loading)
            }
        }

    }, [id, user, loading, authorised, plans])

    useEffect(() => {
        const raw = topics.filter(t => t.planID === id)
        setTopicsR(raw)
    }, [id, topics])

    console.log(topicsR)

    return (<>

        <div className='container' style={{ height: '90vh', overflowY: 'scroll' }}>
            {
                pageLoading ? <div className='text-light text-center mt-5'><Loader /></div> :
                    !id ?
                        <div className='text-secondary m-auto' >
                            <div className='text-center'
                                style={{ textAlign: "center", position: "relative", top: 150 }}>
                                <Icon para={2} />
                            </div>
                            <div style={{ textAlign: "center", position: "relative", marginBottom: 100, zIndex: 1000 }}>
                                <AddPlanBtn variant={'outline-secondary'} />
                            </div>
                            <h4 className="text-secondary mb-3 text-center"> Create Your Plans! </h4>
                        </div> :
                        access ?
                            <>
                                <div className="sticky-top text-light pt-3" style={{ backgroundColor: '#282828' }}>
                                    <div className=" d-flex flex-column-reverse flex-md-row justify-content-between align-items-center" >
                                        <div className=" fw-bold text-light  w-100 w-md-auto" style={{ fontSize: '15px' }}>  {plan && plan.title}</div>
                                        <div className='d-flex gap-3 justify-content-between mb-2 w-100 w-md-auto' >
                                            <Collaborators text={'text-light'} collaborators={plan.collaborators} plan={plan} setPlan={setPlan} />
                                            <EditPlanBtn text={'text-light'} textClass={'create-text'} plan={plan} setPlan={setPlan} />
                                            <ShareBtn text={'text-light'} textClass={'create-text'} setPlan={setPlan} plan={plan} />
                                            <AddTopicBtn variant={'primary'} planID={id} />
                                        </div>
                                    </div>

                                    <div style={{ borderBottom: '0.5px solid #dddddd' }} className=" pb-1 d-flex text-light justify-content-between" >
                                        <span style={{ width: '70%', fontSize: '13px' }} > {plan && plan.description} </span>
                                        <span style={{ fontSize: '13px' }} className='me-2' > {' Topics: '} {topicsR.length}</span>
                                    </div>
                                </div>

                                <div className="container p-0 my-2" style={{ backgroundColor: '#282828', }}>

                                    <div className="inbox">
                                        {
                                            topicsR.length === 0 ? <div>nothing</div> : topicsR.map((topic, i) => <div key={i} className="item text-light">
                                                {`${i + 1}. `}  <input type="checkbox" onChange={() => handleCheck(topic, i)} checked={topic.completed} />
                                                <p className=' lead topic-name text-light'> {topic.title}</p> <DeleteTopicBtn title={topic.title} id={topic._id} />
                                            </div>)
                                        }
                                    </div>
                                    <div className='text-secondary mb-4 text-center'>That's All!</div>
                                    <br />
                                </div>


                            </> :
                            <div>
                                <div className='text-danger text-center mt-5'>You are not allowed to access this page, Contact Author! {!authorised ? 'Also make sure you are logged in.' : null} </div>
                            </div>
            }
        </div>
        <Footer />
    </>
    )
}
