import { SignIn } from "@clerk/nextjs";
import Header from "../../../_components/Header";
import Footer from "../../../_components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <section>
        <div className="relative flex items-center justify-center min-h-screen bg-teal-600 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg
              className="absolute bottom-0 w-full"
              viewBox="0 0 1000 320"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFFFFF"
                d="M0,160L48,170.7C96,181,192,203,288,186.7C384,171,480,117,576,112C672,107,768,149,864,170.7C960,192,1056,192,1152,192C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </svg>
          </div>
          <div className="relative">
            <SignIn  />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
