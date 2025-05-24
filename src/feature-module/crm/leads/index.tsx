import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateLeads from "./createleads";
import AddFile from "./addfile";
import ContentAccount from "./createcontent";
import SuccessMail from "./sucessmail";
import Access from "./access";
import AddContent from "./addcontent";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import Select from "react-select";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";
import Table from "../../../core/common/dataTable/index";
import { leadsData } from "../../../core/data/json/leads";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DefaultEditor from "react-simple-wysiwyg";
import { Modal } from "react-bootstrap";
import {
  accountType,
  ascendingandDecending,
  documentType,
  LocaleData,
  // statusList,
} from "../../../core/common/selectoption/selectoption";
import { SelectWithImage2 } from "../../../core/common/selectWithImage2";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../../../api/api";
import dayjs from "dayjs";
import { postCallLog, postEditCallLog } from "../../../api/modules/postCallLogData";
import { CallLog, getCallLogData } from "../../../api/modules/getCallLogData";
import { NotesLog, getNotesLead } from "../../../api/modules/getNotesLead";
import {postNotesLead} from '../../../api/modules/postNotesLead';
import { postLeadStatus } from "../../../api/modules/postLeadStatus";
import { getLeadActivities } from "../../../api/modules/getLeadAcitivities";
// import { LeadActivityes } from './../../../api/modules/getLeadAcitivities';



 interface User {
  id: number;
  name: string;
  avatar?: string;
}

interface CallLoges {
  type: string;
  id: number;
  lead_id: number;
  user_id: number;
  user: User;
  status: string;
  note: string;
  follow_up_date: string;
  created_at: string;
}

interface Notes {
  type: string;
  id: number;
  lead_id: number;
  title: string;
  notes_description: string;
  file_path: string;
  created_at: string;
  updated_at: string;
}

// Union type for the activities
type LeadActivityes = CallLoges | Notes;

// interface YourComponentProps {
//   leadId: number;
// }
const route = all_routes;


interface StatusOption {
  value: string;
  label: string;
}
interface CallLogsProps {
  leadId: number;
}

interface StatusOption {
  label: string;
  value: string;
}

interface LeadProps {
  lead: {
    id: number | string;
    // other lead properties
  };
}

interface LeadNotesFormProps {
  lead?: {
    id: number;
    // other lead properties if needed
  };
}

interface ComponentProps {
  leadId: number; // If leadId comes from props
}

interface LeadType {
  id: number;
  status: string;
  // add other lead fields if needed
}

 


// Define the status list with proper values
const statusList: StatusOption[] = [
  { value: 'busy', label: 'Busy' },
  { value: 'no_answer', label: 'No Answer' },
  { value: 'answered', label: 'Answered' },
  { value: 'not_reachable', label: 'Not Reachable' },
  { value: 'other', label: 'Other' },
];




const LeadsDetails: React.FC = () => {
  const { id } = useParams();
  const statusOptions = ["connected", "not connected", "closed", "lost", "new"];
  const navigate = useNavigate();
  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [addcomment, setAddComment] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
   const [update, setUpdate] = useState(false);
   const [emailTo, setEmailTo] = useState('');
const [emailCc, setEmailCc] = useState('');
const [emailBcc, setEmailBcc] = useState('');
const [emailSubject, setEmailSubject] = useState('');
const [emailBody, setEmailBody] = useState('');
const [emailAttachment, setEmailAttachment] = useState<File | null>(null);
const [emailSending, setEmailSending] = useState(false);
 const [status, setStatus] = useState<StatusOption | null>(null);
  const [followUpDate, setFollowUpDate] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [title, setTitle] = useState<StatusOption | null>(null);
const [notes_description, setNotes_description] = useState<string>('');
const [file, setFile] = useState<File | null>(null);
const [isSubmitting, setIsSubmitting] = useState(false);
 const [activitiesData, setActivitiesData] = useState<LeadActivityes[] | null>(null);
  const [errores, setErrores] = useState<string | null>(null);
 const [statuses, setStatuses] = useState<StatusOption | null>(null);
const [notesLogs, setNotesLogs] = useState<NotesLog[]>([]);
  const [activeEditorIndex, setActiveEditorIndex] = useState<number | null>(null);
   const [isEditor3, setIsEditor3] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const [isEditor2, setIsEditor2] = useState(false);
   const [openModal, setOpenModal] = useState(false);
   
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [error, setError] = useState<string | null>(null);
  // const [lead, setLead] = useState<LeadType | null>(null);


  const togglecomment = () => {
    setAddComment((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await api.get(`/api/single-lead/${id}`);
        console.log(response.data.lead, "lll");
        setLead(response.data.lead);
      } catch (error) {
        console.error("Error fetching lead", error);
        navigate("/leads");
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  const [stars, setStars] = useState<{ [key: number]: boolean }>({});

  const initializeStarsState = () => {
    const starsState: { [key: number]: boolean } = {};
    leadsData.forEach((item, index) => {
      starsState[index] = false;
    });
    setStars(starsState);
  };
  
  // Call initializeStarsState once when the component mounts
  React.useEffect(() => {
    initializeStarsState();
  }, []);
  const handleStarToggle = (index: number) => {
    setStars((prevStars) => ({
      ...prevStars,
      [index]: !prevStars[index],
    }));
  };
  
  const sortbydata = [
    { value: "Sort By Date", label: "Sort By Date" },
    { value: "Ascending", label: "Ascending" },
    { value: "Descending", label: "Descending" },
  ];
  const dealsopen = [
    { value: "choose", label: "Choose" },
    { value: "collins", label: "Collins" },
    { value: "konopelski", label: "Konopelski" },
    { value: "adams", label: "Adams" },
    { value: "schumm", label: "Schumm" },
    { value: "wisozk", label: "Wisozk" },
  ];

  const columns = [
    {
      title: "",
      dataIndex: "",
      render: (text: string, record: any, index: number) => (
        <div
          className={`set-star rating-select ${stars[index] ? "filled" : ""}`}
          onClick={() => handleStarToggle(index)}
        >
          <i className="fa fa-star"></i>
        </div>
      ),
    },
  ];

  const handleStatusChange = (newStatus: any) => {
    console.log("Selected status:", newStatus);
     
  };

  const statusSteps = [
    
    { value: 'busy', label: 'Busy', className: "bg-primary" },
  { value: 'no_answer', label: 'No Answer', className: "bg-info" },
  { value: 'answered', label: 'Answered', className: "bg-pending" },
  { value: 'not_reachable', label: 'Not Reachable',  className: "bg-danger" },
  { value: 'other', label: 'Other', className: "bg-success"  },
  ];



  
  // post api of notes start

 

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    setFile(e.target.files[0]);
  }
};

const handleSubmits = async (e: React.FormEvent) => {
  e.preventDefault(); // Prevent default form submission
  
  if (!title || !notes_description || !lead?.id) {
    alert('Please fill all required fields.');
    return;
  }

  setIsSubmitting(true);

  const formData = new FormData();
  formData.append('lead_id', lead.id.toString());
  formData.append('title', typeof title === 'string' ? title : title.label || '');
  formData.append('notes_description', notes_description);
  
  if (file) {
    formData.append('file', file); // Changed from 'file_path' to 'file'
  }

  // Debugging
  // console.log('File to upload:', file);
  // for (const [key, value] of formData.entries()) {
  //   console.log(key, value);
  // }

  try {
    const res = await postNotesLead(formData);
    console.log('Response:', res);
    alert('Notes submitted successfully!');
    
    // Reset form
    setTitle(null);
    setNotes_description('');
    setFile(null);
    
  } catch (error: any) {
    console.error('Error:', error);
    alert(error.response?.data?.message || 'Failed to submit note.');
  } finally {
    setIsSubmitting(false);
  }
};


  // post api of notes end 


  // get notes lead start

    

 
  const ascendingAndDescending = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ];

  // Fetch notes when lead ID changes
  useEffect(() => {
    const fetchNotesLogs = async () => {
      if (!lead?.id) return; // Guard clause

      try {
        setLoading(true);
        const notes = await getNotesLead(lead.id);
        setNotesLogs(notes);
        console.log("get notes data ===============>", notes);
        setError(null);
      } catch (err) {
        setError("Failed to fetch notes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotesLogs();
  }, [lead?.id, update]);

  // Function to format date
  const formatDates = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }) +
      ", " +
      date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    );
  };

  // Toggle comment editor for a specific note
  const toggleEditor = (index: number) => {
    setActiveEditorIndex(activeEditorIndex === index ? null : index);
  };
  // get notes lead end


  // get lead acitivites start
 
  
  
  
  // const { id: paramId } = useParams<{ id: string }>();
  // const leadId = paramId ? parseInt(paramId, 10) : null;

  // const ascendingandDecending = [
  //   { value: 'ascending', label: 'Ascending' },
  //   { value: 'descending', label: 'Descending' }
  // ];

  // // Fetch activities effect
  // useEffect(() => {
  //   const fetchActivities = async () => {
  //     if (!leadId) return;
      
  //     setLoading(true);
  //     setErrores(null);
      
  //     try {
  //       const data: any = await getLeadActivities(leadId);
  //       setActivitiesData(data.recentCallLogs); 
  //       console.log("lead activities get api ===============>", data);
  //     } catch (err: any) {
  //       setErrores('Failed to fetch activities'); // Fixed: use setErrores consistently
  //       console.error('Error:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchActivities();
  // }, [leadId]);

  // // Helper functions
  // const getStatusIcon = (status: string) => {
  //   switch (status) {
  //     case 'answered':
  //       return 'ti ti-phone';
  //     case 'busy':
  //       return 'ti ti-phone-off';
  //     case 'not_reachable':
  //       return 'ti ti-phone-x';
  //     case 'no_answer':
  //       return 'ti ti-phone-pause';
  //     default:
  //       return 'ti ti-phone';
  //   }
  // };

  // const getStatusBadgeClass = (status: string) => {
  //   switch (status) {
  //     case 'answered':
  //       return 'bg-secondary-success';
  //     case 'busy':
  //       return 'bg-warning';
  //     case 'not_reachable':
  //       return 'bg-danger';
  //     case 'no_answer':
  //       return 'bg-pending';
  //     default:
  //       return 'bg-info';
  //   }
  // };

  // const formatDatees = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric'
  //   });
  // };

  // const formatTime = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleTimeString('en-US', {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     hour12: true
  //   });
  // };

  // // Helper function to check if activity is a CallLog (has user and status properties)
  // const isCallLog = (activity: LeadActivityes): activity is CallLoges => {
  //   return 'user' in activity && 'status' in activity;
  // };

  // // Helper function to check if activity is a Note (has title and notes_description properties)
  // const isNote = (activity: LeadActivityes): activity is Notes => {
  //   return 'title' in activity && 'notes_description' in activity;
  // };

  // // Helper function to get date from activity based on type - FIXED
  // const getActivityDate = (activity: LeadActivityes) => {
  //   // For call logs, use follow_up_date if available, otherwise created_at
  //   if (isCallLog(activity)) {
  //     return activity.follow_up_date || activity.created_at;
  //   }
  //   // For notes, use created_at or updated_at
  //   if (isNote(activity)) {
  //     return activity.created_at || activity.updated_at;
  //   }

  //   return "1990-9-9";
   
  // };

  // const groupActivitiesByDate = () => {
  //   const grouped: { [key: string]: LeadActivityes[] } = {};
    
  //   if (activitiesData) {
  //     // Since activitiesData is now LeadActivityes[], we can work with it directly
  //     // Sort by date using helper function
  //     const sortedActivities = [...activitiesData].sort((a, b) => {
  //       const dateA = getActivityDate(a) ?? '';
  //       const dateB = getActivityDate(b) ?? '';
  //       return new Date(dateB).getTime() - new Date(dateA).getTime();
  //     });

  //     // Group by date using helper function
  //     sortedActivities.forEach(activity => {
  //       const activityDate = getActivityDate(activity);
  //       const date = formatDatees(activityDate);
  //       if (!grouped[date]) {
  //         grouped[date] = [];
  //       }
  //       grouped[date].push(activity);
  //     });
  //   }

  //   return grouped;
  // };

  // // Render loading state
  // if (loading) {
  //   return <div className="text-center p-4">Loading activities...</div>;
  // }

  // // Render error state
  // if (errores) {
  //   return (
  //     <div className="alert alert-danger" role="alert">
  //       {errores}
  //     </div>
  //   );
  // }

  // // Render no data state
  // if (!activitiesData) {
  //   return <div className="text-center p-4">No activities data available</div>;
  // }

  // const groupedActivities = groupActivitiesByDate();

  // get lead acitivites end 

  

