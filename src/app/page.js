import Header from '@/components/Header'
import PhotoGallery from '@/components/Gallery/PhotoGallery'
import YearSelector from '@/components/YearSelector/YearSelector'

export default function Home() {
   return (
      <main>
         <Header />
         <PhotoGallery />
         <YearSelector />
      </main>
   )
}
