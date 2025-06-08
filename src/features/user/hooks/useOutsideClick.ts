import { useEffect } from "react";

/**
 * Hook que detecta clics fuera de un elemento y ejecuta un callback.
 *
 * @param ref - Referencia al elemento que se quiere vigilar.
 * @param callback - Función a ejecutar cuando se hace clic afuera.
 */
export function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}
