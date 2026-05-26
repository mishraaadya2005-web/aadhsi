import { featuredProducts } from "../data/products";

function FeaturedProducts() {

return (

<section className="px-[5%] py-20 bg-[#1E1B1B]">

<div className="text-center mb-14">

<p className="text-[#D98C95] mb-2">
Trending Picks ✨
</p>

<h2 className="text-5xl text-[#F7F3F0]">
Featured Products
</h2>

</div>


<div
className="
grid
grid-cols-2
md:grid-cols-3
lg:grid-cols-4
xl:grid-cols-5
gap-6"
>

{featuredProducts.map((product)=>(

<div
key={product.id}

className="
bg-[#2A2525]
rounded-[25px]
p-4
cursor-pointer
hover:-translate-y-2
hover:scale-[1.03]
hover:shadow-2xl
transition
duration-300"
>

<img
src={product.image}
alt={product.name}

className="
h-45
w-full
object-cover
rounded-[18px]
mb-4"
/>

<h3
className="
text-lg
text-[#F7F3F0]"
>

{product.name}

</h3>


<p
className="
text-[#D98C95]
mt-2"
>

{product.price}

</p>


<button
className="
w-full
mt-5
bg-[#D98C95]
text-white
py-3
rounded-full
hover:bg-[#c57781]
transition"
>

Add to Cart

</button>

</div>

))}

</div>

</section>

);

}

export default FeaturedProducts;