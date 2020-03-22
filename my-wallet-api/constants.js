module.exports = {
    ERROR_MSGS: {
        USER_EXIST_ERROR: 'Já existe um usuário com esse email.',
        USER_UNAUTHORIZED: 'Login e/ou senha inválidos.'
    },

    HTTP_STATUS_CODES: {

        //Success
        OK: 200,
        CREATED: 201,

        //redirect

        //Error Client
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        UNPROCESSABLE_ENTITY: 422,
    },
}