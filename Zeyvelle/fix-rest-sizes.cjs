const fs = require('fs');
let data = fs.readFileSync('src/data/products.js', 'utf8');

// Replace standard sizes array for remaining categories to include all sizes and mark all except L as out of stock
data = data.replace(/sizes:\s*\['XS',\s*'S',\s*'M',\s*'L'\]/g, `sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],\n    outOfStockSizes: ['XS', 'S', 'M', 'XL', 'XXL']`);

fs.writeFileSync('src/data/products.js', data);
console.log("Updated products.js");
