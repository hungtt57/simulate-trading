import EmrUser from '@models/emrUser.model';
import {EmrUserInterface} from "@interfaces/emrUser/emrUser.interface";
import {ListFilterEmrUserDto} from '@dtos/emrUser/emrUser.dto';
import {getRepository} from "typeorm";
import {UserEntity} from "@entity/user.entity";
import { Like } from "typeorm";
class UserService {
  public async getAll(dataFilter: ListFilterEmrUserDto): Promise<{ total: number, currentPage: number, clinics: EmrUserInterface[] }> {
    // const userRepository = getRepository(UserEntity);
    // const user = await userRepository.find({id: 3});
    let perPage = dataFilter.perPage || 10
    let page = dataFilter.page || 1
    let keySearch = dataFilter.keySearch || ''
    let typePage = dataFilter.typePage || ''
    perPage = Number(perPage)
    page = Number(page)
    let queryWhere: any = {}
    if (typePage === 'clinic') {
      queryWhere.role = EmrUser.ROLE_CLINIC
    } else if (typePage === 'group') {
      queryWhere.role = EmrUser.ROLE_GROUP
    }
    if (keySearch) {
      queryWhere.fullName = Like(`%${keySearch}%`)
    }
    const userRepository = getRepository(UserEntity);
    let dataPromise = await Promise.all([
      userRepository.find({
        where: queryWhere,
        take: perPage,
        skip: (perPage * page) - perPage
      }),
      userRepository.count({
        where: queryWhere,
      }),
    ])
    const clinics: EmrUserInterface[] = dataPromise[0]
    const paginateResult = dataPromise[1]
    return {
      clinics: clinics,
      currentPage: page,
      total: paginateResult
    }
  }

}

export default UserService;
