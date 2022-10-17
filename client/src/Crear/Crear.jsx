import React from "react";
import { todosLosPaises, crearActividad } from "../redux/accion";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import Navbar from "../NavBar/NavBar";
import style from "./Crear.module.css";
export default function CrearActividades() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    nombre: "",
    dificultad: 0,
    temporada: [],
    duracion: 0,
    pais: [],
  });

  const [errors, seterrors] = useState({});

  function validate(input) {
    let errors = {};

    if (
      !input.pais ||
      input.pais === "seleccione un Pais" ||
      input.pais.length < 1
    ) {
      errors.pais = "por favor seleccione al menos 1 pais*";
      input.pais = "por favor seleccione al menos 1 pais*";
    }

    if (!input.nombre) {
      errors.nombre = "el nombre de la actividad es requerido*";
      input.nombre = "el nombre de la actividad es requerido*";
    }
    if (!input.dificultad) {
      errors.dificultad = "debe elegir una dificultad*";
      input.dificultad = "debe elegir una dificultad*";
    }
    if (
      input.dificultad < 1 ||
      input.dificultad > 5 ||
      isNaN(input.dificultad)
    ) {
      errors.dificultad = "no es un Numero valido*";
      input.dificultad = "no es un Numero valido*";
    }
    if (!input.temporada) {
      errors.dificultad = "seleccione una temporada*";
      input.dificultad = "selecciones una temporada*";
    }
    // if (
    //   input.temporada !== "Verano" ||
    //   input.temporada !== "Invierno" ||
    //   input.temporada !== "Otoño" ||
    //   input.temporada !== "Primavera"
    // ) {
    //   errors.temporada = "temporada no valida";
    //   input.temporada = "temporada no valida";
    // }
    if (!input.duracion) {
      errors.duracion = "debe ingresar una duracion*";
      input.duracion = "debe ingresar una duracion*";
    }
    if (input.duracion < 1 || isNaN(input.duracion)) {
      errors.duracion = "duracion no valida*";
      input.duracion = "duracion no valida*";
    }
    return errors;
  }
  const handlerClear = () => {
    setInput({
      nombre: "",
      dificultad: 0,
      duracion: 0,
      temporada: [],
      pais: [],
    });
    document.getElementsByName("Verano").checked = false;
    document.getElementsByName("Invierno").checked = false;
    document.getElementsByName("Primavera").checked = false;
    document.getElementsByName("Otoño").checked = false;
  };
  const handlerInputChek = (e) => {
    if (e.target.checked) {
      setInput((prevState) => ({
        ...prevState,
        temporada: input.temporada.concat(e.target.value),
      }));
    } else {
      setInput((prevState) => ({
        ...prevState,
        temporada: input.temporada.filter((x) => e.target.value !== x),
      }));
    }
  };

  const paises = useSelector((state) => state.countries);
  useEffect(() => {
    dispatch(todosLosPaises());
  }, [dispatch]);

  function handelPais(e) {
    e.preventDefault();
    setInput({ ...input, pais: [...input.pais, e.target.value] });
    seterrors(validate({ ...input, [e.target.name]: e.target.value }));
  }

  function handelChange(e) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    seterrors(validate({ ...input, [e.target.name]: e.target.value }));
  }

  function handelSubmit(e) {
    if (!input.pais || input.pais.length < 1) {
      e.preventDefault();
      return "ingrese un Pais";
    }

    if (!input.nombre) {
      e.preventDefault();
      return "ingrese un nombre";
    }
    if (!input.dificultad) {
      e.preventDefault();
      return "ingrese dificultad";
    }
    if (
      input.dificultad < 1 ||
      input.dificultad > 5 ||
      isNaN(input.dificultad)
    ) {
      e.preventDefault();
      return "no es un Numero valido";
    }
    if (!input.temporada) {
      e.preventDefault();
      return "selecciones una temporada";
    }
    // if (
    //   input.temporada !== "Verano" ||
    //   input.temporada !== "Invierno" ||
    //   input.temporada !== "Otoño" ||
    //   input.temporada !== "Primavera"
    // ) {
    //   e.preventDefault();
    //   return "temporada no valida";
    // }
    if (!input.duracion) {
      e.preventDefault();
      return "debe ingresar una duracion";
    }
    if (input.duracion < 1 || isNaN(input.duracion)) {
      e.preventDefault();
      return "duracion no valida";
    }
    e.preventDefault();
    dispatch(crearActividad(input));
    alert("Tu actividad fue creada exitosamente");
  }

  return (
    <div className={style.general}>
      <div>
        <Navbar />
      </div>

      <h1 className={style.titulo1}>Contanos tu actividad:</h1>

      <div className={style.formulario}>
        <form>
          <label className={style.LabelNombre}>Nombre de la Actividad</label>
          <input
            className={style.name}
            name="nombre"
            type="text"
            value={input.nombre}
            onChange={(e) => handelChange(e)}
          />
          {errors.nombre && <p className={style.errorName}>{errors.nombre}</p>}
          <label className={style.LabelDificultad}>Dificultad</label>
          <input
            className={style.dificultad}
            type="number"
            name="dificultad"
            value={input.dificultad}
            onChange={(e) => handelChange(e)}
          />
          {errors.dificultad && (
            <p className={style.errorDificultad}>{errors.dificultad}</p>
          )}
          <label className={style.LabelDuracion}>Duracion (hs)</label>
          <input
            className={style.duracion}
            type="number"
            name="duracion"
            value={input.duracion}
            onChange={(e) => handelChange(e)}
          />
          {errors.duracion && (
            <p className={style.errorDuracion}>{errors.duracion}</p>
          )}
          <label className={style.LabelPais}>
            Paises donde se puede realizar
          </label>
          <select
            className={style.pais}
            placeholder="pais"
            name="pais"
            value={input.pais}
            onChange={(e) => handelPais(e)}
          >
            <option value="Seleccione un Pais">Seleccione un Pais</option>
            {paises.map((e) => {
              return <option>{e.name}</option>;
            })}
          </select>
          {errors.pais && <p className={style.errorPais}>{errors.pais}</p>}
        </form>
        <div classname={style.temporada}>
          <form onChange={(e) => handlerInputChek(e)}>
            <label className={style.LabelTemporadas}>Epoca del Año</label>
            <input
              className={style.Verano}
              type="checkbox"
              name="Verano"
              value="Verano"
              id="Verano"
            />
            <p className={style.acompVerano}>{"Verano"}</p>

            <input
              className={style.Invierno}
              type="checkbox"
              name="Invierno"
              value="Invierno"
              id="Invierno"
            />
            <p className={style.acompInvierno}>{"Invierno"}</p>

            <input
              className={style.Primavera}
              type="checkbox"
              name="Primavera"
              value="Primavera"
              id="Primavera"
            />
            <p className={style.acompPrimavera}>{"Primavera"}</p>

            <input
              className={style.Otoño}
              type="checkbox"
              name="Otoño"
              value="Otoño"
              id="Otoño"
            />
            <p className={style.acompOtoño}>{"Otoño"}</p>

            {errors.temporada && <p>{errors.temporada}</p>}
          </form>
        </div>
        <button className={style.crearAct} onClick={(e) => handelSubmit(e)}>
          <span>Crear Actividad</span>
        </button>
        <button className={style.borrar} onClick={(e) => handlerClear(e)}>
          <span>Borrrar</span>
        </button>
      </div>
    </div>
  );
}
