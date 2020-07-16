const expect = require('chai').expect;
import { validateRegisterKeyAndValue, validateLoginKeyAndValue } from '../../api/utils/validateFields';
import { HandledError } from '../../api/config/HandledError';

const mockRegisterUser = {
    email: 'test@test.com',
    username: 'test',
    password: 'test',
    firstName: 'test',
    lastName: 'test'
};

const mockLoginUser = {
    email: 'test@test.com',
    password: 'test'
};

describe('when trying to register', function () {
    describe('if all keys are valid & values not empty', () => {
        it('should not throw an error', () => {
            expect(() => validateRegisterKeyAndValue(mockRegisterUser))
                .to.not.throw(HandledError);
        });
    });
    describe('if all keys and values are valid, but we add an extra key', () => {
        it('should throw a custom error', () => {
            Object.assign(mockRegisterUser, { extraTestKey: "extraTest" });
            expect(() => validateRegisterKeyAndValue(mockRegisterUser))
                .to.throw(HandledError);
        });
    });
    describe('if all keys are valid & email values is empty', () => {
        it('should throw a custom error', () => {
            mockRegisterUser.email = '';
            expect(() => validateRegisterKeyAndValue(mockRegisterUser))
                .to.throw(HandledError);
        });
    });
    describe('if all keys are valid & username values is empty', () => {
        it('should throw a custom error', () => {
            mockRegisterUser.username = '';
            expect(() => validateRegisterKeyAndValue(mockRegisterUser))
                .to.throw(HandledError);
        });
    });
    describe('if all keys are valid & password values is empty', () => {
        it('should throw a custom error', () => {
            mockRegisterUser.password = '';
            expect(() => validateRegisterKeyAndValue(mockRegisterUser))
                .to.throw(HandledError);
        });
    });
    describe('if all keys are valid & firstName values is empty', () => {
        it('should throw a custom error', () => {
            mockRegisterUser.firstName = '';
            expect(() => validateRegisterKeyAndValue(mockRegisterUser))
                .to.throw(HandledError);
        });
    });
    describe('if all keys are valid & lastName values is empty', () => {
        it('should throw a custom error', () => {
            mockRegisterUser.lastName = '';
            expect(() => validateRegisterKeyAndValue(mockRegisterUser))
                .to.throw(HandledError);
        });
    });
    describe('if all keys but email are valid & the rest of the values are correct', () => {
        it('should throw a custom error', () => {
            delete mockRegisterUser.email;
            expect(() => validateRegisterKeyAndValue(mockRegisterUser))
                .to.throw(HandledError);
        });
    });
    describe('if all keys but username are valid & the rest of the values are correct', () => {
        it('should throw a custom error', () => {
            delete mockRegisterUser.username;
            expect(() => validateRegisterKeyAndValue(mockRegisterUser))
                .to.throw(HandledError);
        });
    });
    describe('if all keys but password are valid & the rest of the values are correct', () => {
        it('should throw a custom error', () => {
            delete mockRegisterUser.password;
            expect(() => validateRegisterKeyAndValue(mockRegisterUser))
                .to.throw(HandledError);
        });
    });
    describe('if all keys but firstName are valid & the rest of the values are correct', () => {
        it('should throw a custom error', () => {
            delete mockRegisterUser.firstName;
            expect(() => validateRegisterKeyAndValue(mockRegisterUser))
                .to.throw(HandledError);
        });
    });
    describe('if all keys but lastName are valid & the rest of the values are correct', () => {
        it('should throw a custom error', () => {
            delete mockRegisterUser.lastName;
            expect(() => validateRegisterKeyAndValue(mockRegisterUser))
                .to.throw(HandledError);
        });
    });
});

describe('when trying to login', function () {
    describe('if all keys are valid & values not empty', () => {
        it('should not throw an error', () => {
            expect(() => validateLoginKeyAndValue(mockLoginUser))
                .to.not.throw(HandledError);
        });
    });
    describe('if all keys and values are valid, but we add an extra key', () => {
        it('should throw a custom error', () => {
            Object.assign(mockLoginUser, { extraTestKey: "extraTest" });
            expect(() => validateLoginKeyAndValue(mockLoginUser))
                .to.throw(HandledError);
        });
    });
    describe('if all keys are valid & email values is empty', () => {
        it('should throw a custom error', () => {
            mockLoginUser.email = '';
            expect(() => validateLoginKeyAndValue(mockLoginUser))
                .to.throw(HandledError);
        });
    });
    describe('if all keys are valid & password values is empty', () => {
        it('should throw a custom error', () => {
            mockLoginUser.password = '';
            expect(() => validateLoginKeyAndValue(mockLoginUser))
                .to.throw(HandledError);
        });
    });
    describe('if all keys but email are valid & the rest of the values are correct', () => {
        it('should throw a custom error', () => {
            delete mockLoginUser.email;
            expect(() => validateLoginKeyAndValue(mockLoginUser))
                .to.throw(HandledError);
        });
    });
    describe('if all keys but password are valid & the rest of the values are correct', () => {
        it('should throw a custom error', () => {
            delete mockLoginUser.password;
            expect(() => validateLoginKeyAndValue(mockLoginUser))
                .to.throw(HandledError);
        });
    });
});
