import { Ionicons } from '@expo/vector-icons';

export interface Instruction {
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
}

export const instructions: Instruction[] = [
    {
        title: 'Sente-se corretamente',
        description: 'Costas apoiadas e corpo relaxado.',
        icon: 'accessibility-outline',
    },
    {
        title: 'Pés apoiados',
        description: 'Mantenha os pés totalmente apoiados no chão e não cruze as pernas.',
        icon: 'walk-outline',
    },
    {
        title: 'Braço na altura do coração',
        description: 'Apoie o braço em uma superfície plana.',
        icon: 'heart-outline',
    },
    {
        title: 'Permaneça em silêncio',
        description: 'Não fale nem se mova durante a medição.',
        icon: 'volume-mute-outline',
    },
    {
        title: 'Descanse antes',
        description: 'Aguarde aproximadamente 5 minutos antes de iniciar.',
        icon: 'time-outline',
    },
    {
        title: 'Evite antes da medição',
        description: 'Não consuma café, cigarro ou pratique exercícios nos últimos 30 minutos.',
        icon: 'nutrition-outline',
    },
    {
        title: 'Posicione corretamente a braçadeira',
        description: 'Coloque a braçadeira conforme indicado e permaneça relaxado.',
        icon: 'fitness-outline',
    },
];
