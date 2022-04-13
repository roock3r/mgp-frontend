import React, {useEffect, useState} from 'react';
import { Stepper } from 'react-form-stepper';
import {Col, Row} from "react-bootstrap";
import UploadOne from "./subcomponents/uploads/uploadOne";
import UploadTwo from "./subcomponents/uploads/uploadTwo";
import UploadThree from "./subcomponents/uploads/uploadThree";
import UploadFour from "./subcomponents/uploads/uploadFour";
import {gql} from "apollo-boost";
import {useQuery} from "react-apollo";
import UploadFive from "./subcomponents/uploads/uploadFive";


const Dashboard = () => {

    const [businessPlan, setBusinessPlan] = useState({})
    const [activeStep, setActiveStep] = useState(0)

    const {loading, error, data} = useQuery(query);

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
        }
    }, [loading, data])

    if (loading) return null;
    if (error) return `Error! ${error}`;

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
                    <Col sm><UploadOne businessPlanId={data.userBusinessPlan.id} submissionType='FinancialStatement'/></Col>
                    <Col sm><UploadTwo businessPlanId={data.userBusinessPlan.id} submissionType='CV'/></Col>
                </Row>
                <br/>
                <Row>
                    <Col sm><UploadThree businessPlanId={data.userBusinessPlan.id} submissionType='SwornStatement'/></Col>
                    <Col sm><UploadFour businessPlanId={data.userBusinessPlan.id} submissionType='TIN'/></Col>
                    <Col sm><UploadFive businessPlanId={data.userBusinessPlan.id} submissionType='PartnershipAgreement'/></Col>
                </Row>
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
}`

export default Dashboard;