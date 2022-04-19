import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn  } from "typeorm";
import { Articles } from './Articles'

@Entity()
export class Category extends BaseEntity {

    @PrimaryColumn({ type: "int", name: "id" })
    id! : number;

    @Column()
    category_title! : string;

    @OneToMany(() => Articles, article => article.category)
    articles? : Articles[];
}