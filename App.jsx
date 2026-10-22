import React, { useState } from "react";
import { HashRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import "./App.css";

/* ---------- Reusable components ---------- */

function Navbar() {
  return (
    <header className="site-header">
      <Link to="/" className="brand">Stillpoint</Link>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>Stillpoint Meditation &amp; Spiritual Center</p>
      <p>Daily sessions 5:30 AM to 8:00 PM. Open to everyone.</p>
    </footer>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
      {error && <small>{error}</small>}
    </div>
  );
}

/* ---------- Pages ---------- */

function Home() {
  const programs = [
    { title: "Morning Stillness", text: "Guided breath and silent sitting to start the day clear." },
    { title: "Mantra and Chanting", text: "Evening group chanting with live harmonium." },
    { title: "Weekend Retreat", text: "Two days of silence, yoga, and mindful walking." }
  ];

  return (
    <>
      <section className="hero">
        <div className="breath" aria-hidden="true"></div>
        <h2>Breathe in. Breathe out. Begin here.</h2>
        <p>
          A quiet place to learn meditation, reflect, and reconnect with
          yourself, whatever path you follow.
        </p>
        <Link className="button" to="/register">Join a session</Link>
      </section>

      <section className="programs">
        <h3>What we offer</h3>
        <div className="program-list">
          {programs.map((p) => (
            <article key={p.title}>
              <h4>{p.title}</h4>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function About() {
  return (
    <div className="card wide">
      <h2>About Stillpoint</h2>
      <p>
        Stillpoint is a meditation and spiritual center built around simple
        practice: sit, breathe, notice. Our teachers guide beginners and
        long-time practitioners through mindfulness, yoga, and contemplative
        study.
      </p>
      <p>
        Every program is open to all faiths and backgrounds. You do not need
        any experience. Wear comfortable clothes and bring an open mind.
      </p>
    </div>
  );
}

function Contact() {
  const [msg, setMsg] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (e) => {
    setMsg({ ...msg, [e.target.name]: e.target.value });
    setSent(false);
  };

  const ready =
    msg.name.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(msg.email) &&
    msg.message.trim();

  const submit = (e) => {
    e.preventDefault();
    if (ready) setSent(true);
  };

  return (
    <div className="card">
      <h2>Contact us</h2>
      <p className="note">Questions about programs or visiting? Write to us.</p>
      <form onSubmit={submit} noValidate>
        <Field label="Your name">
          <input name="name" value={msg.name} onChange={update} />
        </Field>
        <Field label="Email address">
          <input name="email" type="email" value={msg.email} onChange={update} />
        </Field>
        <Field label="Message">
          <textarea name="message" rows="4" value={msg.message} onChange={update} />
        </Field>
        <button type="submit" disabled={!ready}>Send message</button>
        {sent && <p className="success">Message sent. We will reply within two days.</p>}
      </form>
    </div>
  );
}

/* ---------- Registration with validation ---------- */

const rules = {
  name: (v) =>
    !v.trim() ? "Name is required."
    : !/^[A-Za-z ]+$/.test(v.trim()) ? "Name must contain letters and spaces only."
    : "",
  email: (v) =>
    !v ? "Email is required."
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid email address."
    : "",
  password: (v) =>
    !v ? "Password is required."
    : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v)
      ? "Use an uppercase letter, a lowercase letter, a number, and 8+ characters."
    : "",
  age: (v) =>
    !v ? "Age is required."
    : !/^\d+$/.test(v) || Number(v) < 18 || Number(v) > 30
      ? "Age must be between 18 and 30."
    : "",
  mobile: (v) =>
    !v ? "Mobile number is required."
    : !/^\d{10}$/.test(v) ? "Enter exactly 10 digits."
    : "",
  gender: (v) => (!v ? "Select a gender." : ""),
  state: (v) => (!v ? "Select a state." : ""),
  program: (v) => (!v ? "Select a program." : "")
};

function Register() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", age: "",
    mobile: "", gender: "", state: "", program: ""
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = {};
  Object.keys(rules).forEach((k) => {
    errors[k] = rules[k](form[k]);
  });
  const valid = Object.values(errors).every((e) => e === "");

  const updateField = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setTouched({ ...touched, [name]: true });
    setSubmitted(false);
  };

  const markTouched = (e) =>
    setTouched({ ...touched, [e.target.name]: true });

  const show = (k) => (touched[k] ? errors[k] : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valid) setSubmitted(true);
  };

  const common = (name) => ({
    name,
    value: form[name],
    onChange: updateField,
    onBlur: markTouched,
    required: true
  });

  return (
    <div className="card">
      <h2>Join a session</h2>
      <p className="note">All fields are required.</p>
      <form onSubmit={handleSubmit} noValidate>
        <Field label="Full name" error={show("name")}>
          <input {...common("name")} placeholder="Enter your name" />
        </Field>

        <Field label="Email address" error={show("email")}>
          <input {...common("email")} type="email" placeholder="Enter your email" />
        </Field>

        <Field label="Password" error={show("password")}>
          <input {...common("password")} type="password" placeholder="Minimum 8 characters" />
        </Field>

        <Field label="Age" error={show("age")}>
          <input {...common("age")} type="number" placeholder="Enter age (18-30)" />
        </Field>

        <Field label="Mobile number" error={show("mobile")}>
          <input {...common("mobile")} type="tel" placeholder="10-digit mobile number" />
        </Field>

        <Field label="Gender" error={show("gender")}>
          <select {...common("gender")}>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </Field>

        <Field label="State" error={show("state")}>
          <select {...common("state")}>
            <option value="">Select state</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Kerala">Kerala</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
          </select>
        </Field>

        <Field label="Program" error={show("program")}>
          <select {...common("program")}>
            <option value="">Select program</option>
            <option value="Morning Stillness">Morning Stillness</option>
            <option value="Mantra and Chanting">Mantra and Chanting</option>
            <option value="Weekend Retreat">Weekend Retreat</option>
          </select>
        </Field>

        <button type="submit" disabled={!valid}>Reserve my place</button>

        {submitted && (
          <p className="success">
            Welcome, {form.name.trim()}. Your place in {form.program} is reserved.
          </p>
        )}
      </form>
    </div>
  );
}

/* ---------- App ---------- */

function App() {
  return (
    <HashRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}

export default App;
