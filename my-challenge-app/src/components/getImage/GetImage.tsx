//Image
import Image1 from "/img/image5.png";
import Image2 from "/img/image6.png";
import Image3 from "/img/headsetSmall.png";
import Image4 from "/img/headsetBig.png";
import Image5 from "/img/headbandSmall.png";
import Image6 from "/img/heandbandBig.png";
import Image7 from "/img/earpadSmall.png";
import Image8 from "/img/earpadBig.png";
import Image9 from "/img/cable.png";

export default function GetImage(category: string | undefined, isBig: boolean ) {
  switch (category) {
    case "Headphone":
      return isBig ? Image2 : Image1;
    case "Headset":
      return isBig ? Image4 : Image3;
    case "Headband":
      return isBig ? Image6 : Image5;
    case "Earpads":
      return isBig ? Image8 : Image7;
    case "Cable":
      return Image9;
    default:
      return Image1;
  }
}