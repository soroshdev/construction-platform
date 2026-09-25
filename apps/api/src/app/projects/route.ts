import { prisma } from "@construction/db";
import { createProjectSchema } from "@construction/validation";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = createProjectSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "ValidationError",
        message: "Request body is invalid",
        issues: validation.error.issues,
      },
      { status: 400, headers: corsHeaders },
    );
  }

  try {
    const newProject = await prisma.project.create({
      data: {
        ...validation.data,
        parcelId: String(validation.data.parcelId),
      },
    });

    return NextResponse.json(
      { data: newProject },
      { status: 201, headers: corsHeaders },
    );
  } catch (error) {
    console.error("Failed to create project", error);

    return NextResponse.json(
      {
        error: "DatabaseError",
        message: "Project could not be saved",
      },
      { status: 500, headers: corsHeaders },
    );
  }
}

// export async function POST(request: Request) {
//   let body: unknown;

//   try {
//     body = await request.json();
//   } catch {
//     return NextResponse.json(
//       {
//         error: "ValidationError",
//         message: "Request body must be valid JSON",
//       },
//       { status: 400, headers: corsHeaders },
//     );
//   }

//   const result = createProjectSchema.safeParse(body);

//   if (!result.success) {
//     return NextResponse.json(
//       {
//         error: "ValidationError",
//         message: "Request body is invalid",
//         issues: result.error.issues,
//       },
//       { status: 400, headers: corsHeaders },
//     );
//   }

//   try {
//     const project = await prisma.project.create({ data: result.data });

//     return NextResponse.json(
//       { data: project },
//       { status: 201, headers: corsHeaders },
//     );
//   } catch (error) {
//     console.error("Failed to create project", error);

//     return NextResponse.json(
//       {
//         error: "DatabaseError",
//         message: "Project could not be saved",
//       },
//       { status: 500, headers: corsHeaders },
//     );
//   }
// }
