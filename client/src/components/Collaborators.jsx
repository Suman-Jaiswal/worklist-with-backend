import { faTimesCircle, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Button, ListGroup, Modal } from 'react-bootstrap'
import { PlanContext } from '../contexts/PlanContext'

export default function Collaborators({ collaborators, plan, setPlan, text }) {

    const { dispatch } = useContext(PlanContext)
    const [open, setOpen] = useState(false)

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }

    const removeCollaborator = (email) => {
        const raw = [...plan.collaborators]
        const newCollaborators = raw.filter(x => x !== email)

        axios.put(`/api/plans/share/${plan._id}`, {
            collaborators: newCollaborators
        })
            .then(res => {
                const updatedPlan = res.data
                setPlan(updatedPlan)
                dispatch({ type: 'UPDATE_PLANS', payload: updatedPlan })
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Button variant={'transparent'} className={text} onClick={openModal} size='sm' aria-labelledby="contained-modal-title-vcenter" >
                <FontAwesomeIcon icon={faUsers} size='sm' /> <span
                    style={{
                        fontSize: 12
                    }} className='ms-1 create-text'>Collaborators</span>
            </Button>

            <Modal size="sm" show={open} onHide={closeModal} >

                <Modal.Header className='text-center' closeButton >
                    <div className='m-auto bold lead-2' >
                        <FontAwesomeIcon icon={faUsers} />  Collaborators
                    </div>
                </Modal.Header>

                <Modal.Body>
                    <ListGroup>
                        {
                            collaborators.map((c, i) =>
                                <ListGroup.Item key={i} >{c}
                                    {
                                        plan.author.email !== c && <span style={{ float: 'right' }} >
                                            <Button size='sm' variant='transparent' onClick={() => removeCollaborator(c)}> <FontAwesomeIcon icon={faTimesCircle} /> </Button>
                                        </span>
                                    }

                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </Modal.Body>

            </Modal>
        </>
    )
}
