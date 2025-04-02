import React from 'react';
import { useGame } from '../../GameProvider';
import leadville100 from '../../../data/races/leadville_100';
import westernStates from '../../../data/races/western_states';
import copperCanyonUltra from '../../../data/races/copper_canyon';

const RaceSelect: React.FC = () => {
  const { selectRace } = useGame();

  const races = [leadville100, westernStates, copperCanyonUltra];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Select Your Race</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {races.map((race) => (
          <div
            key={race.id}
            className="border p-4 rounded shadow hover:shadow-lg cursor-pointer"
            onClick={() => selectRace(race)}
          >
            <img src={race.image} alt={race.name} className="w-full aspect-square object-cover object-top rounded mb-2" />
            <h3 className="text-xl font-semibold">{race.name}</h3>
            <p>Distance: {race.distance} miles</p>
            <p>Terrain: {race.terrain}</p>
            <p>{race.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaceSelect;
