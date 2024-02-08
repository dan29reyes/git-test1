const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_CONNECTION);

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
      .db("admin")
      .collection("libros")
      .insertOne(libro);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function getLibros(req, res) {
  const result = await client
    .db("admin")
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
      copias,
      enEstante,
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
      copias,
      enEstante
    };
    const result = await client
      .db("admin")
      .collection("libros")
      .updateOne({ _id: id }, { $set: libro });
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function deleteLibros(req, res) {
  try {
    const { id } = req.body;
    const result = await client
      .db("admin")
      .collection("libros")
      .deleteOne({ _id: id });
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function getLibroById(req, res ){
  try{
    const {id} = req.query;
    const result = await client
      .db("admin")
      .collection("libros")
      .findOne({ _id: parseInt(id) });
    res.status(200).send({
      message: "Libro encontrado",
      data: result
    });
  }catch(e){
    res.status(500).send({
      message: e.message
    })
  }
}

async function createEstante(req, res){
  try{
    const { id, position, categoria } = req.body;
    const result = await client.db("admin").collection("estantes").insertOne({
      _id: id,
      position,
      categoria,
      libros: []
    })
    res.status(200).send({
      message: "Estante creado",
      data: result
    })
  }catch(e){
    res.status(500).send({
      message: e.message
    })
  }
}

async function libroAEstante(req, res ){
  try{
    const { idEstante, idLibro } = req.body;
    const result = await client
      .db("admin")
      .collection("libros")
      .findOne({ _id: idLibro });
    const resultEstante = await client
      .db("admin")
      .collection("estantes")
      .updateOne({ _id: idEstante}, { $push: { libros: result } });
    res.status(200).send({
      message: "Libro agregado al estante",
      data: resultEstante
    })
  }catch(e){
    res.status(500).send({
      message: e.message
    })
  }
}

module.exports = {
  createLibro,
  createEstante,
  getLibros,
  updateLibros,
  deleteLibros,
  getLibroById,
  libroAEstante
};
