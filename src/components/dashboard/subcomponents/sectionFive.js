import React, {useState, Fragment} from 'react';
import {Button, Card, Col, Form, ListGroup, Row} from "react-bootstrap";

const SectionFive = () => {
    const  [inputFields, setInputFields] = useState(
        [{
                description:'',
                startDate:'',
                endDate:'',
                expectedResults:''}]
    );
    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({
            description:'',
            startDate:'',
            endDate:'',
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

        if(event.target.name === 'endDate') {
            values[index].endDate = event.target.value;
        }

        if(event.target.name === 'expectedResults'){
            values[index].expectedResults = event.target.value;
        }

        setInputFields(values);
    };

    const handleSubmit = e => {
        e.preventDefault();
        // handle form submission here
        alert(JSON.stringify(inputFields, null, 2))
    };

    const resetForm = e => setInputFields([{
        description:'',
        startDate:'',
        endDate:'',
        expectedResults:''}])


    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

            <Card>
                <Card.Header>Proposal implementation plan</Card.Header>
                <Card.Body>
                    <ListGroup as="ol" numbered>
                        <ListGroup.Item as="li">
                            <p>The total duration of the project is a maximum of 8 months.</p>
                            <ul>
                                <li> Applicants are recommended to base the estimated duration for each activity and total period on the most probable/realistic duration.</li>
                            </ul>
                        </ListGroup.Item>
                        <ListGroup.Item as="li">
                            <p>The activities stated in the implementation plan must correspond to the activities described in the application. Any months or interim periods without activities must be included in the action plan and count toward the calculation of the total estimated duration of the action. The implementation plan should be sufficiently detailed to give an overview of each activity. Please select specific and measurable indicators which help capture the achievement of project results. These indicators will form the basis for monitoring and evaluation.</p>
                        </ListGroup.Item>
                    </ListGroup>

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
                                            value={inputField.endDate}
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
                                onSubmit={handleSubmit}
                            >
                                Save
                            </button>
                            <button
                                className="btn btn-secondary mr-2"
                                type="reset"
                                onClick={resetForm}
                            >
                                Reset Form
                            </button>
                        </div>
                        <br/>
                    </Form>
                </Card.Body>
            </Card>
        </main>
    );
};

export default SectionFive;