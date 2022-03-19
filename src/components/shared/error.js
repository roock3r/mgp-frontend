import React from 'react';

const Error = ({error}) => {
    return (
        <div>
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Holy guacamole!</strong> {error.message}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    );
};

export default Error;