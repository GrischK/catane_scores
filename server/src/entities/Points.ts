import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType} from "type-graphql";
import Game from "./Games";
import User from "./Users";

@Entity()
@ObjectType()
class Point {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    score: number;

    @ManyToOne(() => User, (user) => user.points)
    @Field(() => User)
    @JoinTable()
    users: User;

    @ManyToOne(() => Game, (game) => game.points)
    @Field(() => Game)
    @JoinTable()
    games: Game;
}

export default Point;