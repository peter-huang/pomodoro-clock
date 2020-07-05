import React from "react";
import logo from "./logo.svg";

const CLOCK_STATES = {
  DEFAULT: {
    session_length: 0.15,
    session_in_secs: 7,
    break_length: 0.15,
    break_in_secs: 7,
    time_left: "25:00",
    isStartTimer: false,
    isStartBreak: false,
  },
};
/*
const CLOCK_STATES = {
  DEFAULT: {
    session_length: 25,
    session_in_secs: 1500,
    break_length: 5,
    break_in_secs: 300,
    time_left: "25:00",
    isStartTimer: false,
    isStartBreak: false,
  },
};
*/
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
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    this.countDownHandler = null;
    this.breakHandler = null;
    this.audio = document.getElementById("beep");
  }

  componentWillUnmount() {
    if (this.countDownHandler != null) {
      clearInterval(this.countDownHandler);
    }

    if (this.countDownHandler != null) {
      clearInterval(this.breakHandler);
    }
  }

  shouldComponentUpdate(nextProp, nextState) {
    if (this.state.session_in_secs === nextState.session_in_secs) {
      console.log("update " + this.state.session_in_secs);
    }

    return true;
  }

  start_stop() {
    if (!this.state.isStartTimer) {
      this.startTimer();
      this.setState((state) => {
        return {
          isStartTimer: !state.isStartTimer,
        };
      });
    } else {
      this.stopTimer();
      this.setState((state) => {
        return {
          isStartTimer: !state.isStartTimer,
        };
      });
    }
  }

  /*
   * Starts the timer and safe-guards if the asynchronous timer process stops at 0
   *
   */
  startTimer() {
    this.countDownHandler = setInterval(() => {
      this.audio = document.getElementById("beep");

      // Countdown session
      if (!this.state.isStartBreak) {
        if (this.state.session_in_secs <= 0) {
          this.audio.currentTime = 0;
          this.audio.play();

          // Reset session and start break

          this.setState((state) => {
            return {
              isStartBreak: !state.isStartBreak,
              time_left: this.formatTime(this.state.session_in_secs),
              session_in_secs: state.session_length * 60,
            };
          });
        } else {
          this.setState((state) => {
            return {
              time_left: this.formatTime(this.state.session_in_secs - 1),
              session_in_secs: state.session_in_secs - 1,
            };
          });
        }
      }

      // Countdown break
      else {
        console.log("break start");
        console.log(this.state.break_in_secs);

        if (this.state.break_in_secs <= 0) {
          this.audio.currentTime = 0;
          this.audio.play();
          // Reset break and start session
          this.setState((state) => {
            return {
              isStartBreak: !state.isStartBreak,
              time_left: this.formatTime(this.state.break_in_secs),
              break_in_secs: state.break_length * 60,
            };
          });
        } else {
          this.setState((state) => {
            return {
              time_left: this.formatTime(this.state.break_in_secs - 1),
              break_in_secs: state.break_in_secs - 1,
            };
          });
        }
      }
    }, 1000);
  }

  stopTimer() {
    if (this.countDownHandler != null) {
      clearInterval(this.countDownHandler);
    }

    console.log("end timer");
  }

  /*
   * Formats seconds into proper mm:ss format (minutes:seconds)
   *
   * @param time - the amount of time in seconds
   */
  formatTime(time) {
    let min = Math.floor(time / 60);
    let seconds = time - min * 60;

    console.log(time + " " + min + " " + seconds);
    if (min === 0 && seconds === 0) {
      return "00:00";
    }

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

  /*
   * Increasese the break
   *
   */
  increaseBreak() {
    if (!this.state.isStartTimer) {
      this.setState((state) => {
        return {
          break_length:
            state.break_length + 1 <= 60
              ? state.break_length + 1
              : state.break_length,

          break_in_secs:
            (state.break_length + 1) * 60 <= 3600
              ? (state.break_length + 1) * 60
              : state.break_length * 60,
        };
      });
    }
  }

  /*
   * Decreases the break
   *
   */
  decreaseBreak() {
    if (!this.state.isStartTimer) {
      this.setState((state) => {
        return {
          break_length:
            state.break_length - 1 >= 1
              ? state.break_length - 1
              : state.break_length,

          break_in_secs:
            (state.break_length - 1) * 60 >= 60
              ? (state.break_length - 1) * 60
              : state.break_length * 60,
        };
      });
    }
  }

  /*
   * Increasese the session
   *
   */
  increaseLength() {
    if (!this.state.isStartTimer) {
      this.setState((state) => {
        return {
          session_length:
            state.session_length + 1 <= 60
              ? state.session_length + 1
              : state.session_length,

          session_in_secs:
            (state.session_length + 1) * 60 <= 3600
              ? (state.session_length + 1) * 60
              : state.session_length * 60,

          time_left:
            (state.session_length + 1) * 60 <= 3600
              ? this.formatTime((state.session_length + 1) * 60)
              : this.formatTime(state.session_length * 60),
        };
      });
    }
  }

  /*
   * Decreases the session
   *
   */
  decreaseLength() {
    if (!this.state.isStartTimer) {
      this.setState((state) => {
        return {
          session_length:
            state.session_length - 1 >= 1
              ? state.session_length - 1
              : state.session_length,

          session_in_secs:
            state.session_length * 60 - 60 >= 60
              ? state.session_length * 60 - 60
              : state.session_length * 60,

          time_left:
            state.session_length * 60 - 60 >= 60
              ? this.formatTime(state.session_length * 60 - 60)
              : this.formatTime(state.session_length * 60),
        };
      });
    }
  }

  /*
   * Resets the clock to default settings
   *
   */
  reset() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.stopTimer();
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
                <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 pt-4">
                  <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <h4 id="break-label" class="controls-title text-center">
                        Break Length
                      </h4>
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

                <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 pt-4">
                  <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <h4 id="session-label" class="controls-title text-center">
                        Session Length
                      </h4>
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
                      {!this.state.isStartBreak ? "SESSION" : "BREAK"}
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
            <div class="text-center text-black mt-2">
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
