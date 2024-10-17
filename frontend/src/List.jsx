import { useEffect, useState } from "react";

const List = () => {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.9boxnow.iosx.in/api/v1/company-administrators-list?limit=10&offset=0&type=COMPANY",
          {
            method: "GET",
            headers: {
              Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiOWJveCIsImVtYWlsIjoiYWRtaW5AOWJveC5jb20iLCJpYXQiOjE3MjkxNTcxNjIsImV4cCI6MTcyOTE3MTU2Mn0.4_MjWyc5ACfkWwLdcEopGJlPFmxP9DznkBk2RtftzbA",
            },
          }
        );
        const data = await response.json();
        setAdmin(data.docs);
      } catch (error) {
        console.error("Error fetching admin data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Company Administrators List</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Administrator Name</th>
            <th>Email</th>
            <th>No. of Employees</th>
            <th>Account Status</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {admin.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.companyName}</td>
              <td>
                {admin.companyAdministrator[0].firstName}{" "}
                {admin.companyAdministrator[0].lastName}
              </td>
              <td>{admin.companyAdministrator[0].email}</td>
              <td>{admin.noOfEmployees}</td>
              <td>{admin.accountStatus}</td>
              <td>
                <img
                  src={admin.image ? admin.image.url : null}
                  alt="Company_Image"
                  width="100"
                  height="100"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;