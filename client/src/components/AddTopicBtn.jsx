import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { PlanContext } from '../contexts/PlanContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function AddTopicBtn({ variant, color, planID }) {

    const { dispatch } = useContext(PlanContext)
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState('')
    const [topics, setTopics] = useState([])

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }
    useEffect(() => {

        const raw = input.split('\n')
        const array = [...raw]
        const rawTopics = []

        for (let i = 0; i < array.length; i++) {
            const obj = { title: array[i], planID }
            rawTopics.push(obj)
        }

        setTopics(rawTopics)

    }, [input, planID])

    const handleSubmit = (e) => {
        e.preventDefault()
        closeModal()
        axios.post(`/api/topics/${planID}`, {
            topics
        })
            .then(res => {
                dispatch({ type: 'ADD_TOPICS', payload: res.data })
            })
            .catch(err => console.log(err))

        setInput('')
        setTopics([])
    }

    return (
        <>
            <Button
                variant={variant} className={color} onClick={openModal} size='sm' aria-labelledby="contained-modal-title-vcenter"
                style={{ fontSize: 12 }} >
                <FontAwesomeIcon icon={faPlus} size='sm' /> <span
                    style={{ fontSize: 12 }} className='ms-1'>Add Topics</span>
            </Button>

            <Modal show={open} onHide={closeModal} >

                <Form onSubmit={handleSubmit} >

                    <Modal.Header className='text-center' closeButton >
                        <div className='m-auto bold display-6' >
                            Add Topics
                        </div>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Label>Titles</Form.Label>
                        <Form.Control className='mb-4' as='textarea' rows={8} onChange={(e) => setInput(e.target.value)}
                            placeholder={'Add topics in each line \n ********example*******\n Topic 1\n Topic 2\n Topic 3\n  ...\n '} />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button size='sm' type='submit' >Add</Button>
                    </Modal.Footer>

                </Form>

            </Modal>

        </>

    )
}
