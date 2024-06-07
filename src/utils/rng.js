class RNG {
  // constructor(seed = null) {
  //   this.seed = seed;
  //   if (this.seed !== null) {
  //     this.random = this.seededRandom(this.seed);
  //   } else {
  //     this.random = Math.random;
  //   }
  // }

  // seededRandom(seed) {
  //   let x = Math.sin(seed) * 10000;
  //   return () => {
  //     x = Math.sin(x) * 10000;
  //     return x - Math.floor(x);
  //   };
  // }

  // Retorna um número aleatório entre 0 (inclusivo) e 1 (exclusivo)
  getRandom() {
    return Math.random();
  }

  // Retorna um número inteiro aleatório entre min (inclusivo) e max (inclusivo)
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Retorna um elemento aleatório de um array
  getRandomElement(array) {
    if (array.length === 0) return undefined;
    const index = this.getRandomInt(0, array.length - 1);
    return array[index];
  }
}

module.exports = RNG;
