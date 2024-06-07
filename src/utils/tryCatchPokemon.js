const RNG = require("./rng");

module.exports = () => {
  const rng = new RNG();
  const arrayDefault = ["A", "B", "C", "D", "E"];

  // Embarallhar o array original
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // Gera um índice aleatório entre 0 e i
      const j = Math.floor(Math.random() * (i + 1));
      // Troca os elementos array[i] e array[j]
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const arrayShuffle = shuffleArray(arrayDefault);

  // Sorteia um dos itens do Array original para ser o vencedor
  const randomItem = rng.getRandomElement(arrayDefault);

  // Retornando o index referente ao array embaralhado
  const result = arrayShuffle.indexOf(randomItem) + 1;

  return result;
};
