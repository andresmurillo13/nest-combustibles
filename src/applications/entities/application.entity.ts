import { User } from 'src/auth/entities/user.entity';
import { Equipment } from 'src/equipment/entities';
import { Plan } from 'src/plans/entities/plan.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, Point, PrimaryGeneratedColumn } from 'typeorm';



@Entity({ name: 'applications' })
export class Application {

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column('timestamp')
    start: Date;

    @Column('timestamp')
    end: Date;

    @Column('text', { nullable: true })
    tipoPlan: string;

    @Column('float')
    kmRuta: number;


    @Column('boolean', {
        default: false
    })
    estado: boolean;

    @Column('text')
    idApplication: string;

    @Column("geometry")
    refInicio: Point

    @Column("geometry")
    refFinal: Point

    @Column('int', { nullable: true })
    pesoCarga: number;

    @Column('text')
    eds: string;

    @Column('int', { nullable: true })
    galones: number;


    @Column('int', { nullable: true })
    valorGalones: number;

    @Column('int', { nullable: true })
    odometro: number;

    @Column('int', { nullable: true })
    valorTotalTrans: number;

    @Column('int', { nullable: true })
    promedioRuta: number;

    @Column('int', { nullable: true })
    consumoIdeal: number;

    @Column('int', { nullable: true })
    perdidaGalones: number;

    @Column('int', { nullable: true })
    medidaSensor1: number;

    @Column('int', { nullable: true })
    medidaSensor2: number;

    @Column('text', {
        array: true,
        nullable: true
    })
    img: string[];


    @ManyToOne(
        () => User,
        (user) => user.application,
        { onDelete: 'RESTRICT', eager: true }

    )
    user: User

    @ManyToOne(
        () => Equipment,
        (equipment) => equipment.application,
        { onDelete: 'RESTRICT', eager: true }

    )
    equipment: Equipment

    @ManyToOne(
        () => Plan,
        (plan) => plan.application,
        { onDelete: 'RESTRICT', eager: true }

    )
    plan: Plan

}
