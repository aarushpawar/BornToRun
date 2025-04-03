import "@/styles/globals.css";
import { GameProvider } from '../components/GameProvider';

export const metadata = {
  title: "Born to Run RPG",
  description: "An ultramarathon decision-making simulator",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
