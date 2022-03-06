import { type } from "os";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn  } from "typeorm";
// import { Type } from "class-transformer";
import { Category } from './Category'

@Entity()
export class Articles extends BaseEntity {

    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id! : number;

    @Column({
        type:"varchar",
        length:"10"
    })
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

    // @Column({
    //     type: 'int',
    //     width: 11,
    //     nullable: false,
    //     readonly: true,
    //     default: () => '0',
    //     transformer: {
    //         to: (value?: Date) => (!value ? value : Math.round(value.getTime() / 1000)),
    //         from: (value?: number) => (!value ? value : new Date(value * 1000))
    //     },
    // })
    // @Type(() => Date)

    @CreateDateColumn()
    createdAt!: string;

    // @BeforeInsert()
    // updateDateCreation() {
    //     this.createdAt = new Date();
    // }

    @ManyToOne(() => Category, category => category.articles)
    @JoinColumn({name:'category', referencedColumnName:'id'})
    category! : Category;

}