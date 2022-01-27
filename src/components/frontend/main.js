import React from 'react'
import Styles from './styles'
import {Field} from 'react-final-form'
import Wizard from './wizard'
import districtData from '../fixtures/district.json'
import localTypeData from '../fixtures/localtype.json'
import locationData from '../fixtures/location.json'
import FileField from "./common/fileField";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
}

const Error = ({name}) => (
    <Field
        name={name}
        subscribe={{touched: true, error: true}}
        render={({meta: {touched, error}}) =>
            touched && error ? <span>{error}</span> : null
        }
    />
)

const required = value => (value ? undefined : 'Required')


const Main = () => {

    return (<Styles>
        {/*<h1>🏁 React Final Form Example</h1>*/}
        {/*<h2>Wizard Form</h2>*/}
        {/*<a href="https://github.com/erikras/react-final-form#-react-final-form">*/}
        {/*    Read Docs*/}
        {/*</a>*/}
        {/*<p>*/}
        {/*    Notice the mixture of field-level and record-level (or <em>page-level</em>{' '}*/}
        {/*    in this case) validation.*/}
        {/*</p>*/}
        <Wizard
            initialValues={{}}
            onSubmit={onSubmit}
        >
            <Wizard.Page>
                <div className="row">
                    <div className="col-12">
                        <h1>Expression of Interest Application Letter</h1>
                        <div className="row">
                            <div className="col-8 col-sm-6">
                                To: <b>Project Coordination Unit-</b>
                            </div>
                            <div className="col-4 col-sm-6">
                                <label>Current date :</label>
                                <Field
                                    name="currentDate"
                                    component="input"
                                    type="date"
                                    placeholder="Project Title"
                                    validate={required}
                                />
                                <Error name="currentDate"/>
                            </div>
                        </div>
                        <p>
                            Having examined the Instructions of the Matching Grants Program, we would like to submit
                            with this letter our Expression of Interest:
                        </p>
                    </div>
                </div>
                <div>
                    <label>Proposal title</label>
                    <Field
                        name="proposedTitle"
                        component="input"
                        type="text"
                        placeholder="Project Title"
                        validate={required}
                    />
                    <Error name="proposedTitle"/>
                </div>
                <div>
                    <label>Requested grant amount by STP II:</label>
                    <Field
                        name="grantAmount"
                        component="input"
                        type="number"
                        placeholder="Grant Amount"
                        validate={required}
                    />
                    <Error name="grantAmount"/>
                </div>
                <div>
                    <label>Co-financing amount by the applicant:</label>
                    <Field
                        name="cofinancedAmount"
                        component="input"
                        type="number"
                        placeholder="Co-financing amount "
                        validate={required}
                    />
                    <Error name="cofinancedAmount"/>
                </div>
                <div>
                    <label>Total project amount:</label>
                    <Field
                        name="projectTotal"
                        component="input"
                        type="number"
                        placeholder="Project total"
                        validate={required}
                    />
                    <Error name="projectTotal"/>
                </div>
                <div>
                    <div className="row">
                        <div className="col-12">
                            <p>
                                Should our proposal be selected, we are committed to develop the full project proposal
                                in adherence to the proposed contents set forth in this call for expression of interest
                                and in accordance with the content of the Operations Manual. We agree to submit all
                                needed documentation as required for submitting the full project proposal.
                                I / We, the undersigned, certify that to the best of my/our knowledge and belief, all
                                information and documentation contained in this expression of interest is true and
                                correct. I / We also certify that the proposed project is not receiving funding from
                                other sources for the same activities proposed in this Expression of Interest.
                            </p>
                            <div className="row">
                                <div className="col-8 col-sm-6">
                                    <Field
                                        name="signature"
                                        component="input"
                                        type="text"
                                        placeholder="Sign here"
                                        validate={required}
                                    />
                                    <Error name="signature"/>
                                </div>
                                <div className="col-4 col-sm-6">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wizard.Page>
            <Wizard.Page validate={values => {
                const errors = {}
                if (!values.primarySectors) {
                    errors.primarySectors = 'Required'
                } else if (values.primarySectors.primarySectors > 1) {
                    errors.primarySectors = 'One more'
                }
                if (!values.email) {
                    errors.email = 'Required'
                }
                if (!values.applicantemail) {
                    errors.applicantemail = 'Required'
                }
                if (!values.district) {
                    errors.district = 'Required'
                }
                if (!values.local) {
                    errors.local = 'Required'
                }
                if (!values.location) {
                    errors.location = 'Required'
                }
                return errors
            }}>
                <h3>
                    Basic Information:
                </h3>
                <div>
                    <label>Full legal name of applicant: </label>
                    <Field
                        name="fulllegalname"
                        component="input"
                        type="text"
                        placeholder="Full legal name of applicant"
                        validate={required}
                    />
                    <Error name="fulllegalname"/>
                </div>
                <div>
                    <label>Full name of applicant (the SME): </label>
                    <Field
                        name="nameofapplicant"
                        component="input"
                        type="text"
                        placeholder="Full name of applicant (the SME):"
                        validate={required}
                    />
                    <Error name="nameofapplicant"/>
                </div>
                <div>
                    <label>Name of legal representative: </label>
                    <Field
                        name="nameoflegalrep"
                        component="input"
                        type="text"
                        placeholder="Name of legal representative:"
                        validate={required}
                    />
                    <Error name="nameoflegalrep"/>
                </div>
                <hr/>
                <h3>Address</h3>
                <div>
                    <label>Street: </label>
                    <Field
                        name="street"
                        component="input"
                        type="text"
                        placeholder="Enter your address"
                        validate={required}
                    />
                    <Error name="street"/>
                </div>
                <div>
                    <label>District: </label>
                    <Field name="district" component="select">
                        <option/>
                        {districtData.map((d) => {
                            return (<option value={d.pk}>{d.fields.district_name}</option>);
                        })}
                    </Field>
                    <Error name="district"/>
                </div>
                <div>
                    <label>Local: </label>
                    <Field name="local" component="select">
                        <option/>
                        {localTypeData.map((d) => {
                            return (<option value={d.pk}>{d.fields.local_type_name}</option>);
                        })}
                    </Field>
                    <Error name="local"/>
                </div>
                <div>
                    <label>Location: </label>
                    <Field name="location" component="select">
                        <option/>
                        {locationData.map((d) => {
                            return (<option value={d.pk}>{d.fields.location_description}</option>);
                        })}
                    </Field>
                    <Error name="location"/>
                </div>
                <hr/>
                <h3> Contact Details</h3>
                <div>
                    <label>Telephone:</label>
                    <Field
                        name="telephone"
                        component="input"
                        type="phone"
                        placeholder="Phone Number"
                        validate={required}
                    />
                    <Error name="telephone"/>
                </div>
                <div>
                    <label>Cellphone:</label>
                    <Field
                        name="cellphone"
                        component="input"
                        type="phone"
                        placeholder="Phone Number"
                        validate={required}
                    />
                    <Error name="cellphone"/>
                </div>
                <div>
                    <label>Email</label>
                    <Field
                        name="email"
                        component="input"
                        type="email"
                        placeholder="Email"
                    />
                    <Error name="email"/>
                </div>
                <hr/>
                <h3>
                    Business Information:
                </h3>
                <div>
                    <label>Date of issuance of Business Registration: </label>
                    <Field
                        name="dateOfIssuance"
                        component="input"
                        type="date"
                        placeholder="Business Registration Date"
                        validate={required}
                    />
                    <Error name="dateOfIssuance"/>
                </div>
                <div>
                    <label>Tax Identification Number: </label>
                    <Field
                        name="tiN"
                        component="input"
                        type="text"
                        placeholder="Tax ID"
                        validate={required}
                    />
                    <Error name="tiN"/>
                </div>

                <div>
                    <label>Social Security Number:</label>
                    <Field
                        name="ssn"
                        component="input"
                        type="text"
                        placeholder="Social Security Number"
                        validate={required}
                    />
                    <Error name="ssn"/>
                </div>
                <div>
                    <label>Primary sectors of the SME’s operation: </label>
                    <Field name="primarySectors" component="select" multiple>
                        <option value="1">Accommodation</option>
                        <option value="2">Food & Beverage</option>
                        <option value="3">Adventure Tourism</option>
                        <option value="4">Transportation</option>
                        <option value="5">Travel Trade</option>
                        <option value="6">Events & Conferences</option>
                        <option value="7">Attractions</option>
                        <option value="8">Tourism Services</option>
                        <option value="9">Tourism Education and Training</option>
                    </Field>
                    <Error name="primarySectors"/>
                </div>
                <div>
                    <label>Date that business last operated: </label>
                    <Field
                        name="dateOfLastOperation"
                        component="input"
                        type="date"
                        placeholder="Last Business Operated Date"
                        validate={required}
                    />
                    <Error name="dateOfLastOperation"/>
                </div>
                <div>
                    <label>Number of Employees: </label>
                    <Field
                        name="numberOfEmployees"
                        component="input"
                        type="number"
                        placeholder="Number of Employees"
                        validate={required}
                    />
                    <Error name="numberOfEmployees"/>
                </div>
                <hr/>
                <h3>
                    Annual (Sales) Turnover for 2018, 2019, 2020:
                </h3>
                <div>
                    <label>File upload: </label>
                    <FileField name="annualSalesTurnOver"/>
                </div>
                <hr/>
                <h3>
                    Applicant Contact details:
                </h3>
                <div>
                    <label>Name</label>
                    <Field
                        name="name"
                        component="input"
                        type="text"
                        placeholder="Name"
                        validate={required}
                    />
                    <Error name="name"/>
                </div>
                <div>
                    <label>Position</label>
                    <Field
                        name="position"
                        component="input"
                        type="text"
                        placeholder="Position"
                        validate={required}
                    />
                    <Error name="position"/>
                </div>
                <div>
                    <label>Cellphone:</label>
                    <Field
                        name="applicantcellphone"
                        component="input"
                        type="phone"
                        placeholder="Phone Number"
                        validate={required}
                    />
                    <Error name="applicantcellphone"/>
                </div>
                <div>
                    <label>Email</label>
                    <Field
                        name="applicantemail"
                        component="input"
                        type="email"
                        placeholder="Email"
                    />
                    <Error name="applicantemail"/>
                </div>
            </Wizard.Page>
            <Wizard.Page>
                <h3>
                    Market failure
                </h3>
                <h5>
                    Please identify the type(s) of market failure(s) the proposed project is addressing:
                </h5>
                <ul className="list-group">
                    <li className="list-group-item ">Bio-protocol implementation positive and negative externalities.
                    </li>
                    <li className="list-group-item">Environmental positive and negative externalities.</li>
                    <li className="list-group-item">Skills development externalities and imperfect information.</li>
                    <li className="list-group-item">Technology investment and adoption externalities and imperfect
                        information.
                    </li>
                    <li className="list-group-item">Market intelligence and promotion strategies externalities.</li>
                    <li className="list-group-item">Potential external economies of scale or scope externalities.</li>
                </ul>
                <hr/>
                <h3>
                    Project Brief Description
                </h3>
                <h5>
                    The EOI should clearly and concisely explain proposed grant objective, activities to be co-financed
                    to contribute to solve one or more of the pre-identified market failures of Section 3.
                </h5>
                <h6>Problem, objective, expected results (max. 200 words for each section)</h6>
                <div>
                    <label>Project Objectives: </label>
                    <Field
                        name="projectObjectives"
                        component="textarea"
                        placeholder="Describe Project Objectives"
                        validate={required}
                    />
                    <Error name="projectObjectives"/>
                </div>
                <div>
                    <label> Activities to be co-financed: </label>
                    <Field
                        name="activitiesCoFinanced"
                        component="textarea"
                        placeholder="Describe Activities"
                        validate={required}
                    />
                    <Error name="activitiesCoFinanced"/>
                </div>
                <div>
                    <label> Expected results:</label>
                    <Field
                        name="expectedResults"
                        component="textarea"
                        placeholder="Describe Results"
                        validate={required}
                    />
                    <Error name="expectedResults"/>
                </div>
                <div>
                    <label> Describe relationship of the results to the selected market failure: </label>
                    <Field
                        name="describeRelationship"
                        component="textarea"
                        placeholder="Describe Relationship"
                        validate={required}
                    />
                    <Error name="describeRelationship"/>
                </div>

            </Wizard.Page>
            <Wizard.Page>
                <h3>Proposed grant budget details: </h3>
                <div>
                    <label>Project Title</label>
                    <Field
                        name="projectTitle"
                        component="input"
                        type="text"
                        placeholder="Project Title"
                        validate={required}
                    />
                    <Error name="projectTitle"/>
                </div>
                <div>
                    <label>Total Budget for the Project: </label>
                    <Field
                        name="totalBudget"
                        component="input"
                        type="number"
                        placeholder="Total Budget"
                        validate={required}
                    />
                    <Error name="totalBudget"/>
                </div>
                <div>
                    <label>Requested amount from the MGP: </label>
                    <Field
                        name="requestedAmount"
                        component="input"
                        type="number"
                        placeholder="Requested Amount"
                        validate={required}
                    />
                    <Error name="requestedAmount"/>
                </div>
                <hr/>
                <div>
                    <label>Total Contribution by the applicant: </label>
                    <Field
                        name="totalContribution"
                        component="input"
                        type="number"
                        placeholder="Total Contribution"
                        validate={required}
                    />
                    <Error name="totalContribution"/>
                </div>
                <div>
                    <label>Cash Contribution: </label>
                    <Field
                        name="cashContribution"
                        component="input"
                        type="number"
                        placeholder="Cash contribution"
                        validate={required}
                    />
                    <Error name="cashContribution"/>
                    <label>In Kind Contribution: </label>
                    <Field
                        name="inKindContribution"
                        component="input"
                        type="number"
                        placeholder="In kind contribution"
                        validate={required}
                    />
                    <Error name="inKindContribution"/>
                </div>
                <hr/>
                <h4>Total duration of the proposed project and end date: </h4>
                <div>
                    <Field
                        name="durationMonths"
                        component="input"
                        type="number"
                        placeholder="Enter number of months"
                        validate={required}
                    />
                    <Error name="durationMonths"/>
                </div>
                <div>
                    <Field
                        name="endDate"
                        component="input"
                        type="date"
                        placeholder="Select date"
                        validate={required}
                    />
                    <Error name="endDate"/>
                </div>

            </Wizard.Page>
            <Wizard.Page validate={values => {
                const errors = {}
                if (!values.completed) {
                    errors.completed = 'Required'
                }
                return errors
            }}>
                <h3>
                    Expression of Interest eligibility criteria
                </h3>
                <h6>
                    Submitting an Expression of Interest (EOI) is the first phase in the Grant selection process. After
                    evaluating EOIs, the PCU will invite eligible applicants to enter into a second phase of the
                    competition by submitting a full project application based on the concepts and technical approaches
                    proposed in the EOI. As long as the general objective of the project remains the same, at the Full
                    Proposal stage applicants are allowed to adjust the proposed budget in the Expression of Interest
                    stage within maximum 20% latitude, but without surpassing the overall Grant available limits. They
                    may also make reallocations between budget lines within a 50% limit.
                </h6>
                <hr/>
                <h3>Eligibility criteria checklist to verify the compliance with the basic eligibility criteria:</h3>

                <div>
                    <div>
                        <p className="mb-1 float-start">Applicants are classified as small or medium </p>
                        <label>
                            <Field
                                name="ec1"
                                component="input"
                                type="radio"
                                value="yes"
                            />{' '}
                            Yes
                        </label>
                        <label>
                            <Field name="ec1" component="input" type="radio" value="no"/>{' '}
                            No
                        </label>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Minimum age of SMEs is one year in business pre-COVID-19 (considering COVID-19 started in
                            April 2020)</p>
                        <label>
                            <Field
                                name="ec2"
                                component="input"
                                type="radio"
                                value="yes"
                            />{' '}
                            Yes
                        </label>
                        <label>
                            <Field name="ec2" component="input" type="radio" value="no"/>{' '}
                            No
                        </label>
                    </div>
                </div>
                <div>
                    <div>
                        <p>SMEs legally incorporated and registered </p>
                        <label>
                            <Field
                                name="ec3"
                                component="input"
                                type="radio"
                                value="yes"
                            />{' '}
                            Yes
                        </label>
                        <label>
                            <Field name="ec3" component="input" type="radio" value="no"/>{' '}
                            No
                        </label>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Applicants’ proposals apply to grants within allowed limits (US$9,000 to US$30,000)</p>
                        <label>
                            <Field
                                name="ec4"
                                component="input"
                                type="radio"
                                value="yes"
                            />{' '}
                            Yes
                        </label>
                        <label>
                            <Field name="ec4" component="input" type="radio" value="no"/>{' '}
                            No
                        </label>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Companies applying jointly (more than 4 SMEs) apply to grants within allowed limits (US$9,000
                            to US$50,000)</p>
                        <label>
                            <Field
                                name="ec5"
                                component="input"
                                type="radio"
                                value="yes"
                            />{' '}
                            Yes
                        </label>
                        <label>
                            <Field name="ec5" component="input" type="radio" value="no"/>{' '}
                            No
                        </label>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Applicants do not include in their proposals items listed in this OM as non-eligible list of
                            expenses</p>
                        <label>
                            <Field
                                name="ec6"
                                component="input"
                                type="radio"
                                value="ec6"
                            />{' '}
                            Yes
                        </label>
                        <label>
                            <Field name="ec6" component="input" type="radio" value="no"/>{' '}
                            No
                        </label>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Applicants do not submit proposals that are included in the list of non-eligible projects</p>
                        <label>
                            <Field
                                name="ec7"
                                component="input"
                                type="radio"
                                value="yes"
                            />{' '}
                            Yes
                        </label>
                        <label>
                            <Field name="ec7" component="input" type="radio" value="no"/>{' '}
                            No
                        </label>
                    </div>
                </div>
                <div>
                    <div>
                        <p>The applicant's proposal targets at least one of the 6 market failures</p>
                        <label>
                            <Field
                                name="ec8"
                                component="input"
                                type="radio"
                                value="yes"
                            />{' '}
                            Yes
                        </label>
                        <label>
                            <Field name="ec8" component="input" type="radio" value="no"/>{' '}
                            No
                        </label>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Applicant has not received funding for the same project activities proposed in the
                            project-proposal from other sources</p>
                        <label>
                            <Field
                                name="ec9"
                                component="input"
                                type="radio"
                                value="yes"
                            />{' '}
                            Yes
                        </label>
                        <label>
                            <Field name="ec9" component="input" type="radio" value="no"/>{' '}
                            No
                        </label>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Firms must have 51% and above Belizean/CARICOM simple majority ownership. In the case of the
                            accommodation sector only, a minimum of 25% or more local equity is required, provided that
                            51% and above of staff are local/Caricom nationals. In the case of tour operators, as
                            determined by law, ownership should be 51% and above Belizean/CARICOM </p>
                        <label>
                            <Field
                                name="ec10"
                                component="input"
                                type="radio"
                                value="yes"
                            />{' '}
                            Yes
                        </label>
                        <label>
                            <Field name="ec10" component="input" type="radio" value="no"/>{' '}
                            No
                        </label>
                    </div>
                </div>
                <div>
                    <div>
                        <p>At least 40% matching grant counterpart contribution</p>
                        <label>
                            <Field
                                name="ec11"
                                component="input"
                                type="radio"
                                value="yes"
                            />{' '}
                            Yes
                        </label>
                        <label>
                            <Field name="ec11" component="input" type="radio" value="no"/>{' '}
                            No
                        </label>
                    </div>
                </div>
                <div>
                    <div>
                        <p>In-kind counterpart contributed by the SMEs is equal or less than 60% of the applicant’s
                            contribution</p>
                        <label>
                            <Field
                                name="ec12"
                                component="input"
                                type="radio"
                                value="yes"
                            />{' '}
                            Yes
                        </label>
                        <label>
                            <Field name="ec12" component="input" type="radio" value="no"/>{' '}
                            No
                        </label>
                    </div>
                </div>

                <hr/>
                <h6>
                    Please attach a copy of your Registration certificate from the Central Registry of Belize not older
                    than 6 months showing the legal character/registration of the SME.
                </h6>
                <div>
                    <label>File upload: </label>
                    <FileField name="registrationCert"/>
                </div>
                <hr/>
                <h6>
                    Sworn statement that the firm does not have any negative social and environmental impacts.
                </h6>
                <div>
                    <label>File upload: </label>
                    <FileField name="swornStatement"/>
                </div>
                <hr/>
                <div>
                    <label>Completed Application form?</label>
                    <Field name="completed" component="input" type="checkbox"/>
                </div>
            </Wizard.Page>
            {/*<Wizard.Page>*/}
            {/*    <div>*/}
            {/*        <label>First Name</label>*/}
            {/*        <Field*/}
            {/*            name="firstName"*/}
            {/*            component="input"*/}
            {/*            type="text"*/}
            {/*            placeholder="First Name"*/}
            {/*            validate={required}*/}
            {/*        />*/}
            {/*        <Error name="firstName" />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label>Last Name</label>*/}
            {/*        <Field*/}
            {/*            name="lastName"*/}
            {/*            component="input"*/}
            {/*            type="text"*/}
            {/*            placeholder="Last Name"*/}
            {/*            validate={required}*/}
            {/*        />*/}
            {/*        <Error name="lastName" />*/}
            {/*    </div>*/}
            {/*</Wizard.Page>*/}
            {/*<Wizard.Page*/}
            {/*    validate={values => {*/}
            {/*        const errors = {}*/}
            {/*        if (!values.email) {*/}
            {/*            errors.email = 'Required'*/}
            {/*        }*/}
            {/*        if (!values.favoriteColor) {*/}
            {/*            errors.favoriteColor = 'Required'*/}
            {/*        }*/}
            {/*        return errors*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <div>*/}
            {/*        <label>Email</label>*/}
            {/*        <Field*/}
            {/*            name="email"*/}
            {/*            component="input"*/}
            {/*            type="email"*/}
            {/*            placeholder="Email"*/}
            {/*        />*/}
            {/*        <Error name="email" />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label>Favorite Color</label>*/}
            {/*        <Field name="favoriteColor" component="select">*/}
            {/*            <option />*/}
            {/*            <option value="#ff0000">❤️ Red</option>*/}
            {/*            <option value="#00ff00">💚 Green</option>*/}
            {/*            <option value="#0000ff">💙 Blue</option>*/}
            {/*        </Field>*/}
            {/*        <Error name="favoriteColor" />*/}
            {/*    </div>*/}
            {/*</Wizard.Page>*/}
            {/*<Wizard.Page*/}
            {/*    validate={values => {*/}
            {/*        const errors = {}*/}
            {/*        if (!values.toppings) {*/}
            {/*            errors.toppings = 'Required'*/}
            {/*        } else if (values.toppings.length < 2) {*/}
            {/*            errors.toppings = 'Choose more'*/}
            {/*        }*/}
            {/*        return errors*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <div>*/}
            {/*        <label>Employed?</label>*/}
            {/*        <Field name="employed" component="input" type="checkbox" />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label>Toppings</label>*/}
            {/*        <Field name="toppings" component="select" multiple>*/}
            {/*            <option value="ham">🐷 Ham</option>*/}
            {/*            <option value="mushrooms">🍄 Mushrooms</option>*/}
            {/*            <option value="cheese">🧀 Cheese</option>*/}
            {/*            <option value="chicken">🐓 Chicken</option>*/}
            {/*            <option value="pineapple">🍍 Pinapple</option>*/}
            {/*        </Field>*/}
            {/*        <Error name="toppings" />*/}
            {/*    </div>*/}
            {/*</Wizard.Page>*/}
            {/*<Wizard.Page*/}
            {/*    validate={values => {*/}
            {/*        const errors = {}*/}
            {/*        if (!values.notes) {*/}
            {/*            errors.notes = 'Required'*/}
            {/*        }*/}
            {/*        return errors*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <div>*/}
            {/*        <label>Best Stooge?</label>*/}
            {/*        <div>*/}
            {/*            <label>*/}
            {/*                <Field*/}
            {/*                    name="stooge"*/}
            {/*                    component="input"*/}
            {/*                    type="radio"*/}
            {/*                    value="larry"*/}
            {/*                />{' '}*/}
            {/*                Larry*/}
            {/*            </label>*/}
            {/*            <label>*/}
            {/*                <Field name="stooge" component="input" type="radio" value="moe" />{' '}*/}
            {/*                Moe*/}
            {/*            </label>*/}
            {/*            <label>*/}
            {/*                <Field*/}
            {/*                    name="stooge"*/}
            {/*                    component="input"*/}
            {/*                    type="radio"*/}
            {/*                    value="curly"*/}
            {/*                />{' '}*/}
            {/*                Curly*/}
            {/*            </label>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label>Notes</label>*/}
            {/*        <Field name="notes" component="textarea" placeholder="Notes" />*/}
            {/*        <Error name="notes" />*/}
            {/*    </div>*/}
            {/*</Wizard.Page>*/}
        </Wizard>
    </Styles>);
};

export default Main;
