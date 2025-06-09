const sizeTester = document.getElementsByClassName("size-query-script")[0];
const styleTester = document.getElementsByClassName("style-query-script")[0];

// ContainerQueryList
const sizeQuery = sizeTester.matchContainer("(width < 400px)");
const styleQuery = styleTester.matchContainer("style(--test-prop)");

console.log(`sizeQuery.container is ${sizeQuery.container}`);
console.log(`sizeQuery.matches is ${sizeQuery.matches}`);

console.log(`styleQuery.container is ${styleQuery.container}`);
console.log(`styleQuery.matches is ${styleQuery.matches}`);

if (sizeQuery.matches) {
  sizeTester.classList.add("matches");
}

if (styleQuery.matches) {
  styleTester.classList.add("matches");
}

const onSizeChanged = (event) => {
  console.log("size-query result changed");
  console.log(`event.matches is ${event.matches}`);
  console.log(`event.container is ${event.container}`);
  console.log(
    `ContainerQueryList object is in sync with event payload: ${
      sizeQuery.matches === event.matches
    }`
  );
  if (event.matches) {
    sizeTester.classList.add("matches");
  } else {
    sizeTester.classList.remove("matches");
  }
};
const onStyleChanged = (event) => {
  console.log("style-query result changed");
  console.log(`event.matches is ${event.matches}`);
  console.log(`event.container is ${event.container}`);
  console.log(
    `ContainerQueryList object is in sync with event payload: ${
      styleQuery.matches === event.matches
    }`
  );
  if (event.matches) {
    styleTester.classList.add("matches");
  } else {
    styleTester.classList.remove("matches");
  }
};

sizeQuery.addEventListener("change", onSizeChanged);
styleQuery.addEventListener("change", onStyleChanged);
