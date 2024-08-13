import BannerSection from "../Components/BannerSection";
import FAQ from "../Components/FAQ";


const Home = () => {
    return (
        <div className="mt-14">
            <div>
                <BannerSection></BannerSection>
            </div>
            <div>
                <FAQ></FAQ>
            </div>
        </div>
    );
};

export default Home;