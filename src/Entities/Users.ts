import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Articles } from "./Articles";

@Entity()
export class Users extends BaseEntity {

    // 고유 id 생성
    @PrimaryColumn({ type: "int", name: "id" })
    id! : number;

    @Column()
    name! : string;

    @Column()
    username! : string;

    @Column()
    password! : string;

    @OneToMany(() => Articles, article => article.userid)
    articles? : Articles[];

    @Column({ type : "varchar", name : "token"})
    token? : string;
}