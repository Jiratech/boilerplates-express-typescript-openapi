import { User } from '../openapi/model/user';
import { HandledError, HandledErrorList } from '../config/HandledError';
import { JwtAuthenticationRequest } from '../openapi/model/jwtAuthenticationRequest';
import { checkEmailRegex, checkPasswordRegex } from '../utils/regexUtils';
import { validateRegisterKeyAndValue, validateLoginKeyAndValue } from '../utils/validateFields';
import { Responses } from '../config/Responses';

export const validateRegister = (user: User) => {
  let errorList: HandledErrorList = { errors: [] };
  validateRegisterKeyAndValue(user);
  if (user.email && user.password) {
    const checkedUserEmail: RegExpMatchArray | null = checkEmailRegex(user.email);
    const checkedUserPassword: RegExpMatchArray | null = checkPasswordRegex(user.password);
    if (!checkedUserEmail) {
      errorList.errors.push(new HandledError(Responses.regexEmailError));
    }
    if (!checkedUserPassword) {
      errorList.errors.push(new HandledError(Responses.regexPasswordError));
    }
    if (checkedUserEmail && checkedUserPassword) return;
    throw errorList;
  } else {
    throw new HandledError(Responses.badRequest);
  }
}

export const validateLogin = (jwtAuthenticationRequest: JwtAuthenticationRequest) => {
    validateLoginKeyAndValue(jwtAuthenticationRequest);
    if (jwtAuthenticationRequest.email) {
      const checkedUserEmail: RegExpMatchArray | null = checkEmailRegex(jwtAuthenticationRequest.email);
      if (checkedUserEmail) {
        return;
      } else {
        throw new HandledError(Responses.regexEmailError);
      }
    } else {
      throw new HandledError(Responses.badRequest);
    }
}