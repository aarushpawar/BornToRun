export interface CharacterInteraction {
  character: { id: string; name: string; image: string };
  message: string;
}

const characterInteractions: CharacterInteraction[] = [
  {
    character: { id: 'scott_jurek', name: 'Scott Jurek', image: '/images/characters/scott_jurek.jpg' },
    message: 'Keep your pace steady, and don’t forget to hydrate!',
  },
  {
    character: { id: 'caballo_blanco', name: 'Caballo Blanco', image: '/images/characters/caballo.jpg' },
    message: 'The trail will guide you if you let it.',
  },
  {
    character: { id: 'arnulfo_quimare', name: 'Arnulfo Quimare', image: '/images/characters/arnulfo.jpeg' },
    message: 'Run with your heart, not just your legs.',
  },
  {
    character: { id: 'jenn_shelton', name: 'Jenn Shelton', image: '/images/characters/jenn shelton.avif' },
    message: 'Don’t take it too seriously. Have fun out there!',
  },
];

export default characterInteractions;
