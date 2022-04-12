import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {gql} from "apollo-boost";
import {useQuery, Mutation} from "react-apollo";
import {useNavigate} from "react-router-dom";


const SectionSeven = () => {
    const [edit, setEdit] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    let navigate = useNavigate();

    const [project_title, setProjectTitle] = useState('')
    const [project_budget, setProjectBudget] = useState('')
    const [project_budget_percents, setProjectBudgetPercents] = useState('100')

    const [requested_amount, setRequestedAmount] = useState('')
    const [requested_amount_percents, setRequestedAmountPercents] = useState('')


    const [applicants_contribution, setApplicantsContribution] = useState('')
    const [applicants_contribution_percents, setApplicantsContributionPercents] = useState('')

    const [cash_inkind_contribution, setCashInKindContribution] = useState('')
    const [cash_inkind_contribution_percents, setCashInKindContributionPercents] = useState('')

    const [cash_inkind_contribution_cash, setCashInKindContributionCash] = useState('')
    const [cash_inkind_contribution_cash_percents, setCashInKindContributionCashPercents] = useState('')


    const {loading, error, data} = useQuery(GET_BP_BUDGET_FINANCE);

    useEffect(() => {
        if (!loading && data.userBpBudgetFinance) {
            setProjectTitle(data.userBpBudgetFinance.projectTitle)
            setProjectBudget(data.userBpBudgetFinance.projectBudget)
            setRequestedAmount(data.userBpBudgetFinance.requestedAmount)
            setApplicantsContribution(data.userBpBudgetFinance.applicantsContribution)
            setCashInKindContribution(data.userBpBudgetFinance.cashInkindContribution)
            setRequestedAmountPercents(data.userBpBudgetFinance.requestedAmountPercents)
            setApplicantsContributionPercents(data.userBpBudgetFinance.applicantsContributionPercents)
            setCashInKindContributionPercents(data.userBpBudgetFinance.cashInkindContributionPercents)
            setCashInKindContributionCash(data.userBpBudgetFinance.cashInkindContributionCash)
            setCashInKindContributionCashPercents(data.userBpBudgetFinance.cashInkindContributionCashPercents)
        }
    }, [loading, data])


    if (loading) return null;
    if (error) return `Error! ${error}`;

    const handleSubmit = async (event, createBpbudgetfinance) => {
        event.preventDefault()
        setSubmitting(true)
        createBpbudgetfinance({
            variables: {
                projectTitle: project_title,
                projectBudget: project_budget,
                requestedAmount: requested_amount,
                applicantsContribution: applicants_contribution,
                cashInkindContribution: cash_inkind_contribution,
                requestedAmountPercents: requested_amount_percents,
                applicantsContributionPercents: applicants_contribution_percents,
                cashInkindContributionPercents: cash_inkind_contribution_percents,
                cashInkindContributionCash: cash_inkind_contribution_cash,
                cashInkindContributionCashPercents: cash_inkind_contribution_cash_percents
            }
        })
    }

    const handleEdit = async (event, updateBpbudgetfinance, id) => {
        event.preventDefault()
        setSubmitting(true)
        updateBpbudgetfinance({
            variables: {
                bpBudgetFinanceId: id,
                projectTitle: project_title,
                projectBudget: project_budget,
                requestedAmount: requested_amount,
                applicantsContribution: applicants_contribution,
                cashInkindContribution: cash_inkind_contribution,
                requestedAmountPercents: requested_amount_percents,
                applicantsContributionPercents: applicants_contribution_percents,
                cashInkindContributionPercents: cash_inkind_contribution_percents,
                cashInkindContributionCash: cash_inkind_contribution_cash,
                cashInkindContributionCashPercents: cash_inkind_contribution_cash_percents
            }
        })
    }

    if (data.userBpBudgetFinance) {
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <Card>
                    <Card.Header>Budget of the project</Card.Header>
                    <Card.Body>
                        <Mutation
                            mutation={UPDATE_BP_BUDGET_FINANCE}
                            onCompleted={data => {
                                console.log('Complete')
                                setSubmitting(false)
                                setEdit(false)
                            }
                            }
                            refetchQueries={
                                () => [
                                    {query: GET_BP_BUDGET_FINANCE}
                                ]
                            }

                        >

                            {(updateBpbudgetfinance, {loading, error}) => {
                                if (error) return `Error! ${error}`;
                                return (
                                    <Form>
                                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                            <Form.Label column sm={2}>
                                                Project Title
                                            </Form.Label>
                                            <Col sm={10}>
                                                <Form.Control type="text"
                                                              onChange={event => setProjectTitle(event.target.value)}
                                                              defaultValue={`${data.userBpBudgetFinance.projectTitle}`}
                                                              disabled={!edit}
                                                              placeholder="Enter title here" required/>
                                            </Col>
                                        </Form.Group>

                                        {/*<Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">*/}
                                        {/*    <Form.Label column sm={2}>*/}
                                        {/*        Budget of the project*/}
                                        {/*    </Form.Label>*/}
                                        {/*    <Col sm={10}>*/}
                                        {/*        <Form.Control type="number"*/}
                                        {/*                      onChange={event => setProjectBudget(event.target.value)}*/}
                                        {/*                      defaultValue={`${data.userBpBudgetFinance.projectBudget}`}*/}
                                        {/*                      disabled={!edit}*/}
                                        {/*                      placeholder="Enter Budget of project here..." required/>*/}
                                        {/*    </Col>*/}
                                        {/*</Form.Group>*/}
                                        <Row className="mb-3">
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Budget of the project
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  onChange={event => setProjectBudget(event.target.value)}
                                                                  defaultValue={`${data.userBpBudgetFinance.projectBudget}`}
                                                                  disabled={!edit}
                                                                  placeholder="Enter Budget of project here..."
                                                                  required/>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Budget of the project %
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  disabled={true}
                                                                  value={project_budget_percents}
                                                                  required/>
                                                </Col>
                                            </Form.Group>
                                        </Row>


                                        {/*<Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">*/}
                                        {/*    <Form.Label column sm={2}>*/}
                                        {/*        Requested amount from the MGP*/}
                                        {/*    </Form.Label>*/}
                                        {/*    <Col sm={10}>*/}
                                        {/*        <Form.Control type="number"*/}
                                        {/*                      onChange={event => setRequestedAmount(event.target.value)}*/}
                                        {/*                      defaultValue={`${data.userBpBudgetFinance.requestedAmount}`}*/}
                                        {/*                      disabled={!edit}*/}
                                        {/*                      placeholder="Enter Requested amount from the MGP here.."*/}
                                        {/*                      required/>*/}
                                        {/*    </Col>*/}
                                        {/*</Form.Group>*/}
                                        <Row className="mb-3">
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Requested amount from the MGP
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  onChange={event => setRequestedAmount(event.target.value)}
                                                                  defaultValue={`${data.userBpBudgetFinance.requestedAmount}`}
                                                                  disabled={!edit}
                                                                  placeholder="Enter Requested amount from the MGP here.."
                                                                  required
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Requested amount from the MGP %
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  onChange={event => setRequestedAmountPercents(event.target.value)}
                                                                  defaultValue={`${data.userBpBudgetFinance.requestedAmountPercents}`}
                                                                  disabled={!edit}
                                                                  placeholder="Enter Requested amount percentage from the MGP here.."
                                                                  required
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </Row>
                                        {/*<Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">*/}
                                        {/*    <Form.Label column sm={2}>*/}
                                        {/*        Applicants contribution*/}
                                        {/*    </Form.Label>*/}
                                        {/*    <Col sm={10}>*/}
                                        {/*        <Form.Control type="number"*/}
                                        {/*                      onChange={event => setApplicantsContribution(event.target.value)}*/}
                                        {/*                      defaultValue={`${data.userBpBudgetFinance.applicantsContribution}`}*/}
                                        {/*                      disabled={!edit}*/}
                                        {/*                      placeholder="Enter Applicants contribution here..."*/}
                                        {/*                      required/>*/}
                                        {/*    </Col>*/}
                                        {/*</Form.Group>*/}
                                        <Row className="mb-3">
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Applicants contribution
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  onChange={event => setApplicantsContribution(event.target.value)}
                                                                  defaultValue={`${data.userBpBudgetFinance.applicantsContribution}`}
                                                                  disabled={!edit}
                                                                  placeholder="Enter Applicants contribution here..."
                                                                  required
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Applicants contribution %
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  onChange={event => setApplicantsContributionPercents(event.target.value)}
                                                                  defaultValue={`${data.userBpBudgetFinance.applicantsContributionPercents}`}
                                                                  disabled={!edit}
                                                                  placeholder="Enter Applicants contribution percentage here..."
                                                                  required
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </Row>
                                        {/*<Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">*/}
                                        {/*    <Form.Label column sm={2}>*/}
                                        {/*        Own contribution Cash in Kind*/}
                                        {/*    </Form.Label>*/}
                                        {/*    <Col sm={10}>*/}
                                        {/*        <Form.Control type="number"*/}
                                        {/*                      onChange={event => setApplicantsContribution(event.target.value)}*/}
                                        {/*                      defaultValue={`${data.userBpBudgetFinance.cashInkindContribution}`}*/}
                                        {/*                      disabled={!edit}*/}
                                        {/*                      placeholder="Enter Own contribution cash in Kind here .."*/}
                                        {/*                      required/>*/}
                                        {/*    </Col>*/}
                                        {/*</Form.Group>*/}
                                        <hr/>
                                        <h5>
                                            Own Contribution breakdown
                                        </h5>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Own contribution Cash
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  onChange={event => setCashInKindContributionCash(event.target.value)}
                                                                  defaultValue={`${data.userBpBudgetFinance.cashInkindContributionCash}`}
                                                                  disabled={!edit}
                                                                  placeholder="Enter Own Cash contribution here .."
                                                                  required
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Own contribution Cash%
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  onChange={event => setCashInKindContributionCashPercents(event.target.value)}
                                                                  defaultValue={`${data.userBpBudgetFinance.cashInkindContributionCashPercents}`}
                                                                  disabled={!edit}
                                                                  placeholder="Enter Own Cash contribution percentage here .."
                                                                  required
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Own contribution In Kind
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  onChange={event => setCashInKindContribution(event.target.value)}
                                                                  defaultValue={`${data.userBpBudgetFinance.cashInkindContribution}`}
                                                                  disabled={!edit}
                                                                  placeholder="Enter Own In kind contribution here .."
                                                                  required
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Own contribution In Kind%
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  onChange={event => setCashInKindContributionPercents(event.target.value)}
                                                                  defaultValue={`${data.userBpBudgetFinance.cashInkindContributionPercents}`}
                                                                  disabled={!edit}
                                                                  placeholder="Enter Own In kind contribution percentage here .."
                                                                  required
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </Row>


                                        <div className="d-flex justify-content-between">
                                            {edit ? <Button variant="primary"
                                                            onClick={event => handleEdit(event, updateBpbudgetfinance, data.userBpBudgetFinance.id)}>Submit</Button>
                                                : <Button variant="primary"
                                                          onClick={event => setEdit(true)}>Edit</Button>}
                                            {edit ? <Button variant="primary"
                                                            onClick={event => setEdit(false)}>Cancel</Button>
                                                : null}
                                            <Button variant="primary" onClick={event => {
                                                navigate(`/section-8`)
                                            }}
                                                    disabled={edit || data.userBpBudgetFinance.submitted ? true : false}>Next</Button>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Mutation>
                    </Card.Body>
                </Card>
            </main>
        );
    } else {
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <Card>
                    <Card.Header>Budget of the project</Card.Header>
                    <Card.Body>
                        <Mutation
                            mutation={ADD_BP_BUDGET_FINANCE}
                            onCompleted={data => {
                                console.log('Complete')
                                setSubmitting(false)
                            }
                            }
                            refetchQueries={
                                () => [
                                    {query: GET_BP_BUDGET_FINANCE}
                                ]
                            }
                        >
                            {(createBpbudgetfinance, {loading, error}) => {
                                if (error) return `Error! ${error}`;
                                return (
                                    <Form onSubmit={event => handleSubmit(event, createBpbudgetfinance)}>
                                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                            <Form.Label column sm={2}>
                                                Project Title
                                            </Form.Label>
                                            <Col sm={10}>
                                                <Form.Control type="text"
                                                              onChange={event => setProjectTitle(event.target.value)}
                                                              placeholder="Enter title here"
                                                              required/>
                                            </Col>
                                        </Form.Group>
                                        <hr/>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Budget of the project
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  onChange={event => setProjectBudget(event.target.value)}
                                                                  placeholder="Enter Budget of project here..."
                                                                  required/>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Budget of the project %
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  disabled={true}
                                                                  value={project_budget_percents}
                                                                  required/>
                                                </Col>
                                            </Form.Group>
                                        </Row>
                                        {/*<Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">*/}
                                        {/*    <Form.Label column sm={2}>*/}
                                        {/*        Budget of the project*/}
                                        {/*    </Form.Label>*/}
                                        {/*    <Col sm={10}>*/}
                                        {/*        <Form.Control type="number"*/}
                                        {/*                      onChange={event => setProjectBudget(event.target.value)}*/}
                                        {/*                      placeholder="Enter Budget of project here..." required/>*/}
                                        {/*    </Col>*/}
                                        {/*</Form.Group>*/}
                                        <Row className="mb-3">
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Requested amount from the MGP
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  onChange={event => setRequestedAmount(event.target.value)}
                                                                  placeholder="Enter Requested amount from the MGP here.."
                                                                  required
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Requested amount from the MGP %
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  onChange={event => setRequestedAmountPercents(event.target.value)}
                                                                  placeholder="Enter Requested amount percentage from the MGP here.."
                                                                  required
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </Row>
                                        {/*<Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">*/}
                                        {/*    <Form.Label column sm={2}>*/}
                                        {/*        Requested amount from the MGP*/}
                                        {/*    </Form.Label>*/}
                                        {/*    <Col sm={10}>*/}
                                        {/*        <Form.Control type="number"*/}
                                        {/*                      onChange={event => setRequestedAmount(event.target.value)}*/}
                                        {/*                      placeholder="Enter Requested amount from the MGP here.."*/}
                                        {/*                      required*/}
                                        {/*        />*/}
                                        {/*    </Col>*/}
                                        {/*</Form.Group>*/}
                                        <Row className="mb-3">
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Applicants contribution
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  onChange={event => setApplicantsContribution(event.target.value)}
                                                                  placeholder="Enter Applicants contribution here..."
                                                                  required
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Applicants contribution %
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  onChange={event => setApplicantsContributionPercents(event.target.value)}
                                                                  placeholder="Enter Applicants contribution percentage here..."
                                                                  required
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </Row>
                                        {/*<Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">*/}
                                        {/*    <Form.Label column sm={2}>*/}
                                        {/*        Applicants contribution*/}
                                        {/*    </Form.Label>*/}
                                        {/*    <Col sm={10}>*/}
                                        {/*        <Form.Control type="number"*/}
                                        {/*                      onChange={event => setApplicantsContribution(event.target.value)}*/}
                                        {/*                      placeholder="Enter Applicants contribution here..."*/}
                                        {/*                      required*/}
                                        {/*        />*/}
                                        {/*    </Col>*/}
                                        {/*</Form.Group>*/}
                                        {/*<Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">*/}
                                        {/*    <Form.Label column sm={2}>*/}
                                        {/*        Own contribution Cash in Kind*/}
                                        {/*    </Form.Label>*/}
                                        {/*    <Col sm={10}>*/}
                                        {/*        <Form.Control type="number"*/}
                                        {/*                      onChange={event => setCashInKindContribution(event.target.value)}*/}
                                        {/*                      placeholder="Enter Own contribution cash in Kind here .."*/}
                                        {/*                      required*/}
                                        {/*        />*/}
                                        {/*    </Col>*/}
                                        {/*</Form.Group>*/}
                                        <hr/>
                                        <h5>
                                            Own Contribution breakdown
                                        </h5>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Own contribution Cash
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  onChange={event => setCashInKindContributionCash(event.target.value)}
                                                                  placeholder="Enter Own Cash contribution here .."
                                                                  required
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Own contribution Cash%
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  onChange={event => setCashInKindContributionCashPercents(event.target.value)}
                                                                  placeholder="Enter Own Cash contribution percentage here .."
                                                                  required
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Own contribution In Kind
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  onChange={event => setCashInKindContribution(event.target.value)}
                                                                  placeholder="Enter Own In kind contribution here .."
                                                                  required
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                                                <Form.Label column sm={2}>
                                                    Own contribution In Kind%
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="number"
                                                                  onChange={event => setCashInKindContributionPercents(event.target.value)}
                                                                  placeholder="Enter Own In kind contribution percentage here .."
                                                                  required
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </Row>
                                        {/*<Form.Group as={Row} className="mb-3">*/}
                                        {/*    <Col sm={{span: 10, offset: 2}}>*/}
                                        {/*        <Button type="submit">Submit </Button>*/}
                                        {/*    </Col>*/}
                                        {/*</Form.Group>*/}
                                        <Row>
                                            <Col>
                                                <Button variant="primary" type="submit"
                                                        disabled={
                                                            submitting
                                                            || !project_title.trim()
                                                            || !project_budget.trim()
                                                            || !applicants_contribution.trim()
                                                            || !cash_inkind_contribution.trim()
                                                            || !requested_amount.trim()
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

const GET_BP_BUDGET_FINANCE = gql`
query{
  userBpBudgetFinance{
    id
    projectTitle
    projectBudget
    requestedAmount
    applicantsContribution
    cashInkindContribution
    requestedAmountPercents
    applicantsContributionPercents
    cashInkindContributionPercents
    cashInkindContributionCash
    cashInkindContributionCashPercents
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
}
`

const ADD_BP_BUDGET_FINANCE = gql`
mutation CreateBPBudgetFinance($projectTitle:String!, $projectBudget:String!,$requestedAmount:String!,$applicantsContribution:String!,$cashInkindContribution:String!, $requestedAmountPercents:String!, $applicantsContributionPercents:String!,$cashInkindContributionPercents:String!, $cashInkindContributionCash:String!, $cashInkindContributionCashPercents:String!){
  createBpbudgetfinance(projectTitle:$projectTitle,projectBudget:$projectBudget, requestedAmount:$requestedAmount, applicantsContribution:$applicantsContribution, cashInkindContribution:$cashInkindContribution, requestedAmountPercents:$requestedAmountPercents, applicantsContributionPercents: $applicantsContributionPercents, cashInkindContributionPercents: $cashInkindContributionPercents, cashInkindContributionCash: $cashInkindContributionCash, cashInkindContributionCashPercents:$cashInkindContributionCashPercents ){
      bpBudgetFinance{
        id
        projectTitle
        projectBudget
        requestedAmount
        applicantsContribution
        cashInkindContribution
        requestedAmountPercents
        applicantsContributionPercents
        cashInkindContributionPercents
        cashInkindContributionCash
        cashInkindContributionCashPercents
        submittedApplication
        completedApplication
        lastUpdated
        created
      }
  }
}
`

const UPDATE_BP_BUDGET_FINANCE = gql`
mutation UpdateBPBudgetFinance($bpBudgetFinanceId:Int!,$projectTitle:String!, $projectBudget:String!,$requestedAmount:String!,$applicantsContribution:String!,$cashInkindContribution:String!,$requestedAmountPercents:String!, $applicantsContributionPercents:String!,$cashInkindContributionPercents:String!, $cashInkindContributionCash:String!, $cashInkindContributionCashPercents:String!){
  updateBpbudgetfinance(bpBudgetFinanceId:$bpBudgetFinanceId,projectTitle:$projectTitle,projectBudget:$projectBudget, requestedAmount:$requestedAmount, applicantsContribution:$applicantsContribution, cashInkindContribution:$cashInkindContribution, requestedAmountPercents:$requestedAmountPercents, applicantsContributionPercents: $applicantsContributionPercents, cashInkindContributionPercents: $cashInkindContributionPercents, cashInkindContributionCash: $cashInkindContributionCash, cashInkindContributionCashPercents:$cashInkindContributionCashPercents){
      bpBudgetFinance{
        id
        projectTitle
        projectBudget
        requestedAmount
        applicantsContribution
        cashInkindContribution
        requestedAmountPercents
        applicantsContributionPercents
        cashInkindContributionPercents
        cashInkindContributionCash
        cashInkindContributionCashPercents
        submittedApplication
        completedApplication
        lastUpdated
        created
      }
  }
}
`

export default SectionSeven;