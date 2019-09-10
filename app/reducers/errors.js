
const AUTH_ERROR = 'AUTH_ERROR';
const MEMORY_ERROR = 'MEMORY_ERROR';
const NODE_ERROR = 'NODE_ERROR';
const SERVER_ERROR = 'SERVER_ERROR';


export const authError = (err) => {
    return {
        type: AUTH_ERROR,
        err
    }
}

export const memoryError = (err) => {
    return {
        type: MEMORY_ERROR,
        err
    }
}

export const nodeError = (err) => {
    return {
        type: NODE_ERROR,
        err
    }
}

export const serverError = (err) => {
    return {
        type: SERVER_ERROR,
        err
    }
}


export default (errors = { auth: '', memory: '', node: '', server: ''}, action) => {

    switch (action.type) {
        
        case AUTH_ERROR:
            return Object.assign({}, errors, { auth: action.err });

        case MEMORY_ERROR:
            return Object.assign({}, errors, { memory: action.err });
        
        case NODE_ERROR:
            return Object.assign({}, errors, { node: action.err });
        
        case SERVER_ERROR:
            return Object.assign({}, errors, { server: action.err });

        default:
            return errors;
    }
}