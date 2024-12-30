import "./App.css";
import React from "react";
import icon from "./icon/avatar.png";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        fullName: "John Doe",
        bio: "Lorem Ipsum",
        imgSrc: icon,
        profession: "Software Developer",
      },
      shows: false,
      timeMounted: {
        seconds: 0,
        minutes: 0,
        hours: 0,
      },
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => {
        const { seconds, minutes, hours } = prevState.timeMounted;
        let newSeconds = seconds + 1;
        let newMinutes = minutes;
        let newHours = hours;

        if (newSeconds === 60) {
          newSeconds = 0;
          newMinutes += 1;
        }

        if (newMinutes === 60) {
          newMinutes = 0;
          newHours += 1;
        }

        return {
          timeMounted: {
            seconds: newSeconds,
            minutes: newMinutes,
            hours: newHours,
          },
        };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { person, shows, timeMounted } = this.state;
    const toggleProfile = () => {
      this.setState({ shows: !shows });
    };
    return (
      <div className="App">
        {shows && (
          <div className="profile">
            <h1>{person.fullName}</h1>
            <p>{person.bio}</p>
            <img src={person.imgSrc} alt="Avatar" />
            <h4>{person.profession}</h4>
          </div>
        )}
        <button
          className={shows ? "true" : "false"}
          onClick={toggleProfile}
          type="button"
        >
          {shows ? "Hide Profile" : "Show Profile"}
        </button>
        <h2>
          Last Time Component Mounted: {timeMounted.hours}h{" "}
          {timeMounted.minutes}m {timeMounted.seconds}s
        </h2>
      </div>
    );
  }
}

export default App;
