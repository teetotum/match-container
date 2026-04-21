declare global {
  interface Element {
    matchContainer(containerQueryString: string): ContainerQueryList;
  }

  interface ContainerQueryList extends EventTarget {
    container: string;
    matches: boolean;
  }

  interface ContainerQueryListEvent extends Event {
    container: string;
    matches: boolean;
  }
}

// this is needed to make TS treat this file as a module, otherwise the `declare global` section is ignored
// see https://github.com/teetotum/match-container/pull/3
export {};
