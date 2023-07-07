import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
   const [theme, setTheme] = useState('');

   const setPreferredTheme = (matches) => {
      const preferredTheme = matches ? 'dark' : 'light';
      if (!localStorage.getItem('theme')) {
         setTheme(preferredTheme);
         localStorage.setItem('theme', preferredTheme);
      } else {
         setTheme(localStorage.getItem('theme'));
      }
   };

   useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setPreferredTheme(mediaQuery.matches);

      const handleChange = (event) => {
         setPreferredTheme(event.matches);
      };

      mediaQuery.addEventListener('change', handleChange);

      return () => {
         mediaQuery.removeEventListener('change', handleChange);
      };
   }, []);

   const toggleTheme = () => {
      const updatedTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(updatedTheme);
      localStorage.setItem('theme', updatedTheme);
   };

   return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
