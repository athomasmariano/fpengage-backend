// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Valida se a senha de um usuário está correta.
   * @param email O email do usuário
   * @param pass A senha a ser validada
   * @returns O objeto do usuário se a senha for válida, senão null.
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Gera um token JWT para um usuário validado.
   * @param user O objeto do usuário
   * @returns Um objeto com o token de acesso.
   */
  async login(user: any) {
    // A 'carga' do token: as informações que queremos armazenar nele.
    // Guardamos o ID (sub = subject) e o email do usuário.
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}