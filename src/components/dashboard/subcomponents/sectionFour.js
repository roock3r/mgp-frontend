import React from 'react';
import SectionFourOne from "./subSections/sectionFourOne";
import SectionFourTwo from "./subSections/sectionFourTwo";
import {Card} from "react-bootstrap";

const SectionFour = () => {

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <br/>
            <Card >
                <Card.Body>
                    <Card.Title>Capacity of the applicant (25% of total score)</Card.Title>
                    <Card.Text>
                        In this section, please briefly describe the relevant experience on implementation of project (s) similar in type of activities/scope and scale that your SME brings in relation to the successful implementation of the proposed project.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <SectionFourOne/>
            <br/>
            <br/>
            <SectionFourTwo/>
            <hr/>
        </main>
    );
};


export default SectionFour;