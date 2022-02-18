import React, { useContext, useState } from 'react'
import { PlanContext } from '../contexts/PlanContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import axios from 'axios'


export default function DeleteTopicBtn({ title, id }) {

    const [open, setOpen] = useState(false)
    const { dispatch } = useContext(PlanContext)

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }
    const handleDelete = () => {
        axios.delete(`/api/topics/topic/${id}`)
            .then(res => {
                console.log('Topic deleted', res.data)
                dispatch({ type: 'DELETE_TOPIC', id })
            })
            .catch(err => {
                console.log(err)
            })
        setOpen(false)
    }

    return (
        <>
            <FontAwesomeIcon size='sm' className='text-danger ms-3' style={{ cursor: 'pointer' }} onClick={openModal} icon={faTrash} />

            <Modal show={open} onHide={closeModal}>

                <Modal.Header>
                    Are you sure you want to delete {title} ?
                </Modal.Header>

                <Modal.Body>
                    <Button variant='danger' onClick={handleDelete} >Delete</Button>
                    <Button variant='secondary' onClick={closeModal} className='ms-3' >Close</Button>
                </Modal.Body>

            </Modal>
        </>
    )
}
