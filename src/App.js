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
                <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 pt-4">
                  <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <h3 id="break-label" class="controls-title text-center">
                        Break Length
                      </h3>
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
                      <h2 id="break-length" class="text-center">
                        5
                      </h2>

                      <button id="break-increment">
                        <i class="fa fa-arrow-up fa-2x" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 pt-4">
                  <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <h3 id="session-label" class="controls-title text-center">
                        Session Length
                      </h3>
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
                      <h2 id="session-length" class="text-center">
                        25
                      </h2>

                      <button id="session-increment">
                        <i class="fa fa-arrow-up fa-2x" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sesssion */}
                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-4 d-flex flex-column justify-content-center align-items-center">
                  <div id="timer-container">
                    <h3 id="timer-label" class="text-center">
                      Session
                    </h3>

                    <h1 id="time-left" class="text-center">
                      25:00
                    </h1>

                    <audio
                      id="beep"
                      src="https://wwww.peterhuang.net/projects/pomodoro-clock/static/media/alarm-ringtome-short.mp3"
                    ></audio>
                  </div>

                  <div id="play-reset-controls" class="pt-2">
                    <button id="start_stop">
                      <i class="fa fa-play fa-lg" aria-hidden="true"></i>
                      <i class="fa fa-pause fa-lg" aria-hidden="true"></i>
                    </button>
                    <button id="reset">
                      <i class="fa fa-refresh fa-lg" aria-hidden="true"></i>
                    </button>
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
