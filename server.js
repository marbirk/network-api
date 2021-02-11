const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");

const _db = {
  contacts: [
    {
      id: 1,
      name: "Dragan Vidovic",
      web: "http://www.draganvidovic.com/",
      active: false,
      tags: ["design", "art direction"],
    },
    {
      id: 2,
      name: "Jone Schardt",
      web: "https://joneschardt.de/",
      active: false,
      tags: ["illustration", "photography"],
    },
    {
      id: 3,
      name: "Nils Wiere",
      web: "https://nilswiere.de/",
      active: true,
      tags: ["web design", "frontend", "UI / UX"],
    },
    {
      id: 4,
      name: "Andreas Rissling",
      web: "https://www.gueteklasse-a.de/",
      active: true,
      tags: ["frontend"],
    },
    {
      id: 5,
      name: "Lars Graubner",
      web: "https://larsgraubner.com/",
      active: true,
      tags: ["frontend", "apps"],
    },
    {
      id: 6,
      name: "Institut für persönliche Bildung",
      web: "https://ifpb.eu/",
      active: true,
      tags: ["coaching"],
    },
    {
      id: 7,
      name: "Glücklich in 90 Minuten",
      web: "https://www.gluecklich-in-90-minuten.com/",
      active: true,
      tags: ["musical"],
    },
    {
      id: 8,
      name: "Bianca Gibisch",
      web: "https://biancagibisch.de/",
      active: true,
      tags: ["photography"],
    },
    {
      id: 9,
      name: "Naturheilpraxis Ingrid Berger",
      web: "http://naturheilpraxis-ingrid-berger.de/",
      active: true,
      tags: ["health"],
    },
    {
      id: 10,
      name: "Björn Birkhahn",
      web: "https://500px.com/p/bjoernbirkhahn?view=photos",
      active: true,
      tags: ["photography"],
    },
    {
      id: 11,
      name: "Simon Schmalfeld",
      web: "https://www.riija.graphics/",
      active: true,
      tags: ["interactive design", "apps"],
    },
    {
      id: 12,
      name: "Jennifer Nadolski",
      web: "https://www.jnadolski.com/",
      active: false,
      tags: ["editor", "journalism"],
    },
    {
      id: 13,
      name: "Andrea Kahl",
      web: "https://www.andreakahl.de/",
      active: true,
      tags: ["health"],
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
