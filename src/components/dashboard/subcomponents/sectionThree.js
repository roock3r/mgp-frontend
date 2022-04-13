import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, ListGroup, Row} from "react-bootstrap";
import {gql} from "apollo-boost";
import {useQuery, Mutation} from "react-apollo";
import {useNavigate} from "react-router-dom";

const SectionThree = () => {
    const [edit, setEdit] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    let navigate = useNavigate();
    const [description, setDescription] = useState('')

    const {loading, error, data} = useQuery(GET_BP_DESCRIPTION);

    useEffect(() =>{
        if(!loading && data.userBpDescription) {
            setDescription(data.userBpDescription.description)
        }
    }, [loading, data])

    if (loading) return null;
    if (error) return `Error! ${error}`;

    const handleSubmit = async (event, createBpdescription) => {
        event.preventDefault()
        setSubmitting(true)
        createBpdescription({
            variables: {
                description: description,
            }
        })
    }

    const handleEdit = async (event, updateBpdescription, id) => {
        event.preventDefault()
        setSubmitting(true)
        updateBpdescription({
            variables: {
                bpDescriptionId:id,
                description: description,
            }
        })
    }

    if (data.userBpDescription) {
        console.log(data)
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <br/>
                <Card >
                    <Card.Body>
                        <Card.Title>Relevance of the proposed project to the objectives of the STP II (35% from the total score)</Card.Title>
                        <Card.Text>
                            In this section, please provide detail description of the proposed project. You should clearly explain the purpose of the proposed project and explicitly specify and explain all envisioned activities and how they are aligned to the objective of the call.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br/>
                <Card>
                    <Card.Header>Project description</Card.Header>
                    <Card.Body>
                        <ListGroup as="ol" numbered>
                            <ListGroup.Item as="li">Explain how the project is aligned with the objective of the call.
                                It addresses a specific market failure; and includes pre-identified project categories
                                that will make Belize more productive and competitive.</ListGroup.Item>
                            <ListGroup.Item as="li">Describe how the project generates positive effects and is
                                beneficial for the productivity of the Belizean tourism ecosystem and host communities
                                and that address pre-identified market failures that deter the firm from supporting the
                                project in the absence of the grant incentive. The outcomes and returns of the project
                                extend beyond the recipient firm and is relevant enough to justify the government
                                intervention.</ListGroup.Item>
                            <ListGroup.Item as="li">Make sure that objectives are well defined and are achievable with
                                the proposed activities</ListGroup.Item>
                            <ListGroup.Item as="li">Make sure that the flow of activities make sense and are appropriate
                                and consistent with the objectives</ListGroup.Item>
                        </ListGroup>
                        <hr/>
                        <Mutation
                            mutation={UPDATE_BP_DESCRIPTION}
                            onCompleted={data => {
                                console.log('Complete')
                                setSubmitting(false)
                                setEdit(false)
                            }
                            }
                            refetchQueries={
                                () => [
                                    {query: GET_BP_DESCRIPTION}
                                ]
                            }
                        >
                            {(updateBpdescription, {loading, error}) => {
                                if (error) return `Error! ${error}`;
                                return (
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Description text area</Form.Label>
                                            <Form.Control as="textarea"
                                                          onChange={event => setDescription(event.target.value)}
                                                          defaultValue={`${data.userBpDescription.description}`}
                                                          disabled={!edit}
                                                          rows={3}
                                                          placeholder='Maximum 2000 words' required/>
                                        </Form.Group>
                                        <div className="d-flex justify-content-between">
                                            {edit ? <Button variant="primary"
                                                            onClick={event => handleEdit(event, updateBpdescription, data.userBpDescription.id)}>Submit</Button>
                                                : <Button variant="primary"
                                                          onClick={event => setEdit(true)} disabled={data.userBpDescription.completedApplication} >Edit</Button>}
                                            {edit ? <Button variant="primary"
                                                            onClick={event => setEdit(false)}>Cancel</Button>
                                                : null}
                                            <Button variant="primary" onClick={event => {
                                                navigate(`/section-4`)
                                            }}
                                                    disabled={edit || data.userBpDescription.submitted ? true : false}>Next</Button>
                                        </div>
                                    </Form>)
                            }}
                        </Mutation>
                    </Card.Body>
                </Card>
            </main>
        );
    } else {
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <br/>
                <Card >
                    <Card.Body>
                        <Card.Title>Relevance of the proposed project to the objectives of the STP II (35% from the total score)</Card.Title>
                        <Card.Text>
                            In this section, please provide detail description of the proposed project. You should clearly explain the purpose of the proposed project and explicitly specify and explain all envisioned activities and how they are aligned to the objective of the call.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br/>
                <Card>
                    <Card.Header>Project description</Card.Header>
                    <Card.Body>
                        <ListGroup as="ol" numbered>
                            <ListGroup.Item as="li">Explain how the project is aligned with the objective of the call.
                                It addresses a specific market failure; and includes pre-identified project categories
                                that will make Belize more productive and competitive.</ListGroup.Item>
                            <ListGroup.Item as="li">Describe how the project generates positive effects and is
                                beneficial for the productivity of the Belizean tourism ecosystem and host communities
                                and that address pre-identified market failures that deter the firm from supporting the
                                project in the absence of the grant incentive. The outcomes and returns of the project
                                extend beyond the recipient firm and is relevant enough to justify the government
                                intervention.</ListGroup.Item>
                            <ListGroup.Item as="li">Make sure that objectives are well defined and are achievable with
                                the proposed activities</ListGroup.Item>
                            <ListGroup.Item as="li">Make sure that the flow of activities make sense and are appropriate
                                and consistent with the objectives</ListGroup.Item>
                        </ListGroup>
                        <hr/>
                        <Mutation
                            mutation={ADD_BP_DESCRIPTION}
                            onCompleted={data => {
                                console.log('Complete')
                                setSubmitting(false)
                            }
                            }
                            refetchQueries={
                                () => [
                                    {query: GET_BP_DESCRIPTION}
                                ]
                            }
                        >
                            {(createBpdescription, {loading, error}) => {
                                if (error) return `Error! ${error}`;
                                return (
                                    <Form onSubmit={event => handleSubmit(event, createBpdescription)}>
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
            </main>
        );
    }

};

const GET_BP_DESCRIPTION = gql`
query{
  userBpDescription{
    id
    description
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
}
`

const ADD_BP_DESCRIPTION = gql`
mutation CreateBPDescription($description:String!){
  createBpdescription(description:$description){
    bpDescription{
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

const UPDATE_BP_DESCRIPTION = gql`
mutation UpdateBPDescription($bpDescriptionId:Int!,$description:String!){
  updateBpdescription(bpDescriptionId:$bpDescriptionId,description:$description){
    bpDescription{
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


export default SectionThree;