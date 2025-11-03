#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function updateImportsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Заменяем относительные импорты на абсолютные
  const updatedContent = content
    // Импорты из корня src
    .replace(/from ['"]\.\.\/\.\.\/\.\.\/shared\//g, "from '@/shared/")
    .replace(/from ['"]\.\.\/\.\.\/shared\//g, "from '@/shared/")
    .replace(/from ['"]\.\.\/shared\//g, "from '@/shared/")
    .replace(/from ['"]\.\.\/\.\.\/\.\.\/features\//g, "from '@/features/")
    .replace(/from ['"]\.\.\/\.\.\/features\//g, "from '@/features/")
    .replace(/from ['"]\.\.\/features\//g, "from '@/features/")
    .replace(/from ['"]\.\.\/\.\.\/\.\.\/pages\//g, "from '@/pages/")
    .replace(/from ['"]\.\.\/\.\.\/pages\//g, "from '@/pages/")
    .replace(/from ['"]\.\.\/pages\//g, "from '@/pages/")
    .replace(/from ['"]\.\.\/\.\.\/\.\.\/app\//g, "from '@/app/")
    .replace(/from ['"]\.\.\/\.\.\/app\//g, "from '@/app/")
    .replace(/from ['"]\.\.\/app\//g, "from '@/app/")
    
    // Импорты с import()
    .replace(/import\(['"]\.\.\/\.\.\/\.\.\/shared\//g, "import('@/shared/")
    .replace(/import\(['"]\.\.\/\.\.\/shared\//g, "import('@/shared/")
    .replace(/import\(['"]\.\.\/shared\//g, "import('@/shared/")
    .replace(/import\(['"]\.\.\/\.\.\/\.\.\/features\//g, "import('@/features/")
    .replace(/import\(['"]\.\.\/\.\.\/features\//g, "import('@/features/")
    .replace(/import\(['"]\.\.\/features\//g, "import('@/features/")
    .replace(/import\(['"]\.\.\/\.\.\/\.\.\/pages\//g, "import('@/pages/")
    .replace(/import\(['"]\.\.\/\.\.\/pages\//g, "import('@/pages/")
    .replace(/import\(['"]\.\.\/pages\//g, "import('@/pages/")
    .replace(/import\(['"]\.\.\/\.\.\/\.\.\/app\//g, "import('@/app/")
    .replace(/import\(['"]\.\.\/\.\.\/app\//g, "import('@/app/")
    .replace(/import\(['"]\.\.\/app\//g, "import('@/app/");

  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated: ${filePath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      processDirectory(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      updateImportsInFile(filePath);
    }
  }
}

// Обрабатываем только src директорию
processDirectory('./src');
console.log('Import update completed!');
