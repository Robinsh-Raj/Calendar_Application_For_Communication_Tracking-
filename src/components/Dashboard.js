import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext"; // Ensure this context is defined in your application
import CommunicationPerformedModal from "./CommunicationPerformedModal"; // Ensure this component is defined
import CalendarView from "./CalendarView"; // Ensure this component is defined
import Notifications from "./Notifications"; // Ensure this component is defined

const Dashboard = () => {
  const { companies, setCompanies } = useContext(AppContext);
  const [view, setView] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const handleCommunicationPerformed = (type, date, notes) => {
    const today = new Date().toISOString().split("T")[0];

    // Validate the date
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid date provided:", date);
      return; // Exit if the date is invalid
    }

    selectedCompanies.forEach((id) => {
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) => {
          if (company.id === id) {
            const newCommunication = { type, date, notes };
            const nextDate = new Date(parsedDate);
            nextDate.setDate(nextDate.getDate() + company.periodicity * 7);
            return {
              ...company,
              communications: [
                ...(company.communications || []),
                newCommunication,
              ],
              nextCommunication: {
                type,
                date: nextDate.toISOString().split("T")[0],
              },
              todaysCount:
                (company.todaysCount || 0) + (date === today ? 1 : 0),
            };
          }
          return company;
        })
      );
    });

    setSelectedCompanies([]);
    setShowModal(false);
  };

  const toggleCompanySelection = (id) => {
    setSelectedCompanies((prev) =>
      prev.includes(id)
        ? prev.filter((companyId) => companyId !== id)
        : [...prev, id]
    );
  };

  const overdueCount = companies.filter(
    (company) =>
      company.nextCommunication &&
      new Date(company.nextCommunication.date) < new Date()
  ).length;

  const todaysCount = companies.reduce(
    (total, company) => total + (company.todaysCount || 0),
    0
  );

  const determineHighlight = (nextCommunication) => {
    if (
      !nextCommunication ||
      !nextCommunication.date ||
      isNaN(new Date(nextCommunication.date).getTime())
    ) {
      return null;
    }

    const today = new Date().toISOString().split("T")[0];
    const nextDate = new Date(nextCommunication.date);

    if (nextDate < new Date()) {
      return "red";
    } else if (nextDate.toISOString().split("T")[0] === today) {
      return "yellow";
    }
    return null;
  };

  return (
    <div className="module">
      <h2>{view === "dashboard" ? "Dashboard" : "Calendar View"}</h2>
      <button
        onClick={() => setView(view === "dashboard" ? "calendar" : "dashboard")}
      >
        Switch to {view === "dashboard" ? "Calendar View" : "Dashboard"}
      </button>
      {view === "dashboard" ? (
        <div>
          <h3>Notifications</h3>
          <p>
            Overdue Communications:{" "}
            <span className="badge red">{overdueCount}</span>
          </p>
          <p>
            Today's Communications:{" "}
            <span className="badge yellow">{todaysCount}</span>
          </p>
          <table>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Last Five Communications</th>
                <th>Next Scheduled Communication</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => {
                const highlightColor = determineHighlight(
                  company.nextCommunication
                );
                return (
                  <tr
                    key={company.id}
                    style={{ backgroundColor: highlightColor }}
                  >
                    <td>{company.name}</td>
                    <td>
                      {Array.isArray(company.communications) &&
                      company.communications.length > 0 ? (
                        company.communications.slice(-5).map((comm, index) => (
                          <div
                            key={index}
                            title={comm.notes}
                            className="communication-item"
                          >
                            {comm.type} -{" "}
                            {new Date(comm.date).toLocaleDateString()}
                          </div>
                        ))
                      ) : (
                        <div>No communications recorded.</div>
                      )}
                    </td>
                    <td>
                      {company.nextCommunication &&
                      company.nextCommunication.date &&
                      !isNaN(
                        new Date(company.nextCommunication.date).getTime()
                      ) ? (
                        <div>
                          {company.nextCommunication.type} on{" "}
                          {new Date(
                            company.nextCommunication.date
                          ).toLocaleDateString()}
                        </div>
                      ) : (
                        <div>No upcoming communication.</div>
                      )}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedCompanies.includes(company.id)}
                        onChange={() => toggleCompanySelection(company.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            onClick={() => setShowModal(true)}
            disabled={selectedCompanies.length === 0}
          >
            Communication Performed
          </button>
          {showModal && (
            <CommunicationPerformedModal
              onClose={() => setShowModal(false)}
              onSubmit={handleCommunicationPerformed}
            />
          )}
        </div>
      ) : (
        <CalendarView
          companies={companies}
          onAddCommunication={handleCommunicationPerformed}
        />
      )}
      <Notifications companies={companies} />
    </div>
  );
};

export default Dashboard;
