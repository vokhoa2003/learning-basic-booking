import { BadRequestException } from '@nestjs/common';

export class UserRoleHelper {
  static extractBookingIdentifiers(req: any, dto: any) {
    const role = req.user.role;
    let user_id: number;
    let option_id: number;

    if (!dto.option_id) {
      throw new BadRequestException('Missing option_id in request body');
    }
    option_id = Number(dto.option_id);

    if (role === 'customer') {
      if (!req.user?.id) {
        throw new BadRequestException('Customer user_id not found in token');
      }
      user_id = Number(req.user.id);
    } else if (role === 'admin') {
      if (!dto.user_id) {
        throw new BadRequestException('Admin must specify user_id in body');
      }
      user_id = Number(dto.user_id);
    } else {
      throw new BadRequestException('Invalid role or missing permission');
    }

    return { user_id, option_id };
  }
}
