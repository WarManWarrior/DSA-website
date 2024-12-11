import Navbar from "../page_components/navbar"
import Banner from "../page_components/home_main"
function Home() {

  return (
    <div className="bg-[url('https://virtutal-daa-lab.netlify.app/imgs/headerImg.png')] bg-cover h-screen bg-top">
  <Navbar />
  <Banner/>
</div>

  )
};


export default Home