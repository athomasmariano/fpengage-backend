// src/auth/auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // Primeiro, validamos o usuário
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      // Se a validação falhar, lançamos um erro.
      // O NestJS o converterá em uma resposta HTTP 401 Unauthorized.
      throw new Error('Credenciais inválidas');
    }
    // Se a validação for bem-sucedida, geramos e retornamos o token.
    return this.authService.login(user);
  }
}