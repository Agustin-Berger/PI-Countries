import React, { useState } from "react";
import style from "./Home.module.css";
import {
  todosLosPaises,
  ordenadoAZ,
  backup,
  ordenPoblacion,
  actividades,
  paisesConActividades,
  filtradoContinentes,
  busqueda,
} from "../redux/accion";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Card from "./Card";
import Navbar from "../NavBar/NavBar";
import Loading from "../Loading/Loading";
import Paginado from "../Paginado/Paginado";
export default function Paises() {
  const dispatch = useDispatch();
  const paise = useSelector((state) => state.countries);
  useEffect(() => {
    console.log("useEffect");
    dispatch(todosLosPaises());
  }, [dispatch]);

  const continentes = [
    "Continentes",
    "Americas",
    "Europe",
    "Africa",
    "Oceania",
    "Antarctic",
    "Asia",
  ];

  const actividad = useSelector((state) => state.actividades);
  useEffect(() => {
    dispatch(actividades());
  }, []);

  const [actualiza, setActualiza] = useState();

  const handleOrden = (e) => {
    dispatch(ordenadoAZ(e.target.value));

    setActualiza(e.target.value);
  };
  const handlerOrdenPoblacion = (e) => {
    dispatch(ordenPoblacion(e.target.value));
    setActualiza(e.target.value);
  };
  const handlerClear = (e) => {
    dispatch(todosLosPaises());
  };
  const handlerActividad = (e) => {
    dispatch(paisesConActividades(e.target.value));
    setActualiza(e.target.value);
  };
  const handleContinente = (e) => {
    dispatch(filtradoContinentes(e.target.value));
    setActualiza(e.target.value);
  };

  const handlerPais = (e) => {
    e.preventDefault();
    setActualiza(e.target.value);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(busqueda(actualiza));
    setActualiza(e.target.value);
    setPaginaActual(1);
  };
  //----------------------------Paginado-------------------------------------------------------------//

  //
  //
  //
  //
  //
  const [paginaActual, setPaginaActual] = useState(1);
  const [paisPorPagina, setPaisPorPagina] = useState(9);
  const indiceUltimoPais = paginaActual * paisPorPagina;

  //
  const indicePrimerosPaises = indiceUltimoPais - paisPorPagina;
  //
  const mapita = paise.slice(indicePrimerosPaises, indiceUltimoPais);
  //
  const paginado = (numeroDePagina) => {
    if (numeroDePagina === 1) {
      setPaisPorPagina(9);
      setPaginaActual(numeroDePagina);
    } else {
      setPaisPorPagina(10);
      setPaginaActual(numeroDePagina);
    }
  };
  //
  if (paise.length < 1) return <Loading />;
  else
    return (
      <div className={style.home}>
        <div>
          <Navbar />
        </div>

        <div>
          <button
            data-text="Awesome"
            class={style.button}
            onClick={handlerClear}
          >
            <span class={style.actual1}>&nbsp;Recargar&nbsp;</span>
            <span class={style.hover1} aria-hidden="true">
              &nbsp;Recargar&nbsp;
            </span>
          </button>
          <select className={style.alfabeto} onChange={handleOrden}>
            <option className={style.slet} value="Alfabetico">
              Alfabetico
            </option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>

          <select
            className={style.poblacion}
            onChange={(e) => handlerOrdenPoblacion(e)}
          >
            <option value="Poblacion">Poblacion</option>
            <option value="Mayor Poblacion">Mayor Poblacion</option>
            <option value="Menor Poblacion"> Menor Poblacion</option>
          </select>
          <select
            className={style.actividad}
            onChange={(e) => handlerActividad(e)}
          >
            <option value="Actividades">Actividades</option>
            {actividad.map((e) => {
              return <option>{e.nombre}</option>;
            })}
          </select>

          <select className={style.continente} onChange={handleContinente}>
            {continentes.map((e) => {
              return <option>{e}</option>;
            })}
          </select>

          <div>
            <button className={style.botonBuscador} onClick={handelSubmit}>
              Buscar
            </button>
            <input
              className={style.buscador}
              type="text"
              placeholder="Buscar Pais"
              onChange={handlerPais}
            />
          </div>
        </div>
        <div className={style.banderas}>
          <div className={style.banderas2}>
            {mapita.map((e) => {
              return (
                <NavLink to={`countries/${e.id}`}>
                  <Card
                    style={style.Card}
                    name={e.name}
                    img={e.img}
                    continente={e.continente}
                  />
                </NavLink>
              );
            })}
          </div>
        </div>
        <Paginado
          className={style.paginado}
          paisPorPagina={paisPorPagina}
          paise={paise}
          paginado={paginado}
        />
      </div>
    );
}
