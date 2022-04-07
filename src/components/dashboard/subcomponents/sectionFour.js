import React from 'react';
import SectionFourOne from "./subSections/sectionFourOne";
import SectionFourTwo from "./subSections/sectionFourTwo";

const SectionFour = () => {

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <SectionFourOne/>
            <br/>
            <br/>
            <SectionFourTwo/>
            <hr/>
        </main>
    );
};


export default SectionFour;