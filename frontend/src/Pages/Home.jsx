
import Header from '../components/Header'


function Home() {


  return (
    <div className='h-screen flex flex-col items-center gap-10'>
      <Header />
      <div className='bg-gradient-to-br from-[#E31C25] via-black to-[#0A3D91] min-h-screen w-full '>
        <div className='bg-white rounded-xl h-fit'>
          <h2>Attendance</h2>
        </div> 
      </div>
    </div>
  )
}

export default Home
