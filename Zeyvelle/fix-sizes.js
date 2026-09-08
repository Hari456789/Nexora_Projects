const fs = require('fs');
let data = fs.readFileSync('src/data/products.js', 'utf8');

// Replace the previous XXL only change with the new format
data = data.replace(/sizes:\s*\['XXL'\],\s*colors:\s*\['Assorted'\],/g, `sizes: ['XS', 'S', 'M', 'L', 'XXL'],\n    outOfStockSizes: ['XS', 'S', 'M', 'L'],\n    colors: ['Assorted'],`);

fs.writeFileSync('src/data/products.js', data);
