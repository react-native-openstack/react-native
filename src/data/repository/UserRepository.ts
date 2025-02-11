import RemoteDataSource from '../datasource/RemoteDataSource';
import {FindUserByIdDto} from '../dto/user/FindUserByIdDto';

const UserRepository = (() => {
  return {
    findUserById: async (id: string) => {
      try {
        const dto = await RemoteDataSource.findUserById(id);
        return FindUserByIdDto.getData(dto);
      } catch (error) {
        console.error(`Failed to fetch user with ID ${id}:`, error);
        throw new Error(`Failed to fetch user with ID ${id}`);
      }
    },
  };
})();

export default UserRepository;
