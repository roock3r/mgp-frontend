import React, {Fragment, useState} from 'react';
import {Button, Card, Col, Form, ListGroup, Row} from "react-bootstrap";

const SectionNine = () => {
    const  [inputFields, setInputFields] = useState(
        [{
            description:'',
            contributionDate:'',
            contribution:'',
            contributionMarketValue: 0,
            valuatorValue: 0,
            contributionRestriction: false,
            restrictionDescription:''}]
    );
    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({
            description:'',
            contributionDate:'',
            contribution:'',
            contributionMarketValue: 0,
            valuatorValue: 0,
            contributionRestriction: false,
            restrictionDescription:''});
        setInputFields(values);
    };

    const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };

    const handleInputChange = (index, event) => {
        const values = [...inputFields];

        if (event.target.name === "contributionDate") {
            values[index].description = event.target.value;
        }
        if(event.target.name === 'contribution') {
            values[index].startDate = event.target.value;
        }

        if(event.target.name === 'contributionMarketValue') {
            values[index].endDate = event.target.value;
        }

        if(event.target.name === 'valuatorValue'){
            values[index].expectedResults = event.target.value;
        }
        if(event.target.name === 'contributionRestriction'){
            values[index].expectedResults = event.target.value;
        }
        if(event.target.name === 'restrictionDescription'){
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
        contributionDate:'',
        contribution:'',
        contributionMarketValue: 0,
        valuatorValue: 0,
        contributionRestriction: false,
        restrictionDescription:''}])

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Card>
                <Card.Header>Contributed goods and services</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        {inputFields.map((inputField, index) => (
                            <Fragment key={`${inputField}~${index}`}>
                                <hr/>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        Description of contributed goods and services
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
                                    <Form.Group as={Row} className="mb-3" controlId="formGridEmail">
                                        <Form.Label column sm={2}> Contribution Date </Form.Label>
                                        <Col sm={10}>
                                        <Form.Control
                                            type='date'
                                            id='contributionDate'
                                            name='contributionDate'
                                            value={inputField.startDate}
                                            onChange={event => handleInputChange(index, event)}
                                        />
                                        </Col>
                                    </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formGridAddress1">
                                    <Form.Label column sm={2}>Contribution in kind contribution</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control placeholder="Enter your Contribution here..." /></Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formGridAddress1">
                                    <Form.Label column sm={2}>Market value of contribution BZ$</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control placeholder="Enter your Contribution Market Value here..." /></Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formGridAddress1">
                                    <Form.Label column sm={2}>Value determined by licensed valuator (when requested)</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control placeholder="Enter your Contribution Valuator value here..." /></Col>
                                </Form.Group>
                                <fieldset>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label as="legend" column sm={2}>
                                            Is there a resitrction on the use of this contribution ?
                                        </Form.Label>
                                        <Col sm={10}>
                                            <Form.Check
                                                type="radio"
                                                label="Yes"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios1"
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="No"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios2"
                                            />
                                        </Col>
                                    </Form.Group>
                                </fieldset>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        If yes, what are the restrictions
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

export default SectionNine;