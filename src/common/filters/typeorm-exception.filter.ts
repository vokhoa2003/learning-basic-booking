import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Trường hợp lỗi từ TypeORM
    if (exception instanceof QueryFailedError) {
      const driverError = (exception as any).driverError || {};
      const code = driverError.errno;

      switch (code) {
        case 1062: // Duplicate entry
          return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Duplicate entry: record already exists',
            sqlMessage: driverError.sqlMessage,
          });

        case 1451: // Cannot delete or update parent row
          return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Cannot delete or update: foreign key constraint fails',
            sqlMessage: driverError.sqlMessage,
          });

        case 1452: // Cannot add or update child row
          return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Foreign key constraint fails: related record not found',
            sqlMessage: driverError.sqlMessage,
          });

        default:
          return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Database error',
            error: driverError.sqlMessage || exception.message,
          });
      }
    }

    // Trường hợp lỗi BadRequest của NestJS (từ validation, DTO,...)
    if (exception instanceof BadRequestException) {
      const responseBody = exception.getResponse();
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: (responseBody as any).message || 'Bad request',
      });
    }

    // Trường hợp lỗi chưa được xử lý rõ
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Unexpected error occurred',
      error: exception.message || exception,
    });
  }
}
