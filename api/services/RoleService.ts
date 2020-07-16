import { Role } from '../openapi/model/role';
import RoleDao from '../dal/dao/RoleDao';
import RoleConverter from './converter/RoleConverter';
import RoleRepository from '../dal/repository/RoleRepository';
import { HandledError } from '../config/HandledError';
import { Responses } from '../config/Responses';

export class RoleService {

    public async createRoles(roleList: string[]) {
      const promiseArray:Promise<RoleDao>[] = [];
      roleList.forEach(roleName => {
          promiseArray.push(RoleRepository.findOrCreateRole(roleName));
      });
      await Promise.all(promiseArray);
    }

    public async getAllRoles(): Promise<Array<Role>> {
        const roleList: RoleDao[] = await RoleRepository.findAll();
        const roleListDto: Role[] = roleList.map(role => {
            return RoleConverter.convertToDto(role);
        });
        return roleListDto;
    }

    public async getRoleById(id: string): Promise<Role> {
        const foundRole: RoleDao | null = await RoleRepository.findOneById(id);
        if (foundRole) {
            const role: Role = RoleConverter.convertToDto(foundRole);
            if (role.name) {
                return role;
            } else {
                throw new HandledError(Responses.notFound);
            }
        } else {
            throw new HandledError(Responses.notFound);
        }
    }

    public async getIdByUserRoleName(roleName: string): Promise<string> {
        const foundRole: RoleDao | null = await RoleRepository.findOneByName(roleName);
        if (foundRole) {
            const role: Role = RoleConverter.convertToDto(foundRole);
            if (role.roleId) {
                return role.roleId
            } else {
                throw new HandledError(Responses.notFound);
            }
        } else {
            throw new HandledError(Responses.notFound);
        }
    }

}

export default new RoleService();