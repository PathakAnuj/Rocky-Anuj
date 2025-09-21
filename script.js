let activeItem = null;

function showContent(file, element) {
  // Highlight active item
  if(activeItem) activeItem.classList.remove('active');
  element.classList.add('active');
  activeItem = element;

  // Fetch content
  fetch(file + '.html')
    .then(res => res.text())
    .then(html => {
      const modified = html.replace(/<pre>([\s\S]*?)<\/pre>/g, (match, p1) => {
        return `<div class="code-container">
                  <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                  <pre>${p1}</pre>
                </div>`;
      });
      document.getElementById('content').innerHTML = modified;
    })
    .catch(err => document.getElementById('content').innerHTML = '<p>Error loading content</p>');
}

// Copy code function
function copyCode(btn) {
  const code = btn.nextElementSibling.innerText;
  navigator.clipboard.writeText(code).then(() => {
    btn.innerText = 'Copied!';
    setTimeout(() => btn.innerText = 'Copy', 1000);
  });
}

// Search menu with auto-load
function filterMenu() {
  const filter = document.getElementById('searchBox').value.toLowerCase();
  const items = document.querySelectorAll('#menu li.child li');
  let firstMatch = null;

  items.forEach(li => {
    if(li.innerText.toLowerCase().includes(filter)) {
      li.style.display = '';
      li.parentElement.style.display = 'block'; // ensure parent is visible
      if(!firstMatch) firstMatch = li; // store first match
    } else {
      li.style.display = 'none';
    }
  });

  // Automatically open first matching topic
  if(firstMatch) {
    showContent(firstMatch.getAttribute('onclick').match(/'(.+?)'/)[1], firstMatch);
  }
}
