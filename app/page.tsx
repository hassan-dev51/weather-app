import Hero from "@/components/Hero";
// import WeatheData from "@/components/WeatheData";

export default function Home() {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="relative z-10 flex">
        <Hero />
        {/* <WeatheData />/ */}
      </div>
    </main>
  );
}
