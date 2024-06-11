import { compare, hashSync } from 'bcrypt';

export class UtilsService {
  static generateHash(password: string): string {
    return hashSync(password, 10);
  }

  static validateHash(password: string, hash: string): Promise<boolean> {
    return compare(password, hash || '');
  }
}
