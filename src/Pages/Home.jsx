import BannerSection from "../Components/BannerSection";
import FAQ from "../Components/FAQ";


const Home = () => {
    return (
        <div className=" py-24 ">
            <div >
                <BannerSection></BannerSection>
            </div>
            <div>
                <FAQ></FAQ>
            </div>
        </div>
    );
};

export default Home;