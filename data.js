const getRandomImageNumber = () => Math.floor(Math.random() * 5) + 1

const data = {
   years: [
      {
         year: 2025,
         albums: [
            {
               month: 'January',
               photos: Array.from({ length: 3 }, () => `/images/${getRandomImageNumber()}.jpg`),
            },
         ],
      },
      {
         year: 2024,
         albums: [
            {
               month: 'November',
               photos: Array.from({ length: 3 }, () => `/images/${getRandomImageNumber()}.jpg`),
            },
            {
               month: 'Septermber',
               photos: Array.from({ length: 3 }, () => `/images/${getRandomImageNumber()}.jpg`),
            },
            {
               month: 'July',
               photos: Array.from({ length: 3 }, () => `/images/${getRandomImageNumber()}.jpg`),
            },
         ],
      },
      {
         year: 2023,
         albums: [
            {
               month: 'February',
               photos: Array.from({ length: 3 }, () => `/images/${getRandomImageNumber()}.jpg`),
            },
            {
               month: 'March',
               photos: Array.from({ length: 3 }, () => `/images/${getRandomImageNumber()}.jpg`),
            },
            {
               month: 'April',
               photos: Array.from({ length: 3 }, () => `/images/${getRandomImageNumber()}.jpg`),
            },
         ],
      },
   ],
}

export default data
