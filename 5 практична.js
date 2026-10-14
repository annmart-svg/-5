function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function shouldPrecede(a, b, ascending) {
  return ascending ? a < b : a > b;
}

function partition(arr, low, high, ascending) {
  const pivot = arr[high];
  let i = low;

  for (let j = low; j < high; j++) {
    // Порівнюємо значення arr[j] з pivot
    if (shouldPrecede(arr[j], pivot, ascending)) {
      swap(arr, i, j);
      i++;
    }
  }

  swap(arr, i, high);
  return i;
}

function quickSortHelper(arr, low, high, ascending) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high, ascending);
    quickSortHelper(arr, low, pivotIndex - 1, ascending);
    quickSortHelper(arr, pivotIndex + 1, high, ascending);
  }
}

function quickSort(arr, ascending = true) {
  const result = [...arr];
  quickSortHelper(result, 0, result.length - 1, ascending);
  return result;
}

function isSorted(arr, ascending = true) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (ascending) {
      if (arr[i] > arr[i + 1]) return false;
    } else {
      if (arr[i] < arr[i + 1]) return false;
    }
  }
  return true;
}

function bubbleSort(arr, ascending = true) {
  const res = [...arr];
  const n = res.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (shouldPrecede(res[j + 1], res[j], ascending)) {
        swap(res, j, j + 1);
      }
    }
  }
  return res;
}

function generateRandomArray(size) {
  const arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = Math.random() * 2000 - 1000;
  }
  return arr;
}

function runTests() {
  const sizes = [1000, 10000, 100000];

  console.log("=== ПРАКТИЧНА РОБОТА №5: ТЕСТУВАННЯ ЕФЕКТИВНОСТІ QUICKSORT ===");

  sizes.forEach((size) => {
    console.log(`\n--- Масив на ${size.toLocaleString()} елементів ---`);
    const originalData = generateRandomArray(size);

    const t0 = performance.now();
    const sortedAsc = quickSort(originalData, true);
    const t1 = performance.now();
    console.log(`QuickSort (зростання): ${(t1 - t0).toFixed(2)} ms | Валідація: ${isSorted(sortedAsc, true)}`);

    const t2 = performance.now();
    const sortedDesc = quickSort(originalData, false);
    const t3 = performance.now();
    console.log(`QuickSort (спадання):  ${(t3 - t2).toFixed(2)} ms | Валідація: ${isSorted(sortedDesc, false)}`);

    if (size <= 10000) {
      const tb0 = performance.now();
      const bubbleResult = bubbleSort(originalData, true);
      const tb1 = performance.now();
      console.log(`BubbleSort : ${(tb1 - tb0).toFixed(2)} ms | Валідація: ${isSorted(bubbleResult, true)}`);
    } else {
      console.log(`BubbleSort : пропущено (для 100k операція O(n^2) триває занадто довго)`);
    }
  });
}

runTests();