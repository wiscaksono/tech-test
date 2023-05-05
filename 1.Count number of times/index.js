function countDigits(number) {
  const digitCounts = {};
  const digits = number.toString().split("");

  digits.forEach((digit) => {
    if (digit in digitCounts) {
      digitCounts[digit]++;
    } else {
      digitCounts[digit] = 1;
    }
  });

  for (let i = 0; i <= 9; i++) {
    const count = digitCounts[i] || 0;
    console.log(
      `The number ${i} appears ${count} time${count === 1 ? "" : "s"}`
    );
  }
}
