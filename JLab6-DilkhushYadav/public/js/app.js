async function loadLibraryBranches() {
    const response = await fetch('/library-data.kml');
    const kmlData = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(kmlData, 'application/xml');
    const branches = doc.querySelectorAll('Placemark');
    
    const branchesDiv = document.getElementById('branches');
    branches.forEach(branch => {
      const name = branch.querySelector('name').textContent;
      const description = branch.querySelector('description').textContent;
      const id = branch.getAttribute('id');
      
      const branchDiv = document.createElement('div');
      branchDiv.innerHTML = `
        <h2><a href="/library/${id}">${name}</a></h2>
        <p>${description}</p>
      `;
      branchesDiv.appendChild(branchDiv);
    });
  }
  
  // Call the function to load library branches
  loadLibraryBranches();
  