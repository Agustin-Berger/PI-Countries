import React from "react";
import { paisPorId } from "../redux/accion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Actividad } from "./Actividad.jsx";
import style from "./Detalle.module.css";
import Navbar from "../NavBar/NavBar";

export default function Detalle(props) {
  const dispatch = useDispatch();

  const elPais = useSelector((state) => state.countryId);
  useEffect(() => {
    dispatch(paisPorId(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  console.log(elPais.activities, "lalalalala", elPais, "lololololo");
  return (
    <div className={style.detallegeneral}>
      <div>
        <Navbar />
      </div>
      <img className={style.bandera} src={elPais.img} alt="bandera" />
      <h2 className={style.pais}>{elPais.name}</h2>
      <div className={style.formulario}>
        <h4 className={style.continente}>Continente: {elPais.continente}</h4>
        <h4 className={style.id}>ID: {elPais.id}</h4>
        <h4 className={style.onu}>ONU: {elPais.onu}</h4>
        <h4 className={style.capital}>Capital: {elPais.capital}</h4>
        <h4 className={style.subregion}>Subregion : {elPais.subregion}</h4>
        <h3 className={style.area}>Area:{elPais.area}M2</h3>
        <h3 className={style.poblacion}>
          Poblacion:{elPais.poblacion} de habitantes
        </h3>
      </div>
      <h2 className={style.actividades}>Actividades:</h2>
      <div className={style.caja}>
        {elPais.activities ? (
          elPais.activities.map((e) => {
            return (
              <div className={style.cajaact}>
                <h3 className={style.nombre}>Nombre:{e.nombre}</h3>
                <h4 className={style.temporada}> Temporada:{e.temporada}</h4>
                <h4 className={style.duracion}> Duracion:{e.duracion}HS</h4>
                <h4 className={style.dificultad}> Dificultad:{e.dificultad}</h4>
              </div>
            );
          })
        ) : (
          <h3 className={style.noactividad}>No se registran actividades</h3>
        )}
      </div>
    </div>
  );
}
