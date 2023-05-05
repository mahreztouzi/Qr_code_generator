import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCommentAlt,
  faUserPlus,
  faCog,
  faFileMedical,
  faList,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faBuffer } from "@fortawesome/free-brands-svg-icons";

const Sidebar = ({ setTitle }) => {
  return (
    <div>
      <div className="sideBrand">
        <div className="sideBrnIcon">
          <FontAwesomeIcon icon={faBuffer} />
        </div>
        <h2>
          Easy <span className="navHighlight">Consulting</span>
        </h2>
      </div>
      <nav id="sideNavbar">
        <ul>
          <li>
            <NavLink
              onClick={() => setTitle("Profile")}
              activeclassname="activePage"
              exact
              to="/dashboard/profile"
            >
              <FontAwesomeIcon icon={faUserCircle} className="iconC" />
              Profile
            </NavLink>
          </li>

          <>
            <li>
              <NavLink
                onClick={() => setTitle("Order List")}
                activeclassname="activePage"
                to="/dashboard/employeeList"
              >
                <FontAwesomeIcon icon={faList} className="iconC" />
                List des employés
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setTitle("Add Service")}
                activeclassname="activePage"
                to="/dashboard/addEmployee"
              >
                <FontAwesomeIcon icon={faFileMedical} className="iconC" />
                Ajouter un nouveau employee
              </NavLink>
            </li>
          </>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
