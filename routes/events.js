const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validateInputs } = require("../middlewares/validateInputs");

const {
  getEventos,
  crearEventos,
  actualizarEventos,
  eliminarEventos,
} = require("../controlers/events");

const router = Router();

router.use(validarJWT);

router.get("/", getEventos);

router.post(
  "/",
  [
    check("title", "el titulo es requerido").not().isEmpty(),
    check("start", "fecha de inicio requerida").isDate(),
    check("end", "fecha de finalizacion requerida").isDate(),
    validateInputs,
  ],
  crearEventos
);

router.put("/:id", actualizarEventos);

router.delete("/:id", eliminarEventos);

module.exports = router;
