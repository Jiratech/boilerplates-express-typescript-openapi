import { User } from '../openapi/model/user';
import { Role } from '../openapi/model/role';
import { JwtAuthenticationRequest } from '../openapi/model/jwtAuthenticationRequest';
import { JwtAuthenticationResponse } from '../openapi/model/jwtAuthenticationResponse';
import UserDao from '../dal/dao/UserDao';
import UserConverter from './converter/UserConverter';
import UserRepository from '../dal/repository/UserRepository';
import RoleService from './RoleService'
import { signJwt, decodeRefreshToken } from '../middlewares/jwtController';
import { HandledError } from '../config/HandledError';
import { encrypt, verifyEncryption } from '../utils/encryptUtils';
import { Responses } from '../config/Responses';

export class UserService {

    public async createUser(user: User, roleName: string): Promise<User | null> {
        if (user.email && user.password) {
            user.password = await encrypt(user.password);
            let userDao: UserDao | null = await UserRepository.findOneByEmail(user.email);
            if (!userDao) {
                user.roleId = await RoleService.getIdByUserRoleName(roleName);
                userDao = UserConverter.convertToDao(user);
                const newUserDao: UserDao = await UserRepository.createUser(userDao);
                return UserConverter.convertToDto(newUserDao);
            } else {
                throw new HandledError(Responses.conflict);
            }
        } else {
            throw new HandledError(Responses.badRequest);
        }
    }

    public async getAllUsers(): Promise<Array<User>> {
        const userList: UserDao[] = await UserRepository.findAll();
        const userListDto: User[] = userList.map((user: UserDao) => UserConverter.convertToDto(user));
        return userListDto;
    }

    public async getUserById(userId: string): Promise<User> {
        const userDao: UserDao | null = await UserRepository.findOneById(userId);
        if (userDao) {
            return UserConverter.convertToDto(userDao);
        } else {
            throw new HandledError(Responses.notFound);
        }
    }

    public async getUserByEmail(email: string): Promise<User> {
        const userDao: UserDao | null = await UserRepository.findOneByEmail(email);
        if (userDao) {
            return UserConverter.convertToDto(userDao);
        } else {
            throw new HandledError(Responses.notFound);
        }
    }

    public async modifyUser(user: User, userId: string): Promise<User> {
        let userDao: UserDao | null = await UserRepository.findOneById(userId);
        if (userDao && user.password) {
            user.password = await encrypt(user.password);
            userDao = UserConverter.convertToDao(user);
            const modifiedUser: UserDao = await UserRepository.updateOneById(userDao, userId);
            return UserConverter.convertToDto(modifiedUser);
        } else {
            throw new HandledError(Responses.badRequest);
        }
    }

    public async loginUser(jwtAuthenticationRequest: JwtAuthenticationRequest): Promise<JwtAuthenticationResponse> {
        if (jwtAuthenticationRequest.email && jwtAuthenticationRequest.password) {
            const userDao: UserDao | null = await UserRepository.findOneByEmail(jwtAuthenticationRequest.email);
            if (userDao) {
                const checkedPassword: boolean = await verifyEncryption(jwtAuthenticationRequest.password, userDao._password);
                if (checkedPassword) {
                    const roleDto: Role = await RoleService.getRoleById(userDao._roleId);
                    const jwtAuthenticationResponse: JwtAuthenticationResponse = signJwt(userDao._email, userDao._username, userDao._firstName, userDao._lastName, roleDto.name as string, userDao._userId);
                    if (jwtAuthenticationResponse.refreshToken) {
                        userDao._refreshToken = await encrypt(jwtAuthenticationResponse.refreshToken);
                        UserRepository.updateOneById(userDao, userDao._userId);
                    }
                    return jwtAuthenticationResponse;
                } else {
                    throw new HandledError(Responses.unauthorized);
                }
            } else {
                throw new HandledError(Responses.notFound);
            }
        } else {
            throw new HandledError(Responses.badRequest);
        }
    }

    public async deleteUser(userId: string): Promise<boolean> {
        const isUserDeleted: boolean = await UserRepository.deleteOneById(userId);
        if (!isUserDeleted) {
            throw new HandledError(Responses.notFound);
        }
        return isUserDeleted;
    }

    public async refreshAccessToken(refreshToken: string): Promise<JwtAuthenticationResponse> {
        const decodedTokenObject = decodeRefreshToken(refreshToken);
        const userDao = await UserRepository.findOneById(decodedTokenObject.userId);
        if (userDao) {
            const roleDto: Role = await RoleService.getRoleById(userDao._roleId);
            const jwtAuthenticationResponse: JwtAuthenticationResponse = signJwt(userDao._email, userDao._username, userDao._firstName, userDao._lastName, roleDto.name as string);
            if (jwtAuthenticationResponse.refreshToken) {
                userDao._refreshToken = await encrypt(jwtAuthenticationResponse.refreshToken);
                UserRepository.updateOneById(userDao, userDao._userId);
            }
            return jwtAuthenticationResponse;
        } else {
            throw new HandledError(Responses.expiredSession);
        }
    }
}

export default new UserService();