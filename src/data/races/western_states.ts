import { Race } from '../../types/game';

const westernStates: Race = {
  id: 'western_states',
  name: 'Western States 100',
  distance: 100,
  terrain: 'Mountainous and Forested',
  checkpoints: [
    { mile: 10, name: 'Lyon Ridge' },
    { mile: 30, name: 'Robinson Flat' },
    { mile: 55, name: 'Michigan Bluff' },
    { mile: 78, name: 'Rucky Chucky' },
    { mile: 100, name: 'Placer High School' },
  ],
  rules: ['Complete within 30 hours', 'Mandatory medical checks at checkpoints'],
  description: 'The oldest 100-mile trail race, traversing the Sierra Nevada mountains with stunning views and challenging terrain.',
  image: '/images/races/western states.jpg', // Corrected image path
};

export default westernStates;
