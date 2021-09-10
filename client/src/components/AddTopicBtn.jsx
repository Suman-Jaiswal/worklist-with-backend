import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { PlanContext } from '../contexts/PlanContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function AddTopicBtn({ variant, color, planID }) {

    const { dispatch } = useContext(PlanContext)
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        closeModal()
        axios.post(`/api/topics/${planID}`, {
            topics: [{
                title,
                planID
            }],
        })
        .then(res => {
            dispatch({ type: 'ADD_TOPICS', payload: res.data })
        })
        .catch(err => console.log(err))

        setTitle('')
    }

    return (
        <>
            <Button variant={variant} className={color} onClick={openModal}  size='sm'  aria-labelledby="contained-modal-title-vcenter" >
                <FontAwesomeIcon icon={faPlus} size='sm' /> <span className='ms-1 create-text'>Add Topic</span>
            </Button>

            <Modal show={open} onHide={closeModal} >

                <Form onSubmit={handleSubmit} >

                    <Modal.Header className='text-center' closeButton >
                        <div className='m-auto bold display-6' >
                            Add Topic
                        </div>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Label>Title</Form.Label>
                        <Form.Control className='mb-4' onChange={(e) => setTitle(e.target.value)} placeholder={'Title'} />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button type='submit' >Add</Button>
                    </Modal.Footer>

                </Form>

            </Modal>

        </>

    )
}
