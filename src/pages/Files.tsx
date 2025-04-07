/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { FileUploadService, UsersService } from "../services/api-services";
import { getUser } from "../hooks/common";
import apiService from "../hooks/apiService";
import axios from "axios";
type FileItem = {
  id: string;
  name: string;
  s3Url: string;
  size: number;
  mimeType: string;
  status: string;
  sharedWith: string[];
};

const Files = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { handleRequest } = apiService();
  const [showShareModal, setShowShareModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFileForShare, setSelectedFileForShare] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [files, setFiles] = useState<FileItem[]>([]);
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setIsLoading(true);
    handleRequest(FileUploadService.getApiFileUploadGetMyFiles()).then(
      (response) => {
        setIsLoading(false);
        if (response && response.length) {
          setFiles(response);
        }
      }
    );
  };

  const handleShare = (file: any) => {
    setSelectedFileForShare(file);
    setShowShareModal(true);
    setSearchText("");
    setSearchResults([]);
  };

  const handleSearchUsers = async () => {
    if (!searchText) return;
    handleRequest(UsersService.getApiUsers1(searchText)).then((resp) => {
      if (resp && resp.success) setSearchResults(resp.data);
    });
  };

  const handleSelectUserToShare = async (email: any) => {
    try {
      await FileUploadService.postApiFileUploadShare({
        fileId: selectedFileForShare.id,
        sharedWith: email,
        fileAccessAs: 0,
      });

      alert("File shared successfully!");
      setShowShareModal(false);
      fetchFiles(); // refresh list
    } catch (err) {
      console.error("Failed to share file", err);
    }
  };

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const fileName = selectedFile?.name;
    const size = selectedFile?.size;
    const mimeType = selectedFile?.type;
    const uploadedBy = getUser()?.email;
    debugger;
    // get presigned URL
    handleRequest(
      FileUploadService.postApiFileUpload({
        fileName,
        size,
        mimeType,
        uploadedBy,
      })
    ).then(async (response) => {
      console.log(response);
      debugger;
      if (response.presignedUrl) {
        const resp = await axios.put(response.presignedUrl, selectedFile, {
          headers: {
            "Content-Type": mimeType,
          },
        });
        console.log(resp);
      }

      // const formData = new FormData();
      // formData.append("file", selectedFile);
      // try {
      //   await axios.post("/api/FileUpload", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   });
      //   fetchFiles();
      //   setShowModal(false);
      // } catch (error) {
      //   console.error("Error uploading file", error);
      // }
    });
  };

  const handleDelete = async (fileId: string) => {
    if (confirm("Are you sure you want to delete this file?")) {
      // await handleRequest(FileUploadService.(fileId));
      console.log(fileId);
      fetchFiles(); // Refresh file list
    }
  };

  const handleDownload = (fileName: string) => {
    setIsDownloading(true);
    handleRequest(
      FileUploadService.getApiFileUploadGeneratePresignedUrl(fileName).then(
        (response) => {
          const presignedUrl = response?.presignedUrl;
          if (presignedUrl) {
            const link = document.createElement("a");
            link.href = presignedUrl;
            link.setAttribute("download", fileName); // Optional: set file name
            link.setAttribute("target", "_blank"); // Optional: open in new tab if needed
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setIsDownloading(false);
          } else {
            console.error("Presigned URL not received");
          }
        }
      )
    );
  };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        <div className="container mt-5">
          <h2>Uploaded Files</h2>
          <button
            className="btn btn-primary mb-3"
            onClick={() => setShowModal(true)}
          >
            Upload File
          </button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>File Name</th>
                <th>Size</th>
                <th>Type</th>
                <th>Shared With</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : files.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted">
                    No files found
                  </td>
                </tr>
              ) : (
                files.map((file: any, index: number) => (
                  <tr key={file.id}>
                    <td>{index + 1}</td>
                    <td>{file.name}</td>
                    <td>{(file.size / 1024).toFixed(2)} KB</td>
                    <td>{file.mimeType || "N/A"}</td>
                    <td>
                      {file.sharedWith && file.sharedWith.length > 0 ? (
                        file.sharedWith.map((entry: any, i: number) => (
                          <span
                            key={i}
                            className="badge bg-info text-dark me-1"
                          >
                            {entry.sharedWith}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted">Not Shared</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleDownload(file.s3Url)}
                      >
                        {isDownloading ? "Downloading ..." : "Download"}
                      </button>
                      <button
                        className="btn btn-sm btn-danger me-2"
                        onClick={() => handleDelete(file.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleShare(file)}
                      >
                        Share
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload File</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleUpload}>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showShareModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Share File: {selectedFileForShare?.name}
                </h5>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="btn-close"
                />
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search user by email prefix..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchUsers()}
                />
                <ul className="list-group mt-2">
                  {searchResults.map((user) => (
                    <li
                      key={user.id}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleSelectUserToShare(user.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {user.email} ({user.name})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Files;
