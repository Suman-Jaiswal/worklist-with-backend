import { faPeopleArrows } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, ListGroup, Modal } from 'react-bootstrap'

export default function Collaborators({ collaborators }) {

    const [open, setOpen] = useState(false)

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }
    return (
        <>
            <Button variant={'transparent'} className={'text-secondary'} onClick={openModal} size='sm' aria-labelledby="contained-modal-title-vcenter" >
                <FontAwesomeIcon icon={faPeopleArrows} size='sm' /> <span className='ms-1 create-text'>Collaborators</span>
            </Button>

            <Modal size="sm" show={open} onHide={closeModal} >

                <Modal.Header className='text-center' closeButton >
                    <div className='m-auto bold lead-2' >
                    <FontAwesomeIcon icon={faPeopleArrows}  />  Collaborators
                    </div>
                </Modal.Header>

                <Modal.Body>
                    <ListGroup>
                        {
                            collaborators.map((c, i) =>
                                <ListGroup.Item key={i} >{c}</ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </Modal.Body>

            </Modal>
        </>
    )
}
