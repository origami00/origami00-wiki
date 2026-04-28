import { useNavigate } from "react-router-dom";
import { useClock } from "../hooks/useClock";
import ProfileCard from "../components/ProfileCard";
import CatCard from "../components/CatCard";

import SocialLinks from "../components/SocialLinks";
import ClockCard from "../components/ClockCard";
import LatestContent from "../components/LatestContent";
import MusicPlayer from "../components/MusicPlayer";

export default function HomePage() {
  const navigate = useNavigate();
  const { greeting } = useClock();

  return (
    <div className="masonryColumns">
      <div className="cardStagger" style={{ animationDelay: "0s" }}>
        <ProfileCard greeting={greeting} />
      </div>
      <div className="cardStagger" style={{ animationDelay: "0.06s" }}>
        <CatCard onOpen={() => navigate("/photo-wall")} />
      </div>
      <div className="cardStagger" style={{ animationDelay: "0.12s" }}>
        <SocialLinks />
      </div>
      <div className="cardStagger" style={{ animationDelay: "0.18s" }}>
        <ClockCard />
      </div>
      <div className="cardStagger" style={{ animationDelay: "0.24s" }}>
        <LatestContent />
      </div>
      <div className="cardStagger" style={{ animationDelay: "0.3s" }}>
        <MusicPlayer />
      </div>
    </div>
  );
}
