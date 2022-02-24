const Evento = require("../models/Events-model");

const getEventos = async (req, res) => {
  const eventos = await Evento.find();

  return res.json({
    ok: true,
    msg: eventos,
  });
};

const crearEventos = async (req, res) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;
    const eventSave = await evento.save();
    res.json({
      ok: true,
      evento: eventSave,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const actualizarEventos = async (req, res) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Evento.findById(id);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "el id no exite ",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene permisos para modificar el evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(id, nuevoEvento, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error,
    });
  }

  return res.json({
    ok: true,
    msg: "actualizarEventos",
  });
};

const eliminarEventos = async (req, res) => {
  console.log(req);
  const id = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Evento.findById(id);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "el id no exite ",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene permisos para eliminar el evento",
      });
    }

    await Evento.findByIdAndDelete(id);

    return res.status(200).json({
      ok: true,
      msg: "evento eliminado",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error,
    });
  }

  return res.json({
    ok: true,
    id: id,
    msg: "eliminarEventos",
  });
};

module.exports = {
  getEventos,
  crearEventos,
  actualizarEventos,
  eliminarEventos,
};
