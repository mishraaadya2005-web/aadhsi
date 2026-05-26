function Reviews() {

const reviews = [

{
name:"Priya ✨",
text:"The bouquet looked even prettier in real life 😭💕 I kept staring at it for like 10 minutes."
},

{
name:"Ananya 🌷",
text:"The packaging was sooo cute. I genuinely didn't want to open it."
},

{
name:"Riya 💌",
text:"Bought it for my best friend and she literally thought I got it from some expensive store."
},

{
name:"Sneha 🌸",
text:"The crochet flowers are tiny but the detailing is insane."
},

{
name:"Ishita 🎀",
text:"I customized mine and it felt more personal than regular gifts."
},

{
name:"Manya 🤍",
text:"Actually obsessed with how aesthetic everything looked."
}

];

return(

<section
className="
py-24
bg-[#1E1B1B]
overflow-hidden"
>

<div className="text-center mb-14">

<p className="text-[#D98C95] mb-2">

Loved by Customers ✨

</p>

<h2
className="
text-5xl
text-[#F7F3F0]"
>

Moments People Shared

</h2>

</div>


<div className="relative">

<div
className="
flex
animate-scroll
gap-8
w-max"
>

{[...reviews,...reviews].map((review,index)=>(

<div
key={index}

className="
min-w-[380px]
bg-[#2A2525]
p-8
rounded-[30px]
border
border-[#3A3333]
hover:-translate-y-2
hover:shadow-2xl
transition"
>

<div className="flex mb-5">

{"⭐".repeat(5)}

</div>

<p
className="
text-[#B8B0AC]
leading-8
mb-6"
>

"{review.text}"

</p>

<div className="flex items-center gap-4">

<div
className="
w-12
h-12
rounded-full
bg-[#D98C95]
flex
items-center
justify-center
text-white"
>

{review.name[0]}

</div>

<h3 className="text-[#F7F3F0]">

{review.name}

</h3>

</div>

</div>

))}

</div>

</div>

</section>

)

}

export default Reviews;