import React, {useState, useEffect} from 'react';
import SignatureCanvas from 'react-signature-canvas'
import {gql} from "apollo-boost";
import {useQuery, useMutation, Mutation} from "react-apollo";
import { useNavigate } from "react-router-dom";

const SectionOne = () => {
    const [edit, setEdit] = useState(false);
    const [submitting, setSubmitting] =  useState(false);

    let navigate = useNavigate();


    const [name, setName] = useState('');
    const [position, setPostion] = useState('');
    const [signature, setSignature] = useState({});


    const {loading, error, data} = useQuery(GET_LETTER);

    useEffect(() =>{
        if(!loading && data.userBppLetter) {
            setName(data.userBppLetter.name)
            setPostion(data.userBppLetter.position)
            setSignature(data.userBppLetter.signature)
        }
    }, [loading, data])

    if (loading) return null;
    if (error) return `Error! ${error}`;


    const handleSubmit = async (event, createBppletter) => {
        event.preventDefault()
        setSubmitting(true)
        const sig_image = signature.toDataURL()
        createBppletter({variables: {name, position, signature: sig_image }})
    }

    const handleEdit = async (event, updateBppletter, id) => {
        event.preventDefault()
        setSubmitting(true)
        const sig_image = signature.toDataURL()
        updateBppletter({variables: {bppLetterId:id,name, position, signature: sig_image }})

    }


    if (data.userBppLetter) {
        console.log(data)
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <br/>
                <Mutation
                    mutation={UPDATE_LETTER}
                    onCompleted={data => {
                        console.log('Complete')
                        setSubmitting(false)
                        setEdit(false)
                    }
                    }
                    refetchQueries={
                        () => [
                            {query: GET_LETTER}
                        ]
                    }
                >
                    {(updateBppletter, {loading, error}) => {
                        if (error) return `Error! ${error}`;
                        return (
                        <form onSubmit={event => handleEdit(event, updateBppletter, data.userBppLetter.id)}>
                            <div className="card">
                                <div className="card-header">
                                    FULL PROPOSAL APPLICATION LETTER
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <p className="p-2 bd-highlight"> To: Program Coordinating Unit</p>
                                        {edit ? <input type="date" className="p-2 bd-highlight" required /> : <p>{data.userBppLetter.lastUpdated}</p>}

                                    </div>
                                    <br/>
                                    <p>Having examined the Invitation Letter for Full Proposals and Instructions for submission
                                        of the
                                        Grant proposal under the MGP, we would like to submit our proposal.</p>
                                    <p>Should our proposal be selected, we are committed to implementing the proposal in
                                        adherence to the proposed contents and in compliance with the provisions set forth under
                                        the Grant Agreement.</p>
                                    <p>We also agree to submit all necessary documentation in writing and/or electronic form,
                                        in accordance with the requirements for submitting the full proposal project. We,
                                        the undersigned, certify that to the best of our knowledge and belief,
                                        all information contained in the proposal is true and correct. Any information,
                                        if found to be incorrect, wrong, or misleading, may lead to our disqualification
                                        from the application and selection in accordance with the MGP's regulations.</p>
                                    <br/>
                                    <b>Applicant or Authorized Representative
                                    </b>
                                    <br/>
                                    <div className="d-flex justify-content-between">
                                        {edit ?
                                            <>
                                             <span className="border">
                                            <SignatureCanvas penColor='blue'
                                                             ref={(ref) => {setSignature(ref)}}
                                                             canvasProps={{width: 250, height: 50, className: 'sigCanvas'}} required/>
                                            </span>
                                            <span className="border">
                                             <p>Current Signature</p>
                                            <img src={data.userBppLetter.signature} />
                                            </span>
                                            </>
                                             :
                                            <span className="border">
                                            <img src={data.userBppLetter.signature} />
                                            </span>    }
                                    </div>
                                    <p>---------------------------------------</p>
                                    <p>Signature</p>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text"
                                               className="form-control"
                                               id="name"
                                               placeholder="Name"
                                               onChange={event => setName(event.target.value)}
                                               defaultValue={`${data.userBppLetter.name}`}
                                               disabled={!edit}
                                               required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="post">Position in Organization</label>
                                        <input type="text"
                                               className="form-control"
                                               id="post"
                                               placeholder="Position in organization"
                                               onChange={event => setPostion(event.target.value)}
                                               defaultValue={`${data.userBppLetter.position}`}
                                               disabled={!edit}
                                               required/>
                                    </div>
                                    <br/>
                                    <div className="d-flex justify-content-between">
                                        {edit ? <button type="submit"
                                                        className="btn btn-primary p-2 bd-highlight">Submit</button>
                                            : <button onClick={event => setEdit(true)}
                                                      className="btn btn-primary p-2 bd-highlight">Edit</button>}
                                        {edit ? <button onClick={event => setEdit(false)}
                                                        className="btn btn-primary p-2 bd-highlight">Cancel</button>
                                            : null}
                                        <button onClick={event => {navigate(`/section-2`)}}
                                                disabled={edit || data.userBppLetter.submitted ? true: false}
                                                className="btn btn-primary p-2 bd-highlight">Next</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        )
                    }}
                </Mutation>
            </main>
        );
    } else {
        return (
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <br/>
                <Mutation
                    mutation={ADD_LETTER}
                    onCompleted={data => {
                        console.log('Complete')
                        setSubmitting(false)
                    }
                    }
                    refetchQueries={
                        () => [
                            {query: GET_LETTER}
                        ]
                    }
                >
                    {(createBppletter, {loading, error}) => {
                        if (error) return `Error! ${error}`;
                        return (<form onSubmit={event => handleSubmit(event, createBppletter)}>
                            <div className="card">
                                <div className="card-header">
                                    FULL PROPOSAL APPLICATION LETTER
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <p className="p-2 bd-highlight"> To: Program Coordinating Unit</p>
                                        <input type="date" className="p-2 bd-highlight" required/>
                                    </div>
                                    <br/>
                                    <p>Having examined the Invitation Letter for Full Proposals and Instructions for
                                        submission of the
                                        Grant proposal under the MGP, we would like to submit our proposal.</p>
                                    <p>Should our proposal be selected, we are committed to implementing the proposal in
                                        adherence to the proposed contents and in compliance with the provisions set
                                        forth under
                                        the Grant Agreement.</p>
                                    <p>We also agree to submit all necessary documentation in writing and/or electronic
                                        form,
                                        in accordance with the requirements for submitting the full proposal project.
                                        We,
                                        the undersigned, certify that to the best of our knowledge and belief,
                                        all information contained in the proposal is true and correct. Any information,
                                        if found to be incorrect, wrong, or misleading, may lead to our disqualification
                                        from the application and selection in accordance with the MGP's regulations.</p>
                                    <br/>
                                    <b>Applicant or Authorized Representative
                                    </b>
                                    <br/>
                                    <div className="d-flex justify-content-between">
                                    <span className="border">
                                        <SignatureCanvas penColor='blue' canvasProps={{width: 250, height: 50, className: 'sigCanvas'}}
                                                         ref={(ref) => { setSignature(ref) }}
                                         required/>
                                    </span>
                                    </div>
                                    <p>---------------------------------------</p>
                                    <p>Signature</p>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control" id="name"
                                               onChange={event => setName(event.target.value)}
                                               placeholder="Name" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pos">Position in Organization</label>
                                        <input type="text"
                                               className="form-control"
                                               id="post"
                                               onChange={event => setPostion(event.target.value)}
                                               placeholder="Position in organization" required/>
                                    </div>
                                    <br/>
                                    <div className="d-flex justify-content-between">
                                        <button type="submit"
                                                className="btn btn-primary p-2 bd-highlight"
                                                disabled={
                                                    submitting || !name.trim() || !position.trim() || !signature
                                                }
                                        >Submit</button>
                                        {/*<button type="submit" className="btn btn-primary p-2 bd-highlight">Finish</button>*/}
                                        {/*<button type="submit" className="btn btn-primary p-2 bd-highlight">Next</button>*/}
                                    </div>
                                </div>
                            </div>
                        </form>)
                    }}
                </Mutation>
            </main>
        )
    }

};

const ADD_LETTER = gql`
mutation CreateBPPLetter($name: String!, $position: String!, $signature: String!){
  createBppletter(name:$name, position:$position, signature:$signature){
    bppLetter{
      id
      name
      signature
      position
      submittedApplication
      completedApplication
      lastUpdated
      created
    }
  }
}
`
const GET_LETTER = gql`
query{
  userBppLetter{
    id
    signature
    position
    name
    submittedApplication
    completedApplication
    created
    lastUpdated
  }
}
`

const UPDATE_LETTER = gql`
mutation UpdateBPPLetter($bppLetterId: Int!,$name: String!,$signature: String!, $position: String!){
  updateBppletter(bbpLetterId:$bppLetterId,name:$name, signature:$signature, position:$position){
    bppLetter{
      id
      name
      signature
      position
      submittedApplication
      completedApplication
      lastUpdated
      created
    }
  }
}
`

export default SectionOne;