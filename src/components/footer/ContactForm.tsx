'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Turnstile from 'react-turnstile';
import { Input, TextArea } from '../form/TextField';
import Button from '../Button';
import Alert from '../feedback/Alert';
import { PersonIcon, EmailIcon } from '../icons';
import useTranslation from '@/hooks/useTranslation';

// 定義 FormState 型別
interface FormState {
  name: string;
  email: string;
  message: string;
}

// ContactForm component
const ContactForm: FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  // Reset error when component mounts
  useEffect(() => {
    setSubmitError(null);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = t('name_required');
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = t('email_required');
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = t('email_invalid');
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = t('message_required');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    if (!turnstileToken) {
      setSubmitError('請先通過驗證碼');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
          company: honeypot,
        }),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTurnstileToken('');
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        const data = await res.json();
        setSubmitError(data.error || '傳送訊息失敗，請稍後再試。');
      }
    } catch {
      setSubmitError('傳送訊息失敗，請確認網絡連線正常。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <h3 className="text-xl font-bold mb-4 font-[var(--font-space-grotesk)]">
        {t('contact_title')}
      </h3>

      {submitSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Alert severity="success">{t('success_message')}</Alert>
        </motion.div>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* 蜜罐欄位，防止機器人 */}
          <input
            type="text"
            name="company"
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
            autoComplete="off"
            tabIndex={-1}
            style={{ display: 'none' }}
            aria-hidden="true"
          />
          {/* Cloudflare Turnstile 驗證元件 */}
          <Turnstile
            sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
            onSuccess={(token: string) => setTurnstileToken(token)}
            className="my-2 self-center"
          />

          {submitError && (
            <div className="mb-2">
              <Alert severity="error">{submitError}</Alert>
            </div>
          )}

          <Input
            id="name"
            name="name"
            label={t('name')}
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            fullWidth
            startIcon={<PersonIcon className="w-5 h-5" />}
            required
          />

          <Input
            id="email"
            name="email"
            type="email"
            label={t('email')}
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            fullWidth
            startIcon={<EmailIcon className="w-5 h-5" />}
            required
          />

          <TextArea
            id="message"
            name="message"
            label={t('message')}
            rows={4}
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
            fullWidth
            required
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="secondary"
              disabled={isSubmitting || !turnstileToken}
              className="w-full"
            >
              {isSubmitting ? t('sending') : t('send')}
            </Button>
          </div>
        </motion.form>
      )}
    </motion.div>
  );
};

export default ContactForm;
