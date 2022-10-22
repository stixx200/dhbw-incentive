import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { TransactionService } from './transaction.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../users/role.enum';
import { OwnRouteOrAdminGuard } from '../users/guards/own-route-or-admin.guard';
import { AssignedUsersGuard } from '../users/guards/assigned-users.guard';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { TransactionDto } from './dto/transaction.dto';

@Controller('transactions')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('')
  @UseGuards(OwnRouteOrAdminGuard, AssignedUsersGuard)
  @ApiResponse({ type: () => TransactionDto, isArray: true })
  async getTransactionsForUser(
    @Request() request,
    @Query('userId') userId: string,
  ) {
    if (!userId) {
      throw new BadRequestException({ error: 'userId query missing' });
    }
    return this.transactionService.getTransactionsForUser(userId);
  }

  @Roles(Role.Teamleader, Role.Administrator)
  @UseGuards(AssignedUsersGuard)
  @Post('')
  @ApiBody({ type: () => CreateTransactionDto })
  @ApiResponse({ type: () => TransactionDto })
  async createTransaction(
    @Request() request,
    @Body() transactionToCreate: CreateTransactionDto,
  ) {
    return this.transactionService.createTransaction(
      request.user._id,
      transactionToCreate,
    );
  }
}
