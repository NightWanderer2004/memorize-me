import Link from 'next/link'

export default function Header() {
   return (
      <header className='container mx-auto px-[16px] lg:px-[88px] flex flex-col lg:flex-row justify-between items-start w-full'>
         <div>
            <Link href='/' className='text-[62px] font-medium tracking-[-2%] leading-[75%] text-primary'>
               <span>Memorize</span>
               <span className='text-accent'> me</span>
            </Link>
            <p className='mt-[18px] text-[21.5px] text-primary tracking-[-1.5%]'>A digital gallery of cherished moments</p>
         </div>
         <nav>
            <ul className='mt-6 lg:mt-0 flex gap-6 text-[18px] text-primary tracking-[-1.5%]'>
               <li>
                  <Link href='/creation-history' className='hover:text-secondary transition-colors'>
                     Creation history
                  </Link>
               </li>
               <li>
                  <Link href='https://github.com/NightWanderer2004/memorize-me' className='hover:text-secondary transition-colors'>
                     GitHub
                  </Link>
               </li>
            </ul>
         </nav>
      </header>
   )
}
