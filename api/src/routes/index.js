const { Router } = require("express");
const axios = require("axios");
const models = require("./funciones");
const { Country, Activity } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries", async (req, res) => {
  const { name } = req.query;
  if (name) {
    let respuesta = await models.countryName(name);

    if (!respuesta) return res.status(400).send("pais no encontrado");
    return res.json([respuesta]);
  }
  let respuesta = await models.searchTotal();
  return res.json(respuesta);
});
router.get("/countries/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let respuesta = await models.idCountry(id);
    return res.json(respuesta);
  } catch (error) {
    res.send(error, "Pais no encontrado");
  }
});

router.post("/activities", async (req, res) => {
  let { nombre, dificultad, duracion, temporada, pais } = req.body;
  temporada = temporada.join(", ");

  const respuesta = await Activity.create({
    nombre,
    dificultad,
    duracion,
    temporada,
  });
  const countryActivity = await Country.findAll({ where: { name: pais } });
  respuesta.addCountry(countryActivity);
  res.send("actividad creada");
});
router.get("/activities_creadas", async (req, res) => {
  let respuesta = await models.actividades();
  return res.json(respuesta);
});

module.exports = router;
