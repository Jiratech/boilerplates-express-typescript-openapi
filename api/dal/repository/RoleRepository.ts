import RoleDao from '../dao/RoleDao';

export class RoleRepository {

    public async findAll(): Promise<Array<RoleDao>> {
        const roleList: RoleDao[] = await RoleDao.findAll();
        return roleList;
    }

    public async findOneByName(name: string): Promise<RoleDao | null> {
        const role: RoleDao | null = await RoleDao.findOne({ where: { name: name } });
        return role;
    }

    public async findOneById(roleId: string): Promise<RoleDao | null> {
        const role: RoleDao | null = await RoleDao.findByPk(roleId);
        return role;
    }

    public async findOrCreateRole(roleName: string): Promise<RoleDao> {
        const roleList: [RoleDao, boolean] = await RoleDao.findOrCreate({ where: { name: roleName }, defaults: { name: roleName } });
        const role: RoleDao = roleList[0];
        return role;
    }
}

export default new RoleRepository();