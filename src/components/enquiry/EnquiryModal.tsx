'use client';

import React, { useState, useEffect } from 'react';
import styles from './EnquiryModal.module.css';
import { service } from '@/data/details';
import { supabase } from '@/lib/supabase';
import Button from '@/components/button/Button';

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
  selectedService?: string;
}

interface FormData {
  name: string;
  phone: string;
  service: string;
}

interface FormErrors {
  name: string;
  phone: string;
}

export default function EnquiryModal({
  open,
  onClose,
  selectedService
}: EnquiryModalProps) {

  const defaultService =
    service.websiteDevelopment.title

  const [formData, setFormData] =
    useState<FormData>({
      name: '',
      phone: '',
      service: selectedService || defaultService
    })

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  const [errors, setErrors] =
    useState<FormErrors>({
      name: '',
      phone: ''
    })

  // Lock body scroll
  useEffect(() => {

    document.body.style.overflow =
      open ? 'hidden' : 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }

  }, [open])

  // Update service
  useEffect(() => {

    setFormData(prev => ({
      ...prev,
      service: selectedService || defaultService
    }))

  }, [selectedService, defaultService])

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    // Name validation
    const nameValid =
      /^[A-Za-z\s]+$/.test(
        formData.name.trim()
      )

    // International phone validation
    const phoneValid =
      /^\+?[1-9]\d{7,14}$/.test(
        formData.phone.trim()
      )

    if (!nameValid || !phoneValid) {

      setErrors({
        name: nameValid
          ? ''
          : 'Please enter a valid name',

        phone: phoneValid
          ? ''
          : 'Please enter a valid international phone number'
      })

      return
    }

    setIsSubmitting(true)

    try {

      const { error } = await supabase
        .from('quotes')
        .insert([
          {
            name: formData.name.trim(),

            phone: formData.phone.trim(),

            service: formData.service,

            source: 'anksquare.in',

            status: 'pending'
          }
        ])

      if (error) throw error

      // Reset form
      setFormData({
        name: '',
        phone: '',
        service: selectedService || defaultService
      })

      setErrors({
        name: '',
        phone: ''
      })

      onClose()

    } catch (error) {

      console.error(
        'Error submitting form:',
        error
      )

      alert(
        'Something went wrong. Please try again.'
      )

    } finally {

      setIsSubmitting(false)

    }
  }

  if (!open) return null;

  return (
    <>
      <div
        className={styles.modalBackdrop}
        onClick={onClose}
      >

        <div
          className={styles.modalContainer}
          onClick={e => e.stopPropagation()}
        >

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close enquiry popup"
          >
            ×
          </button>

          <h2 className={styles.modalHeader}>
            Enquiry Form
          </h2>

          <div style={{ padding: '24px' }}>

            <form onSubmit={handleSubmit}>

              {/* Name */}
              <div className={styles.formGroup}>

                <label htmlFor="name">
                  Name
                </label>

                <input
                  type="text"
                  id="name"

                  value={formData.name}

                  placeholder="Enter Your Name"

                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      name: e.target.value
                    }))
                  }

                  className={
                    errors.name
                      ? styles.error
                      : ''
                  }
                />

                {errors.name && (
                  <span className={styles.errorText}>
                    {errors.name}
                  </span>
                )}

              </div>

              {/* Phone */}
              <div className={styles.formGroup}>

                <label htmlFor="phone">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  id="phone"

                  value={formData.phone}

                  placeholder="+91 9876543210"

                  onChange={e => {

                    let value = e.target.value

                    // Allow only digits and +
                    value =
                      value.replace(/[^\d+]/g, '')

                    // Allow only one + at beginning
                    if (value.includes('+')) {

                      value =
                        '+' +
                        value
                          .replace(/\+/g, '')
                          .replace(/^\+/, '')
                    }

                    // Limit to 15 digits
                    const digitsOnly =
                      value.replace(/\D/g, '')

                    if (
                      digitsOnly.length > 15
                    ) {
                      return
                    }

                    setFormData(prev => ({
                      ...prev,
                      phone: value
                    }))
                  }}

                  maxLength={16}

                  className={
                    errors.phone
                      ? styles.error
                      : ''
                  }
                />

                {errors.phone && (
                  <span className={styles.errorText}>
                    {errors.phone}
                  </span>
                )}

              </div>

              {/* Service */}
              <div className={styles.formGroup}>

                <label htmlFor="service">
                  Service Type
                </label>

                <select
                  id="service"

                  value={formData.service}

                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      service: e.target.value
                    }))
                  }
                >

                  <option value="">
                    -- choose --
                  </option>

                  {Object.values(service).map(s => (

                    <option
                      key={s.title}
                      value={s.title}
                    >
                      {s.title}
                    </option>

                  ))}

                </select>

              </div>

              {/* Button */}
              <div className={styles.buttonGroup}>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >

                  {isSubmitting
                    ? 'Submitting...'
                    : 'Submit'}

                </Button>

              </div>

            </form>

          </div>

        </div>

      </div>
    </>
  );
}