/**
 * MUI Polyfills and Warning Suppressors
 * Handles :focus-visible support for older browsers
 */

// Полифилл для CSS.supports() и поддержка :focus-visible
export const setupFocusVisiblePolyfill = () => {
  if (!window.CSS) {
    window.CSS = {};
  }

  if (!window.CSS.supports) {
    window.CSS.supports = () => false;
  }

  const originalSupports = window.CSS.supports;
  window.CSS.supports = function (prop) {
    if (typeof prop === 'string' && prop.includes(':focus-visible')) {
      return true;
    }
    return originalSupports.call(this, prop);
  };
};

// Подавляем MUI warning о :focus-visible
export const suppressFocusVisibleWarning = () => {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0]?.includes?.('`:focus-visible` pseudo class is not supported')) {
      return;
    }
    originalWarn.apply(console, args);
  };
};

// Инициализируем все полифиллы
export const initializePolyfills = () => {
  setupFocusVisiblePolyfill();
  suppressFocusVisibleWarning();
};
