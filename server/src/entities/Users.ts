import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Field, InputType, Int, ObjectType} from "type-graphql";
import Game from "./Games";
import Points from "./Points";

@Entity()
@ObjectType()
class User {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column({nullable: true, type: "text"})
    @Field({nullable: true})
    picture?: string;

    @Field(() => [Game], {nullable: true})
    @ManyToMany(() => Game, (game) => game.players, {nullable: true})
    games?: Game[] | null;

    @Field(() => [Points], { nullable: true })
    @ManyToMany(() => Points, (points) => points.users, {nullable: true})
    points?: Points[] | null;
}

@InputType()
export class UserInput {
    @Field()
    name: string;

    @Field({nullable: true})
    picture?: string;
}

export default User;