const handleSendEmail = async () => {
  if (!emailTo || !emailSubject || !emailBody) {
    alert('To, subject, and body are required');
    return;
  }

  const formData = new FormData();
  formData.append('to', emailTo);
  formData.append('subject', emailSubject);
  formData.append('body', emailBody);

  if (emailCc) formData.append('cc[]', emailCc);
  if (emailBcc) formData.append('bcc[]', emailBcc);
  if (emailAttachment) formData.append('attachment', emailAttachment);

  setEmailSending(true);

  try {
    const response = await api.post('/api/send-email', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    alert('Email sent!');
  } catch (err: any) {
    console.error(err);
    alert('Failed to send email: ' + (err.response?.data?.error || err.message));
  } finally {
    setEmailSending(false);
  }
};


  //  call log start

  
  // const [update, setUpdate] = useState(false);

  const handleSubmit = async () => {
    if (!status || !followUpDate || !note || !lead?.id) {
      alert('Please fill all required fields.');
      return;
    }

  // Include the correct action parameter as required by the backend
  const payload = {
    lead_id: lead.id,
    status: status.value,
    follow_up_date: followUpDate,
    note,
    action: 'insert', // Use 'insert' for creating a new call log
  };

  try {
    // Add debugging to see what's being sent
    console.log('Submitting payload:', payload);
    
    const res = await postCallLog(payload);
    console.log('Call log submitted:', res);
    alert('Call log submitted successfully!');
    setStatus(null);
    setFollowUpDate('');
    setNote('');
    setLead((prev: LeadType | null) =>
      prev ? { ...prev, status: status.value } : prev
    );
    setUpdate((prev) => !prev);
  } catch (error: any) {
    console.error('Failed to submit call log:', error.response?.data || error.message);
    alert(error.response?.data?.error || 'Failed to submit call log. Please try again.');
  }
};

useEffect(() => {
  console.log("Updated lead status:", lead?.status);
  // you can re-fetch call logs here or update a UI component
}, [update]);
  // call log end 
  

  // edit call log start
   
  // edit call log end 

  // post lead status start

  
  

 const handleSubmitLead = async (opt: string) => {
  if (!opt || !lead?.id) {
    alert('Please fill all required fields.');
    return;
  }

  const payload = {
    id: lead.id,
    status: opt,
    action: 'status',
  };

  try {
    console.log('Submitting payload:', payload);
    const res = await postLeadStatus(payload);
    console.log('Call log submitted:', res);

    // ✅ Update local lead state
    setLead((prev: LeadType | null) => prev ? { ...prev, status: opt } : prev);
    setUpdate((prev) => !prev);

    alert('Call log submitted successfully!');
  } catch (error: any) {
    console.error('Failed to submit call log:', error.response?.data || error.message);
    alert(error.response?.data?.error || 'Failed to submit call log. Please try again.');
  }
};

useEffect(() => {
  // Example: re-fetch or do something on update
  console.log("Updated lead status:", lead?.status);
}, [update]);




  // post lead status end



  // get api of call log start
 
// const [loading, setLoading] = useState<boolean>(false);

 
useEffect(() => {
  const fetchCallLogs = async () => {
    if (!lead?.id) return; // optional: guard clause

    try {
      setLoading(true);
      const logs = await getCallLogData(lead.id);
      setCallLogs(logs);
      console.log("get call log data ===============>", logs);
      setError(null);
    } catch (err) {
      setError("Failed to fetch call logs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchCallLogs();
}, [lead?.id, update]);

// Function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) +
    ", " +
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  );
};

if (loading) return <div className="text-center py-4">Loading call logs...</div>;
if (error) return <div className="alert alert-danger">{error}</div>;



  // get api of call log end here 

  
 

  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col-sm-4">
                    <h4 className="page-title">Leads Overview </h4>
                  </div>
                  <div className="col-sm-8 text-sm-end">
                    <div className="head-icons">
                      <CollapseHeader />
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
            </div>
          </div>
          <>
            <div className="row">
              <div className="col-md-12">
                {/* Leads User */}
                <div className="contact-head">
                  <div className="row align-items-center">
                    <div className="col-sm-6">
                      <ul className="contact-breadcrumb">
                        <li>
                          <Link to="#">
                            <i className="ti ti-arrow-narrow-left" />
                            Leads
                          </Link>
                        </li>
                        <li>{lead?.company_name}</li>
                      </ul>
                    </div>
                    <div className="col-sm-6 text-sm-end">
                      <div className="contact-pagination">
                        <p>1 of 40</p>
                        <ul>
                          <li>
                            <Link to={`${route.leadsDetails}/${id}`}>
                              <i className="ti ti-chevron-left" />
                            </Link>
                          </li>
                          <li>
                            <Link to={`${route.leadsDetails}/${id}`}>
                              <i className="ti ti-chevron-right" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body pb-2">
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                      <div className="d-flex align-items-center mb-2">
                        <div className="avatar avatar-xxl me-3 flex-shrink-0 border p-2">
                          <h6 className="text-default fw-medium">HT</h6>
                        </div>
                        <div>
                          <h5 className="mb-1">
                            {lead?.lead_name || "Lead Name"}
                          </h5>
                          <p className="mb-1">
                            <i className="ti ti-building me-1" />
                            Google Inc
                          </p>
                          <p className="mb-1">
                            <i className="ti ti-building me-1" />
                            {lead?.company || "Company Name"}
                          </p>
                        </div>
                      </div>
                      <div className="contacts-action">
                        <span className="badge badge-light">
                          <i className="ti ti-lock" />
                          {lead?.access}
                        </span>
                        {/* <div className="dropdown mb-2">
                          <Link
                            to="#"
                            className="bg-success text-white py-1 px-2"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Closed
                            <i className="ti ti-chevron-down ms-2" />
                          </Link>
                          <div className="dropdown-menu dropdown-menu-right">
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <span>Closed</span>
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                            >
                              <span>Opened</span>
                            </Link>
                          </div>
                        </div> */}
                        {/* <div className="dropdown mb-2">
                          <Link
                            to="#"
                            className={`bg-${
                              lead?.status === "closed" ? "danger" : "success"
                            } text-white py-1 px-2`}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {lead?.status || "Select Status"}
                            <i className="ti ti-chevron-down ms-2" />
                          </Link>
                          <div className="dropdown-menu dropdown-menu-right">
                            {statusOptions.map(
                              (status) =>
                                status !== lead?.status && (
                                  <Link
                                    key={status}
                                    className="dropdown-item"
                                    to="#"
                                    onClick={() => handleStatusChange(status)} // if you want to update it
                                  >
                                    <span>{status}</span>
                                  </Link>
                                )
                            )}
                          </div>
                        </div> */}

                       <Link
  to="#"
  className={`bg-${lead?.status === "closed" ? "danger" : "success"} text-white py-1 px-2`}
  data-bs-toggle="dropdown"
  aria-expanded="false"
>
  {lead?.status || "Select Status"}
  <i className="ti ti-chevron-down ms-2" />
</Link>
<div className="dropdown-menu dropdown-menu-right">
  {statusOptions.map(
    (opt) =>
      opt !== lead?.status && (
        <Link
          key={opt}
          className="dropdown-item"
          to="#"
          onClick={() => handleSubmitLead(opt)}
        >
          <span>{opt}</span>
        </Link>
      )
  )}
</div>


                      </div>
                    </div>
                  </div>
                </div>
                {/* /Leads User */}
              </div>
              {/* Leads Sidebar */}
              <div className="col-xl-3 theiaStickySidebar">
                <div className="card">
                  <div className="card-body p-3">
                    <h6 className="mb-3 fw-semibold">Lead Information</h6>
                    <ul>
                      {/* <li className="row mb-3">
                        <span className="col-6">Date Created</span>
                        <span className="col-6">
                          {dayjs(lead?.created_at).format(
                            "DD MMM YYYY, hh:mm a"
                          )}
                        </span>
                      </li> */}
                      {/* <li className="row mb-3">
                        <span className="col-6">Value</span>
                        <span className="col-6">$25,11,145</span>
                      </li> */}
                      {/* <li className="row mb-3">
                        <span className="col-6">Due Date</span>
                        <span className="col-6">20 Jan 2024, 10:00 am</span>
                      </li> */}
                      {/* <li className="row mb-3">
                        <span className="col-6">Follow Up</span>
                        <span className="col-6">20 Jan 2024</span>
                      </li> */}
                      <li className="row mb-3">
                        <span className="col-6">Source</span>
                        <span className="col-6">{lead?.source}</span>
                      </li>
                    </ul>
                    <h6 className="mb-3 fw-semibold">Owner</h6>
                    <div className="d-flex align-items-center mb-3">
                      <div className="avatar avatar-md me-2">
                        <img
                          src="assets/img/profiles/avatar-21.jpg"
                          alt="Image"
                        />
                      </div>
                      <p>{lead?.owner_name}</p>
                    </div>
                    <hr />
                    {/* <h6 className="mb-3 fw-semibold">Tags</h6>
                    <Link
                      to="#"
                      className="badge badge-soft-success fw-medium me-2"
                    >
                      Collab
                    </Link>
                    <Link to="#" className="badge badge-soft-warning fw-medium">
                      Rated
                    </Link>
                    <hr /> */}
                    <h6 className="mb-3 fw-semibold">Projects</h6>
                    <Link
                      to="#"
                      className="badge bg-light-300 text-default me-2 mb-2"
                    >
                      {lead?.lead_name}
                    </Link>
                    <Link
                      to="#"
                      className="badge bg-light-300 text-default mb-2"
                    >
                      Margrate Design
                    </Link>
                    <hr />
                    <h6 className="mb-3 fw-semibold">Priority</h6>
                    <div className="priority-info">
                      <div className="dropdown">
                        <Link
                          to="#"
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span>
                            <i className="ti ti-square-rounded-filled me-1 text-danger circle" />
                            High
                          </span>
                          <i className="ti ti-chevron-down me-1" />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right">
                          <Link className="dropdown-item" to="#">
                            <span>
                              <i className="ti ti-square-rounded-filled me-1 text-danger circle" />
                              High
                            </span>
                          </Link>
                          <Link className="dropdown-item" to="#">
                            <span>
                              <i className="ti ti-square-rounded-filled me-1 text-success circle" />
                              Low
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <hr />
                    {/* <div className="d-flex align-items-center justify-content-between flex-wrap">
                      <h6 className="mb-3 fw-semibold">Contacts</h6>
                      <Link
                        to="#"
                        className="link-purple mb-3 fw-medium"
                        data-bs-toggle="modal"
                        data-bs-target="#add_contact"
                      >
                        <i className="ti ti-circle-plus me-1" />
                        Add New
                      </Link>
                    </div> */}
                    <div className="d-flex align-items-center mb-0">
                      <div className="avatar avatar-md me-2">
                        <img
                          src="assets/img/profiles/avatar-01.jpg"
                          alt="Image"
                        />
                      </div>
                      <p>Jessica</p>
                    </div>
                    <hr />
                    <ul>
                      <li className="row mb-3">
                        <span className="col-6">Last Modified</span>
                        <span className="col-6">
                          {dayjs(lead?.updated_at).format(
                            "DD MMM YYYY, hh:mm a"
                          )}
                        </span>
                      </li>
                      <li className="row mb-0">
                        <span className="col-6">Modified By</span>
                        <span className="col-6">
                          <span className="avatar avatar-xs me-1">
                            <img
                              src="assets/img/profiles/avatar-19.jpg"
                              className="avatar-xs"
                              alt="img"
                            />
                          </span>
                          Darlee Robertson
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* /Leads Sidebar */}
              {/* Leads Details */}
              <div className="col-xl-9">
                <div className="card mb-3">
                  <div className="card-body pb-0">
                    <h4 className="fw-semibold mb-3">Lead Pipeline Status</h4>
                    {lead && (
                      <div className="pipeline-list">
                        <ul>
                          {statusSteps.map((step) => (
                            <li key={step.value}>
                              <Link
                                to="#"
                                className={`${step.className} ${
                                  lead.status === step.value
                                    ? "active blink"
                                    : ""
                                }`}
                              >
                                {step.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <ul className="nav nav-tabs nav-tabs-bottom" role="tablist">
                      <li className="nav-item" role="presentation">
                        <Link
                          to="#"
                          data-bs-toggle="tab"
                          data-bs-target="#activities"
                          className="nav-link active"
                        >
                          <i className="ti ti-alarm-minus me-1" />
                          Activities
                        </Link>
                      </li>
                      <li className="nav-item" role="presentation">
                        <Link
                          to="#"
                          data-bs-toggle="tab"
                          data-bs-target="#notes"
                          className="nav-link"
                        >
                          <i className="ti ti-notes me-1" />
                          Notes
                        </Link>
                      </li>
                      <li className="nav-item" role="presentation">
                        <Link
                          to="#"
                          data-bs-toggle="tab"
                          data-bs-target="#calls"
                          className="nav-link"
                        >
                          <i className="ti ti-phone me-1" />
                          Calls
                        </Link>
                      </li>
                      <li className="nav-item" role="presentation">
                        <Link
                          to="#"
                          data-bs-toggle="tab"
                          data-bs-target="#files"
                          className="nav-link"
                        >
                          <i className="ti ti-file me-1" />
                          Files
                        </Link>
                      </li>
                      <li className="nav-item" role="presentation">
                        <Link
                          to="#"
                          data-bs-toggle="tab"
                          data-bs-target="#email"
                          className="nav-link"
                        >
                          <i className="ti ti-mail-check me-1" />
                          Email
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Tab Content */}
                <div className="tab-content pt-0">
                  {/* Activities */}
                  <div className="tab-pane active show" id="activities">
                    <div className="card">
                      <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                        <h4 className="fw-semibold">Activities</h4>
                        <div>
                          <div className="form-sort mt-0">
                            <i className="ti ti-sort-ascending-2" />
                            <Select
                              className="select"
                              options={ascendingandDecending}
                              placeholder="Ascending"
                              classNamePrefix="react-select"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="badge badge-soft-purple fs-14 fw-normal shadow-none mb-3">
                          <i className="ti ti-calendar-check me-1" />
                          29 Aug 2023
                        </div>
                        <div className="card border shadow-none mb-3">
                          <div className="card-body p-3">
                            <div className="d-flex">
                              <span className="avatar avatar-md flex-shrink-0 rounded me-2 bg-pending">
                                <i className="ti ti-mail-code" />
                              </span>
                              <div>
                                <h6 className="fw-medium mb-1">
                                  You sent 1 Message to the contact.
                                </h6>
                                <p>10:25 pm</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card border shadow-none mb-3">
                          <div className="card-body p-3">
                            <div className="d-flex">
                              <span className="avatar avatar-md flex-shrink-0 rounded me-2 bg-secondary-success">
                                <i className="ti ti-phone" />
                              </span>
                              <div>
                                <h6 className="fw-medium mb-1">
                                  Denwar responded to your appointment schedule
                                  question by call at 09:30pm.
                                </h6>
                                <p>09:25 pm</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card border shadow-none mb-3">
                          <div className="card-body p-3">
                            <div className="d-flex">
                              <span className="avatar avatar-md flex-shrink-0 rounded me-2 bg-orange">
                                <i className="ti ti-notes" />
                              </span>
                              <div>
                                <h6 className="fw-medium mb-1">
                                  Notes added by Antony
                                </h6>
                                <p className="mb-1">
                                  Please accept my apologies for the
                                  inconvenience caused. It would be much
                                  appreciated if it's possible to reschedule to
                                  6:00 PM, or any other day that week.
                                </p>
                                <p>10.00 pm</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="badge badge-soft-purple fs-14 fw-normal shadow-none mb-3">
                          <i className="ti ti-calendar-check me-1" />
                          28 Feb 2024
                        </div>
                        <div className="card border shadow-none mb-3">
                          <div className="card-body p-3">
                            <div className="d-flex">
                              <span className="avatar avatar-md flex-shrink-0 rounded me-2 bg-info">
                                <i className="ti ti-user-pin" />
                              </span>
                              <div>
                                <h6 className="fw-medium mb-1 d-inline-flex align-items-center flex-wrap">
                                  Meeting With{" "}
                                  <span className="avatar avatar-xs mx-2">
                                    <ImageWithBasePath
                                      src="assets/img/profiles/avatar-19.jpg"
                                      alt="img"
                                    />
                                  </span>{" "}
                                  Abraham
                                </h6>
                                <p>Schedueled on 05:00 pm</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card border shadow-none mb-3">
                          <div className="card-body p-3">
                            <div className="d-flex">
                              <span className="avatar avatar-md flex-shrink-0 rounded me-2 bg-secondary-success">
                                <i className="ti ti-notes" />
                              </span>
                              <div>
                                <h6 className="fw-medium mb-1">
                                  Drain responded to your appointment schedule
                                  question.
                                </h6>
                                <p>09:25 pm</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="badge badge-soft-purple fs-14 fw-normal shadow-none mb-3">
                          <i className="ti ti-calendar-check me-1" />
                          Upcoming Activity
                        </div>
                        <div className="card border shadow-none mb-0">
                          <div className="card-body p-3">
                            <div className="d-flex">
                              <span className="avatar avatar-md flex-shrink-0 rounded me-2 bg-info">
                                <i className="ti ti-user-pin" />
                              </span>
                              <div>
                                <h6 className="fw-medium mb-1">
                                  Product Meeting
                                </h6>
                                <p className="mb-1">
                                  A product team meeting is a gathering of the
                                  cross-functional product team — ideally
                                  including team members from product,
                                  engineering, marketing, and customer support.
                                </p>
                                <p>25 Jul 2023, 05:00 pm</p>
                                <div className="upcoming-info">
                                  <div className="row">
                                    <div className="col-sm-4">
                                      <p>Reminder</p>
                                      <div className="dropdown">
                                        <Link
                                          to="#"
                                          className="dropdown-toggle"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <i className="ti ti-clock-edit me-1" />
                                          Reminder
                                          <i className="ti ti-chevron-down ms-1" />
                                        </Link>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <Link
                                            className="dropdown-item"
                                            to="#"
                                          >
                                            Remainder
                                          </Link>
                                          <Link
                                            className="dropdown-item"
                                            to="#"
                                          >
                                            1 hr
                                          </Link>
                                          <Link
                                            className="dropdown-item"
                                            to="#"
                                          >
                                            10 hr
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-sm-4">
                                      <p>Task Priority</p>
                                      <div className="dropdown">
                                        <Link
                                          to="#"
                                          className="dropdown-toggle"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <i className="ti ti-square-rounded-filled me-1 text-danger circle" />
                                          High
                                          <i className="ti ti-chevron-down ms-1" />
                                        </Link>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <Link
                                            className="dropdown-item"
                                            to="#"
                                          >
                                            <i className="ti ti-square-rounded-filled me-1 text-danger circle" />
                                            High
                                          </Link>
                                          <Link
                                            className="dropdown-item"
                                            to="#"
                                          >
                                            <i className="ti ti-square-rounded-filled me-1 text-success circle" />
                                            Low
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-sm-4">
                                      <p>Assigned to</p>
                                      <div className="dropdown">
                                        <Link
                                          to="#"
                                          className="dropdown-toggle"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <ImageWithBasePath
                                            src="assets/img/profiles/avatar-19.jpg"
                                            alt="img"
                                            className="avatar-xs"
                                          />
                                          John
                                          <i className="ti ti-chevron-down ms-1" />
                                        </Link>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <Link
                                            className="dropdown-item"
                                            to="#"
                                          >
                                            <ImageWithBasePath
                                              src="assets/img/profiles/avatar-19.jpg"
                                              alt="img"
                                              className="avatar-xs"
                                            />
                                            John
                                          </Link>
                                          <Link
                                            className="dropdown-item"
                                            to="#"
                                          >
                                            <ImageWithBasePath
                                              src="assets/img/profiles/avatar-15.jpg"
                                              alt="img"
                                              className="avatar-xs"
                                            />
                                            Peter
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="tab-pane active show" id="activities">
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
          <h4 className="fw-semibold">Activities</h4>
          <div>
            <div className="form-sort mt-0">
              <i className="ti ti-sort-ascending-2" />
              <Select
                className="select"
                options={ascendingandDecending}
                placeholder="Ascending"
                classNamePrefix="react-select"
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          {Object.entries(groupedActivities).map(([date, activities]) => (
            <div key={date}>
              <div className="badge badge-soft-purple fs-14 fw-normal shadow-none mb-3">
                <i className="ti ti-calendar-check me-1" />
                {date}
              </div>
              
              {activities.map((activity: any) => (
                <div key={`${activity.type}-${activity.id}`} className="card border shadow-none mb-3">
                  <div className="card-body p-3">
                    <div className="d-flex">
                      <span className={`avatar avatar-md flex-shrink-0 rounded me-2 ${
                        activity.type === 'call' ? getStatusBadgeClass(activity.status) :
                        activity.type === 'note' ? 'bg-orange' : 'bg-info'
                      }`}>
                        <i className={
                          activity.type === 'call' ? getStatusIcon(activity.status) :
                          activity.type === 'note' ? 'ti ti-notes' : 'ti ti-calendar-event'
                        } />
                      </span>
                      <div className="flex-grow-1">
                        {activity.type === 'call' && (
                          <>
                            <h6 className="fw-medium mb-1">
                              Call - {activity.status.replace('_', ' ').toUpperCase()}
                            </h6>
                            <p className="mb-1">{activity.note}</p>
                            <p className="mb-0 text-muted small">
                              {formatTime(activity.created_at)} 
                              {activity.follow_up_date && (
                                <span className="ms-2">
                                  • Follow up: {formatDate(activity.follow_up_date)}
                                </span>
                              )}
                            </p>
                          </>
                        )}
                        
                        {activity.type === 'note' && (
                          <>
                            <h6 className="fw-medium mb-1">
                              Note: {activity.title}
                            </h6>
                            <p className="mb-1">{activity.notes_description}</p>
                            {activity.file_path && (
                              <p className="mb-1">
                                <Link to={activity.file_path} target="_blank" className="text-primary">
                                  <i className="ti ti-paperclip me-1" />
                                  View Attachment
                                </Link>
                              </p>
                            )}
                            <p className="mb-0 text-muted small">
                              {formatTime(activity.created_at)}
                            </p>
                          </>
                        )}
                        
                        {activity.type === 'upcoming' && (
                          <>
                            <h6 className="fw-medium mb-1">
                              Upcoming Call - {activity.status.replace('_', ' ').toUpperCase()}
                            </h6>
                            <p className="mb-1">{activity.note}</p>
                            <p className="mb-0 text-muted small">
                              Scheduled: {formatDate(activity.follow_up_date)}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          
          {Object.keys(groupedActivities).length === 0 && (
            <div className="text-center p-4">
              <p className="text-muted">No activities found for this lead.</p>
            </div>
          )}
        </div>
      </div>
    </div> */}


                  {/* /Activities */}
                  {/* Notes */}


                  {/* old code */}
                   

                  {/* old code end */}
                <div className="tab-pane fade" id="notes">
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
          <h4 className="fw-semibold">Notes</h4>
          <div className="d-inline-flex align-items-center">
            <div className="form-sort me-3 mt-0">
              <i className="ti ti-sort-ascending-2" />
              <Select
                className="select"
                options={ascendingAndDescending}
                placeholder="Ascending"
                classNamePrefix="react-select"
              />
            </div>
            <Link
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#add_notes"
              className="link-purple fw-medium"
            >
              <i className="ti ti-circle-plus me-1" />
              Add New
            </Link>
          </div>
        </div>
        
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : notesLogs.length === 0 ? (
            <div className="text-center py-4">
              <p className="mb-0">No notes available for this lead.</p>
            </div>
          ) : (
            <div className="notes-activity">
              {notesLogs.map((note, index) => (
                <div className="card mb-3" key={note.id}>
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between pb-2">
                      <div className="d-inline-flex align-items-center mb-2">
                        <span className="avatar avatar-md me-2 flex-shrink-0">
                          {note.user?.avatar ? (
                            <ImageWithBasePath src={note.user.avatar} alt="img" />
                          ) : (
                            <div className="avatar-text">{note.user?.name.charAt(0)}</div>
                          )}
                        </span>
                        <div>
                          <h6 className="fw-medium mb-1">{note.user?.name || "Unknown User"}</h6>
                          <p className="mb-0">{formatDates(note.created_at)}</p>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="dropdown">
                          <Link
                            to="#"
                            className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="ti ti-dots-vertical" />
                          </Link>
                          <div className="dropdown-menu dropdown-menu-right">
                            <Link className="dropdown-item" to="#">
                              <i className="ti ti-edit text-blue me-1" />
                              Edit
                            </Link>
                            {/* <Link className="dropdown-item" to="#">
                              <i className="ti ti-trash text-danger me-1" />
                              Delete
                            </Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <h5 className="fw-medium mb-1">{note.title}</h5>
                    <p>{note.notes_description}</p>
                    
                    {note.file_path && (
                      <div className="d-inline-flex align-items-center flex-wrap">
                        <div className="note-download me-3">
                          <div className="note-info">
                            <span className="note-icon bg-secondary-success">
                              <i className="ti ti-file-text" />
                            </span>
                            <div>
                              <h6 className="fw-medium mb-1">
                                {note.file_path.split('/').pop() || "Attachment"}
                              </h6>
                              <p>File Attachment</p>
                            </div>
                          </div>
                          <Link to={note.file_path}>
                            <i className="ti ti-arrow-down" />
                          </Link>
                        </div>
                      </div>
                    )}
                    
                    <div className="notes-editor">
                      <div
                        className="note-edit-wrap"
                        style={{
                          display: activeEditorIndex === index ? "block" : "none",
                        }}
                      >
                        <DefaultEditor className="summernote" />
                        <div className="text-end note-btns">
                          <Link
                            to="#"
                            className="btn btn-light add-cancel"
                            onClick={() => toggleEditor(index)}
                          >
                            Cancel
                          </Link>
                          <Link to="#" className="btn btn-primary">
                            Save
                          </Link>
                        </div>
                      </div>
                      {/* <div className="text-end">
                        <Link
                          to="#"
                          className="add-comment link-purple fw-medium"
                          onClick={() => toggleEditor(index)}
                        >
                          <i className="ti ti-square-plus me-1" />
                          Add Comment
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

                   

                  {/* /Notes */}
                  {/* Calls */}
                   


                   <div className="tab-pane fade show active" id="calls">
                      <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                          <h4 className="fw-semibold">Calls</h4>
                          <div className="d-inline-flex align-items-center">
                            <Link
                              to="#"
                              data-bs-toggle="modal"
                              data-bs-target="#create_call"
                              className="link-purple fw-medium"
                            >
                              <i className="ti ti-circle-plus me-1" />
                              Add New
                            </Link>
                          </div>
                        </div>
                        <div className="card-body">
                          {callLogs.map((call, index) => (
                            <div className="card mb-3" key={call.id}>
                              <div className="card-body">
                                <div className="d-sm-flex align-items-center justify-content-between pb-2">
                                  <div className="d-flex align-items-center mb-2">
                                    <span className="avatar avatar-md me-2 flex-shrink-0">
                                      <ImageWithBasePath
                                        src={`assets/img/profiles/avatar-${19 + index}.jpg`}
                                        alt="img"
                                      />
                                    </span>
                                    <p>
                                      <span className="text-dark fw-medium">
                                        Caller {index + 1}
                                      </span>{" "}
                                      logged a call on{" "}
                                      {new Date(call.follow_up_date).toLocaleDateString("en-US", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                      })}, 08:00 pm
                                    </p>
                                  </div>
                                  <div className="d-inline-flex align-items-center mb-2">
                                    <div className="dropdown me-2">
                                      <Link
                                        to="#"
                                        className={`py-1 ${
                                          call.status === "busy"
                                            ? "bg-danger"
                                            : call.status === "no_answer"
                                            ? "bg-pending"
                                            : "bg-success"
                                        }`}
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        {call.status.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                                        <i className="ti ti-chevron-down ms-2" />
                                      </Link>
                                      <div className="dropdown-menu dropdown-menu-right" style={{ display: showDropdown ? 'block' : 'none' }}>
                                        {/* {[
                                          "Busy",
                                          "No Answer",
                                          "Unavailable",
                                          "Wrong Number",
                                          "Left Voice Message",
                                          "Moving Forward",
                                        ].map((status, i) => (
                                          <Link className="dropdown-item" to="#" key={i}>
                                            {status}
                                          </Link>
                                        ))} */}
                                      </div>
                                    </div>
                                    <div className="dropdown">
                                      <Link
                                        to="#"
                                        className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="ti ti-dots-vertical" />
                                      </Link>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        {/* <Link className="dropdown-item" to="#">
                                          <i className="ti ti-edit text-blue me-1" />
                                          Edit
                                        </Link> */}
                                        
                                        <Link   to="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#create_call"
                                        className="link-purple fw-medium">
                                          <i className="ti ti-edit text-blue me-1" />
                                          Edit
                                        </Link>



                                       

                                          
                                        {/* <Link className="dropdown-item" to="#">
                                          <i className="ti ti-trash text-danger me-1" />
                                          Delete
                                        </Link> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <p>{call.note}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>



                  {/* /Calls */}
                  {/* Files */}
                  <div className="tab-pane fade" id="files">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="fw-semibold">Files</h4>
                      </div>
                      <div className="card-body">
                        <div className="card border mb-3">
                          <div className="card-body pb-0">
                            <div className="row align-items-center">
                              <div className="col-md-8">
                                <div className="mb-3">
                                  <h4 className="fw-medium mb-1">
                                    Manage Documents
                                  </h4>
                                  <p>
                                    Send customizable quotes, proposals and
                                    contracts to close deals faster.
                                  </p>
                                </div>
                              </div>
                              <div className="col-md-4 text-md-end">
                                <div className="mb-3">
                                  <Link
                                    to="#"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#new_file"
                                  >
                                    Create Document
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card border shadow-none mb-3">
                          <div className="card-body pb-0">
                            <div className="row align-items-center">
                              <div className="col-md-8">
                                <div className="mb-3">
                                  <h4 className="fw-medium mb-1">
                                    Collier-Turner Proposal
                                  </h4>
                                  <p>
                                    Send customizable quotes, proposals and
                                    contracts to close deals faster.
                                  </p>
                                  <div className="d-flex align-items-center">
                                    <span className="avatar avatar-md me-2 flex-shrink-0">
                                      <ImageWithBasePath
                                        src="assets/img/profiles/avatar-21.jpg"
                                        alt="img"
                                        className="rounded-circle"
                                      />
                                    </span>
                                    <div>
                                      <span className="fs-12">Owner</span>
                                      <p>Vaughan</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 text-md-end">
                                <div className="mb-3 d-inline-flex align-items-center">
                                  <span className="badge badge-danger-light me-1">
                                    Proposal
                                  </span>
                                  <span className="badge bg-pending priority-badge me-1">
                                    Draft
                                  </span>
                                  <div className="dropdown">
                                    <Link
                                      to="#"
                                      className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="ti ti-dots-vertical" />
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-edit text-blue me-1" />
                                        Edit
                                      </Link>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-trash text-danger me-1" />
                                        Delete
                                      </Link>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-download text-info me-1" />
                                        Download
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card border shadow-none mb-3">
                          <div className="card-body pb-0">
                            <div className="row align-items-center">
                              <div className="col-md-8">
                                <div className="mb-3">
                                  <h4 className="fw-medium mb-1">
                                    Collier-Turner Proposal
                                  </h4>
                                  <p>
                                    Send customizable quotes, proposals and
                                    contracts to close deals faster.
                                  </p>
                                  <div className="d-flex align-items-center">
                                    <span className="avatar avatar-md me-2 flex-shrink-0">
                                      <ImageWithBasePath
                                        src="assets/img/profiles/avatar-01.jpg"
                                        alt="img"
                                        className="rounded-circle"
                                      />
                                    </span>
                                    <div>
                                      <span className="fs-12">Owner</span>
                                      <p>Jessica</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 text-md-end">
                                <div className="mb-3 d-inline-flex align-items-center">
                                  <span className="badge badge-purple-light me-1">
                                    Quote
                                  </span>
                                  <span className="badge bg-success me-1">
                                    Sent
                                  </span>
                                  <div className="dropdown">
                                    <Link
                                      to="#"
                                      className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="ti ti-dots-vertical" />
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-edit text-blue me-1" />
                                        Edit
                                      </Link>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-trash text-danger me-1" />
                                        Delete
                                      </Link>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-download text-info me-1" />
                                        Download
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card border shadow-none mb-0">
                          <div className="card-body pb-0">
                            <div className="row align-items-center">
                              <div className="col-md-8">
                                <div className="mb-3">
                                  <h4 className="fw-medium mb-1">
                                    Collier-Turner Proposal
                                  </h4>
                                  <p>
                                    Send customizable quotes, proposals and
                                    contracts to close deals faster.
                                  </p>
                                  <div className="d-flex align-items-center">
                                    <span className="avatar avatar-md me-2 flex-shrink-0">
                                      <ImageWithBasePath
                                        src="assets/img/profiles/avatar-22.jpg"
                                        alt="img"
                                        className="rounded-circle"
                                      />
                                    </span>
                                    <div>
                                      <span className="fs-12">Owner</span>
                                      <p>Dawn Merhca</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 text-md-end">
                                <div className="mb-3 d-inline-flex align-items-center">
                                  <span className="badge badge-danger-light me-1">
                                    Proposal
                                  </span>
                                  <span className="badge bg-pending priority-badge me-1">
                                    Draft
                                  </span>
                                  <div className="dropdown">
                                    <Link
                                      to="#"
                                      className="p-0 btn btn-icon btn-sm d-flex align-items-center justify-content-center"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="ti ti-dots-vertical" />
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-edit text-blue me-1" />
                                        Edit
                                      </Link>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-trash text-danger me-1" />
                                        Delete
                                      </Link>
                                      <Link className="dropdown-item" to="#">
                                        <i className="ti ti-download text-info me-1" />
                                        Download
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Files */}

                  {/* /Files */}
                  {/* Email */}
                  <div className="tab-pane fade" id="email">
                    <div className="card">
                      {/* <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3"> */}
                        {/* <h4 className="fw-semibold">Email</h4> */}
                        {/* <div className="d-inline-flex align-items-center"> */}
                            <div className="card">
                    <div className="card-header">
                      <h4 className="fw-semibold">Send Email</h4>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label">To</label>
                        <input type="email" className="form-control" value={emailTo} onChange={e => setEmailTo(e.target.value)} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">CC</label>
                        <input type="email" className="form-control" value={emailCc} onChange={e => setEmailCc(e.target.value)} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">BCC</label>
                        <input type="email" className="form-control" value={emailBcc} onChange={e => setEmailBcc(e.target.value)} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Subject</label>
                        <input type="text" className="form-control" value={emailSubject} onChange={e => setEmailSubject(e.target.value)} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea className="form-control" title="Message" value={emailBody} onChange={e => setEmailBody(e.target.value)} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Attachment</label>
                        <input type="file" className="form-control" onChange={e => setEmailAttachment(e.target.files?.[0] || null)} />
                      </div>
                      <button className="btn btn-primary" onClick={handleSendEmail} disabled={emailSending}>
                        {emailSending ? 'Sending...' : 'Send Email'}
                      </button>
                    </div>
                  </div>
                  {/* </div> */}
                  {/* </div> */}
                          
                        </div>
                      </div>
                  {/* Email */}
                 

                  {/* /Email */}
                </div>
                {/* /Tab Content */}
              </div>
              {/* /Leads Details */}
            </div>
          </>
        </div>
      </div>
      {/* /Page Wrapper */}
      {/* Create Contact */}
      <div
        className="modal custom-modal fade"
        id="create_contact"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0 m-0 justify-content-end">
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x" />
              </button>
            </div>
            <div className="modal-body">
              <div className="success-message text-center">
                <div className="success-popup-icon bg-light-blue">
                  <i className="ti ti-user-plus" />
                </div>
                <h3>Contact Created Successfully!!!</h3>
                <p>View the details of contact, created</p>
                <div className="col-lg-12 text-center modal-btn">
                  <Link
                    to="#"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link to={route.dealsDetails} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Create Contact */}
      {/* Add Note */}
      {/* <div
        className="modal custom-modal fade modal-padding"
        id="add_notes"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Notes</h5>
              <button
                type="button"
                className="btn-close position-static"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="col-form-label">
                    Title <span className="text-danger"> *</span>
                  </label>
                  <input className="form-control" type="text" />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">
                    Note <span className="text-danger"> *</span>
                  </label>
                  <textarea
                    className="form-control"
                    rows={4}
                    defaultValue={""}
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">
                    Attachment <span className="text-danger"> *</span>
                  </label>
                  <div className="drag-attach">
                    <input type="file" />
                    <div className="img-upload">
                      <i className="ti ti-file-broken" />
                      Upload File
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Uploaded Files</label>
                  <div className="upload-file">
                    <h6>Projectneonals teyys.xls</h6>
                    <p>4.25 MB</p>
                    <div className="progress">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "25%" }}
                        aria-valuenow={25}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <p className="black-text">45%</p>
                  </div>
                  <div className="upload-file upload-list">
                    <div>
                      <h6>tes.txt</h6>
                      <p>4.25 MB</p>
                    </div>
                    <Link to="#" className="text-danger">
                      <i className="ti ti-trash-x" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-12 text-end modal-btn">
                  <Link
                    to="#"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <button
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    type="button"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}

     <div className="modal custom-modal fade modal-padding" id="add_notes" role="dialog">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Add New Notes</h5>
        <button
          type="button"
          className="btn-close position-static"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmits}>
          {/* Title input */}
          <div className="mb-3">
            <label className="col-form-label">
              Title <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              type="text"
              value={title?.label || ''}
              onChange={(e) =>
                setTitle({ label: e.target.value, value: e.target.value })
              }
              required
            />
          </div>

          {/* Notes description */}
          <div className="mb-3">
            <label className="col-form-label">
              Note <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              rows={4} 
              value={notes_description}
              onChange={(e) => setNotes_description(e.target.value)}
              required
            />
          </div>

          {/* File upload */}
          <div className="mb-3">
            <label className="form-label">Attachment</label>
            <div className="drag-attach">
              <input
                type="file"
                id="fileInput"
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label 
                htmlFor="fileInput"
                className="img-upload"
                style={{ cursor: 'pointer' }}
              >
                <i className="ti ti-file-broken" />
                <span>Upload File</span>
              </label>
            </div>
            
            {file && (
              <div className="mt-2">
                <span className="badge bg-light text-dark">
                  {file.name} ({Math.round(file.size / 1024)} KB)
                </span>
              </div>
            )}
          </div>

          <div className="col-lg-12 text-end modal-btn">
            <button 
              type="button" 
              className="btn btn-light" 
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Uploading...' : 'Confirm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

      {/* /Add Note */}
      {/* Create Call Log */}
       <div className="modal custom-modal fade modal-padding" id="create_call" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Call Log</h5>
            <button
              type="button"
              className="btn-close position-static"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Status <span className="text-danger"> *</span>
                    </label>
                   <Select
                    className="select2"
                    options={statusSteps}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                    value={status}
                    onChange={(selected) => setStatus(selected)}
                  />

                  </div>

                  <div className="mb-3">
                    <label className="col-form-label">
                      Follow Up Date <span className="text-danger"> *</span>
                    </label>
                    <div className="icon-form">
                      <span className="form-icon">
                        <i className="ti ti-calendar-check" />
                      </span>
                      <input
                        type="date"
                        className="form-control"
                        value={followUpDate}
                        onChange={(e) => setFollowUpDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="col-form-label">
                      Note <span className="text-danger"> *</span>
                    </label>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Add text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="checkboxs">
                      <input type="checkbox" />
                      <span className="checkmarks" /> Create a followup task
                    </label>
                  </div>

                  <div className="text-end modal-btn">
                    <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                      Cancel
                    </Link>
                    <button
                      className="btn btn-primary"
                      type="button"
                      data-bs-dismiss="modal"
                      onClick={handleSubmit}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
      {/* /Create Call Log */}
      {/* Add File */}
      <div
        className="modal custom-modal fade custom-modal-two modal-padding"
        id="new_file"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create New File</h5>
              <button
                type="button"
                className="btn-close position-static"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="add-info-fieldset">
                <div className="add-details-wizard">
                  <ul className="progress-bar-wizard">
                    <li className="active">
                      <span>
                        <i className="ti ti-file" />
                      </span>
                      <div className="multi-step-info">
                        <h6>Basic Info</h6>
                      </div>
                    </li>
                    <li>
                      <span>
                        <i className="ti ti-circle-plus" />
                      </span>
                      <div className="multi-step-info">
                        <h6>Add Recipient</h6>
                      </div>
                    </li>
                  </ul>
                </div>
                <fieldset id="first-field-file">
                  <form>
                    <div className="contact-input-set">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Choose Deal <span className="text-danger">*</span>
                            </label>
                            <Select
                              className="select2"
                              options={dealsopen}
                              placeholder="Choose"
                              classNamePrefix="react-select"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Document Type{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <Select
                              className="select2"
                              options={documentType}
                              placeholder="Choose"
                              classNamePrefix="react-select"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Owner <span className="text-danger">*</span>
                            </label>
                            <SelectWithImage2 />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Title <span className="text-danger"> *</span>
                            </label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Locale <span className="text-danger">*</span>
                            </label>
                            <Select
                              className="select2"
                              options={LocaleData}
                              placeholder="Choose"
                              classNamePrefix="react-select"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="signature-wrap">
                            <h4>Signature</h4>
                            <ul className="nav sign-item">
                              <li className="nav-item">
                                <span
                                  className=" mb-0"
                                  data-bs-toggle="tab"
                                  data-bs-target="#nosign"
                                >
                                  <input
                                    type="radio"
                                    className="status-radio"
                                    id="sign1"
                                    name="email"
                                  />
                                  <label htmlFor="sign1">
                                    <span className="sign-title">
                                      No Signature
                                    </span>
                                    This document does not require a signature
                                    before acceptance.
                                  </label>
                                </span>
                              </li>
                              <li className="nav-item">
                                <span
                                  className="active mb-0"
                                  data-bs-toggle="tab"
                                  data-bs-target="#use-esign"
                                >
                                  <input
                                    type="radio"
                                    className="status-radio"
                                    id="sign2"
                                    name="email"
                                    defaultChecked
                                  />
                                  <label htmlFor="sign2">
                                    <span className="sign-title">
                                      Use e-signature
                                    </span>
                                    This document require e-signature before
                                    acceptance.
                                  </label>
                                </span>
                              </li>
                            </ul>
                            <div className="tab-content">
                              <div
                                className="tab-pane show active"
                                id="use-esign"
                              >
                                <div className="input-block mb-0">
                                  <label className="col-form-label">
                                    Document Signers{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                </div>
                                <div className="sign-content">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <input
                                          className="form-control"
                                          type="text"
                                          placeholder="Enter Name"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="d-flex align-items-center">
                                        <div className="float-none mb-3 me-3 w-100">
                                          <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Email Address"
                                          />
                                        </div>
                                        <div className="input-btn mb-3">
                                          <Link to="#" className="add-sign">
                                            <i className="ti ti-circle-plus" />
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Content <span className="text-danger"> *</span>
                            </label>
                            <textarea
                              className="form-control"
                              rows={3}
                              placeholder="Add Content"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 text-end form-wizard-button modal-btn">
                          <button className="btn btn-light" type="reset">
                            Reset
                          </button>
                          <button
                            className="btn btn-primary wizard-next-btn"
                            type="button"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </fieldset>
                <fieldset>
                  <form>
                    <div className="contact-input-set">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="signature-wrap">
                            <h4 className="mb-2">
                              Send the document to following signers
                            </h4>
                            <p>In order to send the document to the signers</p>
                            <div className="input-block mb-0">
                              <label className="col-form-label">
                                Recipients (Additional recipients)
                              </label>
                            </div>
                            <div className="sign-content">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Enter Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="d-flex align-items-center">
                                    <div className="float-none mb-3 me-3 w-100">
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Email Address"
                                      />
                                    </div>
                                    <div className="input-btn mb-3">
                                      <Link to="#" className="add-sign">
                                        <i className="ti ti-circle-plus" />
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="col-form-label">
                              Message Subject{" "}
                              <span className="text-danger"> *</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter Subject"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="col-form-label">
                              Message Text{" "}
                              <span className="text-danger"> *</span>
                            </label>
                            <textarea
                              className="form-control"
                              rows={3}
                              placeholder="Your document is ready"
                              defaultValue={""}
                            />
                          </div>
                          <button className="btn btn-light mb-3">
                            Send Now
                          </button>
                          <div className="send-success">
                            <p>
                              <i className="ti ti-circle-check" /> Document sent
                              successfully to the selected recipients
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-12 text-end form-wizard-button modal-btn">
                          <button className="btn btn-light" type="reset">
                            Cancel
                          </button>
                          <button
                            className="btn btn-primary"
                            type="button"
                            data-bs-dismiss="modal"
                          >
                            Save &amp; Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add File */}
      {/* Connect Account */}
      <div className="modal custom-modal fade" id="create_email" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Connect Account</h5>
              <button
                type="button"
                className="btn-close position-static"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="col-form-label">
                  Account type <span className="text-danger"> *</span>
                </label>
                <Select
                  className="select2"
                  options={accountType}
                  placeholder="Choose"
                  classNamePrefix="react-select"
                />
              </div>
              <div className="mb-3">
                <h5 className="form-title">Sync emails from</h5>
                <div className="sync-radio">
                  <div className="radio-item">
                    <input
                      type="radio"
                      className="status-radio"
                      id="test1"
                      name="radio-group"
                      defaultChecked
                    />
                    <label htmlFor="test1">Now</label>
                  </div>
                  <div className="radio-item">
                    <input
                      type="radio"
                      className="status-radio"
                      id="test2"
                      name="radio-group"
                    />
                    <label htmlFor="test2">1 Month Ago</label>
                  </div>
                  <div className="radio-item">
                    <input
                      type="radio"
                      className="status-radio"
                      id="test3"
                      name="radio-group"
                    />
                    <label htmlFor="test3">3 Month Ago</label>
                  </div>
                  <div className="radio-item">
                    <input
                      type="radio"
                      className="status-radio"
                      id="test4"
                      name="radio-group"
                    />
                    <label htmlFor="test4">6 Month Ago</label>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 text-end modal-btn">
                <Link to="#" className="btn btn-light" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <button
                  className="btn btn-primary"
                  data-bs-target="#success_mail"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                >
                  Connect Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Connect Account */}
      {/* Success Contact */}
      <div className="modal custom-modal fade" id="success_mail" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0 m-0 justify-content-end">
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x" />
              </button>
            </div>
            <div className="modal-body">
              <div className="success-message text-center">
                <div className="success-popup-icon bg-light-blue">
                  <i className="ti ti-mail-opened" />
                </div>
                <h3>Email Connected Successfully!!!</h3>
                <p>
                  Email Account is configured with “example@example.com”. Now
                  you can access email.
                </p>
                <div className="col-lg-12 text-center modal-btn">
                  <Link to={route.companyDetails} className="btn btn-primary">
                    Go to email
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Success Contact */}
      {/* Add Contact */}
      <div className="modal custom-modal fade" id="add_contact" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Contact</h5>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x" />
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-2 icon-form">
                  <span className="form-icon">
                    <i className="ti ti-search" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                </div>
                <div className="access-wrap">
                  <ul>
                    <li className="select-people-checkbox">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                        <span className="people-profile">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-19.jpg"
                            alt=""
                          />
                          <Link to="#">Darlee Robertson</Link>
                        </span>
                      </label>
                    </li>
                    <li className="select-people-checkbox">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                        <span className="people-profile">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-20.jpg"
                            alt=""
                          />
                          <Link to="#">Sharon Roy</Link>
                        </span>
                      </label>
                    </li>
                    <li className="select-people-checkbox">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                        <span className="people-profile">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-21.jpg"
                            alt=""
                          />
                          <Link to="#">Vaughan</Link>
                        </span>
                      </label>
                    </li>
                    <li className="select-people-checkbox">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                        <span className="people-profile">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-01.jpg"
                            alt=""
                          />
                          <Link to="#">Jessica</Link>
                        </span>
                      </label>
                    </li>
                    <li className="select-people-checkbox">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                        <span className="people-profile">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-16.jpg"
                            alt=""
                          />
                          <Link to="#">Carol Thomas</Link>
                        </span>
                      </label>
                    </li>
                    <li className="select-people-checkbox">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                        <span className="people-profile">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-22.jpg"
                            alt=""
                          />
                          <Link to="#">Dawn Mercha</Link>
                        </span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="modal-btn text-end">
                  <Link
                    to="#"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Contact */}
      {/* Add Owner */}
      <div className="modal custom-modal fade" id="owner" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Deal Owner</h5>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x" />
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-2 icon-form">
                  <span className="form-icon">
                    <i className="ti ti-search" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                </div>
                <div className="access-wrap">
                  <ul>
                    <li className="select-people-checkbox">
                      <label className="checkboxs">
                        <input type="checkbox" defaultChecked />
                        <span className="checkmarks" />
                        <span className="people-profile">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-19.jpg"
                            alt=""
                          />
                          <Link to="#">Darlee Robertson</Link>
                        </span>
                      </label>
                    </li>
                    <li className="select-people-checkbox">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                        <span className="people-profile">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-20.jpg"
                            alt=""
                          />
                          <Link to="#">Sharon Roy</Link>
                        </span>
                      </label>
                    </li>
                    <li className="select-people-checkbox">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                        <span className="people-profile">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-21.jpg"
                            alt=""
                          />
                          <Link to="#">Vaughan</Link>
                        </span>
                      </label>
                    </li>
                    <li className="select-people-checkbox">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                        <span className="people-profile">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-01.jpg"
                            alt=""
                          />
                          <Link to="#">Jessica</Link>
                        </span>
                      </label>
                    </li>
                    <li className="select-people-checkbox">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                        <span className="people-profile">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-16.jpg"
                            alt=""
                          />
                          <Link to="#">Carol Thomas</Link>
                        </span>
                      </label>
                    </li>
                    <li className="select-people-checkbox">
                      <label className="checkboxs">
                        <input type="checkbox" />
                        <span className="checkmarks" />
                        <span className="people-profile">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-22.jpg"
                            alt=""
                          />
                          <Link to="#">Dawn Mercha</Link>
                        </span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="modal-btn text-end">
                  <Link
                    to="#"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Owner */}
      {/* Deal Status */}
      <div className="modal custom-modal fade" id="deal_status" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Deal Status</h5>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x" />
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="col-form-label">
                    Status <span className="text-danger">*</span>
                  </label>
                  <Select
                    className="select2"
                    classNamePrefix="react-select"
                    // options={status}
                    placeholder="Choose"
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">
                    Reason <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    rows={5}
                    defaultValue={""}
                  />
                </div>
                <div className="modal-btn text-end">
                  <Link
                    to="#"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Deal Status */}
      {/* Add New Pipeline */}
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="offcanvas_pipeline"
      >
        <div className="offcanvas-header border-bottom">
          <h4>Add New Pipeline</h4>
          <button
            type="button"
            className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="offcanvas-body">
          <form>
            <div>
              <div className="mb-3">
                <label className="col-form-label">
                  Pipeline Name <span className="text-danger">*</span>
                </label>
                <input className="form-control" type="text" />
              </div>
              <div className="mb-3">
                <div className="pipe-title d-flex align-items-center justify-content-between">
                  <h5 className="form-title">Pipeline Stages</h5>
                  <Link
                    to="#"
                    className="add-stage"
                    data-bs-toggle="modal"
                    data-bs-target="#add_stage"
                  >
                    <i className="ti ti-square-rounded-plus" />
                    Add New
                  </Link>
                </div>
                <div className="pipeline-listing">
                  <div className="pipeline-item">
                    <p>
                      <i className="ti ti-grip-vertical" /> Inpipeline
                    </p>
                    <div className="action-pipeline">
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_stage"
                      >
                        <i className="ti ti-edit text-blue" />
                        Edit
                      </Link>
                      <Link to="#" onClick={() => setOpenModal(true)}>
                        <i className="ti ti-trash text-danger" />
                        Delete
                      </Link>
                    </div>
                  </div>
                  <div className="pipeline-item">
                    <p>
                      <i className="ti ti-grip-vertical" /> Follow Up
                    </p>
                    <div className="action-pipeline">
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_stage"
                      >
                        <i className="ti ti-edit text-blue" />
                        Edit
                      </Link>
                      <Link to="#" onClick={() => setOpenModal(true)}>
                        <i className="ti ti-trash text-danger" />
                        Delete
                      </Link>
                    </div>
                  </div>
                  <div className="pipeline-item">
                    <p>
                      <i className="ti ti-grip-vertical" /> Schedule Service
                    </p>
                    <div className="action-pipeline">
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_stage"
                      >
                        <i className="ti ti-edit text-blue" />
                        Edit
                      </Link>
                      <Link to="#" onClick={() => setOpenModal(true)}>
                        <i className="ti ti-trash text-danger" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <h5 className="form-title">Access</h5>
                <div className="d-flex flex-wrap access-item nav">
                  <div
                    className="radio-btn"
                    data-bs-toggle="tab"
                    data-bs-target="#all"
                  >
                    <input
                      type="radio"
                      className="status-radio"
                      id="all"
                      name="status"
                      defaultChecked
                    />
                    <label htmlFor="all">All</label>
                  </div>
                  <div
                    className="radio-btn"
                    data-bs-toggle="tab"
                    data-bs-target="#select-person"
                  >
                    <input
                      type="radio"
                      className="status-radio"
                      id="select"
                      name="status"
                    />
                    <label htmlFor="select">Select Person</label>
                  </div>
                </div>
                <div className="tab-content mb-3">
                  <div className="tab-pane fade" id="select-person">
                    <div className="access-wrapper">
                      <div className="access-view">
                        <div className="access-img">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-21.jpg"
                            alt="Image"
                          />
                          Vaughan
                        </div>
                        <Link to="#">Remove</Link>
                      </div>
                      <div className="access-view">
                        <div className="access-img">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-01.jpg"
                            alt="Image"
                          />
                          Jessica
                        </div>
                        <Link to="#">Remove</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <button
                type="button"
                data-bs-dismiss="offcanvas"
                className="btn btn-light me-2"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#create_pipeline"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* /Add New Pipeline */}
      {/* Add New Stage */}
      <div className="modal custom-modal fade" id="add_stage" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Stage</h5>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x" />
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="col-form-label">Stage Name *</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="modal-btn text-end">
                  <Link
                    to="#"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-danger"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add New Stage */}
      {/* Create Pipeline */}
      <div
        className="modal custom-modal fade"
        id="create_pipeline"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0 m-0 justify-content-end">
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x" />
              </button>
            </div>
            <div className="modal-body">
              <div className="success-message text-center">
                <div className="success-popup-icon bg-light-blue">
                  <i className="ti ti-building" />
                </div>
                <h3>Pipeline Created Successfully!!!</h3>
                <p>View the details of pipeline, created</p>
                <div className="col-lg-12 text-center modal-btn">
                  <Link
                    to="#"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link to={route.dealsDetails} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Create Pipeline*/}
      {/* Edit Stage */}
      <div className="modal custom-modal fade" id="edit_stage" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Stage</h5>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x" />
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="col-form-label">Stage Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Inpipeline"
                  />
                </div>
                <div className="modal-btn text-end">
                  <Link
                    to="#"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-danger"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Stage */}
      {/* Delete Stage */}
      <Modal show={openModal} onHide={() => setOpenModal(false)}>
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Remove Stage?</h4>
            <p className="mb-0">
              Are you sure you want to remove <br /> stage you selected.
            </p>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <Link to={route.contactList} className="btn btn-danger">
                Yes, Delete it
              </Link>
            </div>
          </div>
        </div>
      </Modal>
      {/* /Delete Stage */}
    </>
  );
};

export default LeadsDetails;