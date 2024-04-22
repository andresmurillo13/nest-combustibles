import { Application } from "src/applications/entities/application.entity";
import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'plans' })
export class Plan {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    configuracion: string;

    @Column('int')
    rendimiento: number;


    @ManyToOne(
        () => User,
        (user) => user.plan,
        { onDelete: 'RESTRICT', eager: true }
    )
    user: User


    
    @OneToMany(
        () => Application,
        (application) => application.plan,
        { onDelete: 'RESTRICT' }

    )
    application: Application




}





