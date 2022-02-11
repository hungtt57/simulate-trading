import { IsDefined } from 'class-validator';

export class AuthDto {
  @IsDefined()
  public email: string;
  @IsDefined()
  public password: string;
}
