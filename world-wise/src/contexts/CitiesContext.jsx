import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
const reducer = function (state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error(`Unknown Type: ${action.type}`);
  }
};

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const getCurrentCity = useCallback(
    async (id) => {
      if (+id === currentCity.id) return;
      // setIsLoading(true);
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await response.json();

        // setCurrentCity(data);
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({
          type: "rejected",
          payload: "There was error loading city data...",
        });
      }
      // finally {
      //   // setIsLoading(false);
      //   dispatch({ type: "stopLoading" });
      // }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      // setCities((currCities) => [...currCities, data]);
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      alert("There was an error creating the city.");
      console.error(err);
    }
    // finally {
    //   // setIsLoading(false);
    //   dispatch({ type: "stopLoading" });
    // }
  }
  async function deleteCity(id) {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      // setCities((currCities) => currCities.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      alert("There was an error deleting city.");
      console.error(err);
    }
    // finally {
    //   // setIsLoading(false);
    //   dispatch({ type: "stopLoading" });
    // }
  }

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "loading" });
      try {
        // setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();

        // setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({
          type: "rejected",
          payload: "There was an error loading the cities data...",
        });
      }
      //  finally
      //  {
      //   // setIsLoading(false);
      //   dispatch({ type: "stopLoading" });
      // }
    };

    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        getCurrentCity,
        isLoading,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("CitiesProvider cannot be used outside CitiesContext");

  return context;
}

export { CitiesProvider, useCities };
