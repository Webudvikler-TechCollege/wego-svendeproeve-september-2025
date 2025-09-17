import footerBG from '../../assets/footerBG.svg';

export const Footer = () => {


    return (
        <footer
            className="relative min-h-[150px] sm:min-h-[180px] md:min-h-[220px] md:mt-[-220px] sm:mt-[-180px] mt-[-150px]"

        >
            <img
                src={footerBG}
                alt="Footer background"
                className="absolute w-full h-full object-cover z-10"
            />
            
            <div className="absolute bottom-2 left-4 flex flex-col  justify-end p-4 z-20">
                <p className="text-white text-sm md:text-base font-medium">
                    © 2025 WeGo ApS
                </p>
                <p className="text-white text-sm md:text-base font-medium">
                    Fartstræde 12c, 2. sal, 9000 Aalborg 
                </p>
            </div>
        </footer>
    );
};