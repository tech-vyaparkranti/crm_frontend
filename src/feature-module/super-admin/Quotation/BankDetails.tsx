 // Alternatively, if you prefer to use window.print() instead of the library
import React, { useRef } from 'react';

interface BankDetailsProps {
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    accountType: string;
    bankName: string;
    ifsc: string;
    swiftCode: string;
    branch: string;
    gst: string;
    upiId: string;
  };
  logo?: string;
}

const BankDetails: React.FC<BankDetailsProps> = ({ 
  bankDetails = {
    accountName: "PRATHMA INOPEX PRIVATE LIMITED",
    accountNumber: "50200094899965",
    accountType: "CURRENT ACCOUNT",
    bankName: "HDFC BANK LTD",
    ifsc: "HDFC0000438",
    swiftCode: "HDFCINBBDEL",
    branch: "THANA ROAD, NAJAFGARH",
    gst: "07AAOCP7803K1ZX",
    upiId: "9958224825@pz"
  },
  logo = "/prathma-logo.png"
}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  
  // Simple print function using native browser functionality
  const handlePrint = () => {
    window.print();
  };
  
  const handleReset = () => {
    // Implementation for reset functionality
    window.location.reload();
  };
  
  return (
    <div className="container mt-5">
      <div ref={componentRef} className="bank-details-container">
        <div className="row mb-4 align-items-center">
          <div className="col-md-6">
            <h1 className="fw-bold">BANK DETAIL</h1>
          </div>
          {/* <div className="col-md-6 text-end">
            <img src={logo} alt="Prathma Inopex Logo" className="img-fluid" style={{ maxHeight: '100px' }} />
          </div> */}
        </div>
        
        <div className="row">
          <div className="col-md-8">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th className="bg-light">ACCOUNT NAME</th>
                  <td>{bankDetails.accountName}</td>
                </tr>
                <tr>
                  <th className="bg-light">ACCOUNT NO.</th>
                  <td>{bankDetails.accountNumber}</td>
                </tr>
                <tr>
                  <th className="bg-light">TYPE OF ACCOUNT</th>
                  <td>{bankDetails.accountType}</td>
                </tr>
                <tr>
                  <th className="bg-light">BANK NAME</th>
                  <td>{bankDetails.bankName}</td>
                </tr>
                <tr>
                  <th className="bg-light">IFSC</th>
                  <td>{bankDetails.ifsc}</td>
                </tr>
                <tr>
                  <th className="bg-light">SWIFT CODE</th>
                  <td>{bankDetails.swiftCode}</td>
                </tr>
                <tr>
                  <th className="bg-light">BRANCH</th>
                  <td>{bankDetails.branch}</td>
                </tr>
                <tr>
                  <th className="bg-light">GST</th>
                  <td>{bankDetails.gst}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-4">
            <div className="card p-3 text-center">
              <h5 className="mb-3">UPI QR CODE</h5>
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=9958224825@pz" 
                alt="UPI QR Code" 
                className="img-fluid mx-auto d-block" 
                style={{ maxWidth: '200px' }}
              />
              <p className="mt-3">UPI ID: {bankDetails.upiId}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      {/* <div className="row mt-4 no-print">
        <div className="col-12 text-center">
          <button
            type="button"
            className="btn btn-success me-2"
            onClick={handlePrint}
          >
            Print Bank Details
          </button>
          <button type="reset" className="btn btn-secondary" onClick={handleReset}>
            Reset Form
          </button>
        </div>
      </div> */}
      
      {/* Add print styles */}
      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
            .bank-details-container {
              padding: 20px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BankDetails;