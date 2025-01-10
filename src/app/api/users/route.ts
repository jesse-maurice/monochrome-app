import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Handle GET request for users
    return NextResponse.json({ message: "Users retrieved" });
  } catch (error) {
    return NextResponse.json(
      { error: `Error fetching users: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    // Handle POST request for creating user
    return NextResponse.json({ message: "User created" });
  } catch (error) {
    return NextResponse.json(
      { error: `Error creating user: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
