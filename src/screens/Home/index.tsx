/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Keyboard,
} from 'react-native';

import {api} from '../../services/api';
import {getRelm} from '../../services/realm';

import {Repository} from '../../components/Repository';

import {styles} from './styles';

interface AxiosResponse {
  id: string;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
}

interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  stars: number;
  forks: number;
}

export function Home() {
  const [searchRepository, setSearchRepository] = useState('');
  const [repositoryError, setRepositoryError] = useState(false);

  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function deleteRepository(repository: Repository) {
    const realm = await getRelm();

    realm.write(() => {
      realm.delete(repository);
    });
  }

  async function saveRepository(repository: AxiosResponse) {
    const data = {
      id: repository.id,
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
    };

    const realm = await getRelm();

    realm.write(() => {
      // @ts-ignore
      realm.create('Repository', data);
    });

    return data;
  }

  async function handleSearchRepository() {
    try {
      if (searchRepository.trim() === '') {
        return;
      }

      const response = await api.get<AxiosResponse>(
        `/repos/${searchRepository}`,
      );

      await saveRepository(response.data);

      setSearchRepository('');

      setRepositoryError(false);

      Keyboard.dismiss();
    } catch (err) {
      setRepositoryError(true);

      console.error(err);
    }
  }

  async function handleRefreshRepository(repository: Repository) {
    const response = await api.get<AxiosResponse>(
      `/repos/${repository.fullName}`,
    );

    const data = await saveRepository(response.data);

    const newRepositories = repositories.map(repo =>
      repo.id === data.id ? data : repo,
    );

    setRepositories(newRepositories);
  }

  async function handleRemoveRepository(repository: Repository) {
    await deleteRepository(repository);

    const newRepositories = repositories.filter(
      repo => repo.id === repository.id,
    );

    setRepositories(newRepositories);
  }

  useEffect(() => {
    async function loadRepositories() {
      const realm = await getRelm();

      const data = realm.objects('Repository').sorted('stars', true) as unknown;

      setRepositories(data as Repository[]);
    }

    loadRepositories();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#614ca7" barStyle="light-content" />

      <Text style={styles.title}>Repositórios</Text>

      <View style={styles.form}>
        <TextInput
          style={[
            styles.input,
            repositoryError && {borderWidth: 2, borderColor: '#FF7272'},
          ]}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Procurar repositórios"
          placeholderTextColor="#999999"
          value={searchRepository}
          onChangeText={setSearchRepository}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSearchRepository}>
          <Text style={styles.buttonText}>Procurar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.list}
        data={repositories}
        keyExtractor={(_, index) => String(index)}
        renderItem={({item}) => (
          <Repository
            data={item}
            onRefresh={() => handleRefreshRepository(item)}
            onRemove={() => handleRemoveRepository(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
