import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

export const JwtAndRolesGuard = () =>
  applyDecorators(UseGuards(AuthGuard('jwt')), ApiBearerAuth());
