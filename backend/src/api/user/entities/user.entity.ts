import { Entity, Column, TableInheritance } from 'typeorm';
import { AbstractEntity } from '../../../shared/abstract.entity';
import { UserDto } from '../dtos/user.dto';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'role' } })
export class User extends AbstractEntity<UserDto> {
  @Column({ length: 25 })
  firstName: string;

  @Column({ length: 25 })
  lastName: string;

  @Column({ length: 50, nullable: true })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  active: boolean;

  dtoClass = UserDto;
}
