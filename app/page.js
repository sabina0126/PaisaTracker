import Image from "next/image";
import Header from "./_components/Header";
import Main from "./_components/Main";
import Features from "./_components/Features";
import About from "./_components/About";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <Features />
      <About />
      <Footer />
    </>
  );
}
