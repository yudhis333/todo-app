const express = require("express");
const router = express.Router();
const TodosController = require("../controllers/todo_controller");
const auth = require("../middleware/auth")

router.post("/:user_id/todos", TodosController.create);
router.get("/:user_id/todos/", TodosController.getAll);
router.get("/:user_id/todos/:id", TodosController.getOne);
router.put("/:user_id/todos/:id", TodosController.update);
router.delete("/:user_id/todos/:id", TodosController.delete);

module.exports = router;
