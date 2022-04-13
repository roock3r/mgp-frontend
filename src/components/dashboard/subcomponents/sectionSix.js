import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, ListGroup, Row} from "react-bootstrap";
import {gql} from "apollo-boost";
import {useQuery, Mutation} from "react-apollo";
import {useNavigate} from "react-router-dom";

const SectionSix = () => {
    const [edit, setEdit] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    let navigate = useNavigate();
    const [description, setDescription] = useState('')

    const {loading, error, data} = useQuery(GET_BP_EXPECTED_IMPACT);

    useEffect(() =>{
        if(!loading && data.userBpProjectExpectedImpact) {
            setDescription(data.userBpProjectExpectedImpact.description)
        }
    }, [loading, data])

    if (loading) return null;
    if (error) return `Error! ${error}`;

    const handleSubmit = async (event, createBpexpectedimpact) => {
        event.preventDefault()
        setSubmitting(true)
        createBpexpectedimpact({
            variables: {
                description: description,
            }
        })
    }

    const handleEdit = async (event, updateBpexpectedimpact, id) => {
        event.preventDefault()
        setSubmitting(true)
        updateBpexpectedimpact({
            variables: {
                bpExpectedImpactId:id,
                description: description,
            }
        })
    }

    if(data.userBpProjectExpectedImpact){
        console.log(data)
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <br/>
                <Card >
                    <Card.Body>
                        <Card.Title>Project expected impacts (20% from the total score)</Card.Title>
                    </Card.Body>
                </Card>
                <br/>
                <Card>
                    <Card.Header>Impact</Card.Header>
                    <Card.Body>
                        <ListGroup as="ol" numbered>
                            <ListGroup.Item as="li">How does the project enhances the tourism supply in Belize i.e. taking into consideration current and potential tourism demand trends.</ListGroup.Item>
                            <ListGroup.Item as="li">What will be the impact of your project beyond the gains that your firm will get from it: benefits to other companies, the local community, the economy, the environment, etc.</ListGroup.Item>
                            <ListGroup.Item as="li">What is your expectation in terms of jobs creation and/or retention.</ListGroup.Item>

                        </ListGroup>
                        <hr/>
                        <Mutation
                            mutation={UPDATE_BP_EXPECTED_IMPACT}
                            onCompleted={data => {
                                console.log('Complete')
                                setSubmitting(false)
                                setEdit(false)
                            }
                            }
                            refetchQueries={
                                () => [
                                    {query: GET_BP_EXPECTED_IMPACT}
                                ]
                            }
                        >
                            {(updateBpexpectedimpact, {loading, error}) => {
                                if (error) return `Error! ${error}`;
                                return (<Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Description text area</Form.Label>
                                        <Form.Control as="textarea"
                                                      onChange={event => setDescription(event.target.value)}
                                                      defaultValue={`${data.userBpProjectExpectedImpact.description}`}
                                                      disabled={!edit}
                                                      rows={3} placeholder='Maximum 2000 words' required/>
                                    </Form.Group>
                                    <div className="d-flex justify-content-between">
                                        {edit ? <Button variant="primary"
                                                        onClick={event => handleEdit(event, updateBpexpectedimpact, data.userBpProjectExpectedImpact.id)}>Submit</Button>
                                            : <Button variant="primary"
                                                      onClick={event => setEdit(true)}>Edit</Button>}
                                        {edit ? <Button variant="primary"
                                                        onClick={event => setEdit(false)}>Cancel</Button>
                                            : null}
                                        <Button variant="primary" onClick={event => {
                                            navigate(`/section-7`)
                                        }}
                                                disabled={edit || data.userBpProjectExpectedImpact.submitted ? true : false}>Next</Button>
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
                        <Card.Title>Project expected impacts (20% from the total score)</Card.Title>
                    </Card.Body>
                </Card>
                <br/>
                <Card>
                    <Card.Header>Impact</Card.Header>
                    <Card.Body>
                        <ListGroup as="ol" numbered>
                            <ListGroup.Item as="li">How does the project enhances the tourism supply in Belize i.e. taking into consideration current and potential tourism demand trends.</ListGroup.Item>
                            <ListGroup.Item as="li">What will be the impact of your project beyond the gains that your firm will get from it: benefits to other companies, the local community, the economy, the environment, etc.</ListGroup.Item>
                            <ListGroup.Item as="li">What is your expectation in terms of jobs creation and/or retention.</ListGroup.Item>

                        </ListGroup>
                        <hr/>
                        <Mutation
                            mutation={ADD_BP_EXPECTED_IMPACT}
                            onCompleted={data => {
                                console.log('Complete')
                                setSubmitting(false)
                            }
                            }
                            refetchQueries={
                                () => [
                                    {query: GET_BP_EXPECTED_IMPACT}
                                ]
                            }
                        >
                            {(createBpexpectedimpact, {loading, error}) => {
                                if (error) return `Error! ${error}`;
                                return (
                                    <Form onSubmit={event => handleSubmit(event, createBpexpectedimpact)}>
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
                                </Form>)
                            }}
                        </Mutation>
                    </Card.Body>
                </Card>
            </main>
        );
    }
};

const GET_BP_EXPECTED_IMPACT = gql`
query{
  userBpProjectExpectedImpact{
    id
    description
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
}
`

const ADD_BP_EXPECTED_IMPACT = gql`
mutation CreateBPProjectExpectedImpact($description:String!){
  createBpexpectedimpact(description:$description){
    bpProjectExpectedImpact{
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

const UPDATE_BP_EXPECTED_IMPACT = gql`
mutation BPProjectExpectedImpact($bpExpectedImpactId:Int!,$description:String!){
  updateBpexpectedimpact(bpExpectedImpactId:$bpExpectedImpactId,description:$description){
    bpProjectExpectedImpact{
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

export default SectionSix;