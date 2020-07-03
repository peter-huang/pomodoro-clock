import React from "react";
import logo from "./logo.svg";

const CLOCK_STATES = {
  DEFAULT: {
    session_length: 25,
    break_length: 5,
    time_left: "25:00",
    start_stopState: false,
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = CLOCK_STATES.DEFAULT;

    // Break
    this.increaseBreak = this.increaseBreak.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);

    // Length
    this.increaseLength = this.increaseLength.bind(this);
    this.decreaseLength = this.decreaseLength.bind(this);

    // Play and Reset
    this.reset = this.reset.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.start_stop = this.start_stop.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  /*
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");

    return true;
  }*/

  start_stop() {
    let remainTime = this.state.session_length * 60;

    let formattedTime = this.formatTime(remainTime);

    this.startTimer();
    /*
    this.setState((state) => {
      return {
        start_stopState: !state.start_stopState,
      };
    });*/
  }

  startTimer() {
    let remainTime = this.state.session_length * 60;

    let countDownHandler = setInterval(() => {
      if (remainTime - 1 >= 0) {
        console.log(remainTime);
        this.setState((state) => {
          return {
            time_left:
              state.session_length * 60 > 0
                ? this.formatTime(remainTime--)
                : clearInterval(countDownHandler),
          };
        });
      }
      //console.log(remainTime - 1 >= 0 ? remainTime-- : clearInterval(t));
    }, 1000);
  }

  /*
   * Formats seconds into proper mm:ss format (minutes:seconds)
   *
   * @param time - the amount of time in seconds
   */
  formatTime(time) {
    let min = Math.floor(time / 60);
    let seconds = time - min * 60;

    if (min < 10) {
      if (seconds < 10) {
        return "0" + min + ":" + "0" + seconds;
      } else {
        return "0" + min + ":" + seconds;
      }
    } else {
      if (seconds < 10) {
        return min + ":" + "0" + seconds;
      } else {
        return min + ":" + seconds;
      }
    }
  }

  increaseBreak() {
    this.setState((state) => {
      return {
        break_length:
          state.break_length + 1 <= 60
            ? state.break_length + 1
            : state.break_length,
      };
    });
  }

  decreaseBreak() {
    this.setState((state) => {
      return {
        break_length:
          state.break_length - 1 >= 1
            ? state.break_length - 1
            : state.break_length,
      };
    });
  }

  increaseLength() {
    this.setState((state) => {
      return {
        session_length:
          state.session_length + 1 <= 60
            ? state.session_length + 1
            : state.session_length,
      };
    });
  }

  decreaseLength() {
    this.setState((state) => {
      return {
        session_length:
          state.session_length - 1 >= 1
            ? state.session_length - 1
            : state.session_length,
      };
    });
  }

  /*
   * Resets the clock to default settings
   *
   */
  reset() {
    document.getElementById("beep").pause();
    document.getElementById("beep").currenTime = 0;
    this.setState((state) => CLOCK_STATES.DEFAULT);
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
                      <button id="break-decrement" onClick={this.decreaseBreak}>
                        <i
                          class="fa fa-arrow-down fa-2x"
                          aria-hidden="true"
                        ></i>
                      </button>
                      <h2 id="break-length" class="text-center">
                        {this.state.break_length}
                      </h2>

                      <button id="break-increment" onClick={this.increaseBreak}>
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
                      <button
                        id="session-decrement"
                        onClick={this.decreaseLength}
                      >
                        <i
                          class="fa fa-arrow-down fa-2x"
                          aria-hidden="true"
                        ></i>
                      </button>
                      <h2 id="session-length" class="text-center">
                        {this.state.session_length}
                      </h2>

                      <button
                        id="session-increment"
                        onClick={this.increaseLength}
                      >
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
                      {this.state.time_left}
                    </h1>

                    <audio
                      id="beep"
                      src="http://www.peterhuang.net/projects/pomodoro-clock/static/media/alarm-ringtone-short.mp3"
                    ></audio>
                  </div>

                  <div id="play-reset-controls" class="pt-2">
                    <button id="start_stop" onClick={this.start_stop}>
                      <i class="fa fa-play fa-lg" aria-hidden="true"></i>
                      <i class="fa fa-pause fa-lg" aria-hidden="true"></i>
                    </button>
                    <button id="reset" onClick={this.reset}>
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
