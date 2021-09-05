import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios'

export default function PlanDetails() {

    const { id } = useParams()
    const [topics, setTopics] = useState([])
    const [plan, setPlan] = useState({})
    const [loading, setLoading] = useState(true)
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
        axios.get(`/api/plans/${id}`)
            .then(res => {
                setPlan(res.data)
            })
            .catch(err => console.log(err))

        axios.get(`/api/topics/${id}`)
            .then(res => {
                setTopics(res.data)
            })
            .catch(err => console.log(err))
        setLoading(false)
    }, [id, toggle])

    return (<>
        {
            loading ? <div>Loading...</div> :
                <div style={{ minHeight: '83.3vh' }} >

                    <div className="display-6 pt-3 text-center" >
                        {plan && plan.title}
                    </div>

                    <div className=" text-center pt-1 pb-3">
                        {'{'} {plan && plan.description} {'}'} {' Topics: '} {topics ? topics.length : 0}
                    </div>

                    <div className="container my-2">

                        <div className="inbox">
                            {
                                topics ? topics.map((topic, i) => <div key={i} className="item">
                                    {` ${i + 1}. `}  <input type="checkbox" onChange={() => handleCheck(topic)} checked={topic.completed} />
                                    <p className='topic-name'> {topic.title}</p>
                                </div>) : null
                            }
                        </div>

                    </div>

                </div>
        }

    </>

    )
}
