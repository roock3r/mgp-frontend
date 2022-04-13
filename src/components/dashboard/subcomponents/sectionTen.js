import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, ListGroup, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useQuery, Mutation} from "react-apollo";
import {gql} from "apollo-boost";

const SectionTen = () => {
    const [edit, setEdit] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    let navigate = useNavigate();
    const [description, setDescription] = useState('')

    const {loading, error, data} = useQuery(GET_BP_SUSTAINABILITY);

    useEffect(() =>{
        if(!loading && data.userBpSustainability) {
            setDescription(data.userBpSustainability.description)
        }
    }, [loading, data])

    if (loading) return null;
    if (error) return `Error! ${error}`;

    const handleSubmit = async (event, createBpsustainability) => {
        event.preventDefault()
        setSubmitting(true)
        createBpsustainability({
            variables: {
                description: description,
            }
        })
    }

    const handleEdit = async (event, updateBpsustainability, id) => {
        event.preventDefault()
        setSubmitting(true)
        updateBpsustainability({
            variables: {
                bpSustainabilityId:id,
                description: description,
            }
        })
    }

    if(data.userBpSustainability){
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <br/>
                <Card >
                    <Card.Body>
                        <Card.Title>Sustainability (10% of total score)</Card.Title>
                        <Card.Text>Please describe how you intend to operate the project results and maintain the sustainability of the project results after the end of the project? Please, provide operation and maintenance plan and make sure that it will answer the following questions:</Card.Text>
                    </Card.Body>
                </Card>
                <br/>
                <Card>
                    <Card.Header>Sustainability</Card.Header>
                    <Card.Body>
                        <ListGroup as="ol" numbered>
                            <ListGroup.Item as="li">What activities are envisaged to continue to be implemented with use of the project results after the support from the grant ends?</ListGroup.Item>
                            <ListGroup.Item as="li">How does the business plan address operations and maintenance plan including operation costs, staffing etc., as well as sustainability of results?</ListGroup.Item>
                            <hr/>
                            <ListGroup.Item as="li">"Please note that once you have fully completed ALL the sections listed under the dashboard on your left, you must return to the dashboard page to upload the required supporting documents.  Once these documents have been uploaded to the portal, you will then be required to click on the final submission button below to submit your application in full with all accompanying attached documents."</ListGroup.Item>
                        </ListGroup>
                        <hr/>
                        <Mutation
                            mutation={UPDATE_BP_SUSTAINABILITY}
                            onCompleted={data => {
                                console.log('Complete')
                                setSubmitting(false)
                                setEdit(false)
                            }
                            }
                            refetchQueries={
                                () => [
                                    {query: GET_BP_SUSTAINABILITY}
                                ]
                            }
                        >
                            {(updateBpsustainability, {loading, error}) => {
                                if (error) return `Error! ${error}`;
                                return(
                                    <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Description text area</Form.Label>
                                        <Form.Control as="textarea"
                                                      onChange={event => setDescription(event.target.value)}
                                                      defaultValue={`${data.userBpSustainability.description}`}
                                                      disabled={!edit}
                                                      rows={3}
                                                      placeholder='Maximum 1000 words' required/>
                                    </Form.Group>
                                        <div className="d-flex justify-content-between">
                                            {edit ? <Button variant="primary"
                                                            onClick={event => handleEdit(event, updateBpsustainability, data.userBpSustainability.id)}>Submit</Button>
                                                : <Button variant="primary"
                                                          onClick={event => setEdit(true)}>Edit</Button>}
                                            {edit ? <Button variant="primary"
                                                            onClick={event => setEdit(false)}>Cancel</Button>
                                                : null}
                                            <Button variant="primary" onClick={event => {
                                                navigate(`/section-9`)
                                            }}
                                                    disabled={edit || data.userBpSustainability.submitted ? true : false}>Back</Button>
                                        </div>
                                </Form>)
                            }}
                        </Mutation>
                    </Card.Body>
                </Card>
            </main>
        );
    }else{
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <br/>
                <Card >
                    <Card.Body>
                        <Card.Title>Sustainability (10% of total score)</Card.Title>
                        <Card.Text>Please describe how you intend to operate the project results and maintain the sustainability of the project results after the end of the project? Please, provide operation and maintenance plan and make sure that it will answer the following questions:</Card.Text>
                    </Card.Body>
                </Card>
                <br/>
                <Card>
                    <Card.Header>Sustainability</Card.Header>
                    <Card.Body>
                        <ListGroup as="ol" numbered>
                            <ListGroup.Item as="li">What activities are envisaged to continue to be implemented with use of the project results after the support from the grant ends?</ListGroup.Item>
                            <ListGroup.Item as="li">How does the business plan address operations and maintenance plan including operation costs, staffing etc., as well as sustainability of results?</ListGroup.Item>
                            <hr/>
                            <ListGroup.Item as="li">"Please note that once you have fully completed ALL the sections listed under the dashboard on your left, you must return to the dashboard page to upload the required supporting documents.  Once these documents have been uploaded to the portal, you will then be required to click on the final submission button below to submit your application in full with all accompanying attached documents."</ListGroup.Item>

                        </ListGroup>
                        <hr/>
                        <Mutation
                            mutation={ADD_BP_SUSTAINABILITY}
                            onCompleted={data => {
                                console.log('Complete')
                                setSubmitting(false)
                            }
                            }
                            refetchQueries={
                                () => [
                                    {query: GET_BP_SUSTAINABILITY}
                                ]
                            }
                        >
                            {(createBpsustainability, {loading, error}) => {
                                if (error) return `Error! ${error}`;
                                return (
                                    <Form onSubmit={event => handleSubmit(event, createBpsustainability)}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Description text area</Form.Label>
                                            <Form.Control as="textarea"
                                                          onChange={event => setDescription(event.target.value)}
                                                          rows={3} placeholder='Maximum 1000 words' required/>
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

const GET_BP_SUSTAINABILITY = gql`
query{
  userBpSustainability{
    id
    description
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
}
`

const ADD_BP_SUSTAINABILITY = gql`
mutation CreateBPSustainability($description:String!){
  createBpsustainability(description:$description){
    bpSustainability{
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

const UPDATE_BP_SUSTAINABILITY = gql`
mutation UpdateBPSustainability($bpSustainabilityId:Int!,$description:String!){
  updateBpsustainability(bpSustainabilityId:$bpSustainabilityId,description:$description){
    bpSustainability{
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

export default SectionTen;