// eslint-disable-next-line no-unused-vars
const _restaurants = [
  {
    id: 1,
    title: 'Bagel Story',
    image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25008305-442083466194421-4458779521922891776-n-1517333246.jpg?crop=1xw:1xh;center,top&resize=480:*',
    prepTimeValue: '25 - 30',
    prepTimeUnit: 'min',
    rating: 4.7,
    cat1: 'Deli',
    cat2: 'Bagels',
    range: '$$',
    products: [
      {
        id: 1,
        title: 'Pica pollo',
        image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25008305-442083466194421-4458779521922891776-n-1517333246.jpg?crop=1xw:1xh;center,top&resize=480:*',
        price: 200,
        prepTimeValue: '30',
        prepTimeUnit: 'min',
        cat1: 'Deli',
        cat2: 'Bagels',
        rating: 4.7,
        restaurantId: 1
      },
      {
        id: 2,
        title: 'Pica pollo2',
        image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25008305-442083466194421-4458779521922891776-n-1517333246.jpg?crop=1xw:1xh;center,top&resize=480:*',
        price: 500,
        prepTimeValue: '30',
        prepTimeUnit: 'min',
        cat1: 'Deli',
        cat2: 'Bagels',
        restaurantId: 1
      }
    ]
  },
  {
    id: 2,
    title: 'Dessert Rose',
    image:
        'https://images.mygoodtimes.in/wp-content/uploads/2018/12/08210525/Bakers-Copy.jpg',
    prepTimeValue: '30 - 35',
    prepTimeUnit: 'min',
    rating: 4.5,
    cat1: 'Cafes',
    cat2: 'Desserts',
    range: '$',
    products: [
      {
        id: 3,
        title: 'Pica pollo',
        image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25008305-442083466194421-4458779521922891776-n-1517333246.jpg?crop=1xw:1xh;center,top&resize=480:*',
        price: 200,
        cat1: 'Deli',
        cat2: 'Bagels',
        prepTimeValue: '30',
        prepTimeUnit: 'min',
        restaurantId: 2
      },
      {
        id: 4,
        title: 'Pica pollo2',
        image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25008305-442083466194421-4458779521922891776-n-1517333246.jpg?crop=1xw:1xh;center,top&resize=480:*',
        price: 500,
        cat1: 'Deli',
        cat2: 'Bagels',
        prepTimeValue: '30',
        prepTimeUnit: 'min',
        restaurantId: 2
      }
    ]
  },
  {
    id: 3,
    title: 'Barbecue Nation',
    image:
        'https://images.mygoodtimes.in/wp-content/uploads/2018/12/08210525/Bakers-Copy.jpg',
    prepTimeValue: '40 - 60',
    prepTimeUnit: 'min',
    rating: 4.6,
    cat1: 'Barbecue',
    cat2: 'Chicken',
    range: '$$$',
    products: [
      {
        id: 5,
        title: 'Pica pollo',
        image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25008305-442083466194421-4458779521922891776-n-1517333246.jpg?crop=1xw:1xh;center,top&resize=480:*',
        price: 200,
        cat1: 'Deli',
        cat2: 'Bagels',
        prepTimeValue: '30',
        prepTimeUnit: 'min',
        restaurantId: 3
      },
      {
        id: 6,
        title: 'Pica pollo2',
        image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25008305-442083466194421-4458779521922891776-n-1517333246.jpg?crop=1xw:1xh;center,top&resize=480:*',
        price: 500,
        cat1: 'Deli',
        cat2: 'Bagels',
        prepTimeValue: '30',
        prepTimeUnit: 'min',
        restaurantId: 3
      }
    ]
  },
  {
    id: 4,
    title: 'Dessert Rose',
    image:
        'https://images.mygoodtimes.in/wp-content/uploads/2018/12/08210525/Bakers-Copy.jpg',
    prepTimeValue: '30 - 35',
    prepTimeUnit: 'min',
    rating: 4.5,
    cat1: 'Cafes',
    cat2: 'Desserts',
    range: '$',
    products: [
      {
        id: 7,
        title: 'Pica pollo',
        image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25008305-442083466194421-4458779521922891776-n-1517333246.jpg?crop=1xw:1xh;center,top&resize=480:*',
        price: 200,
        cat1: 'Deli',
        cat2: 'Bagels',
        prepTimeValue: '30',
        prepTimeUnit: 'min',
        restaurantId: 4
      },
      {
        id: 8,
        title: 'Pica pollo2',
        image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25008305-442083466194421-4458779521922891776-n-1517333246.jpg?crop=1xw:1xh;center,top&resize=480:*',
        price: 500,
        cat1: 'Deli',
        cat2: 'Bagels',
        prepTimeValue: '30',
        prepTimeUnit: 'min',
        restaurantId: 4
      },
      {
        id: 453,
        title: 'Pica pollo2',
        image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25008305-442083466194421-4458779521922891776-n-1517333246.jpg?crop=1xw:1xh;center,top&resize=480:*',
        price: 500,
        cat1: 'Deli',
        cat2: 'Bagels',
        prepTimeValue: '30',
        prepTimeUnit: 'min',
        restaurantId: 4
      }
    ]
  },
  {
    id: 5,
    title: 'Barbecue Nation',
    image:
        'https://images.mygoodtimes.in/wp-content/uploads/2018/12/08210525/Bakers-Copy.jpg',
    prepTimeValue: '40 - 60',
    prepTimeUnit: 'min',
    rating: 4.6,
    cat1: 'Barbecue',
    cat2: 'Chicken',
    range: '$$$',
    products: [
      {
        id: 9,
        title: 'Pica pollo',
        image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25008305-442083466194421-4458779521922891776-n-1517333246.jpg?crop=1xw:1xh;center,top&resize=480:*',
        price: 200,
        cat1: 'Deli',
        cat2: 'Bagels',
        prepTimeValue: '30',
        prepTimeUnit: 'min',
        restaurantId: 5
      },
      {
        id: 12,
        title: 'Pica pollo2',
        image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25008305-442083466194421-4458779521922891776-n-1517333246.jpg?crop=1xw:1xh;center,top&resize=480:*',
        price: 500,
        cat1: 'Deli',
        cat2: 'Bagels',
        prepTimeValue: '30',
        prepTimeUnit: 'min',
        restaurantId: 5
      }
    ]
  },
  {
    id: 6,
    title: 'Barbecue Nation',
    image:
        'https://images.mygoodtimes.in/wp-content/uploads/2018/12/08210525/Bakers-Copy.jpg',
    prepTimeValue: '40 - 60',
    prepTimeUnit: 'min',
    rating: 4.6,
    cat1: 'Barbecue',
    cat2: 'Chicken',
    range: '$$$',
    products: [
      {
        id: 211,
        title: 'Pica pollo',
        image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25008305-442083466194421-4458779521922891776-n-1517333246.jpg?crop=1xw:1xh;center,top&resize=480:*',
        price: 200,
        cat1: 'Deli',
        cat2: 'Bagels',
        prepTimeValue: '30',
        prepTimeUnit: 'min',
        restaurantId: 6
      },
      {
        id: 234,
        title: 'Pica pollo2',
        image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25008305-442083466194421-4458779521922891776-n-1517333246.jpg?crop=1xw:1xh;center,top&resize=480:*',
        price: 500,
        cat1: 'Deli',
        cat2: 'Bagels',
        prepTimeValue: '30',
        prepTimeUnit: 'min',
        restaurantId: 6
      }
    ]
  }
]

export default _restaurants
