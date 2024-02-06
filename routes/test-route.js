const router = require("express").Router();
const testController = require("../controllers/test-controller")

router.post("/createTables", testController.createTables)
router.post("/postLibros", testController.createLibro)

router.get("/getLibros", testController.getLibros)

router.put("/updateLibros", testController.updateLibros)

router.delete("/deleteLibros", testController.deleteLibros)

module.exports = router;