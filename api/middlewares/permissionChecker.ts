import { HandledError } from '../config/HandledError';
import { Responses } from '../config/Responses';
import * as jwt from "jsonwebtoken";

export const checkPermission = (accessToken: string, roles: string[]) => {
    const token = accessToken.split(' ')[1];
    let jwtPayload: any = jwt.decode(token);
    if (typeof jwtPayload === 'object' && jwtPayload.role && !roles.includes(jwtPayload.role))
        throw new HandledError(Responses.forbidden);
    return;
}
