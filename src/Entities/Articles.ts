import { type } from "os";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn  } from "typeorm";
// import { Type } from "class-transformer";
import { Category } from './Category'
import { Users } from './Users';

@Entity()
export class Articles extends BaseEntity {

    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id! : number;

    @ManyToOne(() => Users, user => user.articles)
    @JoinColumn({name:'userid', referencedColumnName:'id'})
    userid! : Users;

    @Column()
    username! : string;

    @Column({
        type:"varchar",
        length:"10"
    })
    password! : string;

    @Column({
        type:"varchar",
        length:"100"
    })
    title! : string;

    @Column({
        type:"varchar",
        length:"500"
    })
    context! : string;

    @Column()
    img_file? : string;

    @CreateDateColumn()
    createdAt!: string;

    @ManyToOne(() => Category, category => category.articles)
    @JoinColumn({name:'category', referencedColumnName:'id'})
    category! : Category;
    
}