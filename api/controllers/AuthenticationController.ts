import * as express from 'express';
import UserService from '../services/UserService';
import { User } from '../openapi/model/user';
import { JwtAuthenticationResponse } from '../openapi/model/jwtAuthenticationResponse';
import { JwtAuthenticationRequest } from '../openapi/model/jwtAuthenticationRequest';
import { roleNames } from '../utils/constants';
import { Responses } from '../config/Responses';
import { validateRegister, validateLogin } from '../middlewares/fieldsValidator';

export class AuthenticationController {

  static register = async (request: any, response: express.Response, next: express.NextFunction) => {
    const user: User = request.body;
    validateRegister(user);
    const createdUser: User | null = await UserService.createUser(user, roleNames.user);
    response.status(Responses.created.status).send(createdUser);
  }

  static login = async (request: any, response: express.Response, next: express.NextFunction) => {
    const jwtAuthenticationRequest: JwtAuthenticationRequest = request.body;
    validateLogin(jwtAuthenticationRequest);
    const jwtAuthenticationResponse: JwtAuthenticationResponse = await UserService.loginUser(jwtAuthenticationRequest);
    response.status(Responses.created.status).send(jwtAuthenticationResponse);
  }

  static refresh = async (request: any, response: express.Response, next: express.NextFunction) => {
    const newJwtAuthenticationResponse: JwtAuthenticationResponse = await UserService.refreshAccessToken(request.headers['refreshtoken'] as string);
    newJwtAuthenticationResponse && response.status(Responses.success.status).send(newJwtAuthenticationResponse);
  }
}

export default AuthenticationController;