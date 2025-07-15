import { createClient } from '@supabase/supabase-js'

// Use environment variables if available, otherwise fallback to hardcoded values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://eznbpoxfishlsawvnmio.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6bmJwb3hmaXNobHNhd3ZubWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwOTA2OTUsImV4cCI6MjA2NzY2NjY5NX0.F13tFPceDG3fovWMKC8P5hZOrcCoHTl90UuAuXjd0mU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type ContactFormData = {
  full_name: string
  email: string
  phone?: string | null
  event_type: string
  preferred_date?: string | null
  message: string
  created_at?: string
}

// Helper function to validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to sanitize input
export const sanitizeInput = (input: string): string => {
  // More thorough sanitization
  return input.trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};