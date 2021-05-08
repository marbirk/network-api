const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");
const faker = require("faker");

const _db = {
  contacts: [
    {
      id: 1,
      name: `${faker.name.findName()}`,
      web: `${faker.internet.url()}`,
      active: `${faker.datatype.boolean()}`,
      tags: [`${faker.random.word()}`, `${faker.random.word()}`],
    },
    {
      id: 2,
      name: `${faker.name.findName()}`,
      web: `${faker.internet.url()}`,
      active: `${faker.datatype.boolean()}`,
      tags: [`${faker.random.word()}`, `${faker.random.word()}`],
    },
    {
      id: 3,
      name: `${faker.name.findName()}`,
      web: `${faker.internet.url()}`,
      active: `${faker.datatype.boolean()}`,
      tags: [`${faker.random.word()}`, `${faker.random.word()}`],
    },
    {
      id: 4,
      name: `${faker.name.findName()}`,
      web: `${faker.internet.url()}`,
      active: `${faker.datatype.boolean()}`,
      tags: [`${faker.random.word()}`, `${faker.random.word()}`],
    },
    {
      id: 5,
      name: `${faker.name.findName()}`,
      web: `${faker.internet.url()}`,
      active: `${faker.datatype.boolean()}`,
      tags: [`${faker.random.word()}`, `${faker.random.word()}`],
    },
  ],
};

const contactHandler = {
  getContact(id) {
    return _db.contacts.find((contact) => contact.id === id);
  },
  getAllContacts() {
    return _db.contacts;
  },
  getAllActiveContacts() {
    return _db.contacts.filter((contact) => contact.active);
  },
};

const schema = graphql.buildSchema(`
    type Contact {
      name: String
      web: String
      tags: [String]
    }
    type Query {
      contact(id: Int!): Contact
      allContacts: [Contact]
      allActiveContacts: [Contact]
    }
  `);

const rootResolver = {
  allContacts: () => {
    return contactHandler.getAllContacts();
  },
  allActiveContacts: () => {
    return contactHandler.getAllActiveContacts();
  },
  contact: (args) => {
    const contact_id = args.id;
    const contact = contactHandler.getContact(contact_id);
    return {
      name: contact.name,
      web: contact.web,
      tags: contact.tags,
    };
  },
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: rootResolver,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(3000);
console.log("GraphQL server listening at localhost:3000/graphql");
