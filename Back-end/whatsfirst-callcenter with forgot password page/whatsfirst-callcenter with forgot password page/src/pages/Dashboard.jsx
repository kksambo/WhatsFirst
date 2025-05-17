import React, { useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import CallRecordingModal from '../components/CallRecordingModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDownload,
  faUserPlus,
  faUserEdit,
  faCircle,
  faSms ,
  faAngleUp,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [showRecordingModal, setShowRecordingModal] = useState(false);

  // Line chart data
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [{
      label: "Earnings",
      fill: true,
      data: ["0", "10000", "5000", "15000", "10000", "20000", "15000", "25000"],
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      tension: 0.4
    }]
  };

  // Doughnut chart data
  const doughnutChartData = {
    labels: ["WhatsApp Calls", "Normal Calls", "Unanswered Calls"],
    datasets: [{
      data: ["50", "30", "15"],
      backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
      borderColor: ["#ffffff", "#ffffff", "#ffffff"]
    }]
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <Topbar />
          <div className="container-fluid">
            <div className="d-sm-flex justify-content-between align-items-center mb-4">
              <h3 className="text-dark mb-0">Dashboard</h3>
              <button 
                className="btn btn-primary btn-sm d-none d-sm-inline-block" 
                
                onClick={() => setShowRecordingModal(true)}
              >
                <FontAwesomeIcon icon={faDownload} className="fa-sm text-white-50 me-1" />
                Record Call
              </button>
            </div>
            
            <CallRecordingModal 
              show={showRecordingModal} 
              handleClose={() => setShowRecordingModal(false)} 
            />

            <div className="row">
              <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-left-primary py-2">
                  <div className="card-body">
                    <div className="row g-0 align-items-center">
                      <div className="col me-2">
                        <div className="text-dark fw-bold h5 mb-0">
                          <span>DIAL WITH WHATSAPP</span>
                        </div>
                      </div>
                      <div className="col-auto">
                        <FontAwesomeIcon icon={faWhatsapp} className="fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-left-success py-2">
                  <div className="card-body">
                    <div className="row g-0 align-items-center">
                      <div className="col me-2">
                        <div className="text-dark fw-bold h5 mb-0">
                          <span>NORMAL DIAL</span>
                        </div>
                      </div>
                      <div className="col-auto">
                        <FontAwesomeIcon icon={faPhone} className="fa-2x text-gray-300" style={{ fontSize: '27px' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-left-info py-2">
                  <div className="card-body">
                    <div className="row g-0 align-items-center">
                      <div className="col me-2">
                        <div className="row g-0 align-items-center">
                          <div className="col-auto">
                            <div className="text-dark fw-bold h5 mb-0 me-3">
                              <span>ADD A CLIENT</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto">
                        <FontAwesomeIcon icon={faUserPlus} className="fa-2x text-gray-300" style={{ fontSize: '30px' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3 mb-4">
                <div className="card shadow border-left-warning py-2">
                  <div className="card-body">
                    <div className="row g-0 align-items-center">
                      <div className="col me-2">
                        <div className="text-dark fw-bold h5 mb-0">
                          <span>EDIT CLIENT DETAILS</span>
                        </div>
                      </div>
                      <div className="col-auto">
                        <FontAwesomeIcon icon={faUserEdit} className="fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-lg-7 col-xl-8">
                <div className="card shadow mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="text-primary fw-bold m-0">Call Service Overview</h6>
                    <div className="dropdown no-arrow">
                      <button className="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button">
                        <i className="fas fa-ellipsis-v text-gray-400"></i>
                      </button>
                      <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                        <p className="text-center dropdown-header">dropdown header:</p>
                        <a className="dropdown-item" >&nbsp;Action</a>
                        <a className="dropdown-item" >&nbsp;Another action</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" >&nbsp;Something else here</a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="chart-area">
                      <Line 
                        data={lineChartData} 
                        options={{
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              display: false
                            }
                          },
                          scales: {
                            x: {
                              grid: {
                                color: "rgb(234, 236, 244)",
                                drawBorder: false,
                                drawTicks: false,
                                borderDash: [2],
                                zeroLineBorderDash: [2],
                                drawOnChartArea: false
                              },
                              ticks: {
                                color: "#858796",
                                padding: 20
                              }
                            },
                            y: {
                              grid: {
                                color: "rgb(234, 236, 244)",
                                drawBorder: false,
                                drawTicks: false,
                                borderDash: [2],
                                zeroLineBorderDash: [2]
                              },
                              ticks: {
                                color: "#858796",
                                padding: 20
                              }
                            }
                          }
                        }} 
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-xl-4">
                <div className="card shadow mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="text-primary fw-bold m-0">CALL SERVICE LEVELS</h6>
                    <div className="dropdown no-arrow">
                      <button className="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button">
                        <i className="fas fa-ellipsis-v text-gray-400"></i>
                      </button>
                      <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                        <p className="text-center dropdown-header">dropdown header:</p>
                        <a className="dropdown-item" href="#">&nbsp;Action</a>
                        <a className="dropdown-item" href="#">&nbsp;Another action</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">&nbsp;Something else here</a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="chart-area">
                      <Doughnut 
                        data={doughnutChartData} 
                        options={{
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              display: false
                            }
                          }
                        }} 
                      />
                    </div>
                    <div className="text-center small mt-4">
                      <span className="me-2">
                        <FontAwesomeIcon icon={faCircle} className="text-primary" />
                        &nbsp;WhatsApp Calls
                      </span>
                      <span className="me-2">
                        <FontAwesomeIcon icon={faCircle} className="text-success" />
                        &nbsp;Normal&nbsp; Calls
                      </span>
                      <span className="me-2">
                        <FontAwesomeIcon icon={faCircle} className="text-info" />
                        &nbsp;Unanswered Calls
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="text-primary fw-bold m-0">Calls Summary</h6>
                  </div>
                  <div className="card-body">
                    <h4 className="small fw-bold">Unanswered Calls<span className="float-end">20%</span></h4>
                    <div className="progress mb-4">
                      <div className="progress-bar bg-danger" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{ width: '20%' }}>
                        <span className="visually-hidden">20%</span>
                      </div>
                    </div>
                    <h4 className="small fw-bold">WhatsApp Calls<span className="float-end">60%</span></h4>
                    <div className="progress mb-4">
                      <div className="progress-bar bg-primary" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: '60%' }}>
                        <span className="visually-hidden">60%</span>
                      </div>
                    </div>
                    <h4 className="small fw-bold">Normal Calls<span className="float-end">80%</span></h4>
                    <div className="progress mb-4">
                      <div className="progress-bar bg-info" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: '80%' }}>
                        <span className="visually-hidden">80%</span>
                      </div>
                    </div>
                    <h4 className="small fw-bold">Calls Made Today<span className="float-end">100</span></h4>
                    <div className="progress mb-4">
                      <div className="progress-bar bg-success" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }}>
                        <span className="visually-hidden">100%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="text-primary fw-bold m-0">Contact List</h6>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="row g-0 align-items-center">
                        <div className="col-md-9 me-2">
                          <h6 className="mb-0"><strong>M Sithole</strong></h6>
                          <span className="text-xs">+27 765432981</span>
                        </div>
                        <div className="col-md-1">
                          <FontAwesomeIcon icon={faWhatsapp} className="fa-2x text-gray-300" />
                        </div>
                        <div className="col-md-1 offset-md-0">
                          <FontAwesomeIcon icon={faSms } className="fa-2x text-gray-300" />
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row g-0 align-items-center">
                        <div className="col-md-9 me-2">
                          <h6 className="mb-0"><strong>M Mabhena</strong></h6>
                          <span className="text-xs">+27 762434576</span>
                        </div>
                        <div className="col-md-1 offset-md-0">
                          <FontAwesomeIcon icon={faWhatsapp} className="fa-2x text-gray-300" />
                        </div>
                        <div className="col">
                          <FontAwesomeIcon icon={faSms } className="fa-2x text-gray-300" />
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row g-0 align-items-center">
                        <div className="col-md-9 me-2">
                          <h6 className="mb-0"><strong>E Nkosi</strong></h6>
                          <span className="text-xs">+27 84 5157 153</span>
                        </div>
                        <div className="col-md-1">
                          <FontAwesomeIcon icon={faWhatsapp} className="fa-2x text-gray-300" />
                        </div>
                        <div className="col">
                          <FontAwesomeIcon icon={faSms } className="fa-2x text-gray-300" />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <div className="row">
                  <div className="col-lg-6 mb-4">
                    <div className="card text-white bg-success shadow">
                      <div className="card-body">
                        <p className="m-0">Successful Calls</p>
                        <p className="text-white-50 small m-0">50</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="card text-white bg-info shadow">
                      <div className="card-body">
                        <p className="m-0">Information on our clients</p>
                        <p className="text-white-50 small m-0">Some clients do not use WhatsApp</p>
                      </div>
                    </div>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <a className="border rounded d-inline scroll-to-top">
        <FontAwesomeIcon icon={faAngleUp} />
      </a>
     
    </div>
  );
};

export default Dashboard;