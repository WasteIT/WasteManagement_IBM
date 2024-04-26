export const getRandomColor = (label) => {
    switch (label) {
      case 'General waste':
        return `rgba(19, 13, 15, 1)`;
      case 'Food':
        return `rgba(0, 178, 90, 1)`;
      case 'Cardboard':
        return `rgba(190, 160, 102, 1)`;
      case 'Metal':
        return `rgba(87, 109, 122, 1)`;
      case 'Plastic':
        return `rgba(146, 52, 148, 1)`;
      case 'Glass':
        return `rgba(96, 195, 174, 1)`;
      case 'Paper':
        return `rgba(0, 132, 194, 1)`;
      case 'Carton':
        return `rgba(187, 155, 106, 1)`;
      case 'Textiles':
        return `rgba(139, 69, 19, 1)`;
      case 'Dangerous':
          return `rgba(237, 28, 47, 1)`;
      default:
        return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
    }
  };