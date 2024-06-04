module.exports = (dexInt) => {
  var thumb;
  var prefixo = "https://assets.pokemon.com/assets/cms2/img/pokedex/full";
  if (dexInt < 10) {
    thumb = `${prefixo}/00${dexInt}.png`;
  } else if (dexInt < 100) {
    thumb = `${prefixo}/0${dexInt}.png`;
  } else if (dexInt >= 100 && dexInt < 1800) {
    thumb = `${prefixo}/${dexInt}.png`;
  } else {
    switch (dexInt) {
      case 1800:
        thumb = `${prefixo}/050_f2.png`;
        break;
      case 1802:
        thumb = `${prefixo}/074_f2.png`;
        break;
      case 1805:
        thumb = `${prefixo}/088_f2.png`;
        break;
      case 1806:
        thumb = `${prefixo}/089_f2.png`;
        break;
      case 1807:
        thumb = `${prefixo}/052_f2.png`;
        break;
      case 1811:
        thumb = `${prefixo}/027_f2.png`;
        break;
      case 1825:
        thumb = `${prefixo}/058_f2.png`;
        break;
      case 1826:
        thumb = `${prefixo}/059_f2.png`;
        break;
      case 1827:
        thumb = `${prefixo}/100_f2.png`;
        break;
      case 1828:
        thumb = `${prefixo}/101_f2.png`;
        break;
      case 1829:
        thumb = `${prefixo}/157_f2.png`;
        break;
      case 1830:
        thumb = `${prefixo}/211_f2.png`;
        break;
      case 1831:
        thumb = `${prefixo}/215_f2.png`;
        break;
      case 1832:
        thumb = `${prefixo}/503_f2.png`;
        break;
      case 1833:
        thumb = `${prefixo}/549_f2.png`;
        break;
      case 1834:
        thumb = `${prefixo}/570_f2.png`;
        break;
      case 1836:
        thumb = `${prefixo}/628_f2.png`;
        break;
      case 1837:
        thumb = `${prefixo}/705_f2.png`;
        break;
      case 1838:
        thumb = `${prefixo}/706_f2.png`;
        break;
      case 1839:
        thumb = `${prefixo}/713_f2.png`;
        break;
      case 1840:
        thumb = `${prefixo}/724_f2.png`;
        break;
      case 9502:
        thumb = `https://static.pokemonpets.com/images/monsters-images-300-300/4095-Crystal-Onix.webp`;
        break;
      default:
        thumb =
          "https://assets.pokemon.com/assets/cms2-pt-br/img/misc/gus/buttons/logo-pokemon-79x45.png";
    }
  }
  return thumb;
};
