import UserDao from '../dao/UserDao';

export class UserRepository {

    public async createUser(userDao: UserDao): Promise<UserDao> {
        const createdUser: UserDao = await userDao.save();
        return createdUser;
    }

    public async findAll(): Promise<Array<UserDao>> {
        const userList: UserDao[] = await UserDao.findAll();
        return userList;
    }

    public async findOneByEmail(email: string): Promise<UserDao | null> {
        const userDao: UserDao | null = await UserDao.findOne({ where: { email: email } });
        return userDao;
    }

    public async findOneByUsername(username: string): Promise<UserDao | null> {
        const userDao: UserDao | null = await UserDao.findOne({ where: { username: username } });
        return userDao;
    }

    public async findOneByRefreshToken(refreshToken: string): Promise<UserDao | null> {
        const userDao: UserDao | null = await UserDao.findOne({ where: { refreshToken: refreshToken } });
        return userDao;
    }

    public async findOneById(userId: string): Promise<UserDao | null> {
        const userDao: UserDao | null = await UserDao.findByPk(userId);
        return userDao;
    }

    public async updateOneById(userDao: UserDao, userId: string): Promise<UserDao> {
        const updatedUser: [number, UserDao[]] = await UserDao.update({
            email: userDao._email,
            username: userDao._username,
            password: userDao._password,
            firstName: userDao._firstName,
            lastName: userDao._lastName,
            refreshToken: userDao._refreshToken
        }, { where: { userId: userId }, returning: true });
        const updatedUserObject: UserDao = updatedUser && updatedUser[1][0];
        return updatedUserObject;
    }

    public async deleteOneById(userId: string): Promise<boolean> {
        const deletedUser: number = await UserDao.destroy({ where: { userId: userId } });
        const isUserDeleted: boolean = Boolean(deletedUser);
        return isUserDeleted;
    }
}

export default new UserRepository();