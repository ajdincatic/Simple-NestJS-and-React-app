import { Entity, Column, ManyToOne } from 'typeorm';
import { Client } from './client.entity';
import { PhotoDto } from '../dtos/photo.dto';
import { AbstractEntity } from '../../../shared/abstract.entity';

@Entity()
export class Photo extends AbstractEntity<PhotoDto> {
  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => Client, (client) => client.photos)
  client: Client;

  dtoClass = PhotoDto;
}
