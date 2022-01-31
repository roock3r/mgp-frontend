import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import './css/modals.css';

export default class Wizard extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    }
    static Page = ({ children }) => children

    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            values: props.initialValues || {},
            loading: false,
            success: false,
            result: {}
        }
    }
    next = values =>
        this.setState(state => ({
            page: Math.min(state.page + 1, this.props.children.length - 1),
            values
        }))

    previous = () =>
        this.setState(state => ({
            page: Math.max(state.page - 1, 0)
        }))

    /**
     * NOTE: Both validate and handleSubmit switching are implemented
     * here because 🏁 Redux Final Form does not accept changes to those
     * functions once the form has been defined.
     */

    validate = values => {
        const activePage = React.Children.toArray(this.props.children)[
            this.state.page
            ]
        return activePage.props.validate ? activePage.props.validate(values) : {}
    }

    handleSubmit = async values => {
        const {children, onSubmit} = this.props
        const {page} = this.state
        const isLastPage = page === React.Children.count(children) - 1
        if (isLastPage) {
            this.setState({
                loading: true
            }) // Set loading start here

            const finalResult = await onSubmit(values)

            this.setState({
                loading: false
            }) // Set loading end here

            if (finalResult.success === true){
                this.setState({
                    values: {},
                    result: finalResult.data,
                    success: true,
                }) // Set Values to empty
            }
        } else {
            this.next(values)
        }
    }

    handleFinish = (e) => {
        this.setState({
            success: false,
            page: 0,
            result: {}
        })
    }

    render() {
        const { children } = this.props
        const { page, values, loading, success, result } = this.state
        const activePage = React.Children.toArray(children)[page]
        const isLastPage = page === React.Children.count(children) - 1
        return (
            <Form
                initialValues={values}
                validate={this.validate}
                onSubmit={this.handleSubmit}

            >
                {({ handleSubmit, submitting, values }) => (
                    <form onSubmit={handleSubmit}>
                        {success && result ?
                            <div className="modal" tabIndex="-1" role="dialog">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title">Application Successfully Submitted !</h4>
                                            <button type="button" className="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="modal-body">
                                                <h5> Your application ID is : {result.id}</h5>
                                                <h6> Please ensure you keep this for future reference.</h6>
                                                <p>Thank you for submitting your Expression of Interest for BTB’s Matching Grants Program for Tourism Small and Medium-Sized Enterprises. Feedback will be provided by the Project Coordinating Unit within a few weeks.  For more information contact the PCU at grants.unit@belizetourismboard.org or Whatsapp 67-GRANT.</p>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary" onClick={this.handleFinish}>Finish</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <>
                                {activePage}
                                <div className="buttons">
                                    {page > 0 && (
                                        <button type="button" onClick={this.previous}>
                                            « Previous
                                        </button>
                                    )}
                                    {!isLastPage && <button type="submit">Next »</button>}
                                    {isLastPage && (
                                        <button type="submit" disabled={submitting}>
                                            Submit {loading && (
                                            <div className="d-flex justify-content-center">
                                                <div className="spinner-border text-primary" role="status">
                                                </div>
                                            </div>
                                        ) }
                                        </button>
                                    )}
                                </div>
                            </>
                        }

                        {/*<pre>{JSON.stringify(values, 0, 2)}</pre>*/}
                    </form>
                )}
            </Form>
        )
    }
}
