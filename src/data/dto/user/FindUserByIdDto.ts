import Dto from '@/data/dto/Dto';
import {FindByIdResult} from '@/data/utils/FirestoreApi';
import User from '@/domain/model/User';

export type FindUserByIdDto = Dto<User | null> & {};

export namespace FindUserByIdDto {
  export const getData = (dto: FindByIdResult<FindUserByIdDto>) => {
    const data = dto?.result ?? {};
    return {
      ...data,
      set id(value: string) {
        data.id = value;
      },
      get id() {
        return data.id ?? '';
      },
    };
  };
}
