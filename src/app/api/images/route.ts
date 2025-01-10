import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import { join } from 'path';

import images from '../../../data/images.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tags = searchParams.get("tags")?.split(",");

  if (tags) {
    const filteredImages = images.filter((img) =>
      tags.some((tag) => img.tag.includes(tag))
    );
    return NextResponse.json(filteredImages);
  }

  return NextResponse.json(images);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;
    const tags = formData.get("tags")?.toString().split(",") || [];
    const camera = formData.get("camera") as string;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save image
    const fileName = `Image ${images.length + 1}.webp`;
    const uploadDir = join(process.cwd(), "public/images");
    await writeFile(join(uploadDir, fileName), buffer);

    // Update images.json
    const newImage = {
      id: images.length + 1,
      src: `/images/${fileName}`,
      tag: tags as string[],
      description: "",
      dimensions: "",
      aspectRatio: "",
      camera: camera || "iPhone 11 Pro",
      focal: "",
      aperture: "",
      ISO: "",
      shutterSpeed: "",
      takenAt: "",
    };

    images.push(newImage);
    await writeFile(
      join(process.cwd(), "data/images.json"),
      JSON.stringify(images, null, 2)
    );

    return NextResponse.json({
      message: "Image uploaded successfully",
      image: newImage,
    });
  } catch (error) {
    return NextResponse.json({ error: `Upload failed: ${(error as Error).message}` }, { status: 500 });
  }
}
