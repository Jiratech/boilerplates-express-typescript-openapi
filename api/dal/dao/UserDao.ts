import { Table, Column, Model, ForeignKey, Unique, DataType } from 'sequelize-typescript';
import RoleDao from './RoleDao';
import { daoModelName } from '../../utils/constants';

@Table({
  tableName: daoModelName.users
})
class UserDao extends Model<UserDao> {

  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID
  })
  private userId: string;
  get _userId(): string {
    return this.userId;
  }
  set _userId(newUserId: string) {
    this.userId = newUserId;
  }

  @Unique
  @Column
  private email: string;
  get _email(): string {
    return this.email;
  }
  set _email(newEmail: string) {
    this.email = newEmail;
  }

  @Unique
  @Column
  private username: string;
  get _username(): string {
    return this.username;
  }
  set _username(newUsername: string) {
    this.username = newUsername;
  }

  @Column
  private password: string;
  get _password(): string {
    return this.password;
  }
  set _password(newPassword: string) {
    this.password = newPassword;
  }
  
  @Column
  private firstName: string;
  get _firstName(): string {
    return this.firstName;
  }
  set _firstName(newFirstName: string) {
    this.firstName = newFirstName;
  }
  
  @Column
  private lastName: string;
  get _lastName(): string {
    return this.lastName;
  }
  set _lastName(newLastName: string) {
    this.lastName = newLastName;
  }

  @Column
  private refreshToken: string;
  get _refreshToken(): string {
    return this.refreshToken;
  }
  set _refreshToken(newrefreshToken: string) {
    this.refreshToken = newrefreshToken;
  }

  @ForeignKey(() => RoleDao)
  @Column
  private roleId: string;
  get _roleId(): string {
    return this.roleId;
  }
  set _roleId(newRoleId: string) {
    this.roleId = newRoleId;
  }

}

export default UserDao;