import React, {useState} from 'react';
import { Stepper } from 'react-form-stepper';


const Dashboard = () => {


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

            </main>

    );
};

export default Dashboard;