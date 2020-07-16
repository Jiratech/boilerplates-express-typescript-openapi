export const roleNames = { admin: 'admin', user: 'user' };

export const registerMandatoryFieldsList: string[] = ['email', 'username', 'password', 'firstName', 'lastName'];

export const loginMandatoryFieldsList: string[] = ['email', 'password'];

export const jwtExpiry = {
    auth: '10m',
    refresh: '30d'
}

export const daoModelName = {
    users: "users",
    roles: "roles"
}

export const adminUser = {
    "email": process.env.ADMIN_EMAIL,
    "username": process.env.ADMIN_USER,
    "password": process.env.ADMIN_PASS,
    "lastName": process.env.ADMIN_USER,
    "firstName": process.env.ADMIN_USER
};