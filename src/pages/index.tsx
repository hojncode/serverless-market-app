import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <form className="flex flex-col space-y-2  p-5 ">
      <input
        type="text"
        required
        placeholder="Username"
        className="peer rounded-md border border-gray-400 p-1 "
      />
      <span className="hidden peer-invalid:block peer-invalid:text-red-500">
        This input is invalid
      </span>
      <span className="hidden peer-valid:block peer-valid:text-teal-500">
        Awesome username
      </span>
      <span className="hidden peer-hover:block peer-hover:text-amber-500">
        Hello
      </span>
      <input type="submit" value="Login" className="bg-white" />
    </form>

    // 첫번째 css.
    // <div className="grid min-h-screen gap-10 bg-slate-400 py-20 px-20">
    //   {/* 1st box */}
    //   <div className=" rounded-3xl bg-white p-6 shadow-xl ">
    //     <span className="text-3xl font-semibold">Select Item</span>
    //     <ul>
    //       {[1, 2, 3, 4].map((i) => (
    //         <div
    //           key={i}
    //           className="my-2 flex justify-between text-gray-500 odd:bg-blue-50 even:bg-yellow-500"
    //         >
    //           <span>Grey Chair</span>
    //           <span className="font-semibold">$19</span>
    //         </div>
    //       ))}
    //     </ul>
    //     <ul>
    //       {["a", "b", "c", ""].map((c, i) => (
    //         <li className="bg-red-500 py-2 empty:hidden " key={i}>
    //           {c}
    //         </li>
    //       ))}
    //     </ul>
    //     <div className="mt-2 flex justify-between border-t-2 border-dashed pt-2">
    //       <span>Total</span>
    //       <span className="font-semibold">$10</span>
    //     </div>
    //     <button className="mx-auto mt-5 block w-3/4 rounded-xl bg-blue-500 p-3 text-center text-white hover:bg-teal-500 hover:text-black focus:bg-red-500 active:bg-yellow-500">
    //       Checkout
    //     </button>
    //   </div>
    //   {/* //2nd box */}
    //   <div className="group overflow-hidden rounded-3xl bg-white shadow-2xl">
    //     <div className="bg-blue-500 p-6 pb-14">
    //       <span className="text-2xl text-white">Profile</span>
    //     </div>
    //     <div className="relative -top-5 rounded-3xl bg-white p-6">
    //       <div className="relative -top-16 flex items-end justify-between">
    //         <div className="flex flex-col items-center">
    //           <span className="text-sm text-gray-500">Orders</span>
    //           <span className="font-medium">340</span>
    //         </div>
    //         {/* //photo */}
    //         <div className="h-24 w-24 rounded-full bg-zinc-400 transition-colors group-hover:bg-red-300" />
    //         <div className="flex flex-col items-center">
    //           <span className="text-sm text-gray-500">Spent</span>
    //           <span className="font-medium">$340</span>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="relative -top-16 -mt-10 -mb-5 flex flex-col items-center">
    //       <span className="text-lg font-medium">Hony Molloy</span>
    //       <span className="text-sm text-gray-500">미국</span>
    //     </div>
    //   </div>
    //   {/* 3rd box */}
    //   <div className="rounded-3xl bg-white p-10 shadow-2xl">
    //     <div className="mb-5 flex items-center justify-between">
    //       <span>⬅️</span>
    //       <div className="space-x-3">
    //         <span>🌟 4.9</span>
    //         <span className="rounded-md p-2 shadow-xl">💖</span>
    //       </div>
    //     </div>
    //     <div className="mb-5 h-72 bg-zinc-400" />
    //     <div className="flex flex-col">
    //       <span className=" text-xl font-medium">Swoon Lounge</span>
    //       <span className="text-us text-gray-500">Chair</span>
    //       <div className="mt-3 mb-5 flex items-center justify-between">
    //         <div className="space-x-2">
    //           <button className="h-5 w-5 rounded-full bg-yellow-500 ring-yellow-900 ring-offset-2 transition focus:ring-2"></button>
    //           <button className="h-5 w-5 rounded-full bg-indigo-500 ring-indigo-900 ring-offset-2 transition focus:ring-2"></button>
    //           <button className="h-5 w-5 rounded-full bg-teal-500 ring-teal-900 ring-offset-2 transition focus:ring-2"></button>
    //         </div>
    //         <div className="flex items-center space-x-5">
    //           <button className="aspect-square w-8 items-center justify-center rounded-xl bg-blue-200 p-1.5 text-xl text-gray-500">
    //             -
    //           </button>
    //           <span>1</span>
    //           <button className="aspect-square w-8 items-center justify-center rounded-xl bg-blue-200 p-1.5 text-xl text-gray-500">
    //             +
    //           </button>
    //         </div>
    //       </div>
    //       <div className="flex items-center justify-between">
    //         <span className="text-2xl font-medium">$450</span>
    //         <button className="rounded-lg bg-blue-500 py-2 px-8 text-center text-xs text-white">
    //           Add to cart
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
