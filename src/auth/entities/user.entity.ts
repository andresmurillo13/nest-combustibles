import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Equipment } from '../../equipment/entities'



@Entity({name:'users'})
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  email: string;

  @Column('text', {
    select: false
  })
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', {
    default: true
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user']
  })
  roles: string[];

  @Column('text', { nullable: true })
  residencia: string;

  @Column('text', { nullable: true })
  img: string;

  @OneToMany(
    () => Equipment,
    (equipment) => equipment.user
  )
  equipment: Equipment;




  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }

}