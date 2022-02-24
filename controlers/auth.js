const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { generarJWT } = require("../helpers/jwt");
const Users = require("../models/Users-model");

const createUser = async (req, res) => {
  
  const { email, password } = req.body;

  try {
    let user = await Users.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "el email ya existe",
      });
    }

    user = new Users(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // generar jwt

    const token = await generarJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "por  favor comunicarse con el administrador",
    });
  }
};

const loginUser = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "no existe un usuario con ese email",
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "password incorrecto",
      });
    }

    //gererar jwt

    const token = await generarJWT(user.id, user.name);
    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "por  favor comunicarse con el administrador",
    });
  }
};

const revalidateToken = async (req, res) => {
  const { uid, name } = req;
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    token: token,
  });
};

module.exports = { createUser, loginUser, revalidateToken };
