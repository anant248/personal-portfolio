export default function TravelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ overflow: "hidden", height: "100vh", position: "relative" }}>
      {children}
    </div>
  );
}
