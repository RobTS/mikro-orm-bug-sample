import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { ListItem } from "./ListItem.entity";
import { v4 } from "uuid"

@Entity()
export class List {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();


  @Property({ type: 'text' })
  name: string;

  @OneToMany(() => ListItem, (listItem) => listItem.list, {
    orderBy: [{ index: 'asc' }],
  })
  items = new Collection<ListItem>(this);
}
