// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// interface ItemRow {
//   id: number;
//   name: string;
//   description: string[];
//   quantity: number;
//   unitPrice: number;
//   amount: number;
// }

// const App: React.FC = () => {
//   // Initialize state for items
//   const [items, setItems] = useState<ItemRow[]>([
//     {
//       id: 1,
//       name: "Brand Solution",
//       description: ["Logo Designing"],
//       quantity: 1,
//       unitPrice: 999,
//       amount: 999,
//     },
//     {
//       id: 2,
//       name: "Corporate Profile",
//       description: ["PowerPoint Presentation", "PDF Document"],
//       quantity: 1,
//       unitPrice: 4999,
//       amount: 4999,
//     },
//     {
//       id: 3,
//       name: "Dynamic Website on PHP Laravel Platform",
//       description: [
//         "Web Pages Up to 5",
//         "Complete Design & Development",
//         "Hosting 1 Year",
//         "Technical Support 1 Year",
//         "SSL Certificate",
//         "2 Business email IDs",
//         "Dynamic Website",
//         "Interactive Forms",
//         "Product / Service Gallery",
//         "Backend Administration Panel",
//         "Fully Responsive",
//         "Promotional Banners",
//       ],
//       quantity: 1,
//       unitPrice: 19999,
//       amount: 19999,
//     },
//   ]);

//   // State for quotation details
//   const [quoteNumber, setQuoteNumber] = useState<string>("12/2025");
//   const [quoteDate, setQuoteDate] = useState<string>("");
//   const [deliveryDate, setDeliveryDate] = useState<string>("12-Apr-2025");
//   const [preparedBy, setPreparedBy] = useState<string>("Chandan Soni");
//   const [workDescription, setWorkDescription] = useState<string>(
//     "[Combo Package - Corporate Branding] - Branding & Marketing Solution for Contracting Company"
//   );

//   // State for totals
//   const [subtotal, setSubtotal] = useState<number>(0);
//   const [discount, setDiscount] = useState<number>(5000);
//   const [gstRate, setGstRate] = useState<number>(18);
//   const [gstAmount, setGstAmount] = useState<number>(0);
//   const [totalAmount, setTotalAmount] = useState<number>(0);

//   // Set the current date when component mounts
//   useEffect(() => {
//     const today = new Date();
//     const months = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];
//     const formattedDate = `${today.getDate()}-${
//       months[today.getMonth()]
//     }-${today.getFullYear()}`;
//     setQuoteDate(formattedDate);
//   }, []);

//   // Calculate totals whenever items, discount, or GST rate changes
//   useEffect(() => {
//     const calculatedSubtotal = items.reduce(
//       (sum, item) => sum + item.amount,
//       0
//     );
//     setSubtotal(calculatedSubtotal);

//     const calculatedGstAmount =
//       (calculatedSubtotal - discount) * (gstRate / 100);
//     setGstAmount(Math.round(calculatedGstAmount));

//     const calculatedTotal =
//       calculatedSubtotal - discount + Math.round(calculatedGstAmount);
//     setTotalAmount(Math.round(calculatedTotal));
//   }, [items, discount, gstRate]);

//   // Update item quantity
//   const handleQuantityChange = (id: number, qty: number) => {
//     setItems((prevItems) =>
//       prevItems.map((item) => {
//         if (item.id === id) {
//           const newAmount = qty * item.unitPrice;
//           return { ...item, quantity: qty, amount: newAmount };
//         }
//         return item;
//       })
//     );
//   };

//   // Update item unit price
//   const handleUnitPriceChange = (id: number, price: number) => {
//     setItems((prevItems) =>
//       prevItems.map((item) => {
//         if (item.id === id) {
//           const newAmount = item.quantity * price;
//           return { ...item, unitPrice: price, amount: newAmount };
//         }
//         return item;
//       })
//     );
//   };

//   // Add new item
//   const handleAddItem = () => {
//     const newId =
//       items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
//     setItems([
//       ...items,
//       {
//         id: newId,
//         name: "New Item",
//         description: ["Description"],
//         quantity: 1,
//         unitPrice: 0,
//         amount: 0,
//       },
//     ]);
//   };

