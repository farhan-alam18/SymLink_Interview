import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    price: "",
    numberOfEmployees: "",
    accountStatus: "",
    firstName: "",
    lastName: "",
    adminEmail: "",
  });

  const [evalFrequency, setEvalFrequency] = useState("");
  const [evaluationData, setEvaluationData] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFrequencyChange = (e) => {
    const frequency = e.target.value;
    setEvalFrequency(frequency);

    let evaluationPeriods = [];
    if (frequency === "Annually") {
      evaluationPeriods = [{ title: "", startDate: "", endDate: "" }];
    } else if (frequency === "Semi-annually") {
      evaluationPeriods = [
        { title: "", startDate: "", endDate: "" },
        { title: "", startDate: "", endDate: "" },
      ];
    } else if (frequency === "Quarterly") {
      evaluationPeriods = [
        { title: "", startDate: "", endDate: "" },
        { title: "", startDate: "", endDate: "" },
        { title: "", startDate: "", endDate: "" },
        { title: "", startDate: "", endDate: "" },
      ];
    }

    setEvaluationData(evaluationPeriods);
  };

  const handleInputChange = (index, field, value) => {
    const newData = [...evaluationData];
    newData[index][field] = value;
    setEvaluationData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const evalData = {
      ...formData,
      data: {
        title: "Evaluation",
        evalDuration: evaluationData.map((evalItem, index) => ({
          key: index,
          title: evalItem.title,
          startDate: evalItem.startDate,
          endDate: evalItem.endDate,
        })),
      },
    };

    console.log("Submission Data:", evalData);

    try {
      const response = await fetch(
        "http://localhost:3000/api/company-administrator",
        {
          method: "POST",
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiOWJveCIsImVtYWlsIjoiYWRtaW5AOWJveC5jb20iLCJpYXQiOjE3MjkxNTcxNjIsImV4cCI6MTcyOTE3MTU2Mn0.4_MjWyc5ACfkWwLdcEopGJlPFmxP9DznkBk2RtftzbA",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(evalData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert("Form submitted successfully!");
      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error submitting the form");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Company Info</h1>
        <label>Company Name : </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price : </label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Number of Employees : </label>
        <select
          name="numberOfEmployees"
          value={formData.numberOfEmployees}
          onChange={handleChange}
        >
          <option value="">Select number of employees</option>
          <option value=">50">&lt;50</option>
          <option value="51-100">51-100</option>
          <option value="101-250">101-250</option>
          <option value="251-500">251-500</option>
          <option value="501-1000">501-1000</option>
          <option value=">1000">&gt;1000</option>
        </select>
      </div>

      <div>
        <label>Account Status : </label>
        <select
          name="accountStatus"
          value={formData.accountStatus}
          onChange={handleChange}
        >
          <option value="">Select Account Status</option>
          <option value="paid">Paid</option>
          <option value="free">Free</option>
        </select>
      </div>

      <div>
        <h1>Administrator Info</h1>
        <label>First Name : </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Last Name : </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Administrator Email : </label>
        <input
          type="email"
          name="adminEmail"
          value={formData.adminEmail}
          onChange={handleChange}
        />
      </div>

      <div>
        <h1>Evaluation Period</h1>
        <label>Evaluation Frequency : </label>
        <select onChange={handleFrequencyChange} value={evalFrequency}>
          <option value="">Select Frequency</option>
          <option value="Annually">Annually</option>
          <option value="Semi-annually">Semi-annually</option>
          <option value="Quarterly">Quarterly</option>
        </select>
      </div>

      {evaluationData.map((evalItem, index) => (
        <div key={index}>
          <h3>Evaluation {index + 1}</h3>
          <label>Title : </label>
          <input
            type="text"
            value={evalItem.title}
            onChange={(e) => handleInputChange(index, "title", e.target.value)}
          />
          <label>Start Date : </label>
          <input
            type="date"
            value={evalItem.startDate}
            onChange={(e) =>
              handleInputChange(index, "startDate", e.target.value)
            }
          />
          <label>End Date : </label>
          <input
            type="date"
            value={evalItem.endDate}
            onChange={(e) =>
              handleInputChange(index, "endDate", e.target.value)
            }
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;