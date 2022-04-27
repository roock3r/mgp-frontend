import React, {useEffect, useState} from 'react';
import { Stepper } from 'react-form-stepper';
import {Button, Col, Row} from "react-bootstrap";
import UploadOne from "./subcomponents/uploads/uploadOne";
import UploadTwo from "./subcomponents/uploads/uploadTwo";
import UploadThree from "./subcomponents/uploads/uploadThree";
import UploadFour from "./subcomponents/uploads/uploadFour";
import {gql} from "apollo-boost";
import {useQuery, Mutation} from "react-apollo";
import UploadFive from "./subcomponents/uploads/uploadFive";


const Dashboard = () => {

    const [businessPlan, setBusinessPlan] = useState({})
    const [activeStep, setActiveStep] = useState(0)
    const [notFinalSubmit, setNotFinalSubmit] = useState(true)
    const [submitComplete, setSubmitComplete] = useState(false)
    const [submitting, setSubmitting] = useState(false);

    const {loading, error, data} = useQuery(query, {pollInterval: 10000});

    useEffect(() =>{
        if(!loading && data.userBusinessPlan) {
            setBusinessPlan(data.userBusinessPlan)
            if(data.userBppLetter){
                setActiveStep(1)
            }
            if(data.userBppProjectProfile){
                setActiveStep(2)
            }
            if(data.userBpDescription){
                setActiveStep(3)
            }
            if(data.userBpCapacity && data.userBpCoordinatorCapacity){
                setActiveStep(4)
            }
            if(data.userBpProposalImplementationPlan){
                setActiveStep(5)
            }
            if(data.userBpProjectExpectedImpact){
                setActiveStep(6)
            }
            if(data.userBpBudgetFinance){
                setActiveStep(7)
            }
            if(data.userBpDoubleCofinancing){
                setActiveStep(8)
            }
            if(data.userBpInKindContribution){
                setActiveStep(9)
            }
            if(data.userBpSustainability){
                setActiveStep(10)
            }
            if(data.userBpSustainability
                && data.userBpInKindContribution
                && data.userBpDoubleCofinancing
                && data.userBpBudgetFinance
                && data.userBpProjectExpectedImpact
                && data.userBpProposalImplementationPlan
                && data.userBpCapacity
                && data.userBpCoordinatorCapacity
                && data.userBpDescription
                && data.userBppProjectProfile
                && data.userBppLetter
                && data.a[0]
                && data.b[0]
                && data.c[0]
                && data.d[0]
                && data.e[0]
            ){
                setNotFinalSubmit(false)
            }
            if(data.userBusinessPlan.completedApplication){
                setSubmitComplete(true)
            }
        }
    }, [loading, data])

    if (loading) return null;
    if (error) return `Error! ${error}`;

    const handleSubmit = async (event, finalizeBusinessPlan, id) => {
        event.preventDefault()
        setSubmitting(true)
        finalizeBusinessPlan({
            variables: {
                businessPlanId: id,
            }
        })
    }

    if(data){
        console.log(data)
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1>Dashboard</h1>
                <hr/>
                <div className="video-responsive">
                    <iframe width="853" height="480" src="https://www.youtube.com/embed/d2KxNn2siiM"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                </div>
                <hr/>
                <h2>Progress</h2>
                <Stepper
                    steps={
                        [
                            { label: 'Section 1' },
                            { label: 'Section 2' },
                            { label: 'Section 3' },
                            { label: 'Section 4' },
                            { label: 'Section 5' },
                            { label: 'Section 6' },
                            { label: 'Section 7' },
                            { label: 'Section 8' },
                            { label: 'Section 9' },
                            { label: 'Section 10' },
                        ]}
                    activeStep={activeStep}
                />
                <hr/>
                <h2>Uploads</h2>
                <p>All Documentation should be signed and stamped photocopies, not older than six months. </p>
                <Row>
                    <Col sm><UploadOne businessPlanId={data.userBusinessPlan.id} submissionType='FinancialStatement' final={submitComplete} /></Col>
                    <Col sm><UploadTwo businessPlanId={data.userBusinessPlan.id} submissionType='CV' final={submitComplete} /></Col>
                </Row>
                <br/>
                <Row>
                    <Col sm><UploadThree businessPlanId={data.userBusinessPlan.id} submissionType='SwornStatement' final={submitComplete} /></Col>
                    <Col sm><UploadFour businessPlanId={data.userBusinessPlan.id} submissionType='TIN' final={submitComplete} /></Col>
                    <Col sm><UploadFive businessPlanId={data.userBusinessPlan.id} submissionType='PartnershipAgreement' final={submitComplete} /></Col>
                </Row>
                <br/>
                <div className="d-grid gap-2">
                {
                    submitComplete ?
                        <Button variant="secondary" size="lg" disabled={true}>
                            Application Already Submitted
                        </Button> :
                        <Mutation
                            mutation={bpMutation}
                            onCompleted={data => {
                                console.log('Complete')
                                setSubmitting(false)
                                setSubmitComplete(true)
                            }
                            }
                            refetchQueries={
                                () => [
                                    {query: query}
                                ]
                            }
                        >
                            {(finalizeBusinessPlan, {loading, error}) => {
                                if (error) return `Error! ${error}`;
                                return (
                                    <Button variant="primary"
                                            onClick={event => handleSubmit(event, finalizeBusinessPlan, data.userBusinessPlan.id)}
                                            size="lg" disabled={notFinalSubmit}>
                                        Submit application
                                    </Button>
                                )
                            }}

                        </Mutation>
                }
                </div>
                <br/>
            </main>

        );
    }


};

const query = gql`
query{
  userBusinessPlan{
    id
    eoi{
      id
    }
    completedApplication
    submittedApplication
    created
    lastUpdated
  }
  userBpSustainability{
    id
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
  userBpInKindContribution{
    id
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
  userBpDoubleCofinancing{
    id
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
  userBpBudgetFinance{
    id
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
  userBpProjectExpectedImpact{
    id
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
  userBpProposalImplementationPlan{
    id
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
  userBpCapacity{
    id
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
  userBpCoordinatorCapacity{
    id
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
  userBpDescription{
    id
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
  userBppProjectProfile{
    id
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
  userBppLetter{
    id
    submittedApplication
    completedApplication
    created
    lastUpdated
  }
  a:userBpUpload(search: "FinancialStatement"){
    id
    file
    submissionType
    uploadedAt
  }
  b:userBpUpload(search: "CV"){
    id
    file
    submissionType
    uploadedAt
  }
  c:userBpUpload(search: "SwornStatement"){
    id
    file
    submissionType
    uploadedAt
  }
  d:userBpUpload(search: "TIN"){
    id
    file
    submissionType
    uploadedAt
  }
  e:userBpUpload(search: "PartnershipAgreement"){
    id
    file
    submissionType
    uploadedAt
  }
}`

const bpMutation = gql`
mutation FinalizeBusinessPlan($businessPlanId:Int!){
  finalizeBusinessPlan(businessPlanId:$businessPlanId){
    businessPlan{
      id
    eoi{
      id
    }
    completedApplication
    submittedApplication
    created
    lastUpdated
      
    }
  }
}`

export default Dashboard;