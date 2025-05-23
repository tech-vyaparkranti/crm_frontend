import React, { useEffect, useRef, useState } from "react";
import Table from "../../core/common/dataTable/index";
import Select from "react-select";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import { manageusersData } from "../../core/data/json/manageuser";
import CollapseHeader from "../../core/common/collapse-header";
import { userInsert, orgUserData } from "./orgUserInterface";
import { OrgUser } from "../../api/modules/organization-User/getOrgUser";
import { postOrgUser } from "../../api/modules/organization-User/postOrgUser";
import MessageModal from "../crm/commonComponent/MessageModal";
import { deleteOrgUser } from "../../api/modules/organization-User/deleteUser";
import { downloadOrganization } from "../crm/leads/utils/downloadOrganizationUser";


const Manageusers = () => {

  const [modal, setModal] = useState({
    show: false,
    type: 'success' as 'success' | 'error',
    message: '',
  });
  const [refresh , setRefresh] = useState(false);
  const [sort, setShort] = useState("");
  const [totalUser , setTotalUser] = useState(0);
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const [data, setData] = useState<orgUserData[]>([
    {
      id: 0,
      name: "",
      email: "",
      department: "",
      designation: "",
      emp_id: "",
      password: "",
      phone: 1234567890,
      status: "",
      org_id: 0,
      profile_img: null,
      role: "",
      action: "update",
      key: 0,
      created_at: new Date("1995-05-05"),
    },
  ]);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
const closeBtnRef = useRef<HTMLButtonElement>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  

  const initialUser = {
    name :"",
    email:"" ,
    department: "",
    designation : "",
    emp_id : "",
    password : "",
    phone :  0 ,
    status : "",
    org_id : 0,
    image : null,
    role : "",
    action : "insert",
  }
  const [user,setUser] = useState<userInsert>(initialUser)

  useEffect(() => {
    fetchUserData(pagination.current);
  }, [pagination.current ,refresh]);

  const fetchUserData = async (page: any) => {
    const response = await OrgUser(page);
    const userData = response.data;
    setData(userData);
    setPagination({
      current: response.current_page,
      pageSize: response.per_page,
      total: response.total,
    });
    setTotalUser(response.total);
  };

  const handleSort = (value: string) => {
    setShort(value);
  };

  const filteredAndSortedData = data
    .filter((item: orgUserData) => {
      const matchesSearch =
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department?.toLowerCase().includes(searchTerm.toLowerCase());

      const createdDate = new Date(item.created_at);
      const inDateRange =
        (!dateRange.start || createdDate >= dateRange.start) &&
        (!dateRange.end || createdDate <= dateRange.end);

      return matchesSearch && inDateRange;
    })
    .sort((a: orgUserData, b: orgUserData) => {
      if (sort === "asc") {
        return a.name.localeCompare(b.name);
      } else if (sort === "desc") {
        return b.name.localeCompare(a.name);
      } else if (sort === "recentlyAdded" || sort === "recentlyViewed") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }
      return 0;
    });

  const handleTableChange = (paginationInfo: any) => {
    setPagination((prev) => ({
      ...prev,
      current: paginationInfo.current,
      pageSize: paginationInfo.pageSize,
    }));
  };

  const options2 = [
    { value: "Choose", label: "Choose" },
    { value: "Germany", label: "Germany" },
    { value: "USA", label: "USA" },
    { value: "Canada", label: "Canada" },
    { value: "India", label: "India" },
    { value: "China", label: "China" },
  ];

  const [passwords, setPasswords] = useState([false, false]);
  const [deleteUser, setDeleteUser] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);

  const togglePassword = (index: any) => {
    const updatedPasswords = [...passwords];
    updatedPasswords[index] = !updatedPasswords[index];
    setPasswords(updatedPasswords);
  };
  const [stars, setStars] = useState<{ [key: number]: boolean }>({});

  const initializeStarsState = () => {
    const starsState: { [key: number]: boolean } = {};
    data.forEach((item, index) => {
      starsState[index] = false;
    });
    setStars(starsState);
  };

  React.useEffect(() => {
    initializeStarsState();
  }, []);
  const handleStarToggle = (index: number) => {
    setStars((prevStars) => ({
      ...prevStars,
      [index]: !prevStars[index],
    }));
  };
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
    {
      title: "Name",
      render: (text: any, record: any) => (
        <h2 className="d-flex align-items-center">
          <Link to="#" className="avatar avatar-sm me-2">
            <ImageWithBasePath
              className="w-auto h-auto"
              src={record.profile_img || "/assets/img/man (1).png"}
              alt="User Image"
            />
          </Link>
          <Link to="#" className="d-flex flex-column">
            {record.name}
            {/* <span className="text-default">{text.phone} </span> */}
          </Link>
        </h2>
      ),
      sorter: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      sorter: true,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      sorter: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <div>
          {text == "active" && (
            <span className="badge badge-pill badge-status bg-success">
              {text}
            </span>
          )}

          {text == "inactive" && (
            <span className="badge badge-pill badge-status bg-danger">
              {text}
            </span>
          )}
        </div>
      ),
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: any) => (
        <div className="dropdown table-action">
          <Link
            to="#"
            className="action-icon "
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" />
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            {/* <Link
              className="dropdown-item"
              to="#"
              data-bs-target="#offcanvas_add"
              data-bs-toggle="offcanvas"
            >
              <i className="ti ti-edit text-blue" /> Edit
            </Link> */}

            <button           // use <button>, keeps focus
          className="dropdown-item"
          onClick={() => handleEdit(record)}
        >
          <i className="ti ti-edit text-blue" /> Edit
        </button>

            {/* <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_contact"
            >
              <i className="ti ti-trash text-danger"></i> Delete
            </Link> */}
            <button           // use <button>, keeps focus
          className="dropdown-item"
          onClick={() => handleDelete(record)}
        >
          <i className="ti ti-trash text-danger" /> Delete
        </button>
          </div>
        </div>
      ),
    },
  ];
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const last7DaysStart = new Date(today);
  last7DaysStart.setDate(today.getDate() - 6); // 7 days including today

  const last30DaysStart = new Date(today);
  last30DaysStart.setDate(today.getDate() - 29); // 30 days including today

  const firstDayOfThisMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );
  const lastDayOfThisMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  );

  const firstDayOfLastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  );
  const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

  const initialSettings = {
    startDate: last7DaysStart,
    endDate: today,
    timePicker: false,
    ranges: {
      Today: [today, today],
      Yesterday: [yesterday, yesterday],
      "Last 7 Days": [last7DaysStart, today],
      "Last 30 Days": [last30DaysStart, today],
      "This Month": [firstDayOfThisMonth, lastDayOfThisMonth],
      "Last Month": [firstDayOfLastMonth, lastDayOfLastMonth],
    },
  };

  const handleChange = (e :React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(e.target.type === "file")
    {
      const target = e.target as HTMLInputElement;
      setUser((prev) => ({
        ...prev,
        [e.target.name]: target.files ? target.files[0] : null,
      }));
    }
    else {
        setUser((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
          const data = new FormData();
          Object.entries(user).forEach(([key, value]) => {
            data.append(key, value as string | Blob);
          });
          const response : any = await postOrgUser(data);
          if(response.success === false)
          {
            // setModal({
            //   show: true,
            //   type: 'error',
            //   message: response.firstError || response.message || 'Something went wrong.',
            // });
            alert(response.firstError);
          }
          else {
              // setModal({ show: true, type: 'success', message: 'Organization user save successfully!' });
              alert("Organization user save successfully!");
              
              setRefresh(!refresh);
              setUser(initialUser);
              const offcanvasElement = document.getElementById('offcanvas_add');
              if (offcanvasElement && (window as any).bootstrap) {
                const bsOffcanvas = (window as any).bootstrap.Offcanvas.getInstance(offcanvasElement);
                bsOffcanvas?.hide();
              }
          }
     
  }

  const offcanvasId  = 'offcanvas_add';

const handleEdit = (record: any) => {
  setUser({
    ...initialUser,
    ...record,
    password: '',
    action: 'update'
  });

   setTimeout(() => {
  const triggerBtn = document.getElementById('triggerOffcanvasBtn');
  if (triggerBtn) {
    triggerBtn.click();
  }
  },100)
}

const handleDelete = (record: any) => {
  setDeleteUser(record.id);
  setShowDeleteModal(true);
}

const confirmDelete = async () => {
  if (!deleteUser) return;

  const response : any = await deleteOrgUser(deleteUser)
  if(response.status === false)
  {
    alert(response.message);
  }else{
    alert(response.data.message)
     setShowDeleteModal(false);
     setDeleteUser(deleteUser);
     setRefresh(!refresh);
  }
};

const handleExport = async () => 
{
    const response = await downloadOrganization()
}

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
                  <div className="col-8">
                    <h4 className="page-title">
                      User<span className="count-title">{totalUser}</span>
                    </h4>
                  </div>
                  <div className="col-4 text-end">
                    <div className="head-icons">
                      <CollapseHeader />
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
              <div className="card">
                <div className="card-header">
                  {/* Search */}
                  <div className="row align-items-center">
                    <div className="col-sm-4">
                      <div className="icon-form mb-3 mb-sm-0">
                        <span className="form-icon">
                          <i className="ti ti-search" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search User"
                          value={searchTerm}
                          onChange={(e) =>
                            setSearchTerm(e.target.value.toLowerCase())
                          }
                        />
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="d-flex align-items-center flex-wrap row-gap-2 justify-content-sm-end">
                        <div className="dropdown me-2">
                          <Link
                            to="#"
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                          >
                            <i className="ti ti-package-export me-2" />
                            Export
                          </Link>
                          <div className="dropdown-menu  dropdown-menu-end">
                            <ul>
                              {/* <li>
                                <Link to="#" className="dropdown-item">
                                  <i className="ti ti-file-type-pdf text-danger me-1" />
                                  Export as PDF
                                </Link>
                              </li> */}
                              <li>
                                <Link to="#" className="dropdown-item" onClick={handleExport}>
                                  <i className="ti ti-file-type-xls text-green me-1" />
                                  Export as Excel{" "}
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <Link
                          to="#"
                          className="btn btn-primary"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvas_add"
                          id="triggerOffcanvasBtn"

                        >
                          <i className="ti ti-square-rounded-plus me-2" />
                          Add user
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* /Search */}
                </div>
                <div className="card-body">
                  {/* Filter */}
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-4">
                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                      <div className="dropdown me-2">
                        <Link
                          to="#"
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-sort-ascending-2 me-2" />
                          Sort{" "}
                        </Link>
                        <div className="dropdown-menu  dropdown-menu-start">
                          <ul>
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item"
                                onClick={() => handleSort("asc")}
                              >
                                <i className="ti ti-circle-chevron-right me-1" />
                                Ascending
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item"
                                onClick={() => handleSort("desc")}
                              >
                                <i className="ti ti-circle-chevron-right me-1" />
                                Descending
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item"
                                onClick={() => handleSort("recentlyViewed")}
                              >
                                <i className="ti ti-circle-chevron-right me-1" />
                                Recently Viewed
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item"
                                onClick={() => handleSort("recentlyAdded")}
                              >
                                <i className="ti ti-circle-chevron-right me-1" />
                                Recently Added
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="icon-form">
                        <span className="form-icon">
                          <i className="ti ti-calendar" />
                        </span>
                        <DateRangePicker
                          initialSettings={initialSettings}
                          onApply={(event, picker) => {
                            setDateRange({
                              start: picker.startDate.toDate(),
                              end: picker.endDate.toDate(),
                            });
                          }}
                        >
                          <input
                            className="form-control bookingrange"
                            type="text"
                            // onChange={(e)=>handleDates(e)}
                          />
                        </DateRangePicker>
                      </div>
                    </div>
                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                      <div className="dropdown me-2">
                        <Link
                          to="#"
                          className="btn bg-soft-purple text-purple"
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="outside"
                        >
                          <i className="ti ti-columns-3 me-2" />
                          Manage Columns
                        </Link>
                        <div className="dropdown-menu  dropdown-menu-md-end dropdown-md p-3">
                          <h4 className="mb-2 fw-semibold">
                            Want to manage datatables?
                          </h4>
                          <p className="mb-3">
                            Please drag and drop your column to reorder your
                            table and enable see option as you want.
                          </p>
                          <div className="border-top pt-3">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                              <p className="mb-0 d-flex align-items-center">
                                <i className="ti ti-grip-vertical me-2" />
                                Name
                              </p>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="col-name"
                                  className="check"
                                />
                                <label
                                  htmlFor="col-name"
                                  className="checktoggle"
                                />
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                              <p className="mb-0 d-flex align-items-center">
                                <i className="ti ti-grip-vertical me-2" />
                                Phone
                              </p>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="col-phone"
                                  className="check"
                                />
                                <label
                                  htmlFor="col-phone"
                                  className="checktoggle"
                                />
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                              <p className="mb-0 d-flex align-items-center">
                                <i className="ti ti-grip-vertical me-2" />
                                Email
                              </p>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="col-email"
                                  className="check"
                                />
                                <label
                                  htmlFor="col-email"
                                  className="checktoggle"
                                />
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                              <p className="mb-0 d-flex align-items-center">
                                <i className="ti ti-grip-vertical me-2" />
                                Location
                              </p>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="col-tag"
                                  className="check"
                                />
                                <label
                                  htmlFor="col-tag"
                                  className="checktoggle"
                                />
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                              <p className="mb-0 d-flex align-items-center">
                                <i className="ti ti-grip-vertical me-2" />
                                Created Date
                              </p>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="col-date"
                                  className="check"
                                />
                                <label
                                  htmlFor="col-date"
                                  className="checktoggle"
                                />
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                              <p className="mb-0 d-flex align-items-center">
                                <i className="ti ti-grip-vertical me-2" />
                                Last Activity
                              </p>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="col-activity"
                                  className="check"
                                />
                                <label
                                  htmlFor="col-activity"
                                  className="checktoggle"
                                />
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                              <p className="mb-0 d-flex align-items-center">
                                <i className="ti ti-grip-vertical me-2" />
                                Status
                              </p>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="col-status"
                                  className="check"
                                />
                                <label
                                  htmlFor="col-status"
                                  className="checktoggle"
                                />
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                              <p className="mb-0 d-flex align-items-center">
                                <i className="ti ti-grip-vertical me-2" />
                                Action
                              </p>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="col-action"
                                  className="check"
                                />
                                <label
                                  htmlFor="col-action"
                                  className="checktoggle"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-sorts dropdown">
                        <Link
                          to="#"
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="outside"
                        >
                          <i className="ti ti-filter-share" />
                          Filter
                        </Link>
                        <div className="filter-dropdown-menu dropdown-menu  dropdown-menu-md-end p-3">
                          <div className="filter-set-view">
                            <div className="filter-set-head">
                              <h4>
                                <i className="ti ti-filter-share" />
                                Filter
                              </h4>
                            </div>
                            <div className="accordion" id="accordionExample">
                              <div className="filter-set-content">
                                <div className="filter-set-content-head">
                                  <Link
                                    to="#"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo"
                                    aria-expanded="true"
                                    aria-controls="collapseTwo"
                                  >
                                    Name
                                  </Link>
                                </div>
                                <div
                                  className="filter-set-contents accordion-collapse collapse show"
                                  id="collapseTwo"
                                  data-bs-parent="#accordionExample"
                                >
                                  <div className="filter-content-list">
                                    <div className="mb-2 icon-form">
                                      <span className="form-icon">
                                        <i className="ti ti-search" />
                                      </span>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search Name"
                                      />
                                    </div>
                                    <ul>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkmarks" />
                                            Darlee Robertson
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Sharon Roy
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Vaughan
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Jessica
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Carol Thomas
                                          </label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="filter-set-content">
                                <div className="filter-set-content-head">
                                  <Link
                                    to="#"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#phone"
                                    aria-expanded="false"
                                    aria-controls="phone"
                                  >
                                    Phone
                                  </Link>
                                </div>
                                <div
                                  className="filter-set-contents accordion-collapse collapse"
                                  id="phone"
                                  data-bs-parent="#accordionExample"
                                >
                                  <div className="filter-content-list">
                                    <ul>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkmarks" />
                                            +1 875455453
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkmarks" />
                                            +1 989757485
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            +1 546555455
                                          </label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="filter-set-content">
                                <div className="filter-set-content-head">
                                  <Link
                                    to="#"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#email"
                                    aria-expanded="false"
                                    aria-controls="email"
                                  >
                                    Email
                                  </Link>
                                </div>
                                <div
                                  className="filter-set-contents accordion-collapse collapse"
                                  id="email"
                                  data-bs-parent="#accordionExample"
                                >
                                  <div className="filter-content-list">
                                    <ul>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkmarks" />
                                            robertson@example.com
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkmarks" />
                                            sharon@example.com
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            vaughan12@example.com
                                          </label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="filter-set-content">
                                <div className="filter-set-content-head">
                                  <Link
                                    to="#"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#location"
                                    aria-expanded="false"
                                    aria-controls="location"
                                  >
                                    Location
                                  </Link>
                                </div>
                                <div
                                  className="filter-set-contents accordion-collapse collapse"
                                  id="location"
                                  data-bs-parent="#accordionExample"
                                >
                                  <div className="filter-content-list">
                                    <ul>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkmarks" />
                                            Germany
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkmarks" />
                                            USA
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            Canada
                                          </label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="filter-set-content">
                                <div className="filter-set-content-head">
                                  <Link
                                    to="#"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#owner"
                                    aria-expanded="false"
                                    aria-controls="owner"
                                  >
                                    Created Date
                                  </Link>
                                </div>
                                <div
                                  className="filter-set-contents accordion-collapse collapse"
                                  id="owner"
                                  data-bs-parent="#accordionExample"
                                >
                                  <div className="filter-content-list">
                                    <ul>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkmarks" />
                                            25 Sep 2023, 12:12 pm
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkmarks" />
                                            27 Sep 2023, 07:40 am
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            29 Sep 2023, 08:20 am
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            02 Oct 2023, 10:10 am
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input type="checkbox" />
                                            <span className="checkmarks" />
                                            17 Oct 2023, 04:25 pm
                                          </label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="filter-set-content">
                                <div className="filter-set-content-head">
                                  <Link
                                    to="#"
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#Status"
                                    aria-expanded="false"
                                    aria-controls="Status"
                                  >
                                    Status
                                  </Link>
                                </div>
                                <div
                                  className="filter-set-contents accordion-collapse collapse"
                                  id="Status"
                                  data-bs-parent="#accordionExample"
                                >
                                  <div className="filter-content-list">
                                    <ul>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkmarks" />
                                            Active
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="filter-checks">
                                          <label className="checkboxs">
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                            />
                                            <span className="checkmarks" />
                                            Inactive
                                          </label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="filter-reset-btns">
                              <div className="row">
                                <div className="col-6">
                                  <Link to="#" className="btn btn-light">
                                    Reset
                                  </Link>
                                </div>
                                <div className="col-6">
                                  <Link to="#" className="btn btn-primary">
                                    Filter
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Filter */}
                  {/* Manage Users List */}
                  <div className="table-responsive custom-table">
                    <Table
                      columns={columns}
                      dataSource={filteredAndSortedData}
                      // dataSource={data}
                      pagination={pagination}
                      onChange={handleTableChange}
                    />
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="datatable-length" />
                    </div>
                    <div className="col-md-6">
                      <div className="datatable-paginate" />
                    </div>
                  </div>
                  {/* /Manage Users List */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      {/* Add User */}
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="offcanvas_add"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-semibold">Add New User</h5>
          <button
            type="button"
            className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            id = "offcanvas_close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleSubmit}>
            <div>
              {/* Basic Info */}
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="profile-pic-upload">
                      <div className="profile-pic">
                        <span>
                          <i className="ti ti-photo" />
                        </span>
                      </div>
                      <div className="upload-content">
                        <div className="upload-btn">
                          <input type="file" name="image" onChange={handleChange}/>
                          <span>
                            <i className="ti ti-file-broken" />
                            Upload File
                          </span>
                        </div>
                        <p>JPG, GIF or PNG. Max size of 800K</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        {" "}
                        Name <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" name="name" onChange={handleChange} value={user.name}/>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="col-form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        {/* <div className="status-toggle small-toggle-btn d-flex align-items-center">
                          <span className="me-2 label-text">Email Opt Out</span>
                          <input
                            type="checkbox"
                            id="user1"
                            className="check"
                            defaultChecked
                          />
                          <label htmlFor="user1" className="checktoggle" />
                        </div> */}
                      </div>
                      <input type="text" className="form-control" name="email" onChange={handleChange} value={user.email || ""}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Department <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" name="department" onChange={handleChange} value={user.department || ""}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">Designation</label>
                      <input type="text" className="form-control" name="designation" onChange={handleChange} value={user.designation || ""}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Role (user / admin etc..)<span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" name="role" onChange={handleChange} value={user.role || ""}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" name="phone" onChange={handleChange} value={user.phone || ""}/>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Password <span className="text-danger">*</span>
                      </label>
                      <div className="icon-form-end">
                        <span className="form-icon">
                          <i className="ti ti-eye-off" />
                        </span>
                        <input type="password" className="form-control" name="password" onChange={handleChange}/>
                      </div>
                    </div>
                  </div>
                  {
                    user.action === "insert" && 
                    <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Repeat Password <span className="text-danger">*</span>
                      </label>
                      <div className="icon-form-end">
                        <span className="form-icon">
                          <i className="ti ti-eye-off" />
                        </span>
                        <input type="password" className="form-control" name="confirm_password" onChange={handleChange}/>
                      </div>
                    </div>
                  </div>
                  }
                  
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Employee Id <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" name="emp_id" onChange={handleChange} value={user.emp_id || ""}/>
                      {/* <Select
                        classNamePrefix="react-select"
                        className="select"
                        options={options2}
                      /> */}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="radio-wrap">
                      <label className="col-form-label">Status</label>
                      <div className="d-flex align-items-center">
                        <div className="me-2">
                          <input
                            type="radio"
                            className="status-radio"
                            id="active1"
                            name="status"
                            value="active"
                            checked = {user.status == "active" ? true : false}
                            onChange={handleChange}
                          />
                          <label htmlFor="active1">Active</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            className="status-radio"
                            id="inactive1"
                            name="status"
                            value="inactive"
                            checked = {user.status == "inactive" ? true : false}
                            onChange={handleChange}
                          />
                          <label htmlFor="inactive1">Inactive</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Basic Info */}
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="offcanvas"
              >
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
     
      {/* /Add User */}
      {/* Edit User */}
      <div
        className="offcanvas offcanvas-end offcanvas-large"
        tabIndex={-1}
        id="offcanvas_edit"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-semibold">Edit User</h5>
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
              {/* Basic Info */}
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="profile-pic-upload">
                      <div className="profile-pic">
                        <span>
                          <i className="ti ti-photo" />
                        </span>
                      </div>
                      <div className="upload-content">
                        <div className="upload-btn">
                          <input type="file" />
                          <span>
                            <i className="ti ti-file-broken" />
                            Upload File
                          </span>
                        </div>
                        <p>JPG, GIF or PNG. Max size of 800K</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        {" "}
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Darlee Robertson"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        User Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Darlee Robertson"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="col-form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <div className="status-toggle small-toggle-btn d-flex align-items-center">
                          <span className="me-2 label-text">Email Opt Out</span>
                          <input
                            type="checkbox"
                            id="user1"
                            className="check"
                            defaultChecked
                          />
                          <label htmlFor="user1" className="checktoggle" />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="robertson@example.com"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Role <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Facility Manager"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Phone 1 <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="	+1 989757485"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">Phone 2</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="	+1 989757485"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Password <span className="text-danger">*</span>
                      </label>
                      <div className="icon-form-end">
                        <span
                          className="form-icon"
                          onClick={() => togglePassword(0)}
                        >
                          <i
                            className={
                              passwords[0] ? "ti ti-eye" : "ti ti-eye-off"
                            }
                          ></i>
                        </span>
                        <input
                          type={passwords[0] ? "text" : "password"}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Repeat Password <span className="text-danger">*</span>
                      </label>
                      <div className="icon-form-end">
                        <span
                          className="form-icon"
                          onClick={() => togglePassword(1)}
                        >
                          <i
                            className={
                              passwords[1] ? "ti ti-eye" : "ti ti-eye-off"
                            }
                          ></i>
                        </span>
                        <input
                          type={passwords[1] ? "text" : "password"}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Location <span className="text-danger">*</span>
                      </label>
                      <Select
                        classNamePrefix="react-select"
                        className="select"
                        options={options2}
                        defaultValue={options2[1]}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="radio-wrap">
                      <label className="col-form-label">Status</label>
                      <div className="d-flex align-items-center">
                        <div className="me-2">
                          <input
                            type="radio"
                            className="status-radio"
                            id="active1"
                            name="status"
                            defaultChecked
                          />
                          <label htmlFor="active1">Active</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            className="status-radio"
                            id="inactive1"
                            name="status"
                          />
                          <label htmlFor="inactive1">Inactive</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Basic Info */}
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="offcanvas"
              >
                Cancel
              </Link>
              <button
                type="button"
                data-bs-dismiss="offcanvas"
                className="btn btn-primary"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* /Edit User */}
      {/* Delete User */}
      {/* {showDeleteModal && (
      <div className="modal fade" id="delete_contact" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-center">
                <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                  <i className="ti ti-trash-x fs-36 text-danger" />
                </div>
                <h4 className="mb-2">Remove users?</h4>
                <p className="mb-0">Are you sure you want to remove it</p>
                <div className="d-flex align-items-center justify-content-center mt-4">
                  <Link
                    to="#"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link to="#" className="btn btn-danger">
                    Yes, Delete it
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )} */}
      {showDeleteModal && (
  <div className="modal-backdrop show">
    <div className="modal fade show d-block" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-center">
              <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                <i className="ti ti-trash-x fs-36 text-danger" />
              </div>
              <h4 className="mb-2">Remove user?</h4>
              <p className="mb-0">Are you sure you want to remove this user?</p>
              <div className="d-flex align-items-center justify-content-center mt-4">
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Yes, Delete it
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

      {/* /Delete User */}
    </>
  );
};

export default Manageusers;
