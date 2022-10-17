import React from "react";
export default function Actividades(props) {
  return (
    <div>
      <h3> {props.nombre}</h3>
      <h3> {props.temporada}</h3>
      <h3> {props.duracion} </h3>
      <h3> {props.dificultad}</h3>
    </div>
  );
}
