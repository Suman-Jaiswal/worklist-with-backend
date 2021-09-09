import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios'
import DeleteTopicBtn from './DeleteTopicBtn';
import { PlanContext } from '../contexts/PlanContext';
import AddTopicBtn from './AddTopicBtn';
import { AuthContext } from '../contexts/AuthContext';

export default function PlanDetails() {
    const { topics } = useContext(PlanContext).state
    const { user, loading, authorised } = useContext(AuthContext).state
    const { id } = useParams()
    const [topicsR, setTopicsR] = useState([])
    const [plan, setPlan] = useState({})
    const [pageLoading, setpageLoading] = useState(true)
    const [access, setAccess] = useState(true)
    const [toggle, setToggle] = useState(true)

    const handleCheck = (topic) => {
       axios.put(`/api/topics/${topic._id}`, {...topic,
           completed: !topic.completed
       })
       .then(res => {
           console.log(res.data)
           setToggle(!toggle)
       })
       .catch(e => console.log(e))
    }

    useEffect(() => {

        setpageLoading(loading)

        if (!authorised) {
            setAccess(false)
            return
        }

        setpageLoading(true)

        axios.get(`/api/plans/plan/${id}`)
            .then(res => {
                if (res.data.collaborators.includes(user.email)) {
                    setAccess(true) 
                    setPlan(res.data)
                }
                else {
                    setAccess(false)
                    setpageLoading(false)
                    return
                }
                axios.get(`/api/topics/${id}`)
                .then(res => {
                    setTopicsR(res.data)
                    setpageLoading(false)
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

    }, [id, toggle, topics, user, authorised, loading])

    return (
        <div className=' my-3 container-lg' style={{ minHeight: '79vh' }}>
        {
            pageLoading ? <h4 className='text-secondary text-center pt-5'>Loading...</h4> : access ?
                <div >

                    <div className="display-6 px-3 " >
                        {plan && plan.title}
                    </div>

                    <div className="py-1 px-3 d-flex justify-content-between" style={{borderBottom: '0.5px solid #dddddd'}} >
                        <span> {'('} {plan && plan.description} {')'}</span>
                        <span className='' > {' Topics: '} {topicsR ? topicsR.length : 0}</span>
                    </div>

                    <div className="container pt-3"> <AddTopicBtn variant={'outline-primary'} color={''} planID={id}/></div>
               
                    <div className="container my-2">

                        <div className="inbox">
                            {
                                topicsR ? topicsR.map((topic, i) => <div key={i} className="item">
                                    {` ${i + 1}. `}  <input type="checkbox" onChange={() => handleCheck(topic)} checked={topic.completed} />
                                    <p className='topic-name'> {topic.title}</p> <DeleteTopicBtn title={topic.title} id={topic._id}/>
                                </div>) : null
                            }
                        </div>

                    </div>

                </div>: <h4 className='text-danger text-center pt-5'>You are not allowed to access this page, contact author of the plan! {!authorised? 'Also make sure you are logged in.': null } </h4>
        }

    </div>

    )
}
