import { faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export default function ShareBtn({ plan, setPlan }) {
    // const { dispatch } = useContext(PlanContext)
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
            ...plan,
            collaborators: [...plan.collaborators, email]
        })
            .then(res => {
                setPlan({
                    ...plan,
                    collaborators: [...plan.collaborators, email]
                })
                // dispatch({ type: 'UPDATE_PLANS', payload: res.data })
            })
            .catch(err => console.log(err))

        setEmail('')
    }
    return (
        <>
            <Button variant={'transparent'} className={'text-secondary'} onClick={openModal} size='sm' aria-labelledby="contained-modal-title-vcenter" >
                <FontAwesomeIcon icon={faShare} size='sm' /> <span className='ms-1 create-text'>Share</span>
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
