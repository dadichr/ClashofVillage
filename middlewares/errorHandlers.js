module.exports = (err, req, res, next) => {
    let code;
    let name = err.name;
    let message;


    console.log(err)
    switch(name) {
        case 'ValidationError':
            code = 409;
            message = 'Validasi tidak benar';
            break;
        case 'Already_Exists':
            code = 409;
            message = 'Email Already Exists!!';
            break;
        case 'Mongoose_Error':
            code = 500;
            message = 'Mongoose Error!!';
            break;
        case 'Login_Fail':
            code = 401;
            message = 'Email or Password Not Found!!';
            break;
        case 'Missing_Token':
            code = 401;
            message = 'Missing Access Token!!';
            break;
        case 'Invalid_Token':
            code = 401;
            message = 'Invalid Access Token!!';
            break;
        case 'Not_Found':
            code = 404;
            message = 'Resources Not Found!!';
            break;
        case 'Not_Enough':
            code = 404;
            message = 'Resources Not Enough!!';
            break;
        case 'Forbidden':
            code = 403;
            message = 'No Access!!';
            break;
        default:
            code = 500;
            message = 'Internal Server Error!!';
    }
    res.status(code).json({
        success: false,
        message
    });
}