import "@/styles/globals.css";

export const metadata = {
  title: "Born to Run RPG",
  description: "An ultramarathon decision-making simulator based on Born to Run",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
