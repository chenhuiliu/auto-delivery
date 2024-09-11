import { NextResponse } from 'next/server';
export async function GET(request, response) {


  // eslint-disable-next-line no-promise-executor-return
  // await createUser(email, password, username)
  //   .then(user => {
  //     response.status(201).json(user);
  //   })
  //   .catch(error => {
  //     response.status(500).json({ error: error.message });
  //   });

  return NextResponse.json({
    a: 1
  });
}
