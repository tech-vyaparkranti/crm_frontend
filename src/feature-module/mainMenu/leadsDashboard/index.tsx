import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";
import api from "../../../api/api";
import { Lead, PaginatedResponse } from "./LeadInterface";

const route = all_routes;

const LeadsDashboard = () => {
  const sourceLabels = [
  "Phone Calls",
  "Social Media",
  "Referral Sites",
  "Web Analytics",
  "Previous Purchases",
  "Other"
];

const [chartOptions, setChartOptions] = useState<any>({
  series: [],
  chart: {
    type: "pie",
    height: 300,
  },
  labels: [], // Will be set dynamically
  legend: {
    position: "bottom",
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 250,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
});

  // const [chartOptions] = useState<any>({
  //   series: [
  //     {
  //       data: [400, 220, 448],
  //       color: "#FC0027",
  //     },
  //   ],
  //   chart: {
  //     type: "bar",
  //     height: 150,
  //   },
  //   plotOptions: {
  //     bar: {
  //       horizontal: true,
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   xaxis: {
  //     categories: ["Conversation", "Follow Up", "Inpipeline"],
  //     min: 0,
  //     max: 500,
  //     tickAmount: 5,
  //   },
  // });
  const [chartOptions2] = useState<any>({
    series: [
      {
        data: [400, 220, 448],
        color: "#77D882",
      },
    ],
    chart: {
      type: "bar",
      height: 150,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Conversation", "Follow Up", "Inpipeline"],
      min: 0,
      max: 500,
      tickAmount: 5,
    },
  });
  // const [chartOptions3] = useState<any>({
  //   series: [44, 55, 13, 43],
  //   options: {
  //     chart: {
  //       width: 400,
  //       height: 300,
  //       type: "pie",
  //     },
  //     legend: {
  //       position: "bottom",
  //     },
  //     labels: ["Inpipeline", "Follow Up", "Schedule Service", "Conversation"],
  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {
  //           chart: {
  //             width: 275,
  //           },
  //           legend: {
  //             position: "bottom",
  //           },
  //         },
  //       },
  //     ],
  //   },
  // });

  // const chartElement = document.querySelector("#leadpiechart");
  // if (chartElement) {
  //   const options = {
  //     series: chartOptions3.series,
  //     chart: {
  //       width: 400,
  //       type: "pie",
  //     },
  //     legend: {
  //       position: "bottom",
  //     },
  //     labels: chartOptions3.options.labels,
  //     responsive: chartOptions3.options.responsive,
  //   };

  //   const chart = new ApexCharts(chartElement, options);
  //   chart.render();
  // }

  // const [chartOptions3] = useState<any>( {
  //   series: [44, 55, 13, 43],
  //   options: {
  //     chart: {
  //       width: 400,
  //       height: 300,
  //       type: "pie",
  //     },
  //     legend: {
  //       position: "bottom",
  //     },
  //     labels: ["Inpipeline", "Follow Up", "Schedule Service", "Conversation"],
  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {
  //           chart: {
  //             width: 275,
  //           },
  //           legend: {
  //             position: "bottom",
  //           },
  //         },
  //       },
  //     ],
  //   },
  // });
  // const [chartOptions4] = useState<any>({
  //   series: [
  //     {
  //       name: "Reports",
  //       data: [40, 30, 20, 30, 22, 20, 30, 20, 22, 30, 15, 20],
  //     },
  //   ],
  //   colors: ["#4A00E5"],
  //   chart: {
  //     height: 273,
  //     type: "area",
  //     zoom: {
  //       enabled: false,
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   title: {
  //     text: "",
  //     align: "left",
  //   },
  //   xaxis: {
  //     categories: [
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
  //     ],
  //   },
  //   yaxis: {
  //     min: 10,
  //     max: 60,
  //     tickAmount: 5,
  //   },
  //   legend: {
  //     position: "top",
  //     horizontalAlign: "left",
  //   },
  // });
  const industryOptions = [
    { value: "Website Development", label: "Website" },
    { value: "Hosting", label: "Hosting" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Hotel Revenue", label: "Hotel Revenue" },
    { value: "App Development", label: "App Development" },
    { value: "Other", label: "Other" },
  ];

  const [chartOptions4, setChartOptions4] = useState<any>({
    series: [],
    chart: {
      height: 273,
      type: "bar",
      zoom: { enabled: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 4,
        distributed: true,
      },
    },
    colors: [
      "#4A00E5",
      "#00BFFF",
      "#28A745",
      "#FFC107",
      "#FF5733",
      "#9C27B0",
      "#FF33A6",
    ],
    dataLabels: { enabled: false },
    title: { text: "", align: "left" },
    xaxis: {
      categories: [],
      labels: { style: { fontSize: "14px" } },
    },
    yaxis: {
      min: 0,
      labels: { style: { fontSize: "14px" } },
    },
    legend: { show: false }, // Hide legend when bars are individually colored
  });

  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
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

  const [leads, setLeads] = useState<Lead[]>([]);
  const [allLeads, setAllLeads] = useState();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filterDays, setFilterDays] = useState<number>(30);
  const [dayLabel, setDayLabel] = useState("last 30 days");
  const leadStatuses = ["connected", "not connected", "closed", "lost", "new"];

  const [chartOptions3, setChartOptions3] = useState<any>({
    series: [], // initial empty series
    options: {
      chart: {
        width: 400,
        height: 300,
        type: "pie",
      },
      legend: {
        position: "bottom",
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 275,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    fetchLeads(currentPage, filterDays);
  }, [filterDays, currentPage]);

  const fetchLeads = async (page: number = 1, filterDays: number = 1) => {
    try {
      const response = await api.get("/api/dashboard/lead", {
        params: { days: filterDays, page: page },
      });
      setAllLeads(response.data.allLeads);
      setLeads(response.data.leads.data);
      setCurrentPage(response.data.leads.current_page);
      setLastPage(response.data.leads.last_page);
      const totalLeads = response.data.allLeads;
      const statusCounts: Record<string, number> = {};

      leadStatuses.forEach((status) => {
        statusCounts[status] = 0;
      });

      totalLeads.forEach((lead: any) => {
        const status = lead.status ? lead.status.toLowerCase().trim() : "";
        if (leadStatuses.includes(status)) {
          statusCounts[status]++;
        } else {
          console.warn(`Unknown status found: "${lead.status}"`);
        }
      });

      const newSeries  = leadStatuses.map((status) => statusCounts[status]);

      setChartOptions3((prev: any) => ({
        ...prev,
        series : newSeries,
        options: {
          ...prev.options,
          labels: leadStatuses,
        },
      }));

      const industryCounts = industryOptions.map(({ value }) => {
        return totalLeads.filter(
          (totalLeads: any) =>
            totalLeads.industry &&
            totalLeads.industry.toLowerCase().trim() ===
              value.toLowerCase().trim()
        ).length;
      });

      setChartOptions4((prev: any) => ({
        ...prev,
        series: [{ name: "Reports", data: industryCounts }],
        xaxis: {
          ...prev.xaxis,
          categories: industryOptions.map((opt) => opt.label),
        },
      }));

      const sourceCounts: Record<string, number> = {};
    sourceLabels.forEach(label => {
      sourceCounts[label] = 0;
    });

    totalLeads.forEach((lead: any) => {
      const source = lead.source?.trim();
      if (sourceLabels.includes(source)) {
        sourceCounts[source]++;
      }
    });

    const series = sourceLabels.map(label => sourceCounts[label]);

    setChartOptions((prev: any) => ({
      ...prev,
      series,
      labels: sourceLabels,
    }));
    } catch (error) {
      console.error("Failed to fetch leads", error);
    }
  };

  const leadSorting = (days: number, label: string) => {
    setFilterDays(days);
    setDayLabel(label);
  };

  return (
    <div>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="page-header">
                <div className="row align-items-center ">
                  <div className="col-md-4">
                    <h3 className="page-title">Leads Dashboard</h3>
                  </div>
                  {/* <div className="col-md-8 float-end ms-auto">
                    <div className="d-flex title-head">
                      <div className="daterange-picker d-flex align-items-center justify-content-center">
                        <div className="form-sort me-2">
                          <i className="ti ti-calendar" />
                          <DateRangePicker initialSettings={initialSettings} onApply={(event, picker) => {
                            setDateRange({
                              start: picker.startDate.toDate(),
                              end: picker.endDate.toDate(),
                            });
                          }}>
                            <input
                              className="form-control bookingrange"
                              type="text"
                            />
                          </DateRangePicker>
                        </div>
                        <div className="head-icons mb-0">
                          <CollapseHeader />
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row align-items-start">
            <div
              className="col-md-7"
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <h4>
                      <i className="ti ti-grip-vertical me-1" />
                      Recently Created Leads
                    </h4>
                    <div className="dropdown">
                      <Link
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        to="#"
                      >
                        <i className="ti ti-calendar-check me-2" />
                        {dayLabel}
                      </Link>
                      <div className="dropdown-menu dropdown-menu-end">
                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={() => leadSorting(1, "Today")}
                        >
                          Today
                        </Link>
                        <Link
                          to="#"
                          className="dropdown-item"
                          onClick={() => leadSorting(15, "Last 15 days")}
                        >
                          Last 15 days
                        </Link>
                        <Link
                          to="#"
                          className="dropdown-item"
                          onClick={() => leadSorting(30, "Last 30 days")}
                        >
                          Last 30 days
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive custom-table">
                    <table className="table dataTable" id="lead-project">
                      <thead className="thead-light">
                        <tr>
                          <th>Lead Name</th>
                          <th>Company Name</th>
                          <th>Phone</th>
                          <th>Lead Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* <tr className="odd">
                          <td>Collins</td>
                          <td>
                            <h2 className="d-flex align-items-center">
                              <Link
                                to={route.companyDetails}
                                className="avatar avatar-sm border me-2"
                              >
                                <ImageWithBasePath
                                  className="w-auto h-auto"
                                  src="assets/img/icons/company-icon-01.svg"
                                  alt="User Image"
                                />
                              </Link>
                              <Link
                                to={route.companyDetails}
                                className="d-flex flex-column"
                              >
                                NovaWave LLC
                                <span className="text-default">
                                  Newyork, USA{" "}
                                </span>
                              </Link>
                            </h2>
                          </td>
                          <td>+1 875455453</td>
                          <td>
                            <span className="badge badge-pill  bg-pending">
                              {" "}
                              Not Contacted
                            </span>
                          </td>
                        </tr>
                        <tr className="even">
                          <td>Konopelski</td>
                          <td>
                            <h2 className="d-flex align-items-center">
                              <Link
                                to={route.companyDetails}
                                className="avatar avatar-sm border me-2"
                              >
                                <ImageWithBasePath
                                  className="w-auto h-auto"
                                  src="assets/img/icons/company-icon-02.svg"
                                  alt="User Image"
                                />
                              </Link>
                              <Link
                                to={route.companyDetails}
                                className="d-flex flex-column"
                              >
                                BlueSky Industries
                                <span className="text-default">
                                  Winchester, KY{" "}
                                </span>
                              </Link>
                            </h2>
                          </td>
                          <td>+1 989757485</td>
                          <td>
                            <span className="badge badge-pill  bg-warning">
                              {" "}
                              Contacted
                            </span>
                          </td>
                        </tr>
                        <tr className="odd">
                          <td>Adams</td>
                          <td>
                            <h2 className="d-flex align-items-center">
                              <Link
                                to={route.companyDetails}
                                className="avatar avatar-sm border me-2"
                              >
                                <ImageWithBasePath
                                  className="w-auto h-auto"
                                  src="assets/img/icons/company-icon-03.svg"
                                  alt="User Image"
                                />
                              </Link>
                              <Link
                                to={route.companyDetails}
                                className="d-flex flex-column"
                              >
                                SilverHawk
                                <span className="text-default">
                                  Jametown, NY{" "}
                                </span>
                              </Link>
                            </h2>
                          </td>
                          <td>+1 546555455</td>
                          <td>
                            <span className="badge badge-pill  bg-warning">
                              {" "}
                              Contacted
                            </span>
                          </td>
                        </tr>
                        <tr className="even">
                          <td>Schumm</td>
                          <td>
                            <h2 className="d-flex align-items-center">
                              <Link
                                to={route.companyDetails}
                                className="avatar avatar-sm border me-2"
                              >
                                <ImageWithBasePath
                                  className="w-auto h-auto"
                                  src="assets/img/icons/company-icon-04.svg"
                                  alt="User Image"
                                />
                              </Link>
                              <Link
                                to={route.companyDetails}
                                className="d-flex flex-column"
                              >
                                SummitPeak
                                <span className="text-default">
                                  Compton, RI{" "}
                                </span>
                              </Link>
                            </h2>
                          </td>
                          <td>+1 454478787</td>
                          <td>
                            <span className="badge badge-pill  bg-pending">
                              {" "}
                              Not Contacted
                            </span>
                          </td>
                        </tr> */}
                        {leads.map((lead: Lead) => (
                          <tr key={lead.id}>
                            <td>{lead.lead_name}</td>
                            <td>{lead.company_name}</td>
                            <td>{lead.phone1}</td>
                            <td>
                              <span
                                className={`badge badge-pill bg-${
                                  lead.status === "Contacted"
                                    ? "warning"
                                    : "pending"
                                }`}
                              >
                                {lead.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {leads.length === 0 && (
                          <tr>
                            <td colSpan={4}>No leads found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div className="pagination mt-3">
                      <nav>
                        <ul className="pagination">
                          <li
                            className={`page-item ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(currentPage - 1)}
                            >
                              Previous
                            </button>
                          </li>

                          {[...Array(lastPage)].map((_, index) => {
                            const page = index + 1;
                            return (
                              <li
                                key={page}
                                className={`page-item ${
                                  page === currentPage ? "active" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => setCurrentPage(page)}
                                >
                                  {page}
                                </button>
                              </li>
                            );
                          })}

                          <li
                            className={`page-item ${
                              currentPage === lastPage ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(currentPage + 1)}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5" style={{ flex: "0 0 auto" }}>
              <div className="card w-100">
                <div className="card-header border-0 pb-0">
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <h4>
                      <i className="ti ti-grip-vertical me-1" />
                      Leads According Status
                    </h4>
                    {/* <div className="dropdown">
                      <Link
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        to="#"
                      >
                        Last 30 Days
                      </Link>
                      <div className="dropdown-menu dropdown-menu-end">
                        <Link to="#" className="dropdown-item">
                          Last 30 Days
                        </Link>
                        <Link to="#" className="dropdown-item">
                          Last 15 Days
                        </Link>
                        <Link to="#" className="dropdown-item">
                          Last 7 Days
                        </Link>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div
                  className="card-body"
                  style={{ height: "auto", padding: "1rem" }}
                >
                  <div id="leadpiechart">
                    {/* <Chart
                      options={chartOptions3.options}
                      series={chartOptions3.series}
                      type="pie"
                      width={chartOptions3.options.chart.width}
                      height={chartOptions3.options.chart.height}
                    /> */}
                    {chartOptions3.series.length > 0 && (
                      <Chart
                        options={chartOptions3.options}
                        series={chartOptions3.series}
                        type="pie"
                        width={chartOptions3.options.chart.width}
                        height={chartOptions3.options.chart.height}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 d-flex">
              <div className="card w-100">
                <div className="card-header border-0 pb-0">
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <h4>
                      <i className="ti ti-grip-vertical me-1" />
                      Leads According Industry
                    </h4>
                    {/* <div className="d-flex align-items-center flex-wrap row-gap-2">
                      <div className="dropdown me-2">
                        <Link
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                          to="#"
                        >
                          Sales Pipeline
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                          <Link to="#" className="dropdown-item">
                            Marketing Pipeline
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Sales Pipeline
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Email
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Chats
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Operational
                          </Link>
                        </div>
                      </div>
                      <div className="dropdown">
                        <Link
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                          to="#"
                        >
                          Last 30 Days
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                          <Link to="#" className="dropdown-item">
                            Last 30 Days
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Last 15 Days
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Last 7 Days
                          </Link>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="card-body">
                  <div id="contact-report">
                    <Chart
                      options={chartOptions4}
                      series={chartOptions4.series}
                      type="bar"
                      height={chartOptions4.chart.height}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <h4>
                      <i className="ti ti-grip-vertical me-1" />
                      Leads According Sources
                    </h4>
                    {/* <div className="d-flex align-items-center flex-wrap row-gap-2">
                      <div className="dropdown me-2">
                        <Link
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                          to="#"
                        >
                          Marketing Pipeline
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                          <Link to="#" className="dropdown-item">
                            Marketing Pipeline
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Sales Pipeline
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Email
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Chats
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Operational
                          </Link>
                        </div>
                      </div>
                      <div className="dropdown">
                        <Link
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                          to="#"
                        >
                          Last 3 months
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                          <Link to="#" className="dropdown-item">
                            Last 3 months
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Last 6 months
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Last 12 months
                          </Link>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="card-body">
                  <div id="last-chart">
                     {chartOptions.series.length > 0 && (
                    <Chart
                        options={chartOptions}
                        series={chartOptions.series}
                        type={chartOptions.chart.type}
                        height={chartOptions.chart.height}
                      />
                     )}

                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <h4>
                      <i className="ti ti-grip-vertical me-1" />
                      Won Deals Stage
                    </h4>
                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                      <div className="dropdown me-2">
                        <Link
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                          to="#"
                        >
                          Marketing Pipeline
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                          <Link to="#" className="dropdown-item">
                            Marketing Pipeline
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Sales Pipeline
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Email
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Chats
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Operational
                          </Link>
                        </div>
                      </div>
                      <div className="dropdown">
                        <Link
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                          to="#"
                        >
                          Last 3 months
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                          <Link to="#" className="dropdown-item">
                            Last 3 months
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Last 6 months
                          </Link>
                          <Link to="#" className="dropdown-item">
                            Last 12 months
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body ">
                  <div id="won-chart">
                    {" "}
                    <Chart
                      options={chartOptions2}
                      series={chartOptions2.series}
                      type={chartOptions2.chart.type}
                      height={chartOptions2.chart.height}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsDashboard;
