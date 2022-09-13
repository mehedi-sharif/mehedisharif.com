import Image from "next/dist/client/image";

const Devider = () => {
  return (
    <div className="relative h-px w-full bg-border dark:bg-darkmode-border">
      <div className="absolute left-1/2 -top-5 -translate-x-1/2 bg-white px-3 dark:bg-darkmode-body">
        <Image
          src="/images/icons/link.svg"
          height={56}
          width={56}
          alt="linkchain"
          className="dark:invert"
        />
      </div>
    </div>
  );
};

export default Devider;
