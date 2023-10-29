//React
import { ChangeEventHandler, useRef } from 'react'
//Splide
import Splide from '@splidejs/splide'
//hook
import { useMediaQuery } from '../../hooks/useMediaQuery'
//Components
import SelectorLabel from '../selectorLabel/SelectorLabel'
//CSS
import './Categories.css'
import '@splidejs/splide/css'

export default function Categories(props: { 
  filterSelected: string; 
  onChange: ChangeEventHandler<HTMLInputElement> 
}) {
  const isDesktop = useMediaQuery();
  const splideRef = useRef<HTMLDivElement | null>(null);

  const splide =
    splideRef.current &&
    new Splide(splideRef.current, {
      width: "100%",
      autoWidth: true,
      arrows: false,
      pagination: false,
      gap: "0.69rem"
    });

  splide?.mount();

  const categories = [
    { 
      id: 'headphone', 
      label: 'Headphone' 
    }, 
    { 
      id: 'headband', 
      label: 'Headband' 
    }, 
    { 
      id: 'earpads', 
      label: 'Earpads' 
    }, 
    { 
      id: 'cable', 
      label: 'Cable' 
    }, 
    { 
      id: 'headset', 
      label: 'Headset' 
    },
  ];

  return (
    <nav className="splide" ref={splideRef}>
      <div className="splide__track" style={{overflow: isDesktop ? 'hidden' : 'visible'}}>
        <ul className="splide__list">
          {categories.map((label) => (
            <li className="splide__slide" key={label.id}>
              <SelectorLabel
                id={label.id}
                name={label.label}
                group={"category"}
                checked={props.filterSelected === label.label}
                onChange={props.onChange}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}