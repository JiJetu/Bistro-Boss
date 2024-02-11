
const SectionHeading = ({heading, subHeading, style}) => {
    return (
        <div className="md:w-4/12 text-center mx-auto my-20">
            <p className="text-[#D99904] mb-2">---{subHeading}---</p>
            <h3 className={style ? "py-4 border-y-4 text-3xl uppercase text-white" : "py-4 border-y-4 text-3xl uppercase"}>{heading}</h3>
        </div>
    );
};

export default SectionHeading;