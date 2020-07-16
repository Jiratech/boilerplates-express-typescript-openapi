import { JwtAuthenticationResponse } from '../openapi/model/jwtAuthenticationResponse';
import { jwtExpiry } from '../utils/constants';
import * as jwt from "jsonwebtoken";
import { HandledError } from '../config/HandledError';

export const verifyAccessToken = (request: any, callbackSuccess: any, callbackError: any): void => {
  const bearerToken: string = <string>request.headers.authorization;
  const accessToken = bearerToken.split(' ')[1];
  jwt.verify(accessToken, process.env.ACCESS_KEY || "", function (error, decoded) {
    if (error) {
      callbackError(new HandledError({ ...error, status: 400 }));
    }
    callbackSuccess(true);
  });
};

export const verifyRefreshToken = (request: any, callbackSuccess: any, callbackError: any): void => {
  const refreshToken: string = <string>request.headers['refreshtoken'];
  jwt.verify(refreshToken, process.env.REFRESH_KEY || "", function (error, decoded) {
    if (error) {
      callbackError(new HandledError({ ...error, status: 400 }));
    }
  });
  callbackSuccess(true);
};

export const signJwt = (email: string, username: string, firstName: string, lastName: string, role: string, userId?: string): JwtAuthenticationResponse => {
  const jwtAuthenticationResponseToken: JwtAuthenticationResponse = new JwtAuthenticationResponse();
  if (email && username && firstName && lastName && role) {
    const accessToken: string = jwt.sign({
      email: email,
      username: username,
      firstName: firstName,
      lastName: lastName,
      role: role
    }, process.env.ACCESS_KEY || "", {
      expiresIn: jwtExpiry.auth
    });
    jwtAuthenticationResponseToken.accessToken = accessToken;
  }
  if (userId) {
    const refreshToken: string = jwt.sign({
      userId: userId,
    }, process.env.REFRESH_KEY || "", {
      expiresIn: jwtExpiry.refresh
    });
    jwtAuthenticationResponseToken.refreshToken = refreshToken;
  }
  return jwtAuthenticationResponseToken;
}

export const decodeRefreshToken = (refreshToken: string): any => {
  return jwt.decode(refreshToken);
};