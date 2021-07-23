import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  description: {
    marginTop: 5,
    color: '#666666',
    lineHeight: 20,
  },
  stats: {
    marginTop: 15,
    flexDirection: 'row',
  },
  statCount: {
    marginRight: 15,
    fontSize: 12,
  },
  options: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  refreshButton: {},
  refreshButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7159C1',
    textTransform: 'uppercase',
  },
  removeButton: {},
  removeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF7272',
    textTransform: 'uppercase',
  },
});
