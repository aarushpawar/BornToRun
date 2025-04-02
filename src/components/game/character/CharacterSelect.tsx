import React from 'react';
import { useGame } from '../../GameProvider';
import { Character } from '../../../types/game';

const CharacterSelect: React.FC = () => {
  const { availableCharacters, selectCharacter } = useGame();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Select Your Runner</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {availableCharacters.map((character) => (
          <div key={character.id} className="border p-4 rounded shadow hover:shadow-lg cursor-pointer flex flex-col" onClick={() => {
            console.log('Character clicked:', character.name);
            selectCharacter(character);
          }}>
            <img src={character.image} alt={character.name} className="w-full aspect-square object-cover object-top rounded mb-2" />
            <h3 className="text-xl font-semibold mb-2">{character.name}</h3>
            <p>Stamina: {character.stamina}</p>
            <p>Hydration: {character.hydration}</p>
            <p>Speed: {character.speed}</p>
            <p>Technique: {character.technique}</p>
            <p>Heat Resist: {character.heatResistance}</p>
            <p>Experience: {character.experience}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelect;
