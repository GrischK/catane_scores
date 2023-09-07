import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Field, InputType, Int, ObjectType} from "type-graphql";
import Game from "./Games";

@Entity()
@ObjectType()
class User {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column({nullable: true})
    @Field({nullable: true})
    picture?: string;

    @Field(() => [Game])
    @ManyToMany(() => Game, (game) => game.players, {nullable: true} )
    games: Game[] | null;
}

@InputType()
export class UserInput {
    @Field()
    name: string;

    @Field({nullable: true})
    picture?: string;
}

export default User;