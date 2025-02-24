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

declare module "match-container" {}
