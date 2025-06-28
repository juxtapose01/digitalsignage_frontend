import React, { useState } from "react";

function EmailForm() {
  const [formData, setFormData] = useState({
    event_name: "",
    hall_name: "",
    venue: "",
    image_url: "",
  });

  const [emailContent, setEmailContent] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/generate-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setEmailContent(data.email_html || data.error || "No content");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Generate Event Email</h1>
      <form onSubmit={handleSubmit}>
        <input name="event_name" placeholder="Event Name" onChange={handleChange} /><br />
        <input name="hall_name" placeholder="Hall Name" onChange={handleChange} /><br />
        <input name="venue" placeholder="Venue" onChange={handleChange} /><br />
        <input name="image_url" placeholder="Image URL" onChange={handleChange} /><br />
        <button type="submit">Generate Email</button>
      </form>

      {emailContent && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Generated Email:</h2>
          <div dangerouslySetInnerHTML={{ __html: emailContent }} />
        </div>
      )}
    </div>
  );
}

export default EmailForm;
