class SimpleResizeBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
          <style>
            .shadow-container {
              container-type: inline-size;
              resize: horizontal;
              padding: 40px;
              background-color: blueviolet;
              overflow: scroll;
            }
            .shadow-test-element {
              width: 100px;
              height: 100px;
              background-color: beige;
            }
            .shadow-matches {
              background-color: green;
            }
            @container (width < 400px) {
              .shadow-test-element.shadow-size-query-css {
                background-color: green;
              }
            }
          </style>

          <div class="shadow-container">
            <div class="shadow-test-element shadow-size-query-css">shadowDOM size-query with css</div>
            <div class="shadow-test-element shadow-size-query-script">shadowDOM size-query with script</div>
          </div>
        `;
    }

    addListeners() {
        const watchedElement = this.shadowRoot.querySelector('.shadow-size-query-script');
        const sizeQuery = watchedElement.matchContainer("(width < 400px)");
        if (sizeQuery.matches) {
            watchedElement.classList.add("shadow-matches");
        }
        const onSizeChanged = (event) => {
            console.log("shadowDOM: size-query result changed");
            console.log(`shadowDOM: event.matches is ${event.matches}`);
            console.log(
                `ContainerQueryList object is in sync with event payload: ${sizeQuery.matches === event.matches}`
            );
            if (event.matches) {
                watchedElement.classList.add("shadow-matches");
            } else {
                watchedElement.classList.remove("shadow-matches");
            }
        };
        sizeQuery.addEventListener("change", onSizeChanged);
    }
}

customElements.define('simple-resize-box', SimpleResizeBox);
