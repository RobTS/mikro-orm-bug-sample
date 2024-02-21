import { defineConfig, MikroORM, Reference } from '@mikro-orm/postgresql';
import { List } from "./entities/List.entity";
import { ListItem } from "./entities/ListItem.entity"; // or any other driver package

const start = async () => {
  const mikroOrmConfig = defineConfig({
    allowGlobalContext: true,
    entities: ['../**/*.entity.{ts,js}'],
    user: "postgres",
    password: "postgres",
    dbName: "mikro-orm-test",
    port: 5432,
    host: "localhost",
    debug: true
  });
  const orm = await MikroORM.init(mikroOrmConfig);
  const generator = orm.getSchemaGenerator();
  await generator.dropSchema();
  await generator.createSchema();

  const list = new List();
  list.name = "TestList";
  await orm.em.persistAndFlush(list);

  for (let i = 0; i < 10; i++) {
    const listItem = new ListItem();
    listItem.index = i;
    listItem.name = `ListItem ${i}`;
    listItem.list = Reference.createFromPK(List, list.id);
    await orm.em.persistAndFlush(listItem)
  }

  const listFromDb = await orm.em.findOne<List>("List", { id: list.id }, { populate: ["items"] as any })

  console.log(listFromDb)
}

start().catch((e) => {
  console.error(e)
})

