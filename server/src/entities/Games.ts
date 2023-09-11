import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Field, InputType, Int, ObjectType} from "type-graphql";
import User from "./Users";
import Points from "./Points";

@Entity()
@ObjectType()
class Game {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column({nullable: true})
    @Field({nullable: true})
    date?: string;

    @Field(() => [User])
    @ManyToMany(() => User, (user) => user.games)
    @JoinTable()
    players: User[];

    @Column({nullable: true})
    @Field({nullable: true})
    place?: string;

    @Column({nullable: true})
    @Field({nullable: true})
    picture?: string;

    @Field(() => [Points], { nullable: true })
    @ManyToMany(() => Points, (points) => points.games, {nullable: true})
    @JoinTable()
    points?: Points[] | null;
}

@InputType()
export class GameInput {
    @Field({nullable: true})
    date?: string;

    @Field(() => [UserId])
    players: UserId[];

    @Field({nullable: true})
    picture?: string;

    @Field({nullable: true})
    place?: string;
}

@InputType()
export class UserId {
    @Field()
    id: number;
}

export default Game;