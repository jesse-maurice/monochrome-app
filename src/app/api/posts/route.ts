import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Optional: Get query parameters
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    // Your database logic here
    return NextResponse.json({
      message: "Posts retrieved",
      page,
      limit,
    });
  } catch (_error) {
    return NextResponse.json(
      { error: `Error fetching posts: ${(_error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, userId } = body;

    // Validate request body
    if (!title || !content || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Your database logic here
    return NextResponse.json({
      message: "Post created",
      post: { title, content, userId },
    });
  } catch (_error) {
    return NextResponse.json(
      { error: `Error creating post: ${(_error as Error).message}` },
      { status: 500 }
    );
  }
}
