"use client";

import Image from 'next/image'
import hole from "../assets/hole.png";
import mole from "../assets/mole.png";
import { useEffect, useState } from 'react';
import { Monsieur_La_Doulaise } from 'next/font/google';

export default function Home() {
  const [holes, setHoles] = useState<boolean[]>(new Array(9).fill(false));
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * holes.length);
      const newHoles = [...holes];
      newHoles[randomIndex] = true;
      setHoles(newHoles);

      setTimeout(() => {
        showMole(randomIndex, false);
      }, 600)
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  }, [holes]);

  function wackMole(index: number) {
    if(holes[index] == false) return;
    showMole(index, false);
    setScore(score + 1);
  }

  function showMole(index: number, moleVisible: boolean) {
    setHoles((currentHoles) => {
      const newHoles = [...currentHoles];
      newHoles[index] = moleVisible;
      return newHoles;
    });
  }

  return(
    <>
    <div className='grid place-items-center'>
      Score: {score}
    </div>
      <div className='grid place-items-center'>
        <div className="grid grid-cols-3 gap-x-0 gap-y-0 max-w-3xl">
          {holes.map((isMole, index) => (
            <Image
              src={isMole ? mole : hole}
              alt={isMole ? 'Image of mole' : 'Image of hole'}
              onClick={() => {
                wackMole(index);
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}
