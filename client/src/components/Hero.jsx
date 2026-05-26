function Hero() {
  return (

<section
className="
bg-[#1E1B1B]
min-h-screen
px-[5%]
py-20
flex
flex-col
md:flex-row
items-center
justify-between
gap-16"
>

{/* Left Side */}

<div className="max-w-xl">

<p className="text-[#D98C95] text-lg mb-4">

Handmade with love ✨

</p>


<h1
className="
text-6xl
md:text-8xl
leading-none
text-[#F7F3F0]
mb-6"
>

Personalized
Gifts Made
Just For You

</h1>


<p
className="
text-[#B8B0AC]
text-lg
leading-9"
>

Crochet bouquets, customized gifts,
keychains and handcrafted surprises
designed for every special moment.

</p>


<div className="flex gap-5 mt-10">

<button
className="
bg-[#D98C95]
px-8
py-4
rounded-full
text-white
hover:scale-105
hover:bg-[#c57781]
transition"
>

Shop Now

</button>


<button
className="
border
border-[#D98C95]
text-[#F7F3F0]
px-8
py-4
rounded-full
hover:bg-[#D98C95]
transition"
>

Customize Gift

</button>

</div>

</div>


{/* Right Side */}

<div
className="
bg-[#2A2525]
p-6
rounded-[40px]
shadow-2xl
relative"
>

<div
className="
absolute
w-62.5
h-62.5
bg-[#D98C95]
opacity-20
blur-[120px]
top-10
left-10"
>
</div>

<img
src="/hero-bouquet.png"
alt="Bouquet"

className="
relative
z-10
w-87.5
md:w-112.5
rounded-[30px]
hover:scale-105
transition
duration-500"
/>

</div>

</section>

  );
}

export default Hero;