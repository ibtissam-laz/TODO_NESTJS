import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import User from "src/users/user.entity";
import { TaskCategory } from "src/enums/enums";
@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    taskId: number;
    @Column({type: 'varchar' ,length: 255})
    tache: string;
    @Column({default: false})
    done: boolean;
    @Column({
        type: 'simple-enum',
        enum: TaskCategory,
        default: TaskCategory.PERSONAL,
    })
    category: TaskCategory;
    @CreateDateColumn()
    createdDate: Date;
    @UpdateDateColumn()
    updatedDate: Date;
    @ManyToOne(() => User, (user) => user.tasks,{onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({
        name: 'userId',
    })
    user: User
    
}
export default Task;