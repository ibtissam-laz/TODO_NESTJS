import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/users/user.entity";
import { NoteCategory } from "src/enums/enums";
@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    noteId: number;
    @CreateDateColumn()
    createdDate: Date;
    @UpdateDateColumn()
    updatedDate: Date;
    @Column({nullable: true})
    title: string;
    @Column({type: 'text'},)
    content: string;
    @Column({
        type: 'simple-enum',
        enum: NoteCategory,
        default: NoteCategory.PERSONAL,
    })
    category: NoteCategory;
    @ManyToOne(() => User, (user) => user.notes,{onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({
        name: 'userId',
    })
    user: User
    
}
export default Note;