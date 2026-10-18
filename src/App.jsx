import BottleAlert from "./components/bottleAlert/bottleAlert"
import Navbar from "./components/navbar/navbar"
import FirstPage from "./components/landpage/firstPage"
import Introduction from "./components/landpage/introduction"
import Job from "./components/landpage/job"
import Story from "./components/landpage/story"
import EasterEgg from "./components/easterEgg/easterEgg"
import DisplayProject from "./components/projects/displayProject"
import Footer from "./components/footer/footer"

function App() {


  return (
    <>
     <Navbar />
     <Introduction/>
     <Story/>
     <Job />
     <DisplayProject/>
     <EasterEgg/>
      <BottleAlert />
      <Footer/>
    </>
  )
}

export default App
