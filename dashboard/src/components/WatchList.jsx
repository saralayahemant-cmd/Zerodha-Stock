
import {useState} from "react";
import { watchlist } from "../data/data";
import { useContext } from "react";

import GeneralContext from "./GeneralContext";

import {KeyboardArrowDown,KeyboardArrowUp, MoreHoriz} from "@mui/icons-material"
import {Tooltip,Grow} from "@mui/material"


const WatchList = () => {
  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock,idx)=>{
          return(
            <WatchListItem stock={stock} key={idx}/>
          )
        })}
      </ul>
    </div>
  );
};

export default WatchList;

const WatchListItem=({stock})=>{
  const [showWatchListActions,setShowWatchListActions]=useState(false);
  const handleMouseEnter=()=>{
    setShowWatchListActions(true);
  }
  const handleMouseLeave=()=>{
    setShowWatchListActions(false);
  }

  return(
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {
            stock.isDown ?(<KeyboardArrowDown className="down"></KeyboardArrowDown>):
            (<KeyboardArrowUp className="up"></KeyboardArrowUp>)
          }
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchListActions && <WatchListActions uid={stock.name}/>}
    </li>
  )
}

const WatchListActions=({uid})=>{

  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };
  const handleSellClick = () => {
    generalContext.openSellWindow(uid);
  };
  return(
    <span className="actions">
      <span>
        <Tooltip
        title="Buy (B)"
        placement="top"
        arrow
        TransitionComponent={Grow}
        >
          <button className="buy" onClick={handleBuyClick}>Buy</button>
        </Tooltip>
        <Tooltip
        title="Sell (S)"
        placement="top"
        arrow
        TransitionComponent={Grow}
        >
          <button className="sell" onClick={handleSellClick}>Sell</button>
        </Tooltip>
        <Tooltip
        title="Analytics"
        placement="top"
        arrow
        TransitionComponent={Grow}
        >
          <button className="chart">Ana</button>
        </Tooltip>
        <Tooltip
        title="More"
        placement="top"
        arrow
        TransitionComponent={Grow}
        >
          <button className="action">
            <MoreHoriz className="icon"/>
          </button>
        </Tooltip>
      </span>


    </span>
  )
}