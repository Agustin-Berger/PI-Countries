const axios = require("axios");
const e = require("express");
const { Country, Activity } = require("../db.js");

const country = async () => {
  const paises = (await axios.get("https://restcountries.com/v3/all")).data;
  const mapiado = paises.map((e) => {
    return {
      pais: e.name.common,
      bandera: e.flags,
      continente: e.region,
      subContinente: e.subregion ? e.subregion : "no tiene subregion",
      codigo: e.cca3,
      capital: e.capital ? e.capital[0] : "no tiene capital",
      area: e.area,
      poblacion: e.population,
      zonaHoraria: e.timezones[0],
      onu: e.unMember,
    };
  });

  mapiado.forEach((e) => {
    Country.findOrCreate({
      include: {
        model: Activity,
        attributes: ["nombre"],
      },
      where: {
        name: e.pais,
        img: e.bandera[0],
        continente: e.continente,
        subregion: e.subContinente,
        id: e.codigo,
        capital: e.capital,
        area: e.area,
        poblacion: e.poblacion,
        zonaHoraria: e.zonaHoraria,
        onu: e.onu,
      },
    });
  });
  const allPais = await Country.findAll();
  return allPais;
};
const countryName = async (name) => {
  // const paises = (await axios.get(`https://restcountries.com/v3/name/${name}`))
  //   .data;
  // const mapiado = paises.map((e) => {
  //   return {
  //     id: e.cca3,
  //     name: e.name.common,
  //     img: e.flags[0],
  //     continente: e.region,
  //     subContinente: e.subregion ? e.subregion : "no tiene subregion",
  //     codigo: e.cca3,
  //     capital: e.capital ? e.capital[0] : "no tiene capital",
  //     area: e.area,
  //     poblacion: e.population,
  //     zonaHoraria: e.timezones[0],
  //     onu: e.unMember,
  //   };
  // });
  let parametro = name;
  parametro = parametro.charAt(0).toUpperCase() + parametro.slice(1);
  console.log(parametro);
  const allPais = await Country.findOne({
    where: {
      name: parametro,
    },
  });
  console.log(allPais, "un pais");
  return allPais;
};

const idCountry = async (id) => {
  // const paises = (await axios.get(`https://restcountries.com/v3/alpha/${id}`))
  //   .data;
  // const mapiado = paises.map((e) => {
  //   return {
  //     pais: e.name.common,
  //     bandera: e.flags,
  //     continente: e.region,
  //     subContinente: e.subregion ? e.subregion : "no tiene subregion",
  //     codigo: e.cca3,
  //     capital: e.capital ? e.capital[0] : "no tiene capital",
  //     area: e.area,
  //     poblacion: e.population,
  //     zonaHoraria: e.timezones[0],
  //     onu: e.unMember,
  //   };
  // });

  // mapiado.forEach(async (e) => {
  //   await Country.findOrCreate({
  //     where: {
  //       name: e.pais,
  //       img: e.bandera[0],
  //       continente: e.continente,
  //       subregion: e.subContinente,
  //       id: e.codigo,
  //       capital: e.capital,
  //       area: e.area,
  //       poblacion: e.poblacion,
  //       zonaHoraria: e.zonaHoraria,
  //       onu: e.onu,
  //     },
  //   });
  // });
  // const allPais = await Country.findAll();
  // console.log(allPais, "por id !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  // return allPais;
  const countrymatch = await Country.findOne({
    include: {
      model: Activity,
      attributes: ["nombre", "dificultad", "duracion", "temporada"],
    },
    where: {
      id: id,
    },
  });
  return countrymatch;
};
const searchDb = async () => {
  // let search = (
  //   await Country.findAll({
  //     include: {
  //       model: Activity,
  //       attributes: ["nombre"],
  //     },
  //   })
  // ).map((e) => e.dataValues);
  // console.log(search, "eeeeee");
  // // const find = search.map((e) => {
  // //   return {
  // //     id: e.id,
  // //     pais: e.pais,
  // //     bandera: e.bandera,
  // //     continente: e.continente,
  // //     subContinente: e.subContinente,
  // //     codigo: e.codigo,
  // //     capital: e.capital,
  // //     aera: e.area,
  // //     poblacion: e.poblacion,
  // //     zonaHoraria: e.zonaHoraria,
  // //     onu: e.onu,
  // //     actividad: e.activities[0]
  // //   };
  // // });
  // return search;
  const countrymatch = await Country.findAll({
    include: {
      model: Activity,
      attributes: ["nombre", "dificultad", "duracion", "temporada"],
    },
  });
  console.log(countrymatch, "Sdasdasdasdsad");
  return countrymatch;
};
const searchTotal = async () => {
  const datosApi = await country();
  const datosDb = await searchDb();

  return [...datosDb];
};

const actividades = async () => {
  let search = await Activity.findAll({
    include: {
      model: Country,
      attributes: ["name", "img"],
    },
  });
  const mapiadito = search.map((e) => {
    return {
      nombre: e.nombre,
      duracion: e.duracion,
      dificultad: e.dificultad,
      temporada: e.temporada,
    };
  });
  console.log(mapiadito, "LLLLLLLLL");
  return search;
};

module.exports = {
  country,
  countryName,
  idCountry,
  searchTotal,
  actividades,
};
