import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { Note } from "src/notes/note.entity";
import * as bcrypt from 'bcrypt';
import Task from "src/tasks/task.entity";
import { ImpDate } from "src/imp-dates/impDate.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;
    @Column({unique:true, nullable: false})
    email: string;
    @BeforeInsert()
    @BeforeUpdate()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
    @Column({unique:true, nullable: false})
    pass: string;
    @BeforeUpdate()
    async hashPassword() {
        this.pass = await bcrypt.hash(this.pass, 10);
    }
    @Column({nullable: true})
    username?: string;
    @OneToMany(() => Note, (note) => note.user, {
    onDelete: "CASCADE", onUpdate: "CASCADE"})
    notes: Note[]
    @OneToMany(() => Task, (task) => task.user, {
    onDelete: "CASCADE", onUpdate: "CASCADE"})
    tasks: Task[]
    @OneToMany(() => ImpDate, (impDate) => impDate.user, {
    onDelete: "CASCADE", onUpdate: "CASCADE"})
    mdates: ImpDate[]
}
export default User;

