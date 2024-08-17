/**
 * Get element from dom by selector string
 * @example
 * 	const elementClass = $('.my-class')
 * 	const elementId = $('#my-id')
 * @param selector
 * @returns HTMLElement
 */
export const $ = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Element with selector selector not found`);
  }
  return element;
};

/**
 * Get elements from dom by selector string
 * @example
 * 	const elements = $$('.my-class')
 * @param selector
 * @returns NodeList
 */
export const $$ = <T extends HTMLElement>(selector: string): T[] => {
  const elements = document.querySelectorAll<T>(selector);
  if (!elements) {
    throw new Error(`Elements with selector selector not found`);
  }
  return Array.from(elements);
};
