// In-memory user storage (for demo - use database in production)
export const users: { id: string; name: string; email: string; password: string }[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@luno.com',
    password: '$2a$10$rQ5y0KvPYLLI2kGf8LKFhOKvYJ7Xv.cJp0QBZ4YFvW6YfZ9EJ5K0e', // "password123"
  },
];
