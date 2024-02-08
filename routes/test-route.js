const router = require("express").Router();
const testController = require("../controllers/test-controller")

router.post("/postLibros", testController.createLibro)
router.post("/postEstante", testController.createEstante)

router.get("/getLibros", testController.getLibros)
router.get("/getLibrosById", testController.getLibroById)

router.put("/updateLibros", testController.updateLibros)
router.put("/addToEstante", testController.libroAEstante)

router.delete("/deleteLibros", testController.deleteLibros)

module.exports = router;