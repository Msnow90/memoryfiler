import React from 'react';

import Menu from '../LeftMenu/LeftMenu';

export default ({ displayedMemory }) => {

    return (
        <div className="modal fade" id="menuModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    {/* <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> */}
                    <div className="modal-body">
                        <Menu displayedMemory={displayedMemory} />
                    </div>
                </div>
            </div>
        </div>
    )
}