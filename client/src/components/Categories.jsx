import { categories } from "../data/products";

function Categories() {
<<<<<<< HEAD

return (

<section className="px-[5%] py-20 bg-[#1E1B1B]">

<div className="text-center mb-14">

<p className="text-[#D98C95] mb-2">
Explore Collection ✨
</p>

<h2 className="text-5xl text-[#F7F3F0]">
Shop by Category
</h2>

</div>


<div
className="
grid
grid-cols-2
md:grid-cols-2
lg:grid-cols-4
gap-6"
>

{categories.map((item)=>(

<div
key={item.id}

className="
bg-[#2A2525]
rounded-[25px]
p-5
text-center
cursor-pointer
hover:-translate-y-2
hover:scale-[1.03]
hover:shadow-2xl
transition
duration-300"
>

<div
className="
h-45
bg-gray-300
rounded-[18px]
mb-5
overflow-hidden"
>

</div>


<h3
className="
text-xl
text-[#F7F3F0]"
>

{item.name}

</h3>

<p className="text-[#B8B0AC] mt-2 text-sm">

Handmade collection

</p>

</div>

))}

</div>

</section>

);

=======
  return (
    <section className="px-[5%] py-12 sm:py-20 bg-[#1E1B1B]">
      
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-14">
        <p className="text-[#D98C95] mb-1 text-xs sm:text-sm tracking-wider uppercase">
          Explore Collection ✨
        </p>
        <h2 className="text-3xl sm:text-5xl text-[#F7F3F0] font-bold">
          Shop by Category
        </h2>
      </div>

      {/* Grid Wrapper - Responsive Gap Adjustments */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((item) => (
          <div
            key={item.id}
            className="bg-[#2A2525] rounded-[20px] sm:rounded-[25px] p-3 sm:p-5 text-center cursor-pointer hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-2xl transition duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Aspect Ratio block keeps the card sizing completely uniform */}
              <div className="w-full aspect-[4/5] bg-gray-300 rounded-[14px] sm:rounded-[18px] mb-3 sm:mb-5 overflow-hidden" />
              
              <h3 className="text-sm sm:text-xl text-[#F7F3F0] font-medium line-clamp-1">
                {item.name}
              </h3>
            </div>
            
            <p className="text-[#B8B0AC] mt-1 sm:mt-2 text-[11px] sm:text-sm">
              Handmade collection
            </p>
          </div>
        ))}
      </div>
      
    </section>
  );
>>>>>>> origin/charu-homepage
}

export default Categories;