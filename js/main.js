// Main JavaScript

document.addEventListener('DOMContentLoaded', function() {

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('open');
    });
  }

  // Load posts on home page
  const postList = document.getElementById('postList');
  if (postList) {
    fetch('/data/posts.json')
      .then(res => res.json())
      .then(posts => {
        // Sort by date descending
        posts.sort((a, b) => b.date.localeCompare(a.date));
        posts.forEach(post => {
          const item = document.createElement('div');
          item.className = 'post-item';
          item.innerHTML = `
            <div class="post-date">${formatDate(post.date)}</div>
            <div class="post-title">
              <a href="/${post.slug}">${post.title}</a>
            </div>
            <span class="post-category">${post.category} · ${post.subCategory}</span>
          `;
          postList.appendChild(item);
        });
      })
      .catch(err => {
        postList.innerHTML = '<p style="color:#999">暫時無法載入文章。</p>';
      });
  }

  // Load category posts on jingtu/index.html and chanji/index.html
  const categoryPostList = document.getElementById('categoryPostList');
  if (categoryPostList) {
    const category = categoryPostList.dataset.category;
    fetch('/data/posts.json')
      .then(res => res.json())
      .then(posts => {
        const filtered = posts.filter(p => p.category === category);
        filtered.sort((a, b) => b.date.localeCompare(a.date));
        filtered.forEach(post => {
          const item = document.createElement('div');
          item.className = 'post-item';
          item.innerHTML = `
            <div class="post-date">${formatDate(post.date)}</div>
            <div class="post-title">
              <a href="/${post.slug}">${post.title}</a>
            </div>
            <span class="post-category">${post.subCategory}</span>
          `;
          categoryPostList.appendChild(item);
        });
      });
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00+08:00');
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}年${m}月${day}日`;
  }

});
