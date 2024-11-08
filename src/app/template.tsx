import TopBar from "../components/navbar/TopBar";
import { NextUIProvider } from "@nextui-org/react";

export default function Template({ children }: { children: React.ReactNode }) {
    return <div>
        <NextUIProvider>
            <main className='container'></main>
            {children}
        </NextUIProvider>
    </div>
  }