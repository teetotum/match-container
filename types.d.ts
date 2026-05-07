declare global {
  interface Element {
    matchContainer(containerQueryString: string): ContainerQueryList;
  }

  interface ContainerQueryList extends EventTarget {
    container: string;
    matches: boolean;

    addEventListener(type: 'change', callback: ((eventArgs: ContainerQueryListEvent) => unknown) | ({ handleEvent(eventArgs: ContainerQueryListEvent): unknown }) | null, options?: AddEventListenerOptions | boolean): void;
    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void;

    removeEventListener(type: 'change', callback: ((eventArgs: ContainerQueryListEvent) => unknown) | ({ handleEvent(eventArgs: ContainerQueryListEvent): unknown }) | null, options?: EventListenerOptions | boolean): void;
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
  }

  interface ContainerQueryListEvent extends Event {
    container: string;
    matches: boolean;
  }
}

// this is needed to make TS treat this file as a module, otherwise the `declare global` section is ignored
// see https://github.com/teetotum/match-container/pull/3
export {};
