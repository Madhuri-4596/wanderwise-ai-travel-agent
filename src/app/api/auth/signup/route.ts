import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// In-memory user storage (for demo - use database in production)
export const users: { id: string; name: string; email: string; password: string }[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@luno.com',
    password: '$2a$10$rQ5y0KvPYLLI2kGf8LKFhOKvYJ7Xv.cJp0QBZ4YFvW6YfZ9EJ5K0e', // "password123"
  },
];

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password: hashedPassword,
    };

    users.push(newUser);

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
