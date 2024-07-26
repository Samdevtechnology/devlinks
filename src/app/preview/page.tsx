import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Preview = () => {
  return (
    <div>
      <div className="bg-primary w-full h-[30vh] top-0 hidden sm:flex absolute rounded-b-[32px] -z-10"></div>
      <Container className="pt-4 flex flex-col h-screen">
        <div className="flex justify-between items-center gap-4 sm:bg-white rounded-xl py-2 sm:px-4 ">
          <div className="w-full sm:w-fit">
            <Link href="\">
              <Button size="lg" variant="secondary">
                Back to Editor
              </Button>
            </Link>
          </div>
          <div className="w-full sm:w-fit">
            <Button size="lg">Share Link</Button>
          </div>
        </div>

        <div className="flex flex-col h-full justify-center items-center">
          <div className="flex flex-col bg-white rounded-3xl justify-center items-center">
            <div className="flex flex-col  justify-center items-center p-4">
              <Avatar className="w-24 h-24 border-4 border-primary">
                <AvatarImage src="https://s3-alpha-sig.figma.com/img/f406/612e/3820ced4aec053cac74a5bc768f6929d?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LLJ2~i-e9VW1Lyc8H8WDFRJEcYdn~PP0Mh-PbnfKkJb1bNrsjpE~ebyqfTD5Wt-I-0aefk0fagNH8iSEtdB-PPvNbBVQizkwJXwZA~rlosw8l8W~tPW5GpQPe9cYRLtv4PJyIRqE1N7v2p~Ait9IidLsQ01QKPy80~nXLA6cGpS2s7ZMC6vS~zVawcwroRChwuDnmMsaC~nrcD8lOyRkRkF7WaHG0utZobyFQMSrtI4IOfNCn5BWh6sJU18-2ZlEf1GzFdnFTSQfVmDPhQ-1bC4UXNqaLrQx0k5GGN3XxKTNYHkFAaeGECVwAT-Gv1x9~qJrwgZPwV2cCs0dhZue8Q__" />
                <AvatarFallback></AvatarFallback>
              </Avatar>

              <h3 className="font-bold text-2xl my-2">Ben Wright</h3>

              <p className="text-grey-light">ben@example.com</p>
            </div>
            <div>links</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Preview;
