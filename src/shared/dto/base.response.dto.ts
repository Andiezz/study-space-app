import { ApiProperty } from '@nestjs/swagger';
import { ResponseCodeConstant } from '../constants/ResponseConstants';

export class BaseResponse<T>{
  @ApiProperty()
  public data : T;
  @ApiProperty({type: Date})
  public timestamp: string = new Date().toISOString();
  @ApiProperty({type: String})
  public responseCode: ResponseCodeConstant = ResponseCodeConstant.SUCCESS;
  public message?: string;
  constructor(code: ResponseCodeConstant, msg?: string, data?: T){
    this.data = data;
    this.responseCode = code;
    this.message = msg;
  }

  public static ok<T>(data: T): BaseResponse<T>{
    return new BaseResponse(ResponseCodeConstant.SUCCESS,'', data);
  }

  public static notFound<T>(): BaseResponse<T>{
    return new BaseResponse(ResponseCodeConstant.RESOURCE_NOTFOUND, undefined);
  }

  public static badRequest(msg: string){
    return new BaseResponse(ResponseCodeConstant.BAD_REQUEST, msg);
  }

  public static badRequestWithData<T>(data: T){
    return new BaseResponse(ResponseCodeConstant.BAD_REQUEST, '', data);
  }
}