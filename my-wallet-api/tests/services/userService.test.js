const UserService = require('../../services/userService');
const User = require('../../domain/user');
const UserExistError = require('../../erros/userExistError');
describe('userService', () => {
    let userRepositoryMock = {
        findOne: jest.fn(),
        insertOne: jest.fn(),
    };
    let hasherMock = {
        generate: jest.fn().mockReturnValue('password-hashed'),
    };
    const userService = new UserService({ hasher: hasherMock, userRepository: userRepositoryMock });
    test('createUser', async () => {
        const body = {
            nome: 'Teste',
            sobrenome: 'Teste',
            email: 'teste@teste',
            senha: 'testesenha123',
        };
        const expected = {
            nome: body.nome,
            sobrenome: body.sobrenome,
            email: body.email,
        };
        const user = new User();
        user.nome = body.nome;
        user.sobrenome = body.sobrenome;
        user.email = body.email;
        user.senha = 'password-hashed';        

        userRepositoryMock.insertOne.mockReturnValue(user);

        const result = await userService.createUser(body);

        expect(userRepositoryMock.insertOne).toHaveBeenCalledWith(new User({
            nome: body.nome,
            sobrenome: body.sobrenome,
            email: body.email,
            senha: 'password-hashed',
        }));
        expect(result).toStrictEqual(expected);
    });

    test('createUser - User already exist', () => {
        const body = {
            nome: 'Teste',
            sobrenome: 'Teste',
            email: 'teste@teste',
            senha: 'testesenha123',
        };

        userRepositoryMock.findOne.mockReturnValue({nome: 'Teste', sobrenome: 'Teste', email: 'teste@teste'});
        userService.createUser(body).catch((e) => {
            expect(e).toEqual(new UserExistError());
        });
    });
});