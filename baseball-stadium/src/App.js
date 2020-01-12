import React, { Component } from "react";
import "./styles/App.css";
import { Display } from "./components/Display";
import { Dashboard } from "./components/Dashboard";
import { Roster } from "./components/Roster";
import { Record } from "./components/GameRecord";
import { BaseTracker } from "./components/BaseTracker";
import { Tracker } from "./components/Tracker";
//todo check better comments ext for adding /*! and so forth
class App extends Component {
  constructor() {
    super();
    this.state = {
      strike: 0,
      ball: 0,
      foul: 0,
      hit: 0,
      inningHalf: false,
      inning: 0,
      error: 0,
      out: 0,
      homeScore: 0,
      visitorScore: 0,
      batting: {
        team: "",
        player: "",
        lastBat: 0
      },
      bases: {
        base1: "",
        base2: "",
        base3: "",
        base4: ""
      },

      teams: {
        home: {
          players: ["Braden", "Wes", "Steven", "Ark"],
          record: {
            strikes: {
              current: 0,
              inning: [],
              total: 0
            },
            balls: {
              current: 0,
              inning: [],
              total: 0
            },
            fouls: {
              current: 0,
              inning: [],
              total: 0
            },
            hits: {
              current: 0,
              inning: [],
              total: 0
            },
            runs: {
              current: 0,
              inning: [],
              total: 0
            },
            errors: {
              current: 0,
              inning: [],
              total: 0
            }
          },
          lastBat: 0
        },
        visitor: {
          players: ["AR", "Jeffery", "Jessica", "Jose"],
          record: {
            strikes: {
              current: 0,
              inning: [],
              total: 0
            },
            balls: {
              current: 0,
              inning: [],
              total: 0
            },
            fouls: {
              current: 0,
              inning: [],
              total: 0
            },
            hits: {
              current: 0,
              inning: [],
              total: 0
            },
            runs: {
              current: 0,
              inning: [],
              total: 0
            },
            errors: {
              current: 0,
              inning: [],
              total: 0
            }
          },
          lastBat: 0
        }
      }
    };
    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState({
      inning: 1,
      batting: {
        ...this.state.batting,
        team: Object.keys(this.state.teams)[0],
        player: this.state.teams.home.players[0],
        lastBat: 0
      }
    });
  }

  componentDidUpdate() {
    // ! Player Strike Out && Next Player
    if (this.state.strike === 3 && this.state.out < 3) {
      this.strikeOut();
    }

    // ! New Inning
    if (this.state.out === 3) {
      this.changeTeam();
    }
    // ! Walk
    if (this.state.ball === 4) {
      this.walk();
    }

    // ! Watches home base
    this.home();

    if (this.state.inning > 8) {
      this.state.homeScore > this.state.visitorScore
        ? alert(
            `Winner: Home ${this.state.homeScore}:${this.state.visitorScore}`
          )
        : alert(
            `Winner: Visitor ${this.state.visitorScore}:${this.state.homeScore}`
          );
    }
    // if (
    //   this.state.inning > 8 &&
    //   this.state.homeScore !== this.state.visitorScore
    // ) {
    //   this.state.homeScore > this.state.visitorScore
    //     ? alert(
    //         `Winner: Home ${this.state.homeScore}:${this.state.visitorScore}`
    //       )
    //     : alert(
    //         `Winner: Visitor ${this.state.visitorScore}:${this.state.homeScore}`
    //       );
    // } else {
    //   this.changeTeam();
    // }
  }

  strikeOut = () => {
    this.setState({
      ball: 0,
      strike: 0,
      out: this.state.out + 1
    });
    if (this.state.out < 2) {
      this.newBatter();
    }
  };

  walk = () => {
    const batter = this.state.batting.player;
    this.setState({
      strike: 0,
      ball: 0,
      bases: {
        base1: batter,
        base2: this.state.bases.base1,
        base3: this.state.bases.base2,
        base4: this.state.bases.base3
      }
    });
    this.newBatter();
  };

  home = () => {
    if (this.state.bases.base4 !== "") {
      const team = this.state.batting.team;
      this.setState({
        [`${team}Score`]: this.state[`${team}Score`] + 1,
        bases: { ...this.state.bases, base4: "" }
      });
    }
  };

  newBatter = () => {
    let batter =
      this.state.teams[this.state.batting.team].players.findIndex(
        e => e === this.state.batting.player
      ) + 1;

    // * loops over the array
    if (batter === this.state.teams[this.state.batting.team].players.length) {
      batter = 0;
    }
    this.setState({
      ball: 0,
      strike: 0,
      batting: {
        ...this.state.batting,
        team: this.state.batting.team,
        player: this.state.teams[this.state.batting.team].players[batter]
      }
    });
  };

