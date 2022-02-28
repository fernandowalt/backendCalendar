const { Router } = require("express");
const { check } = require("express-validator");
const { validateInputs } = require("../middlewares/validateInputs");
const { validarJWT } = require("../middlewares/validar-jwt");
const {createUser,loginUser,revalidateToken,} = require("../controlers/auth");




const router = Router();

router.post(
  "/new",
  [
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password debe tener 6 caracteres").isLength({ min: 6,}),
    validateInputs

  ],
  createUser
);

router.post("/",
  [
    check("email", "el email no es correcto").isEmail(),
    check("password","la contraseña no es correcta, debe contener minimo 6 caracteres").isLength({ min: 5 }),
    validateInputs
  ],
  loginUser
);

router.get("/renew", validarJWT,revalidateToken);

module.exports = router;
