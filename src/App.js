import React from "react";
import logo from "./logo.svg";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container h-100">
        <div class="row h-100">
          <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex flex-column justify-content-center align-items-center">
            <div id="pomodoro-clock">
              <div class="row">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <h1 id="title" class="text-center">
                    Pomodoro Clock
                  </h1>
                </div>

                {/* Controls*/}
                <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <h2 id="break-label" class="controls-title text-center">
                        Break Length
                      </h2>
                    </div>

                    <div
                      id="break-container"
                      class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center align-items-center"
                    >
                      <button id="break-decrement">
                        <i
                          class="fa fa-arrow-down fa-2x"
                          aria-hidden="true"
                        ></i>
                      </button>
                      <h1 id="break-length" class="text-center">
                        5
                      </h1>

                      <button id="break-increment">
                        <i class="fa fa-arrow-up fa-2x" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <h2 id="session-label" class="controls-title text-center">
                        Session Length
                      </h2>
                    </div>

                    <div
                      id="break-container"
                      class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center align-items-center"
                    >
                      <button id="session-decrement">
                        <i
                          class="fa fa-arrow-down fa-2x"
                          aria-hidden="true"
                        ></i>
                      </button>
                      <h1 id="session-length" class="text-center">
                        25
                      </h1>

                      <button id="session-increment">
                        <i class="fa fa-arrow-up fa-2x" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center font-weight-bold text-black mt-2">
              Designed and coded by{" "}
              <a class="credits" href="https://github.com/peter-huang">
                Peter Huang
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
