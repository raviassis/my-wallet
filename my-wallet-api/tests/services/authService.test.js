const AuthService = require('../../services/authService');
const Unauthorized = require('../../erros/unauthorized');
const constants = require('../../constants');

describe('AuthService', () => {
    let authService;
    let hasher;
    let userRepository;
    let jwt;
    let secret;
    beforeEach(() => {
        hasher = {
            verify(){}
        };
        userRepository = { 
            findOne(){}
        };
        jwt = {
            sign() {}
        };
        secret = 'secret';
        authService = new AuthService({hasher, userRepository, jwt, secret});
    });
    it('should login', async () => {
        const senha = 'senha';
        const expected = {
            email: 'test@test',
            nome: 'nome',
            sobrenome: 'sobrenome',
            token: 'token',
        }
        userRepository.findOne = jest.fn()
                                    .mockReturnValue({
                                        email: expected.email,
                                        nome: expected.nome,
                                        sobrenome: expected.sobrenome,
                                        senha
                                    });
        hasher.verify = jest.fn()
                            .mockReturnValue(true);
        jwt.sign = jest.fn().mockReturnValue(expected.token);
        expect(await authService.login(expected.email, senha)).toStrictEqual(expected);
        expect(userRepository.findOne).toHaveBeenCalledWith({email: expected.email});
        expect(hasher.verify).toHaveBeenCalledWith(senha, senha);
    });
    it('user not found', () => {
        expect.assertions(1);
        authService.login('email@email', 'senha').catch((e) => {
            expect(e).toEqual(new Unauthorized(constants.ERROR_MSGS.USER_UNAUTHORIZED));
        });
    });
    it('wrong password', () => {
        expect.assertions(1);
        userRepository.findOne = jest.fn()
                                    .mockReturnValue({
                                        email: 'email@email',
                                        nome: 'nome',
                                        sobrenome: 'sobrenome',
                                        senha: 'senha2'
                                    });
        hasher.verify = jest.fn()
                            .mockReturnValue(false);
        authService.login('email@email', 'senha').catch((e) => {
            expect(e).toEqual(new Unauthorized(constants.ERROR_MSGS.USER_UNAUTHORIZED));
        });
    });
});