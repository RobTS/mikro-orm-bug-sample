import { Entity, ManyToOne, PrimaryKey, Property, Ref } from "@mikro-orm/core";
import { List } from "./List.entity";
import { v4 } from "uuid"

@Entity()
export class ListItem {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();


  @Property({ type: 'text' })
  name: string;

  @Property()
  index: number;


  @ManyToOne(() => List, {
    ref: true,
    nullable: false,
  })
  list!: Ref<List>;

}
