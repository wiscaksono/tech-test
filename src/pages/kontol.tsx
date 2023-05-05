import React from "react";
import { api } from "~/utils/api";

type Props = {};

function kontol({}: Props) {
  const { data, isLoading } = api.lesson.getAll.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {data?.map((lesson) => (
        <div key={lesson.id} className="p-4">
          {lesson.title}
        </div>
      ))}
    </div>
  );
}

export default kontol;
