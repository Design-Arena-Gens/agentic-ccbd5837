import { NextResponse } from "next/server";
import { SocialVideoAgent } from "@/lib/social/agent";
import { parseVideoFormData } from "@/lib/form";

export const runtime = "nodejs";
export const maxDuration = 300;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const parsed = await parseVideoFormData(formData);

    const agent = new SocialVideoAgent();

    const results = await agent.execute({
      video: parsed.buffer,
      fileName: parsed.fileName,
      mimeType: parsed.mimeType,
      platforms: parsed.platforms,
      context: {
        title: parsed.title,
        description: parsed.description,
        tags: parsed.tags,
        scheduledAt: parsed.scheduledAt,
      },
    });

    return NextResponse.json({ success: true, results });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error occurred";
    console.error(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 },
    );
  }
}
