import React, {
  useRef,
  useEffect,
  MutableRefObject,
  useCallback,
  useState,
  RefObject,
} from "react";

export function useEventListener<
  T extends HTMLElement = HTMLDivElement,
  E extends React.UIEvent = React.UIEvent
>(
  eventName: keyof DocumentEventMap,
  handler: (event: E) => void,
  element?: RefObject<T>
) {
  // Create a ref that stores handler
  const savedHandler = useRef<(event: E) => void>();

  useEffect(() => {
    // Define the listening target
    const targetElement: T | Document = element?.current || document;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    // Update saved handler if necessary
    if (savedHandler.current !== handler) {
      savedHandler.current = handler;
    }

    // Create event listener that calls handler function stored in ref
    const eventListener = (event: E) => {
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!savedHandler?.current) {
        savedHandler.current(event as E);
      }
    };

    targetElement.addEventListener(
      eventName,
      eventListener as unknown as EventListenerOrEventListenerObject
    );

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(
        eventName,
        eventListener as unknown as EventListenerOrEventListenerObject
      );
    };
  }, [eventName, element, handler]);
}
