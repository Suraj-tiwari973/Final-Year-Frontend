import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./police.css";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PoliceDashboard = () => {
  const navigate = useNavigate();
  const [userChallanData, setUserChallanData] = useState([]);

  let uri;

  if (process.env.NODE_ENV === 'development') {
      // Running in local development environment
      uri = process.env.REACT_APP_API_URL || 'http://localhost:3002';
  } else {
      // Running in production or staging environment
      uri = process.env.REACT_APP_API_URI;
  }

  useEffect(() => {
    fetchUserChallanData();
  }, []);

  const fetchUserChallanData = () => {
    axios
      .get(uri+"/api/police/getUserChallanData")
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          toast.error(response.data.error);
        } 
        else {
          toast.success(response.data.message);
          setUserChallanData(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Error while fetching records :", error);
      });
  };

  return (
    <>
      <div className="header">
        <div className="left">
          <h3>Police Dashboard</h3>
        </div>
        <div className="right">
          <button className="btn bg-danger" onClick={() => navigate("/userChallan")}>
            New Challan
          </button>
          {/* <button className="button">Delete Challan</button> */}
        </div>
      </div>
      <div className="table--container">
        <table className="table police--table">
          <thead>
            <tr>
              <th scope="col">Vehicle No</th>
              <th scope="col">Name</th>
              <th scope="col">Contact No</th>
              <th scope="col">Email</th>
              <th scope="col">Rule Violated</th>
              <th scope="col">Challan Date</th>
              <th scope="col">Due Payment</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {userChallanData.map((item, key) => (
              <tr key={key}>
                <td>{item.vehicleNumber}</td>
                <td>{item.name}</td>
                <td>{item.contact}</td>
                <td>{item.email}</td>
                <td>{item.ruleViolated}</td>
                <td>{item.date}</td>
                <td style={{ fontWeight: 'bold', color: "green" }}>{item.amount}</td>
                <td style={{ backgroundColor: 'red', color: 'white' }}>Unpaid</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </>
  );
};

export default PoliceDashboard;