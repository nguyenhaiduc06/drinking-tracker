import * as React from 'react';
import { View } from 'react-native';

interface CharacterSilhouetteProps {
  progress: number; // 0 to 1 (percentage of daily goal)
  size?: number;
}

export const CharacterSilhouette: React.FC<CharacterSilhouetteProps> = ({
  progress,
  size = 200,
}) => {
  const fillHeight = Math.min(progress, 1) * size * 0.8; // 80% of silhouette height

  return (
    <View style={{ width: size, height: size, alignItems: 'center' }}>
      {/* Character silhouette outline */}
      <View
        style={{
          width: size * 0.6,
          height: size * 0.8,
          borderWidth: 3,
          borderColor: '#3B82F6',
          borderRadius: size * 0.3,
          position: 'relative',
          overflow: 'hidden',
        }}>
        {/* Progress fill */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: fillHeight,
            backgroundColor: '#60A5FA',
            borderBottomLeftRadius: size * 0.3,
            borderBottomRightRadius: size * 0.3,
          }}
        />

        {/* Head */}
        <View
          style={{
            position: 'absolute',
            top: -size * 0.15,
            left: size * 0.15,
            width: size * 0.3,
            height: size * 0.3,
            borderWidth: 3,
            borderColor: '#3B82F6',
            borderRadius: size * 0.15,
            backgroundColor: '#FFFFFF',
          }}
        />
      </View>
    </View>
  );
};
