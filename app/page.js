import Link from "next/link";
import { HiPencil } from "react-icons/hi";
import DeleteBtn from "@/components/DeleteBtn";
import connectMongoDB from "@/libs/database";
import Topic from "@/models/topic";

export const dynamic = 'force-dynamic';

export default async function Home() {
  async function getTopics(){
    try {
      await connectMongoDB();
      const topics = await Topic.find();
      return JSON.parse(JSON.stringify(topics));
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  }

  const topics = await getTopics();
  

  return (
    <div>
      <ul>
        {topics && topics?.map((topic) => (
          <div key={topic._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
            <div>
                <h2 className="font-bold text-2xl">{topic.title}</h2>
                <p>{topic.description}</p>    
            </div>
            <div className="flex gap-2">  
              <DeleteBtn id={topic._id} />
              <Link href={`/editTopic/${topic._id}`}>
                  <HiPencil size={24} />
              </Link> 
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

