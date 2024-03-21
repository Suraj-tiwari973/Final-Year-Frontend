import React from "react";
import { useNavigate } from "react-router-dom";
import "./police.css";


const PoliceDashboard = () => {
  const navigate = useNavigate();

  const dummyData = [
    {
      vehicleNumber: "MH 01 AB 1234",
      name: "John Doe",
      contact: "9876543210",
      challanNumber: "CH001",
      ruleViolated: "Speeding",
      duePayment: 500,
      status: "Unpaid",
      email: "abc@gmail.com"
      
    },
    {
      vehicleNumber: "KA 02 CD 5678",
      name: "Jane Smith",
      contact: "8765432109",
      challanNumber: "CH002",
      ruleViolated: "Parking violation",
      duePayment: 300,
      status: "Unpaid",
      email: "abc@gmail.com"
    },
    {
      vehicleNumber: "DL 03 EF 9012",
      name: "Alice Johnson",
      contact: "7654321098",
      challanNumber: "CH003",
      ruleViolated: "Traffic signal violation",
      duePayment: 600,
      status: "Unpaid",
      email: "abc@gmail.com"
    },
    {
      vehicleNumber: "UP 04 GH 3456",
      name: "Bob Williams",
      contact: "6543210987",
      challanNumber: "CH004",
      ruleViolated: "Driving without seatbelt",
      duePayment: 200,
      status: "Unpaid",
      email: "abc@gmail.com"
    },
    {
      vehicleNumber: "TN 05 IJ 7890",
      name: "Emily Brown",
      contact: "5432109876",
      challanNumber: "CH005",
      ruleViolated: "No parking zone",
      duePayment: 400,
      status: "Unpaid",
      email: "abc@gmail.com"
    },
    {
      vehicleNumber: "GJ 06 KL 2345",
      name: "Michael Wilson",
      contact: "4321098765",
      challanNumber: "CH006",
      ruleViolated: "Driving under influence",
      duePayment: 1000,
      status: "Unpaid",
      email: "abc@gmail.com"
    },
    {
      vehicleNumber: "MH 07 MN 4567",
      name: "Sophia Lee",
      contact: "3210987654",
      challanNumber: "CH007",
      ruleViolated: "Wrong lane driving",
      duePayment: 700,
      status: "Unpaid",
      email: "abc@gmail.com"
    },
    {
      vehicleNumber: "HR 08 OP 8901",
      name: "David Garcia",
      contact: "2109876543",
      challanNumber: "CH008",
      ruleViolated: "Over-speeding",
      duePayment: 800,
      status: "Unpaid",
      email: "abc@gmail.com"
    },
    {
      vehicleNumber: "RJ 09 QR 1234",
      name: "Olivia Martinez",
      contact: "1098765432",
      challanNumber: "CH009",
      ruleViolated: "Not wearing helmet",
      duePayment: 250,
      status: "Unpaid",
      email: "abc@gmail.com"
    },
    {
      vehicleNumber: "AP 10 ST 5678",
      name: "Daniel Rodriguez",
      contact: "0987654321",
      challanNumber: "CH010",
      ruleViolated: "Using mobile phone while driving",
      duePayment: 150,
      status: "Unpaid",
      email: "abc@gmail.com"
    },
  ];
  return (
    <>
      <div className="header">
        <div className="left">
          <h3>Police Dashboard</h3>
        </div>
        <div className="right">
          <button className="button" onClick={() => navigate("/userChallan")}>
            New Challan
          </button>
          <button className="button">Delete Challan</button>
        </div>
      </div>
      <div className="table--container">
        <table className="table police--table">
          <thead>
            <tr>
              <th scope="col">Vehical No</th>
              <th scope="col">Name</th>
              <th scope="col">Contact No</th>
              <th scope="col">Email</th>
              <th scope="col">Rule Voileted</th>
              <th scope="col">Due Payment</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.vehicleNumber}</td>
                  <td>{item.name}</td>
                  <td>{item.contact}</td>
                  <td>{item.email}</td>
                  <td>{item.ruleViolated}</td>
                  <td style={{fontWeight:'bold',color:"green"}}>{item.duePayment}</td>
                  <td style={{backgroundColor:'red',color:'white'}}>{item.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PoliceDashboard;
