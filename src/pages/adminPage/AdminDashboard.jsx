import React, { useState, useEffect } from "react";
import "./admin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [policeData, setPoliceData] = useState([]);

  let uri;

  if (process.env.NODE_ENV === 'development') {
      // Running in local development environment
      uri = process.env.REACT_APP_API_URL || 'http://localhost:3002';
  } else {
      // Running in production or staging environment
      uri = process.env.REACT_APP_API_URI;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(uri+"/api/police/getPoliceData")
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          toast.success(response.data.message);
          setPoliceData(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Error while fetching records :", error);
      });
  };

  const deletePolice = (policeId) => {
    axios
      .delete(uri+`/api/police/deletePoliceData/${policeId}`)
      .then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          // Fetch updated data after deletion
          fetchData();
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.log("Error while deleting:", error);
        toast.error("Error occurred while deleting Police ID.");
      });
  };

  const handleDelete = () => {
    const policeId = prompt("Enter Police ID to delete:");
    if (policeId !== null) {
      deletePolice(policeId);
    }
  };

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
          <button className="button" onClick={handleDelete}>
            Delete PID
          </button>
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
      <ToastContainer/>
    </>
  );
};

export default AdminDashboard;
