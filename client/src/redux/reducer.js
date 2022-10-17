import {
  ALLCOUNTRIES,
  COUNTRY_ID,
  CREAR_ACTIVIDAD,
  ORDEN_AZ,
  BACK,
  ORDEN_POBLACION,
  ACTIVIDADES,
  FILTRO_ACTIVIDAD,
  FILTRO_CONTINENTE,
  BUSQUEDA,
} from "./accion";
const initialState = {
  countries: [],
  countryId: [],
  backup: [],
  actividades: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALLCOUNTRIES: {
      console.log(action.payload, "este es el estado");
      return {
        ...state,
        countries: action.payload,
        backup: action.payload,
      };
    }
    case BACK: {
      return {
        ...state,

        backup: action.payload,
        countries: action.payload,
      };
    }

    case ACTIVIDADES: {
      return {
        ...state,
        actividades: action.payload,
      };
    }

    case COUNTRY_ID: {
      console.log(action.payload, "payloaaad");
      let leti = action.payload;
      if (leti.onu === true) leti.onu = "Pertenece";
      else leti.onu = "No Pertenece";
      if (leti.activities.length < 1) leti.activities = false;
      return {
        ...state,
        countryId: leti,
      };
    }

    case BUSQUEDA: {
      console.log(action.payload, "lalalalaal");
      return {
        ...state,
        countries: action.payload,
      };
    }

    case CREAR_ACTIVIDAD: {
      return {
        ...state,
      };
    }
    case ORDEN_AZ: {
      const ordenado = action.payload;
      let estado = state.countries;
      let ordenados;

      if (ordenado === "A-Z") {
        ordenados = estado.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
      }
      if (ordenado === "Z-A") {
        ordenados = estado.sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
      }
      if (ordenado === "Poblacion") ordenados = state.backup;
      return {
        ...state,
        countries: ordenados,
      };
    }
    case ORDEN_POBLACION: {
      const poblacion = state.countries;
      const valuePoblacion = action.payload;
      let ordenados;
      if (valuePoblacion === "Menor Poblacion") {
        ordenados = poblacion.sort((a, b) => {
          if (a.poblacion < b.poblacion) return -1;
          if (a.poblacion > b.poblacion) return 1;
          return 0;
        });
      }
      if (valuePoblacion === "Mayor Poblacion") {
        ordenados = poblacion.sort((a, b) => {
          if (a.poblacion > b.poblacion) return -1;
          if (a.poblacion < b.poblacion) return 1;
          return 0;
        });
      }
      if (valuePoblacion === "Poblacion") ordenados = state.backup;
      return {
        ...state,
        countries: ordenados,
      };
    }

    case FILTRO_ACTIVIDAD: {
      const actividad = action.payload;
      let paises = state.countries;

      // // if (actividad === "Actividades") {
      // //   return { ...state, countries: state.backup };
      // }

      if (actividad !== "Actividades") {
        paises = paises.filter((e) => {
          const act = e.activities.filter((e) => {
            return e.nombre === actividad;
          });
          return act.length ? actividad : false;
        });
      }
      if (actividad === "Actividades") paises = state.backup;
      return { ...state, countries: paises };
    }

    case FILTRO_CONTINENTE: {
      let value = action.payload;
      let estado = state.countries;
      if (value !== "Continentes") {
        estado = estado.filter((e) => e.continente.includes(value));
      }
      if (value === "Continentes") estado = state.backup;

      return { ...state, countries: estado };
    }

    default:
      return state;
  }
};
export default rootReducer;
