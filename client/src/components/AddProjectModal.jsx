import { useState } from "react";
import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQueries'

const AddProjectModal = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [clientId, setClientId] = useState('')
    const [status, setStatus] = useState('new')

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === '' || description === '' || status === '') {
            return alert('Please fill in all fields');
        }

        // clear the form
        setDescription('')
        setName('')
        setStatus('new')
    }

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
                <div className="d-flex align-items-center">
                    <FaList className='icon' />
                    <div>New Project</div>
                </div>
            </button>

            <div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addProjectModalLabel">Add Project</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className='form-label'>Name</label>
                                    <input type="text" className="form-control" id='name' value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className='form-label'>Description</label>
                                    <textarea className="form-control" id='description' value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className='form-label'>Status</label>
                                    <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="new">Not Started</option>
                                        <option value="progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                {/* (data-bs-dismissed) ---> this lead to close the modal after clicking on submit */}
                                <button type='submit' data-bs-dismissed='modal' className="btn btn-primary ">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProjectModal;