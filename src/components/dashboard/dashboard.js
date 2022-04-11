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

    const {loading, error, data} = useQuery(query);

    useEffect(() =>{
        if(!loading && data.userBusinessPlan) {
            setBusinessPlan(data.userBusinessPlan)
        }
    }, [loading, data])

    if (loading) return null;
    if (error) return `Error! ${error}`;

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
                    activeStep={2}
                />
                <hr/>
                <h2>Uploads</h2>
                <p>All Documentation should be signed and stamped photocopies, not older than six months. </p>
                <Row>
                    <Col sm><UploadOne businessPlanid={data.userBusinessPlan.id} submissionType='FinancialStatement'/></Col>
                    <Col sm><UploadTwo businessPlanid={data.userBusinessPlan.id} submissionType='CV'/></Col>
                </Row>
                <br/>
                <Row>
                    <Col sm><UploadThree businessPlanid={data.userBusinessPlan.id} submissionType='SwornStatement'/></Col>
                    <Col sm><UploadFour businessPlanid={data.userBusinessPlan.id} submissionType='TIN'/></Col>
                    <Col sm><UploadFive businessPlanid={data.userBusinessPlan.id} submissionType='PartnershipAgreement'/></Col>
                </Row>
            </main>

    );
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
}`

export default Dashboard;