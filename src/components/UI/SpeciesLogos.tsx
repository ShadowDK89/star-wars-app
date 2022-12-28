import droid from '../../assets/img/droid-logo.png';
import human from '../../assets/img/human-logo.png';
import mammal from '../../assets/img/mammal-logo.png';
import rodian from '../../assets/img/rodian-logo.png';
import hutt from '../../assets/img/hutt-logo.png';
import yoda from '../../assets/img/yoda-logo.png';
import trandoshan from '../../assets/img/trandoshan-logo.png';
import monCalamari from '../../assets/img/mon-calamari-logo.jpg';
import ewok from '../../assets/img/ewok-logo.png';
import defaultLogo from '../../assets/img/default-logo.png';
import './SpeciesLogos.scss';

type TSpeciesLogosProps = {
  species: number;
};

function SpeciesLogos({ species }: TSpeciesLogosProps) {
  const SPECIES_LOGO = [
    { name: 'Human', src: human },
    { name: 'Droid', src: droid },
    { name: 'Mammal', src: mammal },
    { name: 'Rodain', src: rodian },
    { name: 'Hutt', src: hutt },
    { name: 'Yoda', src: yoda },
    { name: 'Trandoshan', src: trandoshan },
    { name: 'Mon Calamari', src: monCalamari },
    { name: 'Ewok', src: ewok },
    { name: 'Death Star, default logo', src: defaultLogo },
  ];

  const speciesSrc =
    SPECIES_LOGO.length <= species
      ? SPECIES_LOGO[SPECIES_LOGO.length - 1].src
      : SPECIES_LOGO[species - 1].src;

  const speciesName =
    SPECIES_LOGO.length <= species
      ? SPECIES_LOGO[SPECIES_LOGO.length - 1].name
      : SPECIES_LOGO[species - 1].name;

  const speciesLogoHtml = (
    <img
      className="star-wars__list--item-logo"
      src={speciesSrc}
      alt={speciesName}
    />
  );

  return speciesLogoHtml;
}

export default SpeciesLogos;
