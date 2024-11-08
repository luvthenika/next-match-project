import { getSession } from "./lib/statless-session";

export default async function Page() {
  console.log(await getSession());
  
  return (<p>Welcome!</p>)
}
