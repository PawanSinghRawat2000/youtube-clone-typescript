import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { TiMicrophone } from "react-icons/ti";
import { BsYoutube, BsCameraVideo, BsBell } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoAppsSharp } from "react-icons/io5";
import  {Link,useLocation,useNavigate} from 'react-router-dom';
import { useAppDispatch,useAppSelector } from "../store/hooks";
import { clearVideos,clearSearchTerm,changeSearchTerm } from "../store";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";


const Navbar = () => {

  const location=useLocation();
  const navigate=useNavigate();
  const dispatch=useAppDispatch();
  const searchTerm=useAppSelector(state=>state.youtubeApp.searchTerm);

  const handleSearch=()=>{
    if(location.pathname!=='/search')navigate('/search');
    else {
      dispatch(clearVideos())
      dispatch(getSearchPageVideos(false));
    }
  }

  return (
    <div className="flex justify-between items-center px-14 h-14 bg-[#212121] opacity-95 sticky top-0 z-50">
        <div className="flex gap-8 items-center text-2xl">
            <div>
                <GiHamburgerMenu/>
            </div>
            <Link to='/' >
                <div className="flex gap-1 items-center justify-center">
                  <BsYoutube className="text-3xl text-red-600"/>
                  <span className="text-xl font-medium">YouTube</span>
                </div>
            </Link>
        </div>
        <div className="flex items-center gap-5 justify-center">
          <form onSubmit={
            e=>{
              e.preventDefault();
              handleSearch();
            }
          }>
            <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0">
              <div className="flex gap-4 items-center pr-5">
                <div>
                  <AiOutlineSearch className='text-xl'/>
                </div>
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={e=>dispatch(changeSearchTerm(e.target.value))}
                  className="w-96 bg-zinc-900 focus:outline-none border-none "
                  />
                <AiOutlineClose
                 className={`text-xl cursor-pointer
                    ${!searchTerm?"invisible":"visible"}
                 `}
                  onclick={()=>dispatch(clearSearchTerm())}
                 />
              </div>
              <button type="submit" className='h-10 w-16 flex items-center justify-center bg-zinc-800'>
                <AiOutlineSearch className='text-xl'/>
              </button>
            </div>
          </form>
          <div className="text-xl p-3 bg-zinc-900 rounded-full ">
            <TiMicrophone/>
          </div>
        </div>
        <div className="flex gap-5 items-center text-xl">
          <BsCameraVideo/>
          <IoAppsSharp/>
          <div className="relative">
            <BsBell/>
            <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">9+</span>
          </div>
          <img
          className="w-9 h-9 rounded-full"
           src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="logo" />
        </div>
    </div>
  )
}

export default Navbar