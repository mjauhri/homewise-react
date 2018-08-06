import React from 'react';
import DonutChart from '../DonutChart';

const Header = ({ completedPercent, address, city, state, first_name, last_name }) => (
  <header className="base header">
    <div className="common responsive header-wrapper">
      <div className="top-intro">
        <div className="d-flex flex-row">
          <div className="icon-piece">
            <i className="fa fa-home" aria-hidden="true"></i>
          </div>
          <div className="address">
            <div>{address}</div>
            <div>{city}, {state}</div>
          </div>
        </div>

        <div className="text-right">
          <div>
            {first_name} {last_name}
          </div>
          <div>
            Last updated 10/1/2017
          </div>
        </div>
      </div>

      <div className="main-intro">
        <div className="chart">
          <DonutChart
            value={completedPercent}
            valuelabel={"Completed"}
            size={208}
            strokewidth={11}
          />
        </div>
        <div className="intro-pnl">
          <h2>30 days to closing</h2>
          <p>Inspection deadline coming up in 6 days</p>
          <div className="d-flex agent-pnl">
            <div></div>
            <div>Agent Name</div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
