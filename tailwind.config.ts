import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        
        background: "var(--background)",
        foreground: "var(--foreground)",
        lwfs_blue: "#390da0",
        lwfs_yellow: "#f0cc05",
        lwfs_orange: "#ff9501",
      },
    },
  },
  plugins: [],
} satisfies Config;
