import { User } from '../openapi/model/user';
import { JwtAuthenticationRequest } from '../openapi/model/jwtAuthenticationRequest';
import { HandledError, HandledErrorList } from '../config/HandledError';
import { Responses } from '../config/Responses';
import { loginMandatoryFieldsList, registerMandatoryFieldsList } from './constants';

export const validateLoginKeyAndValue = (jwtAuthenticationRequest: JwtAuthenticationRequest) => {
  const loginMandatoryFields: string[] = loginMandatoryFieldsList;
  let errorList: HandledErrorList = { errors: [] };
  loginMandatoryFields.forEach(key => {
    if (!jwtAuthenticationRequest[key as keyof JwtAuthenticationRequest] || !Object.keys(jwtAuthenticationRequest).includes(key))
      errorList.errors.push(new HandledError({ name: Responses.badRequest.name, status: Responses.badRequest.status, message: `${key} field is empty or inexistent` }));
  });
  if (errorList.errors.length > 0) throw errorList;
}

export const validateRegisterKeyAndValue = (user: User) => {
  const registerMandatoryFields: string[] = registerMandatoryFieldsList;
  let errorList: HandledErrorList = { errors: [] };
  registerMandatoryFields.forEach(key => {
    if (!user[key as keyof User] || !Object.keys(user).includes(key))
      errorList.errors.push(new HandledError({ name: Responses.badRequest.name, status: Responses.badRequest.status, message: `${key} field is empty or inexistent` }));
  });
  if (errorList.errors.length > 0) throw errorList;
}

module.exports = {
  validateRegisterKeyAndValue,
  validateLoginKeyAndValue
}