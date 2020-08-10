import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { edit } from '../../Redux/action/todo-action';

function EditTodo({ id, text }) {
  const dispatch = useDispatch();

  const [task, setTask] = useState(text);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Edit task function
  async function editTaskFunc(e) {
    dispatch(edit(id, task))
    handleClose();
  }

  function handleChange(e) {
    setTask(e.target.value);
  }

  return (
    <>
      <Button variant="btn btn-outline-warning btn-sm" onClick={handleShow}>
        Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit task form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Task name</Form.Label>
              <Form.Control type="text" value={task} onChange={handleChange} />
              <Form.Text className="text-muted">Change text here</Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" id={id} onClick={editTaskFunc}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTodo;
