module.exports = (dexInt) => {
	var thumb;
	if (dexInt < 10) {
		thumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${dexInt}.png`;
	} else if (dexInt < 100) {
		thumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${dexInt}.png`;
	} else if (dexInt < 1000) {
		thumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${dexInt}.png`;
	} else {
		switch (dexInt) {
			case 1800:
				thumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/050_f2.png`;
				break;
			case 1802:
				thumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/074_f2.png`;
				break;
			case 1805:
				thumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/088_f2.png`;
				break;
			case 1806:
				thumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/089_f2.png`;
				break;
			case 1807:
				thumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/052_f2.png`;
				break;
			case 1811:
				thumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/027_f2.png`;
				break;
			case 1825:
				thumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/058_f2.png`;
				break;
			case 1827:
				thumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/100_f2.png`;
				break;
			case 1828:
				thumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/101_f2.png`;
				break;
			case 1829:
				thumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/157_f2.png`;
				break;
			case 1829:
				thumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/157_f2.png`;
				break;
			case 1831:
				thumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/215_f2.png`;
				break;
			case 1834:
				thumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/570_f2.png`;
				break;
			case 1836:
				thumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/628_f2.png`;
				break;
			case 1840:
				thumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/724_f2.png`;
				break;
			default:
				thumb =
					"https://assets.pokemon.com/assets/cms2-pt-br/img/misc/gus/buttons/logo-pokemon-79x45.png";
		}
	}
	return thumb;
};
