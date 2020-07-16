import RoleDao from '../../dal/dao/RoleDao';
import { Role } from '../../openapi/model/role';

class RoleConverter {

    public convertToDto(roleDao: RoleDao): Role {
      const roleDto: Role = new Role();
      roleDto.name = roleDao._name;
      roleDto.roleId = roleDao._roleId;
      return roleDto;
    }

    public convertToDao(roleDto: Role): RoleDao {
      const roleDao: RoleDao = new RoleDao();
      roleDao._name = roleDto.name || '';
      roleDao._roleId = roleDto.roleId || '';
      return roleDao;
    }
}

export default new RoleConverter();
