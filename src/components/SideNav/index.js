import React from 'react';

const SideNav = ({ title, items }) => (
    <div className={'side-nav'}>
        <div className="d-flex justify-content-between" style={{paddingBottom: 10}}>
            <p>{title}</p>
            <div className="icon-piece cursor">
                <i className="fa fa-cog" aria-hidden="true"></i>
            </div>
        </div>
        <div className="item-cont">
            {
                items.map((val, i)=>{
                    return (
                        <div className="item-row" key={`side-${i}`}>
                            <div></div>
                            <div>
                                <div>{val.name}</div>
                                <div>{val.role}</div>
                            </div>
                            <div className="cursor">
                                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
);

export default SideNav;
