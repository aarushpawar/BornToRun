import { Race } from '../../types/game';

const leadville100: Race = {
  id: 'leadville_100',
  name: 'Leadville 100',
  distance: 100,
  terrain: 'Mountainous',
  checkpoints: [
    { mile: 13.5, name: 'Mayqueen' },
    { mile: 23.5, name: 'Outward Bound' },
    { mile: 40, name: 'Twin Lakes' },
    { mile: 50, name: 'Hope Pass' },
    { mile: 60, name: 'Winfield' },
  ],
  rules: ['Complete within 30 hours', 'No external pacing until mile 50'],
  description: 'A grueling 100-mile race through the Rocky Mountains, known for its high altitude and challenging terrain.',
  image: '/images/races/leadville.webp', // Corrected image path
};

export default leadville100;
