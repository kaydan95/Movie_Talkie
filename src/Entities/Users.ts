import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity {

    // 고유 id 생성
    @PrimaryGeneratedColumn()
    id! : number;

    @Column()
    name! : string;

    @Column()
    username! : string;

    @Column()
    password! : string;
}