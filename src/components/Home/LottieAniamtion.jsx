import Lottie from "lottie-react";
import animationData from "/src/assets/lotties/Animation.json";

const LottieAnimation = () => {
  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default LottieAnimation;
