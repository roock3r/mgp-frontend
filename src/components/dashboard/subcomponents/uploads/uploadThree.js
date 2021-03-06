import React, {useEffect, useState} from 'react';
import {Accordion, Button, Form} from "react-bootstrap";
import {useQuery} from "react-apollo";
import axios from "axios";
import {gql} from "apollo-boost";

const UploadThree = ({businessPlanId, submissionType, final}) => {
    const [file, setFile] = useState("");
    const [tempp, setTempp] = useState("");
    const [saved, setSaved] = useState(false)

    const [submitting, setSubmitting] =  useState(false);
    const [fileError, setFileError] = useState("");

    const handlefileChange = event => {
        const selectedFile = event.target.files[0];
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
            setFile(data.userBpUpload[data.userBpUpload.length - 1].file)
        }
    }, [loading, data])

    if (loading) return null;
    if (error) return `Error! ${error}`;


    const handlefileUpload = async () => {
        try{
            setSubmitting(true);
            const data = new FormData();
            data.append("file", file);
            data.append("type", "public");
            data.append("business_plan_id", businessPlanId)
            data.append("submission_type", submissionType)

            const res = await axios.post("https://mgp.silvatech.bz/api/fileupload", data)
            setSubmitting(false);
            setSaved(true)
            setTempp(res.data.image_url.split('/').pop())
            return res.data.image_url
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
                                    All previous saved files:
                                    <ol>
                                        {data.userBpUpload.map(e => {
                                            return (
                                                <li>
                                                    {e.file}
                                                </li>
                                            )
                                        })}
                                    </ol>
                                    <ul>
                                        <li>
                                            <li>last saved
                                                file: {data.userBpUpload[data.userBpUpload.length - 1] && !saved ? data.userBpUpload[data.userBpUpload.length - 1].file : tempp}</li>
                                        </li>
                                    </ul>
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary"
                                    disabled={
                                        submitting || final
                                        // || !inputFields.trim()
                                    }
                                    onClick={() => handlefileUpload()}>
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
                                    {data.userBpUpload.map(e => {
                                        return (
                                            <li>
                                                {e.file}
                                            </li>
                                        )
                                    })}
                                    {saved ? 'File Saved Successfully': 'No file is uploaded please select one and press upload'}
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary"
                                    disabled={
                                        submitting || final
                                        // || !inputFields.trim()
                                    }
                                    onClick={() => handlefileUpload()}>
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