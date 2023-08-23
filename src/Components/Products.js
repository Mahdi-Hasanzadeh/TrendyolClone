// import p2 from "../assets/product2.webp";
// import p3 from "../assets/p3.webp";
// import p4 from "../assets/p4.webp";
// import p5 from "../assets/p5.webp";
// import p6 from "../assets/p6.webp";
// import p7 from "../assets/p7.webp";
// import p8 from "../assets/p8.webp";
// import p1 from "../assets/product1.gif";

// import person1 from "../assets/MenCategories/Person1.webp";
// import person2 from "../assets/MenCategories/Person2.webp";
// import person3 from "../assets/MenCategories/Person3.webp";
// import person4 from "../assets/MenCategories/Person4.webp";
// import person5 from "../assets/MenCategories/Person5.webp";
// import person6 from "../assets/MenCategories/Person6.webp";
// import person7 from "../assets/MenCategories/Person7.webp";
// import person8 from "../assets/MenCategories/Person8.webp";
// import person9 from "../assets/MenCategories/Person9.webp";
// import person10 from "../assets/MenCategories/Person10.webp";
// import person11 from "../assets/MenCategories/Person11.webp";
// import person12 from "../assets/MenCategories/Person12.webp";
// import person13 from "../assets/MenCategories/Person13.webp";
// import person14 from "../assets/MenCategories/Person14.webp";
// import person15 from "../assets/MenCategories/Person15.webp";
// import person16 from "../assets/MenCategories/Person16.webp";
// import person17 from "../assets/MenCategories/Person17.webp";
// import person18 from "../assets/MenCategories/Person18.webp";
// import person19 from "../assets/MenCategories/Person19.webp";
// import person20 from "../assets/MenCategories/Person20.webp";

// export const products = [
//   {
//     id: 1,
//     name: "p1",
//     picture: p1,
//     category: "Men",
//   },
//   {
//     id: 2,
//     name: "p2",
//     picture: p2,
//   },
//   {
//     id: 3,
//     name: "p3",
//     picture: p3,
//   },
//   {
//     id: 4,
//     name: "p4",
//     picture: p4,
//   },
//   {
//     id: 5,
//     name: "p5",
//     picture: p5,
//   },
//   {
//     id: 6,
//     name: "p6",
//     picture: p6,
//   },
//   {
//     id: 7,
//     name: "p7",
//     picture: p7,
//   },
//   {
//     id: 8,
//     name: "p8",
//     picture: p8,
//   },
// ];

// export const MenCategories = [
//   {
//     id: 1,
//     productName: "grimelane",
//     description: "Polo T-shirt-Khaki-Regular fit",
//     rating: 3,
//     originalPrice: 13.99,
//     discount: 43,
//     freeShipping: true,
//     picture: person1,
//     color: "black",
//     size: "m",
//   },
//   {
//     id: 2,
//     productName: "Defacto",
//     description: "Sweater - Gray - Slim fit",
//     rating: 2,
//     originalPrice: 12.99,
//     discount: "43",
//     freeShipping: true,
//     picture: person2,
//     color: "gray",
//     size: "m",
//   },
//   {
//     id: 3,
//     productName: "AC&Co / Altinyildiz Classics",
//     description: "Softshell & Fleece - Gray",
//     rating: 5,
//     originalPrice: 17.99,
//     discount: "45",
//     freeShipping: true,
//     picture: person3,
//     color: "white",
//     size: "l",
//   },
//   {
//     id: 4,
//     productName: "Avva",
//     description: "T-Shirt - Black - Regular fit",
//     rating: 3,
//     originalPrice: 7.99,
//     discount: "20",
//     freeShipping: true,
//     picture: person4,
//     color: "black",
//     size: "l",
//   },
//   {
//     id: 5,
//     productName: "AC&Co / Altinyildiz Classics",
//     description: "Softshell & Fleece - Gray - Regular fit",
//     rating: 3,
//     originalPrice: 20.99,
//     discount: "19",
//     freeShipping: true,
//     picture: person5,
//     color: "gray",
//     size: "l",
//   },
//   {
//     id: 6,
//     productName: "Avva",
//     description: "T-Shirt - Khaki - Regular fit",
//     rating: 3,
//     originalPrice: 7.99,
//     discount: "11",
//     freeShipping: true,
//     picture: person6,
//     color: "black",
//     size: "m",
//   },
//   {
//     id: 7,
//     productName: "Altinyildiz Classics",
//     description: "Polo T-shirt - White - Regular fit",
//     rating: 3,
//     originalPrice: 16.99,
//     discount: "23",
//     freeShipping: true,
//     picture: person7,
//     size: "m",
//     color: "white",
//   },
//   {
//     id: 8,
//     productName: "Avva",
//     description: "T-shirt - White - Regular fit",
//     rating: 3,
//     originalPrice: 7.99,
//     discount: "20",
//     freeShipping: true,
//     picture: person8,
//     color: "white",
//     size: "s",
//   },
//   {
//     id: 9,
//     productName: "AC&Co / Altinyildiz Classics",
//     description: "Sweater - Khaki - Regular fit",
//     rating: 3,
//     originalPrice: 9.99,
//     discount: "41",
//     freeShipping: true,
//     picture: person9,
//     color: "black",
//     size: "xs",
//   },
// ];

// export const GetProductById = (id) => {
//   return MenCategories.find((product) => product.id === parseInt(id));
// };

// export const GetMenProductsByFilter = (size, color) => {
//   let filteredProducts = [...MenCategories];
//   if (size !== "All Sizes") {
//     // console.log("size", size);
//     filteredProducts = MenCategories.filter(
//       (product) => product.size.toLowerCase() === size.toLowerCase()
//     );
//   }

//   if (color) {
//     // console.log("color: ", color);
//     if (color !== "All Colors") {
//       filteredProducts = filteredProducts.filter(
//         (product) => product.color.toLowerCase() === color.toLowerCase()
//       );
//     }
//   }

//   return filteredProducts;
// };
