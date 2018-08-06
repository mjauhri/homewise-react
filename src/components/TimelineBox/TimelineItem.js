import React from 'react';
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



const TimelineItem = ({ id, month, date, day, name, first, last, selected, className, onItemClick, show, modalIsOpen, closeModal}) => (
    <div className={"panel-piece cursor"} onClick={(id) => onItemClick(id)}>
     
        <div className="item-cont">
            <div className={"item-pnl" + (first ? " first": "") + (last ? " last": "")  + (selected ? " selected" : "")}>
                <div className="item-cnt">
                    <div className="d-flex justify-content-center align-items-center flex-column">
                        <p>{date}</p>
                        <p>{month}</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-start flex-column">
                        <p>{name}</p>
                        <p>{date}</p>
                    </div>
                </div>
            </div>

            <div className={"check-pnl" + (selected ? " selected" : "")}>
                <i className="fa fa-check-circle" aria-hidden="true"></i>
            </div>
        </div>
    </div>
);

export default TimelineItem;
