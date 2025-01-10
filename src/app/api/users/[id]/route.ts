import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Handle GET request for specific user
    return NextResponse.json({ message: `User ${params.id} retrieved` });
  } catch (error) {
    return NextResponse.json(
      { error: `Error fetching user: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    console.log(body);
    // Handle PUT request for updating user
    return NextResponse.json({ message: `User ${params.id} updated` });
  } catch (error) {
    return NextResponse.json(
      { error: `Error updating user: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Handle DELETE request for user
    return NextResponse.json({ message: `User ${params.id} deleted` });
  } catch (error) {
    return NextResponse.json(
      { error: `Error deleting user: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
