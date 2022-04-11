import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, ListGroup, Row} from "react-bootstrap";
import {gql} from "apollo-boost";
import {useNavigate} from "react-router-dom";
import {useQuery, Mutation} from "react-apollo";


const SectionFourTwo = () => {
    const [edit, setEdit] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    let navigate = useNavigate();
    const [description, setDescription] = useState('')

    const {loading, error, data} = useQuery(GET_BP_COORDINATOR_CAPACITY);

    useEffect(() =>{
        if(!loading && data.userBpCoordinatorCapacity) {
            setDescription(data.userBpCoordinatorCapacity.description)
        }
    }, [loading, data])

    if (loading) return null;
    if (error) return `Error! ${error}`;

    const handleSubmit = async (event, createBpcoordinatorcapacity) => {
        event.preventDefault()
        setSubmitting(true)
        createBpcoordinatorcapacity({
            variables: {
                description: description,
            }
        })
    }

    const handleEdit = async (event, updateBpcoordinatorcapacity, id) => {
        event.preventDefault()
        setSubmitting(true)
        updateBpcoordinatorcapacity({
            variables: {
                bpCoordinatorCapacityId: id,
                description: description,
            }
        })
    }

    if (data.userBpCoordinatorCapacity) {
        console.log(data)
        return (
            <Card>
                <Card.Header>Project coordinator's capacity</Card.Header>
                <Card.Body>
                    <ListGroup as="ol" numbered>
                        <ListGroup.Item as="li">Name, position, and CV (please attach CV) of the proposed Project
                            Coordination. Please list 3-5 the most complex relevant project he/she has implemented,
                            along with brief description, scale, results and a reference list, and description of the
                            role he/she played.</ListGroup.Item>
                    </ListGroup>
                    <hr/>
                    <Mutation
                        mutation={UPDATE_BP_COORDINATOR_CAPACITY}
                        onCompleted={data => {
                            console.log('Complete')
                            setSubmitting(false)
                            setEdit(false)
                        }
                        }
                        refetchQueries={
                            () => [
                                {query: GET_BP_COORDINATOR_CAPACITY}
                            ]
                        }
                    >
                        {(updateBpcoordinatorcapacity, {loading, error}) => {
                            if (error) return `Error! ${error}`;
                            return (
                                <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Description text area</Form.Label>
                                    <Form.Control as="textarea"
                                                  onChange={event => setDescription(event.target.value)}
                                                  defaultValue={`${data.userBpCoordinatorCapacity.description}`}
                                                  disabled={!edit}
                                                  rows={3}
                                                  placeholder='Maximum 2000 words'/>
                                </Form.Group>
                                    <div className="d-flex justify-content-between">
                                        {edit ? <Button variant="primary"
                                                        onClick={event => handleEdit(event, updateBpcoordinatorcapacity, data.userBpCoordinatorCapacity.id)}>Submit</Button>
                                            : <Button variant="primary"
                                                      onClick={event => setEdit(true)}>Edit</Button>}
                                        {edit ? <Button variant="primary"
                                                        onClick={event => setEdit(false)}>Cancel</Button>
                                            : null}
                                        <Button variant="primary" onClick={event => {
                                            navigate(`/section-5`)
                                        }}
                                                disabled={edit || data.userBpCoordinatorCapacity.submitted ? true : false}>Next</Button>
                                    </div>
                            </Form>)
                        }}

                    </Mutation>
                </Card.Body>
            </Card>
        );
    } else {
        return (
            <Card>
                <Card.Header>Project coordinator's capacity</Card.Header>
                <Card.Body>
                    <ListGroup as="ol" numbered>
                        <ListGroup.Item as="li">Name, position, and CV (please attach CV) of the proposed Project
                            Coordination. Please list 3-5 the most complex relevant project he/she has implemented,
                            along with brief description, scale, results and a reference list, and description of the
                            role he/she played.</ListGroup.Item>
                    </ListGroup>
                    <hr/>
                    <Mutation
                        mutation={ADD_BP_COORDINATOR_CAPACITY}
                        onCompleted={data => {
                            console.log('Complete')
                            setSubmitting(false)
                        }
                        }
                        refetchQueries={
                            () => [
                                {query: GET_BP_COORDINATOR_CAPACITY}
                            ]
                        }
                    >
                        {(createBpcoordinatorcapacity, {loading, error}) => {
                            if (error) return `Error! ${error}`;
                            return (
                                <Form onSubmit={event => handleSubmit(event, createBpcoordinatorcapacity)}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Description text area</Form.Label>
                                        <Form.Control as="textarea"
                                                      onChange={event => setDescription(event.target.value)}
                                                      rows={3} placeholder='Maximum 2000 words' required/>
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Button variant="primary" type="submit"
                                                    disabled={
                                                        submitting
                                                        || !description.trim()
                                                    }
                                            >
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            )
                        }}
                    </Mutation>
                </Card.Body>
            </Card>
        );
    }
};

const GET_BP_COORDINATOR_CAPACITY = gql`
query{
  userBpCoordinatorCapacity{
    id
    description
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
}
`

const ADD_BP_COORDINATOR_CAPACITY = gql`
mutation CreateBPCoordinatorCapacity($description:String!){
  createBpcoordinatorcapacity(description:$description){
    bpCoordinatorCapacity{
      id
      description
      submittedApplication
      completedApplication
      lastUpdated
      created
    }
  }
}
`

const UPDATE_BP_COORDINATOR_CAPACITY = gql`
mutation UpdateBPCoordinatorCapacity($bpCoordinatorCapacityId: Int!,$description:String!){
  updateBpcoordinatorcapacity(bpCoordinatorCapacityId:$bpCoordinatorCapacityId, description:$description){
    bpCoordinatorCapacity{
      id
      description
      submittedApplication
      completedApplication
      lastUpdated
      created
    }
  }
}
`

export default SectionFourTwo;