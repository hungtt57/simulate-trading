import {IsNumber} from 'class-validator';

export class ListFilterEmrUserDto {
  @IsNumber()
  public page: number;
  @IsNumber()
  public perPage: number;
  public keySearch: string;
  public typePage: string;
}
