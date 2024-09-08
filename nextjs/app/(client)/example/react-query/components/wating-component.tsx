"use client";

import { useQuery } from "@tanstack/react-query";
import { http } from "src/request/https";

function useWaitQuery(props: { wait: number }) {
  const query = useQuery({
    queryKey: ["wait", props.wait],
    queryFn: async () => {
      const res = await http.get(`/api/example?wait=${props.wait}`);
      return res?.data;
    },
  });

  return query;
}
export default function WaitingComponent(props: { wait: number }) {
  const { data } = useWaitQuery(props);

  return <li>result: {data}</li>;
}
