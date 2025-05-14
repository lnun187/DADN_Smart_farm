import React, { createContext, useContext, useReducer, useMemo } from "react"; // Thêm useContext, useReducer, useMemo nếu chưa có
import PropTypes from "prop-types";

export const MaterialTailwind = createContext(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

export function reducer(state, action) {
  switch (action.type) {
    case "OPEN_SIDENAV": {
      return { ...state, openSidenav: action.value };
    }
    case "SIDENAV_TYPE": {
      return { ...state, sidenavType: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    // --- THÊM CASE MỚI CHO SELECTED_REGION ---
    case "SET_SELECTED_REGION": {
      console.log("Context: Setting selectedRegion to", action.value); // Để debug
      return { ...state, selectedRegion: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function MaterialTailwindControllerProvider({ children }) {
  const initialState = {
    openSidenav: false,
    sidenavColor: "green",      
    sidenavType: "transparent", 
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
    selectedRegion: "all", 
  };

  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  );

  return (
    <MaterialTailwind.Provider value={value}>
      {children}
    </MaterialTailwind.Provider>
  );
}

export function useMaterialTailwindController() {
  const context = useContext(MaterialTailwind);
  if (!context) {
    throw new Error(
      "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider."
    );
  }
  return context;
}

// --- THÊM HÀM ACTION MỚI ĐỂ SET SELECTED_REGION ---
export const setSelectedRegion = (dispatch, value) => 
  dispatch({ type: "SET_SELECTED_REGION", value });

export const setOpenSidenav = (dispatch, value) => dispatch({ type: "OPEN_SIDENAV", value });
export const setSidenavType = (dispatch, value) => dispatch({ type: "SIDENAV_TYPE", value });
export const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
export const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
export const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
export const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });

MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
MaterialTailwindControllerProvider.displayName = "/src/context/index.jsx"; // Hoặc tên file đúng của bạn