//   // Remove item
//   const handleRemoveItem = (id: number) => {
//     setItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   // Update item name
//   const handleItemNameChange = (id: number, name: string) => {
//     setItems((prevItems) =>
//       prevItems.map((item) => {
//         if (item.id === id) {
//           return { ...item, name };
//         }
//         return item;
//       })
//     );
//   };

//   // Update item description
//   const handleDescriptionChange = (
//     itemId: number,
//     index: number,
//     value: string
//   ) => {
//     setItems((prevItems) =>
//       prevItems.map((item) => {
//         if (item.id === itemId) {
//           const newDescriptions = [...item.description];
//           newDescriptions[index] = value;
//           return { ...item, description: newDescriptions };
//         }
//         return item;
//       })
//     );
//   };

//   // Add description to an item
//   const handleAddDescription = (itemId: number) => {
//     setItems((prevItems) =>
//       prevItems.map((item) => {
//         if (item.id === itemId) {
//           return {
//             ...item,
//             description: [...item.description, "New Description"],
//           };
//         }
//         return item;
//       })
//     );
//   };

//   // Format number as currency
//   const formatCurrency = (value: number): string => {
//     return value.toLocaleString("en-IN");
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert("Quotation saved successfully!");
//   };

//   // Handle printing
//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="container mt-4 mb-5">
//       <form id="quotationForm" onSubmit={handleSubmit}>
//         {/* Header */}
//         <div className="row mb-3">
//           <div className="col-md-8">
//             <img
//               src="/api/placeholder/200/100"
//               alt="Vyapar Kranti Logo"
//               className="header-logo"
//               style={{ maxWidth: "200px" }}
//             />
//             <div className="mt-2">
//               <input
//                 type="text"
//                 className="form-control border-0 fw-bold"
//                 defaultValue="VYAPAR KRANTI (A Unit of Prathma Inopex Pvt Ltd)"
//               />
//               <input
//                 type="text"
//                 className="form-control border-0"
//                 defaultValue="116/1, Opposite Najafgarh Metro Station"
//               />
//               <input
//                 type="text"
//                 className="form-control border-0"
//                 defaultValue="Najafgarh, New Delhi 110043"
//               />
//               <input
//                 type="text"
//                 className="form-control border-0"
//                 defaultValue="Phone: (+91) 11-4078 7775 | (+91) 9958 224 825"
//               />
//               <input
//                 type="text"
//                 className="form-control border-0"
//                 defaultValue="E-mail: care@vyaparkranti.com"
//               />
//             </div>
//           </div>
//           <div className="col-md-4 text-end">
//             <div className="h3 fw-bold" style={{ color: "#4472c4" }}>
//               QUOTATION
//             </div>
//           </div>
//         </div>

