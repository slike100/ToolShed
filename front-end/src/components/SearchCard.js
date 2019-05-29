import React from "react";

class SearchCard extends React.Component {
  render() {
    return (
      <div className="sidebar-card">
        <img className="sidebar-card-img" src="https://via.placeholder.com/80" alt="" />
        <p className="sidebar-card-name">Jackhammer</p>
        <p className="sidebar-card-price">$20</p>
      </div>
    )
  }
}

export default SearchCard;