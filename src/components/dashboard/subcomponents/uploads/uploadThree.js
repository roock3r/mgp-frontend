import React, {useEffect, useState} from 'react';
import {Accordion, Button, Form} from "react-bootstrap";
import {useQuery} from "react-apollo";
import axios from "axios";
import {gql} from "apollo-boost";

const UploadThree = ({businessPlanId, submissionType}) => {
    const [file, setFile] = useState("");
    const [submission_type, setSubmissionType] = useState("")

    const [edit, setEdit] = useState(false);
    const [submitting, setSubmitting] =  useState(false);
    const [fileError, setFileError] = useState("");

    const handlefileChange = event => {
        const selectedFile = event.target.files [0];
        const fileSizeLimit = 100000000;
        if(selectedFile && selectedFile.size > fileSizeLimit){
            setFileError(`${selectedFile.n}: File size is too large`)
        } else {
            setFile(selectedFile);
            setFileError('')
        }

    };

    const {loading, error, data} = useQuery(query, {
        variables: {
            search: submissionType
        },
        // pollInterval: 500,
    });

    useEffect(() =>{
        if(!loading && data.userBpUpload.length != 0) {
            setFile(data.userBpUpload[0].file)
        }
    }, [loading, data])

    if (loading) return null;
    if (error) return `Error! ${error}`;


    const handlefileUpload = async () => {
        try{
            const data = new FormData();
            data.append("file", file);
            data.append("type", "public");
            data.append("business_plan_id", businessPlanId)
            data.append("submission_type", submissionType)

            const res = await axios.post("https://mgp.silvatech.bz/api/fileupload", data)
            return res.data.url
        }catch (e) {
            console.error('Error uploading file', e)
            setSubmitting(false)
        }
    };

    if(data.userBpUpload.length != 0){
        console.log(data)
        return (
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Sworn statement by the firm declaring that it does not have liquidation nor bankruptcy cases.</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Please select a file to upload: </Form.Label>
                                <Form.Control type="file"  onChange={handlefileChange} required/>
                                <Form.Text className="text-muted">
                                    current file: {file ? file: null}
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" onClick={() => handlefileUpload()}>
                                Submit
                            </Button>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    }else{
        return (
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Sworn statement by the firm declaring that it does not have liquidation nor bankruptcy cases.</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Please select a file to upload: </Form.Label>
                                <Form.Control type="file"  onChange={handlefileChange} required/>
                                <Form.Text className="text-muted">
                                    No file is uploaded please select one and press upload
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" onClick={() => handlefileUpload()}>
                                Submit
                            </Button>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    }


};

const query = gql`
query($search: String){
  userBpUpload(search: $search){
    id
    file
    submissionType
    uploadedAt
  }
}`


export default UploadThree;