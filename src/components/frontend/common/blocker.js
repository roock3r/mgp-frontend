import React from 'react';

const Blocker = () => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-md-7 py-4">
                        <h4 className="text-black">Oops! We're Sorry!</h4>
                        <h4 className="text-black">The expression of Interest has been closed !</h4>
                        <p className="text-muted"> We are no longer accepting applications after February 21, 2022, at 4 PM.</p>
                        <p className="text-muted"> For more information, kindly contact the Grants Administration at
                            <a href="mailto:grants.unit@belizetourismboard.org"> grants.unit@belizetourismboard.org</a>
                            {' '} or WhatsApp <a href="tel:+5016747268"> 67-GRANT</a> (672-7268).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blocker;