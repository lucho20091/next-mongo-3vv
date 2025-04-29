"use client"
import { HiOutlineTrash } from "react-icons/hi";
import { redirect } from "next/navigation";

export default function DeleteBtn({ id }) {
    async function deleteTopic(id){
        if (window.confirm("Are you sure you want to delete this topic?")) {
            try {
                const res = await fetch(`/api/topic/${id}`, {
                    method: "DELETE",
          });
          if (!res.ok) {
            throw new Error("Failed to delete topic");
          }
          console.log("Topic deleted successfully");

        } catch (error) {
          console.log(error);
        }
            redirect('/')
        }
    }
    return (
        <button className="text-red-400" onClick={() => deleteTopic(id)}>
            <HiOutlineTrash size={24} />
        </button>
    )
}
