export class UserRegisterDto {
  name: string;
  email: string;
  account: string;
  password: string;
}

export class UserLoginDto {
  account: string;
  password: string;
}
