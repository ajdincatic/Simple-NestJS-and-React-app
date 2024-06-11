import { ChildEntity, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Photo } from './photo.entity';

@ChildEntity()
export class Client extends User {
  @Column({ nullable: true })
  avatarUrl: string;

  @OneToMany(() => Photo, (photo) => photo.client)
  photos: Photo[];
}
