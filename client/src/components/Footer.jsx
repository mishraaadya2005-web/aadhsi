function Footer() {
  return (

<footer className="bg-[#151313] px-[5%] py-16 text-[#F7F3F0] border-t border-[#2A2525]">

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

{/* Brand */}

<div>

<p className="text-[#D98C95] mb-2">
Made with love ✨
</p>

<h2 className="text-4xl mb-4">
AADSHI
</h2>

<p className="text-[#B8B0AC] leading-7">
Handmade gifts crafted with warmth,
creativity and personalized moments.
</p>

</div>


{/* Shop */}

<div>

<h3 className="text-xl mb-5">
Shop
</h3>

<ul className="space-y-3 text-[#B8B0AC]">

<li className="hover:text-[#D98C95] cursor-pointer">
Crochet Bouquets
</li>

<li className="hover:text-[#D98C95] cursor-pointer">
Keychains
</li>

<li className="hover:text-[#D98C95] cursor-pointer">
Gift Combos
</li>

<li className="hover:text-[#D98C95] cursor-pointer">
Custom Gifts
</li>

</ul>

</div>


{/* Links */}

<div>

<h3 className="text-xl mb-5">
Quick Links
</h3>

<ul className="space-y-3 text-[#B8B0AC]">

<li className="hover:text-[#D98C95] cursor-pointer">
Home
</li>

<li className="hover:text-[#D98C95] cursor-pointer">
Shop
</li>

<li className="hover:text-[#D98C95] cursor-pointer">
Cart
</li>

<li className="hover:text-[#D98C95] cursor-pointer">
Contact
</li>

</ul>

</div>


{/* Subscribe */}

<div>

<h3 className="text-xl mb-5">
Stay Connected
</h3>

<div className="bg-[#2A2525] rounded-full p-2 flex">

<input
type="email"
placeholder="Enter email"
className="
bg-transparent
flex-1
outline-none
px-4
text-white"
/>

<button
className="
bg-[#D98C95]
px-6
py-3
rounded-full
hover:bg-[#c57781]
transition"
>

Join

</button>

</div>

</div>

</div>


<hr className="my-10 border-[#2A2525]"/>

<p className="text-center text-[#8A8481]">

© 2026 AADSHI • Handmade with love 🌸

</p>

</footer>

  );
}

export default Footer;