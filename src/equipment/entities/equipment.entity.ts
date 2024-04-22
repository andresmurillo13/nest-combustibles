import { Application } from 'src/applications/entities/application.entity';
import { User } from '../../auth/entities/user.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'equipments' })
export class Equipment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    modelo: string;

    @Column('text')
    placa: string;

    @Column('int', { nullable: true })
    horasTrabajo: number;

    @Column('int', { nullable: true })
    kilometraje: number;

    @Column('text', { nullable: true })
    marcaMotor: string;

    @Column('text', { nullable: true })
    marcaVehiculo: string;

    @Column('text', { nullable: true })
    referenciaMotor: string;

    @Column('text', { nullable: true })
    img: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('int', { nullable: true })
    numeroMotor: number;

    @Column('int', { nullable: true })
    capacidadTanque1: number;

    @Column('int', { nullable: true })
    capacidadTanque2: number;

    @Column('int', { nullable: true })
    capacidadTanqueTotal: number;

    @Column('int', { nullable: true })
    vin: number;

    @Column('int', { nullable: true })
    peso: number;

    @Column('text', {
        array: true,
        nullable: true
    })
    configuracion: string[];

    @Column('text', {
        array: true,
        nullable: true
    })
    conductores: string[];


    @ManyToOne(
        () => User,
        (user) => user.equipment,
        { onDelete: 'RESTRICT', eager: true }

    )
    user: User

    @OneToMany(
        () => Application,
        (application) => application.equipment,
        { onDelete: 'RESTRICT' }

    )
    application: Application


}
