import React from "react";
import style from "./Paginado.module.css";
export default function Paginado({ paise, paisPorPagina, paginado }) {
  const numeroDePagina = [];

  for (let i = 1; i <= Math.ceil(paise.length / paisPorPagina); i++) {
    numeroDePagina.push(i);
  }

  return (
    <nav className={style.paginado}>
      {numeroDePagina.map((numero) => (
        <div>
          <button className={style.btn} onClick={() => paginado(numero)}>
            {numero}
          </button>
        </div>
      ))}
    </nav>
  );
}
