import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("tweet")
export class Tweet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: String;
}
