import { categories } from "../data/products";

function Categories() {
  return (
    <section className="px-[5%] py-20 bg-[#1E1B1B]">
      <div className="text-center mb-14">
        <p className="text-[#D98C95] mb-2">Explore Collection ✨</p>
        <h2 className="text-5xl text-[#F7F3F0]">Shop by Category</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((item) => (
          <div
            key={item.id}
            className="bg-[#2A2525] rounded-[25px] p-5 text-center cursor-pointer hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl transition duration-300"
          >
            <div className="h-45 bg-gray-300 rounded-[18px] mb-5 overflow-hidden" />
            <h3 className="text-xl text-[#F7F3F0]">{item.name}</h3>
            <p className="text-[#B8B0AC] mt-2 text-sm">Handmade collection</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;