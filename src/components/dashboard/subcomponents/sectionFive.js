import React, {useState, Fragment, useEffect} from 'react';
import {Button, Card, Col, Form, ListGroup, Row} from "react-bootstrap";
import {gql} from "apollo-boost";
import {useQuery, Mutation} from "react-apollo";
import {useNavigate} from "react-router-dom";

const SectionFive = () => {
    const [edit, setEdit] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    let navigate = useNavigate();


    const  [inputFields, setInputFields] = useState(
        [{
                description:'',
                startDate:'',
                endDate:'',
                cost: 0,
                expectedResults:''}]
    );

    const {loading, error, data} = useQuery(GET_BP_PROPOSAL_IMPLEMENTATION_PLAN);

    useEffect(() =>{
        if(!loading && data.userBpProposalImplementationPlan) {
            setInputFields(JSON.parse(data.userBpProposalImplementationPlan.description))
        }
    }, [loading, data])

    if (loading) return null;
    if (error) return `Error! ${error}`;

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({
            description:'',
            startDate:'',
            endDate:'',
            cost: 0,
            expectedResults:''});
        setInputFields(values);
    };

    const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        if (event.target.name === "description") {
            values[index].description = event.target.value;
        }
        if(event.target.name === 'startDate') {
            values[index].startDate = event.target.value;
        }

        if(event.target.name === 'cost') {
            values[index].cost = event.target.value;
        }

        if(event.target.name === 'endDate') {
            values[index].endDate = event.target.value;
        }

        if(event.target.name === 'expectedResults'){
            values[index].expectedResults = event.target.value;
        }

        setInputFields(values);
    };

    const handleSubmita = e => {
        e.preventDefault();
        // handle form submission here
        alert(JSON.stringify(inputFields, null, 2))
    };

    const resetForm = e => setInputFields([{
        description:'',
        startDate:'',
        endDate:'',
        cost: 0,
        expectedResults:''}])


    const handleSubmit = async (event, createBpproposalimplementationplan) => {
        event.preventDefault()
        setSubmitting(true)
        createBpproposalimplementationplan({
            variables: {
                description: JSON.stringify(inputFields,null, 2),
                startDate: '2022-01-01',
                endDate: '2022-01-01',
                expectedResults: 'Test',
            }
        })
    }

    const handleEdit = async (event, updateBpproposalimplementationplan, id) => {
        event.preventDefault()
        setSubmitting(true)
        updateBpproposalimplementationplan({
            variables: {
                bpProposalImplementationPlanId: id,
                description: JSON.stringify(inputFields,null, 2),
                startDate: '2022-01-01',
                endDate: '2022-01-01',
                expectedResults: 'Test',
            }
        })
    }

    if(data.userBpProposalImplementationPlan){
        console.log(data)
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                <Card>
                    <Card.Header>Proposal implementation plan</Card.Header>
                    <Card.Body>
                        <ListGroup as="ol" numbered>
                            <ListGroup.Item as="li">
                                <p>The total duration of the project is a maximum of 4 months.</p>
                                <ul>
                                    <li> Applicants are recommended to base the estimated duration for each activity and total period on the most probable/realistic duration.</li>
                                </ul>
                            </ListGroup.Item>
                            <ListGroup.Item as="li">
                                <p>The activities stated in the implementation plan must correspond to the activities described in the application. Any months or interim periods without activities must be included in the action plan and count toward the calculation of the total estimated duration of the action. The implementation plan should be sufficiently detailed to give an overview of each activity. Please select specific and measurable indicators which help capture the achievement of project results. These indicators will form the basis for monitoring and evaluation.</p>
                            </ListGroup.Item>
                            <ListGroup.Item as="li">
                                <p>Kindly ensure that you complete this section listing each goal or task in sequential order or in a logical order based on the timeline of your activities which have been planned.   It is important to ensure that similar activities or tasks associated with a specific objective or goal should be grouped together in your logical order as you list them.  It is also important to ensure that each task or activity listed has the budgetary cost directly associated with its execution or delivery.  If you choose to group your activities under a main goal when you list them, please indicate the total sum of all related sub-tasks in the description field.  This total sum is to be supported by the individual activities you list below each goal showing its identified costs .</p>
                            </ListGroup.Item>
                        </ListGroup>
                        <Mutation
                            mutation={UPDATE_BP_PROPOSAL_IMPLEMENTATION_PLAN}
                            onCompleted={data => {
                                console.log('Complete')
                                setSubmitting(false)
                                setEdit(false)
                            }
                            }
                            refetchQueries={
                                () => [
                                    {query: GET_BP_PROPOSAL_IMPLEMENTATION_PLAN}
                                ]
                            }
                        >
                            {(updateBpproposalimplementationplan, {loading, error}) => {
                                if (error) return `Error! ${error}`;
                                return (
                                    <Form onSubmit={handleSubmit}>
                                        {inputFields.map((inputField, index) => (
                                            <Fragment key={`${inputField}~${index}`}>
                                                <hr/>
                                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                                    <Form.Label column sm={2}>
                                                        Description
                                                    </Form.Label>
                                                    <Col sm={10}>
                                                        <Form.Control
                                                            as="textarea"
                                                            id='description'
                                                            name='description'
                                                            rows={3}
                                                            placeholder='Maximum 2000 words'
                                                            disabled={!edit}
                                                            value={inputField.description}
                                                            onChange={event => handleInputChange(index, event)}
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} controlId="formGridEmail">
                                                        <Form.Label>Start Date </Form.Label>
                                                        <Form.Control
                                                            type='date'
                                                            id='startDate'
                                                            name='startDate'
                                                            disabled={!edit}
                                                            value={inputField.startDate}
                                                            onChange={event => handleInputChange(index, event)}
                                                        />
                                                    </Form.Group>

                                                    <Form.Group as={Col} controlId="formGridEmail">
                                                        <Form.Label>End Date </Form.Label>
                                                        <Form.Control
                                                            type='date'
                                                            id='endDate'
                                                            name='endDate'
                                                            disabled={!edit}
                                                            value={inputField.endDate}
                                                            onChange={event => handleInputChange(index, event)}
                                                        />
                                                    </Form.Group>

                                                    <Form.Group as={Col} controlId="formGridEmail">
                                                        <Form.Label>Cost </Form.Label>
                                                        <Form.Control
                                                            type='number'
                                                            id='cost'
                                                            name='cost'
                                                            disabled={!edit}
                                                            value={inputField.cost}
                                                            onChange={event => handleInputChange(index, event)}
                                                        />
                                                    </Form.Group>

                                                </Row>
                                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                                    <Form.Label column sm={2}>
                                                        Expected Results
                                                    </Form.Label>
                                                    <Col sm={10}>
                                                        <Form.Control
                                                            as='textarea'
                                                            id='expectResults'
                                                            name='expectedResults'
                                                            rows={3}
                                                            placeholder='Maximum 1000 words'
                                                            disabled={!edit}
                                                            value={inputField.expectedResults}
                                                            onChange={event => handleInputChange(index, event)}
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                {edit ? <div className="form-group col-sm-2">
                                                    <button
                                                        className="btn btn-link"
                                                        type="button"
                                                        disabled={index === 0}
                                                        onClick={() => handleRemoveFields(index)}
                                                    >
                                                        -
                                                    </button>
                                                    <button
                                                        className="btn btn-link"
                                                        type="button"
                                                        onClick={() => handleAddFields()}
                                                    >
                                                        +
                                                    </button>
                                                </div> : null}

                                            </Fragment>
                                        ))}
                                        <div className="d-flex justify-content-between">
                                        {edit ? <Button variant="primary"
                                                        onClick={event => handleEdit(event, updateBpproposalimplementationplan, data.userBpProposalImplementationPlan.id)}>Submit</Button>
                                            : <Button variant="primary"
                                                      onClick={event => setEdit(true)}>Edit</Button>}
                                        {edit ? <Button variant="primary"
                                                        onClick={event => setEdit(false)}>Cancel</Button>
                                            : null}
                                        <Button variant="primary" onClick={event => {
                                            navigate(`/section-6`)
                                        }}
                                                disabled={edit || data.userBpProposalImplementationPlan.submitted ? true : false}>Next</Button>
                                    </div>
                                        {/*<div className="submit-button">*/}
                                        {/*    <button*/}
                                        {/*        className="btn btn-primary mr-2"*/}
                                        {/*        type="submit"*/}
                                        {/*        onSubmit={handleSubmit}*/}
                                        {/*    >*/}
                                        {/*        Save*/}
                                        {/*    </button>*/}
                                        {/*    <button*/}
                                        {/*        className="btn btn-secondary mr-2"*/}
                                        {/*        type="reset"*/}
                                        {/*        onClick={resetForm}*/}
                                        {/*    >*/}
                                        {/*        Reset Form*/}
                                        {/*    </button>*/}
                                        {/*</div>*/}
                                        <br/>
                                    </Form>
                                ) }}
                        </Mutation>
                    </Card.Body>
                </Card>
            </main>
        );
    }else{
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                <Card>
                    <Card.Header>Proposal implementation plan</Card.Header>
                    <Card.Body>
                        <ListGroup as="ol" numbered>
                            <ListGroup.Item as="li">
                                <p>The total duration of the project is a maximum of 4 months.</p>
                                <ul>
                                    <li> Applicants are recommended to base the estimated duration for each activity and total period on the most probable/realistic duration.</li>
                                </ul>
                            </ListGroup.Item>
                            <ListGroup.Item as="li">
                                <p>The activities stated in the implementation plan must correspond to the activities described in the application. Any months or interim periods without activities must be included in the action plan and count toward the calculation of the total estimated duration of the action. The implementation plan should be sufficiently detailed to give an overview of each activity. Please select specific and measurable indicators which help capture the achievement of project results. These indicators will form the basis for monitoring and evaluation.</p>
                            </ListGroup.Item>
                        </ListGroup>
                        <Mutation
                            mutation={ADD_BP_PROPOSAL_IMPLEMENTATION_PLAN}
                            onCompleted={data => {
                                console.log('Complete')
                                setSubmitting(false)
                            }
                            }
                            refetchQueries={
                                () => [
                                    {query: GET_BP_PROPOSAL_IMPLEMENTATION_PLAN}
                                ]
                            }
                        >
                            {(createBpproposalimplementationplan, {loading, error}) => {
                                if (error) return `Error! ${error}`;
                                return (
                                    <Form onSubmit={event => handleSubmit(event, createBpproposalimplementationplan)}>
                                        {inputFields.map((inputField, index) => (
                                            <Fragment key={`${inputField}~${index}`}>
                                                <hr/>
                                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                                    <Form.Label column sm={2}>
                                                        Description
                                                    </Form.Label>
                                                    <Col sm={10}>
                                                        <Form.Control
                                                            as="textarea"
                                                            id='description'
                                                            name='description'
                                                            rows={3}
                                                            placeholder='Maximum 2000 words'
                                                            value={inputField.description}
                                                            required
                                                            onChange={event => handleInputChange(index, event)}
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} controlId="formGridEmail">
                                                        <Form.Label>Start Date </Form.Label>
                                                        <Form.Control
                                                            type='date'
                                                            id='startDate'
                                                            name='startDate'
                                                            value={inputField.startDate}
                                                            required
                                                            onChange={event => handleInputChange(index, event)}
                                                        />
                                                    </Form.Group>

                                                    <Form.Group as={Col} controlId="formGridEmail">
                                                        <Form.Label>End Date </Form.Label>
                                                        <Form.Control
                                                            type='date'
                                                            id='endDate'
                                                            name='endDate'
                                                            value={inputField.endDate}
                                                            required
                                                            onChange={event => handleInputChange(index, event)}
                                                        />
                                                    </Form.Group>

                                                    <Form.Group as={Col} controlId="formGridEmail">
                                                        <Form.Label>Cost </Form.Label>
                                                        <Form.Control
                                                            type='number'
                                                            id='cost'
                                                            name='cost'
                                                            value={inputField.cost}
                                                            required
                                                            onChange={event => handleInputChange(index, event)}
                                                        />
                                                    </Form.Group>
                                                </Row>
                                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                                    <Form.Label column sm={2}>
                                                        Expected Results
                                                    </Form.Label>
                                                    <Col sm={10}>
                                                        <Form.Control
                                                            as='textarea'
                                                            id='expectResults'
                                                            name='expectedResults'
                                                            rows={3}
                                                            placeholder='Maximum 1000 words'
                                                            value={inputField.expectedResults}
                                                            required
                                                            onChange={event => handleInputChange(index, event)}
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                <div className="form-group col-sm-2">
                                                    <button
                                                        className="btn btn-link"
                                                        type="button"
                                                        disabled={index === 0}
                                                        onClick={() => handleRemoveFields(index)}
                                                    >
                                                        -
                                                    </button>
                                                    <button
                                                        className="btn btn-link"
                                                        type="button"
                                                        onClick={() => handleAddFields()}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </Fragment>
                                        ))}
                                        <div className="submit-button">
                                            <button
                                                className="btn btn-primary mr-2"
                                                type="submit"
                                                // onSubmit={handleSubmit}
                                                disabled={
                                                    submitting
                                                    // || !inputFields.trim()
                                                }
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-secondary mr-2"
                                                type="reset"
                                                disabled={
                                                    submitting
                                                    // || !inputFields.trim()
                                                }
                                                onClick={resetForm}
                                            >
                                                Reset Form
                                            </button>
                                        </div>
                                        <br/>
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

const GET_BP_PROPOSAL_IMPLEMENTATION_PLAN = gql`
query{
  userBpProposalImplementationPlan{
    id
    description
    startDate
    endDate
    expectedResults
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
}
`
const ADD_BP_PROPOSAL_IMPLEMENTATION_PLAN = gql`
mutation CreateBPProposalImplementationPlan($description:String!, $startDate:String!,$endDate:String!,$expectedResults:String!){
  createBpproposalimplementationplan(description:$description,startDate:$startDate, endDate:$endDate, expectedResults:$expectedResults){
      bpProposalImplementationPlan{
        id
        description
        startDate
        endDate
        expectedResults
        submittedApplication
        completedApplication
        lastUpdated
        created
      }
  }
}
`
const UPDATE_BP_PROPOSAL_IMPLEMENTATION_PLAN = gql`
mutation UpdateBPProposalImplementationPlan($bpProposalImplementationPlanId:Int!,$description:String!, $startDate:String!,$endDate:String!,$expectedResults:String!){
  updateBpproposalimplementationplan(bpProposalImplementationPlanId:$bpProposalImplementationPlanId,description:$description,startDate:$startDate, endDate:$endDate, expectedResults:$expectedResults){
      bpProposalImplementationPlan{
        id
        description
        startDate
        endDate
        expectedResults
        submittedApplication
        completedApplication
        lastUpdated
        created
      }
  }
}
`

export default SectionFive;