"use client";
import { successToast } from "@/lib/toastify";
import { useAppDispatch } from "@/redux/store";
import { deleteNotes } from "@/redux/thunks/note.thunk";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(
      deleteNotes({
        id: id as string,
        callback: () => {
          successToast("Note deleted successfully");
          router.push("/");
        },
      })
    );
  }, []);

  return <div></div>;
};

export default page;
