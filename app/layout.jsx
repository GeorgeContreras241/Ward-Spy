
/* import { Cinzel, Caudex, Montserrat } from 'next/font/google'; */
import { Navbar } from "@/components/ui/Navbar";
import { Search } from "@/components/home/Search";
import { Footer } from "@/components/home/Footer";
import "@/styles/globals.css";
/* 
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const caudex = Caudex({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-caudex',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});
 */


export default function RootLayout({ children, }) {

  return (
    <html lang="es">
      <body className='overflow-y-scroll scrollbar-hide h-64 dark'  suppressHydrationWarning>
          <div className="bg-background">
            <Navbar/>
            <Search />
          </div>
          <div className="min-h-[calc(100vh-64px)]">
            {children}
          </div>
          <Footer />

      </body>
    </html>
  );
}
