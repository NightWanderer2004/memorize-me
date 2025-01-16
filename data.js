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
               month: 'December',
               photos: Array.from({ length: 3 }, () => `/images/${getRandomImageNumber()}.jpg`),
            },
            {
               month: 'October',
               photos: Array.from({ length: 3 }, () => `/images/${getRandomImageNumber()}.jpg`),
            },
            {
               month: 'August',
               photos: Array.from({ length: 3 }, () => `/images/${getRandomImageNumber()}.jpg`),
            },
         ],
      },
      {
         year: 2023,
         albums: [
            {
               month: 'March',
               photos: Array.from({ length: 3 }, () => `/images/${getRandomImageNumber()}.jpg`),
            },
            {
               month: 'September',
               photos: Array.from({ length: 3 }, () => `/images/${getRandomImageNumber()}.jpg`),
            },
         ],
      },
      {
         year: 2022,
         albums: [
            {
               month: 'February',
               photos: Array.from({ length: 3 }, () => `/images/${getRandomImageNumber()}.jpg`),
            },
            {
               month: 'June',
               photos: Array.from({ length: 3 }, () => `/images/${getRandomImageNumber()}.jpg`),
            },
         ],
      },
   ],
}

export default data
