import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";

export default function Navbar() {
  return (
    <div className={style.Navbar}>
      <li>
        <NavLink to="/countries" className={style.inicio}>
          Inicio
        </NavLink>
      </li>
      <li>
        <NavLink to="/Create" className={style.crearActividad}>
          Crear Actividad
        </NavLink>
      </li>
    </div>
  );
}
