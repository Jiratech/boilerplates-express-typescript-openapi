import { Table, Column, Model, Unique, DataType } from 'sequelize-typescript';
import { daoModelName } from '../../utils/constants';

@Table({
  tableName: daoModelName.roles
})
class RoleDao extends Model<RoleDao> {

  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID
  })
  private roleId: string;
  get _roleId(): string {
    return this.roleId;
  }
  set _roleId(newRoleId: string) {
    this.roleId = newRoleId;
  }

  @Unique
  @Column
  private name: string;
  get _name(): string {
    return this.name;
  }
  set _name(newName: string) {
    this.name = newName;
  }
}

export default RoleDao;