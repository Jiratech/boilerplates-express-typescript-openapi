import { Role } from '../openapi/model/role';
import RoleService from '../services/RoleService';
import { Request, Response, NextFunction } from 'express';
import { checkPermission } from '../middlewares/permissionChecker';

class RoleController {
  static getAllRoles = async (request: Request, response: Response, next: NextFunction) => {
    const accessToken = request.headers.authorization;
    accessToken && checkPermission(accessToken, ['admin']);
    const roleList: Role[] = await RoleService.getAllRoles();
    response.send(roleList);
  }
}

export default RoleController;