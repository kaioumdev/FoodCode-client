/* eslint-disable react/prop-types */
const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="w-10/12 md:w-4/12 mx-auto text-center my-6 md:my-8">
      <p className="text-yellow-600 mb-1 md:mb-2 text-sm md:text-base">-------- {subHeading} --------</p>
      <h3 className="border-y-2 md:border-y-4 py-3 md:py-4 text-xl md:text-3xl uppercase">
        {heading}
      </h3>
    </div>
  );
};

export default SectionTitle;
