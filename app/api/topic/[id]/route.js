import connectMongoDB from "@/libs/database";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        console.log(id);
        await connectMongoDB();
        await Topic.findByIdAndDelete(id);
        return NextResponse.json({ message: "Topic deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete topic" }, { status: 500 });
    }
}
