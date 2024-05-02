export const getWasteFractionColor = (label) => {
    switch (label) {
      case 'General waste':
        return `rgba(20, 20, 20, 1)`;
      case 'General waste 2nd':
        return `rgba(32, 37, 35, 1)`;
      case 'General waste 3rd':
        return `rgba(38, 45, 43, 1)`;
      case 'General waste 4th':
        return `rgba(43, 53, 50, 1)`;
      
      case 'Food':
        return `rgba(0, 160, 75, 1)`;
      case 'Food 2nd':
        return `rgba(59, 175, 72, 1)`;
      case 'Food 3rd':
        return `rgba(89, 183, 70, 1)`;
      case 'Food 4th':
        return `rgba(118, 190, 68, 1)`;
      
      case 'Cardboard':
        return `rgba(190, 160, 100, 1)`;
      case 'Cardboard 2nd':
        return `rgba(188, 144, 92, 1)`;
      case 'Cardboard 3rd':
        return `rgba(185, 127, 83, 1)`;
      case 'Cardboard 4th':
        return `rgba(182, 110, 75, 1)`;
      
      case 'Metal':
        return `rgba(90, 110, 119, 1)`;
      case 'Metal 2nd':
        return `rgba(99, 128, 142, 1)`;
      case 'Metal 3rd':
        return `rgba(104, 137, 153, 1)`;
      case 'Metal 4th':
        return `rgba(108, 145, 164, 1)`;

      case 'Plastic':
        return `rgba(150, 30, 130, 1)`;
      case 'Plastic 2nd':
        return `rgba(158, 34, 126, 1)`;
      case 'Plastic 3rd':
        return `rgba(166, 38, 122, 1)`;
      case 'Plastic 4th':
        return `rgba(181, 46, 114, 1)`;

      case 'Glass':
        return `rgba(16, 183, 149, 1)`;
      case 'Glass 2nd':
        return `rgba(26, 169, 150, 1)`;
      case 'Glass 3rd':
        return `rgba(36, 154, 151, 1)`;
      case 'Glass 4th':
        return `rgba(46, 139, 152, 1)`;
      
      case 'Paper':
        return `rgba(0, 132, 190, 1)`;
      case 'Paper 2nd':
        return `rgba(15, 144, 178, 1)`;
      case 'Paper 3rd':
        return `rgba(22, 151, 172, 1)`;
      case 'Paper 4th':
        return `rgba(29, 157, 165, 1)`;

      case 'Dangerous':
        return `rgba(226, 15, 30, 1)`;
      case 'Dangerous 2nd':
        return `rgba(230, 36, 43, 1)`;
      case 'Dangerous 3rd':
        return `rgba(234, 57, 55, 1)`;
      case 'Dangerous 4th':
        return `rgba(235, 77, 75, 1)`;



      default:
        return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
    }
  };