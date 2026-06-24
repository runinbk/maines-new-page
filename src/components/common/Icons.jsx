
export const InstagramIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const FacebookIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const LinkedinIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const TikTokIcon = ({ className, ...props }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.01 1.62 4.2 1.25.04 2.51.04 3.76.04v3.82c-1.39-.02-2.78-.31-4.04-1-.14 2.87-.89 5.72-2.48 8.07-1.92 2.76-5.07 4.54-8.52 4.79-3.95.21-7.85-2.07-9.5-5.69-1.97-4.14-.95-9.33 2.44-12.33 2.78-2.44 6.78-2.91 10.05-1.28.02.82-.01 1.64.01 2.46-2.14-.88-4.66-.46-6.38 1.09-1.74 1.52-2.3 4.09-1.38 6.18.84 1.94 2.89 3.23 5.04 3.24 2.5.07 4.77-1.63 5.37-4.04.28-1.57.17-3.19.17-4.79 0-2.01 0-4.02 0-6.03z"/>
  </svg>
);
