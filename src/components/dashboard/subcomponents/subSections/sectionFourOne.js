import React, {useEffect,useState} from 'react';
import {Button, Card, Col, Form, ListGroup, Row} from "react-bootstrap";
import {gql} from "apollo-boost";
import {useQuery, Mutation} from "react-apollo";

const SectionFourOne = () => {
    const [edit, setEdit] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [description, setDescription] = useState('')

    const {loading, error, data} = useQuery(GET_BP_CAPACITY);

    useEffect(() =>{
        if(!loading && data.userBpCapacity) {
            setDescription(data.userBpCapacity.description)
        }
    }, [loading, data])

    if (loading) return null;
    if (error) return `Error! ${error}`;

    const handleSubmit = async (event, createBpcapacity) => {
        event.preventDefault()
        setSubmitting(true)
        createBpcapacity({
            variables: {
                description: description,
            }
        })
    }

    const handleEdit = async (event, updateBpcapacity, id) => {
        event.preventDefault()
        setSubmitting(true)
        console.log(id)
        updateBpcapacity({
            variables: {
                bpCapacityId: id,
                description: description,
            }
        })
    }

    if(data.userBpCapacity){
        console.log(data)
        return (
            <Card>
                <Card.Header>Capacity</Card.Header>
                <Card.Body>
                    <ListGroup as="ol" numbered>
                        <ListGroup.Item as="li">Describe the applicant/s relevant business/entrepreneurial experience (pre-Covid19):  list the most important, relevant project/s you have implemented, provide short project description in terms of the type of the project, size, scope and scale, and results of the implemented project/s.</ListGroup.Item>
                        <ListGroup.Item as="li">
                            <p>What is the maturity of the SME under the same ownership. </p>
                            <ul>
                                <li> &#62; 12 months &#60; 24 months</li>
                                <li> &#62; 24 months &#60; 36 months</li>
                                <li> &#62; 36 months &#60; 60 month </li>
                                <li> more than 60 months</li>
                            </ul>
                        </ListGroup.Item>
                        <ListGroup.Item as="li">What are the human resources allocated to the implementation of the project</ListGroup.Item>
                        <ListGroup.Item as="li">Applicant/s cash contribution (%)</ListGroup.Item>
                        <ListGroup.Item as="li">Applicant/s in kind contribution (%)</ListGroup.Item>
                        <ListGroup.Item as="li">Applicant/s financial capability: what is the % of the MG contribution compared to the annual income</ListGroup.Item>
                    </ListGroup>
                    <hr/>
                    <Mutation
                        mutation={UPDATE_BP_CAPACITY}
                        onCompleted={data => {
                            console.log('Complete')
                            setSubmitting(false)
                            setEdit(false)
                        }
                        }
                        refetchQueries={
                            () => [
                                {query: GET_BP_CAPACITY}
                            ]
                        }
                    >
                        {(updateBpcapacity, {loading, error}) => {
                            if (error) return `Error! ${error}`;
                            return (
                                <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description text area</Form.Label>
                            <Form.Control as="textarea"
                                          onChange={event => setDescription(event.target.value)}
                                          defaultValue={`${data.userBpCapacity.description}`}
                                          disabled={!edit}
                                          rows={3} placeholder='Maximum 2000 words' required/>
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                            {edit ? <Button variant="primary"
                                            onClick={event => handleEdit(event, updateBpcapacity, data.userBpCapacity.id)}>Submit</Button>
                                : <Button variant="primary"
                                          onClick={event => setEdit(true)}>Edit</Button>}
                            {edit ? <Button variant="primary"
                                            onClick={event => setEdit(false)}>Cancel</Button>
                                : null}
                        </div>
                    </Form>
                            )}}
                    </Mutation>
                </Card.Body>
            </Card>
        );
    }else{
        return (
            <Card>
                <Card.Header>Capacity</Card.Header>
                <Card.Body>
                    <ListGroup as="ol" numbered>
                        <ListGroup.Item as="li">Describe the applicant/s relevant business/entrepreneurial experience (pre-Covid19):  list the most important, relevant project/s you have implemented, provide short project description in terms of the type of the project, size, scope and scale, and results of the implemented project/s.</ListGroup.Item>
                        <ListGroup.Item as="li">
                            <p>What is the maturity of the SME under the same ownership. </p>
                            <ul>
                                <li> &#62; 12 months &#60; 24 months</li>
                                <li> &#62; 24 months &#60; 36 months</li>
                                <li> &#62; 36 months &#60; 60 month </li>
                                <li> more than 60 months</li>
                            </ul>
                        </ListGroup.Item>
                        <ListGroup.Item as="li">What are the human resources allocated to the implementation of the project</ListGroup.Item>
                        <ListGroup.Item as="li">Applicant/s cash contribution (%)</ListGroup.Item>
                        <ListGroup.Item as="li">Applicant/s in kind contribution (%)</ListGroup.Item>
                        <ListGroup.Item as="li">Applicant/s financial capability: what is the % of the MG contribution compared to the annual income</ListGroup.Item>
                    </ListGroup>
                    <hr/>
                    <Mutation
                        mutation={ADD_BP_CAPACITY}
                        onCompleted={data => {
                            console.log('Complete')
                            setSubmitting(false)
                        }
                        }
                        refetchQueries={
                            () => [
                                {query: GET_BP_CAPACITY}
                            ]
                        }
                    >
                        {(createBpcapacity, {loading, error}) => {
                            if (error) return `Error! ${error}`;
                            return (
                                <Form onSubmit={event => handleSubmit(event, createBpcapacity)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description text area</Form.Label>
                            <Form.Control as="textarea"
                                          onChange={event => setDescription(event.target.value)}
                                          rows={3}
                                          placeholder='Maximum 1000 words' required/>
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

const GET_BP_CAPACITY = gql`
query{
  userBpCapacity{
    id
    description
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
}
`

const ADD_BP_CAPACITY = gql`
mutation CreateBPCapacity($description:String!){
  createBpcapacity(description:$description){
    bpCapacity{
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

const UPDATE_BP_CAPACITY = gql`
mutation UpdateBPCapacity($bpCapacityId: Int!,$description:String!){
  updateBpcapacity(bpCapacityId:$bpCapacityId, description:$description){
    bpCapacity{
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


export default SectionFourOne;