import React from 'react';
import TimelineItem from './TimelineItem';
import Modal  from "react-modal";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


const TimelineBox = ({ timelineItems, leftBorderPercent, onItemClick, show, modalIsOpen, closeModal}) => (
    <div className="timline-box">
        <p>Timeline</p>
        <div className="d-flex position-relative">
        <div className="timeline-border" style={{height: `${leftBorderPercent}%`}}/>
        <div className="timeline-cont">
            {
            timelineItems.map((item, i) => {
                return (
                <div className={"panel-piece cursor"} onClick={(id) => onItemClick(id)}>
     
        <div className="item-cont">
            <div className={"item-pnl" + (item.first ? " first": "") + (item.last ? " last": "")  + (item.selected ? " selected" : "")}>
                <div className="item-cnt">
                    <div className="d-flex justify-content-center align-items-center flex-column">
                        <p>{item.date}</p>
                        <p>{item.month}</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-start flex-column">
                        <p>{item.name}</p>
                        <p>{item.date}</p>
                    </div>
                </div>
            </div>

            <div className={"check-pnl" + (item.selected ? " selected" : "")}>
                <i className="fa fa-check-circle" aria-hidden="true"></i>
            </div>
        </div>
    </div>
                )
            })
            }
        </div>
        </div>
    </div>
);

export default TimelineBox;
