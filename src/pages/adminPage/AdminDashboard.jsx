import React, { useState, useEffect } from "react";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [policeData, setPoliceData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3002/api/admin/getPoliceData")
      .then((response) => {
        console.log(response);
        setPoliceData(response.data.message);
      })
      .catch((error) => {
        console.log("Error while fetching :", error);
      });
  }, []);

  return (
    <>
      <div className="header">
        <div className="left">
          <h3>Admin Dashboard</h3>
        </div>
        <div className="right">
          <button
            className="button"
            onClick={() => navigate("/policeRegister")}
          >
            Add PID
          </button>
          <button className="button">Delete PID</button>
        </div>
      </div>
      <div className="table--container">
        <table className="table admin--table">
          <thead>
            <tr>
              <th scope="col">PID</th>
              <th scope="col">Full Name</th>
              <th scope="col">Contact No</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {policeData.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.policeId}</td>
                  <td>{item.name}</td>
                  <td>{item.contact}</td>
                  <td>{item.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;
