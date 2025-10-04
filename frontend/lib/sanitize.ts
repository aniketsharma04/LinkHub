/**
 * Input sanitization utilities for security
 */

export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') return '';
  
  return email
    .toLowerCase()
    .trim()
    .replace(/[^\w@.-]/g, ''); // Only allow word chars, @, ., and -
}

export function sanitizeUsername(username: string): string {
  if (typeof username !== 'string') return '';
  
  return username
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_]/g, ''); // Only allow lowercase letters, numbers, and underscores
}

export function sanitizeUrl(url: string): string {
  if (typeof url !== 'string') return '';
  
  // Only allow HTTP and HTTPS protocols
  if (!url.match(/^https?:\/\//)) {
    return '';
  }
  
  return url.trim();
}

export function sanitizeHtml(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export function validateObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}