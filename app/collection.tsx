import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Dresses", image: "/images/bag2.jpg", link: "/collection/dresses" },
  { name: "Accessories", image: "/images/punjabi.jpg", link: "/collection/accessories" },
  { name: "Shoes", image: "/images/katan1.jpg", link: "/collection/shoes" },
  { name: "Bags", image: "/images/jama.jpg", link: "/collection/bags" },
];

export default function Collection() {
  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-pink-400">Explore Our Collections</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.name} href={category.link} className="group relative block rounded-lg overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              width={300}
              height={200}
              className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <p className="text-white font-bold text-lg">{category.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
