import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType} from "type-graphql";
import Game from "./Games";
import User from "./Users";

@Entity()
@ObjectType()
class Score {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    score: number;

    @ManyToOne(() => User, (user) => user.scores)
    @Field(() => User)
    @JoinTable()
    player: User;

    @ManyToOne(() => Game, (game) => game.scores)
    @Field(() => Game)
    @JoinTable()
    game: Game;
}

export default Score;