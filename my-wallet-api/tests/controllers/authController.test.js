const AuthController = require('../../controllers/authController');
const Unauthorized = require('../../erros/unauthorized');
const constants = require('../../constants');
describe('AuthController', () => {
    let controller;
    let authService;
    beforeEach(() => {
        authService = {
            login() {}
        };
        controller = new AuthController({authService});
    });

    it('post - OK', async () => {
        const json = jest.fn();
        const status = jest.fn().mockReturnValue({json});
        const req = {
            body: {
                email: 'email@email',
                senha: 'senha'
            }
        };
        const res = {
            status
        };

        authService.login = jest.fn().mockReturnValue({
            email: 'email@email',
            nome: 'nome',
            sobrenome: 'sobrenome',
            token: 'token',
        });
        await controller.post(req, res, {});
        expect(authService.login).toHaveBeenCalledWith('email@email', 'senha');
        expect(status).toHaveBeenCalledWith(constants.HTTP_STATUS_CODES.OK);
        expect(json).toHaveBeenCalledWith({
            email: 'email@email',
            nome: 'nome',
            sobrenome: 'sobrenome',
            token: 'token'
        });
    }); 

    it('post - UNAUTHORIZED', async () => {
        const json = jest.fn();
        const status = jest.fn().mockReturnValue({json});
        const req = {
            body: {
                email: 'email@email',
                senha: 'senha'
            }
        };
        const res = {
            status
        };
        authService.login = jest.fn().mockImplementation(() => {
            throw new Unauthorized();
        });
        await controller.post(req, res, {});
        expect(authService.login).toHaveBeenCalledWith('email@email', 'senha');
        expect(status).toHaveBeenCalledWith(constants.HTTP_STATUS_CODES.UNAUTHORIZED);
        expect(json).toHaveBeenCalled();
        
    });
});