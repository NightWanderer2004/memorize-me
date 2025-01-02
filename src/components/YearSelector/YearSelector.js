import { cn } from '@/utils'

export default function YearSelector() {
   const years = ['2024', '2023', '2022']

   return (
      <div className='bg-[#F2F3F0]/90 border border-white/30 backdrop-blur-sm shadow-minimal rounded-full px-8 h-[40px] flex justify-center gap-[22px] fixed bottom-[30px] left-1/2 -translate-x-1/2'>
         {years.map(year => (
            <button
               key={year}
               className={cn(
                  year === '2024' ? 'text-secondary font-medium' : 'text-primary/75 font-normal hover:text-primary',
                  'text-[18px] tracking-[-2%] transition-colors'
               )}
            >
               {year}
            </button>
         ))}
      </div>
   )
}
