function isAdjacent(w1, w2) {
  let diff = 0;
  for (let i = 0; i < 4; i++) {
    if (w1[i] !== w2[i]) diff++;
    if (diff > 1) return false;
  }
  return diff === 1;
}

function solveLadder() {
  const start = document.getElementById("start").value.toLowerCase();
  const end = document.getElementById("end").value.toLowerCase();
  const resultDiv = document.getElementById("result");

  if (start.length !== 4 || end.length !== 4) {
    resultDiv.textContent = ">>> ERROR: Both words must be exactly 4 letters.";
    return;
  }

  const wordSet = new Set(dictionary);

  if (!wordSet.has(start) || !wordSet.has(end)) {
    resultDiv.textContent = ">>> ERROR: Start or end word not found in dictionary.";
    return;
  }

  const queue = [[start]];
  const visited = new Set([start]);

  while (queue.length > 0) {
    const path = queue.shift();
    const last = path[path.length - 1];

    if (last === end) {
      resultDiv.innerHTML = `>>> LADDER FOUND:\n${path.join(" -> ")}`;
      return;
    }

    for (let word of dictionary) {
      if (!visited.has(word) && isAdjacent(last, word)) {
        visited.add(word);
        queue.push([...path, word]);
      }
    }
  }

  resultDiv.textContent = ">>> FAILED: No ladder found.";
}

