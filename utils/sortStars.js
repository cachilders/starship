export default ({ stars, sortBy }) => <pre>{stars}</pre>
// stars.sort((a, b) => {
//   if (sortBy === 'alpha') {
//     const aName = a.name.toLowerCase()
//     const bName = b.name.toLowerCase()
//     if (aName > bName) {
//       return +1
//     } else if (aName < bName) {
//       return -1
//     } else {
//       return 0
//     }
//   } else if (sortBy === 'updatedAt') {
//     return  new Date(b.updated_at) - new Date(a.updated_at)
//   } else if (sortBy === 'language') {
//     const aLang = a.language ? a.language.toLowerCase() : 'N/A'
//     const bLang = b.language ? b.language.toLowerCase() : 'N/A'
//     if (aLang > bLang) {
//       return +1
//     } else if (aLang < bLang) {
//       return -1
//     } else {
//       return 0
//     }
//   }
// })
