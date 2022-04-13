import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {gql} from "apollo-boost";
import {useQuery, Mutation} from "react-apollo";
import districtData from '../../fixtures/district.json'
import locationData from '../../fixtures/location.json'
import localData from '../../fixtures/local.json'
import {useNavigate} from "react-router-dom";

const SectionTwo = () => {
    const [edit, setEdit] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    let navigate = useNavigate();

    const [projectTitle, setProjectTitle] = useState('')
    const [applicant, setApplicant] = useState('')
    const [project_start_date, setProjectStartDate] = useState('')
    const [project_end_date, setProjectEndDate] = useState('')
    const [project_address, setProjectAddress] = useState('')
    const [project_location, setProjectLocation] = useState('')
    const [project_district, setProjectDistrict] = useState('')
    const [project_is_multi_sme, setProjectMultiSme] = useState(false)
    const [projectObjectives, setProjectObjectives] = useState('')
    const [projectDuration, setProjectDuration] = useState('')

    const {loading, error, data} = useQuery(GET_PROJECT_PROFILE);

    useEffect(() =>{
        if(!loading && data.userBppProjectProfile) {
            setProjectTitle(data.userBppProjectProfile.projectTitle)
            setApplicant(data.userBppProjectProfile.applicant)
            setProjectStartDate(data.userBppProjectProfile.projectStartDate)
            setProjectEndDate(data.userBppProjectProfile.projectEndDate)
            setProjectLocation(data.userBppProjectProfile.projectLocation.id)
            setProjectDistrict(data.userBppProjectProfile.projectDistrict.id)
            setProjectMultiSme(data.userBppProjectProfile.projectIsMultiSme)
            setProjectObjectives(data.userBppProjectProfile.projectObjectives)
            setProjectObjectives(data.userBppProjectProfile.projectDuration)
        }
    }, [loading, data])

    if (loading) return null;
    if (error) return `Error! ${error}`;

    const handleSubmit = async (event, createBppprofile) => {
        event.preventDefault()
        setSubmitting(true)
        createBppprofile({
            variables: {
                applicant: applicant,
                projectAddress: project_address,
                projectDistrict: project_district,
                projectEndDate: project_end_date,
                projectIsMultiSme: project_is_multi_sme,
                projectLocation: project_location,
                projectStartDate: project_start_date,
                projectTitle: projectTitle,
                projectObjectives: projectObjectives,
                projectDuration: projectDuration
            }
        })
    }

    const handleEdit = async (event, updateBppprofile, id) => {
        event.preventDefault()
        setSubmitting(true)
        updateBppprofile({
            variables: {
                    bppProjectProfileId: id,
                    applicant: applicant,
                    projectAddress: project_address,
                    projectDistrict: project_district,
                    projectEndDate: project_end_date,
                    projectIsMultiSme: project_is_multi_sme,
                    projectLocation: project_location,
                    projectStartDate: project_start_date,
                    projectTitle: projectTitle,
                    projectObjectives: projectObjectives,
                    projectDuration: projectDuration
            }
        })
    }

    if (data.userBppProjectProfile) {
        console.log(data)
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <br/>
                <Card >
                    <Card.Body>
                        <Card.Title>Project profile</Card.Title>
                    </Card.Body>
                </Card>
                <br/>
                <Card>
                    <Card.Header>Basic information about the project</Card.Header>
                    <Card.Body>
                        <Mutation
                            mutation={UPDATE_PROJECT_PROFILE}
                            onCompleted={data => {
                                console.log('Complete')
                                setSubmitting(false)
                                setEdit(false)
                            }
                            }
                            refetchQueries={
                                () => [
                                    {query: GET_PROJECT_PROFILE}
                                ]
                            }
                        >
                            {(updateBppprofile, {loading, error}) => {
                                if (error) return `Error! ${error}`;
                                return (
                                    <Form>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Project Title</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={event => setProjectTitle(event.target.value)}
                                                    defaultValue={`${data.userBppProjectProfile.projectTitle}`}
                                                    disabled={!edit}
                                                    placeholder="Enter Project Title" required/>
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Applicant</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={event => setApplicant(event.target.value)}
                                                    defaultValue={`${data.userBppProjectProfile.applicant}`}
                                                    disabled={!edit}
                                                    placeholder="Enter Applicant's Name" required/>
                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form className="Label">Duration of the project and end date.</Form>

                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Start Date </Form.Label>
                                                <Form.Control type="date"
                                                              onChange={event => setProjectStartDate(event.target.value)}
                                                              defaultValue={`${data.userBppProjectProfile.projectStartDate}`}
                                                              disabled={!edit}
                                                              required
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>End Date </Form.Label>
                                                <Form.Control type="date"
                                                              onChange={event => setProjectEndDate(event.target.value)}
                                                              defaultValue={`${data.userBppProjectProfile.projectEndDate}`}
                                                              disabled={!edit}
                                                              required

                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Duration</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    disabled={!edit}
                                                    onChange={event => setProjectDuration(event.target.value)}
                                                    defaultValue={`${data.userBppProjectProfile.projectDuration}`}
                                                    placeholder="Enter Duration"/>
                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form className="Label">Location where the project will be
                                                implemented.</Form>
                                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control
                                                    onChange={event => setProjectAddress(event.target.value)}
                                                    defaultValue={`${data.userBppProjectProfile.projectAddress}`}
                                                    disabled={!edit}
                                                    required
                                                    placeholder="1234 Main St"/>
                                            </Form.Group>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="formGridState">
                                                    <Form.Label>District</Form.Label>
                                                    <Form.Select
                                                        onChange={event => setProjectDistrict(event.target.value)}
                                                        defaultValue={`${data.userBppProjectProfile.projectDistrict.id}`}
                                                        disabled={!edit}
                                                        required>
                                                        <option>Choose...</option>
                                                        {districtData.map((district) => {
                                                            return (
                                                                <option value={district.pk}>{district.fields.district_name}</option>
                                                            )
                                                        })}
                                                    </Form.Select>
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridCity">
                                                    <Form.Label>Location</Form.Label>
                                                    <Form.Select
                                                        onChange={event => setProjectLocation(event.target.value)}
                                                        defaultValue={`${data.userBppProjectProfile.projectLocation.id}`}
                                                        disabled={!edit}
                                                        required>
                                                        <option>Choose...</option>
                                                        {locationData.map(location => {
                                                            let filtered;
                                                            if (!project_district) {
                                                                filtered = localData.filter(l => l.fields.local_district == data.userBppProjectProfile.projectDistrict.id)
                                                            } else {
                                                                filtered = localData.filter(l => l.fields.local_district == project_district)
                                                            }
                                                            if (filtered.some(local => local.pk == location.fields.local)) {
                                                                return (
                                                                    <option
                                                                        value={location.pk}>{location.fields.location_description}</option>
                                                                )
                                                            }
                                                        })
                                                        }
                                                            : null}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Row>
                                        </Row>

                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Project Objectives</Form.Label>
                                            <Form.Control as="textarea"
                                                          defaultValue={`${data.userBppProjectProfile.projectObjectives}`}
                                                          disabled={!edit}
                                                          onChange={event => setProjectObjectives(event.target.value)}
                                                          rows={3}
                                                          required/>
                                        </Form.Group>


                                        <Form.Group className="mb-3" id="formGridCheckbox">
                                            <Form.Check type="checkbox"
                                                        onChange={event => { project_is_multi_sme ? setProjectMultiSme(false): setProjectMultiSme(true) }}
                                                        disabled={!edit}
                                                        checked={project_is_multi_sme ? true : false}
                                                        label="Project will be implemented in partnership with 4 or more SMEs ?"/>
                                        </Form.Group>

                                        <div className="d-flex justify-content-between">
                                            {edit ? <Button variant="primary" onClick={event => handleEdit(event, updateBppprofile, data.userBppProjectProfile.id)}>Submit</Button>
                                                : <Button variant="primary" onClick={event => setEdit(true)}>Edit</Button>}
                                            {edit ? <Button variant="primary" onClick={event => setEdit(false)}>Cancel</Button>
                                                : null}
                                            <Button variant="primary" onClick={event => {
                                                navigate(`/section-3`)
                                            }}
                                                    disabled={edit || data.userBppProjectProfile.submitted ? true : false}>Next</Button>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Mutation>
                    </Card.Body>
                </Card>
                <br/>
                <Card >
                    <Card.Body>
                        <Card.Text>
                            In case the project is implemented in partnership with four or more SMEs, a letter of agreement should be signed, and a focus person/coordinator for the project should be appointed.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br/>
            </main>
        );
    } else {
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <br/>
                <Card >
                    <Card.Body>
                        <Card.Title>Project profile</Card.Title>
                    </Card.Body>
                </Card>
                <br/>
                <Card>
                    <Card.Header>Basic information about the project</Card.Header>
                    <Card.Body>
                        <Mutation
                            mutation={ADD_PROJECT_PROFILE}
                            onCompleted={data => {
                                console.log('Complete')
                                setSubmitting(false)
                            }
                            }
                            refetchQueries={
                                () => [
                                    {query: GET_PROJECT_PROFILE}
                                ]
                            }
                        >
                            {(createBppprofile, {loading, error}) => {
                                if (error) return `Error! ${error}`;
                                return (
                                    <Form onSubmit={event => handleSubmit(event, createBppprofile)}>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Project Title</Form.Label>
                                                <Form.Control type="text"
                                                              onChange={event => setProjectTitle(event.target.value)}
                                                              placeholder="Enter Project Title" required/>
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Applicant</Form.Label>
                                                <Form.Control type="text"
                                                              onChange={event => setApplicant(event.target.value)}
                                                              placeholder="Enter Applicant's Name" required/>
                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form className="Label">Duration of the project and end date.</Form>

                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Start Date </Form.Label>
                                                <Form.Control
                                                    onChange={event => setProjectStartDate(event.target.value)}
                                                    type="date" required/>
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>End Date </Form.Label>
                                                <Form.Control
                                                    onChange={event => setProjectEndDate(event.target.value)}
                                                    type="date" required/>
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Duration</Form.Label>
                                                <Form.Control
                                                    onChange={event => setProjectDuration(event.target.value)}
                                                    type="text" placeholder="Enter Duration" required/>
                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form className="Label">Location where the project will be
                                                implemented.</Form>
                                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control
                                                    onChange={event => setProjectAddress(event.target.value)}
                                                    placeholder="1234 Main St" required/>
                                            </Form.Group>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="formGridState">
                                                    <Form.Label>District</Form.Label>
                                                    <Form.Select required defaultValue="Choose..." onChange={event => {
                                                        setProjectDistrict(event.target.value)
                                                    }}>
                                                        <option>Choose...</option>
                                                        {districtData.map((district) => {
                                                            return (
                                                                <option
                                                                    value={district.pk}>{district.fields.district_name}</option>
                                                            )
                                                        })}

                                                    </Form.Select>
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridCity">
                                                    <Form.Label>Location</Form.Label>
                                                    <Form.Select defaultValue="Choose..." onChange={event => {
                                                        setProjectLocation(event.target.value)
                                                    }}>
                                                        <option>Choose...</option>
                                                        {project_district ? (
                                                                locationData.map(location => {
                                                                    const filtered = localData.filter(l => l.fields.local_district == project_district)
                                                                    if (filtered.some(local => local.pk == location.fields.local)) {
                                                                        return (
                                                                            <option
                                                                                value={location.pk}>{location.fields.location_description}</option>
                                                                        )
                                                                    }
                                                                })
                                                            )
                                                            : null}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Row>
                                        </Row>

                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Project Objectives</Form.Label>
                                            <Form.Control as="textarea"
                                                          onChange={event => setProjectObjectives(event.target.value)}
                                                          rows={3}  required/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" id="formGridCheckbox">
                                            <Form.Check type="checkbox" onChange={event => {
                                                project_is_multi_sme ? setProjectMultiSme(false): setProjectMultiSme(true)
                                            }}
                                                        label="Project will be implemented in partnership with 4 or more SMEs ?"/>
                                        </Form.Group>

                                        <Row>
                                            <Col>
                                                <Button variant="primary" type="submit"
                                                        disabled={
                                                            submitting
                                                            || !projectTitle.trim()
                                                            || !applicant.trim()
                                                            || !project_address.trim()
                                                            || !project_address.trim()
                                                            || !project_district.trim()
                                                            || !project_location.trim()
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

const ADD_PROJECT_PROFILE = gql`
mutation CreateBPPProfile($applicant: String!, $projectAddress: String!, $projectDistrict: String!, $projectEndDate: String!, $projectIsMultiSme: Boolean!, $projectLocation: String!, $projectStartDate: String!, $projectTitle: String!, $projectObjectives: String!, $projectDuration: String!){
  createBppprofile(applicant:$applicant,projectAddress:$projectAddress, projectDistrict: $projectDistrict, projectEndDate: $projectEndDate, projectIsMultiSme: $projectIsMultiSme, projectLocation:$projectLocation, projectStartDate:$projectStartDate, projectTitle:$projectTitle, projectObjectives:$projectObjectives, projectDuration: $projectDuration){
    bppProjectProfile{
      id
      projectTitle
      applicant
      projectStartDate
      projectEndDate
      projectAddress
      projectLocation {
        id
      }
      projectDistrict{
        id
      }
      projectIsMultiSme
      projectObjectives
      projectDuration
      submittedApplication
      completedApplication
      lastUpdated
      created
    }
  }
}
`
const GET_PROJECT_PROFILE = gql`
query{
  userBppProjectProfile{
    id
    projectTitle
    applicant
    projectStartDate
    projectEndDate
    projectAddress
    projectLocation {
        id
      }
    projectDistrict{
        id
    }
    projectIsMultiSme
    projectObjectives
    projectDuration
    submittedApplication
    completedApplication
    lastUpdated
    created
  }
}
`
const UPDATE_PROJECT_PROFILE = gql`
mutation UpdateBPPProfile($bppProjectProfileId: Int!,$applicant: String!, $projectAddress: String!, $projectDistrict: String!, $projectEndDate: String!, $projectIsMultiSme: Boolean!, $projectLocation: String!, $projectStartDate: String!, $projectTitle: String!, $projectObjectives: String!, $projectDuration: String!){
  updateBppprofile(bppProjectProfileId:$bppProjectProfileId,applicant:$applicant,projectAddress:$projectAddress, projectDistrict: $projectDistrict, projectEndDate: $projectEndDate, projectIsMultiSme: $projectIsMultiSme, projectLocation:$projectLocation, projectStartDate:$projectStartDate, projectTitle:$projectTitle, projectObjectives:$projectObjectives, projectDuration: $projectDuration){
    bppProjectProfile{
      id
      projectTitle
      applicant
      projectStartDate
      projectEndDate
      projectAddress
      projectLocation {
        id
      }
      projectDistrict{
        id
      }
      projectIsMultiSme
      projectObjectives
      projectDuration
      submittedApplication
      completedApplication
      lastUpdated
      created
    }
  }
}
`

export default SectionTwo;