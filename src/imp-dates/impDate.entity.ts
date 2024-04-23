import { DateCategory } from "src/enums/enums";
import { User } from "src/users/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class ImpDate {
    @PrimaryGeneratedColumn()
    impId: number;
    @Column('text')
    event: string;
    @Column()
    impD: Date;
    @CreateDateColumn()
    createdDate: Date;
    @UpdateDateColumn()
    updatedDate: Date;
    @Column({
        type: 'simple-enum',
        enum: DateCategory,
        default: DateCategory.SPECIAL,
    })
    category: DateCategory;
    @ManyToOne(() => User, (user) => user.mdates,{onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({
        name: 'userId',
    })
    user: User
}
export default ImpDate;