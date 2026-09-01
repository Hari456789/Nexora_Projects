import fs from 'fs';

const file = fs.readFileSync('src/data/products.js', 'utf8');

const regex = /categoryId:\s*'([^']+)'/g;
let match;
const counts = {};

while ((match = regex.exec(file)) !== null) {
  const category = match[1];
  counts[category] = (counts[category] || 0) + 1;
}

console.log(counts);
