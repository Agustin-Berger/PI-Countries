import axios from "axios";

export const ALLCOUNTRIES = "GET_ALL_COUNTRIES";
export const COUNTRY_ID = "GET_COUNTRY_BY_ID";
export const CREAR_ACTIVIDAD = "CREAR_ACTIVIDAD";
export const ORDEN_AZ = "ORDEN_AZ";
export const ORDEN_POBLACION = "ORDEN_POBLACION";
export const BACK = "BACK";
export const ACTIVIDADES = "ACTIVIDADES";
export const FILTRO_ACTIVIDAD = "FILTRO_ACTIVIDAD";
export const FILTRO_CONTINENTE = "FILTROCONTINENTE";
export const BUSQUEDA = "BUSQUEDA";

export const todosLosPaises = () => {
  console.log("entre");
  return async function (dispatch) {
    const paises = await axios.get("http://localhost:3001/countries");
    console.log("llegue a la axion ", paises);
    return dispatch({ type: ALLCOUNTRIES, payload: paises.data });
  };
};

export const backup = () => {
  console.log("soy el back");
  return async function (dispatch) {
    const paises = await axios.get("http://localhost:3001/countries");
    console.log("llegue a la axion ", paises);
    return dispatch({ type: BACK, payload: paises.data });
  };
};

export const paisPorId = (id) => {
  console.log(id, "elid");
  return async function (dispatch) {
    const paises = await axios.get(`http://localhost:3001/countries/${id}`);
    console.log("accion", paises.data);
    return dispatch({ type: COUNTRY_ID, payload: paises.data });
  };
};

export const crearActividad = (payload) => {
  console.log("creando actividad", payload);
  return async function (dispatch) {
    const paises = await axios.post(
      "http://localhost:3001/activities",
      payload
    );
    return dispatch({ type: CREAR_ACTIVIDAD, payload: paises.data });
  };
};
export const ordenadoAZ = (value) => {
  console.log(value, "el valueeeee");
  return { type: ORDEN_AZ, payload: value };
};
export const ordenPoblacion = (value) => {
  console.log(value, "VALUE POBLACION");
  return { type: ORDEN_POBLACION, payload: value };
};

export const actividades = () => {
  return async function (dispatch) {
    const actividades = await axios.get(
      "http://localhost:3001/activities_creadas"
    );
    return dispatch({ type: ACTIVIDADES, payload: actividades.data });
  };
};
export const paisesConActividades = (value) => {
  console.log(value, "VALUE POBLACION");
  return { type: FILTRO_ACTIVIDAD, payload: value };
};

export const filtradoContinentes = (value) => {
  return { type: FILTRO_CONTINENTE, payload: value };
};
export const busqueda = (value) => {
  console.log("aciooon", value);
  return async function (dispatch) {
    const paises = await axios.get(
      `http://localhost:3001/countries?name=${value}`
    );
    return dispatch({ type: BUSQUEDA, payload: paises.data });
  };
};
