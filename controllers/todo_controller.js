const { todos } = require("../models");
//const axios = require("axios");
class TodosController {
  static async getAll(req, res, next) {
    try {
      const { user_id } = req.params;

      const data = await todos.findAll({
        where: { user_id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!data[0]) {
        throw { name: "notFound" };
      }

      res.status(200).json({
        status: "success",
        message: "data berhasil ditemukan",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { user_id, id } = req.params;

      const user = await todos.findByPk(user_id);
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const todo = await todos.findOne({ where: { user_id, id } });
      console.log(todo);
      if (!todo) {
        return res
          .status(404)
          .json({ message: "Todo not found for this user" });
      }
      // const data = await todos.findByPk(user_id & id);
      // if (!data) throw { name: "notFound" };

      res.status(200).json({
        status: "success",
        message: "data berhasil ditemukan",
        todo,
      });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { title, description, status, priority, duedate, duetime } = req.body;
      const { user_id } = req.params;

      // if (
      //   !title ||
      //   !description ||
      //   !status ||
      //   !priority ||
      //   !duedate ||
      //   !duetime
      // ) {
      //   throw { name: "nullParameter" };
      // }

      const data = await todos.create({
        user_id: user_id,
        title,
        description,
        status,
        priority,
        duedate,
        duetime,
      });
      console.log(data);

      res.status(200).json({
        status: "success",
        message: "data berhasil dibuat",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { user_id, id } = req.params;
      const { title, description, status, priority, duedate, duetime } = req.body;
      if (
        !title ||
        !description ||
        !status ||
        !priority ||
        !duedate ||
        !duetime
      ) {
        throw { name: "nullParameter" };
      }

      const [updateCount, [updatedItem]] = await todos.update(
        {
          user_id: user_id,
          title,
          description,
          status,
          priority,
          duedate,
          duetime,  
        },
        { where: { id, user_id }, returning: true }
      );
      const message =
        updateCount === 1 ? "Data berhasil diupdate" : "Data gagal diupdate";
      const status_data = updateCount === 1 ? "success" : "error";
      const data = updateCount === 1 ? updatedItem : null;
      console.log(data);
      res.status(200).json({
        status_data,
        message,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const { user_id, id } = req.params;

    try {

      const todo = await todos.findOne({ where: { user_id, id } });
      if (!todo) {
        return res
          .status(404)
          .json({ message: "Todo not found for this user" });
      }

      await todo.destroy(); // Menghapus todo dari database

      return res.status(204).json({ message: "Data berhasil dihapus" }); // Mengirim respon tanpa konten (no content)
    } catch (error) {
      //console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = TodosController;

