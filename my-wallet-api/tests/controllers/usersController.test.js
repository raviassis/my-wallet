const UserController = require('../../controllers/userController');
const UserExistError = require('../../erros/userExistError');
const constants = require('../../constants');

describe('usersController', () => {
    test('post - success', async () => {
        const req = {
            body: {
                nome: 'Teste',
                sobrenome: 'Teste',
                email: 'teste@teste',
                senha: 'testesenha123'
            },
        };

        const createdUser = {
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email
        };

        const userServiceMock = {
            createUser: jest.fn().mockReturnValue(createdUser),
        };
        const controller = new UserController({userService: userServiceMock});
        
        const mockJson = jest.fn();
        const mockStatus = jest.fn().mockReturnValue({
            json: mockJson,
        });
        const res = {
            status: mockStatus,
        };
        const next = {};

        await controller.post(req, res, next);

        expect(userServiceMock.createUser).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(constants.HTTP_STATUS_CODES.CREATED);
        expect(mockJson).toHaveBeenCalledWith(createdUser);

    });

    test('post - user already exist', async () => {
        const req = {
            body: {
                nome: 'Teste',
                sobrenome: 'Teste',
                email: 'teste@teste',
                senha: 'testesenha123'
            },
        };
        const userServiceMock = {
            createUser: jest.fn().mockImplementation(() => { throw new UserExistError() }),
        };
        const controller = new UserController({userService: userServiceMock});
        
        const mockJson = jest.fn();
        const mockStatus = jest.fn().mockReturnValue({
            json: mockJson,
        });
        const res = {
            status: mockStatus,
        };
        const next = {};

        await controller.post(req, res, next);
        expect(userServiceMock.createUser).toThrowError(new UserExistError());
        expect(userServiceMock.createUser).toHaveBeenCalledWith(req.body);
        
        expect(res.status).toHaveBeenCalledWith(constants.HTTP_STATUS_CODES.BAD_REQUEST);
        expect(mockJson).toHaveBeenCalled();

    });
});
