import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={style.landin}>
      <NavLink to="/countries">
        <button className={style.btn}>INGRESAR</button>
      </NavLink>
    </div>
  );
}
