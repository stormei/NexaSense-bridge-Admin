const opcTreeview = (function () {
    let expandedNodes = {};
    let treeviewElement = undefined;
    
    function renderTree(node, parentElement, path, blueLeaves) {
      let id = 0;
     
      if (typeof node === 'object' && node !== null) {
          const ul = document.createElement('ul');
          parentElement.appendChild(ul);
  
          for (const key in node) {
              const li = document.createElement('li');
          
              ul.appendChild(li);
           
              if (typeof node[key] === 'object' && node[key] !== null) {
                  const  currentPath = path ? `${path}.${key}` : key;
  
                if(checkRegExp(currentPath,blueLeaves)) {
                      li.innerHTML = `<span class="expand">[${expandedNodes[currentPath] ? '-' : '+'}]</span><strong class="fade-text">${key}</strong>`;
                 }
                  else {
                    //special case when rendering OPC UA server JSON tree
                    let displayName = node[key].displayName ? node[key].displayName : key;
                    li.innerHTML = `<span class="expand">${expandedNodes[currentPath] ? '&#9660;' : '&#9654;'}</span> &nbsp;&nbsp; ${displayName}`;
                    //li.innerHTML = `<span class="expand">${expandedNodes[currentPath] ? '-' : '+'}</span> &nbsp;&nbsp; ${displayName}`;
                  } 
                  li.innerHTML += `<ul style="display: ${expandedNodes[currentPath] ? 'block' : 'none'};"></ul>`;
                  const expand = li.querySelector('.expand');
                  expand.addEventListener('click', () => {
                      const ul = li.querySelector('ul');
                      ul.style.display = ul.style.display === 'none' ? 'block' : 'none';
                      expandedNodes[currentPath] = ul.style.display === 'block';
                      expand.innerHTML = ul.style.display === 'none' ? '&#9654;' : '&#9660;';
                      //expand.innerHTML = ul.style.display === 'none' ? '+' : '-';
                  });
                
                  renderTree(node[key], li.querySelector('ul'), currentPath, blueLeaves);
              } else {
                const  currentPath = path ? `${path}.${key}` : key;
   
                  if(checkRegExp(currentPath,blueLeaves)) {
                    li.innerHTML = `<span  class='fade-text' >${key}:</span> <strong id='key${id}' style='cursor: pointer;'>&nbsp;&nbsp; ${node[key]}</strong>`;
                    const tagId = `key${id}`;
                    li.querySelector(`#key${id}`).addEventListener('click', () => {
                      clickHandler(currentPath+":"+node[key]);
                    });
                  }
                  else {
                    if(key === 'nodeId'){
                      li.innerHTML = `&nbsp;&nbsp;<span class='black' >${key}:</span><strong id='key${id}' style='cursor: pointer;'> &nbsp;&nbsp; ${node[key]}</strong>`;
                      const tagId = `key${id}`;
                      li.querySelector(`#key${id}`).addEventListener('click', () => {
                        clickHandler(node[key]);
                      });
                    }
                    else {
                     
                    }
                  }
                  id++;
                 
              }
          }
      }
  }
    
  function checkRegExp(path,keys) {
   
      const regex = new RegExp(`\\b${path}\\b`);
      for(let i=0;i<keys.length;i++) {
          if( regex.test(keys[i])) return true;
      }
      return false;
  }
  
  function updateJSON(newData,activeLeaf) {
        // expandedNodes = {}; // Reset expanded nodes
        treeviewElement.innerHTML = '';
        return renderTree(newData, treeviewElement, '',activeLeaf);
    }


  
    return {
        render: function (elementId, data,activeLeaf) {
            treeviewElement = document.getElementById(elementId);
            return renderTree(data, treeviewElement, '',activeLeaf);
        },
        update: updateJSON
    };
})();

