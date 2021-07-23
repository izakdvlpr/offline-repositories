import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {styles} from './styles';

interface Item {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
}

interface RepositoryProps {
  data: Item;
  onRefresh: () => Promise<void>;
  onRemove: () => Promise<void>;
}

export function Repository({data, onRefresh, onRemove}: RepositoryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {data.description}
      </Text>

      <View style={styles.stats}>
        <Text style={styles.statCount}>Stars: {data.stars}</Text>
        <Text style={styles.statCount}>Forks: {data.forks}</Text>
      </View>

      <View style={styles.options}>
        <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>Atualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
