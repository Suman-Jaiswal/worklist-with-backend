import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { PlanContext } from '../contexts/PlanContext'

export default function ShareBtn({ plan, setPlan, textClass }) {
    
    const { dispatch } = useContext(PlanContext)
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState('')

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        closeModal()
        if (plan.collaborators.includes(email)) {
            console.log('collaborator already exist.')
            return
        }

        axios.put(`/api/plans/share/${plan._id}`, {
            collaborators: [...plan.collaborators, email]
        })
            .then(res => {
                const updatedPlan = res.data
                setPlan(updatedPlan)
                dispatch({ type: 'UPDATE_PLANS', payload: updatedPlan })
            })
            .catch(err => console.log(err))

        setEmail('')
    }
    return (
        <>
            <Button variant={'transparent'} className={'text-secondary'} onClick={openModal} size='sm' aria-labelledby="contained-modal-title-vcenter" >
                <FontAwesomeIcon icon={faUserPlus} size='sm' /> <span className={`ms-1 ${textClass}`}>Share</span>
            </Button>

            <Modal show={open} onHide={closeModal} >

                <Form onSubmit={handleSubmit} >

                    <Modal.Header className='text-center' closeButton >
                        <div className='m-auto bold display-6' >
                            Add user
                        </div>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Label>Email</Form.Label>
                        <Form.Control className='mb-4' onChange={(e) => setEmail(e.target.value)} placeholder={'Enter email address'} />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button type='submit' >Add</Button>
                    </Modal.Footer>

                </Form>

            </Modal>
        </>
    )
}
