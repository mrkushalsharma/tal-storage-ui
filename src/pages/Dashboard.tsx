import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import apiService from "../hooks/apiService";
import { FileUploadService } from "../services/api-services";

const Dashboard = () => {
  const { handleRequest, isLoading } = apiService();
  const [totalFiles, setTotalFiles] = useState(0);
  const [totalFilesShared, setTotalFilesShared] = useState(0);

  useEffect(() => {
    // Example: Replace these with your actual API calls
    handleRequest(
      FileUploadService.getApiFileUploadFilesCount().then((response) => {
        if (response) {
          setTotalFiles(response.myFiles);
          setTotalFilesShared(response.sharedWithMe);
        }
      })
    );
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="container"
        style={{ paddingTop: "60px", paddingBottom: "60px" }}
      >
        <div className="alert alert-primary text-center" role="alert">
          <h1>Welcome to Tal Storage Dashboard</h1>
        </div>
        <div className="row justify-content-center">
          {isLoading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <>
              <div className="col-md-4">
                <div className="card text-white bg-success mb-3">
                  <div className="card-header text-center">Total Files</div>
                  <div className="card-body text-center">
                    <h2 className="card-title">{totalFiles}</h2>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card text-white bg-info mb-3">
                  <div className="card-header text-center">
                    Total Files Shared
                  </div>
                  <div className="card-body text-center">
                    <h2 className="card-title">{totalFilesShared}</h2>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
