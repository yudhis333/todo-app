const { users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


class UserController {

    static async getOne(req, res, next) {
        try {
        const { id } = req.params;

        const data = await users.findByPk(id);
        if (!data) throw { name: "notFound" };

        res.status(200).json({
            status: "success",
            message: "data berhasil ditemukan",
            data,
        });
        } catch (err) {
        next(err);
        }
    }

  static async register(req, res, next) {
    try {
      const { email, name, password, username} = req.body;
      if (!email || !name || !password || !username ) {
        throw { name: "nullParameter" };
      }

      const existingUser = await users.findOne({ where: { email } });
      if (existingUser) {
        throw { name: "EmailAlreadyExists" };
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await users.create({
        email,
        name,
        password: hashedPassword,
        username: username,
      });

      res.status(201).json({
        status: "success",
        message: "register berhasil",
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await users.findOne({ where: { email } });
      console.log(user);
      if (!user) {
        throw { name: "invalidCaredential" };
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw { name: "invalidCaredential" };
      }
      const token = jwt.sign({ id: user.id }, "codehorizon");
      res.cookie("access_token", token, { http_only: true }).status(200).json({
        status: "success",
        message: "login berhasil",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

//   static async loginAdmin(req, res, next) {
//     try {
//       const { email, password } = req.body;
//       const user = await users.findOne({ where: { email, role: "admin" } });
//       if (!user) {
//         throw { name: "invalidCaredential" };
//       }

//       const passwordMatch = await bcrypt.compare(password, user.password);
//       if (!passwordMatch) {
//         throw { name: "invalidCaredential" };
//       }
//       const token = jwt.sign({ id: user.id }, "codehorizon");
//       res.status(200).json({
//         status: "success",
//         message: "login berhasil",
//         data: token,
//       });
//     } catch (err) {
//       next(err);
//     }
//   }

//   static async update(req, res, next) {
//     try {
//       const { id } = req.params;
//       const { name, email, username, password, phone_number, photo_url } =
//         req.body;
//       const updateFields = {
//         name,
//         email,
//         username,
//         phone_number,
//       };

//       // Cek apakah photo_url ada dalam permintaan
//       if (password) {
//         // Jika ada, tambahkan ke bidang yang akan diperbarui
//         const hashedPassword = await bcrypt.hash(password, 10);
//         updateFields.password = hashedPassword;
//       }

//       if (photo_url !== undefined) {
//         // Jika photo_url ada dalam permintaan, tambahkan ke bidang yang akan diperbarui
//         updateFields.photo_url = photo_url;
//       }

//       const [updateCount, [updatedItem]] = await users.update(updateFields, {
//         where: { id },
//         returning: true,
//       });
//       const message =
//         updateCount === 1 ? "Data berhasil diupdate" : "Data gagal diupdate";
//       const status = updateCount === 1 ? "success" : "error";
//       const data = updateCount === 1 ? updatedItem : null;
//       res.status(200).json({
//         status,
//         message,
//         data,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async delete(req, res, next) {
//     try {
//       const { id } = req.params;
//       const data = users.findByPk(id);
//       if (!data) {
//         throw { name: "notFound" };
//       }
//       await users.destroy({ where: { id } });
//       res.status(200).json({
//         status: "success",
//         message: "data berhasil dihapus",
//         data,
//       });
//     } catch (err) {
//       next(err);
//     }
//   }
}

module.exports = UserController;
