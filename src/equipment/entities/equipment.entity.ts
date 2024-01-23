import { User } from '../../auth/entities/user.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'equipments' })
export class Equipment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    placa: string;

    @Column('text')
    modelo: string;

    @ManyToOne(
        () => User,
        (user) => user.equipment,
        { eager: true }
    )
    user: User


}
