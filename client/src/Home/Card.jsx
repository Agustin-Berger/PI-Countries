import React from "react";
import style from "./Card.module.css";

export default function Card(props) {
  return (
    <div className={style.divCard}>
      <h2 className={style.nameCard}>{props.name}</h2>
      <img className={style.banderaCard} src={props.img} alt="bandera" />
      <h3 className={style.continenteCard}> {props.continente} </h3>
    </div>
  );
}
