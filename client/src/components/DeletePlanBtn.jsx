import React, { useContext, useState } from 'react'
import { PlanContext } from '../contexts/PlanContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import axios from 'axios'


export default function DeletePlanBtn({ title, id, textClass }) {

    const [open, setOpen] = useState(false)
    const { dispatch } = useContext(PlanContext)

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }
    const handleDelete = () => {
        axios.delete(`/api/plans/${id}`)
            .then(res => {
                console.log('Plan deleted', res.data)
                dispatch({ type: 'DELETE_PLAN', id })
            })
            .catch(err => {
                console.log(err)
            })
        axios.delete(`/api/topics/${id}`)
            .then(res => {
                console.log('Topics deleted', res.data)
            })
            .catch(err => {
                console.log(err)
            })
        setOpen(false)

    }

    return (
        <div>
            <Button variant={'transparent'} className={'text-danger'} onClick={openModal} size='sm' aria-labelledby="contained-modal-title-vcenter" >
                <FontAwesomeIcon size='sm' icon={faTrash} /><span style={{
                    fontSize: 12
                }} className={`ms-1 ${textClass}`}>Delete</span>
            </Button>


            <Modal show={open} onHide={closeModal}>

                <Modal.Header>
                    Are you sure you want to delete {title} ?
                </Modal.Header>

                <Modal.Body>
                    <Button variant='danger' onClick={handleDelete} >Delete</Button>
                    <Button variant='secondary' onClick={closeModal} className='ms-3' >Close</Button>
                </Modal.Body>

            </Modal>
        </div>
    )
}