//         {/* Customer Info */}
//         <div className="row">
//           <div className="col-12">
//             <table className="table table-bordered">
//               <thead>
//                 <tr style={{ backgroundColor: "#e7e6e6" }}>
//                   <th style={{ width: "60%" }}>CUSTOMER INFO</th>
//                   <th style={{ width: "20%" }}>QUOTE #</th>
//                   <th style={{ width: "20%" }}>DATE</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td rowspan={2}>
//                     <input
//                       type="text"
//                       className="form-control border-0 fw-bold"
//                       defaultValue="Shri Anand Pandey"
//                     />
//                     <input
//                       type="text"
//                       className="form-control border-0"
//                       defaultValue="Contact No: +91 941 514 6988"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       className="form-control border-0 text-center"
//                       value={quoteNumber}
//                       onChange={(e) => setQuoteNumber(e.target.value)}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       className="form-control border-0 text-center"
//                       value={quoteDate}
//                       onChange={(e) => setQuoteDate(e.target.value)}
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="text-center">Delivery TAT</td>
//                   <td>
//                     <input
//                       type="text"
//                       className="form-control border-0 text-center"
//                       value={deliveryDate}
//                       onChange={(e) => setDeliveryDate(e.target.value)}
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Prepared By */}
//         <div className="row">
//           <div className="col-12 text-end">
//             <span>Prepared By: </span>
//             <input
//               type="text"
//               className="form-control d-inline-block border-0"
//               style={{ width: "200px" }}
//               value={preparedBy}
//               onChange={(e) => setPreparedBy(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Description of Work */}
//         <div className="row mt-2">
//           <div className="col-12">
//             <table className="table table-bordered">
//               <thead>
//                 <tr style={{ backgroundColor: "#e7e6e6" }}>
//                   <th>DESCRIPTION OF WORK</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>
//                     <input
//                       type="text"
//                       className="form-control border-0"
//                       value={workDescription}
//                       onChange={(e) => setWorkDescription(e.target.value)}
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Itemized Costs */}
//         <div className="row mt-2">
//           <div className="col-12">
//             <table className="table table-bordered" id="itemTable">
//               <thead>
//                 <tr style={{ backgroundColor: "#e7e6e6" }}>
//                   <th style={{ width: "60%" }}>ITEMIZED COSTS</th>
//                   <th style={{ width: "10%" }} className="text-center">
//                     QTY
//                   </th>
//                   <th style={{ width: "15%" }} className="text-center">
//                     UNIT PRICE (INR)
//                   </th>
//                   <th style={{ width: "15%" }} className="text-center">
//                     AMOUNT (INR)
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map((item) => (
//                   <React.Fragment key={item.id}>
//                     <tr>
//                       <td>
//                         <div className="d-flex">
//                           <input
//                             type="text"
//                             className="form-control border-0 fw-bold"
//                             value={item.name}
//                             onChange={(e) =>
//                               handleItemNameChange(item.id, e.target.value)
//                             }
//                           />
//                           <button
//                             type="button"
//                             className="btn btn-sm btn-danger ms-2"
//                             onClick={() => handleRemoveItem(item.id)}
//                           >
//                             ×
//                           </button>
//                         </div>
//                       </td>
//                       <td>
//                         <input
//                           type="number"
//                           className="form-control border-0 text-center"
//                           value={item.quantity}
//                           min="1"
//                           onChange={(e) =>
//                             handleQuantityChange(
//                               item.id,
//                               parseInt(e.target.value) || 0
//                             )
//                           }
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="number"
//                           className="form-control border-0 text-center"
//                           value={item.unitPrice}
//                           min="0"
//                           onChange={(e) =>
//                             handleUnitPriceChange(
//                               item.id,
//                               parseInt(e.target.value) || 0
//                             )
//                           }
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           className="form-control border-0 text-center"
//                           value={formatCurrency(item.amount)}
//                           readOnly
//                         />
//                       </td>
//                     </tr>
//                     {item.description.map((desc, index) => (
//                       <tr key={`${item.id}-desc-${index}`}>
//                         <td
//                           className="ps-4"
//                           style={{ fontSize: "13px", color: "#444" }}
//                         >
//                           <input
//                             type="text"
//                             className="form-control border-0"
//                             value={desc}
//                             onChange={(e) =>
//                               handleDescriptionChange(
//                                 item.id,
//                                 index,
//                                 e.target.value
//                               )
//                             }
//                           />
//                         </td>
//                         <td colSpan={3}></td>
//                       </tr>
//                     ))}
//                     <tr>
//                       <td colSpan={4} className="text-end">
//                         <button
//                           type="button"
//                           className="btn btn-sm btn-secondary"
//                           onClick={() => handleAddDescription(item.id)}
//                         >
//                           + Add Description
//                         </button>
//                       </td>
//                     </tr>
//                   </React.Fragment>
//                 ))}

//                 {/* Add Item Button Row */}
//                 <tr>
//                   <td colSpan={4} className="text-center">
//                     <button
//                       type="button"
//                       className="btn btn-sm btn-primary"
//                       onClick={handleAddItem}
//                     >
//                       + Add Item
//                     </button>
//                   </td>
//                 </tr>

//                 {/* Thank You Row */}
//                 <tr>
//                   <td>
//                     <em>Thank you for your business!</em>
//                   </td>
//                   <td colSpan={2} className="text-end fw-bold">
//                     SUBTOTAL
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       className="form-control border-0 text-center"
//                       value={formatCurrency(subtotal)}
//                       readOnly
//                     />
//                   </td>
//                 </tr>

//                 {/* Discount Row */}
//                 <tr>
//                   <td colSpan={2}></td>
//                   <td className="text-end fw-bold">Discount</td>
//                   <td>
//                     <input
//                       type="number"
//                       className="form-control border-0 text-center"
//                       value={discount}
//                       min="0"
//                       onChange={(e) =>
//                         setDiscount(parseInt(e.target.value) || 0)
//                       }
//                     />
//                   </td>
//                 </tr>

//                 {/* GST Row */}
//                 <tr>
//                   <td colSpan={2}></td>
//                   <td className="text-end fw-bold">
//                     <div className="d-flex align-items-center justify-content-end">
//                       <span>GST @ </span>
//                       <input
//                         type="number"
//                         className="form-control border-0 mx-1"
//                         style={{ width: "50px" }}
//                         value={gstRate}
//                         min="0"
//                         max="100"
//                         onChange={(e) =>
//                           setGstRate(parseInt(e.target.value) || 0)
//                         }
//                       />
//                       <span>%</span>
//                     </div>
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       className="form-control border-0 text-center"
//                       value={formatCurrency(gstAmount)}
//                       readOnly
//                     />
//                   </td>
//                 </tr>

//                 {/* Total Row */}
//                 <tr className="fw-bold" style={{ backgroundColor: "#e7efff" }}>
//                   <td colSpan={2}></td>
//                   <td className="text-end fw-bold">TOTAL ESTIMATE</td>
//                   <td>
//                     <input
//                       type="text"
//                       className="form-control border-0 text-center fw-bold"
//                       value={formatCurrency(totalAmount)}
//                       readOnly
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Footer Notes */}
//         <div className="row">
//           <div className="col-12">
//             <p style={{ fontSize: "12px" }}>*Content to be Provide.</p>
//             <p style={{ fontSize: "12px" }}>
//               This quotation is not a contract or a bill. It is our best guess
//               at the total price for the service and goods described above. The
//               customer will be billed after indicating acceptance of this quote.
//               Payment will be due prior to the delivery of service and goods.
//               Please fax or mail the signed quote to the address listed above.
//             </p>
//             <div className="mt-4">
//               <p>Customer Acceptance</p>
//               <hr style={{ width: "200px" }} />
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="row mt-4">
//           <div className="col-12 text-center">
//             <button
//               type="button"
//               className="btn btn-success me-2"
//               onClick={handlePrint}
//             >
//               Print Quotation
//             </button>
//             <button type="submit" className="btn btn-primary me-2">
//               Save Quotation
//             </button>
//             <button type="reset" className="btn btn-secondary">
//               Reset Form
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

interface ItemRow {
  id: number;
  name: string;
  description: string[];
  quantity: number;
  unitPrice: number;
  amount: number;
}

const Quotation: React.FC = () => {
  // Initialize state for items
  const [items, setItems] = useState<ItemRow[]>([
    {
      id: 1,
      name: "Brand Solution",
      description: ["Logo Designing"],
      quantity: 1,
      unitPrice: 999,
      amount: 999,
    },
    {
      id: 2,
      name: "Corporate Profile",
      description: ["PowerPoint Presentation", "PDF Document"],
      quantity: 1,
      unitPrice: 4999,
      amount: 4999,
    },
    {
      id: 3,
      name: "Dynamic Website on PHP Laravel Platform",
      description: [
        "Web Pages Up to 5",
        "Complete Design & Development",
        "Hosting 1 Year",
        "Technical Support 1 Year",
        "SSL Certificate",
        "2 Business email IDs",
        "Dynamic Website",
        "Interactive Forms",
        "Product / Service Gallery",
        "Backend Administration Panel",
        "Fully Responsive",
        "Promotional Banners",
      ],
      quantity: 1,
      unitPrice: 19999,
      amount: 19999,
    },
  ]);

  // State for quotation details
  const [quoteNumber, setQuoteNumber] = useState<string>("12/2025");
  const [quoteDate, setQuoteDate] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<string>("12-Apr-2025");
  const [preparedBy, setPreparedBy] = useState<string>("Chandan Soni");
  const [workDescription, setWorkDescription] = useState<string>(
    "[Combo Package - Corporate Branding] - Branding & Marketing Solution for Contracting Company"
  );

  const [customerInfoHeader, setCustomerInfoHeader] = useState("CUSTOMER INFO");
  const [quoteHeader, setQuoteHeader] = useState("QUOTE #");
  const [dateHeader, setDateHeader] = useState("DATE");

  {
    /* React State */
  }

  const [deliveryLabel, setDeliveryLabel] = useState("Delivery TaT");
  const [validUntilLabel, setValidUntilLabel] = useState("VALID UNTIL");

  const [customerName, setCustomerName] = useState("Shri Anand Pandey");
  const [contactInfo, setContactInfo] = useState(
    "Contact No : +91 941 514 6988"
  );

  // State for totals
  const [subtotal, setSubtotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(5000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstAmount, setGstAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Set the current date when component mounts
  useEffect(() => {
    const today = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedDate = `${today.getDate()}-${
      months[today.getMonth()]
    }-${today.getFullYear()}`;
    setQuoteDate(formattedDate);
  }, []);

  // Calculate totals whenever items, discount, or GST rate changes
  useEffect(() => {
    const calculatedSubtotal = items.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    setSubtotal(calculatedSubtotal);

    const calculatedGstAmount =
      (calculatedSubtotal - discount) * (gstRate / 100);
    setGstAmount(Math.round(calculatedGstAmount));

    const calculatedTotal =
      calculatedSubtotal - discount + Math.round(calculatedGstAmount);
    setTotalAmount(Math.round(calculatedTotal));
  }, [items, discount, gstRate]);

  // Update item quantity
  const handleQuantityChange = (id: number, qty: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newAmount = qty * item.unitPrice;
          return { ...item, quantity: qty, amount: newAmount };
        }
        return item;
      })
    );
  };

  // Update item unit price
  const handleUnitPriceChange = (id: number, price: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newAmount = item.quantity * price;
          return { ...item, unitPrice: price, amount: newAmount };
        }
        return item;
      })
    );
  };

  // Add new item
  const handleAddItem = () => {
    const newId =
      items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    setItems([
      ...items,
      {
        id: newId,
        name: "New Item",
        description: ["Description"],
        quantity: 1,
        unitPrice: 0,
        amount: 0,
      },
    ]);
  };

  // Remove item
  const handleRemoveItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Update item name
  const handleItemNameChange = (id: number, name: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, name };
        }
        return item;
      })
    );
  };

  // Update item description
  const handleDescriptionChange = (
    itemId: number,
    index: number,
    value: string
  ) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          const newDescriptions = [...item.description];
          newDescriptions[index] = value;
          return { ...item, description: newDescriptions };
        }
        return item;
      })
    );
  };

  // Add description to an item
  const handleAddDescription = (itemId: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            description: [...item.description, "New Description"],
          };
        }
        return item;
      })
    );
  };

  // Format number as currency
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("en-IN");
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Quotation saved successfully!");
  };

  // Handle printing
  const handlePrint = () => {
    window.print();
  };

  // Add CSS for print styles
  useEffect(() => {
    // Create style element for print media
    const style = document.createElement("style");
    style.type = "text/css";
    style.media = "print";

    // Define styles that hide buttons when printing
    style.innerHTML = `
      .no-print {
        display: none !important;
      }
      .remove-button {
        display: none !important;
      }
      input, textarea {
        border: none !important;
      }
      .form-control {
        box-shadow: none !important;
      }
      @page {
        margin: 0.5cm;
      }
       
    `;

    // Append style to document head
    document.head.appendChild(style);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="container mt-4 mb-5">
      <form id="quotationForm" onSubmit={handleSubmit}>
        {/* Header */}
        <div className="row mb-3">
          <div className="col-md-8">
            <img
              src="https://www.vyaparkranti.com/static/media/logocorrectwhite.dbc5f7d5427602818ff2.jpg"
              alt="Vyapar Kranti Logo"
              className="header-logo"
              style={{ maxWidth: "200px" }}
            />
            <div className="mt-2">
              <input
                type="text"
                className="form-control border-0 fw-bold"
                defaultValue="VYAPAR KRANTI (A Unit of Prathma Inopex Pvt Ltd)"
              />
              <input
                type="text"
                className="form-control border-0"
                defaultValue="116/1, Opposite Najafgarh Metro Station"
              />
              <input
                type="text"
                className="form-control border-0"
                defaultValue="Najafgarh, New Delhi 110043"
              />
              <input
                type="text"
                className="form-control border-0"
                defaultValue="Phone: (+91) 11-4078 7775 | (+91) 9958 224 825"
              />
              <input
                type="text"
                className="form-control border-0"
                defaultValue="E-mail: care@vyaparkranti.com"
              />
            </div>
          </div>
          <div className="col-md-4 text-end">
            {/* <div className="h3 fw-bold" style={{ color: "#4472c4" }}>
              QUOTATION
            </div> */}
          </div>
        </div>

        {/* Customer Info */}
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <td style={{ width: "36%", background: "#d6e3f3" }}>
                    <input
                      type="text"
                      className="form-control border-0 fw-bold"
                      value={customerInfoHeader}
                      onChange={(e) => setCustomerInfoHeader(e.target.value)}
                      style={{ background: "#d6e3f3" }}
                    />
                  </td>
                  <td style={{ width: "20%", background: "#d6e3f3" }}>
                    <input
                      type="text"
                      className="form-control border-0 fw-bold text-center"
                      value={quoteHeader}
                      onChange={(e) => setQuoteHeader(e.target.value)}
                      style={{ background: "#d6e3f3" }}
                    />
                  </td>
                  <td style={{ width: "20%", background: "#d6e3f3" }}>
                    <input
                      type="text"
                      className="form-control border-0 fw-bold text-center"
                      value={dateHeader}
                      onChange={(e) => setDateHeader(e.target.value)}
                      style={{ background: "#d6e3f3" }}
                    />
                  </td>
                </tr>
              </thead>
              <tbody>
                {/* ROW 1 */}

                <tr>
                  <td rowSpan={2} className="align-top border">
                    <input
                      type="text"
                      className="form-control border-0 fw-bold"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-control border-0"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                    />
                  </td>
                  <td className="text-center border">
                    <input
                      type="text"
                      className="form-control border-0 text-center fw-bold"
                      value={quoteNumber}
                      onChange={(e) => setQuoteNumber(e.target.value)}
                    />
                  </td>
                  <td className="text-left border">
                    <input
                      type="text"
                      className="form-control border-0 text-left fw-bold"
                      value={quoteDate}
                      onChange={(e) => setQuoteDate(e.target.value)}
                    />
                  </td>
                </tr>

                {/* ROW 2 */}
                <tr>
                  <td className="border" style={{ backgroundColor: "#d6e3f3" }}>
                    <input
                      type="text"
                      className="form-control border-0 text-center fw-bold"
                      value={deliveryLabel}
                      onChange={(e) => setDeliveryLabel(e.target.value)}
                      style={{ background: "#d6e3f3" }}
                    />
                  </td>
                  <td className="border" style={{ backgroundColor: "#d6e3f3" }}>
                    <input
                      type="text"
                      className="form-control border-0 text-center fw-bold"
                      value={validUntilLabel}
                      onChange={(e) => setValidUntilLabel(e.target.value)}
                      style={{ background: "#d6e3f3" }}
                    />
                  </td>
                </tr>

                {/* ROW 3 */}
                <tr>
                  <td colSpan={2} className="border"></td>
                  <td className="text-left border">
                    <input
                      type="text"
                      className="form-control border-0 text-left fw-bold"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Prepared By */}
        {/* <div className="row">
          <div className="col-12 text-end">
            <span>Prepared By: </span>
            <input
              type="text"
              className="form-control d-inline-block border-0"
              style={{ width: "200px" }}
              value={preparedBy}
              onChange={(e) => setPreparedBy(e.target.value)}
            />
          </div>
        </div> */}

        {/* Description of Work */}
        <div className="row mt-2">
          <div className="col-12">
            <table className="table table-bordered">
              <thead>
                <tr style={{ background: "#d6e3f3" }}>
                  <th style={{ background: "#d6e3f3" }}>DESCRIPTION OF WORK</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0"
                      value={workDescription}
                      onChange={(e) => setWorkDescription(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Itemized Costs */}
        <div className="row mt-2">
          <div className="col-12">
            <table className="table table-bordered" id="itemTable">
              <thead>
                <tr style={{ backgroundColor: "#e7e6e6" }}>
                  <th style={{ width: "60%", background: "#d6e3f3" }}>
                    ITEMIZED COSTS
                  </th>
                  <th
                    style={{ width: "10%", background: "#d6e3f3" }}
                    className="text-center"
                  >
                    QTY
                  </th>
                  <th
                    style={{ width: "15%", background: "#d6e3f3" }}
                    className="text-center"
                  >
                    UNIT PRICE (INR)
                  </th>
                  <th
                    style={{ width: "15%", background: "#d6e3f3" }}
                    className="text-center"
                  >
                    AMOUNT (INR)
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr>
                      <td>
                        <div className="d-flex">
                          <input
                            type="text"
                            className="form-control border-0 fw-bold"
                            value={item.name}
                            onChange={(e) =>
                              handleItemNameChange(item.id, e.target.value)
                            }
                          />
                          <button
                            type="button"
                            className="btn btn-sm btn-danger ms-2 remove-button"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            ×
                          </button>
                        </div>
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control border-0 text-center"
                          value={item.quantity}
                          min="1"
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value) || 0
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control border-0 text-center"
                          value={item.unitPrice}
                          min="0"
                          onChange={(e) =>
                            handleUnitPriceChange(
                              item.id,
                              parseInt(e.target.value) || 0
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control border-0 text-center"
                          value={formatCurrency(item.amount)}
                          readOnly
                        />
                      </td>
                    </tr>
                    {item.description.map((desc, index) => (
                      <tr key={`${item.id}-desc-${index}`}>
                        <td
                          className="ps-4"
                          style={{ fontSize: "13px", color: "#444" }}
                        >
                          <input
                            type="text"
                            className="form-control border-0"
                            value={desc}
                            onChange={(e) =>
                              handleDescriptionChange(
                                item.id,
                                index,
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td colSpan={3}></td>
                      </tr>
                    ))}
                    <tr className="no-print">
                      <td colSpan={4} className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleAddDescription(item.id)}
                        >
                          + Add Description
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}

                {/* Add Item Button Row */}
                <tr className="no-print">
                  <td colSpan={4} className="text-center">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={handleAddItem}
                    >
                      + Add Item
                    </button>
                  </td>
                </tr>

                {/* Thank You Row */}
                <tr>
                  <td>
                    <em>Thank you for your business!</em>
                  </td>
                  <td colSpan={2} className="text-end fw-bold">
                    SUBTOTAL
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 text-center"
                      value={formatCurrency(subtotal)}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Discount Row */}
                <tr>
                  <td colSpan={2}></td>
                  <td className="text-end fw-bold">Discount</td>
                  <td>
                    <input
                      type="number"
                      className="form-control border-0 text-center text-danger"
                      value={discount}
                      min="0"
                      onChange={(e) =>
                        setDiscount(parseInt(e.target.value) || 0)
                      }
                    />
                  </td>
                </tr>

                {/* GST Row */}
                <tr>
                  <td colSpan={2}></td>
                  <td className="text-end fw-bold">
                    <div className="d-flex align-items-center justify-content-end">
                      <span>GST @ </span>
                      <input
                        type="number"
                        className="form-control border-0 mx-1"
                        style={{ width: "60px" }}
                        value={gstRate}
                        min="0"
                        max="100"
                        onChange={(e) =>
                          setGstRate(parseInt(e.target.value) || 0)
                        }
                      />
                      <span>%</span>
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 text-center"
                      value={formatCurrency(gstAmount)}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Total Row */}
                <tr className="fw-bold" style={{ backgroundColor: "#e7efff" }}>
                  <td colSpan={2}></td>
                  <td className="text-end fw-bold">TOTAL ESTIMATE</td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 text-center fw-bold"
                      value={formatCurrency(totalAmount)}
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="row">
          <div className="col-12">
            <p style={{ fontSize: "12px" }}>*Content to be Provide.</p>
            <p style={{ fontSize: "12px" }}>
              This quotation is not a contract or a bill. It is our best guess
              at the total price for the service and goods described above. The
              customer will be billed after indicating acceptance of this quote.
              Payment will be due prior to the delivery of service and goods.
              Please fax or mail the signed quote to the address listed above.
            </p>
            <div className="mt-4">
              <p>Customer Acceptance</p>
              <hr style={{ width: "200px" }} />
            </div>
          </div>
        </div>

        {/* Prepared By */}
        <div className="row">
          <div className="col-12 text-end">
            <span>Prepared By: </span>
            <input
              type="text"
              className="form-control d-inline-block border-0"
              style={{ width: "200px" }}
              value={preparedBy}
              onChange={(e) => setPreparedBy(e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="row mt-4 no-print">
          <div className="col-12 text-center">
            <button
              type="button"
              className="btn btn-success me-2"
              onClick={handlePrint}
            >
              Print Quotation
            </button>
            {/* <button type="submit" className="btn btn-primary me-2">
              Save Quotation
            </button> */}
            <button type="reset" className="btn btn-secondary">
              Reset Form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Quotation;
