'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TextField,
  Alert,
  Typography,
  Box,
  InputAdornment,
} from '@mui/material';
import Button from '../Button';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import useTranslation from '@/hooks/useTranslation';

interface FormState {
  name: string;
  email: string;
  message: string;
}

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('name_required');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('email_required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('email_invalid');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('message_required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success state
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
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
    >
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontFamily: 'var(--font-space-grotesk)',
          fontWeight: 'bold',
        }}
      >
        {t('contact_title')}
      </Typography>

      {submitSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Alert
            severity="success"
            sx={{ bgcolor: 'success.main', color: 'white', opacity: 0.9 }}
          >
            {t('success_message')}
          </Alert>
        </motion.div>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            fullWidth
            id="name"
            name="name"
            label={t('name')}
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            id="email"
            name="email"
            label={t('email')}
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            id="message"
            name="message"
            label={t('message')}
            multiline
            rows={4}
            variant="outlined"
            value={formData.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MessageIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="secondary"
            disabled={isSubmitting}
            sx={{ width: '100%' }}
          >
            {isSubmitting ? t('sending') : t('send')}
          </Button>
        </Box>
      )}
    </motion.div>
  );
};

export default ContactForm;
