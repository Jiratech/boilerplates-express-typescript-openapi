import { User, Role } from '../openapi/model/models';
import * as express from 'express';
import UserService from '../services/UserService';
import { Responses } from '../config/Responses';
import { validateRegister } from '../middlewares/fieldsValidator';
import { checkPermission } from '../middlewares/permissionChecker';
import RoleService from '../services/RoleService';

export class UserController {

  static createUser = async (request: any, response: express.Response, next: express.NextFunction) => {
    const roleId: string = request.body.roleId;
    const user: User = request.body;
    const accessToken = request.headers.authorization;
    checkPermission(accessToken, ['admin']);
    validateRegister(user);
    const role: Role = await RoleService.getRoleById(roleId);
    const createdUser: User | null = await UserService.createUser(user, role.name as string);
    response.status(Responses.created.status).send(createdUser);
  }

  static getUsers = async (request: any, response: express.Response, next: express.NextFunction) => {
    const accessToken = request.headers.authorization;
    checkPermission(accessToken, ['admin']);
    const userList: User[] = await UserService.getAllUsers();
    response.send(userList);
  }

  static getUserById = async (request: any, response: express.Response, next: express.NextFunction) => {
    const userId: string = request.params.userId;
    const user: User = await UserService.getUserById(userId);
    response.send(user);
  }

  static modifyUser = async (request: any, response: express.Response, next: express.NextFunction) => {
    const userId: string = request.params.userId;
    const user: User = request.body;
    validateRegister(user);
    const modifiedUser: User = await UserService.modifyUser(user, userId);
    modifiedUser && response.status(Responses.created.status).send(modifiedUser);
  }

  static deleteUser = async (request: any, response: express.Response, next: express.NextFunction) => {
    const userId: string = request.params.userId;
    const isDeleted: boolean = await UserService.deleteUser(userId);
    isDeleted && response.json(Responses.deleted);
  }
}

export default UserController;