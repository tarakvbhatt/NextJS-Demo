import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newProduct = await prisma.product.create({
    data: {
      name: body.name,
      price: parseFloat(body.price),
    },
  });

  return NextResponse.json(newProduct);
}