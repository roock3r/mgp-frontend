import React, {useState, Fragment, useEffect} from 'react';
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {gql} from "apollo-boost";
import {useQuery, Mutation} from "react-apollo";
import {useNavigate} from "react-router-dom";

const SectionNine = () => {
    const [edit, setEdit] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    let navigate = useNavigate();

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

    const {loading, error, data} = useQuery(GET_BP_IN_KIND_CONTRIBUTION);

    useEffect(() =>{
        if(!loading && data.userBpInKindContribution) {
            setInputFields(JSON.parse(data.userBpInKindContribution.descriptionOfContribution))
        }
    }, [loading, data])

    if (loading) return null;
    if (error) return `Error! ${error}`;


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

        if (event.target.name === "description") {
            values[index].description = event.target.value;
        }
        if(event.target.name === 'contributionDate') {
            values[index].contributionDate = event.target.value;
        }
        if(event.target.name === 'contribution') {
            values[index].contribution = event.target.value;
        }
        if(event.target.name === 'contributionMarketValue') {
            values[index].contributionMarketValue = event.target.value;
        }
        if(event.target.name === 'valuatorValue'){
            values[index].valuatorValue = event.target.value;
        }
        if(event.target.name === 'contributionRestrictionYes'){
            values[index].contributionRestriction = true;
        }
        if(event.target.name === 'contributionRestrictionNo'){
            values[index].contributionRestriction = false;
        }
        if(event.target.name === 'restrictionDescription'){
            values[index].restrictionDescription = event.target.value;
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
        contributionDate:'',
        contribution:'',
        contributionMarketValue: 0,
        valuatorValue: 0,
        contributionRestriction: false,
        restrictionDescription:''}])


    const handleSubmit = async (event, createBpinkindcontribution) => {
        event.preventDefault()
        setSubmitting(true)
        createBpinkindcontribution({
            variables: {
                descriptionOfContribution: JSON.stringify(inputFields,null, 2),
                contributionDate: '2022-01-01',
                contributionMarketValue: '1',
                contribution:'Test',
                valueDeterminedByValuator: '1',
                isRestrictionToContribution: '1',
                descriptionOfRestriction: 'Test',
            }
        })
    }

    const handleEdit = async (event, updateBpinkindcontribution, id) => {
        event.preventDefault()
        setSubmitting(true)
        updateBpinkindcontribution({
            variables: {
                bpInKindContributionId: id,
                descriptionOfContribution: JSON.stringify(inputFields,null, 2),
                contributionDate: '2022-01-01',
                contributionMarketValue: '1',
                contribution:'Test',
                valueDeterminedByValuator: '1',
                isRestrictionToContribution: '1',
                descriptionOfRestriction: 'Test',
            }
        })
    }


    if(data.userBpInKindContribution){
        console.log(data)
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <Card>
                    <Card.Header>Contributed goods and services</Card.Header>
                    <Card.Body>
                        <Mutation
                            mutation={UPDATE_BP_IN_KIND_CONTRIBUTION}
                            onCompleted={data => {
                                console.log('Complete')
                                setSubmitting(false)
                                setEdit(false)
                            }
                            }
                            refetchQueries={
                                () => [
                                    {query: GET_BP_IN_KIND_CONTRIBUTION}
                                ]
                            }
                        >
                            {(updateBpinkindcontribution, {loading, error}) => {
                                if (error) return `Error! ${error}`;
                                return (
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
                                                            disabled={!edit}
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
                                                            disabled={!edit}
                                                            value={inputField.contributionDate}
                                                            onChange={event => handleInputChange(index, event)}
                                                            required
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3" controlId="formGridAddress1">
                                                    <Form.Label column sm={2}>Contribution in kind contribution</Form.Label>
                                                    <Col sm={10}>
                                                        <Form.Control
                                                            id='contribution'
                                                            name='contribution'
                                                            placeholder="Enter your Contribution here..."
                                                            disabled={!edit}
                                                            value={inputField.contribution}
                                                            onChange={event => handleInputChange(index, event)}
                                                            required
                                                        /></Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3" controlId="formGridAddress1">
                                                    <Form.Label column sm={2}>Market value of contribution BZ$</Form.Label>
                                                    <Col sm={10}>
                                                        <Form.Control
                                                            type='number'
                                                            id='contributionMarketValue'
                                                            name='contributionMarketValue'
                                                            placeholder="Enter your Contribution Market Value here..."
                                                            disabled={!edit}
                                                            value={inputField.contributionMarketValue}
                                                            onChange={event => handleInputChange(index, event)}
                                                            required
                                                        /></Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3" controlId="formGridAddress1">
                                                    <Form.Label column sm={2}>Value determined by licensed valuator (when requested)</Form.Label>
                                                    <Col sm={10}>
                                                        <Form.Control
                                                            type='number'
                                                            id='valuatorValue'
                                                            name='valuatorValue'
                                                            placeholder="Enter your Contribution Valuator value here..."
                                                            disabled={!edit}
                                                            value={inputField.valuatorValue}
                                                            onChange={event => handleInputChange(index, event)}
                                                            required
                                                        /></Col>
                                                </Form.Group>
                                                <fieldset>
                                                    <Form.Group as={Row} className="mb-3">
                                                        <Form.Label as="legend" column sm={2}>
                                                            Is there a restriction on the use of this contribution ?
                                                        </Form.Label>
                                                        <Col sm={10}>
                                                            <Form.Check
                                                                type="radio"
                                                                label="Yes"
                                                                disabled={!edit}
                                                                checked={inputField.contributionRestriction}
                                                                name="contributionRestrictionYes"
                                                                id="contributionRestrictionYes"
                                                                onChange={event => handleInputChange(index, event)}
                                                            />
                                                            <Form.Check
                                                                type="radio"
                                                                label="No"
                                                                disabled={!edit}
                                                                checked={!inputField.contributionRestriction}
                                                                name="contributionRestrictionNo"
                                                                id="contributionRestrictionNo"
                                                                onChange={event => handleInputChange(index, event)}
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
                                                            id='restrictionDescription'
                                                            name='restrictionDescription'
                                                            rows={3}
                                                            placeholder='Maximum 500 words'
                                                            disabled={!edit}
                                                            value={inputField.restrictionDescription}
                                                            onChange={event => handleInputChange(index, event)}
                                                            required
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
                                                            onClick={event => handleEdit(event, updateBpinkindcontribution, data.userBpInKindContribution.id)}>Submit</Button>
                                                : <Button variant="primary"
                                                          onClick={event => setEdit(true)}>Edit</Button>}
                                            {edit ? <Button variant="primary"
                                                            onClick={event => setEdit(false)}>Cancel</Button>
                                                : null}
                                            <Button variant="primary" onClick={event => {
                                                navigate(`/section-10`)
                                            }}
                                                    disabled={edit || data.userBpInKindContribution.submitted ? true : false}>Next</Button>
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
    }else{
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <Card>
                    <Card.Header>Contributed goods and services</Card.Header>
                    <Card.Body>
                        <Mutation
                            mutation={ADD_BP_IN_KIND_CONTRIBUTION}
                            onCompleted={data => {
                                console.log('Complete')
                                setSubmitting(false)
                            }
                            }
                            refetchQueries={
                                () => [
                                    {query: GET_BP_IN_KIND_CONTRIBUTION}
                                ]
                            }
                        >
                            {(createBpinkindcontribution, {loading, error}) => {
                                if (error) return `Error! ${error}`;
                                return (
                                    <Form onSubmit={event => handleSubmit(event, createBpinkindcontribution)}>
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
                                                            required
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
                                                            value={inputField.contributionDate}
                                                            required
                                                            onChange={event => handleInputChange(index, event)}
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3" controlId="formGridAddress1">
                                                    <Form.Label column sm={2}>Contribution in kind contribution</Form.Label>
                                                    <Col sm={10}>
                                                        <Form.Control
                                                            id='contribution'
                                                            name='contribution'
                                                            placeholder="Enter your Contribution here..."
                                                            value={inputField.contribution}
                                                            required
                                                            onChange={event => handleInputChange(index, event)}
                                                        /></Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3" controlId="formGridAddress1">
                                                    <Form.Label column sm={2}>Market value of contribution BZ$</Form.Label>
                                                    <Col sm={10}>
                                                        <Form.Control
                                                            type='number'
                                                            id='contributionMarketValue'
                                                            name='contributionMarketValue'
                                                            placeholder="Enter your Contribution Market Value here..."
                                                            value={inputField.contributionMarketValue}
                                                            required
                                                            onChange={event => handleInputChange(index, event)}
                                                        /></Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3" controlId="formGridAddress1">
                                                    <Form.Label column sm={2}>Value determined by licensed valuator (when requested)</Form.Label>
                                                    <Col sm={10}>
                                                        <Form.Control
                                                            type='number'
                                                            id='valuatorValue'
                                                            name='valuatorValue'
                                                            placeholder="Enter your Contribution Valuator value here..."
                                                            value={inputField.valuatorValue}
                                                            required
                                                            onChange={event => handleInputChange(index, event)}
                                                        /></Col>
                                                </Form.Group>
                                                <fieldset>
                                                    <Form.Group as={Row} className="mb-3">
                                                        <Form.Label as="legend" column sm={2}>
                                                            Is there a restriction on the use of this contribution ?
                                                        </Form.Label>
                                                        <Col sm={10}>
                                                            <Form.Check
                                                                type="radio"
                                                                label="Yes"
                                                                name="contributionRestrictionYes"
                                                                id="contributionRestrictionYes"
                                                                onChange={event => handleInputChange(index, event)}
                                                            />
                                                            <Form.Check
                                                                type="radio"
                                                                label="No"
                                                                name="contributionRestrictionNo"
                                                                id="contributionRestrictionNo"
                                                                onChange={event => handleInputChange(index, event)}
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
                                                            id='restrictionDescription'
                                                            name='restrictionDescription'
                                                            rows={3}
                                                            placeholder='Maximum 1000 words'
                                                            value={inputField.restrictionDescription}
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

const GET_BP_IN_KIND_CONTRIBUTION = gql`
query{
  userBpInKindContribution{
    id
    descriptionOfContribution
    contributionDate
    contributionMarketValue
    contribution
    valueDeterminedByValuator
    isRestrictionToContribution
    descriptionOfRestriction
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
}
`

const ADD_BP_IN_KIND_CONTRIBUTION = gql`
mutation CreateBPInKindContribution($descriptionOfContribution:String!, $contributionDate:String!,$contributionMarketValue:String!,$contribution:String!,$valueDeterminedByValuator:String!,$isRestrictionToContribution:String!,$descriptionOfRestriction:String!){
  createBpinkindcontribution(descriptionOfContribution:$descriptionOfContribution,contributionDate:$contributionDate, contributionMarketValue:$contributionMarketValue, contribution:$contribution, valueDeterminedByValuator: $valueDeterminedByValuator, isRestrictionToContribution: $isRestrictionToContribution,descriptionOfRestriction:$descriptionOfRestriction){
      bpInKindContribution{
        id
        descriptionOfContribution
        contributionDate
        contributionMarketValue
        contribution
        valueDeterminedByValuator
        isRestrictionToContribution
        descriptionOfRestriction
        submittedApplication
        completedApplication
        lastUpdated
        created
    }
  }
}
`
const UPDATE_BP_IN_KIND_CONTRIBUTION = gql`
mutation UpdateBPInKindContribution($bpInKindContributionId:Int!,$descriptionOfContribution:String!, $contributionDate:String!,$contributionMarketValue:String!,$contribution:String!,$valueDeterminedByValuator:String!,$isRestrictionToContribution:String!,$descriptionOfRestriction:String!){
  updateBpinkindcontribution(bpInKindContributionId:$bpInKindContributionId,descriptionOfContribution:$descriptionOfContribution,contributionDate:$contributionDate, contributionMarketValue:$contributionMarketValue, contribution:$contribution, valueDeterminedByValuator: $valueDeterminedByValuator, isRestrictionToContribution: $isRestrictionToContribution,descriptionOfRestriction:$descriptionOfRestriction){
      bpInKindContribution{
        id
        descriptionOfContribution
        contributionDate
        contributionMarketValue
        contribution
        valueDeterminedByValuator
        isRestrictionToContribution
        descriptionOfRestriction
        submittedApplication
        completedApplication
        lastUpdated
        created
    }
  }
}
`

export default SectionNine;