import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, ListGroup, Row} from "react-bootstrap";
import {gql} from "apollo-boost";
import {useQuery, Mutation} from "react-apollo";
import {useNavigate} from "react-router-dom";

const SectionEight = () => {
    const [edit, setEdit] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    let navigate = useNavigate();
    const [description, setDescription] = useState('')

    const {loading, error, data} = useQuery(GET_BP_DOUBLE_COFINANCING);

    useEffect(() =>{
        if(!loading && data.userBpDoubleCofinancing) {
            setDescription(data.userBpDoubleCofinancing.biggerProjectDescription)
        }
    }, [loading, data])

    if (loading) return null;
    if (error) return `Error! ${error}`;

    const handleSubmit = async (event, createBpdoublecofinancing) => {
        event.preventDefault()
        setSubmitting(true)
        createBpdoublecofinancing({
            variables: {
                description: description,
            }
        })
    }

    const handleEdit = async (event, updateBpdoublecofinancing, id) => {
        event.preventDefault()
        setSubmitting(true)
        updateBpdoublecofinancing({
            variables: {
                bpDoubleCofinacingId:id,
                description: description,
            }
        })
    }

    if(data.userBpDoubleCofinancing) {
        console.log(data)
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <Card>
                    <Card.Header>Double co-financing</Card.Header>
                    <Card.Body>
                        <ListGroup as="ol" numbered>
                            <ListGroup.Item as="li">Is the proposed project part of another bigger project? 0 Yes  0 No</ListGroup.Item>
                            <ListGroup.Item as="li">If yes, please shortly explain the bigger project (of how many phases it is consisted of)? Will the proposed project function independently once completed? Do you think that you can successfully complete the project with the above presented budget?</ListGroup.Item>
                            <ListGroup.Item as="li">Have you applied for funding from any other institution/donor organization?  0 Yes  0 No</ListGroup.Item>
                            <ListGroup.Item as="li">If yes, please provide further details (organization, time of application, requested amount, activities)</ListGroup.Item>
                        </ListGroup>
                        <hr/>
                        <Mutation
                            mutation={UPDATE_BP_DOUBLE_COFINANCING}
                            onCompleted={data => {
                                console.log('Complete')
                                setSubmitting(false)
                                setEdit(false)
                            }
                            }
                            refetchQueries={
                                () => [
                                    {query: GET_BP_DOUBLE_COFINANCING}
                                ]
                            }
                        >
                            {(updateBpdoublecofinancing, {loading, error}) => {
                                if (error) return `Error! ${error}`;
                                return (
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Description text area</Form.Label>
                                            <Form.Control as="textarea"
                                                          onChange={event => setDescription(event.target.value)}
                                                          defaultValue={`${data.userBpDoubleCofinancing.biggerProjectDescription}`}
                                                          disabled={!edit}
                                                          rows={3}
                                                          placeholder='Maximum 1000 words' required/>
                                        </Form.Group>
                                        <div className="d-flex justify-content-between">
                                            {edit ? <Button variant="primary"
                                                            onClick={event => handleEdit(event, updateBpdoublecofinancing, data.userBpDoubleCofinancing.id)}>Submit</Button>
                                                : <Button variant="primary"
                                                          onClick={event => setEdit(true)}>Edit</Button>}
                                            {edit ? <Button variant="primary"
                                                            onClick={event => setEdit(false)}>Cancel</Button>
                                                : null}
                                            <Button variant="primary" onClick={event => {
                                                navigate(`/section-9`)
                                            }}
                                                    disabled={edit || data.userBpDoubleCofinancing.submitted ? true : false}>Next</Button>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Mutation>
                    </Card.Body>
                </Card>
            </main>
        );
    }else{
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <Card>
                    <Card.Header>Double co-financing</Card.Header>
                    <Card.Body>
                        <ListGroup as="ol" numbered>
                            <ListGroup.Item as="li">Is the proposed project part of another bigger project? 0 Yes  0 No</ListGroup.Item>
                            <ListGroup.Item as="li">If yes, please shortly explain the bigger project (of how many phases it is consisted of)? Will the proposed project function independently once completed? Do you think that you can successfully complete the project with the above presented budget?</ListGroup.Item>
                            <ListGroup.Item as="li">Have you applied for funding from any other institution/donor organization?  0 Yes  0 No</ListGroup.Item>
                            <ListGroup.Item as="li">If yes, please provide further details (organization, time of application, requested amount, activities)</ListGroup.Item>
                        </ListGroup>
                        <hr/>
                        <Mutation
                            mutation={ADD_BP_DOUBLE_COFINANCING}
                            onCompleted={data => {
                                console.log('Complete')
                                setSubmitting(false)
                            }
                            }
                            refetchQueries={
                                () => [
                                    {query: GET_BP_DOUBLE_COFINANCING}
                                ]
                            }
                        >
                            {(createBpdoublecofinancing, {loading, error}) => {
                                if (error) return `Error! ${error}`;
                                return (
                                    <Form onSubmit={event => handleSubmit(event, createBpdoublecofinancing)}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Description textarea</Form.Label>
                                            <Form.Control as="textarea"
                                                          onChange={event => setDescription(event.target.value)}
                                                          rows={3} placeholder='Maximum 1000 words' require/>
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
            </main>
        );
    }

};

const GET_BP_DOUBLE_COFINANCING = gql`
query{
  userBpDoubleCofinancing{
    id
    biggerProjectDescription
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
}
`

const ADD_BP_DOUBLE_COFINANCING = gql`
mutation CreateBPDoubleCofinancing($description:String!){
  createBpdoublecofinancing(description:$description){
    bpDoubleCofinancing{
      id
      biggerProjectDescription
      submittedApplication
      completedApplication
      lastUpdated
      created
    }
  }
}
`

const UPDATE_BP_DOUBLE_COFINANCING = gql`
mutation UpdateBPDoubleCofinancing($bpDoubleCofinacingId:Int!,$description:String!){
  updateBpdoublecofinancing(bpDoubleCofinacingId:$bpDoubleCofinacingId,description:$description){
    bpDoubleCofinancing{
      id
      biggerProjectDescription
      submittedApplication
      completedApplication
      lastUpdated
      created
    }
  }
}
`

export default SectionEight;