import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { Button, Input, Textarea, Card, Badge } from '../components/common';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

export const Contact = () => {
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'General Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject line is required.';
    if (!formData.message.trim()) {
      errs.message = 'Please include details about your travel plans.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Message must be at least 15 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/contact', formData);
      setLoading(false);
      setIsSubmitted(true);
      toast.success(res.data?.message || 'Your inquiry has been received and stored in our database.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'General Inquiry',
        message: ''
      });
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.message || 'Failed to submit inquiry. Please try again.';
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <Badge variant="primary" size="sm">Global Concierge Desk</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">
          Contact Our Expedition Advisors
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          Have questions regarding physical conditioning, bespoke departures, or private chartering? We are here to guide you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Information & Office Details */}
        <div className="space-y-6">
          <Card padding="p-6" className="space-y-4">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary-500" />
              <span>Headquarters & Desks</span>
            </h3>

            <div className="space-y-4 text-xs text-neutral-600 dark:text-neutral-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-neutral-900 dark:text-white">San Francisco Operations Hub</p>
                  <p className="text-neutral-500 mt-0.5">742 Evergreen Terrace, Suite 400<br />San Francisco, CA 94107</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-neutral-900 dark:text-white">Direct Advisory Line</p>
                  <p className="text-neutral-500 mt-0.5">+1 (800) 555-ROAM (Toll Free)<br />Mon–Fri: 07:00 – 19:00 PST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-neutral-900 dark:text-white">Email Communications</p>
                  <p className="text-neutral-500 mt-0.5">concierge@roamvista.com</p>
                </div>
              </div>
            </div>
          </Card>

          <Card padding="p-6" className="space-y-3 bg-gradient-to-br from-primary-900/10 to-transparent border border-primary-500/20">
            <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
              <Clock className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Fast Response SLA</h4>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Our regional expedition coordinators reply to all traveler queries within 4 business hours.
            </p>
          </Card>
        </div>

        {/* Working Form */}
        <div className="lg:col-span-2">
          <Card padding="p-8">
            {isSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Inquiry Dispatched Successfully</h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  Your communication has been logged and assigned to a certified travel advisor. Check your inbox for confirmation.
                </p>
                <Button variant="outline" size="sm" onClick={() => setIsSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    id="contact-name"
                    name="name"
                    label="Full Name"
                    placeholder="e.g. Elena Rostova"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    error={errors.name}
                    required
                  />

                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    label="Email Address"
                    placeholder="e.g. elena@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    error={errors.email}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-category" className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      Topic / Inquiry Type
                    </label>
                    <select
                      id="contact-category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="p-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-primary-500"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Custom Group Charter">Custom Group Charter</option>
                      <option value="Physical & Gear Preparation">Physical & Gear Preparation</option>
                      <option value="Booking Modification">Booking Modification</option>
                      <option value="Press & Media Relations">Press & Media Relations</option>
                    </select>
                  </div>

                  <Input
                    id="contact-subject"
                    name="subject"
                    label="Subject Line"
                    placeholder="e.g. Question regarding Patagonia packing list"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: '' });
                    }}
                    error={errors.subject}
                    required
                  />
                </div>

                <Textarea
                  id="contact-message"
                  name="message"
                  label="Message / Trip Requirements"
                  placeholder="Tell us about your target travel dates, group size, physical readiness, or specific regions of interest..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  error={errors.message}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="md"
                  isLoading={loading}
                  icon={<Send className="w-4 h-4" />}
                >
                  Send Message
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
