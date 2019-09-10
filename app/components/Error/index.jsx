import React from 'react';

import './index.css';

export default ({err}) => {
	
	var errMsg;

	if (err)
	{
		errMsg = <div className="alert alert-danger">{err}</div>
	}

	return (
		<div>
			{errMsg}
		</div>
	)
}