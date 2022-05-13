import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { PlanContext } from '../contexts/PlanContext'

export default function EditPlanBtn({ plan, setPlan, textClass, text }) {

    const { dispatch } = useContext(PlanContext)
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }

    useEffect(() => {
        setTitle(plan.title)
        setDescription(plan.description)
    }, [plan.title, plan.description, open])

    const handleSubmit = (e) => {

        e.preventDefault()
        closeModal()
        if (title === plan.title && description === plan.description) {
            return
        } else {
            axios.put(`/api/plans/${plan._id}`, {
                title,
                description
            })
                .then(res => {
                    const updatedPlan = res.data
                    if (setPlan) {
                        setPlan(updatedPlan)
                    }
                    dispatch({ type: 'UPDATE_PLANS', payload: updatedPlan })
                })
                .catch(e => console.log(e))
        }
    }

    return (
        <>
            <Button variant={'transparent'} className={text} onClick={openModal} size='sm' aria-labelledby="contained-modal-title-vcenter" >
                <FontAwesomeIcon icon={faPen} size='sm' /> <span style={{
                    fontSize: 12
                }} className={`ms-1 ${textClass}`}>Edit Plan</span>
            </Button>

            <Modal show={open} onHide={closeModal} >

                <Form onSubmit={handleSubmit} >

                    <Modal.Header className='text-center' closeButton >
                        <div className='m-auto bold display-6' >
                            Edit Plan
                        </div>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Label>Title</Form.Label>
                        <Form.Control required className='mb-4' value={title} onChange={(e) => setTitle(e.target.value)} placeholder={'Edit title'} />
                        <Form.Label>Description</Form.Label>
                        <Form.Control required className='mb-4' value={description} onChange={(e) => setDescription(e.target.value)} placeholder={'Edit description'} />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button size='sm' type='submit' >Save</Button>
                    </Modal.Footer>

                </Form>

            </Modal>

        </>

    )
}
