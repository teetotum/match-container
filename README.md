# .matchContainer() Polyfill

The `match-container` package is a polyfill for the proposed `Element.matchContainer()` API which is the corresponding scripting API to the `@container` query CSS feature.
It is for `@container` what `Window.matchMedia()` is for the `@media` query CSS feature.
A discussion of this feature can be found [here](https://github.com/w3c/csswg-drafts/issues/6205).
The polyfill provides support for both _container size queries_ and _container style queries_.

## API and Usage

To use the polyfill all you need to do is to add it to your loaded scripts, either with a `<script>` element in your HTML document or by importing it into your main script with `import 'match-container'`. The polyfill has no exports.
The polyfill adds the `.matchContainer()` function to `Element.prototype` if and only if the prototype does not have a function with this name.

### .matchContainer()

```ts
Element.matchContainer(containerQueryString: string)
```

The function can be called on [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) instances, the `containerQueryString` argument must be a syntactically valid `@container` query condition and must contain all parts that in the corresponding CSS would go between the `@container` and the rule block `{ ... }`.
The call returns a `ContainerQueryList` object (see below).

Examples:

- `.matchContainer("(width < 400px)")` corresponds to the following CSS
  <!-- prettier-ignore -->
  ```css
  @container (width < 400px) { ... }
  ```

- `.matchContainer("outer-container (width < 400px)")` corresponds to the following CSS
  <!-- prettier-ignore -->
  ```css
  @container outer-container (width < 400px) { ... }
  ```

- `.matchContainer("style(--my-property)")` corresponds to the following CSS
  <!-- prettier-ignore -->
  ```css
  @container style(--my-property) { ... }
  ```

- `.matchContainer("not style(--my-property)")` corresponds to the following CSS
  <!-- prettier-ignore -->
  ```css
  @container not style(--my-property) { ... }
  ```

- `.matchContainer("style(--themeColor: blue) or style(--themeColor: purple)")` corresponds to the following CSS
  <!-- prettier-ignore -->
  ```css
  @container style(--themeColor: blue) or style(--themeColor: purple) { ... }
  ```

- `.matchContainer("anchored(fallback: flip-block)")` corresponds to the following CSS
  <!-- prettier-ignore -->
  ```css
  @container anchored(fallback: flip-block) { ... }
  ```

### ContainerQueryList

The `ContainerQueryList` inherits from `EventTarget` and therefore supports event listeners.

An instance of `ContainerQueryList` exposes two properties:

- `container: string` corresponds to the `containerQueryString` argument provided to `.matchContainer()`
- `matches: boolean` use this property to check whether the container query matches

To be able to react to changes of the `matches` state you can add an event listener for the `change` event.

```ts
const myElement = document.getElementById("my-element");
const containerWidthQuery = myElement.matchContainer("(width < 400px)");
containerWidthQuery.addEventListener(
  "change",
  (event: ContainerQueryListEvent) => {
    if (event.matches) console.log("The @container query matches currently");
    else console.log("The @container query does not match currently");
  }
);
```

### ContainerQueryListEvent

The `ContainerQueryListEvent` is the event argument type produced by a `change` event on `ContainerQueryList`.
It exposes two properties:

- `container: string` corresponds to the `containerQueryString` argument provided to `.matchContainer()`
- `matches: boolean` use this property to check whether the container query matches

## How it works

When `Element.matchContainer()` is called the polyfill inserts a corresponding `@container` query into the CSSOM.
The observed element is tethered to an attribute selector inside this query block by a corresponding `data-*` attribute, ensuring the target element is the only element matched by this selector.
When the `@container` query matches a prepared CSS custom property is set on the observed element.
A style observer (heavily inspired by [Bramus' StyleObserver](https://github.com/bramus/style-observer)) finally triggers the callback in the script code.

## Limitations

The polyfill only adds the scripting API part for `@container` queries, it does not polyfill the CSS feature and will therefore not work in any browser that does not support `@container` queries in CSS.

## Feedback

Please don't hesitate to provide feedback by opening an issue or a discussion.
If you find a bug or experience that the polyfill isn't working when it should please let me know.
I can only fix those bugs I am made aware of.
