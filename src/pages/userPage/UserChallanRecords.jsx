import React,{useEffect,useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./user.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserChallanRecords = () => {

  const [challanDetailsArray,setChallanDetailsArray] = useState([]);

  let uri;

  if (process.env.NODE_ENV === 'development') {
      // Running in local development environment
      uri = process.env.REACT_APP_API_URL || 'http://localhost:3002';
  } else {
      // Running in production or staging environment
      uri = process.env.REACT_APP_API_URI;
  }

  const location = useLocation();
  const vehicleNumber = location.state ? location.state.validVehicleNumber : null;
  console.log(`this is ${vehicleNumber}`);

  // fetch userChallan Details mapped to the respetive vehicle number.
  const fetchUserChallanDetails = async()=>{
    try {
      const response = await axios.get(uri+`/api/userChallan/userChallanDetails/${vehicleNumber}`);
      const message = response.data.message;
      const error = response.data.error;

      if(error){
        toast.error(error);
        return;
      }
      if(message){
        setChallanDetailsArray(message);
      }
    } 
    catch (error) {
      console.log("Error fetching data",error);
    }
  }

  // purpose of this useEffect is that it should get executed automatically when component mounts first time.
  useEffect(()=>{
    fetchUserChallanDetails()
  },[]);

  return (
    <>
      <header className="heading">
        <h2>eChallan</h2>
        <h4>Hello User</h4>
      </header>
      <ol>
        {challanDetailsArray.map((item, index) => {
          return (
            <li>
              <Container fluid key={index}>
                <Row className="m-3 container-row">
                  <Col md={10} sm={12}>
                    <Row>
                      <Col
                        md={6}
                        sm={6}
                        className="flex-shrink-0 user-data-box"
                        style={{backgroundColor:"aliceblue"}}
                      >
                        <h4>Accused Name</h4>
                        <p>{item.name}</p>
                      </Col>
                      <Col
                        md={6}
                        sm={6}
                        className="flex-shrink-0 user-data-box"
                        style={{backgroundColor:"aliceblue"}}
                      >
                        <h4>Date of Voilation</h4>
                        <p>{item.date}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        md={6}
                        sm={6}
                        className="flex-shrink-0 user-data-box"
                        style={{backgroundColor:"aliceblue"}}
                      >
                        <h4>Payment Due</h4>
                        <p>{item.amount}</p>
                      </Col>
                      <Col
                        md={6}
                        sm={6}
                        className="flex-shrink-0 user-data-box"
                        style={{backgroundColor:"aliceblue"}}
                      >
                        <h4>Vehicle Number</h4>
                        <p>{item.vehicleNumber}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        md={6}
                        sm={6}
                        className="flex-shrink-0 user-data-box"
                        style={{backgroundColor:"aliceblue"}}
                      >
                        <h4>Rule Voilated</h4>
                        <p>{item.ruleViolated}</p>
                      </Col>
                      <Col
                        md={6}
                        sm={6}
                        className="flex-shrink-0 user-data-box"
                        style={{backgroundColor:"aliceblue"}}
                      >
                        <h4>Payment Status</h4>
                        <p style={{color: item.status === "Pending" ? "red" : "green"}}>{item.status}</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    md={2}
                    sm={12}
                    className="flex-shrink-0 user-data-box"
                    style={{backgroundColor:"#fff",padding:"10px"}}
                  >
                     <button 
                      className={`btn w-100 mt-sm-3 text-light ${item.status === "Pending" ? "pending" : ""}`} 
                      style={{backgroundColor: item.status === "Pending" ? "red" : "green",opacity:1,fontWeight:"bold"}}
                      disabled={item.status === "Pending" ? false : true}
                     >
                      {item.status === "Pending" ? "Pay Now" :"Paid"}
                     </button>
                  </Col>
                </Row>
              </Container>
            </li>
          );
        })}
      </ol>
      <ToastContainer/>
    </>
  );
};

export default UserChallanRecords;
