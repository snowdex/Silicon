import Header from "../components/Header";
import RevealText from "../components/CoolStuff/RevealText"

function Home() {
  return (
    <div className="bg-[#efecdf] h-screen grid grid-rows-[auto_1fr] gap-10">
      <div>
        <Header />
      </div>
      <div className="pt-32">
        <RevealText classname={"text-3xl text-[#3c3c3c] new-font"} stuff={[]} />
      </div>
    </div>
  );
}

export default Home;
