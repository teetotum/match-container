(() => {
  // To guard against the case that this polyfill might be included more than once
  // we must ensure that the ID generating function is a singleton
  // to guarantee that no duplicated IDs are generated - however slim the chance might be.
  // The IDs are unique in the current javascript runtime context.
  // The IDs are constructed from the following parts:
  // - a timestamp
  // - the current value of a counter, incremented after each created ID
  // - a static prefix
  // Even if two IDs are generated within the same milisecond the increased counter ensures
  // that they cannot clash.

  const polyfill_key = "bae45330cd3d4e0e96b60d26b57009b5";
  const polyfill = Symbol.for(polyfill_key);
  window[polyfill] =
    window[polyfill] ??
    (() => {
      let count = 0;
      return { createID: () => `${polyfill_key}-${Date.now()}-${count++}` };
    })();
  const createID = window[polyfill].createID;

  class ContainerQueryListEvent extends Event {
    container;

    matches;

    constructor(type) {
      super(type);
    }
  }
  class ContainerQueryList extends EventTarget {
    container;

    matches;

    constructor(element, containerQueryString) {
      super();
      this.container = containerQueryString;
      const unique_name = "container-query-observer-" + createID();
      const markerAttribute = `data-${unique_name}`;
      element.setAttribute(markerAttribute, "");
      const sentinelProperty = `--${unique_name}`;
      const containerQuerySheet = new CSSStyleSheet();
      const css = `
      @property ${sentinelProperty} {
        syntax: '<custom-ident>';
        inherits: false;
        initial-value: --false;
      }
      @container ${containerQueryString} { [${markerAttribute}] { ${sentinelProperty}: --true; } }
      [${markerAttribute}]{
        @starting-style{
          ${sentinelProperty}: --unknown; 
        }
      }`;

      containerQuerySheet.replaceSync(css);
      document.adoptedStyleSheets = [
        ...document.adoptedStyleSheets,
        containerQuerySheet,
      ];
      const style = getComputedStyle(element);
      this.matches = style.getPropertyValue(sentinelProperty) === "--true";

      this.#startObserving(sentinelProperty, containerQueryString, element);
    }

    #startObserving(sentinelProperty, containerQueryString, observedElement) {
      const _callback = (values) => {
        if (sentinelProperty in values) {
          const matches = values[sentinelProperty] === "--true";
          this.matches = matches;
          // raise 'change' event
          const event = new ContainerQueryListEvent("change");
          event.matches = matches;
          event.container = containerQueryString;
          this.dispatchEvent(event);
        }
      };

      const _previousValues = {};

      observedElement.style.setProperty(
        "transition",
        `${sentinelProperty} 0.001ms step-start`
      );
      observedElement.style.setProperty(
        "transition-behavior",
        "allow-discrete"
      );
      const onTransitionRun = (e) => {
        const targetElement = e.target;

        if (observedElement === targetElement) {
          const computedStyle = getComputedStyle(targetElement);
          const changes = {};
          const currentValue = computedStyle.getPropertyValue(sentinelProperty);
          const previousValue = _previousValues[sentinelProperty];
          const hasChanged = currentValue !== previousValue;

          if (hasChanged) {
            changes[sentinelProperty] = currentValue;
            _previousValues[sentinelProperty] = currentValue;
            _callback(changes);
          }
        }
      };
      observedElement.addEventListener("transitionrun", onTransitionRun);

      // init _previousValues
      const computedStyle = getComputedStyle(observedElement);
      const currentValue = computedStyle.getPropertyValue(sentinelProperty);
      _previousValues[sentinelProperty] = currentValue;
    }
  }

  if (Element.prototype.matchContainer) return;

  function matchContainer(containerQueryString) {
    return new ContainerQueryList(this, containerQueryString);
  }
  Element.prototype.matchContainer = matchContainer;
})();
