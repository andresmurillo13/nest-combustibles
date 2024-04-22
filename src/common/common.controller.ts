import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { CommonService } from './common.service';

enum ModulesAllowed {
  USER = 'user',
  EQUIPMENT = 'equipment',
  APPLICATION = 'application'
}

@Controller('common')
export class CommonController {


  constructor(private readonly commonService: CommonService) { }




  @Get(':module/:term')
  find(
    @Param('module') module: string,
    @Param('term') term: string
  ) {

    switch (module.toLowerCase()) {
      case ModulesAllowed.USER:
        return this.commonService.searchUsers(term);

      case ModulesAllowed.EQUIPMENT:
        return this.commonService.searchEquipments(term);

      case ModulesAllowed.APPLICATION:
        return this.commonService.searchApplications(term);

      default:
        throw new BadRequestException
          (`Módulo '${module}' no válido.`)

    }
  }

}
