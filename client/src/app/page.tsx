
import Footer from "../components/shared/Footer";
import Hero from "../components/shared/Hero";
import HowItWorks from "../components/shared/HowItWorks";
import TopDonors from "../components/shared/TopDonors";
import WhyDonate from "../components/shared/WhyDonate";

export default function Home() {
  return (
    <main>
      <Hero />
          <HowItWorks />
          <WhyDonate />
      
          <TopDonors/>
          <Footer />
    </main>
  );
}