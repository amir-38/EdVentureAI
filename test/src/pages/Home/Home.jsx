import "./HomeStyle.css"
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <><div className="section">

      <h1>Gələcək Karyeranız üçün <br></br>Ağıllı Bələdçi</h1>
      <p className="header">Süni İntellektin köməyi ilə sənə<br/> uygun olan ixtisası öyrən. </p>
      <div className="button">
        <Link to="/start">
          <button className="glow-on-hover"> Başla</button>
        </Link>
      </div>
    </div>
      
    </>
  );
}

export default HomePage;
