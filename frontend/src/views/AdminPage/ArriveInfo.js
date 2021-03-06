import React, { Component } from "react";
import axios from "axios";
import QrReader from "react-qr-reader";

import GridItem from "components/Grid/GridItem.js";
import "../../assets/css/ArriveInfo.css";

export default class ArriveInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 1000,
      result: "No result",
    };

    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(data) {
    const { homeTeamID, awayTeamID, matchhour } = this.props;
    if (homeTeamID === Number(data) && !this.props.isHomeTeamArrived) {
      console.log("홈팀 도착!");
      const homedateInfo = new Date();
      var homehour = String(homedateInfo.getHours());
      var homeminute = String(homedateInfo.getMinutes());
      if (homehour < 10) {
        homehour = "0" + homehour;
      }
      if (homeminute < 10) {
        homeminute = "0" + homeminute;
      }
      this.props.setIsHomeTeamArrived(true);
      this.setState({
        hometeamarrivetime: `${homehour}시 ${homeminute}분`,
      });
      if (Number(homehour) >= matchhour && 0 < Number(homeminute) < 10) {
        this.props.setHomeTeamLateStatus(1);
      } else if (Number(homehour) >= matchhour && Number(homeminute) >= 10) {
        this.props.setHomeTeamLateStatus(2);
      }
    }
    if (awayTeamID === Number(data) && !this.props.isAwayTeamArrived) {
      console.log("원정팀 도착!");
      const awaydateInfo = new Date();
      var awayhour = String(awaydateInfo.getHours());
      var awayminute = String(awaydateInfo.getMinutes());
      if (awayhour < 10) {
        awayhour = "0" + awayhour;
      }
      if (awayminute < 10) {
        awayminute = "0" + awayminute;
      }
      this.props.setIsAwayTeamArrived(true);
      this.setState({
        awayteamarrivetime: `${awayhour}시 ${awayminute}분`,
      });
      if (Number(awayhour) >= matchhour && 0 < Number(awayminute) < 10) {
        this.props.setAwayTeamLateStatus(1);
      } else if (Number(awayhour) >= matchhour && Number(awayminute) >= 10) {
        this.props.setAwayTeamLateStatus(2);
      }
    }
    this.setState({
      result: data,
    });
  }
  handleError(err) {
    console.error(err);
  }

  render() {
    return (
      <GridItem xs={12} className="arrive-info-container">
        <GridItem xs={4} className="QR-reader-container">
          <QrReader
            delay={this.state.delay}
            style={{ width: "75%", margin: "auto", marginTop: "15px" }}
            onError={this.handleError}
            onScan={this.handleScan}
          />
          <p style={{ fontSize: "12px", marginTop: "8px" }}>
            팀 QR을 찍으면 오른쪽에 도착시간이 표시됩니다.
          </p>
        </GridItem>
        <GridItem xs={8} className="arrive-contents">
          <GridItem xs={12} className="arrive-content">
            <h2>팀 도착 정보</h2>
          </GridItem>
          <GridItem xs={12} className="arrive-content">
            <GridItem xs={4} className="arrive-content-team">
              <h3>{this.props.homeName}</h3>
            </GridItem>
            <GridItem xs={8} className="arrive-content-time">
              <h4>{this.state.hometeamarrivetime}</h4>
            </GridItem>
          </GridItem>
          <GridItem xs={12} className="arrive-content">
            <GridItem xs={4} className="arrive-content-team">
              <h3>{this.props.awayName}</h3>
            </GridItem>
            <GridItem xs={8} className="arrive-content-time">
              <h4>{this.state.awayteamarrivetime}</h4>
            </GridItem>
          </GridItem>
        </GridItem>
      </GridItem>
    );
  }
}
