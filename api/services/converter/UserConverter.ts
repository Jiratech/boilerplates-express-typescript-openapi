import UserDao from '../../dal/dao/UserDao';
import { User } from '../../openapi/model/user';
class UserConverter {

    public convertToDto(userDao: UserDao): User {
        const userDto: User = new User();
        userDto.userId = userDao._userId;
        userDto.email = userDao._email;
        userDto.username = userDao._username;
        userDto.firstName = userDao._firstName;
        userDto.lastName = userDao._lastName;
        userDto.roleId = userDao._roleId;
        return userDto;
    }

    public convertToDao(userDto: User): UserDao {
        const userDao: UserDao = new UserDao();
        userDao._email = userDto.email || '';
        userDao._username = userDto.username || '';
        userDao._password = userDto.password || '';
        userDao._firstName = userDto.firstName || '';
        userDao._lastName = userDto.lastName || '';
        userDao._roleId = userDto.roleId || '';
        return userDao;
    }
}

export default new UserConverter();
