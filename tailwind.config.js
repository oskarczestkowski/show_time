/** @type {import('tailwindcss').Config} */
import { withUt } from "uploadthing/tw";
 
export default withUt({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        'gunsmoke': '#848C8C',
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        elementBg: "bg-slate-900",
      },
    },
  },
  plugins: [],
});
