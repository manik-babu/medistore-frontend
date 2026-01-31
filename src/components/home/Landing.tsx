import Image from "next/image";
import sideImage from "../../../public/online-doctor-t.png"
import { Button } from "../ui/button";
import { CardDescription } from "../ui/card";
import Link from "next/link";
export default function HomeLandingPage() {
    return (
        <div className="w-screen h-screen grid grid-cols-2 gap-20 content-center px-[5vw]">
            <section className="flex flex-col gap-4 justify-center">
                <h1 className="text-5xl font-bold">Your Trusted Online Medicine Shop</h1>
                <CardDescription className="tracking-wider leading-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur sequi accusamus illum, quidem possimus dolor eaque rem placeat illo fugit libero tempore dolorum labore dicta suscipit architecto sit inventore molestias!</CardDescription>
                <Link href={'/shop'}><Button className="w-fit cursor-pointer">Shop now</Button></Link>
            </section>
            <section >
                <div className="flex justify-center items-center overflow-clip">
                    <Image src={sideImage} alt="Image" className="h-full" id="landing-image" />
                </div>
            </section>
        </div>
    );
}