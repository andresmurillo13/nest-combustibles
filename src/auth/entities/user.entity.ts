import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Equipment } from '../../equipment/entities'
import { Application } from 'src/applications/entities/application.entity';
import { Plan } from 'src/plans/entities/plan.entity';



@Entity({ name: 'users' })
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

  @Column('text', { nullable: true })
  cargo: string;

  @Column('numeric', { nullable: true })
  telefono: number;

  @Column('text', { nullable: true })
  jefeInmediato: string;


  @Column('bool', {
    default: true
  })
  isActive: boolean;

  @Column('text', {
    nullable: false,
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
    (equipment) => equipment.user,
  )
  equipment: Equipment;


  @OneToMany(
    () => Application,
    (application) => application.user,
  )
  application: Application;


  @OneToMany(
    () => Plan,
    (plan) => plan.user,
  )
  plan: Plan;


  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }



}