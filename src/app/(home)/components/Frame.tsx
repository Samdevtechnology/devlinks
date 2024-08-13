import BrandedLinks from "@/components/common/BrandedLinks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLinkStore } from "@/stores/linkStore";
import Image from "next/image";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PreviewFrame = () => {
  const { links } = useLinkStore();
  return (
    <div className="w-full h-fit bg-white rounded-xl ml-8 lg:ml-12 mt-6 sticky top-0">
      <div className="w-full flex justify-center items-center py-6 ">
        <div className="w-[16rem] relative">
          <Image
            src="/assets/image/preview-frame.png"
            alt="preview frame"
            className=""
            width={256}
            height={288}
          />
          <div className="absolute inset-0 overflow-hidden m-4 px-4 flex items-start justify-center ">
            <div className="flex flex-col w-full justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <Avatar className="w-24 h-24 mt-10 border-4 border-primary">
                  <AvatarImage src="https://s3-alpha-sig.figma.com/img/f406/612e/3820ced4aec053cac74a5bc768f6929d?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LLJ2~i-e9VW1Lyc8H8WDFRJEcYdn~PP0Mh-PbnfKkJb1bNrsjpE~ebyqfTD5Wt-I-0aefk0fagNH8iSEtdB-PPvNbBVQizkwJXwZA~rlosw8l8W~tPW5GpQPe9cYRLtv4PJyIRqE1N7v2p~Ait9IidLsQ01QKPy80~nXLA6cGpS2s7ZMC6vS~zVawcwroRChwuDnmMsaC~nrcD8lOyRkRkF7WaHG0utZobyFQMSrtI4IOfNCn5BWh6sJU18-2ZlEf1GzFdnFTSQfVmDPhQ-1bC4UXNqaLrQx0k5GGN3XxKTNYHkFAaeGECVwAT-Gv1x9~qJrwgZPwV2cCs0dhZue8Q__" />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <h3 className="font-semibold w-full text-lg my-2">
                  <Skeleton />
                </h3>

                <p className="text-grey w-full">
                  <Skeleton height={6} />
                </p>
              </div>
              <div className="link mt-8 max-h-[264px] w-full overflow-y-auto no-scrollbar">
                <ul>
                  {Array.from({ length: Math.max(links.length, 4) }).map(
                    (_, index) => {
                      const link = links[index];
                      if (link) {
                        return <BrandedLinks key={link.id} name={link.type} />;
                      } else {
                        return (
                          <Skeleton
                            className="mb-2 w-full"
                            height={40}
                            key={`skeleton-${index}`}
                          />
                        );
                      }
                    }
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewFrame;
