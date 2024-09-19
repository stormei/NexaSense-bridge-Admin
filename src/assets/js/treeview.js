// Treeview module definition using an IIFE (Immediately Invoked Function Expression)
const Treeview = (function () {
  // Keeps track of expanded nodes in the tree
  let expandedNodes = {};
  
  // The HTML element where the tree will be rendered
  let treeviewElement = undefined;

  // Function to render the tree structure
  function renderTree(node, parentElement, path, activeLeafs) {
    // Counter for creating unique IDs for leaf elements
    let id = 0;

    // Check if the current node is an object and not null
    if (typeof node === 'object' && node !== null) {
      // Create a new unordered list element and append it to the parent
      const ul = document.createElement('ul');
      parentElement.appendChild(ul);

      // Iterate through the keys of the current node
      for (const key in node) {
        // Create a new list item element
        const li = document.createElement('li');
        ul.appendChild(li);

        // Determine the current path for the key in the tree
        const currentPath = path ? `${path}.${key}` : key;

        // Check if the current key is an object
        if (typeof node[key] === 'object' && node[key] !== null) {
          // If the key matches any of the activeLeafs, apply special styling
          if (checkRegExp(currentPath, activeLeafs)) {
            li.innerHTML = `<span class="expand">[${expandedNodes[currentPath] ? '-' : '+'}]</span><strong class="fade-text">${key}:</strong>`;
          } else {
            li.innerHTML = `<span class="expand">[${expandedNodes[currentPath] ? '-' : '+'}]</span><strong class="black">${key}:</strong>`;
          }

          // Add a nested ul element for the child nodes
          li.innerHTML += `<ul style="display: ${expandedNodes[currentPath] ? 'block' : 'none'};"></ul>`;

          // Add click event listener to handle expanding/collapsing nodes
          const expand = li.querySelector('.expand');
          expand.addEventListener('click', () => {
            const childUl = li.querySelector('ul');
            childUl.style.display = childUl.style.display === 'none' ? 'block' : 'none';
            expandedNodes[currentPath] = childUl.style.display === 'block';
            expand.textContent = childUl.style.display === 'none' ? '[+]' : '[-]';
          });

          // Recursively render the child nodes
          renderTree(node[key], li.querySelector('ul'), currentPath, activeLeafs);
        } else {
          // If the key matches any of the activeLeafs, apply special styling
          if (checkRegExp(currentPath, activeLeafs)) {
            li.innerHTML = `<strong id='key${id}' class='fade-text' style='cursor: pointer;'>${key}:</strong> ${node[key]}`;
          } else {
            li.innerHTML = `<strong id='key${id}' class='black' style='cursor: pointer;'>${key}:</strong> ${node[key]}`;
          }

          // Add click event listener to handle leaf node click
          const tagId = `key${id}`;
          li.querySelector(`#${tagId}`).addEventListener('click', () => {
            showTagDetails(`${currentPath}:${node[key]}`);
          });

          // Increment the id for creating unique IDs
          id++;
        }
      }
    }
  }

  // Function to check if a path matches any of the provided regular expressions
  function checkRegExp(path, keys) {
    const regex = new RegExp(`\\b${path}\\b`);
    for (let i = 0; i < keys.length; i++) {
      if (regex.test(keys[i])) return true;
    }
    return false;
  }

  // Function to update the rendered JSON tree with new data
  function updateJSON(newData, activeLeaf) {
    // Clear the existing tree
    treeviewElement.innerHTML = '';
    // Render the updated tree
    return renderTree(newData, treeviewElement, '', activeLeaf);
  }

  // Placeholder function to be overridden for displaying tag details
  function showTagDetails(tagId) {
    console.log('---- To be overridden ----');
    try {
      // Attempt to retrieve the element with the ID 'tagDetail'
      const elementId = document.getElementById('tagDetail');
      console.log(tagId);
    } catch (e) {
      // Log any errors that occur during the attempt
      console.log(e);
    }
  }

  // Expose the public API for the Treeview module
  return {
    // Function to render the tree
    render: function (elementId, data, activeLeaf) {
      // Get the target HTML element by its ID
      treeviewElement = document.getElementById(elementId);
      // Render the tree with the provided data
      return renderTree(data, treeviewElement, '', activeLeaf);
    },
    // Function to update the rendered tree with new data
    update: updateJSON
  };
})();

