const usersController = require('../../controllers/usersController');

describe('usersController', () => {
    test('usersController post', () => {
        const req = {
            body: {
                nome: 'Teste',
                sobrenome: 'Teste',
                email: 'teste@teste',
                senha: 'testesenha123'
            },
        };
        const res = {
            status() {
                return {
                    json(){}
                };
            }
        };
        const next = {};    
        const spyRes = jest.spyOn(res, 'status');
        usersController.post(req, res, next);    
        expect(spyRes).toHaveBeenCalled();
    });
});
