import { createResource } from "@/lib/actions/resources";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { content } = await req.json();

    const response = await createResource({ content });

    return NextResponse.json(
        {
            data: response
        }
    );
}