import Link from "next/link";

export default function Home() {
  return (
    <div className="grid h-screen">
      <div className=" relative  row-start-1 col-start-1 row-end-2 col-end-3 overflow-hidden">
        <Link href="/characters">
          <div className="absolute w-full h-full bg-[url(/characters.jpg)] bg-cover grayscale brightness-50  hover:grayscale-0 hover:scale-[1.25] transition-[.6s] duration-[.6s] "></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[2rem] font-bold text-white">
            Characters
          </div>
        </Link>
      </div>
      <div className="relative row-start-2 col-start-1 row-end-3 col-end-2 overflow-hidden">
        <Link href="/locations">
          <div className="absolute w-full h-full bg-[url(/locations.jpg)] bg-cover grayscale brightness-50  hover:grayscale-0 hover:scale-[1.25] transition-[.6s] duration-[.6s] "></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[2rem] font-bold text-white">
            Locations
          </div>
        </Link>
      </div>
      <div className="relative  row-start-2 col-start-2 row-end-3 col-end-3 overflow-hidden">
        <Link href="/episodes">
          <div className="absolute w-full h-full bg-[url(/episodes.jpg)] bg-cover grayscale brightness-50  hover:grayscale-0 hover:scale-[1.25] transition-[.6s] duration-[.6s] "></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-[2rem] font-bold text-white">
            Episodes
          </div>
        </Link>
      </div>
    </div>
  );
}
