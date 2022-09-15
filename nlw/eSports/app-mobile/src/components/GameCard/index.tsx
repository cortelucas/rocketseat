import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

export interface GameCardProps {
  id: string
  title: string
  _count: {
    ads: number
  }
  bannerUrl: string
}

interface GCProps extends TouchableOpacityProps {
  data: GameCardProps
}

export function GameCard({ data, ...rest }: GCProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground
        style={styles.bannerUrl}
        source={{uri: data.bannerUrl}}
      >

        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.footer}
        >
          <Text style={styles.title}>
            {data.title}
          </Text>
          <Text style={styles.ads}>
            { data._count.ads <= 1 ? `${data._count.ads} anúncio` : `${data._count.ads} anúncios` }
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}