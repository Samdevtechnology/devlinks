import Image from "next/image";

const Emptylist = () => {
  return (
    <div className="bg-grey-light rounded-xl px-5 py-12 flex flex-col justify-center items-center text-center">
      <div>
        <Image
          src="/assets/image/upload.png"
          alt="upload"
          width={150}
          height={90}
        />
      </div>
      <div className="mt-6 sm:mt-10 text-center">
        <h3 className="font-bold text-2xl sm:text-2xl">
          Let’s get you started
        </h3>
        <p className="text-grey">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We’re here to help you share
          your profiles with everyone!
        </p>
      </div>
    </div>
  );
};

export default Emptylist;
