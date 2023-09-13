import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Field, InputType, Int, ObjectType} from "type-graphql";
import User, {UserId} from "./Users";
import Point from "./Points";

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

    @Field(() => [Point], { nullable: true })
    @OneToMany(() => Point, (point) => point.games, {nullable: true})
    @JoinTable()
    points?: Point[] | null;
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
class PlayerData {
    @Field(() => UserId)
    player: UserId;

    @Field(() => Int)
    score: number;
}

@InputType()
export class GameInputWithScore {
    @Field({ nullable: true })
    date?: string;

    @Field({ nullable: true })
    picture?: string;

    @Field({ nullable: true })
    place?: string;

    @Field(() => [PlayerData])
    playersData: PlayerData[];
}

@InputType()
export class GameId {
    @Field()
    id: number;
}

export default Game;