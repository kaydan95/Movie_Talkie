import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn  } from "typeorm";
import { Articles } from './Articles'

@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id! : number;

    @Column()
    category_title! : string;

    @Column()
    category_img! : string;

    @OneToMany(() => Articles, article => article.category)
    articles? : Articles[];
}