  changeTeam = () => {
    let newTeam;
    this.state.batting.team === "home"
      ? (newTeam = Object.keys(this.state.teams)[1])
      : (newTeam = Object.keys(this.state.teams)[0]);

    let lastBatter = this.state.teams[this.state.batting.team].players.indexOf(
      this.state.batting.player
    );

    let newBatter = this.state.teams[newTeam].players[
      this.state.batting.lastBat
    ];

    const team = this.state.batting.team;
    const record = this.state.teams[team].record;
    const keys = Object.keys(record);
    // const values = Object.entries(record);
    const value = Object.values(record);
    // console.log(values, keys, value);
    // console.log(e[0], e[1]);
    let i = 0;
    keys.forEach(key => {
      i = i + 1;
      console.log(i);
      this.setState({
        teams: {
          ...this.state.teams,
          [team]: {
            ...this.state.teams[team],
            record: {
              ...record,
              [key]: "VALUE"
              // {
              //   ...record.key,
              //   "VALUE"
              //   // inning: [...record.key.inning, [this.state.inning, value[i]]]
              // }
            }
          }
        }
      });
    });
    //

    this.state.inningHalf
      ? this.setState({
          inning: this.state.inning + 1,
          inningHalf: false
        })
      : this.setState({
          inningHalf: true,
          ball: 0,
          strike: 0,
          out: 0,
          batting: {
            team: newTeam,
            player: newBatter,
            lastBat: lastBatter
          },
          bases: {
            base1: "",
            base2: "",
            base3: "",
            base4: ""
          },
          teams: {
            ...this.state.teams,
            [this.state.batting.team]: {
              ...this.state.teams[this.state.batting.team],
              lastBat: lastBatter
            }
          }
        });

    //  this.setState({
    //    teams: {
    //      ...this.state.teams,
    //      [team]: {
    //        ...this.state.teams[team],
    //        record: {
    //          ...record,
    //          [inputs]: {
    //            ...record[inputs],
    //            current: record[inputs].current + 1,
    //            total: record[inputs].total + 1
    //          }
    //        }
    //      }
    //    }
    //  });

    // if (this.state.inning > 9) {
    //   newTeam = Object.keys(this.state.teams)[1];
    //   lastBatter = this.state.teams.visitor.players.indexOf(
    //     this.state.teams.visitor.lastBat
    //   );
    //   newBatter = this.state.teams.visitor.players[
    //     this.state.teams.visitor.lastBat
    //   ];
    // }
  };

  //todo able to create custom hook for setting state on strike, ball, error handlers... DRY CODE

  scoreHandler = input => {
    const team = this.state.batting.team;
    const record = this.state.teams[team].record;
    const inputs = `${input}s`;
    this.setState({
      [input]: this.state[input] + 1,
      teams: {
        ...this.state.teams,
        [team]: {
          ...this.state.teams[team],
          record: {
            ...record,
            [inputs]: {
              ...record[inputs],
              current: record[inputs].current + 1,
              total: record[inputs].total + 1
            }
          }
        }
      }
    });
  };

  strikeHandler = () => {
    this.scoreHandler("strike");
  };

  ballHandler = () => {
    this.scoreHandler("ball");
  };

  foulHandler = () => {
    if (this.state.strike === 0) {
      this.setState({
        strike: 1,
        foul: this.state.foul + 1
      });
    } else if (this.state.strike === 1) {
      this.setState({
        strike: 2,
        foul: this.state.foul + 1
      });
    } else {
      this.setState({
        foul: this.state.foul + 1
      });
    }
    const team = this.state.batting.team;
    const record = this.state.teams[team].record;
    this.setState({
      teams: {
        ...this.state.teams,
        [team]: {
          ...this.state.teams[team],
          record: {
            ...record,
            fouls: {
              ...record.fouls,
              current: record.fouls.current + 1,
              total: record.fouls.total + 1
            }
          }
        }
      }
    });
  };

  errorHandler = () => {
    this.scoreHandler("error");
  };

  hitSingleHandler = () => {
    const batter = this.state.batting.player;
    this.setState({
      strike: 0,
      ball: 0,
      hit: this.state.hit + 1,
      bases: {
        base1: batter,
        base2: this.state.bases.base1,
        base3: this.state.bases.base2,
        base4: this.state.bases.base3
      }
    });
    this.newBatter();
  };

  hitDoubleHandler = () => {
    const batter = this.state.batting.player;
    this.setState({
      strike: 0,
      ball: 0,
      hit: this.state.hit + 1,
      bases: {
        base1: "",
        base2: batter,
        base3: this.state.bases.base1,
        base4: this.state.bases.base3
      }
    });
    this.newBatter();
  };

  hitTripleHandler = () => {
    const batter = this.state.batting.player;
    this.setState({
      strike: 0,
      ball: 0,
      hit: this.state.hit + 1,
      bases: {
        base1: "",
        base2: "",
        base3: batter,
        base4: this.state.bases.base1
      }
    });
    this.newBatter();
  };

  hitHomeRunHandler = () => {
    this.setState({
      strike: 0,
      ball: 0,
      hit: this.state.hit + 1,
      bases: {
        base1: "",
        base2: "",
        base3: "",
        base4: this.state.batting.player
      }
    });
    this.newBatter();
  };

  resetHandler = () => {
    this.setState({
      ...this.baseState,
      inning: 1,
      batting: {
        ...this.state.batting,
        team: Object.keys(this.state.teams)[0],
        player: this.state.teams.home.players[0],
        lastBat: 0
      }
    });
  };

  render() {
    // console.log("state", this.state);
    // console.log("reset", this.resetHandler);
    return (
      //todo add routes to team record and Roster components
      <div className="App">
        <h1>Baseball Testing</h1>
        <Display state={this.state} />
        <Tracker state={this.state} />
        <Dashboard
          strike={this.strikeHandler}
          ball={this.ballHandler}
          foul={this.foulHandler}
          error={this.errorHandler}
          single={this.hitSingleHandler}
          double={this.hitDoubleHandler}
          triple={this.hitTripleHandler}
          homeRun={this.hitHomeRunHandler}
          reset={this.resetHandler}
          scoreHandler={this.scoreHandler}
        />
        {/* <Roster teams={this.state.teams} /> */}
        <Record teams={this.state.teams} />
        <BaseTracker bases={this.state.bases} />
      </div>
    );
  }
}

export default App;
