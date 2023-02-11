import Feed from "./Feed";
import TrendingNav from "./TrendingNav"; 
import Sidebar from "./SidebarCopy";

export default function Home() {

  return ( 
    <Sidebar>
      <section>  
        <TrendingNav/>
        <Feed/>
      </section>
    </Sidebar>
  )
}
