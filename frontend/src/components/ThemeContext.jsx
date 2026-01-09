import  { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
   const [theme, setTheme] = useState('');

   const setPreferredTheme = (matches) => {
      const preferredTheme = matches ? 'dark' : 'light';
      const storedTheme = localStorage.getItem('theme');
      if (!storedTheme) {
         setTheme(preferredTheme);
         localStorage.setItem('theme', preferredTheme);
         document.body.classList.add(preferredTheme);
      } else if (storedTheme !== preferredTheme) {
         setTheme(storedTheme);
         document.body.classList.add(storedTheme);
      } else {
         setTheme(preferredTheme);
         document.body.classList.add(preferredTheme);
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
      document.body.classList.toggle('dark');
      document.body.classList.toggle('light');
   };

   return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
