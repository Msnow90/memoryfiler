import React from 'react';

import './changeMemoryModal.css';

export default ({ memoryListing, changeMemoryLocation, clearDisplayedMemory }) => {

    return (
        <div className="modal fade" id="changeMemoryModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Change Memory Palace:</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <select>
                            <option onClick={() => {
                                clearDisplayedMemory();
                                $('#changeMemoryModal').modal('hide');
                            }}>None</option>
                            {
                                memoryListing && memoryListing.map(memory => {

                                    return (
                                        <option key={memory._id} className="dropdown-item" href="#" onClick={(elem) => {
                                            changeMemoryLocation(elem, memory._id);
                                            $('#changeMemoryModal').modal('hide');
                                        }}>{memory.title}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}