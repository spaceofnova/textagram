// // eslint-ignore
// import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
// import { useEffect, useState } from "react";

// export default function Prompter() {
//   const [open, setOpen] = useState(true);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [options, setOptions] = useState<any>();

//   useEffect(() => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const handlePrompt = (event: any) => {};

//     document.addEventListener("prompt", handlePrompt);
//     return () => {
//       document.removeEventListener("prompt", handlePrompt);
//     };
//   }, []);

//   return (
//     <LazyMotion features={domAnimation}>
//       <AnimatePresence>
//         {open && (
//           <div className="w-full h-full flex items-center justify-center absolute top-0 left-0 z-50 bg-black/50">
//             <m.div className="w-8/12 h-fit bg-black/50 rounded-md p-3 flex flex-col gap-2 backdrop-blur-xl">
//               <h1 className="text-xl font-bold">{options?.title}</h1>
//               <p className="text-sm">{options?.description}</p>
//               <input type="text" />
//               <div className="flex gap-2 w-full">
//                 <button className="w-full">Save</button>
//                 <button className="w-full" onClick={() => setOpen(false)}>
//                   Cancel
//                 </button>
//               </div>
//             </m.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </LazyMotion>
//   );
// }
