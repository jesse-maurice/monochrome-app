import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '../../lib/prisma';

// Email validation schema
const emailSchema = z.string().email();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    // Validate email
    try {
      emailSchema.parse(email);
    } catch (error: unknown) {
      console.error("Invalid email format:", error);
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (no need to assign to a variable)
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
