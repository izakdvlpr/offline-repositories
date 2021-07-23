import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 30 + getStatusBarHeight(true),
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#7159C1',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  form: {
    marginTop: 20,
    flexDirection: 'row',
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    flex: 1,
    fontSize: 16,
    color: '#333333',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  button: {
    paddingHorizontal: 14,
    marginLeft: 10,
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#6BD4C1',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  list: {
    marginTop: 20,
  },
});
