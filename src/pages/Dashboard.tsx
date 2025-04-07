import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalFilesShared, setTotalFilesShared] = useState(0);

  useEffect(() => {
    // Example: Replace these with your actual API calls
    fetchJobs();
    fetchFilesShared();
  }, []);

  const fetchJobs = async () => {
    // Mock API call
    setTotalJobs(3); // Replace with real API data
  };

  const fetchFilesShared = async () => {
    // Mock API call
    setTotalFilesShared(1); // Replace with real API data
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        <div className="alert alert-primary text-center" role="alert">
          <h1>Welcome to Tal Storage Dashboard</h1>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card text-white bg-success mb-3">
              <div className="card-header text-center">Total Files</div>
              <div className="card-body text-center">
                <h2 className="card-title">{totalJobs}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-white bg-info mb-3">
              <div className="card-header text-center">Total Files Shared</div>
              <div className="card-body text-center">
                <h2 className="card-title">{totalFilesShared}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;