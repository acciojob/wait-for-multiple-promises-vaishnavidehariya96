// Select table body
const tbody = document.getElementById("output");

// Function to create a promise that resolves after random 1–3 sec
function createPromise(index) {
  const time = (Math.random() * 2 + 1).toFixed(3); // between 1 and 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => resolve({ index, time }), time * 1000);
  });
}

// Create 3 promises
const promises = [
  createPromise(1),
  createPromise(2),
  createPromise(3),
];

// Run all promises in parallel
const startTime = performance.now();

Promise.all(promises)
  .then((results) => {
    // Remove the "Loading..." row
    tbody.innerHTML = "";

    // Add rows for each resolved promise
    results.forEach((p) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>Promise ${p.index}</td>
        <td>${p.time}</td>
      `;
      tbody.appendChild(row);
    });

    // Total time (longest time among the three promises)
    const totalTime = (performance.now() - startTime) / 1000;
    
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
      <td><b>Total</b></td>
      <td><b>${totalTime.toFixed(3)}</b></td>
    `;
    tbody.appendChild(totalRow);
  })
  .catch((err) => {
    // In case of unexpected errors
    tbody.innerHTML = `<tr><td colspan="2" style="color:red;">Error: ${err}</td></tr>`;
  });