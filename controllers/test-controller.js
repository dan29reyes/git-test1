const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_CONNECTION);

async function createTables(req, res) {
  try {
    db.createCollection("Libros", {
      $jsonSchema: {
        bsonType: "object",
        additionalProperties: false,
        required: [
          "_id",
          "nombre",
          "author",
          "pag",
          "publicacion",
          "editorial",
          "ISBN",
          "genero",
          "comentarios",
          "edicion",
        ],
        properties: {
          _id: { bsonType: "double", description: "PK id becomes _id " },
          nombre: { bsonType: "string" },
          author: { bsonType: "string" },
          pag: { bsonType: "double" },
          publicacion: { bsonType: "date" },
          editorial: { bsonType: "string" },
          ISBN: { bsonType: "string" },
          genero: { bsonType: "string" },
          comentarios: { bsonType: "string" },
          edicion: { bsonType: "int" },
        },
      },
      $expr: [],
    });

    db.createCollection("Estantes", {
      $jsonSchema: {
        bsonType: "object",
        additionalProperties: false,
        required: ["_id", "position", "categoria", "libro"],
        properties: {
          _id: { bsonType: "double", description: "PK id becomes _id " },
          position: { bsonType: "double" },
          categoria: { bsonType: "string" },
          libro: { bsonType: "string" },
        },
      },
      $expr: [],
    });

    res.send("Tables created")
  } catch (e) {
    res.send(e);
  }
}

async function createLibro(req, res) {
  try {
    const {
      _id,
      nombre,
      author,
      pag,
      publicacion,
      editorial,
      ISBN,
      genero,
      comentarios,
      edicion,
    } = req.body;
    
    const libro = {
      _id,
      nombre,
      author,
      pag,
      publicacion,
      editorial,
      ISBN,
      genero,
      comentarios,
      edicion,
    };

    const result = await client
      .db("libros")
      .collection("libros")
      .insertOne(libro);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function getLibros(req, res) {
  const result = await client
    .db("libros")
    .collection("libros")
    .find({})
    .toArray();
  res.send(result);
}

async function updateLibros(req, res) {
  try {
    const {
      id,
      nombre,
      author,
      pag,
      publicacion,
      editorial,
      ISBN,
      genero,
      comentarios,
      edicion,
    } = req.body;
    const libro = {
      nombre,
      author,
      pag,
      publicacion,
      editorial,
      ISBN,
      genero,
      comentarios,
      edicion,
    };
    const result = await client
      .db("libros")
      .collection("libros")
      .updateOne({ id: id }, { $set: libro });
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function deleteLibros(req, res) {
  try {
    const { id } = req.body;
    const result = await client
      .db("libros")
      .collection("libros")
      .deleteOne({ _id: id });
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = {
  createTables,
  createLibro,
  getLibros,
  updateLibros,
  deleteLibros,
};
