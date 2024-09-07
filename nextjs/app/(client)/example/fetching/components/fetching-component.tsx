import { getExample } from 'app/server/example/action';

export default async function FetchingComponent() {
  const data = await getExample();

  return (
    <>
      {data?.map((item: any) => {
        return (
          <div className="" key={item._id}>
            <h1>{item.title}</h1>
            <span>{item.description}</span>
          </div>
        );
      })}
    </>
  );
}
