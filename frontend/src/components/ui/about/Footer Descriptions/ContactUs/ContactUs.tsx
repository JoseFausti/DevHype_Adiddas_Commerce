import styles from './ContactUs.module.css';
import { useState } from 'react';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('https://formspree.io/f/mkgbrppg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Error enviando el formulario');
      setSubmitted(true);
    } catch {
      alert('Error al enviar, por favor intente luego.');
    }
  };
  

  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <p>
        We’d love to hear from you! Please fill out the form below and our support team will get back to you as soon as possible.
      </p>

      {submitted ? (
        <div className={styles.thanksMessage}>
          <h2>Thank you for reaching out!</h2>
          <p>We will respond to your inquiry shortly.</p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />

          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject of your message"
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message here"
          />

          <button type="submit" className={styles.submitBtn}>Send Message</button>
        </form>
      )}
    </div>
  );
};

export default ContactUs;
