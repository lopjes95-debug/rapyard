import React, { createContext, useContext } from 'react';
import { theme } from '@brand/theme';

const ThemeContext = createContext(theme);

export const RapYardThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);
