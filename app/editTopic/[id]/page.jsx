import { redirect } from "next/navigation";
import connectMongoDB from "@/libs/database";
import Topic from "@/models/topic";
export default async function EditTopic({ params }) {
    const { id } = await params;
    async function getTopic(){
        await connectMongoDB();
        const topic = await Topic.findById(id);
        return JSON.parse(JSON.stringify(topic));
    }

    async function editTopic(formData){
        'use server'
        const title = formData.get('title')
        const description = formData.get('description')
        try {
           await connectMongoDB();
           await Topic.findByIdAndUpdate(id, { title, description });
        } catch (error) {
            console.log(error)
        }
        redirect('/')
    }

    const topic = await getTopic();
    
    return (
        <div>
            {topic && <form action={editTopic} className="flex flex-col gap-2">
                <input type="text" name="title" defaultValue={topic.title} className="border border-slate-500 px-8 py-2" placeholder="Topic Title" />
                <input type="text" name="description" defaultValue={topic.description} className="border border-slate-500 px-8 py-2" placeholder="Topic Description" />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md">Edit Topic</button>
            </form>}
        </div>
    )
}
