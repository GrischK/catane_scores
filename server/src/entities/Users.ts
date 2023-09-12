import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
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
    @OneToMany(() => Points, (points) => points.users, {nullable: true})
    points?: Points[] | null;
}

@InputType()
export class UserInput {
    @Field()
    name: string;

    @Field({nullable: true})
    picture?: string;
}

@InputType()
export class UserId {
    @Field()
    id: number;
}

export default User;