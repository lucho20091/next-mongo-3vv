import { redirect } from 'next/navigation'
import connectMongoDB from '@/libs/database'
import Topic from '@/models/topic'

async function addTopic(formData) {
    'use server'
    
    const title = formData.get('title')
    const description = formData.get('description')

    if (!title || !description) {
        throw new Error('Title and description are required')
    }

    try {
       await connectMongoDB();
       await Topic.create({ title, description });
    } catch (error) {
        throw new Error('Error adding topic: ' + error.message)
    }
    redirect('/')
}

export default function AddTopic() {
    return (
        <div>
            <form action={addTopic} className="flex flex-col gap-2">
                <input 
                    type="text" 
                    name="title" 
                    className="border border-slate-500 px-8 py-2" 
                    placeholder="Topic Title" 
                    required
                />
                <input 
                    type="text" 
                    name="description" 
                    className="border border-slate-500 px-8 py-2" 
                    placeholder="Topic Description" 
                    required
                />
                <button 
                    type="submit" 
                    className="bg-green-600 text-white px-4 py-2 rounded-md"
                >
                    Add Topic
                </button>
            </form>
        </div>
    )
}
